import { Link } from 'wouter';
import { useEffect } from 'react';
import { SiteShell } from '@/components/SiteShell';
import { Seo } from '@/components/Seo';
import { buyerGuides, buyerGuidesSeo, guidePath } from '@shared/buyerGuides';

export default function BuyerGuides() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <SiteShell><Seo page={buyerGuidesSeo} /><section className="guide-index"><p className="eyebrow">BUYER GUIDES</p><h1>Make your next buying decision with a clear brief.</h1><p className="guide-intro">Practical guides for wholesale fragrance buyers and brands exploring eligible private-label options.</p><div className="guide-index-grid">{buyerGuides.map(guide => <article key={guide.id}><p className="eyebrow">PERFUME PROCUREMENT</p><h2><Link href={guidePath(guide.slug)}>{guide.title}</Link></h2><p>{guide.excerpt}</p><Link className="text-link" href={guidePath(guide.slug)}>Read the guide →</Link></article>)}</div></section></SiteShell>;
}
