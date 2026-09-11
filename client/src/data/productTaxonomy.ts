import type { Product } from "./products";

export const skincareTypes = [
  { slug: "body-lotion", label: "Body Lotion" },
  { slug: "body-wash", label: "Body Wash" },
  { slug: "body-butter", label: "Body Butter" },
  { slug: "body-oil", label: "Body Oil" },
  { slug: "face-cream", label: "Face Cream" },
  { slug: "toner", label: "Toner" },
  { slug: "facial-cleanser", label: "Facial Cleanser" },
] as const;

export function getSkincareType(product: Product) {
  const type = product.productType ?? "";
  // Preserve the original catalogue's body cream / moisturizer terminology.
  if (/body lotion|body cream|body moisturizer/i.test(type)) return "Body Lotion";
  if (type === "Body Gel Oil") return "Body Oil";
  return skincareTypes.find(item => item.label === type)?.label;
}
