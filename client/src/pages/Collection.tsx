/**
 * Maison Mercantile design reminder: collections stay editorial in surface but Shopify-fast in function.
 * Keep the category statement compact, put the product grid near the top, and use commercial language buyers can act on.
 */
import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { SiteShell, InquiryDrawer } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { products, type ProductCategory } from "@/data/products";

const validCategories = ["fragrance", "skincare", "makeup"] as const;
const collectionCopy: Record<ProductCategory, { index: string; title: string; intro: string; image: string; status: string }> = {
  fragrance: { index: "01 / FRAGRANCE PRODUCTS", title: "Private Label Fragrance", intro: "Browse fragrance-mist formats and authorised product visuals. Select a product to request a sample or quote.", image: "/manus-storage/fragrance-jam-spill_f3448635.jpg", status: "Authorized visual · title [NAME TO CONFIRM]" },
  skincare: { index: "02 / SKINCARE PRODUCTS", title: "Private Label Skincare", intro: "Browse real body-care and personal-care formats. Every third-party product title stays [NAME TO CONFIRM] until released for publication.", image: "/manus-storage/skincare-body-lotion-lineup_028ae330.webp", status: "Authorized visual · title [NAME TO CONFIRM]" },
  makeup: { index: "03 / MAKEUP PRODUCTS", title: "Private Label Makeup", intro: "Browse real colour-makeup and gift-set formats. Every third-party product title stays [NAME TO CONFIRM] until released for publication.", image: "/manus-storage/makeup-lip-color-collection_f464b653.jpg", status: "Authorized visual · title [NAME TO CONFIRM]" },
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
  const customization = category === "fragrance" ? "Fragrance + logo" : category === "skincare" ? "Formula + logo" : "Shade + logo";
  return <SiteShell>
    <section className={`collection-hero collection-hero-compact collection-${category}`}><div className="collection-hero-copy"><p className="eyebrow">{copy.index}</p><h1>{copy.title}</h1><p>{copy.intro}</p><div className="collection-hero-meta"><span>{allProducts.length} products</span><span>Private Label · OEM · ODM</span></div></div><div className="collection-hero-visual"><img src={copy.image} alt={`${category} category visual`} /><span>{copy.status}</span></div></section>
    <section className="collection-controls"><div className="filter-label"><SlidersHorizontal size={16} /> Filter products</div><div className="filter-chips"><button className={activeTag === "All products" ? "active" : ""} onClick={() => setActiveTag("All products")}>All products</button>{tags.map((tag) => <button onClick={() => setActiveTag(tag)} className={activeTag === tag ? "active" : ""} key={tag}>{tag}</button>)}</div><label className="sort-control">Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>A–Z</option></select><ChevronDown size={15} /></label></section>
    <section className="collection-body collection-body-fast"><div className="collection-context"><div><span>{String(visibleProducts.length).padStart(2, "0")}</span><strong>Products available to browse</strong></div><p>Select a product for specifications, customization options and direct sample or quote actions.</p></div><aside className="collection-spine"><div className="spine-index">01 / BUYING NOTE</div><div className="spine-product"><strong>{leadProduct.name}</strong><span>{leadProduct.format}</span></div><div className="spine-field"><b>Sample</b>Request from product page</div><div className="spine-field"><b>Customization</b>{customization}</div><div className="spine-field"><b>Quote</b>Volume and market [TO CONFIRM]</div><Link href={`/products/${leadProduct.slug}`} className="spine-link">View lead product <ArrowRight size={14} /></Link></aside><div className="product-grid collection-grid">{visibleProducts.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div></section>
    <section className="collection-cta"><div><p className="eyebrow">NEED A DIFFERENT FORMAT?</p><h2>Move from product reference to quote.</h2><p>Bring the format, target market and customization level you need. The next live workflow will guide your sample, quote and project-planning conversation.</p></div><InquiryDrawer triggerLabel="Get a Project Quote" intent="quote" /></section>
    <section className="next-category"><span>Continue browsing</span><Link href={category === "fragrance" ? "/collections/skincare" : category === "skincare" ? "/collections/makeup" : "/collections/fragrance"}>{category === "fragrance" ? "Skincare" : category === "skincare" ? "Makeup" : "Fragrance"} <ArrowRight size={18} /></Link></section>
  </SiteShell>;
}
