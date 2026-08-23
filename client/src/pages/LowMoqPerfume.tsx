import { ArrowRight, Check, Clock3, MessageCircle, PackageCheck, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { ProductCard } from "@/components/ProductCard";
import { SiteShell, WhatsAppCta } from "@/components/SiteShell";
import { Seo } from "@/components/Seo";
import { products } from "@/data/products";
import { lowMoqPerfumeSeo } from "@shared/seo";

const fragranceProducts = products.filter((product) => product.category === "fragrance");
const heroProduct = fragranceProducts.find((product) => product.slug === "victorias-secret-bare-vanilla-body-fragrance-mist") || fragranceProducts[0];

type RouteCard = {
  index: string;
  eyebrow: string;
  title: string;
  detail: string;
  note: string;
  icon: typeof PackageCheck;
  cta: string;
  href?: string;
  intent?: "project";
};

const routeCards: RouteCard[] = [
  {
    index: "01",
    eyebrow: "READY-TO-ORDER / STANDARD PERFUME",
    title: "Start with a confirmed product.",
    detail: "Selected standard perfume orders from 2 pcs. Lead time starts from approximately 7 days for eligible standard orders.",
    note: "Product eligibility and current timing are confirmed by SKU.",
    icon: PackageCheck,
    cta: "Browse fragrance products",
    href: "/collections/fragrance",
  },
  {
    index: "02",
    eyebrow: "LOGO / PRIVATE LABEL",
    title: "Add your brand direction.",
    detail: "Logo customization from 100 pcs. The selected product and project scope shape the next conversation.",
    note: "Label and product scope are confirmed by SKU/project.",
    icon: Sparkles,
    cta: "Discuss private label",
    intent: "project" as const,
  },
  {
    index: "03",
    eyebrow: "CUSTOM PACKAGING",
    title: "Build the presentation.",
    detail: "Custom packaging from 100 pcs. Individual bottle, cap, carton, label and artwork scope is confirmed per project.",
    note: "Packaging components may have separate requirements.",
    icon: PackageCheck,
    cta: "Discuss packaging",
    intent: "project" as const,
  },
  {
    index: "04",
    eyebrow: "CUSTOM FRAGRANCE",
    title: "Bring a scent brief.",
    detail: "Custom fragrance options from 100 pcs, subject to scent brief and project confirmation.",
    note: "Custom scope is reviewed before a project commitment.",
    icon: Sparkles,
    cta: "Discuss custom fragrance",
    intent: "project" as const,
  },
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
    answer: "Free samples are available. Sample availability, quantity and shipping are confirmed by SKU and destination. Free international shipping is not claimed here.",
  },
  {
    question: "How long does an eligible standard order take?",
    answer: "Lead time starts from approximately 7 days for eligible standard orders. Custom projects vary.",
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
    answer: "Custom fragrance options from 100 pcs, subject to scent brief and project confirmation. A 100-pc starting point does not imply unrestricted new-formula development.",
  },
  {
    question: "Can I discuss OEM or ODM through this page?",
    answer: "Yes. TopPerfume supports B2B sourcing, private-label, manufacturing and OEM/ODM project conversations. Exact scope is confirmed by product and project.",
  },
];

function RouteAction({ route }: { route: RouteCard }) {
  if (route.href) {
    return <Link className="text-link" href={route.href}>{route.cta} <ArrowRight size={15} /></Link>;
  }
  return <WhatsAppCta label={route.cta} intent={route.intent || "project"} context={{ category: "fragrance" }} className="button-rose" />;
}

