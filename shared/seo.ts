import type { Product, ProductCategory } from "../client/src/data/products";

export const canonicalPublicWebsiteUrl = "https://topperfume.cn";

export type SeoPage = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "product";
  structuredData: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function canonicalUrl(path = "/") {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${canonicalPublicWebsiteUrl}${normalizedPath}`;
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TopPerfume",
  url: canonicalPublicWebsiteUrl,
  description: "Beauty product development and sourcing for fragrance, skincare and makeup through branded wholesale, private label, OEM and ODM solutions.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TopPerfume",
  url: canonicalPublicWebsiteUrl,
  description: "Beauty product development and sourcing for fragrance, skincare and makeup.",
  publisher: { "@type": "Organization", name: "TopPerfume", url: canonicalPublicWebsiteUrl },
};

export const homeSeo: SeoPage = {
  title: "TopPerfume | Private Label Beauty & Fragrance Manufacturer",
  description: "TopPerfume helps beauty brands source and develop fragrance, skincare and makeup through branded wholesale, private label, OEM and ODM solutions.",
  path: "/",
  type: "website",
  structuredData: [organizationSchema, websiteSchema],
};

const collectionSeoCopy: Record<ProductCategory, Pick<SeoPage, "title" | "description">> = {
  fragrance: {
    title: "Fragrance Wholesale Catalogue | TopPerfume",
    description: "Browse TopPerfume fragrance formats for branded wholesale, private label, OEM and ODM buyer enquiries, samples and quotations.",
  },
  skincare: {
    title: "Skincare & Body Care Wholesale Catalogue | TopPerfume",
    description: "Browse TopPerfume skincare and body-care formats for branded wholesale, private label, OEM and ODM buyer enquiries, samples and quotations.",
  },
  makeup: {
    title: "Makeup Wholesale Catalogue | TopPerfume",
    description: "Browse TopPerfume colour-makeup formats for branded wholesale, private label, OEM and ODM buyer enquiries, samples and quotations.",
  },
};

export const collectionSeo: Record<ProductCategory, SeoPage> = (Object.keys(collectionSeoCopy) as ProductCategory[]).reduce((pages, category) => {
  const copy = collectionSeoCopy[category];
  const path = `/collections/${category}`;
  pages[category] = {
    ...copy,
    path,
    type: "website",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.title.replace(" | TopPerfume", ""),
      description: copy.description,
      url: canonicalUrl(path),
      isPartOf: { "@type": "WebSite", name: "TopPerfume", url: canonicalPublicWebsiteUrl },
    },
  };
  return pages;
}, {} as Record<ProductCategory, SeoPage>);

function cleanDescriptor(value: string) {
  return value.split("·").map(part => part.trim()).filter(Boolean).join(", ");
}

export function getProductSeo(product: Product): SeoPage {
  const path = `/products/${product.slug}`;
  const categoryLabel = product.category === "skincare" ? "Skincare & Body Care" : product.category[0].toUpperCase() + product.category.slice(1);
  const description = `${product.name} is a ${cleanDescriptor(product.descriptor)} ${categoryLabel.toLowerCase()} format for B2B buyers. Request a sample or wholesale quote from TopPerfume.`;

  return {
    title: `${product.name} | ${categoryLabel} Wholesale | TopPerfume`,
    description,
    path,
    type: "product",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description,
      sku: product.sku,
      category: categoryLabel,
      url: canonicalUrl(path),
      image: product.image,
    },
  };
}

export function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${canonicalUrl("/sitemap.xml")}\n`;
}

export function buildSitemapXml(products: Product[]) {
  const urls = [
    { path: "/", priority: "1.0" },
    { path: "/collections/fragrance", priority: "0.8" },
    { path: "/collections/skincare", priority: "0.8" },
    { path: "/collections/makeup", priority: "0.8" },
    ...products.map(product => ({ path: `/products/${product.slug}`, priority: "0.6" })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ path, priority }) => `  <url><loc>${canonicalUrl(path)}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`).join("\n")}\n</urlset>\n`;
}
