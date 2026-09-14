import { describe, expect, it } from "vitest";
import { getProduct, products } from "../client/src/data/products";
import { canCustomizeProduct, customerValue, getProductCommercialType, getProductStandardTerms, getWhatsAppCtaUrl, isValidOrderQuantity } from "../client/src/data/business";
import { getProductSeo } from "../shared/seo";

describe("502 mL Vitamin C body lotion intake", () => {
  const product = getProduct("vitamin-c-body-lotion-502ml")!;

  it("adds one 502 mL product while preserving the separate 444 mL product", () => {
    expect(products.filter(item => item.slug === product.slug)).toHaveLength(1);
    expect(new Set(products.map(item => item.slug)).size).toBe(products.length);
    expect(product).toMatchObject({ category: "skincare", format: "502 mL / 17 FL OZ", unitPrice: 2.99, minimumOrderQuantity: 2, b2bPrice: "US$2.99 / bottle", standardMoq: "2 bottles" });
    expect(getProduct("vitamin-c-niacinamide-brightening-body-lotion")).toMatchObject({ sku: "SK-BL-VC-444", format: "444 ml / 15 fl oz", b2bPrice: "US$3.99 / pc", standardMoq: "12 pcs" });
  });

  it("does not inherit SKU, ingredients, stock, sample or customization promises", () => {
    for (const field of ["sku", "keyIngredients", "leadTime", "sampleAvailability", "privateLabelAvailable", "fragrance", "spf"]) expect(product).not.toHaveProperty(field);
    expect(canCustomizeProduct(product)).toBe(false);
    expect(getProductCommercialType(product)).toBe("Wholesale");
    expect(getProductStandardTerms(product).map(term => term.value)).not.toContain("Available");
    const schema = getProductSeo(product).structuredData as Record<string, any>;
    expect(schema).not.toHaveProperty("sku");
    expect(schema).not.toHaveProperty("brand");
    expect(schema.image).toHaveLength(4);
    expect(schema.image.every((url: string) => url.startsWith("https://topperfume.cn/assets/"))).toBe(true);
    expect(schema.offers).toMatchObject({ price: 2.99, priceCurrency: "USD", eligibleQuantity: { minValue: 2, unitCode: "C62" } });
    for (const field of ["availability", "shippingDetails", "aggregateRating", "review"]) {
      expect(schema).not.toHaveProperty(field);
      expect(schema.offers).not.toHaveProperty(field);
    }
  });

  it("rejects quantities below MOQ, fractional values and invalid numeric input", () => {
    for (const value of ["", " ", "0", "1", "-2", "2.5", "NaN", "Infinity"]) expect(isValidOrderQuantity(value, 2)).toBe(false);
    for (const value of ["2", "12", "100"]) expect(isValidOrderQuantity(value, 2)).toBe(true);
  });

  it("does not present an unverified texture as a confirmed specification", () => {
    expect(customerValue("Cream / Pressed Formula [TO CONFIRM]")).toBe("Contact us for details");
    expect(customerValue("502 mL / 17 FL OZ")).toBe("502 mL / 17 FL OZ");
  });

  it("encodes the per-bottle quote and selected quantity using the real contact and canonical URL", () => {
    const url = new URL(getWhatsAppCtaUrl({ intent: "quote", context: { productName: product.name, productUrl: `/products/${product.slug}`, category: product.category, standardMoq: product.standardMoq, unitPrice: product.b2bPrice, quantity: "12 bottles" } }));
    expect(url.origin + url.pathname).toBe("https://wa.me/8619066782710");
    const message = url.searchParams.get("text")!;
    expect(message).toContain("Product Name: Vitamin C Body Lotion — 502 mL");
    expect(message).toContain("https://topperfume.cn/products/vitamin-c-body-lotion-502ml");
    expect(message).toContain("MOQ: 2 bottles");
    expect(message).toContain("Quantity: 12 bottles");
    expect(message).toContain("Unit Price: US$2.99 / bottle");
    for (const text of ["Not specified", "SKU:", "free sample", "7 days", "localhost", "vercel.app"]) expect(message).not.toContain(text);
  });
});
