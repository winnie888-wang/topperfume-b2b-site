import type { Product, ProductCategory } from "@/data/products";

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

const lowMoqPerfumeFaqs = [
  {
    "@type": "Question",
    name: "What is the lowest MOQ for perfume orders?",
    acceptedAnswer: { "@type": "Answer", text: "Selected standard perfume orders from 2 pcs. Product eligibility, quantity and commercial route are confirmed by SKU." },
  },
  {
    "@type": "Question",
    name: "Are free samples available?",
    acceptedAnswer: { "@type": "Answer", text: "Free samples are available. Availability and quantity are confirmed by SKU. Shipping terms are confirmed by destination." },
  },
  {
    "@type": "Question",
    name: "How long does an eligible standard order take?",
    acceptedAnswer: { "@type": "Answer", text: "Lead time starts from approximately 7 days for eligible standard orders. Custom projects follow project-specific lead times." },
  },
  {
    "@type": "Question",
    name: "Can I add my logo from 100 pcs?",
    acceptedAnswer: { "@type": "Answer", text: "Logo customization from 100 pcs. The selected product, label route and project scope are confirmed before quotation." },
  },
  {
    "@type": "Question",
    name: "Can I customize the packaging from 100 pcs?",
    acceptedAnswer: { "@type": "Answer", text: "Custom packaging from 100 pcs. Individual bottle, cap, carton, label and artwork scope is confirmed per project." },
  },
  {
    "@type": "Question",
    name: "Can I request a custom fragrance from 100 pcs?",
    acceptedAnswer: { "@type": "Answer", text: "Custom fragrance options from 100 pcs, subject to a scent brief and project confirmation. Final scope follows the confirmed project brief." },
  },
  {
    "@type": "Question",
    name: "Can I discuss OEM or ODM through this page?",
    acceptedAnswer: { "@type": "Answer", text: "Yes. TopPerfume supports B2B sourcing, private-label, manufacturing and OEM/ODM project conversations. Exact scope is confirmed by product and project." },
  },
] as const;

const lowMoqPerfumeProducts = [
  { name: "Dior Sauvage Parfum Spray for Men", sku: "FR-DI-SAU-100", slug: "dior-sauvage-parfum-spray-men" },
  { name: "Carolina Herrera Good Girl Blush Tweed Talk Eau de Parfum for Women", sku: "FR-CH-GGBT-080", slug: "carolina-herrera-good-girl-blush-tweed-talk-edp-women" },
  { name: "Carolina Herrera Very Good Girl Glam Eau de Parfum for Women", sku: "FR-CH-VGGG-080", slug: "carolina-herrera-very-good-girl-glam-edp-women" },
  { name: "Yves Saint Laurent Mon Paris Parfum for Women", sku: "FR-YSL-MP-001", slug: "yves-saint-laurent-mon-paris-parfum-women" },
  { name: "Victoria’s Secret Bare Vanilla Body Fragrance Mist", sku: "FR-VS-BV-250", slug: "victorias-secret-bare-vanilla-body-fragrance-mist" },
  { name: "Pure Seduction Fragrance Mist & Lotion Set", sku: "FR-SET-PS-250236", slug: "pure-seduction-fragrance-mist-lotion-set" },
] as const;

export const lowMoqPerfumeSeo: SeoPage = {
  title: "Low MOQ Perfume Manufacturing Partner - From 2 Pcs | TopPerfume",
  description: "Selected standard perfume orders from 2 pcs. Free samples are available. Logo, packaging and custom fragrance options start from 100 pcs, subject to project confirmation.",
  path: "/low-moq-perfume-manufacturer",
  type: "website",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Low MOQ Perfume Options for New and Growing Brands",
      description: "Selected standard perfume orders from 2 pcs, with free samples available and logo, packaging and custom fragrance options from 100 pcs subject to project confirmation.",
      url: canonicalUrl("/low-moq-perfume-manufacturer"),
      isPartOf: { "@type": "WebSite", name: "TopPerfume", url: canonicalPublicWebsiteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Low MOQ perfume sourcing and private-label project support",
      serviceType: "B2B perfume sourcing, private-label, manufacturing and OEM/ODM project support",
      provider: { "@type": "Organization", name: "TopPerfume", url: canonicalPublicWebsiteUrl },
      url: canonicalUrl("/low-moq-perfume-manufacturer"),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Confirmed fragrance product references",
      itemListElement: lowMoqPerfumeProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          sku: product.sku,
          url: canonicalUrl(`/products/${product.slug}`),
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: lowMoqPerfumeFaqs,
    },
  ],
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
    { path: "/low-moq-perfume-manufacturer", priority: "0.9" },
    ...products.map(product => ({ path: `/products/${product.slug}`, priority: "0.6" })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ path, priority }) => `  <url><loc>${canonicalUrl(path)}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`).join("\n")}\n</urlset>\n`;
}
