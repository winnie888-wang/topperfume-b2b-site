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
import { buildInquirySummary, businessProfile, getInquiryWhatsAppUrl, getWhatsAppCtaUrl, type WhatsAppCtaIntent } from "@/data/business";
import { publicAssetUrl } from "@/data/publicAssets";
import { trpc } from "@/lib/trpc";
import { getInquiryDisplayState } from "@shared/inquiryUi";

const nav = [
  { label: "Fragrance", href: "/collections/fragrance" },
  { label: "Skincare", href: "/collections/skincare" },
  { label: "Makeup", href: "/collections/makeup" },
];

export type InquiryIntent = "sample" | "quote" | "project";
export type InquiryContext = { productName?: string; sku?: string; productUrl?: string; category?: string; standardMoq?: string; leadTime?: string; sampleAvailability?: string; customizationNote?: string };

const inquiryCopy: Record<InquiryIntent, { eyebrow: string; title: string; intro: string; submit: string }> = {
  sample: { eyebrow: "SAMPLE REQUEST", title: "Request a product sample.", intro: "Share the product reference, market and estimated quantity. Your product context is attached automatically for your inquiry.", submit: "Submit sample request" },
  quote: { eyebrow: "QUOTE REQUEST", title: "Get a focused quote.", intro: "Share the product reference, market and estimated quantity. Your completed request is submitted directly to our team.", submit: "Submit quote request" },
  project: { eyebrow: "PROJECT INTAKE", title: "Start your next beauty project.", intro: "Share category, market and customization direction. Your completed request is submitted directly to our team.", submit: "Submit project inquiry" },
};

export function Wordmark() {
  return <Link href="/" className="brand-lockup" aria-label="TopPerfume home"><img src={publicAssetUrl("topperfume-mark_8166258c.png")} alt="" className="brand-mark" /><span className="brand-word">TOPPERFUME</span><span className="brand-subword">BEAUTY PARTNERS</span></Link>;
}

