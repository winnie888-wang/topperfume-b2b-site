import { describe, it, expect } from 'vitest';
import { allProducts, products, getProduct } from '../client/src/data/products';
import { publicationHolds } from '../shared/publication';
import { buildSitemapXml } from '../shared/seo';

describe('final approved publication scope', () => {
  it('retains records while excluding every reviewed hold from public lookup and sitemap', () => {
    expect(Object.keys(publicationHolds)).toHaveLength(14);
    for (const slug of Object.keys(publicationHolds)) {
      expect(allProducts.find(p => p.slug === slug), slug).toBeDefined();
      expect(getProduct(slug), slug).toBeUndefined();
      expect(buildSitemapXml(products)).not.toContain(`/products/${slug}<`);
    }
    expect(products.length).toBe(allProducts.length - 14);
    expect(buildSitemapXml(products)).toContain('/privacy');
  });
  it('keeps the original 444 mL product and BC-04 public without changing approved terms', () => {
    expect(products.some(p => /444/.test(p.format))).toBe(true);
    const butter = products.find(p => p.intakeIds?.includes('BC-04'))!;
    expect(butter).toBeDefined();
    expect(butter.format).toContain('283');
    expect(allProducts.find(p => p.slug === 'vitamin-c-body-lotion-502ml')?.b2bPrice).toContain('2.99');
  });
});
