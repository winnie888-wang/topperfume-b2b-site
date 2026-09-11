import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { prerenderBody } from "./prerender";
import { products } from "../client/src/data/products";
import { buildRobotsTxt, buildSitemapXml, collectionSeo, contactSeo, getProductSeo, homeSeo, lowMoqPerfumeSeo, type SeoPage } from "../shared/seo";

const outputDirectory = path.resolve(import.meta.dirname, "..", "dist", "public");
const indexable = process.env.VERCEL_ENV !== "preview" && process.env.SITE_INDEXABLE === "true";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderPageHtml(template: string, page: SeoPage) {
  const canonical = `https://topperfume.cn${page.path === "/" ? "/" : page.path}`;
  const schema = JSON.stringify(page.structuredData).replace(/<\//g, "<\\/");
  return template
    .replace(/<meta name="robots" content="[^"]*"\s*\/>/i, `<meta name="robots" content="${indexable ? "index,follow" : "noindex,nofollow"}" />`)
    .replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/>/i, `<meta property="og:type" content="${page.type ?? "website"}" />`)
    .replace("<!-- seo:structured-data -->", `<script type="application/ld+json" data-seo-schema="page">${schema}</script>`)
    .replace("</head>", `${page.image ? `<meta property="og:image" content="${escapeHtml(page.image)}" />` : ""}</head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${prerenderBody(page.path)}</div>`);
}

async function writePage(relativeDirectory: string, html: string) {
  const directory = path.join(outputDirectory, relativeDirectory);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html, "utf8");
}

const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
await writeFile(path.join(outputDirectory, "index.html"), renderPageHtml(template, homeSeo), "utf8");
await writePage("low-moq-perfume-manufacturer", renderPageHtml(template, lowMoqPerfumeSeo));
await writePage("contact", renderPageHtml(template, contactSeo));
await writeFile(path.join(outputDirectory, "404.html"), renderPageHtml(template, { title: "Page not found | TopPerfume", description: "This page could not be found.", path: "/404", structuredData: [] }).replace('content="index,follow"', 'content="noindex,nofollow"'), "utf8");

for (const [category, seo] of Object.entries(collectionSeo)) {
  await writePage(path.join("collections", category), renderPageHtml(template, seo));
}

for (const product of products) {
  await writePage(path.join("products", product.slug), renderPageHtml(template, getProductSeo(product)));
}

await writeFile(path.join(outputDirectory, "robots.txt"), buildRobotsTxt(indexable), "utf8");
await writeFile(path.join(outputDirectory, "sitemap.xml"), buildSitemapXml(products), "utf8");
