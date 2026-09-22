import { dispatchGuidance, samplePolicy, skuDispatchGuidance } from "./businessPolicy";
/** User-confirmed service terms, 2026-09-22. See docs/PHASE3_COMMERCIAL_PAGES.md.
 * These are independent project terms, never eligibility or inventory facts for a branded SKU.
 */
export const perfumeProjectTerms = [
  { label: "Private label", moq: 100 },
  { label: "Logo customization", moq: 100 },
  { label: "Packaging customization", moq: 300 },
  { label: "Custom fragrance", moq: 100 },
] as const;

export const perfumeSamplePolicy = samplePolicy;
export const perfumeStockDispatch = dispatchGuidance;
export const perfumeSkuDispatch = skuDispatchGuidance;
export const perfumeProjectScope = "Private-label projects are separate from branded wholesale products. Product selection, supplier feasibility and the final project scope require confirmation. These terms do not authorize relabeling, repackaging or changing the fragrance of a branded SKU.";

export const perfumeProjectSummary = perfumeProjectTerms.map(term => `${term.label} MOQ: ${term.moq} pcs`).join("; ");
