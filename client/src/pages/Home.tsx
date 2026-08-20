/**
 * Maison Mercantile design reminder: a high-end fragrance catalogue as a B2B home page.
 * Let the user's authentic Jam Spill visual carry the hero; use warm paper, plum ink and Mineral Rose for an editorial purchasing path.
 */
import { Link } from "wouter";
import { ArrowDownRight, ArrowRight, Check, Sparkles } from "lucide-react";
import { SiteShell, InquiryDrawer } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const featured = products.filter((product) => product.category === "fragrance").slice(0, 4);

export default function Home() {
  return (
    <SiteShell>
      <section className="hero-section">
        <img className="hero-paper" src="/manus-storage/topperfume-hero-paper-still-life_92fd6502.jpg" alt="" />
        <div className="hero-copy">
          <p className="eyebrow">BEAUTY B2B / PRODUCT DIRECTIONS 2026</p>
          <h1>Make the product<br /><em>the reason to begin.</em></h1>
          <p className="hero-intro">TopPerfume brings product direction, packaging possibility and development conversation into one considered buying experience.</p>
          <div className="hero-actions"><Link href="/collections/fragrance" className="text-link">Browse Fragrance <ArrowRight size={16} /></Link><InquiryDrawer triggerLabel="Start a project" /></div>
          <div className="hero-index"><span>01</span><span>Three beauty categories. One tailored launch path.</span></div>
        </div>
        <div className="hero-product-stage">
          <div className="hero-orbit hero-orbit-one" /><div className="hero-orbit hero-orbit-two" />
          <img className="hero-product" src="/manus-storage/fragrance-jam-spill_f3448635.jpg" alt="Jam Spill fragrance mist" />
          <div className="hero-caption"><span>FRAGRANCE MIST</span><strong>Jam Spill</strong><span>FLORAL · FRUITY</span></div>
        </div>
      </section>

      <section className="manifesto-section">
        <div className="section-index">01 / THE POINT OF VIEW</div>
        <h2>Not a factory catalogue.<br />A considered starting point.</h2>
        <div className="manifesto-body"><p>High-growth beauty brands do not begin with a price list. They begin with a product worth making their own. This V2 direction leads with real products, then makes the path to sampling, adaptation and project discussion easy to understand.</p><Link href="/collections/fragrance" className="circle-arrow"><ArrowDownRight size={24} /></Link></div>
      </section>

      <section className="category-rail">
        <div className="rail-heading"><p className="eyebrow">SHOP BY PRODUCT DIRECTION</p><h2>Three places to start.</h2></div>
        <div className="category-grid">
          <Link href="/collections/fragrance" className="category-panel fragrance-panel"><span>01 / Fragrance</span><h3>Scents with a shelf story.</h3><p>Mists, scent directions and visual worlds built for private-label adaptation.</p><ArrowRight size={18} /></Link>
          <Link href="/collections/skincare" className="category-panel skincare-panel"><span>02 / Skincare</span><h3>Care rituals with clarity.</h3><p>Format-led routines that make product development feel considered and approachable.</p><ArrowRight size={18} /></Link>
          <Link href="/collections/makeup" className="category-panel makeup-panel"><span>03 / Makeup</span><h3>Colour worth collecting.</h3><p>Packaging and shade directions for beauty brands shaping a complete point of view.</p><ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-head"><div><p className="eyebrow">LIVE PRODUCT VISUALS</p><h2>Start with a fragrance direction.</h2></div><Link href="/collections/fragrance" className="text-link">View all Fragrance <ArrowRight size={16} /></Link></div>
        <div className="product-grid featured-grid">{featured.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
      </section>

      <section id="capabilities" className="capabilities-section">
        <div className="capabilities-image"><img src="/manus-storage/topperfume-packaging-study_f7ac65c2.jpg" alt="Unbranded beauty packaging development materials" /></div>
        <div className="capabilities-copy"><p className="eyebrow">FROM ONE REFERENCE TO A LAUNCH BRIEF</p><h2>The work behind a product that feels yours.</h2><div className="capability-list"><p><Check size={17} /> Product direction &amp; assortment thinking</p><p><Check size={17} /> Formula, format &amp; fragrance conversation</p><p><Check size={17} /> Component, artwork &amp; packaging alignment</p><p><Check size={17} /> Samples &amp; next-step project briefing</p></div><InquiryDrawer triggerLabel="Discuss a direction" /></div>
      </section>

      <section className="process-section">
        <div><p className="eyebrow">A SIMPLE BUYER PATH</p><h2>From “I like this”<br />to “let’s make it ours.”</h2></div>
        <div className="process-grid">
          <article><span>01</span><h3>Browse</h3><p>See a product direction, format or colour story that fits your next collection.</p></article>
          <article><span>02</span><h3>Brief</h3><p>Share market, product priorities and the degree of customization you need.</p></article>
          <article><span>03</span><h3>Develop</h3><p>Move into a focused conversation around samples, adaptation and launch readiness.</p></article>
        </div>
      </section>

      <section className="closing-banner"><Sparkles size={20} /><p>Built for brand teams who want beauty that looks as intentional as it performs.</p><InquiryDrawer triggerLabel="Request a project brief" /></section>
    </SiteShell>
  );
}

