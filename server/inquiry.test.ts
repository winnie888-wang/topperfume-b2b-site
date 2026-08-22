import { afterEach, describe, expect, it, vi } from "vitest";
import { buildInquiryEmail, isRateLimited, sendInquiryEmail } from "./inquiry";

describe("inquiry delivery helpers", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds an email containing all required product and buyer context", () => {
    const email = buildInquiryEmail({
      intent: "quote",
      productName: "Hydrating Mirror-Shine Lip Glaze",
      sku: "MU-LG-002",
      productUrl: "https://example.com/products/hydrating-mirror-shine-lip-glaze",
      category: "makeup",
      quantity: "120 pcs",
      countryMarket: "United States",
      customerName: "Avery Buyer",
      customerEmail: "avery@example.com",
      customerWhatsApp: "+1 555 0100",
      customizationRequirement: "Private Label",
      notes: "Please share sample availability.",
    });

    expect(email.subject).toContain("QUOTE");
    expect(email.text).toContain("Product Name: Hydrating Mirror-Shine Lip Glaze");
    expect(email.text).toContain("SKU: MU-LG-002");
    expect(email.text).toContain("Quantity: 120 pcs");
    expect(email.text).toContain("Customer Email: avery@example.com");
    expect(email.text).toContain("Customization Requirement: Private Label");
  });

  it("limits a source after five submissions in fifteen minutes", () => {
    const attempts = new Map<string, number[]>();
    const now = 1_000_000;
    for (let index = 0; index < 5; index += 1) {
      expect(isRateLimited(attempts, "127.0.0.1", now + index)).toBe(false);
    }
    expect(isRateLimited(attempts, "127.0.0.1", now + 6)).toBe(true);
  });

  it("returns a controlled delivery error when Resend rejects a submission", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("delivery unavailable", { status: 503 })));

    await expect(sendInquiryEmail({
      intent: "project",
      quantity: "12 pcs",
      countryMarket: "United States",
      customerName: "Avery Buyer",
      customerEmail: "avery@example.com",
    }, {
      apiKey: "re_test_key",
      fromEmail: "inquiry@mail.topperfume.cn",
      recipient: "melody888666@yeah.net",
    })).rejects.toThrow("Resend delivery failed (503): delivery unavailable");
  });
});
