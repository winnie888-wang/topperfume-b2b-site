/**
 * Maison Mercantile design reminder: quiet luxury, product-first editorial framing,
 * and exact B2B information. Use Porcelain Ivory, Plum Ink, Mineral Rose, thin index lines,
 * and interaction that supports browsing then a truthful inquiry action.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { buildInquirySummary, businessProfile, getInquiryMailto, getInquiryWhatsAppUrl, inquiryRouting } from "@/data/business";

const nav = [
  { label: "Fragrance", href: "/collections/fragrance" },
  { label: "Skincare", href: "/collections/skincare" },
  { label: "Makeup", href: "/collections/makeup" },
];

export type InquiryIntent = "sample" | "quote" | "project";
export type InquiryContext = { productName?: string; productUrl?: string; category?: string };

const inquiryCopy: Record<InquiryIntent, { eyebrow: string; title: string; intro: string; submit: string }> = {
  sample: { eyebrow: "SAMPLE REQUEST", title: "Request a product sample.", intro: "Share the product reference, market and estimated quantity. Your product context is attached automatically and can be sent directly to Guiqi Technology Co., Ltd.", submit: "Prepare sample request" },
  quote: { eyebrow: "QUOTE REQUEST", title: "Get a focused quote.", intro: "Share the product reference, market and estimated quantity. Your structured request opens as a ready-to-send email or WhatsApp draft.", submit: "Prepare quote request" },
  project: { eyebrow: "PROJECT INTAKE", title: "Start your next beauty project.", intro: "Share category, market and customization direction. The request keeps product context and confirmed standard or custom order terms in view.", submit: "Prepare project request" },
};

export function Wordmark() {
  return <Link href="/" className="brand-lockup" aria-label="TopPerfume home"><img src="/manus-storage/topperfume-mark_8166258c.png" alt="" className="brand-mark" /><span className="brand-word">TOPPERFUME</span><span className="brand-subword">BEAUTY PARTNERS</span></Link>;
}

export function InquiryDrawer({ triggerLabel = "Start Your Project", intent = "project", context, triggerClassName = "" }: { triggerLabel?: string; intent?: InquiryIntent; context?: InquiryContext; triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState("");
  const copy = inquiryCopy[intent];
  async function copySummary() {
    try { await navigator.clipboard.writeText(summary); toast("Inquiry summary copied", { description: "Open the ready-to-send email or WhatsApp draft, or paste this request into your preferred channel." }); }
    catch { toast("Copy unavailable", { description: "Select the inquiry summary below and copy it manually." }); }
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSummary(buildInquirySummary({ intent, context, name: String(data.get("name") || ""), country: String(data.get("country") || ""), email: String(data.get("email") || ""), whatsapp: String(data.get("whatsapp") || ""), quantity: String(data.get("quantity") || ""), customization: String(data.get("customization") || ""), notes: String(data.get("notes") || "") }));
    setSubmitted(true);
    toast("Inquiry request prepared", { description: "Use the email or WhatsApp draft below to send your request to Guiqi Technology Co., Ltd." });
  }
  return <Sheet open={open} onOpenChange={setOpen}>
    <Button className={`button-primary ${triggerClassName}`} onClick={() => setOpen(true)}>{triggerLabel} <ArrowRight size={16} strokeWidth={1.8} /></Button>
    <SheetContent side="right" className="inquiry-sheet">
      <SheetHeader><p className="eyebrow">{copy.eyebrow}</p><SheetTitle className="sheet-title">{copy.title}</SheetTitle><SheetDescription className="sheet-description">{copy.intro}</SheetDescription></SheetHeader>
      {submitted ? <div className="submission-note"><span className="mini-index">01</span><h3>Your inquiry is ready.</h3><p>Your product context and form details have been assembled into a shareable B2B request. No details are stored by this site; open a draft below to send the request directly.</p><div className="inquiry-route-status"><span>Company</span><strong>{businessProfile.companyName}</strong><span>Sales email</span><strong>{inquiryRouting.email}</strong><span>WhatsApp</span><strong>{businessProfile.whatsappDisplay}</strong></div><Textarea className="inquiry-summary" value={summary} readOnly rows={13} aria-label="Prepared inquiry summary" /><div className="inquiry-route-actions"><Button type="button" className="button-primary" onClick={copySummary}>Copy inquiry summary</Button><a className="button-secondary button-mailto" href={getInquiryMailto(summary)}>Open email draft</a><a className="button-secondary button-whatsapp" href={getInquiryWhatsAppUrl(summary)} target="_blank" rel="noreferrer">Open WhatsApp draft</a></div><p className="form-disclaimer">Email and WhatsApp open a draft with your completed request; no form data is stored by this site.</p><Button variant="outline" className="button-secondary" onClick={() => setSubmitted(false)}>Edit request</Button></div> :
        <form className="inquiry-form" onSubmit={handleSubmit}>
          {context?.productName && <div className="inquiry-context"><span>Product context attached</span><strong>{context.productName}</strong><p>{context.category} · {context.productUrl}</p></div>}
          <div className="inquiry-two-up"><label>Name<Input required name="name" placeholder="Your name" /></label><label>Country<Input required name="country" placeholder="Country / market" /></label></div>
          <div className="inquiry-two-up"><label>Email<Input required name="email" type="email" placeholder="name@company.com" /></label><label>WhatsApp<Input name="whatsapp" placeholder="Country code + number" /></label></div>
          <div className="inquiry-two-up"><label>Quantity<Input required name="quantity" type="number" min="1" placeholder="Estimated units" /></label><label>Customization<select name="customization" defaultValue="private-label" aria-label="Customization"><option value="private-label">Private Label</option><option value="oem">OEM</option><option value="odm">ODM</option><option value="to-confirm">To confirm</option></select></label></div>
          <label>Notes <span className="label-optional">optional</span><Textarea name="notes" placeholder="Market, format, packaging or sample notes…" rows={4} /></label>
          <Button type="submit" className="button-primary button-wide">{copy.submit} <ArrowRight size={16} /></Button><p className="form-disclaimer">No information is stored. After preparation, a ready-to-send draft opens for {businessProfile.companyName}.</p>
        </form>}
    </SheetContent>
  </Sheet>;
}

export function WhatsAppAction({ context, className = "" }: { context?: InquiryContext; className?: string }) {
  function openWhatsApp() {
    const summary = buildInquirySummary({ intent: "whatsapp", context });
    window.open(getInquiryWhatsAppUrl(summary), "_blank", "noopener,noreferrer");
  }
  return <button type="button" className={`whatsapp-action ${className}`} onClick={openWhatsApp}><MessageCircle size={16} /> WhatsApp</button>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="site-shell">
    <div className="utility-strip"><span>FRAGRANCE · SKINCARE · MAKEUP / PRIVATE LABEL · OEM · ODM</span><span>PROTOTYPE V2.1</span></div>
    <header className="site-header"><Wordmark /><nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <Link className={location === item.href ? "nav-link active" : "nav-link"} key={item.href} href={item.href}>{item.label}</Link>)}<a className="nav-link" href="#capabilities">Capabilities</a></nav><div className="header-actions"><span className="desktop-only"><InquiryDrawer triggerLabel="Start Your Project" /></span><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={22} /></button></div></header>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="mobile-nav-sheet"><SheetHeader><div className="mobile-close"><Wordmark /><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button></div><SheetTitle className="sr-only">Navigation</SheetTitle></SheetHeader><nav className="mobile-nav" aria-label="Mobile navigation">{nav.map((item, index) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>)}<a onClick={() => setMobileOpen(false)} href="#capabilities"><span>04</span>Capabilities</a></nav><InquiryDrawer triggerLabel="Start Your Project" /></SheetContent></Sheet>
    <main>{children}</main>
    <footer className="site-footer"><div><Wordmark /><p>Beauty product development and manufacturing for brands building a distinct next collection.</p></div><div className="footer-index"><span>01 / Product browse</span><span>02 / Custom development</span><span>03 / Buyer decision tools</span></div><div className="footer-cta"><p>Choose a product. Request a sample. Start your project.</p><a className="footer-contact-link" href={`mailto:${businessProfile.email}`}>{businessProfile.email}</a><a className="footer-contact-link" href={`https://wa.me/${businessProfile.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp {businessProfile.whatsappDisplay}</a><InquiryDrawer triggerLabel="Start Your Project" /></div></footer>
  </div>;
}
