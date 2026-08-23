/**
 * Phase 3 business-content reminder: these labels organise a buyer conversation only.
 * Verified commercial terms are stated exactly; internal pending source fields never render raw on buyer-facing pages.
 */
import type { Product, ProductCategory } from "@/data/products";

export const TO_CONFIRM = "[TO CONFIRM]";
export const CUSTOMER_DETAILS = "Contact us for details";
export const catalogueMoqGuidance = "Low MOQ available — MOQ varies by SKU. Selected fragrance products from 2 pcs. Many skincare and makeup products from 12 pcs.";

const brandedWholesaleSlugs = new Set([
  "dior-sauvage-parfum-spray-men",
  "carolina-herrera-good-girl-blush-tweed-talk-edp-women",
  "carolina-herrera-very-good-girl-glam-edp-women",
  "yves-saint-laurent-mon-paris-parfum-women",
  "vitamin-c-niacinamide-brightening-body-lotion",
  "retinol-ferulic-acid-firming-body-lotion",
  "olay-dark-spot-correcting-body-lotion",
  "jergens-ultra-healing-body-lotion",
  "victorias-secret-bare-vanilla-body-fragrance-mist",
]);

export function isPendingValue(value?: string) {
  return !value || value === TO_CONFIRM;
}

export function customerValue(value?: string) {
  return isPendingValue(value) ? CUSTOMER_DETAILS : value ?? CUSTOMER_DETAILS;
}

export function getProductCommercialType(product: Product) {
  return brandedWholesaleSlugs.has(product.slug) ? "Branded Wholesale" : "Private Label / OEM ODM";
}

export const businessProfile = {
  companyName: "Guiqi Technology Co., Ltd.",
  email: "melody888666@yeah.net",
  whatsappNumber: "8619066782710",
  whatsappDisplay: "+86 190 6678 2710",
} as const;

export const canonicalPublicWebsiteUrl = "https://topperfume.cn";

export function getCanonicalProductUrl(productUrl?: string) {
  if (!productUrl) return undefined;
  try {
    const pathname = new URL(productUrl, canonicalPublicWebsiteUrl).pathname;
    return pathname.startsWith("/products/") ? `${canonicalPublicWebsiteUrl}${pathname}` : productUrl;
  } catch {
    return productUrl;
  }
}

