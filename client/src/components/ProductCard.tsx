/**
 * Maison Mercantile design reminder: product photographs lead, while the concise
 * purchase signal remains available beneath it. Cards should feel like catalogue spreads, not generic UI tiles.
 */
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const customization = product.category === "fragrance" ? "Scent + label brief" : product.category === "skincare" ? "Formula + component brief" : "Shade + component brief";
  return (
    <article className={`product-card product-card-${product.category}`}>
      <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={`View ${product.name}`}>
        <div className="product-card-index">{String(index + 1).padStart(2, "0")}</div>
        <img src={product.image} alt={`${product.name} product visual`} className="product-image" />
        <span className="product-view">View brief <ArrowUpRight size={15} /></span>
      </Link>
      <div className="product-meta">
        <div className="product-format"><span>{product.category}</span><span>{product.realImage ? "Real visual" : "Concept visual"}</span></div>
        <Link href={`/products/${product.slug}`} className="product-name">{product.name}</Link>
        <p>{product.descriptor}</p>
        <div className="procurement-fields">
          <span><b>Format</b>{product.format}</span>
          <span><b>Sample</b>Brief-led</span>
          <span><b>Custom</b>{customization}</span>
          <span><b>Visual</b>{product.realImage ? "Supplied product" : "Packaging direction"}</span>
        </div>
      </div>
    </article>
  );
}
