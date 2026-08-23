import { describe, expect, it } from "vitest";
import { buildWhatsAppCtaSummary, getWhatsAppCtaUrl } from "@/data/business";

describe("WhatsApp-first CTA messages", () => {
  const context = {
    productName: "Production QA Product",
    sku: "QA-001",
    productUrl: "https://topperfume-b2b-site.vercel.app/products/production-qa-product",
    category: "fragrance",
    standardMoq: "2 pcs",
    leadTime: "Approx. 7 days",
  };

  it("builds the required free-sample intent with full product context", () => {
    const message = buildWhatsAppCtaSummary({ intent: "sample", context });
    expect(message).toContain("Hi, I'm interested in requesting a free sample of this product.");
    expect(message).toContain("Product Name: Production QA Product");
    expect(message).toContain("SKU: QA-001");
    expect(message).toContain("Product URL: https://topperfume-b2b-site.vercel.app/products/production-qa-product");
    expect(message).toContain("Category: fragrance");
    expect(message).toContain("MOQ: 2 pcs");
    expect(message).toContain("Lead Time: Approx. 7 days");
  });

  it("uses the requested wholesale-quote and customization intent copy", () => {
    expect(buildWhatsAppCtaSummary({ intent: "quote", context })).toContain("Hi, I'd like to get a wholesale quote for this product.");
    expect(buildWhatsAppCtaSummary({ intent: "project", context })).toContain("Hi, I'm interested in private label / OEM / ODM customization for this product.");
  });

  it("creates a wa.me URL without exposing any server-side credential", () => {
    const url = getWhatsAppCtaUrl({ intent: "quote", context });
    expect(url).toMatch(/^https:\/\/wa\.me\/8619066782710\?text=/);
    expect(decodeURIComponent(url)).toContain("SKU: QA-001");
  });
});
