import { describe, expect, it } from "vitest";
import { products } from "../client/src/data/products";
import { buildRobotsTxt, buildSitemapXml, canonicalPublicWebsiteUrl, canonicalUrl, collectionSeo, getProductSeo, homeSeo } from "../shared/seo";

describe("Production SEO foundation", () => {
  it("uses one https canonical domain for the site, collections and products", () => {
    expect(canonicalPublicWebsiteUrl).toBe("https://topperfume.cn");
    expect(canonicalUrl("/")).toBe("https://topperfume.cn/");
    expect(canonicalUrl("/collections/fragrance/")).toBe("https://topperfume.cn/collections/fragrance");
    expect(homeSeo.path).toBe("/");
    expect(Object.values(collectionSeo).map(page => page.path)).toEqual([
      "/collections/fragrance",
      "/collections/skincare",
      "/collections/makeup",
    ]);
    for (const product of products) {
      expect(getProductSeo(product).path).toBe(`/products/${product.slug}`);
      expect(canonicalUrl(getProductSeo(product).path)).toContain("https://topperfume.cn/products/");
    }
  });

  it("creates a complete, canonical sitemap with no Vercel deployment URLs", () => {
    const sitemap = buildSitemapXml(products);
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

    expect(urls).toHaveLength(products.length + 4);
    expect(urls[0]).toBe("https://topperfume.cn/");
    expect(urls).toContain("https://topperfume.cn/collections/fragrance");
    expect(urls).toContain("https://topperfume.cn/collections/skincare");
    expect(urls).toContain("https://topperfume.cn/collections/makeup");
    expect(urls).toContain("https://topperfume.cn/products/dior-sauvage-parfum-spray-men");
    expect(urls.every(url => url.startsWith(canonicalPublicWebsiteUrl))).toBe(true);
    expect(sitemap).not.toContain(".vercel.app");
  });

  it("publishes a crawlable robots policy that references the canonical sitemap", () => {
    const robots = buildRobotsTxt();
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Disallow: /api/");
    expect(robots).toContain("Sitemap: https://topperfume.cn/sitemap.xml");
    expect(robots).not.toContain(".vercel.app");
  });

  it("creates product metadata and schema without invented ratings, offers, prices or certifications", () => {
    for (const product of products) {
      const seo = getProductSeo(product);
      const schema = JSON.stringify(seo.structuredData);
      expect(seo.title).toContain(product.name);
      expect(seo.title).toContain("TopPerfume");
      expect(seo.description).not.toContain("[TO CONFIRM]");
      expect(schema).toContain('"@type":"Product"');
      expect(schema).toContain(`"sku":"${product.sku}"`);
      expect(schema).toContain(`"url":"https://topperfume.cn/products/${product.slug}"`);
      expect(schema).not.toContain("aggregateRating");
      expect(schema).not.toContain("offers");
      expect(schema).not.toContain("price");
      expect(schema).not.toContain("certification");
    }
  });
});
