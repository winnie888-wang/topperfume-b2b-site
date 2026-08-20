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

const nav = [
  { label: "Fragrance", href: "/collections/fragrance" },
  { label: "Skincare", href: "/collections/skincare" },
  { label: "Makeup", href: "/collections/makeup" },
];

export type InquiryIntent = "sample" | "quote" | "project";
export type InquiryContext = { productName?: string; productUrl?: string; category?: string };

const inquiryCopy: Record<InquiryIntent, { eyebrow: string; title: string; intro: string; submit: string }> = {
  sample: { eyebrow: "SAMPLE REQUEST / PREVIEW", title: "Request a product sample.", intro: "Tell us where you are selling, the product reference and the quantity you are planning for. Your product context is already attached below.", submit: "Stage sample request" },
  quote: { eyebrow: "QUOTE REQUEST / PREVIEW", title: "Get a focused quote.", intro: "Share your product, market and volume needs. The product context is carried into this preview form automatically.", submit: "Stage quote request" },
  project: { eyebrow: "PROJECT INTAKE / PREVIEW", title: "Start your next beauty project.", intro: "Share your category, market and desired customization. This preview form only demonstrates the future intake flow.", submit: "Stage project request" },
};

export function Wordmark() {
  return <Link href="/" className="brand-lockup" aria-label="TopPerfume home"><img src="/manus-storage/topperfume-mark_8166258c.png" alt="" className="brand-mark" /><span className="brand-word">TOPPERFUME</span><span className="brand-subword">BEAUTY PARTNERS</span></Link>;
}

export function InquiryDrawer({ triggerLabel = "Start Your Project", intent = "project", context, triggerClassName = "" }: { triggerLabel?: string; intent?: InquiryIntent; context?: InquiryContext; triggerClassName?: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const copy = inquiryCopy[intent];
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast("Preview inquiry staged", { description: "This prototype does not transmit or store contact details." });
  }
  return <Sheet open={open} onOpenChange={setOpen}>
    <Button className={`button-primary ${triggerClassName}`} onClick={() => setOpen(true)}>{triggerLabel} <ArrowRight size={16} strokeWidth={1.8} /></Button>
    <SheetContent side="right" className="inquiry-sheet">
      <SheetHeader><p className="eyebrow">{copy.eyebrow}</p><SheetTitle className="sheet-title">{copy.title}</SheetTitle><SheetDescription className="sheet-description">{copy.intro}</SheetDescription></SheetHeader>
      {submitted ? <div className="submission-note"><span className="mini-index">01</span><h3>Your request is staged.</h3><p>This is a prototype confirmation only. Live form routing will be connected after approval.</p><Button variant="outline" className="button-secondary" onClick={() => setSubmitted(false)}>Edit preview request</Button></div> :
        <form className="inquiry-form" onSubmit={handleSubmit}>
          {context?.productName && <div className="inquiry-context"><span>Product context attached</span><strong>{context.productName}</strong><p>{context.category} · {context.productUrl}</p></div>}
          <div className="inquiry-two-up"><label>Name<Input required placeholder="Your name" /></label><label>Country<Input required placeholder="Country / market" /></label></div>
          <div className="inquiry-two-up"><label>Email<Input required type="email" placeholder="name@company.com" /></label><label>WhatsApp<Input placeholder="Country code + number" /></label></div>
          <div className="inquiry-two-up"><label>Quantity<Input required type="number" min="1" placeholder="Estimated units" /></label><label>Customization<select defaultValue="private-label" aria-label="Customization"><option value="private-label">Private Label</option><option value="oem">OEM</option><option value="odm">ODM</option><option value="to-confirm">To confirm</option></select></label></div>
          <label>Notes <span className="label-optional">optional</span><Textarea placeholder="Market, format, packaging or sample notes…" rows={4} /></label>
          <Button type="submit" className="button-primary button-wide">{copy.submit} <ArrowRight size={16} /></Button><p className="form-disclaimer">Prototype behaviour only. No details are submitted or stored.</p>
        </form>}
    </SheetContent>
  </Sheet>;
}

export function WhatsAppAction({ context, className = "" }: { context?: InquiryContext; className?: string }) {
  return <button type="button" className={`whatsapp-action ${className}`} onClick={() => toast("WhatsApp routing [TO CONFIRM]", { description: context?.productName ? `${context.productName} and its product URL are ready to carry into the future WhatsApp flow.` : "Add the approved sales WhatsApp number before production launch." })}><MessageCircle size={16} /> WhatsApp</button>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="site-shell">
    <div className="utility-strip"><span>FRAGRANCE · SKINCARE · MAKEUP / PRIVATE LABEL · OEM · ODM</span><span>PROTOTYPE V2.1</span></div>
    <header className="site-header"><Wordmark /><nav className="desktop-nav" aria-label="Main navigation">{nav.map((item) => <Link className={location === item.href ? "nav-link active" : "nav-link"} key={item.href} href={item.href}>{item.label}</Link>)}<a className="nav-link" href="#capabilities">Capabilities</a></nav><div className="header-actions"><span className="desktop-only"><InquiryDrawer triggerLabel="Start Your Project" /></span><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={22} /></button></div></header>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className="mobile-nav-sheet"><SheetHeader><div className="mobile-close"><Wordmark /><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button></div><SheetTitle className="sr-only">Navigation</SheetTitle></SheetHeader><nav className="mobile-nav" aria-label="Mobile navigation">{nav.map((item, index) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>)}<a onClick={() => setMobileOpen(false)} href="#capabilities"><span>04</span>Capabilities</a></nav><InquiryDrawer triggerLabel="Start Your Project" /></SheetContent></Sheet>
    <main>{children}</main>
    <footer className="site-footer"><div><Wordmark /><p>Beauty product development and manufacturing for brands building a distinct next collection.</p></div><div className="footer-index"><span>01 / Product browse</span><span>02 / Custom development</span><span>03 / Buyer decision tools</span></div><div className="footer-cta"><p>Choose a product. Request a sample. Start your project.</p><InquiryDrawer triggerLabel="Start Your Project" /></div></footer>
  </div>;
}