export const commercialTerms = {
  standard: [
    { label: "MOQ guidance", value: "MOQ varies by SKU" },
    { label: "Lead Time", value: "Approx. 7 days for selected SKUs" },
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
export type WhatsAppCtaIntent = "sample" | "quote" | "project";
export type InquirySummaryInput = {
  intent: InquiryIntentKey;
  context?: { productName?: string; sku?: string; productUrl?: string; category?: string; standardMoq?: string; leadTime?: string; sampleAvailability?: string; customizationNote?: string };
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
  const standardMoq = customerValue(input.context?.standardMoq);
  const leadTime = input.context?.leadTime || commercialTerms.standard[1].value;
  const sampleAvailability = input.context?.sampleAvailability || commercialTerms.standard[2].value;
  const customTerms = input.context?.customizationNote
    ? input.context.customizationNote
    : "Contact us for product-specific customization scope and commercial terms.";
  const lines = [
    `TOPPERFUME B2B / ${inquiryTitle[input.intent]}`,
    `For: ${businessProfile.companyName}`,
    "",
    `Product: ${input.context?.productName || "Not specified"}`,
    `Product URL: ${input.context?.productUrl || "Not specified"}`,
    `Category: ${input.context?.category || "Not specified"}`,
    `Name: ${input.name || "Not provided"}`,
    `Country / Market: ${input.country || "Not provided"}`,
    `Email: ${input.email || "Not provided"}`,
    `WhatsApp: ${input.whatsapp || "Not provided"}`,
    `Estimated Quantity: ${input.quantity || "Not provided"}`,
    `Customization: ${input.customization || "Not provided"}`,
    `Notes: ${input.notes || "Not provided"}`,
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

const whatsAppCtaIntro: Record<WhatsAppCtaIntent, string> = {
  sample: "Hi, I'm interested in requesting a free sample of this product.",
  quote: "Hi, I'd like to get a wholesale quote for this product.",
  project: "Hi, I'm interested in private label / OEM / ODM customization for this product.",
};

export function buildWhatsAppCtaSummary(input: { intent: WhatsAppCtaIntent; context?: InquirySummaryInput["context"] }) {
  const context = input.context;
  const productUrl = getCanonicalProductUrl(context?.productUrl);
  return [
    whatsAppCtaIntro[input.intent],
    "",
    `Product Name: ${context?.productName || "General website inquiry"}`,
    `SKU: ${context?.sku || "Not specified"}`,
    `Product URL: ${productUrl || "Not specified"}`,
    `Category: ${context?.category || "Not specified"}`,
    `MOQ: ${customerValue(context?.standardMoq)}`,
    `Lead Time: ${context?.leadTime || CUSTOMER_DETAILS}`,
  ].join("\n");
}

export function getWhatsAppCtaUrl(input: { intent: WhatsAppCtaIntent; context?: InquirySummaryInput["context"] }) {
  return getInquiryWhatsAppUrl(buildWhatsAppCtaSummary(input));
}

export type DecisionField = { label: string; value: string; status?: string };
export type BuyerGuideField = { value: string; status?: string };

const variableByCategory: Record<ProductCategory, { label: string; value: string }> = {
  fragrance: { label: "Fragrance", value: "Fragrance brief and concentration" },
  skincare: { label: "Formula", value: "Formula, claims and testing scope" },
  makeup: { label: "Shade", value: "Shade, finish and payload scope" },
};

export const collectionBuyerGuide: Record<ProductCategory, { reference: BuyerGuideField; variable: BuyerGuideField; packaging: BuyerGuideField; commercial: BuyerGuideField }> = {
  fragrance: { reference: { value: "Confirmed fragrance formats" }, variable: { value: "Fragrance brief — contact us for details" }, packaging: { value: "Bottle, cap and carton — contact us for details" }, commercial: { value: "MOQ varies by SKU · selected fragrance products from 2 pcs" } },
  skincare: { reference: { value: "Confirmed body-care formats" }, variable: { value: "Formula + claims — contact us for details" }, packaging: { value: "Pump, component and carton — contact us for details" }, commercial: { value: "MOQ varies by SKU · many skincare products from 12 pcs" } },
  makeup: { reference: { value: "Confirmed colour-makeup formats" }, variable: { value: "Shade + finish — contact us for details" }, packaging: { value: "Component, artwork and carton — contact us for details" }, commercial: { value: "MOQ varies by SKU · many makeup products from 12 pcs" } },
};

export function getCustomizationLabel(category: ProductCategory) {
  return category === "fragrance" ? "Fragrance + logo" : category === "skincare" ? "Formula + logo" : "Shade + logo";
}

export function getProductDecisionRows(product: Product): DecisionField[] {
  const variable = variableByCategory[product.category];
  const hasConfirmedData = product.dataStatus === "confirmed";
  const commercialType = getProductCommercialType(product);
  const variableValue = product.category === "fragrance" && product.fragranceFamily
    ? `${product.fragranceFamily}${product.concentration ? ` · ${product.concentration}` : ""}`
    : product.category === "skincare" && product.keyIngredients
      ? product.keyIngredients
      : product.category === "makeup" && product.shadeOptions
        ? product.shadeOptions
      : variable.value;
  const hasConfirmedVariable = (product.category === "fragrance" && Boolean(product.fragranceFamily)) || (product.category === "skincare" && Boolean(product.keyIngredients)) || (product.category === "makeup" && Boolean(product.shadeOptions));
  const sharedRows = [
    { label: "Available Size", value: customerValue(product.format) },
    { label: variable.label, value: hasConfirmedVariable ? variableValue : CUSTOMER_DETAILS },
    { label: "Packaging", value: customerValue(product.packaging) },
    { label: "Commercial Type", value: commercialType },
    { label: "MOQ", value: customerValue(product.standardMoq) },
    { label: "Lead Time", value: customerValue(product.leadTime) },
  ];
  return commercialType === "Branded Wholesale"
    ? [...sharedRows.slice(0, 4), { label: "Wholesale Terms", value: CUSTOMER_DETAILS }, ...sharedRows.slice(4)]
    : [...sharedRows.slice(0, 4), { label: "Private Label", value: customerValue(product.privateLabelStatus) }, ...sharedRows.slice(4)];
}

export function getProductStandardTerms(product: Product) {
  return [
    { label: "MOQ", value: customerValue(product.standardMoq) },
    { label: "Lead Time", value: customerValue(product.leadTime) },
    { label: "Free Samples", value: product.sampleAvailability || "Available" },
  ];
}

export function getProductCustomTerms(product: Product) {
  if (getProductCommercialType(product) === "Branded Wholesale") {
    return [
      { label: "Commercial Type", value: "Branded Wholesale" },
      { label: "Wholesale Terms", value: "Contact us for details" },
    ];
  }
  const hasExplicitCustomTerms = Boolean(product.privateLabelStatus || product.customLogoStatus || product.customPackagingStatus || product.customShadesStatus || product.customFragranceStatus || product.customizationMoq);
  if (hasExplicitCustomTerms) {
    return [
      { label: "Commercial Type", value: "Private Label / OEM ODM" },
      { label: "Private Label", value: customerValue(product.privateLabelStatus) },
      { label: "Custom Logo", value: customerValue(product.customLogoStatus) },
      { label: "Custom Packaging", value: customerValue(product.customPackagingStatus) },
      { label: product.category === "fragrance" ? "Custom Fragrance" : "Custom Shades", value: customerValue(product.customFragranceStatus || product.customShadesStatus) },
      { label: "Customization MOQ", value: customerValue(product.customizationMoq) },
    ];
  }
  if (product.customizationStatus === TO_CONFIRM) {
    return product.category === "makeup"
      ? [
        { label: "Commercial Type", value: "Private Label / OEM ODM" },
        { label: "Private Label", value: CUSTOMER_DETAILS },
        { label: "Custom Logo", value: CUSTOMER_DETAILS },
        { label: "Custom Packaging", value: CUSTOMER_DETAILS },
        { label: "Custom Shades", value: CUSTOMER_DETAILS },
      ]
      : [
        { label: "Commercial Type", value: "Private Label / OEM ODM" },
        { label: "Custom Logo", value: CUSTOMER_DETAILS },
        { label: "Custom Packaging", value: CUSTOMER_DETAILS },
        { label: "Product Scope", value: CUSTOMER_DETAILS },
      ];
  }
  if (product.category === "skincare") {
    return [
      { label: "Commercial Type", value: "Private Label / OEM ODM" },
      { label: "Custom Logo", value: CUSTOMER_DETAILS },
      { label: "Custom Packaging", value: CUSTOMER_DETAILS },
      { label: "Formula / Claims", value: CUSTOMER_DETAILS },
    ];
  }
  return [
    { label: "Commercial Type", value: "Private Label / OEM ODM" },
    { label: "Private Label", value: CUSTOMER_DETAILS },
    { label: "Custom Logo", value: CUSTOMER_DETAILS },
    { label: "Custom Packaging", value: CUSTOMER_DETAILS },
    { label: product.category === "fragrance" ? "Custom Fragrance" : "Custom Shades", value: CUSTOMER_DETAILS },
  ];
}

export function getProductInquiryCustomizationNote(product: Product) {
  const explicitCustomValues = [product.privateLabelStatus, product.customLogoStatus, product.customPackagingStatus, product.customShadesStatus, product.customFragranceStatus, product.customizationMoq];
  if (explicitCustomValues.some((value) => value && value !== TO_CONFIRM)) {
    return "Private Label and Custom Logo are available according to supplied product information. Contact us for details on packaging, shades and customization MOQ.";
  }
  if (explicitCustomValues.some(Boolean)) {
    return product.category === "fragrance"
      ? "Contact us for details on private label, custom logo, packaging, fragrance and customization MOQ."
      : "Contact us for details on private label, custom logo, packaging, shades and customization MOQ.";
  }
  return product.customizationStatus === TO_CONFIRM
    ? "Contact us for details on private label, custom logo, packaging, shades and customization MOQ."
    : "Contact us for product-specific customization scope and commercial terms.";
}

export function getDevelopmentScope(category: ProductCategory) {
  return category === "fragrance"
    ? "Fragrance direction, format and positioning."
    : category === "skincare"
      ? "Formula direction, care proposition and claims scope."
      : "Shade, finish, colour story and component scope.";
}
