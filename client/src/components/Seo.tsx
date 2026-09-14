import { useEffect } from "react";
import type { SeoPage } from "@shared/seo";
import { canonicalUrl } from "@shared/seo";

function setMeta(selector: string, attribute: "name" | "property", value: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function Seo({ page }: { page: SeoPage }) {
  useEffect(() => {
    const canonical = canonicalUrl(page.path);
    document.title = page.title;
    document.documentElement.lang = "en";
    setMeta('meta[name="description"]', "name", "description", page.description);
    setMeta('meta[property="og:title"]', "property", "og:title", page.title);
    setMeta('meta[property="og:description"]', "property", "og:description", page.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:type"]', "property", "og:type", page.type ?? "website");
    if (page.image) setMeta('meta[property="og:image"]', "property", "og:image", page.image);
    else document.head.querySelector('meta[property="og:image"]')?.remove();

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    let schema = document.head.querySelector<HTMLScriptElement>('script[data-seo-schema="page"]');
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.seoSchema = "page";
      document.head.appendChild(schema);
    }
    schema.text = JSON.stringify(page.structuredData);
  }, [page]);

  return null;
}
