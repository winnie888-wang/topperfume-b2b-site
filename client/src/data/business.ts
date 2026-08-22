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
  context?: { productName?: string; productUrl?: string; category?: string; standardMoq?: string; leadTime?: string; sampleAvailability?: string; customizationNote?: string };
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
  const standardMoq = input.context?.standardMoq || commercialTerms.standard[0].value;
  const leadTime = input.context?.leadTime || commercialTerms.standard[1].value;
  const sampleAvailability = input.context?.sampleAvailability || commercialTerms.standard[2].value;
  const customTerms = input.context?.customizationNote
    ? input.context.customizationNote
    : input.context?.category === "skincare"
    ? "Custom logo and packaging: from 100 pcs. Formula, claims and testing scope require confirmation."
    : "Custom logo, packaging and fragrance: from 100 pcs. Product-specific scope and final terms require confirmation.";
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
    `Standard order: MOQ ${standardMoq}; ${leadTime}; Free samples: ${sampleAvailability}.`,
    customTerms,
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
  const customMoq = product.customizationMoq || (product.customizationStatus === TO_CONFIRM ? TO_CONFIRM : "from 100 pcs");
  const productCustomScopeNeedsConfirmation = customMoq === TO_CONFIRM;
  const variableValue = product.category === "fragrance" && product.fragranceFamily
    ? `${product.fragranceFamily}${product.concentration ? ` · ${product.concentration}` : ""}`
    : product.category === "skincare" && product.keyIngredients
      ? product.keyIngredients
      : product.category === "makeup" && product.shadeOptions
        ? product.shadeOptions
      : variable.value;
  const hasConfirmedVariable = (product.category === "fragrance" && Boolean(product.fragranceFamily)) || (product.category === "skincare" && Boolean(product.keyIngredients)) || (product.category === "makeup" && Boolean(product.shadeOptions));
  return [
    { label: "Available Size", value: product.format, status: hasConfirmedData && product.format !== TO_CONFIRM ? undefined : TO_CONFIRM },
    { label: variable.label, value: variableValue, status: hasConfirmedData && hasConfirmedVariable ? undefined : TO_CONFIRM },
    { label: "Packaging", value: product.packaging || "Reference packaging · custom packaging from 100 pcs", status: product.packaging ? undefined : TO_CONFIRM },
    { label: "Logo Customization", value: product.customLogoStatus || (productCustomScopeNeedsConfirmation ? "Product-specific logo scope" : "Custom logo from 100 pcs"), status: product.customLogoStatus ? undefined : productCustomScopeNeedsConfirmation ? TO_CONFIRM : undefined },
    { label: "Private Label", value: product.privateLabelStatus || (product.privateLabelAvailable ? "Available" : "Project pathway and final scope"), status: product.privateLabelStatus || product.privateLabelAvailable ? undefined : TO_CONFIRM },
    { label: "MOQ", value: `Standard: ${product.standardMoq || "2 pcs"} · Custom: ${customMoq}`, status: productCustomScopeNeedsConfirmation ? TO_CONFIRM : undefined },
    { label: "Lead Time", value: "Standard: approx. 7 days · Custom schedule", status: TO_CONFIRM },
  ];
}

export function getProductStandardTerms(product: Product) {
  return [
    { label: "Standard MOQ", value: product.standardMoq || commercialTerms.standard[0].value },
    { label: "Lead Time", value: product.leadTime || commercialTerms.standard[1].value },
    { label: "Free Samples", value: product.sampleAvailability || commercialTerms.standard[2].value },
  ];
}

export function getProductCustomTerms(product: Product) {
  const hasExplicitCustomTerms = Boolean(product.privateLabelStatus || product.customLogoStatus || product.customPackagingStatus || product.customShadesStatus || product.customizationMoq);
  if (hasExplicitCustomTerms) {
    return [
      { label: "Private Label", value: product.privateLabelStatus || TO_CONFIRM },
      { label: "Custom Logo", value: product.customLogoStatus || TO_CONFIRM },
      { label: "Custom Packaging", value: product.customPackagingStatus || TO_CONFIRM },
      { label: "Custom Shades", value: product.customShadesStatus || TO_CONFIRM },
      { label: "Customization MOQ", value: product.customizationMoq || TO_CONFIRM },
    ];
  }
  if (product.customizationStatus === TO_CONFIRM) {
    return product.category === "makeup"
      ? [
        { label: "Private Label", value: TO_CONFIRM },
        { label: "Custom Logo", value: TO_CONFIRM },
        { label: "Custom Packaging", value: TO_CONFIRM },
        { label: "Custom Shades", value: TO_CONFIRM },
      ]
      : [
        { label: "Custom Logo", value: TO_CONFIRM },
        { label: "Custom Packaging", value: TO_CONFIRM },
        { label: "Product Scope", value: TO_CONFIRM },
      ];
  }
  if (product.category === "skincare") {
    return [
      { label: "Custom Logo", value: "From 100 pcs" },
      { label: "Custom Packaging", value: "From 100 pcs" },
      { label: "Formula / Claims", value: TO_CONFIRM },
    ];
  }
  return commercialTerms.custom;
}

export function getProductInquiryCustomizationNote(product: Product) {
  if (product.privateLabelStatus || product.customLogoStatus || product.customPackagingStatus || product.customShadesStatus || product.customizationMoq) {
    return "Private Label and Custom Logo are available according to supplied product information. Custom Packaging, Custom Shade Range and all customization MOQ require confirmation.";
  }
  return product.customizationStatus === TO_CONFIRM
    ? "Private label, custom logo, custom packaging, custom shades and all customization MOQ require confirmation."
    : product.category === "skincare"
      ? "Custom logo and packaging: from 100 pcs. Formula, claims and testing scope require confirmation."
      : "Custom logo, packaging and fragrance: from 100 pcs. Product-specific scope and final terms require confirmation.";
}

export function getDevelopmentScope(category: ProductCategory) {
  return category === "fragrance"
    ? "Fragrance direction, format and positioning."
    : category === "skincare"
      ? "Formula direction, care proposition and claims scope."
      : "Shade, finish, colour story and component scope.";
}
