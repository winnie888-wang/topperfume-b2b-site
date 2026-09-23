import { buyerGuides, guidePath } from "./buyerGuides";
import { dispatchGuidance, projectLeadTime, samplePolicy } from "./businessPolicy";
import { getProduct, type Product, type ProductCategory } from "@/data/products";
import { withOrderTerms } from "./productTerms";

export const canonicalPublicWebsiteUrl = "https://topperfume.cn";
export const privacySeo: SeoPage = {
  title: 'Privacy & Cookies | TopPerfume',
  description: 'How TopPerfume handles inquiries, retention, privacy requests and optional analytics cookies.',
  path: '/privacy',
  structuredData: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy & Cookies', url: 'https://topperfume.cn/privacy' },
};

export type SeoPage = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "product" | "article";
  image?: string;
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
  title: "TopPerfume | Beauty & Fragrance Wholesale Sourcing",
  description: "TopPerfume helps beauty brands source and develop fragrance, skincare and makeup through branded wholesale, private label, OEM and ODM solutions.",
  path: "/",
  type: "website",
  structuredData: [organizationSchema, websiteSchema],
};

export const contactSeo: SeoPage = {
  title: "Contact TopPerfume | Wholesale Beauty Enquiries",
  description: "Contact Guiqi Technology Co., Ltd., a trading company supporting wholesale fragrance, skincare and makeup sourcing. Request product and delivery details.",
  path: "/contact", type: "website",
  structuredData: { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact TopPerfume", url: canonicalUrl("/contact") },
};

export const lowMoqPerfumeFaqs = [
  {
    "@type": "Question",
    name: "What is the lowest MOQ for perfume orders?",
    acceptedAnswer: { "@type": "Answer", text: "Wholesale MOQ varies by SKU; selected products start from 2 pcs. Private Label starts from 100 pcs as a separate project. Current stock and order terms require confirmation." },
  },
  {
    "@type": "Question",
    name: "Are samples available and how are they charged?",
    acceptedAnswer: { "@type": "Answer", text: samplePolicy },
  },
  {
    "@type": "Question",
    name: "How long do stock orders and custom projects take?",
    acceptedAnswer: { "@type": "Answer", text: `${dispatchGuidance} ${projectLeadTime}` },
  },
  {
    "@type": "Question",
    name: "Can I add my logo from 100 pcs?",
    acceptedAnswer: { "@type": "Answer", text: "Private Label from 100 pcs. Logo customization from 100 pcs. These are separate project terms, not permission to relabel a branded product. Product selection and project scope are confirmed before quotation." },
  },
  {
    "@type": "Question",
    name: "Can I customize the packaging from 300 pcs?",
    acceptedAnswer: { "@type": "Answer", text: "Custom packaging from 300 pcs. Individual bottle, cap, carton, label and artwork scope is confirmed per project." },
  },
  {
    "@type": "Question",
    name: "Can I request a custom fragrance from 100 pcs?",
    acceptedAnswer: { "@type": "Answer", text: "Custom fragrance options from 100 pcs, subject to a scent brief and project confirmation. Final scope follows the confirmed project brief." },
  },
  {
    "@type": "Question",
    name: "Can I discuss OEM or ODM through this page?",
    acceptedAnswer: { "@type": "Answer", text: "Yes. TopPerfume supports B2B sourcing, supplier coordination and OEM/ODM project conversations. Exact scope is confirmed by product and project." },
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

const verifiedProductBrands: Record<string, string> = {
  // combinedListing.ts labelInformation explicitly identifies Lattafa on this SKU.
  "lattafa-khamrah": "Lattafa",
  "dior-sauvage-parfum-spray-men": "Dior",
  "carolina-herrera-good-girl-blush-tweed-talk-edp-women": "Carolina Herrera",
  "carolina-herrera-very-good-girl-glam-edp-women": "Carolina Herrera",
  "yves-saint-laurent-mon-paris-parfum-women": "Yves Saint Laurent",
  "victorias-secret-bare-vanilla-body-fragrance-mist": "Victoria’s Secret",
};

function getProductStructuredFields(product: Product) {
  const productDescription = product.briefing?.trim();
  const brandName = verifiedProductBrands[product.slug];

  return {
    ...(product.image ? { image: product.gallery ? product.gallery.map(image => new URL(image.src, canonicalPublicWebsiteUrl).href) : new URL(product.image, canonicalPublicWebsiteUrl).href } : {}),
    ...(productDescription ? { description: productDescription } : {}),
    ...(brandName ? { brand: { "@type": "Brand", name: brandName } } : {}),
    ...(product.slug === "lattafa-khamrah" ? { size: product.format } : {}),
  };
}

export const lowMoqPerfumeSeo: SeoPage = {
  title: "Low MOQ Perfume Wholesale & Private Label | TopPerfume",
  description: "Compare SKU-specific wholesale MOQs with separate private label, logo and fragrance projects from 100 pcs; packaging from 300 pcs. Paid samples; buyer pays freight.",
  path: "/low-moq-perfume-manufacturer",
  type: "website",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Low MOQ Perfume Options for New and Growing Brands",
      description: "Wholesale MOQ varies by SKU. Separate private label, logo and fragrance projects start from 100 pcs; custom packaging from 300 pcs. Samples are charged, and shipping costs are paid by the buyer.",
      url: canonicalUrl("/low-moq-perfume-manufacturer"),
      isPartOf: { "@type": "WebSite", name: "TopPerfume", url: canonicalPublicWebsiteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Low MOQ perfume sourcing and private-label project support",
      serviceType: "B2B perfume sourcing, supplier coordination and OEM/ODM project support",
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
        item: (() => {
          const sourceProduct = getProduct(product.slug);
          const offers = sourceProduct ? getProductOffer(sourceProduct) : undefined;
          return {
            "@type": "Product",
            name: product.name,
            ...(sourceProduct ? getProductStructuredFields(sourceProduct) : {}),
            sku: product.sku,
            url: canonicalUrl(`/products/${product.slug}`),
            ...(offers ? { offers } : {}),
          };
        })(),
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
    title: "Wholesale Perfume & Private Label Projects | TopPerfume",
    description: "Compare perfume sizes, wholesale prices and SKU-specific MOQs. Explore separate private-label projects from 100 pcs, paid samples and sourcing with TopPerfume.",
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
    ...(category === "fragrance" ? { image: new URL(getProduct("lattafa-khamrah")!.image, canonicalPublicWebsiteUrl).href } : {}),
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

function parseB2bPrice(value?: string) {
  const match = value?.match(/(?:US\$|\$)\s*(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : undefined;
}

export function getProductOffer(product: Product) {
  product = withOrderTerms(product);
  const price = parseB2bPrice(product.b2bPrice);
  if (price === undefined) return undefined;

  // The catalogue has no verified inventory field. Do not infer availability from sampleAvailability or dataStatus.
  return {
    "@type": "Offer",
    price,
    priceCurrency: "USD",
    url: canonicalUrl(`/products/${product.slug}`),
    ...(product.minimumOrderQuantity ? { eligibleQuantity: { "@type": "QuantitativeValue", minValue: product.minimumOrderQuantity, unitCode: "C62" } } : {}),
  };
}

// Editorial metadata for the two catalogue references used by buyer guide 4.
// These descriptions add no size, stock, wear-time or customization commitment.
const makeupGuideProductMetadata: Record<string, { title: string; description: string }> = {
  "hydrating-mirror-shine-lip-glaze": {
    title: "Mirror-Shine Lip Glaze Wholesale | TopPerfume",
    description: "Explore Hydrating Mirror-Shine Lip Glaze for wholesale buying. Confirm shade details, paid sample availability and customization eligibility for your request.",
  },
  "mocha-chocolate-9-shade-eyeshadow-palette": {
    title: "9-Shade Mocha Eyeshadow Palette Wholesale | TopPerfume",
    description: "Compare the Mocha Chocolate 9-Shade Eyeshadow Palette for wholesale buying. Confirm product details, paid sample availability and customization eligibility.",
  },
};

export function getProductSeo(product: Product): SeoPage {
  const path = `/products/${product.slug}`;
  const categoryLabel = product.category === "skincare" ? "Skincare & Body Care" : product.category[0].toUpperCase() + product.category.slice(1);
  const description = product.slug === "lattafa-khamrah"
    ? `Source Lattafa Khamrah ${product.format} at ${product.b2bPrice}, wholesale MOQ ${product.standardMoq}. Confirm stock, paid sample availability and dispatch with TopPerfume.`
    : makeupGuideProductMetadata[product.slug]?.description ?? product.seoDescription ?? (product.minimumOrderQuantity
    ? `${product.name}, ${product.b2bPrice}. Minimum order: ${product.standardMoq}. View product images and request a wholesale quote from TopPerfume. Delivery terms confirmed on request.`
    : `${product.name} is a ${cleanDescriptor(product.descriptor)} ${categoryLabel.toLowerCase()} format for B2B buyers. Request a wholesale quote from TopPerfume.`);
  const offer = getProductOffer(product);
  const structuredData = product.variants ? {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: product.name,
    ...getProductStructuredFields(product),
    productGroupID: product.slug,
    variesBy: product.variantLabel === "size" ? "https://schema.org/size" : "Label variant",
    url: canonicalUrl(path),
    hasVariant: product.variants.map(variant => ({
      "@type": "Product",
      "@id": `${canonicalUrl(path)}#${variant.id}`,
      name: variant.name,
      image: new URL(product.image, canonicalPublicWebsiteUrl).href,
      size: variant.format ?? product.format,
      description: `${variant.name}. Shown ${variant.imagePosition} in the supplied group photo. Priced individually.${variant.note ? ` ${variant.note}` : ""}`,
      url: `${canonicalUrl(path)}?variant=${variant.id}`,
      offers: {
        "@type": "Offer",
        price: variant.unitPrice,
        priceCurrency: "USD",
        url: `${canonicalUrl(path)}?variant=${variant.id}`,
        eligibleQuantity: { "@type": "QuantitativeValue", minValue: variant.minimumOrderQuantity, unitCode: "C62" },
      },
    })),
  } : offer ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    ...getProductStructuredFields(product),
    ...(product.sku ? { sku: product.sku } : {}),
    category: categoryLabel,
    url: canonicalUrl(path),
    offers: offer,
  } : {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: product.name,
    description,
    url: canonicalUrl(path),
    about: { "@type": "Thing", name: product.name, identifier: product.sku },
  };

  return {
    title: product.slug === "lattafa-khamrah" ? `Lattafa Khamrah ${product.format} Wholesale | TopPerfume` : makeupGuideProductMetadata[product.slug]?.title ?? `${product.name} | ${categoryLabel} Wholesale | TopPerfume`,
    image: new URL(product.image, canonicalPublicWebsiteUrl).href,
    description,
    path,
    type: "product",
    structuredData,
  };
}

export function buildRobotsTxt(indexable = false) {
  return indexable ? `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /previews/\n\nSitemap: ${canonicalUrl("/sitemap.xml")}\n` : "User-agent: *\nDisallow: /\n";
}

export function buildSitemapXml(products: Product[]) {
  const urls = [
    { path: "/", priority: "1.0" },
    { path: "/contact", priority: "0.7" },
    { path: "/privacy", priority: "0.3" },
    { path: "/buyer-guides", priority: "0.7" },
    ...buyerGuides.map(article => ({ path: guidePath(article.slug), priority: "0.7" })),
    { path: "/collections/fragrance", priority: "0.8" },
    { path: "/collections/skincare", priority: "0.8" },
    { path: "/collections/makeup", priority: "0.8" },
    { path: "/low-moq-perfume-manufacturer", priority: "0.9" },
    ...products.map(product => ({ path: `/products/${product.slug}`, priority: "0.6" })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ path, priority }) => `  <url><loc>${canonicalUrl(path)}</loc><changefreq>weekly</changefreq><priority>${priority}</priority></url>`).join("\n")}\n</urlset>\n`;
}
