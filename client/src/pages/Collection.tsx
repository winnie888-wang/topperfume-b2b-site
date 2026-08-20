/**
 * Maison Mercantile design reminder: a collection is an editorial browsing surface,
 * never a generic factory grid. Product visuals lead; filter, format and inquiry signals remain lightweight and precise.
 */
import { useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, ChevronDown, SlidersHorizontal } from "lucide-react";
import { SiteShell, InquiryDrawer } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { categoryMeta, products, type ProductCategory } from "@/data/products";

const validCategories = ["fragrance", "skincare", "makeup"] as const;

export default function Collection() {
  const params = useParams<{ category: ProductCategory }>();
  const category = validCategories.includes(params.category as ProductCategory) ? (params.category as ProductCategory) : "fragrance";
  const meta = categoryMeta[category];
  const filteredProducts = products.filter((product) => product.category === category);
  const leadProduct = filteredProducts[0];
  const tags = Array.from(new Set(filteredProducts.flatMap((product) => product.tags.slice(1))));
  const [activeTag, setActiveTag] = useState("All directions");
  const [sort, setSort] = useState("Featured");
  const visibleProducts = useMemo(() => {
    const list = activeTag === "All directions" ? filteredProducts : filteredProducts.filter((product) => product.tags.includes(activeTag));
    return sort === "A–Z" ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : list;
  }, [activeTag, category, sort]);

  return (
    <SiteShell>
      <section className={`collection-hero collection-${meta.tone}`}>
        <div className="collection-hero-copy"><p className="eyebrow">{meta.eyebrow}</p><h1>{meta.title}</h1><p>{meta.intro}</p><div className="collection-hero-meta"><span>{filteredProducts.length} directions</span><span>{meta.materials}</span></div></div>
        <div className="collection-hero-visual">
          {category === "fragrance" ? <img src="/manus-storage/fragrance-lineup_4d5ea1a4.jpg" alt="TopPerfume real fragrance product lineup" /> : category === "skincare" ? <img src="/manus-storage/topperfume-skincare-materials_26725f79.jpg" alt="Skincare materials" /> : <img src="/manus-storage/topperfume-makeup-pigments_73aec62b.jpg" alt="Makeup pigments" />}
          <span>{category === "fragrance" ? "Real product image" : "Category direction"}</span>
        </div>
      </section>

      <section className="collection-controls">
        <div className="filter-label"><SlidersHorizontal size={16} /> Filter by</div>
        <div className="filter-chips"><button className={activeTag === "All directions" ? "active" : ""} onClick={() => setActiveTag("All directions")}>All directions</button>{tags.map((tag) => <button onClick={() => setActiveTag(tag)} className={activeTag === tag ? "active" : ""} key={tag}>{tag}</button>)}</div>
        <label className="sort-control">Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>A–Z</option></select><ChevronDown size={15} /></label>
      </section>

      <section className="collection-body">
        <article className={`collection-lead collection-lead-${meta.tone}`}>
          <div className="collection-lead-image">
            {category === "fragrance" ? <img src={leadProduct.image} alt={`${leadProduct.name} real product visual`} /> : category === "skincare" ? <img src="/manus-storage/topperfume-skincare-materials_26725f79.jpg" alt="Skincare material and texture study" /> : <img src="/manus-storage/topperfume-makeup-pigments_73aec62b.jpg" alt="Makeup pigment and texture study" />}
            <span>{category === "fragrance" ? "REAL PRODUCT STUDY" : "ART-DIRECTED MATERIAL STUDY"}</span>
          </div>
          <div className="collection-lead-copy">
            <p className="eyebrow">01 / LEAD DIRECTION</p>
            <h2>{leadProduct.name}</h2>
            <p>{leadProduct.briefing}</p>
            <div className="collection-field-grid">
              <span><b>Format</b>{leadProduct.format}</span>
              <span><b>Sample</b>Brief-led</span>
              <span><b>Custom</b>{category === "fragrance" ? "Scent + label" : category === "skincare" ? "Formula + component" : "Shade + component"}</span>
              <span><b>Brief readiness</b>Direction set</span>
            </div>
            <Link href={`/products/${leadProduct.slug}`} className="text-link">Open direction brief <ArrowRight size={16} /></Link>
          </div>
        </article>
        <div className="collection-context"><span>{String(visibleProducts.length).padStart(2, "0")} / {String(filteredProducts.length).padStart(2, "0")}</span><p>{category === "fragrance" ? "Authentic client-provided product photography is featured in this initial fragrance pilot." : "The current packaging-direction cards are deliberately marked as concept visuals. Supplied product photography will replace these in the next review cycle."}</p></div>
        <div className="product-grid collection-grid">{visibleProducts.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
      </section>

      <section className="collection-cta"><div><p className="eyebrow">NOT SEEING YOUR EXACT FORMAT?</p><h2>Use a direction as a starting point.</h2><p>Bring us your market, format priority and brand point of view. The right next step may be a sample brief, not another scroll.</p></div><InquiryDrawer triggerLabel="Request a matching brief" /></section>
      <section className="next-category"><span>Keep browsing</span><Link href={category === "fragrance" ? "/collections/skincare" : category === "skincare" ? "/collections/makeup" : "/collections/fragrance"}>{category === "fragrance" ? "Skincare" : category === "skincare" ? "Makeup" : "Fragrance"} <ArrowRight size={18} /></Link></section>
    </SiteShell>
  );
}
