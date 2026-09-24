import { Link, useParams } from 'wouter';
import { useEffect } from 'react';
import { SiteShell, InquiryDrawer, WhatsAppCta } from '@/components/SiteShell';
import { Seo } from '@/components/Seo';
import { buyerGuides, getBuyerGuideSeo, getGuideConsultation, guideCategoryLabel, guideDateLabel, guidePath } from '@shared/buyerGuides';
import NotFound from './NotFound';

export default function BuyerGuide() {
  const { slug } = useParams<{ slug: string }>();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const guide = buyerGuides.find(article => article.slug === slug);
  if (!guide) return <NotFound />;
  const related = guide.relatedIds.map(id => buyerGuides.find(article => article.id === id)!).filter(Boolean);
  const consultation = getGuideConsultation(guide);
  const context = { category: guide.category, pageUrl: `https://topperfume.cn${guidePath(guide.slug)}` };
  return <SiteShell><Seo page={getBuyerGuideSeo(guide)} /><article className="buyer-guide">
    <header className="guide-header"><Link className="text-link" href="/buyer-guides">← Buyer Guides</Link><p className="eyebrow">{guideCategoryLabel(guide)}</p><h1>{guide.title}</h1><p className="guide-byline">By <Link href="/contact">TopPerfume</Link> · {guide.publishedDate ? <time dateTime={guide.publishedDate}>{guideDateLabel(guide)}</time> : <span>{guideDateLabel(guide)}</span>}</p></header>
    {/* HTML is compiled from reviewed repository Markdown, never user input. */}
    <div className="guide-body" dangerouslySetInnerHTML={{ __html: guide.html }} />
    <section className="guide-consultation" aria-label="Procurement consultation"><h2>Ready to discuss your brief?</h2><p>Use the planning fields above when you contact us. Product eligibility, quantities and transaction terms are confirmed for your request.</p><div className="guide-actions"><InquiryDrawer triggerLabel={consultation.label} intent={consultation.intent} context={context} /><WhatsAppCta label="Discuss on WhatsApp" intent={consultation.intent} context={context} /></div></section>
    {related.length > 0 && <aside className="guide-related"><p className="eyebrow">RELATED BUYER GUIDES</p>{related.map(article => <p key={article.id}><Link href={guidePath(article.slug)}>{article.title} →</Link></p>)}</aside>}
  </article></SiteShell>;
}
