/**
 * Phase 3 business-content reminder: these labels organise a buyer conversation only.
 * Never convert a reference visual into an unverified claim; every unconfirmed commercial field stays [TO CONFIRM].
 */
import type { Product, ProductCategory } from "@/data/products";

export const TO_CONFIRM = "[TO CONFIRM]";

/**
 * Add verified routing values through deployment environment variables when approved.
 * Empty values intentionally keep this prototype from inventing an email address or WhatsApp number.
 */
export const inquiryRouting = {
  email: (import.meta.env.VITE_INQUIRY_EMAIL || "").trim(),
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, ""),
};

export type InquiryIntentKey = "sample" | "quote" | "project" | "whatsapp";
export type InquirySummaryInput = {
  intent: InquiryIntentKey;
  context?: { productName?: string; productUrl?: string; category?: string };
  name?: string;
  country?: string;
  email?: string;
  whatsapp?: string;
  quantity?: string;
  customization?: string;
  notes?: string;
};

const inquiryTitle: Record<InquiryIntentKey, string> = {
  sample: "REQUEST SAMPLE",
  quote: "GET QUOTE",
  project: "START PROJECT",
  whatsapp: "WHATSAPP INQUIRY",
};

export function buildInquirySummary(input: InquirySummaryInput) {
  const lines = [
    `TOPPERFUME B2B / ${inquiryTitle[input.intent]}`,
    "",
    `Product: ${input.context?.productName || TO_CONFIRM}`,
    `Product URL: ${input.context?.productUrl || TO_CONFIRM}`,
    `Category: ${input.context?.category || TO_CONFIRM}`,
    `Name: ${input.name || TO_CONFIRM}`,
    `Country / Market: ${input.country || TO_CONFIRM}`,
    `Email: ${input.email || TO_CONFIRM}`,
    `WhatsApp: ${input.whatsapp || TO_CONFIRM}`,
    `Estimated Quantity: ${input.quantity || TO_CONFIRM}`,
    `Customization: ${input.customization || TO_CONFIRM}`,
    `Notes: ${input.notes || TO_CONFIRM}`,
    "",
    "MOQ, lead time, packaging, formula and final commercial terms require confirmation.",
  ];
  return lines.join("\n");
}

export function getInquiryMailto(summary: string) {
  return `mailto:${inquiryRouting.email}?subject=${encodeURIComponent("TopPerfume B2B inquiry")}&body=${encodeURIComponent(summary)}`;
}

export function getInquiryWhatsAppUrl(summary: string) {
  return `https://wa.me/${inquiryRouting.whatsappNumber}?text=${encodeURIComponent(summary)}`;
}

export type DecisionField = { label: string; value: string; status?: string };
export type BuyerGuideField = { value: string; status?: string };

const variableByCategory: Record<ProductCategory, { label: string; value: string }> = {
  fragrance: { label: "Fragrance", value: "Fragrance brief and concentration" },
  skincare: { label: "Formula", value: "Formula, claims and testing scope" },
  makeup: { label: "Shade", value: "Shade, finish and payload scope" },
};

export const collectionBuyerGuide: Record<ProductCategory, { reference: BuyerGuideField; variable: BuyerGuideField; packaging: BuyerGuideField; commercial: BuyerGuideField }> = {
  fragrance: { reference: { value: "Fragrance formats shown", status: TO_CONFIRM }, variable: { value: "Fragrance brief", status: TO_CONFIRM }, packaging: { value: "Bottle, cap and carton", status: TO_CONFIRM }, commercial: { value: "MOQ + lead time", status: TO_CONFIRM } },
  skincare: { reference: { value: "Body-care formats shown", status: TO_CONFIRM }, variable: { value: "Formula + claims", status: TO_CONFIRM }, packaging: { value: "Pump, component and carton", status: TO_CONFIRM }, commercial: { value: "MOQ + lead time", status: TO_CONFIRM } },
  makeup: { reference: { value: "Colour and gift formats shown", status: TO_CONFIRM }, variable: { value: "Shade + finish", status: TO_CONFIRM }, packaging: { value: "Component, artwork and carton", status: TO_CONFIRM }, commercial: { value: "MOQ + lead time", status: TO_CONFIRM } },
};

export function getCustomizationLabel(category: ProductCategory) {
  return category === "fragrance" ? "Fragrance + logo" : category === "skincare" ? "Formula + logo" : "Shade + logo";
}

export function getProductDecisionRows(product: Product): DecisionField[] {
  const variable = variableByCategory[product.category];
  return [
    { label: "Available Size", value: `Reference format shown: ${product.format}`, status: TO_CONFIRM },
    { label: variable.label, value: variable.value, status: TO_CONFIRM },
    { label: "Packaging", value: "Component, closure and carton options", status: TO_CONFIRM },
    { label: "Logo Customization", value: "Logo placement and artwork handoff", status: TO_CONFIRM },
    { label: "Private Label", value: "Availability and programme terms", status: TO_CONFIRM },
    { label: "MOQ", value: "Commercial threshold", status: TO_CONFIRM },
    { label: "Lead Time", value: "Production scheduling", status: TO_CONFIRM },
  ];
}

export function getDevelopmentScope(category: ProductCategory) {
  return category === "fragrance"
    ? "Fragrance direction, format and positioning."
    : category === "skincare"
      ? "Formula direction, care proposition and claims scope."
      : "Shade, finish, colour story and component scope.";
}
