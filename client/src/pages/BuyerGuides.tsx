import { Link } from 'wouter';
import { useEffect } from 'react';
import { SiteShell } from '@/components/SiteShell';
import { Seo } from '@/components/Seo';
import { buyerGuides, buyerGuidesSeo, guideCategoryLabel, guidePath } from '@shared/buyerGuides';

export default function BuyerGuides() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <SiteShell><Seo page={buyerGuidesSeo} /><section className="guide-index"><p className="eyebrow">BUYER GUIDES</p><h1>Make your next buying decision with a clear brief.</h1><p className="guide-intro">Practical guides for perfume and makeup buyers: plan an assortment, compare samples and prepare an eligible private-label project brief.</p><div className="guide-index-grid">{buyerGuides.map(guide => <article key={guide.id}><p className="eyebrow">{guideCategoryLabel(guide)}</p><h2><Link href={guidePath(guide.slug)}>{guide.title}</Link></h2><p>{guide.excerpt}</p><Link className="text-link" href={guidePath(guide.slug)}>Read the guide →</Link></article>)}</div></section></SiteShell>;
}
