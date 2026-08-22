/**
 * Maison Mercantile design reminder: the Hero is one quiet, material-led fragrance photograph; B2B scope is clear in three seconds.
 * Fragrance, Skincare and Makeup retain equal visual weight in the following category rail; trust content is transparent about what is illustrative and what awaits certification proof.
 */
import { Link } from "wouter";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SiteShell, InquiryDrawer } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { businessProfile, commercialTerms, TO_CONFIRM } from "@/data/business";
import { products, type ProductCategory } from "@/data/products";
import { homepageHeroVisual } from "@/data/hero";

const categoryEntries: { category: ProductCategory; title: string; intro: string; href: string }[] = [
  { category: "fragrance", title: "Fragrance", intro: "Mists, scent profiles and private-label packaging.", href: "/collections/fragrance" },
  { category: "skincare", title: "Skincare", intro: "Care formats, routine products and custom development.", href: "/collections/skincare" },
  { category: "makeup", title: "Makeup", intro: "Colour formats, shade stories and branded components.", href: "/collections/makeup" },
];
const categoryProducts = categoryEntries.map((entry) => ({ ...entry, product: products.find((product) => product.category === entry.category)! }));
const buyerEvidence = [
  ["Product Development", "Product selection and development intake route for buyer review."],
  ["Packaging Development", "Custom logo and packaging requests begin from 100 pcs; final scope is confirmed with the brief."],
  ["Quality Control", "Quality-process documentation is reviewed with the confirmed product programme."],
  ["R&D", "Formula, fragrance or shade brief is assessed product by product."],
  ["Production", "Standard order: MOQ 2 pcs and approx. 7 days. Custom timing is confirmed with the brief."],
  ["Certifications", "Certificate dossier remains pending until genuine documents are provided."],
] as const;
const trustVisuals = [
  { title: "Packaging development", detail: "Illustrative / Concept Visual — not a Guiqi Technology facility photograph.", image: "/manus-storage/packaging-concept_345f706f.png", alt: "Illustrative concept visual of unbranded beauty packaging development" },
  { title: "R&D review", detail: "Illustrative / Concept Visual — not a Guiqi Technology laboratory photograph.", image: "/manus-storage/rd-concept_3454ead1.png", alt: "Illustrative concept visual of an unbranded beauty product review scene" },
  { title: "Production context", detail: "Illustrative / Concept Visual — not a Guiqi Technology production-line photograph.", image: "/manus-storage/production-concept_2a358be3.png", alt: "Illustrative concept visual of an unbranded beauty production context" },
] as const;

