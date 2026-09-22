import { afterEach, describe, expect, it, vi } from "vitest";
import { prerenderBody } from "../scripts/prerender";
import { products } from "../client/src/data/products";
import { buildInquirySummary, buildWhatsAppCtaSummary, dispatchValue } from "../client/src/data/business";
import { buildSitemapXml, lowMoqPerfumeFaqs, lowMoqPerfumeSeo } from "../shared/seo";
import { buildInquiryEmail, sendInquiryEmail } from "./inquiry";
import { resolveInquiryProduct } from "./inquiryProduct";

const paidPolicy = "Sample availability can be confirmed for the selected product or project. Samples are charged, and shipping is paid by the buyer.";
const stockPolicy = "For in-stock orders, dispatch is typically around 7 days after order confirmation.";
const projectPolicy = "Lead time depends on the customization scope and project requirements.";
const htmlFor = (path: string) => {
  const html = prerenderBody(path);
  // Decode URL parameters only: visible product names can contain a literal "7%".
  const drafts = [...html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)]
    .map(match => new URL(match[1].replaceAll("&amp;", "&")).searchParams.get("text") ?? "");
  return [html, ...drafts].join("\n");
};

describe("Phase 3.1 business consistency across public surfaces", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("keeps every public route free of free-sample promises and every SKU free of default seven-day claims", () => {
    const routes = [...buildSitemapXml(products).matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname);
    expect(routes).toHaveLength(48);
    for (const route of routes) {
      const html = htmlFor(route);
      expect(html, route).not.toMatch(/free[ -]?samples?/i);
      if (route.startsWith("/products/")) expect(html, route).not.toMatch(/(?:7|seven)[ -]*days?/i);
      else {
        // Any remaining seven-day statement must be the exact conditional stock policy.
        expect(html.split(stockPolicy).join(""), route).not.toMatch(/(?:7|seven)[ -]*days?/i);
      }
    }
  });

  it("aligns the Low MOQ visible FAQ with Schema and separates packaging from the 100-piece services", () => {
    const html = htmlFor("/low-moq-perfume-manufacturer");
    const schema = JSON.stringify(lowMoqPerfumeSeo);
    expect(html).toContain("Wholesale MOQ varies by SKU");
    expect(html).toContain("Private Label from 100 pcs");
    expect(html).toContain("Logo customization from 100 pcs");
    expect(html).toContain("Custom packaging from 300 pcs");
    expect(html).toContain(paidPolicy);
    expect(html).toContain(stockPolicy);
    expect(html).toContain(projectPolicy);
    expect(html).not.toContain("Private Label / OEM Reference");
    for (const faq of lowMoqPerfumeFaqs) {
      expect(html).toContain(faq.name);
      expect(html).toContain(faq.acceptedAnswer.text);
      expect(schema).toContain(faq.acceptedAnswer.text);
    }
    expect(schema).not.toMatch(/free sample|packaging from 100/i);
  });

  it("does not infer stock from missing or historical seven-day fields in any inquiry draft", () => {
    for (const leadTime of [undefined, "[TO CONFIRM]", "Approx. 7 days", "7-day production"]) {
      expect(dispatchValue(leadTime)).not.toMatch(/7|seven/i);
      for (const intent of ["sample", "quote", "project"] as const) {
        for (const build of [buildInquirySummary, buildWhatsAppCtaSummary]) {
          const text = build({ intent, context: { leadTime, sampleAvailability: "Available" } });
          expect(text).toContain(paidPolicy);
          expect(text).not.toMatch(/free sample|(?:7|seven)[ -]*days?/i);
          if (intent === "project") expect(text).toContain(projectPolicy);
        }
      }
    }
  });

  it("keeps Khamrah branding separate from service eligibility and unsupported relationships", () => {
    const html = htmlFor("/products/lattafa-khamrah");
    expect(html).toContain("not authorize relabeling, repackaging or changing the fragrance of a branded SKU");
    expect(html).not.toMatch(/authorized distributor|official partner|brand owner|direct factory|manufacturer-owned/i);
    expect(html).toContain("US$5.00 / piece");
    expect(html).toContain("2 pieces");
    expect(html).toContain("100 mL");
  });

  it("sends the active email template with paid samples and no inferred Khamrah dispatch", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"id":"mock-only"}', { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const verified = resolveInquiryProduct({ intent: "quote", productUrl: "https://topperfume.cn/products/lattafa-khamrah", quantity: "2", customerName: "QA only", countryMarket: "QA", customerEmail: "qa@example.invalid" });
    await sendInquiryEmail(verified, { apiKey: "mock-not-a-credential", fromEmail: "qa@example.invalid", recipient: "recipient@example.invalid" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.text).toContain(paidPolicy);
    expect(body.text).toContain("US$5.00 / piece");
    expect(body.text).toContain("MOQ: 2 pieces");
    expect(body.text).toContain("Confirm current stock");
    expect(body.text).not.toMatch(/free samples?|7 days|authorized distributor|official partner/i);
    expect(body.reply_to).toBe("qa@example.invalid");
  });

  it("uses project-dependent timing for project mail and customization requested through a quote", () => {
    for (const request of [{ intent: "project" as const }, { intent: "quote" as const, customizationRequirement: "Private Label" }, { intent: "quote" as const, customizationRequirement: "OEM" }]) {
      const email = buildInquiryEmail({ ...request, quantity: "100", countryMarket: "QA", customerName: "QA only", customerEmail: "qa@example.invalid" });
      expect(email.text).toContain(projectPolicy);
      expect(email.text).toContain(paidPolicy);
      expect(email.text).not.toMatch(/7 days|free samples?/i);
    }
  });
});
