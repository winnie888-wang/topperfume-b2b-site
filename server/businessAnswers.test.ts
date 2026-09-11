import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { products, getProduct } from "../client/src/data/products";
import { getProductSeo } from "../shared/seo";
import { resolveInquiryProduct } from "./inquiryProduct";
import { getWhatsAppCtaUrl } from "../client/src/data/business";

const read = (file: string) => JSON.parse(readFileSync(new URL(`../docs/${file}`, import.meta.url), "utf8"));
const history = read("history/before-business-answers-2026-09-11.json");
const report = read("business-answer-update.json");
const pending = read("pending-listing-matches.json");
const changedIds = new Set(["B04-01-400", "B04-02", "B05-02", "B05-03", "B05-06", "B05-07", "BC-01", "BC-02", "BC-03", "BC-04"]);

describe("Business answers and explicit scope corrections", () => {
  it("changes only the ten explicitly repriced products; preserves all images and blank answers", () => {
    expect(report.nonemptyAnswers).toBe(27);
    for (const before of history.products) {
      const current = getProduct(before.slug)!;
      expect(current.gallery).toEqual(before.gallery);
      expect(current.image).toBe(before.image);
      expect(current.minimumOrderQuantity).toBe(before.minimumOrderQuantity);
      expect(current.unitPrice).toBe(changedIds.has(before.intakeIds[0]) ? before.intakeIds[0] === "B05-02" ? 2 : 3 : before.unitPrice);
    }
    expect(getProduct("vanilla-cashmere-body-wash-473ml")?.unitPrice).toBe(4.99);
    expect(getProduct("vitamin-c-body-lotion-502ml")?.unitPrice).toBe(2.99);
  });

  it("replaces GlutaGlow sizes without a third option and rejects retired order variants", () => {
    const slug = "glutaglow-body-lotion-400ml-600ml";
    const old = history.products.find((p: any) => p.slug === slug);
    expect(old.variants.map((v: any) => v.format)).toEqual(["400 mL", "600 mL"]);
    const current = getProduct(slug)!;
    expect(current).toMatchObject({ format: "725 mL", unitPrice: 3, minimumOrderQuantity: 6 });
    expect(current.variants).toBeUndefined();
    const base = { intent: "quote" as const, quantity: "6", customerName: "Test only", customerEmail: "test@example.invalid", countryMarket: "QA" };
    for (const id of ["B04-01-400", "B04-01-600"]) expect(() => resolveInquiryProduct({ ...base, productUrl: `https://topperfume.cn/products/${slug}?variant=${id}` })).toThrow(/currently available/);
    const inquiry = resolveInquiryProduct({ ...base, productUrl: `https://topperfume.cn/products/${slug}` });
    expect(inquiry).toMatchObject({ format: "725 mL", unitPrice: "US$3.00 / piece", subtotal: "US$18.00" });
    const text = new URL(getWhatsAppCtaUrl({ intent: "quote", context: inquiry })).searchParams.get("text")!;
    for (const term of ["725 mL", "US$3.00", "US$18.00", "excludes shipping and taxes"]) expect(text).toContain(term);
  });

  it("changes precisely four group-photo variants, preserving the two other 200 mL products", () => {
    const p = getProduct("vaseline-body-care-series-200ml")!;
    expect(p.variants!.map(v => v.format)).toEqual(["237 mL", "237 mL", "237 mL", "200 mL", "237 mL", "200 mL"]);
    expect(p.variants!.every(v => v.unitPrice === 3 && v.minimumOrderQuantity === 6)).toBe(true);
    const schema = getProductSeo(p).structuredData as any;
    expect(schema.hasVariant.map((v: any) => v.size)).toEqual(p.variants!.map(v => v.format));
    for (const variant of p.variants!) {
      const q = resolveInquiryProduct({ intent: "quote", quantity: "6", countryMarket: "QA", customerName: "Test only", customerEmail: "test@example.invalid", productUrl: `https://topperfume.cn/products/${p.slug}?variant=${variant.id}` });
      expect(q.format).toBe(variant.format);
      expect(q.subtotal).toBe("US$18.00");
    }
  });

  it("keeps five differently scented series records and their quotes and images separate", () => {
    expect(pending).toHaveLength(5);
    for (const match of pending) {
      expect(match).toMatchObject({ priceUSD: 2.99, moq: 6, status: "fragrance-mapping-unconfirmed" });
      expect(match.format).toBe(match.intakeId === "B05-01" ? "500 mL" : "237 mL");
      expect(match.gallery).toEqual(history.pendingMatches.find((p: any) => p.intakeId === match.intakeId).gallery);
      expect(products.some(p => p.intakeIds?.includes(match.intakeId))).toBe(false);
      expect(match.fragrance).toBeUndefined();
    }
    expect(report.materialReplacementGroups).toHaveLength(8);
    expect(products.filter(p => p.sourceBatch && p.format === "Capacity to be confirmed")).toHaveLength(0);
  });
});
