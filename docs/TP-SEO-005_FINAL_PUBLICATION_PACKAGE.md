# TP-SEO-005 Final Publication Package

Prepared: 2026-09-24. Status: **PRODUCTION PUBLICATION AUTHORIZED — release validation in progress**.

Final user approval authorizes TP-SEO-005 only. The release uses `2026-09-24` as its publication date, to be checked against actual Production completion. To honor the final instruction not to modify other Buyer Guides, all four existing article records (including their related IDs) remain exactly as previously published. TP-SEO-005 retains its approved outgoing links to 001/002/003. The Preview-stage reciprocal-list proposal below is superseded by this narrower release scope. Body V1.1 and its source hash are unchanged. Deployment receipt and remote QA will be recorded separately after completion.

The user approved English Body V1.1 and locked its content. This package integrates that body with the existing Buyer Guide system. It does not authorize or perform a Production deployment. TP-SEO-006 is out of scope.

## A. Final URL

Canonical / intended public URL:

https://topperfume.cn/buyer-guides/perfume-packaging-moq-order-quantities

Slug: `perfume-packaging-moq-order-quantities`.

This is the prepared publication URL, not a claim that the new page is already live. Canonical remains on topperfume.cn; no domain, DNS, Vercel or GitHub configuration changed.

## B. SEO Title

**Perfume Packaging MOQ: Plan Your First Order | TopPerfume**

57 characters. This title is shared by the HTML title and existing Open Graph title mechanism.

## C. Meta Description

Match perfume, logo, fragrance and packaging quantities before ordering. Review TopPerfume’s MOQ terms and use a practical quantity-planning checklist.

151 characters. This description is used consistently for HTML description, Open Graph description and Article description.

## D. H1 and locked body

**Perfume Packaging MOQ: Match Component Quantities to Your First Order**

Approved source: [English Body V1.1](TP-SEO-005_BODY_V1.1.md). Website source: [TP-SEO-005 Markdown](../content/buyer-guides/TP-SEO-005.md). Compiled HTML, metadata, source hash and related IDs: `shared/buyer-guides.json`.

Only non-article wrappers were removed: the italic draft/version line and the final, explicitly labelled editorial note about internal-link recommendations. The article H1, paragraphs, H2/H3, five tables, illustrative example, ten checklist items, FAQ and body CTA are unchanged. The template renders the source H1 once rather than repeating it inside the compiled body.

SHA-256, UTF-8 with LF normalization:

- Locked V1.1 review file: `301b690f4fbee3e316b3b9b62ede5c7b0bc0b4c5819c45686be8db03b139b440`
- Extracted publication Markdown: `e017341f1a918822f13bce62269766db2361a5321661054a0a31d06dac9d0ef4`

These different hashes reflect the documented wrapper removal, not a body rewrite. A regression test compares the extracted source directly with the locked V1.1 content and checks every paragraph, table cell and list item against HTML.

## E. Internal links and CTA

The six locked-body targets are unchanged:

| Context | Target |
|---|---|
| Custom logo scope | `/buyer-guides/custom-logo-perfume-buying-guide` |
| Finished wholesale products | `/collections/fragrance` |
| Current TopPerfume customization terms | `/low-moq-perfume-manufacturer` |
| Sample comparison | `/buyer-guides/compare-perfume-samples-wholesale` |
| First-order planning | `/buyer-guides/first-wholesale-perfume-order` |
| Quantity-plan CTA | `/contact` |

Body CTA remains **Send Your Quantity Plan for Review**. The existing consultation drawer now uses the same label for TP-SEO-005 with `project` intent, fragrance context and the canonical article URL. The existing WhatsApp CTA also uses project intent and this article context; no new tracking event or sending mechanism was added.

The buyer is asked for finished quantity, fragrance/version breakdown, packaging requirement and destination. No eligibility, combined-SKU MOQ, storage or turnaround promise was added. The form was opened during QA; it was not submitted and no WhatsApp message was sent.

Body links remain absolute canonical-domain links because the approved text is locked. Local QA checked their matching paths on the Preview origin; it did not rely on the currently unreliable carrier route to the custom domain.

## F. Schema / metadata / date handling

Article summary / excerpt, used on the Buyer Guides list:

> Plan your first perfume order by matching finished quantities to bottles, branding, fragrance and packaging, with an illustrative example and a practical checklist.

Category: `fragrance` / visible label `PERFUME PROCUREMENT`.

