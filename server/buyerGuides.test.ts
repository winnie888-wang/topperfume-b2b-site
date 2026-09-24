import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { buyerGuides, buyerGuidesSeo, getBuyerGuideSeo, getGuideConsultation, guideDateLabel, guidePath, assertBuyerGuidePublicationDates } from '../shared/buyerGuides';
import { buildSitemapXml, getProductSeo } from '../shared/seo';
import { getProduct, products } from '../client/src/data/products';
import { prerenderBody } from '../scripts/prerender';

const plain = (text: string) => text.replace(/<\/?(?:a|strong|em)\b[^>]*>/g, '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
describe('approved SEO buyer guides', () => {
  it('integrates the six approved bodies with every table, paragraph and list item preserved', () => {
    expect(buyerGuides.map(a => a.id)).toEqual(['TP-SEO-001', 'TP-SEO-002', 'TP-SEO-003', 'TP-SEO-004', 'TP-SEO-005', 'TP-SEO-006']);
    for (const article of buyerGuides) {
      const source = readFileSync(`content/buyer-guides/${article.id}.md`, 'utf8').replace(/\r\n/g, '\n');
      expect(createHash('sha256').update(source).digest('hex')).toBe(article.sourceSha256);
      expect(article.html).not.toMatch(/[\u4e00-\u9fff]|ENGLISH BODY|ARTICLE 1|ARTICLE 2|<script|<iframe|javascript:/);
      const rendered = plain(article.html);
      for (const line of source.split('\n').slice(1)) {
        if (!line.trim() || /^\|[ :\-]+\|/.test(line)) continue;
        const cells = line.startsWith('|') ? line.split('|').slice(1, -1) : [line];
        for (const cell of cells) {
          const text = cell.replace(/^#{1,6} |^- (?:\[ \] )?|^\d+\. /, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '').trim();
          expect(rendered).toContain(plain(text));
        }
      }
      expect((article.html.match(/<table>/g) ?? []).length).toBe(article.id === 'TP-SEO-006' ? 7 : article.id === 'TP-SEO-005' ? 5 : article.id === 'TP-SEO-002' ? 3 : 2);
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
      expect(seo.structuredData).toMatchObject({ '@type': 'Article', headline: article.title, inLanguage: 'en' });
      if (!article.publishedDate) expect(seo.structuredData).not.toHaveProperty('datePublished');
      else expect(seo.structuredData).toHaveProperty('datePublished', article.publishedDate);
      if (article.id <= 'TP-SEO-005') expect(article.publishedDate).toBe(article.id <= 'TP-SEO-002' ? '2026-09-17' : '2026-09-24');
      expect(sitemap).toContain(`https://topperfume.cn${seo.path}`);
      for (const [, href] of article.html.matchAll(/href="([^"]+)"/g)) {
        const url = new URL(href);
        if (article.id === 'TP-SEO-006' && href === 'https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise') continue;
        expect(url.origin).toBe('https://topperfume.cn');
        if (url.pathname.startsWith('/products/')) expect(getProduct(url.pathname.split('/')[2])).toBeDefined();
        else expect(['/contact', '/collections/fragrance', '/collections/makeup', '/low-moq-perfume-manufacturer', ...buyerGuides.map(a => guidePath(a.slug))]).toContain(url.pathname);
      }
    }
    expect(products).toHaveLength(38);
  });
  it('prerenders each publication date and accessible tables without duplicate H1s', () => {
    for (const article of buyerGuides) {
      const html = prerenderBody(guidePath(article.slug));
      expect((html.match(/<h1[ >]/g) ?? []).length).toBe(1);
      if (article.publishedDate) expect(html).toContain(`<time dateTime="${article.publishedDate}">${guideDateLabel(article)}</time>`);
      else {
        expect(html).toContain('Publication pending');
        expect(html).not.toContain('<time');
      }
      expect((html.match(/class="guide-table-scroll"/g) ?? []).length).toBe(article.tableCount);
      expect(html).toContain('tabindex="0"');
      expect(html).toContain('scope="col"');
      for (const id of article.relatedIds) expect(buyerGuides.some(a => a.id === id && a.id !== article.id)).toBe(true);
    }
  });
  it('routes the new sample and makeup inquiries without inheriting perfume project minimums', () => {
    for (const article of buyerGuides.filter(a => ['TP-SEO-003', 'TP-SEO-004'].includes(a.id))) {
      const html = prerenderBody(guidePath(article.slug));
      expect(getGuideConsultation(article).intent).toBe(article.category === 'makeup' ? 'project' : 'sample');
      expect(html).toContain('Samples are charged, and shipping is paid by the buyer.');
      expect(html).not.toMatch(/free[ -]?sample|7[ -]?day|(?:100|300) pcs/i);
      const drafts = [...html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)].map(([, url]) => new URL(url.replaceAll('&amp;', '&').replace(/&#x27;|&#39;/g, "'").replaceAll('&quot;', '"')).searchParams.get('text') ?? '');
      expect(drafts.some(text => text.includes(`https://topperfume.cn${guidePath(article.slug)}`))).toBe(true);
      for (const draft of drafts) expect(draft).not.toMatch(/(?:100|300) pcs|free[ -]?sample|7[ -]?day/i);
    }
  });
  it('preserves the locked V1.1 packaging body and routes its CTA to a project inquiry', () => {
    const article = buyerGuides.find(a => a.id === 'TP-SEO-005')!;
    const lockedDraft = readFileSync('docs/TP-SEO-005_BODY_V1.1.md', 'utf8').replace(/\r\n/g, '\n');
    expect(createHash('sha256').update(lockedDraft).digest('hex')).toBe('301b690f4fbee3e316b3b9b62ede5c7b0bc0b4c5819c45686be8db03b139b440');
    const approvedBody = lockedDraft.split('\n---\n\n**Internal link recommendations')[0]
      .replace(/\n\*TP-SEO-005 · English article V1\.1 · Draft for review — not published\.\*\n/, '').trim() + '\n';
    expect(readFileSync('content/buyer-guides/TP-SEO-005.md', 'utf8').replace(/\r\n/g, '\n')).toBe(approvedBody);
    expect(article.html).not.toMatch(/Draft for review|Internal link recommendations|English article V1/);
    expect(getGuideConsultation(article)).toEqual({ intent: 'project', label: 'Send Your Quantity Plan for Review' });
    const html = prerenderBody(guidePath(article.slug));
    expect(html).toContain('Send Your Quantity Plan for Review');
    expect(html).toContain('Samples are charged, and shipping is paid by the buyer.');
    expect(html).toContain('Illustrative example only:');
    expect(html).not.toMatch(/free[ -]?sample|7[ -]?day/i);
    expect(article.relatedIds).toEqual(['TP-SEO-001', 'TP-SEO-002', 'TP-SEO-003']);
    for (const existing of buyerGuides.filter(a => a.id < article.id)) {
      expect(existing.relatedIds).not.toContain(article.id);
    }
  });
  it('preserves published supplier verification V1.1, its tools and official reference', () => {
    const article = buyerGuides.find(a => a.id === 'TP-SEO-006')!;
    const source = readFileSync('content/buyer-guides/TP-SEO-006.md', 'utf8').replace(/\r\n/g, '\n');
    const approved = readFileSync('docs/TP-SEO-006_BODY_V1.1.md', 'utf8').replace(/\r\n/g, '\n');
    expect(createHash('sha256').update(source).digest('hex')).toBe('b5b527ff099d4e2cf32d5d8351afc15d27cf7b6c93ec3cc5c00aac9b6f8be5e6');
    expect(approved).toBe('**TP-SEO-006 English Body V1.1**\n\n' + source + '\nStandalone value: CONFIRMED\n');
    expect(article.publishedDate).toBe('2026-09-25');
    expect(() => assertBuyerGuidePublicationDates()).not.toThrow();
    expect(getBuyerGuideSeo(article).structuredData).toMatchObject({ datePublished: '2026-09-25', dateModified: '2026-09-25' });
    expect(prerenderBody(guidePath(article.slug))).not.toContain('Publication pending');
    expect(getGuideConsultation(article)).toEqual({ intent: 'quote', label: 'Send Your Product & Quote Details for Review' });
    expect((article.html.match(/type="checkbox"/g) ?? [])).toHaveLength(13);
    expect((article.html.match(/href="https:\/\/www\.fbi\.gov\//g) ?? [])).toHaveLength(1);
    expect((article.html.match(/href="https:\/\/topperfume\.cn\//g) ?? [])).toHaveLength(7);
    expect(article.relatedIds).toEqual(['TP-SEO-001', 'TP-SEO-002', 'TP-SEO-003', 'TP-SEO-005']);
    expect(article.html).toContain('Illustrative example only—not a TopPerfume order, customer case or confirmed service offer.');
    expect(article.html).toContain('Samples are charged, and shipping is paid by the buyer.');
    expect(article.html).toContain('For in-stock orders, dispatch is typically around 7 days after order confirmation.');
    expect(article.html).not.toMatch(/Standalone value|English Body V1|<iframe|<script/);
  });
  it('does not invent a publication date and blocks Production until an actual date is supplied', () => {
    const article = { ...buyerGuides.find(a => a.id === 'TP-SEO-005')!, publishedDate: null };
    expect(getBuyerGuideSeo(article).structuredData).not.toHaveProperty('dateModified');
    expect(() => assertBuyerGuidePublicationDates([article])).toThrow('TP-SEO-005');
    const dated = { ...article, publishedDate: '2026-09-24' };
    expect(() => assertBuyerGuidePublicationDates([dated])).not.toThrow();
    expect(getBuyerGuideSeo(dated).structuredData).toMatchObject({ datePublished: '2026-09-24', dateModified: '2026-09-24' });
    expect(() => assertBuyerGuidePublicationDates([{ ...dated, publishedDate: '2026-02-30' }])).toThrow();
  });
  it('adds reciprocal topic links only to the relevant categories and three product references', () => {
    const samplePath = guidePath(buyerGuides[2].slug);
    const makeupPath = guidePath(buyerGuides[3].slug);
    for (const route of ['/collections/fragrance', '/products/lattafa-khamrah']) {
      const html = prerenderBody(route);
      expect(html).toContain(`href="${samplePath}"`);
      expect(html).not.toContain(`href="${makeupPath}"`);
    }
    for (const route of ['/collections/makeup', '/products/hydrating-mirror-shine-lip-glaze', '/products/mocha-chocolate-9-shade-eyeshadow-palette']) {
      expect(prerenderBody(route)).toContain(`href="${makeupPath}"`);
    }
    for (const route of ['/products/lattafa-khamrah-qahwa', '/products/khadlaj-hareem-al-sultan', '/collections/skincare']) {
      expect(prerenderBody(route)).not.toContain('class="buyer-guide-links"');
    }
  });
  it('keeps makeup metadata factual and leaves stock and custom eligibility out of product offers', () => {
    for (const slug of ['hydrating-mirror-shine-lip-glaze', 'mocha-chocolate-9-shade-eyeshadow-palette']) {
      const product = getProduct(slug)!;
      const seo = getProductSeo(product);
      expect(seo.title).toContain('Wholesale | TopPerfume');
      expect(seo.description).toContain('paid sample availability');
      expect(seo.description).toContain('customization eligibility');
      expect(seo.description).not.toMatch(/guarantee|free|7.day|100 pcs|300 pcs/i);
      const schema = seo.structuredData as Record<string, any>;
      expect(schema['@type']).toBe('Product');
      expect(schema.offers.price).toBe(2.99);
      expect(schema.offers).not.toHaveProperty('availability');
      expect(schema).not.toHaveProperty('manufacturer');
      expect(schema).not.toHaveProperty('aggregateRating');
    }
  });
});
