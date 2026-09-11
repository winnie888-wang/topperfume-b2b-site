import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { combinedListingProducts } from "../client/src/data/combinedListing";
import { getProduct, products } from "../client/src/data/products";
import { getSkincareType, skincareTypes } from "../client/src/data/productTaxonomy";
import { canCustomizeProduct, getWhatsAppCtaUrl } from "../client/src/data/business";
import { getProductSeo, getProductOffer } from "../shared/seo";
import { prerenderBody } from "../scripts/prerender";

const read = (relative: string) => JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, "../docs/intake", relative), "utf8"));
const batch1 = read("combined-listing/Batch01_5BodyCare/product_intake.json");
const batch2 = read("combined-listing/Batch02_11Groups/product_intake.json");
const batch3 = read("combined-listing/Batch03_7Perfumes/product_intake.json");
const byId = (id: string) => combinedListingProducts.find(product => product.intakeIds?.includes(id))!;

describe("Combined listing intake and preservation", () => {
  it("retains all 23 previous records without modifying any product facts or gallery", () => {
    const baseline = read("catalogue-before-combined.json");
    expect(baseline).toHaveLength(23);
    for (const product of baseline) expect(getProduct(product.slug)).toEqual(product);
    expect(products).toHaveLength(52);
    expect(new Set(products.map(product => product.slug)).size).toBe(52);
  });

  it("represents all 29 intake candidates on 23 pages without duplicating group photos or Simple uploads", () => {
    expect(combinedListingProducts).toHaveLength(23);
    const ids = combinedListingProducts.flatMap(product => product.intakeIds!);
    expect(ids).toHaveLength(29);
    expect(new Set(ids).size).toBe(29);
    expect(byId("B02-01-01").variants).toHaveLength(6);
    expect(byId("B02-03-01").variants).toHaveLength(2);
    expect(combinedListingProducts.filter(product => product.slug.includes("simple-"))).toHaveLength(1);
    expect(new Set(combinedListingProducts.map(product => product.image)).size).toBe(23);
    expect(byId("PF-03").slug).not.toBe(byId("PF-04").slug);
    expect(byId("PF-01").slug).not.toBe(byId("PF-05").slug);
    expect(byId("B02-10").slug).not.toMatch(/502ml|444ml/);
  });

  it("retains source prices and applies the user's independent batch 01 MOQ confirmation", () => {
    for (const source of batch1.products) {
      const product = byId(source.intake_id);
      expect(product.unitPrice).toBe(source.confirmed_by_user.price_per_piece);
      expect(product.minimumOrderQuantity).toBe(6);
      expect(product.standardMoq).toBe("6 pieces");
      expect(product.missingInformation).not.toContain("MOQ");
      expect(getProductOffer(product)).toMatchObject({ eligibleQuantity: { minValue: 6 } });
      const html = prerenderBody(`/products/${product.slug}`).replace(/<!--.*?-->/g, "");
      expect(html).toContain("Minimum order: 6 pieces");
      expect(html).toContain(`Product subtotal: US$${(product.unitPrice! * 6).toFixed(2)}`);
      expect(html).toContain('min="6"');
      expect(html).not.toContain("MOQ is not yet confirmed");
      const message = new URL(getWhatsAppCtaUrl({ intent: "quote", context: { productName: product.name, productUrl: `/products/${product.slug}`, standardMoq: product.standardMoq, unitPrice: product.b2bPrice, quantity: "6 pieces" } })).searchParams.get("text");
      expect(message).toContain("MOQ: 6 pieces");
      expect(message).toContain(`Unit Price: ${product.b2bPrice}`);
    }
    for (const group of batch2.groups) for (const source of group.variants) {
      const product = byId(source.candidate_id);
      const target = product.variants?.find(variant => variant.id === source.candidate_id) ?? product;
      expect(target.unitPrice).toBe(source.price_usd_per_piece);
      expect(target.minimumOrderQuantity).toBe(source.moq_pieces);
    }
    for (const source of batch3.products) {
      const product = byId(source.intake_id);
      expect(product.unitPrice).toBe(source.user_confirmed.price_per_piece);
      expect(product.minimumOrderQuantity).toBe(source.user_confirmed.moq_pieces);
    }
  });

  it("uses all seven skincare filters and keeps facial products out of Body Lotion", () => {
    const counts = skincareTypes.map(type => products.filter(product => product.category === "skincare" && getSkincareType(product) === type.label).length);
    expect(counts).toEqual([16, 3, 1, 2, 2, 1, 1]);
    expect(getSkincareType(byId("B02-03-01"))).toBe("Face Cream");
    expect(getSkincareType(byId("B02-11"))).toBe("Facial Cleanser");
  });

  it("does not fabricate missing sizes, supplier SKUs, fragrance notes, inventory or customization", () => {
    for (const id of ["B02-02", "B02-06", "B02-08", "B02-09", "B02-10", "PF-02", "PF-03", "PF-04", "PF-07"]) {
      expect(byId(id).format).toBe("Capacity to be confirmed");
    }
    for (const product of combinedListingProducts) {
      for (const field of ["sku", "ingredients", "notes", "fragrance", "spf", "leadTime", "sampleAvailability", "privateLabelAvailable", "gender"]) expect(product).not.toHaveProperty(field);
      expect(canCustomizeProduct(product)).toBe(false);
      const schema = JSON.stringify(getProductSeo(product).structuredData);
      for (const field of ["availability", "aggregateRating", "review", "shippingDetails", "sku"]) expect(schema).not.toContain(`"${field}"`);
    }
    expect(byId("B02-02").imageDisclosure).toContain("not included");
  });

  it("renders variant controls without defaulting to a set, and encodes selected variant quote details", () => {
    const product = byId("B02-03-02");
    const html = prerenderBody(`/products/${product.slug}`).replace(/<!--.*?-->/g, "");
    expect(html).toContain("Select a label from the photo");
    expect(html).toMatch(/<button[^>]*disabled=""[^>]*>Get Wholesale Quote/);
    const variant = product.variants![1];
    const url = new URL(getWhatsAppCtaUrl({ intent: "quote", context: { productName: variant.name, productUrl: `/products/${product.slug}?variant=${variant.id}`, standardMoq: "6 pieces per selected variant", unitPrice: "US$3.00 / piece", quantity: "12 pieces" } }));
    expect(url.origin + url.pathname).toBe("https://wa.me/8619066782710");
    const message = url.searchParams.get("text")!;
    expect(message).toContain(variant.name);
    expect(message).toContain(`https://topperfume.cn/products/${product.slug}?variant=${variant.id}`);
    expect(message).toContain("Quantity: 12 pieces");
    expect(message).toContain("Unit Price: US$3.00 / piece");
    expect(message).toContain("MOQ: 6 pieces per selected variant");
    expect(message).not.toContain("SKU:");
    const schema = getProductSeo(product).structuredData as Record<string, any>;
    expect(schema["@type"]).toBe("ProductGroup");
    expect(schema.hasVariant).toHaveLength(2);
    for (const item of schema.hasVariant) expect(item.offers).toMatchObject({ price: 3, eligibleQuantity: { minValue: 6 } });
  });
});
