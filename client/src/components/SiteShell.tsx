/**
 * Maison Mercantile design reminder: quiet luxury, product-first editorial framing,
 * and exact B2B information. Use Porcelain Ivory, Plum Ink, Mineral Rose, thin index lines,
 * and interaction that supports browsing then a truthful inquiry action.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu, X } from "lucide-react";
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

export function Wordmark() {
  return (
    <Link href="/" className="brand-lockup" aria-label="TopPerfume home">
      <img src="/manus-storage/topperfume-mark_8166258c.png" alt="" className="brand-mark" />
      <span className="brand-word">TOPPERFUME</span>
      <span className="brand-subword">BEAUTY PARTNERS</span>
    </Link>
  );
}

export function InquiryDrawer({ triggerLabel = "Start a project" }: { triggerLabel?: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast("Preview inquiry saved locally", {
      description: "This prototype does not transmit contact details. We will connect the workflow after approval.",
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button className="button-primary" onClick={() => setOpen(true)}>
        {triggerLabel} <ArrowRight size={16} strokeWidth={1.8} />
      </Button>
      <SheetContent side="right" className="inquiry-sheet">
        <SheetHeader>
          <p className="eyebrow">PROJECT INTAKE / PREVIEW</p>
          <SheetTitle className="sheet-title">Turn a product direction into a launch brief.</SheetTitle>
          <SheetDescription className="sheet-description">
            Share your category, target market, and the format you want to develop. This demo stores nothing and sends no request.
          </SheetDescription>
        </SheetHeader>
        {submitted ? (
          <div className="submission-note">
            <span className="mini-index">01</span>
            <h3>Your brief is staged.</h3>
            <p>This is a preview confirmation only. The live inquiry routing will be connected after the visual prototype is approved.</p>
            <Button variant="outline" className="button-secondary" onClick={() => setSubmitted(false)}>Edit preview brief</Button>
          </div>
        ) : (
          <form className="inquiry-form" onSubmit={handleSubmit}>
            <label>
              Your work email
              <Input required type="email" placeholder="name@company.com" />
            </label>
            <label>
              Category
              <select defaultValue="fragrance" aria-label="Category">
                <option value="fragrance">Fragrance</option>
                <option value="skincare">Skincare</option>
                <option value="makeup">Makeup</option>
              </select>
            </label>
            <label>
              Project brief
              <Textarea required placeholder="Format, market, desired positioning, quantities or samples…" rows={6} />
            </label>
            <Button type="submit" className="button-primary button-wide">Stage my brief <ArrowRight size={16} /></Button>
            <p className="form-disclaimer">Prototype behaviour only. No details are submitted or stored.</p>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="site-shell">
      <div className="utility-strip"><span>BEAUTY B2B / PRODUCT DIRECTION</span><span>PROTOTYPE V2.0</span></div>
      <header className="site-header">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map((item) => <Link className={location === item.href ? "nav-link active" : "nav-link"} key={item.href} href={item.href}>{item.label}</Link>)}
          <a className="nav-link" href="#capabilities">Capabilities</a>
        </nav>
        <div className="header-actions"><span className="desktop-only"><InquiryDrawer triggerLabel="Request a brief" /></span><button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={22} /></button></div>
      </header>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="mobile-nav-sheet">
          <SheetHeader><div className="mobile-close"><Wordmark /><button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={20} /></button></div><SheetTitle className="sr-only">Navigation</SheetTitle></SheetHeader>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map((item, index) => <Link onClick={() => setMobileOpen(false)} key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>)}
            <a onClick={() => setMobileOpen(false)} href="#capabilities"><span>04</span>Capabilities</a>
          </nav>
          <InquiryDrawer triggerLabel="Start a project" />
        </SheetContent>
      </Sheet>
      <main>{children}</main>
      <footer className="site-footer">
        <div><Wordmark /><p>Beauty product directions for brands ready to make a distinct next move.</p></div>
        <div className="footer-index"><span>01 / Product first</span><span>02 / Development aware</span><span>03 / Buyer ready</span></div>
        <div className="footer-cta"><p>Start with one product. Build toward a launch.</p><InquiryDrawer triggerLabel="Request a brief" /></div>
      </footer>
    </div>
  );
}
