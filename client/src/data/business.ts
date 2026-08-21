/**
 * Phase 3 business-content reminder: these labels organise a buyer conversation only.
 * Verified commercial terms are stated exactly; product-specific requirements remain [TO CONFIRM].
 */
import type { Product, ProductCategory } from "@/data/products";

export const TO_CONFIRM = "[TO CONFIRM]";

export const businessProfile = {
  companyName: "Guiqi Technology Co., Ltd.",
  email: "melody888666@yeah.net",
  whatsappNumber: "8619066782710",
  whatsappDisplay: "+86 190 6678 2710",
} as const;

export const commercialTerms = {
  standard: [
    { label: "Standard MOQ", value: "2 pcs" },
    { label: "Lead Time", value: "Approx. 7 days" },
    { label: "Free Samples", value: "Available" },
  ],
  custom: [
    { label: "Custom Logo", value: "From 100 pcs" },
    { label: "Custom Packaging", value: "From 100 pcs" },
    { label: "Custom Fragrance", value: "From 100 pcs" },
  ],
} as const;

/**
 * Verified direct routes are public business contact details. Environment values remain
 * optional overrides for a future staging or production configuration.
 */
export const inquiryRouting = {
  email: (import.meta.env.VITE_INQUIRY_EMAIL || businessProfile.email).trim(),
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER || businessProfile.whatsappNumber).replace(/\D/g, ""),
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
    `For: ${businessProfile.companyName}`,
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
    "Standard order: MOQ 2 pcs; approx. 7 days; free samples available.",
    "Custom logo, packaging and fragrance: from 100 pcs. Product-specific scope and final terms require confirmation.",
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
  fragrance: { reference: { value: "Fragrance formats shown", status: TO_CONFIRM }, variable: { value: "Fragrance brief", status: TO_CONFIRM }, packaging: { value: "Bottle, cap and carton", status: TO_CONFIRM }, commercial: { value: "Standard 2 pcs / approx. 7 days · custom from 100 pcs" } },
  skincare: { reference: { value: "Body-care formats shown", status: TO_CONFIRM }, variable: { value: "Formula + claims", status: TO_CONFIRM }, packaging: { value: "Pump, component and carton", status: TO_CONFIRM }, commercial: { value: "Standard 2 pcs / approx. 7 days · custom from 100 pcs" } },
  makeup: { reference: { value: "Colour and gift formats shown", status: TO_CONFIRM }, variable: { value: "Shade + finish", status: TO_CONFIRM }, packaging: { value: "Component, artwork and carton", status: TO_CONFIRM }, commercial: { value: "Standard 2 pcs / approx. 7 days · custom from 100 pcs" } },
};

export function getCustomizationLabel(category: ProductCategory) {
  return category === "fragrance" ? "Fragrance + logo" : category === "skincare" ? "Formula + logo" : "Shade + logo";
}

export function getProductDecisionRows(product: Product): DecisionField[] {
  const variable = variableByCategory[product.category];
  const hasConfirmedData = product.dataStatus === "confirmed";
  const variableValue = product.category === "fragrance" && product.fragranceFamily
    ? `${product.fragranceFamily}${product.concentration ? ` · ${product.concentration}` : ""}`
    : variable.value;
  return [
    { label: "Available Size", value: product.format, status: hasConfirmedData ? undefined : TO_CONFIRM },
    { label: variable.label, value: variableValue, status: hasConfirmedData && product.category === "fragrance" ? undefined : TO_CONFIRM },
    { label: "Packaging", value: product.packaging || "Reference packaging · custom packaging from 100 pcs", status: product.packaging ? undefined : TO_CONFIRM },
    { label: "Logo Customization", value: "Custom logo from 100 pcs" },
    { label: "Private Label", value: product.privateLabelAvailable ? "Available" : "Project pathway and final scope", status: product.privateLabelAvailable ? undefined : TO_CONFIRM },
    { label: "MOQ", value: "Standard: 2 pcs · Custom: from 100 pcs" },
    { label: "Lead Time", value: "Standard: approx. 7 days · Custom schedule", status: TO_CONFIRM },
  ];
}

export function getDevelopmentScope(category: ProductCategory) {
  return category === "fragrance"
    ? "Fragrance direction, format and positioning."
    : category === "skincare"
      ? "Formula direction, care proposition and claims scope."
      : "Shade, finish, colour story and component scope.";
}
