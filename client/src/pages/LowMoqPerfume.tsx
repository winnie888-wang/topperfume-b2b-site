import { ArrowRight, Check, Clock3, MessageCircle, PackageCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { SiteShell, WhatsAppCta } from "@/components/SiteShell";
import { Seo } from "@/components/Seo";
import { products } from "@/data/products";
import { publicAssetUrl } from "@/data/publicAssets";
import { canonicalUrl, lowMoqPerfumeSeo } from "@shared/seo";

const fragranceProducts = products.filter((product) => product.category === "fragrance");
const evidenceSlugs = [
  "dior-sauvage-parfum-spray-men",
  "carolina-herrera-good-girl-blush-tweed-talk-edp-women",
  "carolina-herrera-very-good-girl-glam-edp-women",
  "yves-saint-laurent-mon-paris-parfum-women",
  "victorias-secret-bare-vanilla-body-fragrance-mist",
  "pure-seduction-fragrance-mist-lotion-set",
];
const evidenceProducts = fragranceProducts.filter((product) => evidenceSlugs.includes(product.slug));
const catalogueBrands: Record<string, string> = {
  "dior-sauvage-parfum-spray-men": "Dior",
  "carolina-herrera-good-girl-blush-tweed-talk-edp-women": "Carolina Herrera",
  "carolina-herrera-very-good-girl-glam-edp-women": "Carolina Herrera",
  "yves-saint-laurent-mon-paris-parfum-women": "Yves Saint Laurent",
  "victorias-secret-bare-vanilla-body-fragrance-mist": "Victoria’s Secret",
};
const referenceOnlyItems = [
  { image: "/assets/phase14d/good-girl-pink-reference.jpg", brand: "Carolina Herrera", name: "Good Girl Pink Stiletto Reference" },
  { image: "/assets/phase14d/amber-romance-reference.jpg", brand: "Victoria’s Secret", name: "Amber Romance Shimmer Body Mist Reference" },
  { image: "/assets/phase14d/love-spell-reference.jpg", brand: "Victoria’s Secret", name: "Love Spell Shimmer Body Mist Reference" },
  { image: "/assets/phase14d/velvet-petals-reference.jpg", brand: "Victoria’s Secret", name: "Velvet Petals Shimmer Body Mist Reference" },
  { image: "/assets/phase14d/odyssey-spectra-rainbow-reference.jpg", brand: "Odyssey Spectra", name: "Rainbow Edition Body Mist Reference" },
  { image: "/assets/phase14d/coconut-passion-reference.jpg", brand: "Victoria’s Secret", name: "Coconut Passion Shimmer Body Mist Reference" },
  { image: "/assets/phase14d/odyssey-spectra-blue-reference.jpg", brand: "Odyssey Spectra", name: "Blu Edition Body Mist Reference" },
  { image: "/assets/phase14d/go-mango-reference.jpg", brand: "Go Mango", name: "Tropical Collection Body Mist Reference" },
  { image: "/assets/phase14d/toffee-coffee-reference.jpg", brand: "Toffee Coffee", name: "Cafe Edmon Body Mist Reference" },
] as const;
const referenceDirections = {
  "dior-sauvage-parfum-spray-men": {
    kind: "Branded Wholesale Reference",
    title: "Sauvage-Inspired Scent Direction",
    profile: "Aromatic · Woody · Fresh Spicy",
    prompt: "Looking for a similar fragrance profile for your own brand?",
    inquiryProduct: "Sauvage-Inspired Scent Direction · Reference fragrance: Dior Sauvage Parfum Spray for Men",
  },
  "carolina-herrera-good-girl-blush-tweed-talk-edp-women": {
    kind: "Branded Wholesale Reference",
    title: "Good Girl-Inspired Floral Direction",
    profile: "Feminine · Oriental Floral · Giftable",
    prompt: "Looking for a similar fragrance profile for your own brand?",
    inquiryProduct: "Good Girl-Inspired Scent Direction · Reference fragrance: Carolina Herrera Good Girl Blush Tweed Talk Eau de Parfum for Women",
  },
  "carolina-herrera-very-good-girl-glam-edp-women": {
    kind: "Branded Wholesale Reference",
    title: "Cherry-Inspired Scent Direction",
    profile: "Cherry · Citrus · Woody",
    prompt: "Looking for a similar fragrance profile for your own brand?",
    inquiryProduct: "Cherry-Inspired Scent Direction · Reference fragrance: Carolina Herrera Very Good Girl Glam Eau de Parfum for Women",
  },
  "yves-saint-laurent-mon-paris-parfum-women": {
    kind: "Branded Wholesale Reference",
    title: "Mon Paris-Inspired Scent Direction",
    profile: "Fruity · Floral · Sweet",
    prompt: "Looking for a similar fragrance profile for your own brand?",
    inquiryProduct: "Mon Paris-Inspired Scent Direction · Reference fragrance: Yves Saint Laurent Mon Paris Parfum for Women",
  },
  "victorias-secret-bare-vanilla-body-fragrance-mist": {
    kind: "Branded Wholesale Reference",
    title: "Warm Vanilla-Inspired Scent Direction",
    profile: "Warm · Sweet · Vanilla",
    prompt: "Looking for a similar fragrance profile for your own brand?",
    inquiryProduct: "Warm Vanilla-Inspired Scent Direction · Reference fragrance: Victoria’s Secret Bare Vanilla Body Fragrance Mist",
  },
  "pure-seduction-fragrance-mist-lotion-set": {
    kind: "Private Label / OEM Reference",
    title: "Fragrance Mist & Lotion Direction",
    profile: "Body mist · lotion · gift-ready",
    prompt: "A current private-label / OEM reference for a coordinated fragrance set.",
    inquiryProduct: "Fragrance Mist & Lotion Direction · Reference fragrance: Pure Seduction Fragrance Mist & Lotion Set",
  },
} as const;

const heroVisual = {
  image: publicAssetUrl("topperfume-packaging-study_f7ac65c2.jpg"),
  alt: "Illustrative concept visual of unbranded perfume packaging development materials",
};

const commercialFacts = [
  { value: "From 2 pcs", label: "Selected standard perfume" },
  { value: "From 100 pcs", label: "Logo / Private Label" },
  { value: "From 100 pcs", label: "Packaging & fragrance options" },
  { value: "Available", label: "Free samples · confirmed by SKU" },
];

const buyerTypes = [
  "Beauty founders",
  "E-commerce brands",
  "Amazon / TikTok / Shopify sellers",
  "Wholesalers & distributors",
  "Existing beauty brands testing a fragrance line",
];

const routeCards = [
  {
    index: "01",
    eyebrow: "READY-TO-ORDER PERFUME",
    title: "Ready-to-Order Perfume",
    detail: "Selected products from 2 pcs. Start with a confirmed fragrance reference before discussing quantity and destination.",
    note: "Best for product testing, small wholesale and early market validation.",
    icon: PackageCheck,
    cta: "Browse selected products",
    href: "/collections/fragrance",
  },
  {
    index: "02",
    eyebrow: "PRIVATE LABEL / LOGO",
    title: "Private Label / Logo",
    detail: "Logo customization from 100 pcs. Label route and project scope are confirmed against the selected product.",
    note: "Best for a new branded launch or an existing line extension.",
    icon: Sparkles,
    cta: "See the logo route",
    href: "#customization",
  },
  {
    index: "03",
    eyebrow: "CUSTOM PACKAGING",
    title: "Custom Packaging",
    detail: "Packaging options from 100 pcs. Bottle, cap, carton, label and artwork scope are reviewed per project.",
    note: "Best for brands improving presentation and retail identity.",
    icon: PackageCheck,
    cta: "See packaging options",
    href: "#customization",
  },
  {
    index: "04",
    eyebrow: "CUSTOM FRAGRANCE",
    title: "Custom Fragrance",
    detail: "Fragrance customization from 100 pcs, subject to a scent brief and project confirmation.",
    note: "Best for scent-led private-label projects.",
    icon: Sparkles,
    cta: "See fragrance options",
    href: "#customization",
  },
] as const;

const comparisonRows = [
  { route: "Selected standard perfume", startingPoint: "From 2 pcs", bestFor: "Product testing / small wholesale / early market validation", meaning: "Product eligibility, availability and current terms are confirmed by SKU." },
  { route: "Logo / Private Label", startingPoint: "From 100 pcs", bestFor: "New beauty brands / branded launches", meaning: "Logo route and product scope are reviewed before quotation." },
  { route: "Custom Packaging", startingPoint: "From 100 pcs", bestFor: "Brands improving presentation and retail identity", meaning: "Bottle, cap, carton, label and artwork scope is confirmed per project." },
  { route: "Custom Fragrance", startingPoint: "From 100 pcs", bestFor: "Scent-led private-label projects", meaning: "Custom fragrance options depend on the scent brief and project scope." },
];

const faqs = [
  {
    question: "What is the lowest MOQ for perfume orders?",
    answer: "Selected standard perfume orders from 2 pcs. Product eligibility, quantity and commercial route are confirmed by SKU.",
  },
  {
    question: "Does 2 pcs apply to every perfume product?",
    answer: "No. The 2-pcs starting point applies to selected standard perfume orders. Confirm the selected SKU and route before ordering.",
  },
  {
    question: "Are free samples available?",
    answer: "Free samples are available. Availability and quantity are confirmed by SKU. Shipping terms are confirmed by destination.",
  },
  {
    question: "How long does an eligible standard order take?",
    answer: "Lead time starts from approximately 7 days for eligible standard orders. Custom projects follow project-specific lead times.",
  },
  {
    question: "Can I add my logo from 100 pcs?",
    answer: "Logo customization from 100 pcs. The selected product, label route and project scope are confirmed before quotation.",
  },
  {
    question: "Can I customize the packaging from 100 pcs?",
    answer: "Custom packaging from 100 pcs. Individual bottle, cap, carton, label and artwork scope is confirmed per project.",
  },
  {
    question: "Can I request a custom fragrance from 100 pcs?",
    answer: "Custom fragrance options from 100 pcs, subject to a scent brief and project confirmation. Final scope follows the confirmed project brief.",
  },
  {
    question: "Can I discuss OEM or ODM through this page?",
    answer: "Yes. TopPerfume supports B2B sourcing, private-label, manufacturing and OEM/ODM project conversations. Exact scope is confirmed by product and project.",
  },
];

export default function LowMoqPerfume() {
  return <><Seo page={lowMoqPerfumeSeo} /><SiteShell>
    <section className="low-moq-hero">
      <div className="low-moq-hero-copy">
        <p className="eyebrow">LOW MOQ PERFUME / B2B PARTNER</p>
        <h1>Low MOQ Perfume Manufacturing for <em>New &amp; Growing Brands</em></h1>
        <p className="low-moq-hero-intro">Start with selected standard perfume orders from <strong>2 pcs</strong>, or explore logo, packaging and custom fragrance options from <strong>100 pcs</strong>.</p>
        <p className="low-moq-hero-positioning">TopPerfume supports B2B buyers as a sourcing, private-label, manufacturing and OEM/ODM project partner. Choose a confirmed fragrance product, request a free sample, or send your project brief for a quote.</p>
        <p className="low-moq-lead-time"><Clock3 size={16} /> Lead time starts from approximately 7 days for eligible standard orders. Custom projects follow project-specific lead times.</p>
        <div className="hero-actions low-moq-hero-actions">
          <WhatsAppCta label="Request Free Sample" intent="sample" context={{ category: "fragrance" }} />
          <WhatsAppCta label="Get a Low MOQ Quote" intent="quote" context={{ category: "fragrance" }} className="button-rose" />
          <Link href="#routes" className="text-link">Compare routes <ArrowRight size={15} /></Link>
        </div>
        <div className="low-moq-hero-index"><span>01</span><span>Standard product → branded direction → project review</span></div>
      </div>
      <figure className="low-moq-hero-visual">
        <span className="low-moq-visual-index">UNBRANDED PACKAGING CONCEPT</span>
        <img src={heroVisual.image} alt={heroVisual.alt} />
        <figcaption><span>Illustrative / Concept Visual</span><strong>Packaging direction for a branded fragrance brief</strong><small>Not a facility, laboratory or production-line photograph</small></figcaption>
      </figure>
    </section>

    <section className="low-moq-facts" aria-label="Commercial buying facts">
      <div className="low-moq-facts-intro"><p className="eyebrow">BUYING FACTS</p><h2>Start with the route you need.</h2><p>Starting points are route-specific. Current eligibility and terms are confirmed against the selected SKU and project.</p></div>
      <div className="low-moq-facts-grid">{commercialFacts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div>
    </section>

    <section className="low-moq-who">
      <div><p className="eyebrow">WHO THIS IS FOR</p><h2>For buyers who need a clear first order.</h2></div>
      <div className="low-moq-buyer-grid">{buyerTypes.map((buyer, index) => <div key={buyer}><span>{String(index + 1).padStart(2, "0")}</span><strong>{buyer}</strong></div>)}</div>
    </section>

    <section id="routes" className="low-moq-routes">
      <div className="low-moq-section-intro"><p className="eyebrow">FOUR BUYER ROUTES</p><h2>Choose the route that fits your brief.</h2><p>Each route answers a different buying question. Choose a product, quantity, market and scope before the next conversation.</p></div>
      <div className="low-moq-route-grid">{routeCards.map(({ index, eyebrow, title, detail, note, icon: Icon, cta, href }) => <article className="low-moq-route-card" key={index}><div className="low-moq-route-top"><span>{index}</span><Icon size={19} /></div><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{detail}</p><small>{note}</small><div className="low-moq-route-action"><Link className="text-link" href={href}>{cta} <ArrowRight size={15} /></Link></div></article>)}</div>
    </section>

    <section className="low-moq-two-paths">
      <div className="low-moq-two-paths-intro"><p className="eyebrow">02 / MOQ CLARITY</p><h2>2 pcs and 100 pcs are different buying paths.</h2><p>Use the standard route for selected products. Use the 100-pc route when your brief includes logo, packaging or custom fragrance questions.</p></div>
      <div className="low-moq-comparison-table" role="table" aria-label="Low MOQ perfume order route comparison">
        <div className="low-moq-comparison-head" role="row"><span>Route</span><span>Starting point</span><span>Best for</span><span>What it means</span></div>
        {comparisonRows.map((row) => <div className="low-moq-comparison-row" role="row" key={row.route}><div><span>Route</span><strong>{row.route}</strong></div><div><span>Starting point</span><b>{row.startingPoint}</b></div><div><span>Best for</span><p>{row.bestFor}</p></div><div><span>What it means</span><p>{row.meaning}</p></div></div>)}
      </div>
    </section>

    <section className="low-moq-products">
      <div className="section-head"><div><p className="eyebrow">03 / POPULAR SCENT REFERENCES</p><h2>Start with the scent reference. Move toward your own brand.</h2></div><Link href="/collections/fragrance" className="text-link">Browse Full Fragrance Collection <ArrowRight size={15} /></Link></div>
      <p className="low-moq-section-lead">Confirmed catalogue cards show real product data. Supplied visuals that do not match a verified catalogue SKU stay as scent references only, so buyers can explore a direction without invented commercial details.</p>
      <p className="low-moq-reference-disclosure">Third-party brand names are used only as fragrance references. TopPerfume is not affiliated with or endorsed by the referenced brands.</p>

      <div className="low-moq-reference-subhead"><p className="eyebrow">CONFIRMED CATALOGUE REFERENCES</p><h3>Branded Fragrance References</h3><span>Real SKU · price · PDP · Product structured data</span></div>
      <div className="product-grid low-moq-product-grid low-moq-reference-grid">{evidenceProducts.map((product, index) => {
        const reference = referenceDirections[product.slug as keyof typeof referenceDirections];
        return <div className="low-moq-reference-item" key={product.slug}>
          <ProductCard product={product} index={index} showSampleCta={false} detailsLabel="View Product" />
          <div className="low-moq-reference-bridge">
            {catalogueBrands[product.slug] && <p className="low-moq-reference-brand">{catalogueBrands[product.slug]}</p>}
            <p className="eyebrow low-moq-reference-kind">{reference.kind}</p>
            <p className="eyebrow low-moq-reference-opportunity">SIMILAR SCENT / PRIVATE LABEL OPPORTUNITY</p>
            <h3>{reference.title}</h3>
            <p className="low-moq-reference-profile">{reference.profile}</p>
            <p className="low-moq-reference-prompt">{reference.prompt}</p>
            {reference.inquiryProduct && <WhatsAppCta label="Ask About Similar Scent" intent="project" context={{ productName: reference.inquiryProduct, sku: product.sku, productUrl: `/products/${product.slug}`, pageUrl: canonicalUrl(lowMoqPerfumeSeo.path), category: "fragrance", inquiryIntent: "private_label" }} />}
          </div>
        </div>;
      })}</div>

      <div className="low-moq-reference-subhead low-moq-reference-subhead-secondary"><p className="eyebrow">SUPPLIED SCENT REFERENCES</p><h3>Additional fragrance directions</h3><span>Visual reference only · no invented SKU, price, MOQ or PDP</span></div>
      <div className="product-grid low-moq-product-grid low-moq-reference-grid low-moq-reference-only-grid">{referenceOnlyItems.map((item, index) => <article className="low-moq-reference-only-item" key={item.image}>
        <div className="low-moq-reference-only-image-wrap"><span className="low-moq-reference-only-index">{String(evidenceProducts.length + index + 1).padStart(2, "0")}</span><img src={item.image} alt={`${item.brand} ${item.name} scent reference`} className="low-moq-reference-only-image" loading="lazy" decoding="async" /><span className="low-moq-reference-only-label">Scent Reference</span></div>
        <div className="low-moq-reference-only-copy"><p className="low-moq-reference-only-brand">{item.brand}</p><h3>{item.name}</h3><p className="low-moq-reference-only-prompt">Like this fragrance direction? Ask about a similar scent for your own brand.</p><WhatsAppCta label="Ask About Similar Scent" intent="project" context={{ productName: `Reference fragrance: ${item.brand} ${item.name}`, pageUrl: canonicalUrl(lowMoqPerfumeSeo.path), category: "fragrance", inquiryIntent: "private_label" }} /></div>
      </article>)}</div>
    </section>

    <section className="low-moq-sample-panel">
      <div className="low-moq-sample-copy"><p className="eyebrow">04 / SAMPLE-FIRST BUYING PATH</p><h2>Review the product before the project.</h2><p>Free samples are available. Availability, quantity and shipping terms are confirmed by SKU and destination.</p><div className="low-moq-sample-action"><WhatsAppCta label="Request Free Sample" intent="sample" context={{ category: "fragrance" }} /></div></div>
      <div className="low-moq-sample-ledger"><div><span>01</span><strong>Choose a product</strong><p>Send the product name, SKU or PDP URL instead of a generic request.</p></div><div><span>02</span><strong>Confirm sample terms</strong><p>Availability, quantity and shipping terms are confirmed by SKU and destination.</p></div><div><span>03</span><strong>Move to quote</strong><p>Share the estimated quantity, target market and any project direction.</p></div><div className="low-moq-sample-checklist"><strong>What to send us</strong><p><Check size={15} /> Product / SKU</p><p><Check size={15} /> Target market</p><p><Check size={15} /> Estimated quantity</p><p><Check size={15} /> Sample request</p><p><Check size={15} /> Logo, packaging or scent direction if relevant</p></div></div>
    </section>

    <section id="customization" className="low-moq-customization">
      <div className="low-moq-section-intro"><p className="eyebrow">05 / PROJECT OPTIONS</p><h2>Make the brief as specific as it needs to be.</h2><p>Logo, packaging and fragrance are separate questions. Final component and formula scope follows the confirmed project brief.</p></div>
      <div className="low-moq-customization-grid"><article><span>01 / LOGO</span><h3>Private Label / Logo</h3><p>Logo customization from 100 pcs. Label route and product scope are confirmed before quotation.</p><small>Ask about the selected SKU.</small></article><article><span>02 / PACKAGING</span><h3>Packaging Options</h3><p>Packaging options from 100 pcs. Bottle, cap, carton, label and artwork scope is confirmed per project.</p><small>Each component is reviewed with the project brief.</small></article><article><span>03 / FRAGRANCE</span><h3>Custom Fragrance</h3><p>Fragrance customization from 100 pcs, subject to a scent brief and project confirmation.</p><small>Custom scope is reviewed before commitment.</small></article></div>
    </section>

    <section className="low-moq-forward">
      <div><p className="eyebrow">06 / HOW THE PROJECT MOVES FORWARD</p><h2>From product reference to the right conversation.</h2><p>TopPerfume acts as a B2B sourcing, private-label, manufacturing and OEM/ODM project partner. The next step depends on the selected product and brief.</p></div>
      <div className="low-moq-forward-steps"><div><span>01</span><strong>Choose</strong><p>Start from a current fragrance reference.</p></div><div><span>02</span><strong>Clarify</strong><p>Confirm quantity, market and buying route.</p></div><div><span>03</span><strong>Review</strong><p>Discuss sample, logo, packaging or scent direction.</p></div><div><span>04</span><strong>Quote</strong><p>Move forward with the scope that is confirmed.</p></div></div>
    </section>

    <section className="low-moq-proof">
      <div className="low-moq-proof-intro"><p className="eyebrow">07 / VERIFIED BUYER PROOF</p><h2>Why buyers start with TopPerfume.</h2><p>Clear starting points, current product references and project-specific terms help buyers understand the next step before requesting a sample or quote.</p></div>
      <div className="low-moq-proof-grid"><div><strong>From 2 pcs</strong><span>Selected standard perfume orders</span></div><div><strong>From 100 pcs</strong><span>Logo, packaging and fragrance options</span></div><div><strong>Available</strong><span>Free samples, confirmed by SKU</span></div><div><strong>WhatsApp-first</strong><span>Direct project communication</span></div><div><strong>Approx. 7 days</strong><span>Eligible standard-order starting point</span></div><div><strong>Live references</strong><span>Current fragrance SKUs and PDPs</span></div></div>
    </section>

    <section id="faq" className="low-moq-faq"><div className="section-head"><div><p className="eyebrow">08 / BUYER FAQ</p><h2>Questions worth answering before you ask.</h2></div><MessageCircle size={21} /></div><div className="low-moq-faq-list">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<ArrowRight size={15} /></summary><p>{faq.answer}</p></details>)}</div></section>

    <section id="final-cta" className="low-moq-final-cta"><div><p className="eyebrow">09 / YOUR NEXT STEP</p><h2>Choose a product.<br /><em>Start the right conversation.</em></h2><p>Samples, quotes and private-label questions stay WhatsApp-first, with product context added when a SKU is selected.</p></div><div className="low-moq-final-actions"><WhatsAppCta label="Request Free Sample" intent="sample" context={{ category: "fragrance" }} /><WhatsAppCta label="Get a Low MOQ Quote" intent="quote" context={{ category: "fragrance" }} className="button-rose" /><WhatsAppCta label="Discuss Private Label" intent="project" context={{ category: "fragrance" }} /></div></section>
  </SiteShell></>;
}