export default function LowMoqPerfume() {
  return <><Seo page={lowMoqPerfumeSeo} /><SiteShell>
    <section className="low-moq-hero">
      <div className="low-moq-hero-copy">
        <p className="eyebrow">LOW MOQ PERFUME / B2B PARTNER</p>
        <h1>Low MOQ Perfume Options for <em>New and Growing Brands</em></h1>
        <p className="low-moq-hero-intro">Start with selected standard perfume orders from <strong>2 pcs</strong>, or explore logo, packaging and custom fragrance options from <strong>100 pcs</strong>.</p>
        <p className="low-moq-hero-positioning">TopPerfume supports B2B buyers as a sourcing, private-label, manufacturing and OEM/ODM project partner. Choose a confirmed fragrance product, request a free sample, or send your project brief for a quote.</p>
        <p className="low-moq-lead-time"><Clock3 size={16} /> Lead time starts from approximately 7 days for eligible standard orders. Custom projects vary.</p>
        <div className="hero-actions low-moq-hero-actions">
          <WhatsAppCta label="Request Free Sample" intent="sample" context={{ category: "fragrance" }} />
          <WhatsAppCta label="Get a Low MOQ Quote" intent="quote" context={{ category: "fragrance" }} className="button-rose" />
          <Link href="#routes" className="text-link">Compare routes <ArrowRight size={15} /></Link>
        </div>
        <div className="low-moq-hero-index"><span>01</span><span>Standard product → branded direction → project review</span></div>
      </div>
      {heroProduct && <figure className="low-moq-hero-visual">
        <span className="low-moq-visual-index">CONFIRMED FRAGRANCE REFERENCE</span>
        <img src={heroProduct.image} alt={`${heroProduct.name} product visual`} />
        <figcaption><span>Selected standard reference</span><strong>{heroProduct.name}</strong><small>SKU-level terms · product context preserved</small></figcaption>
      </figure>}
    </section>

    <section id="routes" className="low-moq-routes">
      <div className="low-moq-section-intro"><p className="eyebrow">FOUR BUYER ROUTES</p><h2>Choose the route that fits your brief.</h2><p>One page, four clear ways to start. The right product, quantity, market and project scope stay attached to the next conversation.</p></div>
      <div className="low-moq-route-grid">{routeCards.map(({ index, eyebrow, title, detail, note, icon: Icon }, routeIndex) => <article className="low-moq-route-card" key={index}><div className="low-moq-route-top"><span>{index}</span><Icon size={19} /></div><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p>{detail}</p><small>{note}</small><div className="low-moq-route-action"><RouteAction route={routeCards[routeIndex]} /></div></article>)}</div>
    </section>

    <section className="low-moq-two-paths">
      <div className="low-moq-two-paths-intro"><p className="eyebrow">02 / MOQ CLARITY</p><h2>2 pcs and 100 pcs are different buying paths.</h2><p>Use the standard route for selected products. Use the 100-pc route when your brief includes logo, packaging or custom fragrance questions.</p></div>
      <div className="low-moq-comparison-table" role="table" aria-label="Low MOQ perfume order route comparison">
        <div className="low-moq-comparison-head" role="row"><span>Route</span><span>Starting point</span><span>What it means</span></div>
        <div className="low-moq-comparison-row" role="row"><strong>Selected standard perfume</strong><b>From 2 pcs</b><p>Product eligibility, availability and current terms are confirmed by SKU.</p></div>
        <div className="low-moq-comparison-row" role="row"><strong>Logo / private label</strong><b>From 100 pcs</b><p>Logo customization is reviewed against the selected product and project scope.</p></div>
        <div className="low-moq-comparison-row" role="row"><strong>Custom packaging</strong><b>From 100 pcs</b><p>Packaging customization starts from 100 pcs; individual component scope is confirmed per project.</p></div>
        <div className="low-moq-comparison-row" role="row"><strong>Custom fragrance</strong><b>From 100 pcs</b><p>Custom fragrance options are subject to scent brief and project confirmation.</p></div>
      </div>
    </section>

    <section className="low-moq-products">
      <div className="section-head"><div><p className="eyebrow">03 / PRODUCT EVIDENCE</p><h2>Start with a confirmed fragrance reference.</h2></div><Link href="/collections/fragrance" className="text-link">Browse the Fragrance Collection <ArrowRight size={15} /></Link></div>
      <p className="low-moq-section-lead">Choose a product format before asking for a sample or quote. Commercial route, MOQ and timing remain product-specific.</p>
      <div className="product-grid low-moq-product-grid">{fragranceProducts.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
    </section>

    <section className="low-moq-sample-panel">
      <div className="low-moq-sample-copy"><p className="eyebrow">04 / SAMPLE-FIRST BUYING PATH</p><h2>Review the product before the project.</h2><p>Free samples are available. Sample availability, quantity and shipping are confirmed by SKU and destination.</p><p>Choose a confirmed fragrance reference, then send your target market and quantity. The product context stays with your WhatsApp inquiry.</p><WhatsAppCta label="Request a Free Sample" intent="sample" context={{ category: "fragrance" }} /></div>
      <div className="low-moq-sample-ledger"><div><span>01</span><strong>Choose a SKU</strong><p>Start from a current product reference rather than a generic request.</p></div><div><span>02</span><strong>Confirm sample terms</strong><p>Availability, quantity and shipping are reviewed by SKU and destination.</p></div><div><span>03</span><strong>Move to quote</strong><p>Share quantity, market and any logo, packaging or scent-brief direction.</p></div></div>
    </section>

    <section className="low-moq-customization">
      <div className="low-moq-section-intro"><p className="eyebrow">05 / PROJECT OPTIONS</p><h2>Build only as far as your brief requires.</h2><p>Logo, packaging and fragrance are separate questions. A 100-pc starting point does not automatically mean every component or formula scope is included.</p></div>
      <div className="low-moq-customization-grid">
        <article><span>01 / LOGO</span><h3>Logo / Private Label</h3><p>Logo customization from 100 pcs. Selected product, label route and project scope are confirmed before quotation.</p><WhatsAppCta label="Discuss logo options" intent="project" context={{ category: "fragrance" }} /></article>
        <article><span>02 / PACKAGING</span><h3>Custom Packaging</h3><p>Custom packaging from 100 pcs. Individual bottle, cap, carton, label and artwork scope is confirmed per project.</p><WhatsAppCta label="Discuss packaging" intent="project" context={{ category: "fragrance" }} /></article>
        <article><span>03 / FRAGRANCE</span><h3>Custom Fragrance</h3><p>Custom fragrance options from 100 pcs, subject to scent brief and project confirmation.</p><WhatsAppCta label="Share a scent brief" intent="project" context={{ category: "fragrance" }} /></article>
      </div>
    </section>

    <section className="low-moq-timing">
      <div><p className="eyebrow">06 / TIMING</p><h2>Clear starting points.<br /><em>Project-specific next steps.</em></h2></div>
      <div className="low-moq-timing-copy"><p className="low-moq-timing-callout">Lead time starts from approximately 7 days for eligible standard orders. Custom projects vary.</p><p>Ask for the current timing with your selected SKU, quantity, destination and project route. No universal seven-day guarantee is implied.</p><Link href="#faq" className="text-link">Read the buyer FAQ <ArrowRight size={15} /></Link></div>
    </section>

    <section className="low-moq-brief">
      <div className="low-moq-brief-copy"><p className="eyebrow">07 / QUOTE-READY BRIEF</p><h2>Send the details that make a quote useful.</h2><p>Share the product or SKU, estimated quantity, target market, sample request and any logo, packaging or scent-brief question.</p><WhatsAppCta label="Get a Low MOQ Quote" intent="quote" context={{ category: "fragrance" }} /></div>
      <div className="low-moq-brief-list"><p><Check size={17} /><span><strong>Product reference</strong>Product name, SKU or PDP URL.</span></p><p><Check size={17} /><span><strong>Quantity and market</strong>Estimated units and destination market.</span></p><p><Check size={17} /><span><strong>Project direction</strong>Standard order, logo, packaging or scent brief.</span></p><p><Check size={17} /><span><strong>Next action</strong>Sample, wholesale quote or private-label review.</span></p></div>
    </section>

    <section id="faq" className="low-moq-faq"><div className="section-head"><div><p className="eyebrow">08 / BUYER FAQ</p><h2>Questions worth answering before you ask.</h2></div><MessageCircle size={21} /></div><div className="low-moq-faq-list">{faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<ArrowRight size={15} /></summary><p>{faq.answer}</p></details>)}</div></section>

    <section className="low-moq-final-cta"><div><p className="eyebrow">09 / YOUR NEXT STEP</p><h2>Choose a product.<br /><em>Start the right conversation.</em></h2><p>Samples, quotes and private-label questions stay WhatsApp-first, with product context carried into the inquiry.</p></div><div className="low-moq-final-actions"><WhatsAppCta label="Request a Free Sample" intent="sample" context={{ category: "fragrance" }} /><WhatsAppCta label="Get a Low MOQ Quote" intent="quote" context={{ category: "fragrance" }} className="button-rose" /><WhatsAppCta label="Discuss Private Label Options" intent="project" context={{ category: "fragrance" }} /></div></section>
  </SiteShell></>;
}
