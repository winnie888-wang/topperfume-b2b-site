import { canonicalPublicWebsiteUrl } from "@shared/seo";
import {
  buildPageViewEvent,
  buildViewItemEvent,
  buildWhatsAppEvents,
  createPageViewDeduper,
  isAnalyticsEnabled,
  buildInquirySuccessEvent,
  type AnalyticsProductContext,
  type WhatsAppTrackingIntent,
} from "@shared/analytics";

type GtagCommand = ["event", string, Record<string, unknown>];

declare global {
  interface Window {
    gtag?: (...command: GtagCommand) => void;
    dataLayer?: unknown[][];
  }
}

const shouldTrackPageView = createPageViewDeduper();

function sendEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!isAnalyticsEnabled(window.location.hostname, document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "")) return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
    return;
  }
  window.dataLayer?.push(["event", name, params]);
}

export function trackInquirySuccess(intent: string) {
  const event = buildInquirySuccessEvent(intent);
  sendEvent(event.name, event.params);
}

function canonicalPageLocation(path: string) {
  return `${canonicalPublicWebsiteUrl}${path === "/" ? "/" : path}`;
}

export function trackPageView(path: string, title = document.title) {
  const pageLocation = canonicalPageLocation(path);
  if (!shouldTrackPageView(path, title)) return;
  const event = buildPageViewEvent(path, title, pageLocation);
  sendEvent(event.name, event.params);
}

export function trackProductView(context: Required<Pick<AnalyticsProductContext, "productName" | "sku" | "category">>, path: string) {
  const event = buildViewItemEvent(context, canonicalPageLocation(path));
  sendEvent(event.name, event.params);
}

export function trackWhatsAppCta(intent: WhatsAppTrackingIntent, ctaLabel: string, context: AnalyticsProductContext = {}) {
  const events = buildWhatsAppEvents({
    intent,
    ctaLabel,
    context,
    pageLocation: canonicalPageLocation(window.location.pathname),
  });
  events.forEach(event => sendEvent(event.name, event.params));
}
