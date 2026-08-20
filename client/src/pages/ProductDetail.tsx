/**
 * Maison Mercantile design reminder: a Product Detail page is a concise development brief.
 * The real product visual owns the left field; practical B2B signals and a clear inquiry path own the right.
 */
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Check, FileText, PackageOpen, Sparkles } from "lucide-react";
import { SiteShell, InquiryDrawer } from "@/components/SiteShell";
import { getProduct, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug);
  if (!product) return <SiteShell><section className="not-found-page"><p className="eyebrow">PRODUCT BRIEF NOT FOUND</p><h1>Let’s return to the collection.</h1><Link className="text-link" href="/collections/fragrance">Browse Fragrance <ArrowRight size={16} /></Link></section></SiteShell>;
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  return (
    <SiteShell>
      <section className="breadcrumb"><Link href={`/collections/${product.category}`}><ArrowLeft size={15} /> Back to {product.category}</Link><span>/</span><span>{product.name}</span></section>
      <section className={`pdp-hero pdp-${product.category}`}>
        <div className="pdp-image-stage"><span className="pdp-index">01 / PRODUCT REFERENCE</span><img src={product.image} alt={`${product.name} product visual`} /><span className="pdp-visual-tag">{product.realImage ? "Client-provided product visual" : "Concept packaging preview"}</span></div>
        <div className="pdp-copy"><p className="eyebrow">{product.category} / {product.format}</p><h1>{product.name}</h1><p className="pdp-descriptor">{product.descriptor}</p><p className="pdp-intro">{product.briefing}</p><div className="pdp-tags">{product.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><InquiryDrawer triggerLabel="Request this direction" /><p className="pdp-disclaimer">Preview action only — inquiry routing will be connected after the prototype is approved.</p></div>
      </section>

      {product.notes && <section className="note-architecture"><div><p className="eyebrow">SCENT ARCHITECTURE</p><h2>A concise olfactive reference.</h2><p>Use this profile as a conversation starter for brand positioning and custom fragrance direction.</p></div><div className="note-grid"><article><span>TOP NOTES</span><p>{product.notes.top}</p></article><article><span>HEART NOTES</span><p>{product.notes.heart}</p></article><article><span>BASE NOTES</span><p>{product.notes.base}</p></article></div></section>}

      <section className="development-board"><div className="development-board-copy"><p className="eyebrow">PROJECT CONVERSATION</p><h2>What we can discuss next.</h2><p>Each product reference is a starting point. Before a live project, align the product with your market, visual direction and packaging scope.</p></div><div className="development-list"><p><PackageOpen size={19} /><span><strong>Format &amp; pack</strong>Primary pack, cap, component and carton direction.</span></p><p><Sparkles size={19} /><span><strong>Product expression</strong>{product.category === "fragrance" ? "Scent family, mood and product story." : "Texture, shade or care benefit direction."}</span></p><p><FileText size={19} /><span><strong>Brief readiness</strong>Samples, target market and project requirements.</span></p></div></section>

      <section className="related-section"><div className="section-head"><div><p className="eyebrow">CONTINUE BROWSING</p><h2>Related directions.</h2></div><Link className="text-link" href={`/collections/${product.category}`}>See all {product.category} <ArrowRight size={16} /></Link></div><div className="product-grid related-grid">{related.map((item, index) => <ProductCard product={item} index={index} key={item.slug} />)}</div></section>
      <section className="closing-banner"><Check size={20} /><p>One considered brief is more useful than a generic catalogue request.</p><InquiryDrawer triggerLabel="Start with this product" /></section>
    </SiteShell>
  );
}

