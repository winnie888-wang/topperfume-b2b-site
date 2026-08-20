/**
 * Maison Mercantile design reminder: product photographs lead, while concise B2B decisions
 * and request actions stay immediately available. Cards must feel like a premium buying catalogue, not an agency moodboard.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { InquiryDrawer } from "@/components/SiteShell";
import { getCustomizationLabel, TO_CONFIRM } from "@/data/business";
import type { Product } from "@/data/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const customField = getCustomizationLabel(product.category);
  const context = { productName: product.name, productUrl: `/products/${product.slug}`, category: product.category };
  return <article className={`product-card product-card-${product.category}`}>
    <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={`View ${product.name}`}><div className="product-card-index">{String(index + 1).padStart(2, "0")}</div><img src={product.image} alt={`${product.category} authorised product visual`} className="product-image" /><span className="catalogue-plate-caption">Authorized reference plate</span><span className="product-view">View Details <ArrowRight size={15} /></span></Link>
    <div className="product-meta"><div className="product-format"><span>{product.category}</span><span>{product.realImage ? "Authorized visual" : "Concept visual"}</span></div><Link href={`/products/${product.slug}`} className="product-name">{product.name}{product.nameStatus && <span className="product-name-status">{product.nameStatus}</span>}</Link><p className="product-type">Reference format: {product.format}<em className="procurement-note">{TO_CONFIRM}</em></p><div className="product-commercial"><span><b>Product Type</b>{product.descriptor}<em className="procurement-note">{TO_CONFIRM}</em></span><span><b>Customizable</b>{customField}<em className="procurement-note">{TO_CONFIRM}</em></span><span><b>Private Label</b>Availability<em className="procurement-note">{TO_CONFIRM}</em></span></div><div className="product-card-actions"><Link href={`/products/${product.slug}`} className="card-details-action">View Details <ArrowRight size={14} /></Link><InquiryDrawer triggerLabel="Request Sample" intent="sample" context={context} triggerClassName="card-sample-action" /></div></div>
  </article>;
}
