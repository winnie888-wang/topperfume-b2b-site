/**
 * Maison Mercantile design reminder: product photographs lead, while concise B2B decisions
 * and request actions stay immediately available. Cards must feel like a premium buying catalogue, not an agency moodboard.
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { InquiryDrawer } from "@/components/SiteShell";
import { customerValue, getProductCommercialType, getProductInquiryCustomizationNote } from "@/data/business";
import type { Product } from "@/data/products";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const commercialType = getProductCommercialType(product);
  const customField = commercialType === "Branded Wholesale" ? "Contact us for wholesale options" : customerValue(product.customizationStatus);
  const privateLabelField = customerValue(product.privateLabelStatus);
  const context = { productName: product.name, productUrl: `/products/${product.slug}`, category: product.category, standardMoq: product.standardMoq, leadTime: product.leadTime, sampleAvailability: product.sampleAvailability, customizationNote: getProductInquiryCustomizationNote(product) };
  const hasConfirmedData = product.dataStatus === "confirmed";
  return <article className={`product-card product-card-${product.category} product-sku-${product.slug}`}>
    <Link href={`/products/${product.slug}`} className="product-image-wrap" aria-label={`View ${product.name}`}><div className="product-card-index">{String(index + 1).padStart(2, "0")}</div><img src={product.image} alt={`${product.name} product visual`} className="product-image" /><span className="catalogue-plate-caption">{hasConfirmedData ? "Confirmed product plate" : "Product plate"}</span><span className="product-view">View Details <ArrowRight size={15} /></span></Link>
    <div className="product-meta"><div className="product-format"><span>{product.category}</span><span>{product.realImage ? "Product visual" : "Concept visual"}</span></div><Link href={`/products/${product.slug}`} className="product-name">{product.name}{product.nameStatus && <span className="product-name-status">{product.nameStatus}</span>}</Link><p className="product-type">{hasConfirmedData && product.gender ? `${product.gender} · ${customerValue(product.format)}` : hasConfirmedData ? customerValue(product.format) : `Reference format: ${customerValue(product.format)}`}</p>{product.b2bPrice && <p className="product-b2b-price"><span>B2B PRICE</span>{customerValue(product.b2bPrice)}</p>}{product.standardMoq && <p className="product-b2b-minimum"><span>MOQ</span>{customerValue(product.standardMoq)}</p>}<div className="product-commercial"><span><b>Product Type</b>{product.descriptor}</span><span><b>Commercial Type</b>{commercialType}</span><span><b>{commercialType === "Branded Wholesale" ? "Wholesale Terms" : "Custom Scope"}</b>{customField}</span>{commercialType !== "Branded Wholesale" && <span><b>Private Label</b>{privateLabelField}</span>}</div><div className="product-card-actions"><Link href={`/products/${product.slug}`} className="card-details-action">View Details <ArrowRight size={14} /></Link><InquiryDrawer triggerLabel="Request Sample" intent="sample" context={context} triggerClassName="card-sample-action" /></div></div>
  </article>;
}
