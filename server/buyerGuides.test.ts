import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { buyerGuides, buyerGuidesSeo, getBuyerGuideSeo, guidePath } from '../shared/buyerGuides';
import { buildSitemapXml } from '../shared/seo';
import { getProduct, products } from '../client/src/data/products';

const plain = (text: string) => text.replace(/<\/?a\b[^>]*>/g, '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
describe('first two approved SEO buyer guides', () => {
  it('publishes only the two supplied bodies with every table, paragraph and list item preserved', () => {
    expect(buyerGuides.map(a => a.id)).toEqual(['TP-SEO-001', 'TP-SEO-002']);
    for (const article of buyerGuides) {
      const source = readFileSync(`content/buyer-guides/${article.id}.md`, 'utf8').replace(/\r\n/g, '\n');
      expect(createHash('sha256').update(source).digest('hex')).toBe(article.sourceSha256);
      expect(article.html).not.toMatch(/[\u4e00-\u9fff]|ENGLISH BODY|ARTICLE 1|ARTICLE 2|<script|<iframe|javascript:/);
      const rendered = plain(article.html);
      for (const line of source.split('\n').slice(1)) {
        if (!line.trim() || /^\|[ -]+\|/.test(line)) continue;
        const cells = line.startsWith('|') ? line.split('|').slice(1, -1) : [line];
        for (const cell of cells) {
          const text = cell.replace(/^#{1,6} |^- |^\d+\. /, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
          expect(rendered).toContain(plain(text));
        }
      }
      expect((article.html.match(/<table>/g) ?? []).length).toBe(article.id === 'TP-SEO-001' ? 2 : 3);
    }
  });
  it('uses existing public product and consultation targets and unique canonical/schema/sitemap URLs', () => {
    const sitemap = buildSitemapXml(products);
    expect(sitemap).toContain('https://topperfume.cn/buyer-guides');
    expect(buyerGuidesSeo.path).toBe('/buyer-guides');
    for (const article of buyerGuides) {
      const seo = getBuyerGuideSeo(article);
      expect(seo.path).toBe(guidePath(article.slug));
      expect(seo.title).toBe(article.seoTitle);
      expect(seo.description).toBe(article.description);
      expect(seo.structuredData).toMatchObject({ '@type': 'Article', headline: article.title, datePublished: '2026-09-17', inLanguage: 'en' });
      expect(sitemap).toContain(`https://topperfume.cn${seo.path}`);
      for (const [, href] of article.html.matchAll(/href="([^"]+)"/g)) {
        const url = new URL(href);
        expect(url.origin).toBe('https://topperfume.cn');
        if (url.pathname.startsWith('/products/')) expect(getProduct(url.pathname.split('/')[2])).toBeDefined();
        else expect(['/contact', '/collections/fragrance', '/low-moq-perfume-manufacturer']).toContain(url.pathname);
      }
    }
    expect(products).toHaveLength(38);
  });
});
