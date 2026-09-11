import { getProduct } from "../client/src/data/products";
import { withOrderTerms } from "../shared/productTerms";
import type { InquiryEmailInput } from "./inquiry";

// Resolve commercial facts on the server; client-supplied prices are never authoritative.
export function resolveInquiryProduct(input: InquiryEmailInput): InquiryEmailInput {
  const quantity = Number(input.quantity);
  if (!Number.isSafeInteger(quantity) || quantity < 1) throw new Error("Enter a positive whole-number quantity.");
  if (!input.productUrl) return input;
  const url = new URL(input.productUrl);
  const match = url.pathname.match(/^\/products\/([^/]+)\/?$/);
  const source = match && getProduct(match[1]);
  if (!source) throw new Error("Please select a product from the catalogue.");
  const product = withOrderTerms(source);
  const variant = product.variants?.find(item => item.id === url.searchParams.get("variant"));
  if (product.variants && !variant) throw new Error("Please select a product variant.");
  const minimum = variant?.minimumOrderQuantity ?? product.minimumOrderQuantity;
  if (minimum !== undefined && quantity < minimum) throw new Error(`Minimum order: ${minimum} pieces for the selected product.`);
  const price = variant?.unitPrice ?? product.unitPrice;
  return { ...input, productName: variant?.name ?? product.name, sku: product.sku,
    productUrl: `https://topperfume.cn/products/${product.slug}${variant ? `?variant=${variant.id}` : ""}`,
    category: product.productType ?? product.category, format: variant?.format ?? product.format,
    standardMoq: minimum === undefined ? "To be confirmed" : `${minimum} ${product.orderUnit ?? "piece"}s`,
    unitPrice: price === undefined ? "To be confirmed" : `US$${price.toFixed(2)} / ${product.orderUnit ?? "piece"}`,
    subtotal: price === undefined ? "To be confirmed" : `US$${(price * quantity).toFixed(2)}` };
}