The existing Article mechanism emits:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://topperfume.cn/buyer-guides/perfume-packaging-moq-order-quantities#article",
  "headline": "Perfume Packaging MOQ: Match Component Quantities to Your First Order",
  "description": "Match perfume, logo, fragrance and packaging quantities before ordering. Review TopPerfume’s MOQ terms and use a practical quantity-planning checklist.",
  "inLanguage": "en",
  "url": "https://topperfume.cn/buyer-guides/perfume-packaging-moq-order-quantities",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://topperfume.cn/buyer-guides/perfume-packaging-moq-order-quantities"
  },
  "author": {
    "@type": "Organization",
    "name": "TopPerfume",
    "url": "https://topperfume.cn/contact"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TopPerfume",
    "url": "https://topperfume.cn/"
  }
}
```

No Product/Offer, review, rating, manufacturer, stock or new FAQ schema is inferred from the article. TopPerfume's business identity and Product Source of Truth are unchanged.

**Publication date:** the prepared record has `publishedDate: null`. Preview displays **Publication pending** without a misleading `<time>` value, and omits `datePublished` / `dateModified`. After final deployment authorization, set the actual first-publication date in `YYYY-MM-DD` before building the approved release; the visible byline and both Article dates will use that value. This is a metadata completion step, not permission to change V1.1. Do not use the draft date automatically or backdate publication. Existing article dates are unchanged.

The existing prerender build now rejects a Production build if any Buyer Guide lacks a valid publication date. Preview builds remain permitted. This prevents the prepared article from silently receiving a fabricated date; it does not deploy anything or change Vercel settings.

**Open Graph:** existing `og:title`, `og:description`, `og:url` and `og:type=article` are present in prerendered HTML and maintained after client navigation. Existing Buyer Guides do not have dedicated `og:image` or Twitter-card tags, so this package does not invent an image or add a new social subsystem. Social image presentation is therefore not guaranteed; this is a retained limitation, not missing body content.

## G. Sitemap / Buyer Guides integration

- Registry: five Buyer Guides, with TP-SEO-005 appended to the existing list.
- Buyer Guides `CollectionPage` / `ItemList`: generated from that same registry and includes the new canonical URL.
- Related articles: 005 points to 001, 002 and 003; those three related-article lists point back to 005. Their bodies, titles, descriptions, excerpts and publication dates are unchanged. 004 is unchanged.
- Sitemap: **51 unique canonical URLs** in the prepared build, compared with 50 before. The 38 public product routes and publication holds are unchanged.
- No new Blog, duplicate commercial page, TP-SEO-006 route or additional product optimization.
- Preview has `noindex,nofollow`, `X-Robots-Tag: noindex, nofollow` and `robots.txt: Disallow: /`. The prepared sitemap is inspectable locally, not submitted to Google. Existing Production robots generation remains unchanged.

## H. Preview route

[Open final article Preview](http://127.0.0.1:4173/buyer-guides/perfume-packaging-moq-order-quantities/?review=tp005-final-v11)

[Open Buyer Guides Preview](http://127.0.0.1:4173/buyer-guides/)

This is a local, read-only server bound to `127.0.0.1:4173`, serving the newly generated build. It is not a Vercel or Production deployment and is available while that local server is running. HTML and asset responses use `Cache-Control: no-store`; the explicit review query identifies this review session.

The Preview server has no sending backend and rejects `/api` with HTTP 403. No real inquiry or WhatsApp submission was used for QA. It can be recreated from the existing build workflow with `VERCEL_ENV=preview`, `SITE_INDEXABLE=false`, `INQUIRY_ENABLED=false`; serve `dist/public` through a read-only local server with the same noindex headers and API rejection.

## I. Final pre-publication QA result

**PASS for final Preview review. Production publication remains pending user approval and the actual publication date.**

| Check | Result |
|---|---|
| Locked V1.1 / extracted Markdown / compiled HTML | Pass; no body rewrite, five tables and ten checklist items retained |
| TypeScript | Pass: `tsc --noEmit` |
| Build | Pass: complete existing build workflow with Preview environment; no deployment |
| Offline regression | 83/83 passed across 18 files; real Resend credential/send test excluded |
| Page, index, sitemap, robots and six linked paths | All ten local GET checks returned HTTP 200 |
| H1 / title / description / canonical / JSON-LD | Pass; one H1, canonical custom-domain URL, parseable Article schema, no invented dates |
| Buyer Guides list / related articles | Pass in browser and tests; old bodies/metadata retained |
| Desktop 1280px | Page visually inspected; no document overflow |
| Mobile 390px | Page and CTA visually inspected; no document overflow; five tables use contained horizontal scrolling; quantity table keyboard scroll verified |
| CTA / inquiry | Project drawer opens; no submit; WhatsApp link has correct article/project context |
| Preview privacy/sending | No GA scripts loaded on local Preview; `/api` rejected with 403; no real sends |
| Business conditions | Private label/Logo/fragrance 100, packaging 300; paid samples and buyer freight unchanged; illustrative example remains labelled |
| Product/company scope | No product fields, company identity, supplier capabilities, storage or mixed-SKU rules changed |

Existing build warning: main JS exceeds 500 KB (663.25 KB / gzip 189.61 KB in this build). No architectural refactor was undertaken. This QA does not claim a Lighthouse score, field Core Web Vitals, Google indexing, rich-result eligibility or social-network rendering.

The first regression run found one remaining old sitemap count assertion; it was updated for this explicitly added article, without weakening business-fact assertions. Content preservation, pending/actual publication dates and inquiry intent have dedicated checks. Build-generated `api/index.js` has no content diff.

### Scoped files

- `content/buyer-guides/TP-SEO-005.md`: extracted, locked publication source.
- `shared/buyer-guides.json`: article HTML/metadata and reciprocal related IDs.
- `shared/buyerGuides.ts`: project CTA and pending-date handling/validation.
- `client/src/pages/BuyerGuide.tsx`: render pending date without a false timestamp.
- `scripts/generate-seo-pages.mts`: validate dates before Production generation.
- `server/buyerGuides.test.ts`: preserve locked content and test publication integration/date behavior.
- `server/businessConsistency.test.ts`, `server/perfumeCommercial.test.ts`, `server/seo.test.ts`: explicit sitemap count updated to 51.
- This package and the entry in `docs/SEO_CHANGELOG.md` document the unpublished result.

Pre-existing working-tree changes are outside this package. No commit, push, deployment or new article work was performed. Await final publication review.
