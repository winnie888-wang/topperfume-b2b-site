import { Link, useParams } from 'wouter';
import { useEffect } from 'react';
import { SiteShell, InquiryDrawer, WhatsAppCta } from '@/components/SiteShell';
import { Seo } from '@/components/Seo';
import { buyerGuides, getBuyerGuideSeo, guidePath } from '@shared/buyerGuides';
import NotFound from './NotFound';

export default function BuyerGuide() {
  const { slug } = useParams<{ slug: string }>();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const guide = buyerGuides.find(article => article.slug === slug);
  if (!guide) return <NotFound />;
  const related = buyerGuides.find(article => article.id !== guide.id)!;
  const custom = guide.id === 'TP-SEO-001';
  return <SiteShell><Seo page={getBuyerGuideSeo(guide)} /><article className="buyer-guide">
    <header className="guide-header"><Link className="text-link" href="/buyer-guides">← Buyer Guides</Link><p className="eyebrow">PERFUME PROCUREMENT</p><h1>{guide.title}</h1><p className="guide-byline">By <Link href="/contact">TopPerfume</Link> · <time dateTime={guide.publishedDate}>17 September 2026</time></p></header>
    {/* HTML is compiled only from the two reviewed English source files, never user input. */}
    <div className="guide-body" dangerouslySetInnerHTML={{ __html: guide.html }} />
    <section className="guide-consultation" aria-label="Procurement consultation"><h2>Ready to discuss your brief?</h2><p>Use the planning fields above when you contact us. Product eligibility, quantities and transaction terms are confirmed for your request.</p><div className="guide-actions"><InquiryDrawer triggerLabel={custom ? 'Discuss your logo project' : 'Request a wholesale quote'} intent={custom ? 'project' : 'quote'} /><WhatsAppCta label="Discuss on WhatsApp" intent={custom ? 'project' : 'quote'} /></div></section>
    <aside className="guide-related"><p className="eyebrow">RELATED BUYER GUIDE</p><Link href={guidePath(related.slug)}>{related.title} →</Link></aside>
  </article></SiteShell>;
}
