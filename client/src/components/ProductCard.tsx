import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { WhatsAppCta } from "@/components/SiteShell";
import { customerValue, getProductCommercialType, isPendingValue } from "@/data/business";
import type { Product } from "@/data/products";

export function ProductCard({ product, index, showSampleCta = true, detailsLabel = "View Details" }: { product: Product; index: number; showSampleCta?: boolean; detailsLabel?: string }) {
  const context = { productName: product.name, sku: product.sku, productUrl: `/products/${product.slug}`, category: product.category, standardMoq: product.standardMoq, leadTime: product.leadTime, unitPrice: product.b2bPrice, format: product.format };
  const image = product.gallery?.[0];
  return <article className={`product-card product-card-${product.category} product-sku-${product.slug}`}>
    <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={`View ${product.name}`}>
      <img src={product.image} srcSet={image?.srcSet} sizes="(max-width: 620px) 90vw, (max-width: 1099px) 44vw, 28vw" width={image?.width ?? 800} height={image?.height ?? 1000} alt={image?.alt ?? `${product.name} product visual`} className="product-image" loading="lazy" decoding="async" />
      <span className="product-view">{detailsLabel} <ArrowRight size={15} /></span>
    </Link>
    <div className="product-meta">
      <div className="product-format"><span>{product.category}</span><span>{getProductCommercialType(product)}</span></div>
      <Link href={`/products/${product.slug}`} className="product-name">{product.name}{product.nameStatus && <span className="product-name-status">{product.nameStatus}</span>}</Link>
      <p className="product-type">{customerValue(product.format)}</p>
      {!isPendingValue(product.b2bPrice) && <p className="product-b2b-price"><span>UNIT PRICE</span>{product.b2bPrice}</p>}
      <p className="product-b2b-minimum"><span>MOQ</span>{isPendingValue(product.standardMoq) ? "Ask for details" : product.standardMoq}</p>
      {product.variants && <p className="product-type">{product.variants.length} {product.variantLabel === "size" ? "sizes" : "label variants"} · priced individually</p>}
      <div className="product-card-actions">
        <Link href={`/products/${product.slug}`} className="card-details-action">{detailsLabel} <ArrowRight size={14} /></Link>
        {showSampleCta && (product.variants ? <Link href={`/products/${product.slug}`} className="text-link card-sample-action">Choose Variant <ArrowRight size={14} /></Link> : <WhatsAppCta label="Get Wholesale Quote" intent="quote" context={context} className="card-sample-action" />)}
      </div>
    </div>
  </article>;
}
