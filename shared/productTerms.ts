import type { Product } from "../client/src/data/products";

// Read only explicit catalogue prices and order units; never infer a capacity or MOQ.
export function withOrderTerms(product: Product): Product {
  const price = product.b2bPrice?.match(/^US\$(\d+(?:\.\d+)?)\s*\/\s*(piece|pc|bottle|set)s?$/i);
  const moq = product.standardMoq?.match(/^(\d+)\s+(?:pieces?|pcs|bottles?|sets?)(?:$|\s+per\s)/i);
  return {
    ...product,
    unitPrice: product.unitPrice ?? (price ? Number(price[1]) : undefined),
    minimumOrderQuantity: product.minimumOrderQuantity ?? (moq ? Number(moq[1]) : undefined),
    orderUnit: product.orderUnit ?? (price?.[2] === "set" ? "set" : price?.[2] === "bottle" ? "bottle" : "piece"),
  };
}