export default function Home() {
  return <SiteShell>
    <section className="hero-section hero-refined hero-luxe"><div className="hero-copy"><p className="eyebrow">BEAUTY PRODUCT DEVELOPMENT &amp; MANUFACTURING</p><h1>Beauty products<br /><em>built for your brand.</em></h1><p className="hero-intro">We are a B2B partner for beauty brands developing and manufacturing <strong>Fragrance, Skincare and Makeup</strong>—through <strong>Private Label, OEM and ODM</strong>.</p><p className="hero-editorial-note">Make the product the reason to begin.</p><p className="hero-category-line">Fragrance <span>·</span> Skincare <span>·</span> Makeup</p><div className="hero-actions"><Link href="#products" className="text-link">Browse Products <ArrowRight size={16} /></Link><InquiryDrawer triggerLabel="Start Your Project" /></div></div><figure className="hero-product-stage hero-single-stage"><img className="hero-single-image" src={homepageHeroVisual.src} alt={homepageHeroVisual.alt} /><figcaption className="hero-visual-disclosure">Illustrative / Concept Visual</figcaption></figure></section>

    <section className="business-statement"><div className="section-index">01 / WHAT WE DO</div><h2>Develop the product.<br />Build the brand experience.</h2><div className="manifesto-body"><p>Start with a product reference, select your level of customization, then move to sample, quotation and project planning. The experience is deliberately designed for international beauty buyers—not for price-first browsing.</p><Link href="#products" className="circle-arrow"><ArrowRight size={24} /></Link></div></section>

    <section id="products" className="category-rail category-rail-refined"><div className="rail-heading"><div><p className="eyebrow">BROWSE BY CATEGORY</p><h2>Three equal ways to start.</h2></div><p className="category-rail-note">Each category opens to a fast product grid with sample and quotation paths.</p></div><div className="category-grid">{categoryProducts.map(({ category, title, intro, href, product }, index) => <Link href={href} className={`category-panel category-panel-refined ${category}-panel`} key={category}><img src={product.image} className="category-visual" alt={`${title} product visual`} /><div className="category-panel-body"><span>0{index + 1} / {title}</span><h3>{title}</h3><p>{intro}</p><small>Confirmed product visual · SKU data</small></div><ArrowRight size={18} /></Link>)}</div></section>

    <section className="featured-section balanced-products"><div className="section-head"><div><p className="eyebrow">PRODUCTS AT A GLANCE</p><h2>One product from every category.</h2></div><Link href="/collections/fragrance" className="text-link">View all products <ArrowRight size={16} /></Link></div><div className="product-grid balanced-grid">{categoryProducts.map(({ product }, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div></section>

    <section id="capabilities" className="capabilities-section"><div className="capabilities-image"><img src="/manus-storage/topperfume-packaging-study_f7ac65c2.jpg" alt="Illustrative concept visual of unbranded beauty packaging development materials" /><span className="capability-visual-disclosure">Illustrative / Concept Visual</span></div><div className="capabilities-copy"><p className="eyebrow">CUSTOM DEVELOPMENT, NOT A GENERIC CATALOGUE</p><h2>The work behind a product that feels yours.</h2><div className="capability-list"><p><Check size={17} /> Product development &amp; product selection</p><p><Check size={17} /> Formula, fragrance &amp; shade customization</p><p><Check size={17} /> Packaging, artwork &amp; logo customization</p><p><Check size={17} /> Sample requests, quotations &amp; project planning</p></div><InquiryDrawer triggerLabel="Start Your Project" /></div></section>

    <section className="trust-section buyer-trust-section"><div className="trust-heading"><p className="eyebrow">BUYER TRUST / DIRECT CONTACT</p><h2>A record for<br />the next decision.</h2><p>Buyer trust is built with direct contact, clear order pathways and documentation disclosed only when verified. No factory, laboratory or certificate claim is inferred from the concept visuals below.</p><div className="trust-contact-card"><span>BUSINESS CONTACT</span><strong>{businessProfile.companyName}</strong><a href={`mailto:${businessProfile.email}`}>{businessProfile.email}</a><a href={`https://wa.me/${businessProfile.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp {businessProfile.whatsappDisplay}</a></div></div><div className="trust-dossier">{buyerEvidence.map(([title, detail], index) => <article key={title}><span className="dossier-number">0{index + 1}</span><div><small>BUYER REVIEW FIELD</small><h3>{title}</h3><p>{detail}</p></div><span className="dossier-status">{title === "Certifications" ? "[CERTIFICATE TO CONFIRM]" : "REVIEW WITH BRIEF"}</span></article>)}</div><div className="trust-visual-ledger" aria-label="Illustrative concept visual disclosure">{trustVisuals.map((visual, index) => <article className="trust-concept-card" key={visual.title}><img src={visual.image} alt={visual.alt} /><div className="concept-visual-label">ILLUSTRATIVE / CONCEPT VISUAL</div><div className="trust-concept-copy"><span>0{index + 1} / {visual.title}</span><p>{visual.detail}</p></div></article>)}<article className="certificate-pending-card"><span className="certificate-index">04 / CERTIFICATIONS</span><div><small>DOCUMENTATION STATUS</small><h3>[CERTIFICATE<br />TO CONFIRM]</h3><p>Genuine certificates will be uploaded here only after their source and validity are confirmed. No ISO, GMP, FDA or comparable certification is claimed on this page.</p></div><span className="certificate-rule" /></article></div><div className="trust-order-summary"><span>STANDARD ORDER</span><strong>{commercialTerms.standard.map((term) => `${term.label}: ${term.value}`).join(" · ")}</strong><span>CUSTOM ORDER</span><strong>{commercialTerms.custom.map((term) => `${term.label}: ${term.value}`).join(" · ")}</strong><InquiryDrawer triggerLabel="Start Your Project" /></div></section>

    <section className="process-section"><div><p className="eyebrow">A CLEAR BUYER PATH</p><h2>Browse products.<br />Make decisions.</h2></div><div className="process-grid"><article><span>01</span><h3>Browse</h3><p>Choose a category and compare product formats with the key B2B fields in view.</p></article><article><span>02</span><h3>Request</h3><p>Request a sample or quote from the specific product you are considering.</p></article><article><span>03</span><h3>Develop</h3><p>Confirm customization, MOQ and lead time with the right project context.</p></article></div></section>
    <section className="closing-banner"><Sparkles size={20} /><p>Choose a product, then move to sample, quote or customization.</p><InquiryDrawer triggerLabel="Start Your Project" /></section>
  </SiteShell>;
}
