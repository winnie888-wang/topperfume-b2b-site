import { Link } from 'wouter';
import { buyerGuides, guidePath } from '@shared/buyerGuides';

export function BuyerGuideLinks({ category = 'fragrance' }: { category?: 'fragrance' | 'makeup' }) {
  const guides = buyerGuides.filter(guide => guide.category === category);
  return <section className="buyer-guide-links"><p className="eyebrow">BUYER GUIDES</p><h2>Prepare your next buying decision.</h2><div>{guides.map(guide => <Link key={guide.id} href={guidePath(guide.slug)}>{guide.title} <span aria-hidden="true">→</span></Link>)}</div><Link href="/buyer-guides">All buyer guides</Link></section>;
}
