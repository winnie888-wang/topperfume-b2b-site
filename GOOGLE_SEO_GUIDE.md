# Google SEO Upgrade Notes for TopPerfume

This version adds SEO improvements for more crawlable Google traffic:

## What was added

- Unique title tags and meta descriptions for every main page.
- Canonical URLs for `https://topperfume.cn`.
- `robots.txt` with sitemap references.
- Full `sitemap.xml` including product, policy, support and SEO landing pages.
- `image-sitemap.xml` for product image discovery.
- JSON-LD structured data:
  - Organization
  - WebSite
  - WebPage
  - BreadcrumbList
  - Product structured data on every static product page
  - FAQPage structured data on FAQ page
  - Article structured data on resource pages
- 25 static product detail pages under `/products/` for cleaner Google crawling.
- SEO landing pages for high-intent keywords:
  - private label perfume manufacturer
  - private label skincare manufacturer
  - private label makeup manufacturer
  - beauty gift sets wholesale
  - custom beauty packaging
- Resource/blog pages for long-tail search traffic.
- Internal links from homepage, collections, products and footer.

## After deployment

1. Deploy this package to Vercel.
2. Confirm `https://topperfume.cn/sitemap.xml` opens correctly.
3. Add the domain to Google Search Console.
4. Submit `https://topperfume.cn/sitemap.xml`.
5. Test one product page with Google's Rich Results Test.
6. Add real photos, more product descriptions and blog articles over time.

## Important

Do not upload copied luxury-brand logos or brand names to public pages. Keep products as TopPerfume private-label concepts to reduce trademark and SEO quality risks.
