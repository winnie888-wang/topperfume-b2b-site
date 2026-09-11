/**
 * Maison Mercantile design reminder: collections stay editorial in surface but Shopify-fast in function.
 * Keep the category statement compact, put the product grid near the top, and use commercial language buyers can act on.
 */
import { useMemo, useState } from "react";
import { Link, useLocation, useParams, useSearch } from "wouter";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { SiteShell, WhatsAppCta } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { catalogueMoqGuidance } from "@/data/business";
import { products, type ProductCategory } from "@/data/products";
import { getSkincareType, skincareTypes } from "@/data/productTaxonomy";
import { Seo } from "@/components/Seo";
import { collectionSeo } from "@shared/seo";

const validCategories = ["fragrance", "skincare", "makeup"] as const;
const collectionCopy: Record<ProductCategory, { index: string; title: string; intro: string }> = {
  fragrance: { index: "01 / FRAGRANCE PRODUCTS", title: "Fragrance Catalogue", intro: "Compare fragrances, sizes and individual order terms. Select a product to request a wholesale quote." },
  skincare: { index: "02 / SKINCARE PRODUCTS", title: "Skincare & Body Care", intro: "Explore body lotions, washes, butters, oils and facial care. Prices and minimum orders are shown for each product." },
  makeup: { index: "03 / MAKEUP PRODUCTS", title: "Makeup Catalogue", intro: "Browse confirmed colour-makeup SKUs with product-specific sample and quotation paths." },
};

const skincareIntro: Record<string, string> = {
  "Body Lotion": "Compare body lotions and their available sizes. Check each product’s price and minimum order before requesting a quote.",
  "Body Wash": "Browse body washes and shower gels. Compare the available sizes and individual order terms.",
  "Body Butter": "Browse body butters with product-specific prices and order terms.",
  "Body Oil": "Browse body oils and body gel oils. Select a product or series to check its exact format and order terms.",
  "Face Cream": "Compare facial creams and available variants. Prices and minimum orders apply to the selected product or variant.",
  "Toner": "Browse facial toners and check each product’s size, price and minimum order.",
  "Facial Cleanser": "Browse facial cleansers and check each product’s size, price and minimum order.",
};

export default function Collection() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const requestedType = skincareTypes.find(type => type.slug === new URLSearchParams(search).get("type"));
  const params = useParams<{ category: ProductCategory }>();
  const category = validCategories.includes(params.category as ProductCategory) ? (params.category as ProductCategory) : "fragrance";
  const copy = collectionCopy[category];
  const allProducts = products.filter((product) => product.category === category);
  const tags = category === "skincare" ? skincareTypes.filter(type => allProducts.some(product => getSkincareType(product) === type.label)).map(type => type.label) : Array.from(new Set(allProducts.flatMap((product) => product.tags.slice(1)))).filter(tag => !/visual|plate|reference/i.test(tag));
  const requestedTag = new URLSearchParams(search).get("tag");
  const activeTag = category === "skincare" ? requestedType?.label ?? "All products" : requestedTag && tags.includes(requestedTag) ? requestedTag : "All products";
  const [expandedCategory, setExpandedCategory] = useState<ProductCategory | null>(null);
  const filtersExpanded = expandedCategory === category;
  const compactTags = tags.slice(0, 6);
  if (activeTag !== "All products" && !compactTags.includes(activeTag)) compactTags.push(activeTag);
  const shownTags = tags.length > 8 && !filtersExpanded ? compactTags : tags;
  const selectTag = (tag: string) => {
    if (category === "skincare") {
      const type = skincareTypes.find(type => type.label === tag);
      navigate(`/collections/skincare${type ? `?type=${type.slug}` : ""}`);
    } else navigate(`/collections/${category}${tag === "All products" ? "" : `?tag=${encodeURIComponent(tag)}`}`);
  };
  const [sort, setSort] = useState("Featured");
  const visibleProducts = useMemo(() => { const list = activeTag === "All products" ? allProducts : allProducts.filter((product) => category === "skincare" ? getSkincareType(product) === activeTag : product.tags.includes(activeTag)); return sort === "A–Z" ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : list; }, [activeTag, allProducts, category, sort]);
  const leadProduct = visibleProducts[0] ?? allProducts[0];
  const heroImage = leadProduct.image;
  const heroStatus = "Explore product sizes and order terms";
  const isFiltered = activeTag !== "All products";
  const title = isFiltered ? activeTag : copy.title;
  const intro = isFiltered ? skincareIntro[activeTag] ?? `Browse ${category} products tagged “${activeTag}”. Check each product’s specifications, price and minimum order.` : copy.intro;
  const resultSummary = `Showing ${visibleProducts.length} of ${allProducts.length} products / series`;
  const tagCount = (tag: string) => allProducts.filter(product => category === "skincare" ? getSkincareType(product) === tag : product.tags.includes(tag)).length;
  return <><Seo page={collectionSeo[category]} /><SiteShell>
    <section className={`collection-hero collection-hero-compact collection-${category}`}><div className="collection-hero-copy"><p className="eyebrow">{copy.index}</p><h1>{title}</h1><p>{intro}</p><div className="collection-hero-meta"><span>{visibleProducts.length} shown</span><span>{allProducts.length} in this category</span></div></div><div className="collection-hero-visual"><img src={heroImage} srcSet={leadProduct.gallery?.[0].srcSet} sizes="(max-width: 760px) 0px, 240px" width={800} height={800} alt={`Lead product for ${title}: ${leadProduct.name}`} /><span>{heroStatus}</span></div></section>
    <section className="collection-controls" aria-label="Catalogue filters"><div className="filter-label"><SlidersHorizontal size={16} /> Filter products</div><div className="filter-chips" id="collection-filter-options"><button className={!isFiltered ? "active" : ""} aria-pressed={!isFiltered} onClick={() => selectTag("All products")}>All products <span>({allProducts.length})</span></button>{shownTags.map((tag) => <button onClick={() => selectTag(tag)} className={activeTag === tag ? "active" : ""} aria-pressed={activeTag === tag} key={tag}>{tag} <span>({tagCount(tag)})</span></button>)}{tags.length > 8 && <button aria-expanded={filtersExpanded} aria-controls="collection-filter-options" onClick={() => setExpandedCategory(filtersExpanded ? null : category)}>{filtersExpanded ? "Fewer filters" : `More filters (${tags.length - shownTags.length})`}</button>}</div><label className="sort-control">Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>A–Z</option></select><ChevronDown size={15} /></label></section>
    <section className="collection-body collection-body-fast"><div className="collection-catalogue-break"><h2>{isFiltered ? activeTag : "All products"}</h2><span role="status" aria-live="polite">{resultSummary}</span></div><div className="product-grid collection-grid">{visibleProducts.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div></section>
    <section className="collection-cta"><div><p className="eyebrow">NEED A DIFFERENT FORMAT?</p><h2>Move from product selection to quote.</h2><p>{catalogueMoqGuidance} Each product detail page shows its own confirmed MOQ and lead time. Contact us for details on customization terms.</p></div><WhatsAppCta label="Get Wholesale Quote" intent="quote" context={{ category }} /></section>
    <section className="next-category"><span>Continue browsing</span><Link href={category === "fragrance" ? "/collections/skincare" : category === "skincare" ? "/collections/makeup" : "/collections/fragrance"}>{category === "fragrance" ? "Skincare" : category === "skincare" ? "Makeup" : "Fragrance"} <ArrowRight size={18} /></Link></section>
  </SiteShell></>;
}
