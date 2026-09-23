import { describe, expect, it } from "vitest";
import { getProduct, products } from "../client/src/data/products";
import { buildInquirySummary, buildWhatsAppCtaSummary } from "../client/src/data/business";
import { getProductSeo, collectionSeo, buildSitemapXml } from "../shared/seo";
import { prerenderBody } from "../scripts/prerender";

const product = getProduct("lattafa-khamrah")!;
const context = { productName: product.name, productUrl: "/products/lattafa-khamrah", format: product.format, standardMoq: product.standardMoq, unitPrice: product.b2bPrice, leadTime: "Approx. 7 days", sampleAvailability: "Available", quantity: "2", subtotal: "US$10.00" };

describe("First commercial page batch: fact boundaries", () => {
  it("preserves Khamrah product facts and keeps project terms out of its Offer", () => {
    expect([product.format, product.unitPrice, product.minimumOrderQuantity]).toEqual(["100 mL", 5, 2]);
    const schema = getProductSeo(product).structuredData as Record<string, any>;
    expect(schema.brand.name).toBe("Lattafa");
    expect(schema.size).toBe("100 mL");
    expect(schema.offers.price).toBe(5);
    expect(schema.offers.eligibleQuantity.minValue).toBe(2);
    for (const key of ["availability", "aggregateRating", "review", "manufacturer", "sku"]) expect(schema).not.toHaveProperty(key);
    expect(schema.offers).not.toHaveProperty("availability");
    expect(JSON.stringify(schema.offers)).not.toMatch(/100|300|private label/i);
  });

  it("keeps quote and sample drafts paid, SKU-specific and free of unsupported dispatch promises", () => {
    for (const intent of ["quote", "sample"] as const) {
      const summary = buildWhatsAppCtaSummary({ intent, context, confirmedPerfumeTerms: true });
      expect(summary).toContain("https://topperfume.cn/products/lattafa-khamrah");
      expect(summary).toContain("Wholesale MOQ: 2 pieces");
      expect(summary).toContain("US$5.00 / piece");
      expect(summary).toContain("Samples are charged");
      expect(summary).toContain("paid by the buyer");
      expect(summary).not.toMatch(/free sample|7 days|100 pcs|300 pcs/i);
    }
  });

  it("isolates a private-label draft even if a caller accidentally supplies branded SKU context", () => {
    const summary = buildWhatsAppCtaSummary({ intent: "project", context, confirmedPerfumeTerms: true });
    expect(summary).toContain("Private label MOQ: 100 pcs");
    expect(summary).toContain("Packaging customization MOQ: 300 pcs");
    expect(summary).toContain("Logo customization MOQ: 100 pcs");
    expect(summary).toContain("Custom fragrance MOQ: 100 pcs");
    expect(summary).not.toMatch(/Khamrah|US\$5|US\$10|2 pieces|7 days|Quantity: 2/i);
  });

  it("uses the same scoped terms in form follow-up summaries", () => {
    const summary = buildInquirySummary({ intent: "quote", context, confirmedPerfumeTerms: true, name: "QA", quantity: "4", notes: "Do not send" });
    expect(summary).toContain("Quantity: 4");
    expect(summary).toContain("Notes: Do not send");
    expect(summary).not.toMatch(/free sample|7 days/i);
  });

  it("renders both buying paths without a Khamrah stock claim, including header/footer/card drafts", () => {
    const html = decodeURIComponent(prerenderBody("/products/lattafa-khamrah"));
    expect(html).toContain("BRANDED WHOLESALE");
    expect(html).toContain("Packaging customization MOQ");
    expect(html).toContain("Samples are charged");
    expect(html).toContain("/buyer-guides");
    expect(html).not.toMatch(/free samples?|7 days|schema.org\/InStock/i);
    expect((html.match(/<h1[ >]/g) || []).length).toBe(1);
  });

  it("retains the fragrance catalogue and limits the seven-day policy to confirmed stock dispatch", () => {
    const html = decodeURIComponent(prerenderBody("/collections/fragrance"));
    expect((html.match(/class="product-card product-card-fragrance /g) || []).length).toBe(products.filter(p => p.category === "fragrance").length);
    expect(html).toContain("For in-stock orders");
    expect(html).toContain("dispatch is typically around 7 days after order confirmation.");
    expect(html).toContain("Lead time depends on the customization scope and project requirements.");
    expect(html).toContain("id=\"private-label\"");
    expect(html).not.toMatch(/free samples?/i);
    expect(collectionSeo.fragrance.image).toContain("lattafa-khamrah");
    expect((buildSitemapXml(products).match(/<loc>/g) || []).length).toBe(50);
  });

  it("does not enable the new project blocks on other products or collections", () => {
    for (const path of ["/products/lattafa-khamrah-qahwa", "/products/khadlaj-hareem-al-sultan", "/collections/skincare", "/collections/makeup"]) {
      expect(prerenderBody(path)).not.toContain('id="private-label"');
    }
  });
});
