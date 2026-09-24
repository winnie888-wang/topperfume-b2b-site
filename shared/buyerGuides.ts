import articleData from './buyer-guides.json';
import type { SeoPage } from './seo';

export const buyerGuides = articleData;
export type BuyerGuide = Omit<typeof buyerGuides[number], 'publishedDate'> & { publishedDate: string | null };
export const guidePath = (slug: string) => `/buyer-guides/${slug}`;
export function getGuideConsultation(article: BuyerGuide) {
  if (article.id === 'TP-SEO-005') return { intent: 'project' as const, label: 'Send Your Quantity Plan for Review' };
  if (article.id === 'TP-SEO-003') return { intent: 'sample' as const, label: 'Discuss your sample shortlist' };
  if (article.id === 'TP-SEO-004') return { intent: 'project' as const, label: 'Discuss your makeup project' };
  return article.id === 'TP-SEO-001'
    ? { intent: 'project' as const, label: 'Discuss your logo project' }
    : { intent: 'quote' as const, label: 'Request a wholesale quote' };
}
export const guideCategoryLabel = (article: BuyerGuide) => article.category === 'makeup' ? 'MAKEUP PROCUREMENT' : 'PERFUME PROCUREMENT';
export const guideDateLabel = (article: BuyerGuide) => article.publishedDate
  ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${article.publishedDate}T00:00:00Z`))
  : 'Publication pending';

// Preview may contain an approved body awaiting its actual first-publication date.
export function assertBuyerGuidePublicationDates(articles: BuyerGuide[] = buyerGuides) {
  for (const article of articles) {
    const date = article.publishedDate;
    const parsed = date ? new Date(`${date}T00:00:00Z`) : null;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !parsed || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
      throw new Error(`Set the actual publication date for ${article.id} before a Production build.`);
    }
  }
}
export const buyerGuidesSeo: SeoPage = {
  title: 'Perfume & Makeup Buyer Guides | TopPerfume',
  description: 'Plan perfume and makeup purchases with guides to wholesale orders, sample comparison, custom logo briefs and first collections. Prepare a clear buying inquiry.',
  path: '/buyer-guides',
  structuredData: {
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'TopPerfume Buyer Guides',
    url: 'https://topperfume.cn/buyer-guides',
    mainEntity: { '@type': 'ItemList', itemListElement: buyerGuides.map((article, i) => ({ '@type': 'ListItem', position: i + 1, name: article.title, url: `https://topperfume.cn${guidePath(article.slug)}` })) },
  },
};
export function getBuyerGuideSeo(article: BuyerGuide): SeoPage {
  const path = guidePath(article.slug);
  const url = `https://topperfume.cn${path}`;
  return {
    path, title: article.seoTitle, description: article.description, type: 'article',
    structuredData: {
      '@context': 'https://schema.org', '@type': 'Article', '@id': `${url}#article`,
      headline: article.title, description: article.description, inLanguage: 'en',
      url, mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      ...(article.publishedDate ? { datePublished: article.publishedDate, dateModified: article.publishedDate } : {}),
      author: { '@type': 'Organization', name: 'TopPerfume', url: 'https://topperfume.cn/contact' },
      publisher: { '@type': 'Organization', name: 'TopPerfume', url: 'https://topperfume.cn/' },
    },
  };
}
