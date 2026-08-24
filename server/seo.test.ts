import { describe, expect, it } from "vitest";
import { products } from "../client/src/data/products";
import { buildRobotsTxt, buildSitemapXml, canonicalPublicWebsiteUrl, canonicalUrl, collectionSeo, getProductOffer, getProductSeo, homeSeo, lowMoqPerfumeSeo } from "../shared/seo";

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

    expect(urls).toHaveLength(products.length + 5);
    expect(urls[0]).toBe("https://topperfume.cn/");
    expect(urls).toContain("https://topperfume.cn/collections/fragrance");
    expect(urls).toContain("https://topperfume.cn/collections/skincare");
    expect(urls).toContain("https://topperfume.cn/collections/makeup");
    expect(urls).toContain("https://topperfume.cn/low-moq-perfume-manufacturer");
    expect(sitemap).toContain("<loc>https://topperfume.cn/low-moq-perfume-manufacturer</loc><changefreq>weekly</changefreq><priority>0.9</priority>");
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

  it("publishes real offers for products with confirmed prices without inventing ratings or inventory", () => {
    const pricedProducts = products.filter(product => getProductOffer(product));
    expect(pricedProducts).toHaveLength(21);

    for (const product of pricedProducts) {
      const offer = getProductOffer(product);
      const seo = getProductSeo(product);
      const schema = seo.structuredData as Record<string, unknown>;
      expect(offer).toMatchObject({
        "@type": "Offer",
        priceCurrency: "USD",
        url: `https://topperfume.cn/products/${product.slug}`,
      });
      expect(typeof offer?.price).toBe("number");
      expect(schema).toMatchObject({ "@type": "Product", offers: offer });
      expect(JSON.stringify(schema)).not.toContain("aggregateRating");
      expect(JSON.stringify(schema)).not.toContain("review");
      expect(JSON.stringify(schema)).not.toContain("availability");
      expect(JSON.stringify(schema)).not.toContain("itemCondition");
    }

    const productWithoutConfirmedPrice = products.find(product => product.slug === "jergens-ultra-healing-body-lotion");
    expect(productWithoutConfirmedPrice).toBeDefined();
    expect(getProductOffer(productWithoutConfirmedPrice!)).toBeUndefined();
    expect((getProductSeo(productWithoutConfirmedPrice!).structuredData as Record<string, unknown>)["@type"]).toBe("WebPage");
  });

  it("adds offers to all six real products in the low-MOQ ItemList", () => {
    const itemList = (lowMoqPerfumeSeo.structuredData as Array<Record<string, unknown>>).find(schema => schema["@type"] === "ItemList");
    const items = itemList?.itemListElement as Array<Record<string, unknown>>;
    expect(items).toHaveLength(6);
    expect(items.every(item => Boolean((item.item as Record<string, unknown>).offers))).toBe(true);
    for (const item of items) {
      const product = item.item as Record<string, unknown>;
      const offer = product.offers as Record<string, unknown>;
      expect(offer).toMatchObject({ "@type": "Offer", priceCurrency: "USD" });
      expect(typeof offer.price).toBe("number");
      expect(offer.url).toMatch(/^https:\/\/topperfume\.cn\/products\//);
      expect(offer).not.toHaveProperty("availability");
      expect(offer).not.toHaveProperty("itemCondition");
    }
    const serialized = JSON.stringify(itemList);
    expect(serialized).not.toContain("aggregateRating");
    expect(serialized).not.toContain("review");
  });
});
