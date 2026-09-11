export const GA4_MEASUREMENT_ID = "G-4BX79STS9F";

export function isAnalyticsEnabled(hostname: string, robots: string) {
  return ["topperfume.cn", "www.topperfume.cn"].includes(hostname) && !robots.includes("noindex");
}

export function buildInquirySuccessEvent(intent: string) {
  return { name: "inquiry_submit_success", params: { inquiry_intent: intent, interaction_type: "provider_accepted_submission" } };
}

export type AnalyticsProductContext = {
  productName?: string;
  sku?: string;
  category?: string;
};

export type WhatsAppTrackingIntent = "sample" | "quote" | "project" | "whatsapp";

export function buildPageViewEvent(pagePath: string, pageTitle: string, pageLocation: string) {
  return {
    name: "page_view",
    params: {
      page_location: pageLocation,
      page_title: pageTitle,
      page_path: pagePath,
    },
  } as const;
}

export function createPageViewDeduper() {
  let lastKey: string | undefined;
  return (pagePath: string, pageTitle: string) => {
    const nextKey = `${pagePath}|${pageTitle}`;
    if (nextKey === lastKey) return false;
    lastKey = nextKey;
    return true;
  };
}

export function buildViewItemEvent(product: Required<Pick<AnalyticsProductContext, "productName" | "sku" | "category">>, pageLocation: string) {
  return {
    name: "view_item",
    params: {
      page_location: pageLocation,
      sku: product.sku,
      items: [{
        item_id: product.sku,
        item_name: product.productName,
        item_category: product.category,
      }],
    },
  } as const;
}

function productParameters(context: AnalyticsProductContext) {
  return {
    ...(context.productName ? { product_name: context.productName } : {}),
    ...(context.sku ? { sku: context.sku } : {}),
    ...(context.category ? { category: context.category } : {}),
  };
}

export function buildWhatsAppEvents({
  intent,
  ctaLabel,
  pageLocation,
  context = {},
}: {
  intent: WhatsAppTrackingIntent;
  ctaLabel: string;
  pageLocation: string;
  context?: AnalyticsProductContext;
}) {
  const leadType = intent === "project" ? "private_label" : intent === "whatsapp" ? undefined : intent;
  const baseParams = {
    page_location: pageLocation,
    cta_label: ctaLabel,
    ...productParameters(context),
    ...(leadType ? { lead_type: leadType } : {}),
  };

  return [
    { name: "whatsapp_click", params: { ...baseParams, interaction_type: "outbound_click" } },
  ] as const;
}
