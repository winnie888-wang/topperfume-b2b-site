/**
 * Maison Mercantile design reminder: a Product Detail page is a buyer decision surface.
 * The product visual remains dominant; visible specifications, transparent confirmation markers and direct commercial actions make the next step clear.
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, PackageOpen } from "lucide-react";
import { InquiryDrawer, SiteShell, WhatsAppAction } from "@/components/SiteShell";
import { getProduct, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug);
  if (!product) return <SiteShell><section className="not-found-page"><p className="eyebrow">PRODUCT NOT FOUND</p><h1>Let’s return to the collection.</h1><Link className="text-link" href="/collections/fragrance">Browse products <ArrowRight size={16} /></Link></section></SiteShell>;
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const context = { productName: product.name, productUrl: `/products/${product.slug}`, category: product.category };
  const variableLabel = product.category === "fragrance" ? "Fragrance" : product.category === "skincare" ? "Formula" : "Shade";
  const decisionRows = [["Available Size", product.format], [variableLabel, `${product.descriptor} [TO CONFIRM]`], ["Packaging", "Component, cap and carton [TO CONFIRM]"], ["Logo Customization", "Available for review [TO CONFIRM]"], ["Private Label", "Available [TO CONFIRM]"], ["MOQ", "[TO CONFIRM]"], ["Lead Time", "[TO CONFIRM]"]];
  return <SiteShell>
    <section className="breadcrumb"><Link href={`/collections/${product.category}`}><ArrowLeft size={15} /> Back to {product.category}</Link><span>/</span><span>{product.name}</span></section>
    <section className={`pdp-hero pdp-${product.category}`}><div className="pdp-image-stage"><span className="pdp-index">01 / PRODUCT REFERENCE</span><img src={product.image} alt={`${product.category} authorised product visual`} /><span className="pdp-visual-tag">Authorized product visual · title [NAME TO CONFIRM]</span></div><div className="pdp-copy"><p className="eyebrow">{product.category} / {product.format}</p><h1>{product.name}{product.nameStatus && <span className="product-name-status">{product.nameStatus}</span>}</h1><p className="pdp-descriptor">{product.descriptor}</p><p className="pdp-intro">{product.briefing}</p><div className="pdp-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="pdp-cta-row"><InquiryDrawer triggerLabel="Request Sample" intent="sample" context={context} /><InquiryDrawer triggerLabel="Get Quote" intent="quote" context={context} triggerClassName="button-rose" /><WhatsAppAction context={context} /></div><p className="pdp-disclaimer">Preview actions only. Live routing, MOQ and lead time are intentionally marked [TO CONFIRM].</p></div></section>
    <section className="decision-module"><div className="decision-module-copy"><p className="eyebrow">B2B DECISION MODULE</p><h2>Product details buyers need.</h2><p>Use these decision fields to assess fit before requesting a sample or a quote. Any unverified operating information remains clearly marked.</p><PackageOpen size={32} /></div><dl className="decision-grid">{decisionRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    {product.notes && <section className="note-architecture"><div><p className="eyebrow">SCENT ARCHITECTURE</p><h2>A fragrance reference.</h2><p>Use this profile as a clear starting point for fragrance adaptation and brand positioning.</p></div><div className="note-grid"><article><span>TOP NOTES</span><p>{product.notes.top}</p></article><article><span>HEART NOTES</span><p>{product.notes.heart}</p></article><article><span>BASE NOTES</span><p>{product.notes.base}</p></article></div></section>}
    <section className="development-board"><div className="development-board-copy"><p className="eyebrow">CUSTOMIZATION SCOPE</p><h2>Make the product yours.</h2><p>Move from this product reference into the appropriate private-label, OEM or ODM conversation.</p></div><div className="development-list"><p><Check size={19} /><span><strong>Product expression</strong>{product.category === "fragrance" ? "Fragrance family and positioning." : product.category === "skincare" ? "Formula and care proposition." : "Shade, finish and colour story."}</span></p><p><Check size={19} /><span><strong>Packaging &amp; logo</strong>Component, artwork, logo and carton scope [TO CONFIRM].</span></p><p><Check size={19} /><span><strong>Sample to quote</strong>Use the actions above with this exact product context already attached.</span></p></div></section>
    <section className="related-section"><div className="section-head"><div><p className="eyebrow">RELATED PRODUCTS</p><h2>Keep browsing.</h2></div><Link className="text-link" href={`/collections/${product.category}`}>See all {product.category} <ArrowRight size={16} /></Link></div><div className="product-grid related-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.slug} />)}</div></section>
    <section className="closing-banner"><Check size={20} /><p>Choose the next action: sample, quote or project.</p><InquiryDrawer triggerLabel="Start Your Project" context={context} /></section>
  </SiteShell>;
}
