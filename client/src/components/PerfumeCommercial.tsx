import { Link } from "wouter";
import { projectLeadTime } from "@shared/businessPolicy";
import { InquiryDrawer, WhatsAppCta, type InquiryContext } from "./SiteShell";
import { perfumeProjectTerms, perfumeProjectScope, perfumeSamplePolicy, perfumeStockDispatch, perfumeSkuDispatch } from "@shared/perfumeCommercialTerms";

export function PerfumeProjectSection({ pagePath }: { pagePath: string }) {
  const context: InquiryContext = { productName: "Separate private-label perfume project", category: "fragrance", pageUrl: `https://topperfume.cn${pagePath}`, inquiryIntent: "Independent private-label project; not customization of a branded SKU", standardMoq: "100 pcs (private label); packaging MOQ 300 pcs" };
  return <section className="perfume-commercial perfume-project" id="private-label">
    <div><p className="eyebrow">02 / A SEPARATE PROJECT</p><h2>Build a perfume project for your own brand.</h2><p>TopPerfume supports perfume sourcing and supplier coordination. Share your target market, quantity and brand brief to discuss a private-label or custom project.</p></div>
    <div><dl className="perfume-terms">{perfumeProjectTerms.map(term => <div key={term.label}><dt>{term.label} MOQ</dt><dd>{term.moq} <span>pcs</span></dd></div>)}</dl><p className="perfume-note">{perfumeProjectScope}</p><p className="perfume-note">{projectLeadTime} Specifications and costs are agreed for each project.</p><div className="perfume-actions"><WhatsAppCta label="Discuss Private Label" intent="project" context={context} /><InquiryDrawer triggerLabel="Send Project Brief" intent="project" context={context} triggerClassName="button-secondary" /></div></div>
  </section>;
}

export function PerfumeBuyingNotes({ context, showStockPolicy = false }: { context: InquiryContext; showStockPolicy?: boolean }) {
  return <section className="perfume-commercial perfume-buying-notes">
    <div><p className="eyebrow">SAMPLES &amp; SHIPPING</p><h2>Confirm the details before you commit.</h2><p>{perfumeSamplePolicy}</p><WhatsAppCta label="Ask About Samples" intent="sample" context={context} /></div>
    <div><h3>{showStockPolicy ? "Stock orders and dispatch" : "Stock and dispatch for this product"}</h3><p>{showStockPolicy ? perfumeStockDispatch : perfumeSkuDispatch}</p><p>Share your destination and order quantity so our team can confirm freight and the applicable order terms.</p><div className="perfume-actions"><Link className="text-link" href="/contact">Contact / RFQ →</Link><Link className="text-link" href="/low-moq-perfume-manufacturer">Explore low MOQ buying routes →</Link></div></div>
  </section>;
}
