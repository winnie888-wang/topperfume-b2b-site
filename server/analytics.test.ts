import { describe, expect, it } from "vitest";
import { GA4_MEASUREMENT_ID, buildPageViewEvent, buildViewItemEvent, buildWhatsAppEvents, createPageViewDeduper } from "../shared/analytics";

describe("GA4 analytics event definitions", () => {
  const product = { productName: "Retinol + Ferulic Acid Firming Body Lotion", sku: "SK-BL-RET-444", category: "skincare" };
  const pageLocation = "https://topperfume.cn/products/retinol-ferulic-acid-firming-body-lotion";

  it("uses the approved GA4 measurement ID and a manual single-page page_view payload", () => {
    expect(GA4_MEASUREMENT_ID).toBe("G-4BX79STS9F");
    expect(buildPageViewEvent("/collections/fragrance", "Fragrance Wholesale Catalogue | TopPerfume", "https://topperfume.cn/collections/fragrance")).toEqual({
      name: "page_view",
      params: {
        page_location: "https://topperfume.cn/collections/fragrance",
        page_title: "Fragrance Wholesale Catalogue | TopPerfume",
        page_path: "/collections/fragrance",
      },
    });
  });

  it("deduplicates a repeated SPA route and title pair while preserving distinct route views", () => {
    const shouldTrackPageView = createPageViewDeduper();
    expect(shouldTrackPageView("/", "TopPerfume")).toBe(true);
    expect(shouldTrackPageView("/", "TopPerfume")).toBe(false);
    expect(shouldTrackPageView("/collections/fragrance", "Fragrance Wholesale Catalogue | TopPerfume")).toBe(true);
  });

  it("sends view_item with SKU, product name, category and location without price data", () => {
    const event = buildViewItemEvent(product, pageLocation);
    expect(event).toEqual({
      name: "view_item",
      params: {
        page_location: pageLocation,
        sku: "SK-BL-RET-444",
        items: [{ item_id: "SK-BL-RET-444", item_name: product.productName, item_category: "skincare" }],
      },
    });
    expect(JSON.stringify(event)).not.toContain("price");
  });

  it("maps the three principal WhatsApp actions to generate_lead and whatsapp_click", () => {
    const cases = [
      ["sample", "Request Free Sample", "sample"],
      ["quote", "Get Wholesale Quote", "quote"],
      ["project", "Customize / Private Label", "private_label"],
    ] as const;

    for (const [intent, label, leadType] of cases) {
      const events = buildWhatsAppEvents({ intent, ctaLabel: label, context: product, pageLocation });
      expect(events).toHaveLength(2);
      expect(events[0]).toMatchObject({ name: "generate_lead", params: { lead_type: leadType, cta_label: label, product_name: product.productName, sku: product.sku, category: product.category, page_location: pageLocation } });
      expect(events[1]).toMatchObject({ name: "whatsapp_click", params: { lead_type: leadType, cta_label: label } });
    }
  });

  it("records generic WhatsApp use without inventing a lead type", () => {
    const events = buildWhatsAppEvents({ intent: "whatsapp", ctaLabel: "WhatsApp", context: product, pageLocation });
    expect(events).toEqual([{ name: "whatsapp_click", params: { page_location: pageLocation, cta_label: "WhatsApp", product_name: product.productName, sku: product.sku, category: product.category } }]);
  });
});