export function InquiryDrawer({ triggerLabel = "Start Your Project", intent = "project", context, triggerClassName = "" }: { triggerLabel?: string; intent?: InquiryIntent; context?: InquiryContext; triggerClassName?: string }) {
  const qaSuccessPreview = import.meta.env.DEV && new URLSearchParams(window.location.search).get("inquirySuccessPreview") === triggerLabel;
  const [open, setOpen] = useState(qaSuccessPreview);
  const [submitted, setSubmitted] = useState<{ requestId: string; summary: string } | null>(() => qaSuccessPreview ? { requestId: "TP-QA-PREVIEW", summary: buildInquirySummary({ intent, context }) } : null);
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const copy = inquiryCopy[intent];
  const displayState = getInquiryDisplayState(Boolean(submitted));
  const submitInquiry = trpc.inquiry.submit.useMutation({
    onError: (error) => {
      toast("Submission unavailable", { description: error.message || "Please try again or use WhatsApp." });
    },
  });
  function openDrawer(nextOpen: boolean) {
    setOpen(nextOpen);
    if (nextOpen) {
      setSubmitted(null);
      setFormStartedAt(Date.now());
    }
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formValues = {
      name: String(data.get("name") || ""),
      country: String(data.get("country") || ""),
      email: String(data.get("email") || ""),
      whatsapp: String(data.get("whatsapp") || ""),
      quantity: String(data.get("quantity") || ""),
      customization: String(data.get("customization") || ""),
      notes: String(data.get("notes") || ""),
    };
    const summary = buildInquirySummary({ intent, context, ...formValues });
    submitInquiry.mutate({
      intent,
      productName: context?.productName,
      sku: context?.sku,
      productUrl: context?.productUrl ? new URL(context.productUrl, window.location.origin).toString() : undefined,
      category: context?.category,
      customerName: formValues.name,
      countryMarket: formValues.country,
      customerEmail: formValues.email,
      customerWhatsApp: formValues.whatsapp,
      quantity: formValues.quantity,
      customizationRequirement: formValues.customization,
      notes: formValues.notes,
      website: String(data.get("website") || ""),
      formStartedAt,
    }, {
      onSuccess: (result) => {
        setSubmitted({ requestId: result.requestId, summary });
        toast("Inquiry received", { description: "Your inquiry has been submitted to our team." });
      },
    });
  }
  return <Sheet open={open} onOpenChange={openDrawer}>
    <Button className={`button-primary ${triggerClassName}`} onClick={() => openDrawer(true)}>{triggerLabel} <ArrowRight size={16} strokeWidth={1.8} /></Button>
    <SheetContent side="right" className="inquiry-sheet">
      <SheetHeader><p className="eyebrow">{copy.eyebrow}</p><SheetTitle className="sheet-title">{copy.title}</SheetTitle><SheetDescription className="sheet-description">{copy.intro}</SheetDescription><p className="form-disclaimer">Your completed inquiry is sent directly to {businessProfile.companyName}. WhatsApp remains available as a separate quick-contact option.</p></SheetHeader>
      <div className="submission-note" role="status" aria-live="polite" hidden={!displayState.showSuccess}><span className="mini-index">01</span><h3>Thank you. Your inquiry has been received.</h3><p>Our team will contact you shortly. Reference: {submitted?.requestId}</p><div className="inquiry-route-status"><span>Company</span><strong>{businessProfile.companyName}</strong><span>Sales email</span><strong>{businessProfile.email}</strong><span>WhatsApp</span><strong>{businessProfile.whatsappDisplay}</strong></div><div className="inquiry-route-actions"><a className="button-secondary button-whatsapp" href={getInquiryWhatsAppUrl(submitted?.summary || buildInquirySummary({ intent, context }))} target="_blank" rel="noreferrer">Continue on WhatsApp</a></div><Button variant="outline" className="button-secondary" onClick={() => { setSubmitted(null); setFormStartedAt(Date.now()); }}>Submit another inquiry</Button></div>
      <form className="inquiry-form" onSubmit={handleSubmit} hidden={!displayState.showForm}>
          {context?.productName && <div className="inquiry-context"><span>Product context attached</span><strong>{context.productName}</strong><p>{context.sku ? `${context.sku} · ` : ""}{context.category} · {context.productUrl}</p></div>}
          <div className="inquiry-two-up"><label>Name<Input required name="name" placeholder="Your name" /></label><label>Country<Input required name="country" placeholder="Country / market" /></label></div>
          <div className="inquiry-two-up"><label>Email<Input required name="email" type="email" placeholder="name@company.com" /></label><label>WhatsApp<Input name="whatsapp" placeholder="Country code + number" /></label></div>
          <div className="inquiry-two-up"><label>Quantity<Input required name="quantity" type="number" min="1" placeholder="Estimated units" /></label><label>Customization requirement<select name="customization" defaultValue="Not specified" aria-label="Customization requirement"><option value="Not specified">Not specified</option><option value="Branded Wholesale">Branded Wholesale</option><option value="Private Label">Private Label</option><option value="OEM">OEM</option><option value="ODM">ODM</option></select></label></div>
          <label>Notes <span className="label-optional">optional</span><Textarea name="notes" placeholder="Market, format, packaging or sample notes…" rows={4} /></label>
          <label className="sr-only" aria-hidden="true">Website<Input name="website" tabIndex={-1} autoComplete="off" /></label>
          <Button type="submit" className="button-primary button-wide" disabled={submitInquiry.isPending}>{submitInquiry.isPending ? "Submitting inquiry…" : <>{copy.submit} <ArrowRight size={16} /></>}</Button>
          {submitInquiry.error && <p className="form-submission-error" role="alert">{submitInquiry.error.message || "We could not send your inquiry right now. Please try again or use WhatsApp."}</p>}
          <p className="form-disclaimer">Required fields are validated before secure submission. WhatsApp remains an optional quick-contact channel.</p>
        </form>
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

export function WhatsAppCta({ label, intent = "project", context, className = "" }: { label: string; intent?: WhatsAppCtaIntent; context?: InquiryContext; className?: string }) {
  const productUrl = context?.productUrl ? new URL(context.productUrl, window.location.origin).toString() : undefined;
  const href = getWhatsAppCtaUrl({ intent, context: { ...context, productUrl } });
  return <a className={`button-primary ${className}`} href={href} target="_blank" rel="noreferrer">{label} <ArrowRight size={16} strokeWidth={1.8} /></a>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="site-shell">
    <div className="utility-strip"><span>FRAGRANCE · SKINCARE · MAKEUP / BRANDED WHOLESALE · PRIVATE LABEL / OEM ODM</span><span>CURATED SKU PORTFOLIO · SAMPLE · QUOTE · PROJECT</span></div>
    <header className="site-header"><Wordmark /><nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <Link className={location === item.href ? "nav-link active" : "nav-link"} key={item.href} href={item.href}>{item.label}</Link>)}<a className="nav-link" href="#capabilities">Capabilities</a></nav><div className="header-actions"><span className="desktop-only"><WhatsAppCta label="Customize / Private Label" /></span><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={22} /></button></div></header>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="mobile-nav-sheet"><SheetHeader><div className="mobile-close"><Wordmark /><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button></div><SheetTitle className="sr-only">Navigation</SheetTitle></SheetHeader><nav className="mobile-nav" aria-label="Mobile navigation">{nav.map((item, index) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>)}<a onClick={() => setMobileOpen(false)} href="#capabilities"><span>04</span>Capabilities</a></nav><WhatsAppCta label="Customize / Private Label" /></SheetContent></Sheet>
    <main>{children}</main>
    <footer className="site-footer"><div><Wordmark /><p>Beauty product development and manufacturing for brands building a distinct next collection.</p></div><div className="footer-index"><span>01 / Product browse</span><span>02 / Custom development</span><span>03 / Buyer decision tools</span></div><div className="footer-cta"><p>Choose a product. Request a sample. Start your project.</p><a className="footer-contact-link" href={`mailto:${businessProfile.email}`}>{businessProfile.email}</a><a className="footer-contact-link" href={`https://wa.me/${businessProfile.whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp {businessProfile.whatsappDisplay}</a><WhatsAppCta label="Customize / Private Label" /></div></footer>
  </div>;
}
