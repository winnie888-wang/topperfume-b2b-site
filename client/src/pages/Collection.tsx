/**
 * Maison Mercantile design reminder: collections stay editorial in surface but Shopify-fast in function.
 * Keep the category statement compact, put the product grid near the top, and use commercial language buyers can act on.
 */
import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { SiteShell, InquiryDrawer } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { collectionBuyerGuide, getCustomizationLabel, TO_CONFIRM } from "@/data/business";
import { products, type ProductCategory } from "@/data/products";

const validCategories = ["fragrance", "skincare", "makeup"] as const;
const collectionCopy: Record<ProductCategory, { index: string; title: string; intro: string; image: string; status: string }> = {
  fragrance: { index: "01 / FRAGRANCE PRODUCTS", title: "Private Label Fragrance", intro: "Browse fragrance-mist product references. Select a product to request a sample or quote.", image: "/manus-storage/fragrance-jam-spill_f3448635.jpg", status: "Product visual / reference plate" },
  skincare: { index: "02 / SKINCARE PRODUCTS", title: "Private Label Skincare", intro: "Browse body-care and personal-care product references. Public product naming remains subject to confirmation.", image: "/manus-storage/skincare-body-lotion-lineup_028ae330.webp", status: "Product visual / reference plate" },
  makeup: { index: "03 / MAKEUP PRODUCTS", title: "Private Label Makeup", intro: "Browse colour-makeup and gift-set product references. Public product naming remains subject to confirmation.", image: "/manus-storage/makeup-lip-color-collection_f464b653.jpg", status: "Product visual / reference plate" },
};

export default function Collection() {
  const params = useParams<{ category: ProductCategory }>();
  const category = validCategories.includes(params.category as ProductCategory) ? (params.category as ProductCategory) : "fragrance";
  const copy = collectionCopy[category];
  const allProducts = products.filter((product) => product.category === category);
  const tags = Array.from(new Set(allProducts.flatMap((product) => product.tags.slice(1))));
  const [activeTag, setActiveTag] = useState("All products");
  const [sort, setSort] = useState("Featured");
  const visibleProducts = useMemo(() => { const list = activeTag === "All products" ? allProducts : allProducts.filter((product) => product.tags.includes(activeTag)); return sort === "A–Z" ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : list; }, [activeTag, allProducts, sort]);
  const leadProduct = allProducts[0];
  const heroImage = category === "skincare" && leadProduct ? leadProduct.image : copy.image;
  const heroStatus = category === "skincare" ? "Catalogue plate / product visual" : copy.status;
  const customization = getCustomizationLabel(category);
  const buyerGuide = collectionBuyerGuide[category];
  return <SiteShell>
    <section className={`collection-hero collection-hero-compact collection-${category}`}><div className="collection-hero-copy"><p className="eyebrow">{copy.index}</p><h1>{copy.title}</h1><p>{copy.intro}</p><div className="collection-hero-meta"><span>{allProducts.length} products</span><span>Private Label · OEM · ODM</span></div></div><div className="collection-hero-visual"><img src={heroImage} alt={`${category} category visual`} /><span>{heroStatus}</span></div></section>
    <section className="collection-controls"><div className="filter-label"><SlidersHorizontal size={16} /> Filter products</div><div className="filter-chips"><button className={activeTag === "All products" ? "active" : ""} onClick={() => setActiveTag("All products")}>All products</button>{tags.map((tag) => <button onClick={() => setActiveTag(tag)} className={activeTag === tag ? "active" : ""} key={tag}>{tag}</button>)}</div><label className="sort-control">Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>A–Z</option></select><ChevronDown size={15} /></label></section>
    <section className="collection-body collection-body-fast"><div className="collection-decision-dossier"><p className="collection-dossier-index">01 / BUYER READINESS</p>{(["reference", "variable", "packaging", "commercial"] as const).map((field) => <div key={field}><b>{field === "variable" ? "Customization" : field}</b><span>{buyerGuide[field].value}<em className="procurement-note">{buyerGuide[field].status}</em></span></div>)}</div><div className="collection-catalogue-break"><div><p>02 / PRODUCT CATALOGUE</p><h2>Compare the buying brief.</h2></div><span>{visibleProducts.length} visible references</span></div><div className="product-grid collection-grid">{visibleProducts.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div><aside className="collection-spine collection-spine-after-grid"><div className="spine-index">03 / BUYING NOTE</div><div className="spine-product"><strong>{leadProduct.name}</strong><span>Reference format: {leadProduct.format}<em className="procurement-note">{TO_CONFIRM}</em></span></div><div className="spine-field"><b>Sample</b>Product context included</div><div className="spine-field"><b>Customization</b>{customization}<em className="procurement-note">{TO_CONFIRM}</em></div><div className="spine-field"><b>Quote</b>Volume and market<em className="procurement-note">{TO_CONFIRM}</em></div><Link href={`/products/${leadProduct.slug}`} className="spine-link">View product reference <ArrowRight size={14} /></Link></aside></section>
    <section className="collection-cta"><div><p className="eyebrow">NEED A DIFFERENT FORMAT?</p><h2>Move from product reference to quote.</h2><p>Standard orders start from 2 pcs with an approximate 7-day lead time and free samples available. Custom logo, packaging and fragrance requests start from 100 pcs; product-specific development terms remain {TO_CONFIRM} until confirmed.</p></div><InquiryDrawer triggerLabel="Get a Project Quote" intent="quote" context={{ category }} /></section>
    <section className="next-category"><span>Continue browsing</span><Link href={category === "fragrance" ? "/collections/skincare" : category === "skincare" ? "/collections/makeup" : "/collections/fragrance"}>{category === "fragrance" ? "Skincare" : category === "skincare" ? "Makeup" : "Fragrance"} <ArrowRight size={18} /></Link></section>
  </SiteShell>;
}
