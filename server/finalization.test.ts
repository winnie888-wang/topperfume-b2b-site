import { afterEach, describe, expect, it, vi } from "vitest";
import { resolveInquiryProduct } from "./inquiryProduct";
import { buildInquiryEmail, sendInquiryEmail } from "./inquiry";
import { appRouter } from "./routers";
import { ENV } from "./_core/env";
import { products } from "../client/src/data/products";
import { buildRobotsTxt } from "../shared/seo";
import { buildInquirySuccessEvent, isAnalyticsEnabled } from "../shared/analytics";
import { getWhatsAppCtaUrl } from "../client/src/data/business";
import { readFileSync } from "node:fs";

const input = { intent: "quote" as const, quantity: "6", countryMarket: "QA market", customerName: "Test only", customerEmail: "qa@example.invalid", formStartedAt: Date.now() - 5000, productUrl: "https://topperfume.cn/products/daily-niacinamide-body-lotion" };
const originalEnv = { ...ENV };
afterEach(() => { Object.assign(ENV, originalEnv); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function caller() { return appRouter.createCaller({ user: null, req: { ip: `qa-${Math.random()}`, socket: {}, headers: {} }, res: {} } as any); }

describe("Final release preparation, with no real delivery", () => {
  it("applies all five confirmed BC facts, preserving price differences", () => {
    const expected = [["BC-01", "500 mL", 2.99], ["BC-02", "500 mL", 2.99], ["BC-03", "500 mL", 2.99], ["BC-04", "10 OZ / 283 g", 4.99], ["BC-05", "16 FL OZ / 473 mL", 4.99]];
    for (const [id, format, price] of expected) {
      const product = products.find(p => p.intakeIds?.includes(id as string))!;
      expect(product).toMatchObject({ format, unitPrice: price, minimumOrderQuantity: 6 });
      expect(product.missingInformation?.join(" ")).not.toMatch(/Capacity|MOQ/);
    }
    const pending = JSON.parse(readFileSync(new URL("../docs/pending-listing-matches.json", import.meta.url), "utf8"));
    expect(products.filter(p => p.sourceBatch && /Capacity to be confirmed/.test(p.format)).length + pending.filter((p: any) => !p.format).length).toBe(12);
  });
  it("rejects fractional, insufficient and unselected-variant requests", () => {
    for (const quantity of ["0", "5", "6.5", "garbage"]) expect(() => resolveInquiryProduct({ ...input, quantity })).toThrow();
    expect(() => resolveInquiryProduct({ ...input, productUrl: "https://topperfume.cn/products/glutaglow-body-lotion-400ml-600ml" })).toThrow(/variant/);
  });
  it("derives exact product, specification, price and subtotal server-side", () => {
    const result = resolveInquiryProduct({ ...input, productName: "Tampered name", unitPrice: "US$0.01", subtotal: "US$0.01" });
    expect(result).toMatchObject({ productName: "Daily Niacinamide Body Lotion", format: "500 mL", unitPrice: "US$2.99 / piece", subtotal: "US$17.94", standardMoq: "6 pieces" });
    const body = buildInquiryEmail(result).text;
    expect(body).toContain("Size / format: 500 mL");
    expect(body).toContain("US$17.94 (excludes shipping and taxes)");
    const variant = resolveInquiryProduct({ ...input, quantity: "12", productUrl: "https://topperfume.cn/products/glutaglow-body-lotion-400ml-600ml?variant=B04-01-600" });
    expect(variant).toMatchObject({ format: "600 mL", subtotal: "US$35.88" });
    const unknown = resolveInquiryProduct({ ...input, quantity: "2", productUrl: "https://topperfume.cn/products/lattafa-khamrah-qahwa" });
    expect(unknown.format).toBe("Capacity to be confirmed");
    expect(unknown.subtotal).toBe("US$10.00");
    const text = new URL(getWhatsAppCtaUrl({ intent: "quote", context: { ...result, quantity: "6 pieces" } })).searchParams.get("text");
    for (const value of ["500 mL", "US$2.99", "6 pieces", "US$17.94", "excludes shipping and taxes"]) expect(text).toContain(value);
  });
  it("keeps preview delivery disabled even if credentials exist", async () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    Object.assign(ENV, { inquiryEnabled: false, resendApiKey: "mock", inquiryFromEmail: "mock@example.invalid" });
    await expect(caller().inquiry.submit(input)).rejects.toMatchObject({ code: "PRECONDITION_FAILED" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("returns controlled missing-configuration and provider-failure responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 503, text: async () => "Mock unavailable" }); vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    Object.assign(ENV, { inquiryEnabled: true, resendApiKey: "", inquiryFromEmail: "" });
    await expect(caller().inquiry.submit(input)).rejects.toMatchObject({ code: "PRECONDITION_FAILED" });
    expect(fetchMock).not.toHaveBeenCalled();
    Object.assign(ENV, { resendApiKey: "mock", inquiryFromEmail: "mock@example.invalid" });
    await expect(caller().inquiry.submit(input)).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR" });
    expect(fetchMock).toHaveBeenCalledOnce();
  });
  it("returns success only on mocked provider acceptance with correct email facts", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true }); vi.stubGlobal("fetch", fetchMock);
    Object.assign(ENV, { inquiryEnabled: true, resendApiKey: "mock", inquiryFromEmail: "mock@example.invalid" });
    const response = await caller().inquiry.submit(input);
    expect(response).toMatchObject({ success: true, requestId: expect.stringMatching(/^TP-/) });
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload.text).toContain("US$17.94");
    expect(payload.reply_to).toBe("qa@example.invalid");
  });
  it("blocks preview indexing and analytics; separates form acceptance from clicks and qualified leads", () => {
    expect(buildRobotsTxt()).toBe("User-agent: *\nDisallow: /\n");
    expect(buildRobotsTxt(true)).toContain("Disallow: /previews/");
    expect(isAnalyticsEnabled("localhost", "index,follow")).toBe(false);
    expect(isAnalyticsEnabled("topperfume.cn", "noindex,nofollow")).toBe(false);
    expect(isAnalyticsEnabled("topperfume.cn", "index,follow")).toBe(true);
    expect(buildInquirySuccessEvent("quote")).toEqual({ name: "inquiry_submit_success", params: { inquiry_intent: "quote", interaction_type: "provider_accepted_submission" } });
  });
});
