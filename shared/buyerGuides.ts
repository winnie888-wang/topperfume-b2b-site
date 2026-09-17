import articleData from './buyer-guides.json';
import type { SeoPage } from './seo';

export const buyerGuides = articleData;
export type BuyerGuide = typeof buyerGuides[number];
export const guidePath = (slug: string) => `/buyer-guides/${slug}`;
export const buyerGuidesSeo: SeoPage = {
  title: 'Buyer Guides | Perfume Wholesale & Private Label | TopPerfume',
  description: 'Practical buying guides for your first wholesale perfume order and eligible custom logo projects. Prepare product requirements, sample questions and a quotation brief.',
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
      datePublished: article.publishedDate, dateModified: article.publishedDate,
      author: { '@type': 'Organization', name: 'TopPerfume', url: 'https://topperfume.cn/contact' },
      publisher: { '@type': 'Organization', name: 'TopPerfume', url: 'https://topperfume.cn/' },
    },
  };
}
