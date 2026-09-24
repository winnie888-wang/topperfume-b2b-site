# TP-SEO-006 Final Publication Package

Current status (2026-09-25): user approved the final Preview and authorized publication of TP-SEO-006 only. Body V1.1 LOCKED; Standalone value: CONFIRMED. Publication date set to 2026-09-25 (Asia/Shanghai) for this authorized release; actual deployment completion must be checked against it. The sections below retain the 2026-09-24 Preview preparation evidence; pending-date/noindex statements describe that Preview, not the dated Production build. Deployment and live QA results are recorded separately after completion.

## A. Final URL

`https://topperfume.cn/buyer-guides/verify-perfume-supplier-before-first-order`

Slug: `verify-perfume-supplier-before-first-order`. No existing article, route or slug conflict found. This is the intended formal URL, not a claim that the article is live.

## B. SEO Title

Perfume Supplier Verification Checklist | TopPerfume

52 characters.

## C. Meta Description

Match supplier identity, product details, quotation scope and payment records before your first wholesale perfume order or private-label project.

145 characters.

## D. Final H1 and excerpt

H1: How to Verify a Perfume Supplier Before Your First Order

Excerpt: Match company, product, quotation and payment records before your first perfume order. Use practical checklists and follow-up questions to resolve missing or conflicting terms.

Reviewed body: [V1.1 archive](TP-SEO-006_BODY_V1.1.md). Runtime source: [publication Markdown](../content/buyer-guides/TP-SEO-006.md). Only the response version label and final editorial standalone-status line are excluded from the article; all article text, headings, tables, checklist, FAQ and links are retained. Markdown H1 is rendered once by the existing page template.

Publication Markdown SHA-256 (LF): `b5b527ff099d4e2cf32d5d8351afc15d27cf7b6c93ec3cc5c00aac9b6f8be5e6`.

## E. Internal / external links and CTA

| Context | Destination |
|---|---|
| Product references | `/collections/fragrance` |
| TP-SEO-001: project preparation | `/buyer-guides/custom-logo-perfume-buying-guide` |
| Service context | `/low-moq-perfume-manufacturer` |
| TP-SEO-005: component quantities | `/buyer-guides/perfume-packaging-moq-order-quantities` |
| TP-SEO-002: broader first-order planning | `/buyer-guides/first-wholesale-perfume-order` |
| TP-SEO-003: sample evaluation | `/buyer-guides/compare-perfume-samples-wholesale` |
| Closing body CTA | `/contact#order-terms` |

All seven approved body links retain their `https://topperfume.cn` destination. Local route equivalents returned HTTP 200; the Contact fragment exists. Absolute body links therefore lead to the formal domain when clicked in Preview; this is intentional preservation of the approved body, not evidence of remote network reachability.

External citation: [FBI — Business Email Compromise](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise). Official reference successfully read during package preparation. One ordinary HTTPS editorial link, same-tab navigation, no embedded scripts or trackers, no affiliate/sponsored label. It supports reconfirming changed payment instructions; it is not an endorsement, supplier certification or payment guarantee for TopPerfume.

CTA: **Send Your Product & Quote Details for Review**. Body link stays at Contact order terms. The existing page-level inquiry button uses quote intent, article canonical context and the existing form. The form supports quantity, country, customization requirement and notes for SKU, quotation questions and destination detail. Existing WhatsApp CTA retains the article URL and paid-sample policy. Desktop/mobile form opening verified; no form submission, email or WhatsApp message was sent.

## F. Schema / metadata / dates

- Existing `Article` JSON-LD: headline, description, `inLanguage: en`, formal URL, `mainEntityOfPage`, `@id` ending `#article`, TopPerfume Organization author and publisher.
- Canonical is the exact formal URL in A, without query or trailing slash.
- Open Graph uses the existing mechanism: title, description, formal URL and `og:type=article`. No new social image is supplied and no unrelated image is invented; no new Twitter-card mechanism.
- `publishedDate: null` in Preview; visible **Publication pending**. No fabricated `datePublished` or `dateModified` in JSON-LD.
- After explicit publication approval, set the actual first Production deployment date in `YYYY-MM-DD` and regenerate. At first publication, visible date, `datePublished` and `dateModified` share that date. The existing Production build guard rejects the unset date.
- No Product/Offer/review/certification schema is introduced; FAQ stays visible content, without extra schema claims.
- Identity remains **trading and sourcing partner**. MOQ 100/100/100/300, paid samples, buyer-paid shipping and conditional in-stock dispatch wording remain exactly as approved. No new facts or SKU eligibility claims.

## G. Buyer Guides / Sitemap integration

006 is appended once to the existing article data and rendered by `/buyer-guides`. Excerpt is used in its list card. Related cards on 006 point to 001, 002, 003 and 005. Old five article records, including their bodies, dates, metadata and related links, are unchanged against HEAD; no reciprocal edits were made to them.

Prepared sitemap: **52 unique URLs**, 006 appears exactly once. The existing sitemap generator uses the same article source as routes/list/schema. This is a local prepared artifact, not a submitted or deployed Production sitemap. Product publication scope remains 38 products. Preview robots: `User-agent: *` / `Disallow: /`; article robots and HTTP X-Robots-Tag: noindex, nofollow.

## H. Preview

[Final article Preview](http://127.0.0.1:4174/buyer-guides/verify-perfume-supplier-before-first-order/?review=tp006-final-v11)

[Buyer Guides Preview](http://127.0.0.1:4174/buyer-guides/)

Fresh build served locally from `dist/public`, with `Cache-Control: no-store`, no ETag/Last-Modified cache, noindex header and `/api` blocked with HTTP 403. Static-only Preview cannot send inquiries. Build uses `VERCEL_ENV=preview`, `SITE_INDEXABLE=false`, `INQUIRY_ENABLED=false`. The local preview address is a review endpoint, not a repository runtime dependency. No attachment or machine-specific filesystem dependency added.

## I. Final pre-publication QA

- TypeScript: PASS (`tsc --noEmit`).
- Offline regression: **84/84 PASS**, 18 test files; real Resend credentials test excluded. No real outbound inquiries.
- Preview build: PASS. Existing warning remains: main JS chunk exceeds 500 kB (about 693 kB minified, 197 kB gzip); no scope-expanding performance refactor.
- Content fidelity: all paragraphs/list items/tables compared to Markdown; locked source hash asserted; 7 tables, 13 checklist items, single H1, 7 internal links and one FBI citation retained.
- Existing five records deep-equal to HEAD. Product/GA4/consent/inquiry business rules unchanged; original body-lotion rule still passes.
- Article HTTP 200, title/meta/H1/canonical/noindex/pending date checked in fresh served build; sitemap and robots checked. All seven local link targets HTTP 200 and Contact anchor exists.
- Desktop 1280 × 900 and mobile 390 × 844 inspected. No page-level horizontal overflow; mobile tables scroll inside their containers. Inquiry drawer opens at both sizes. No real sending/payment/WhatsApp action performed.
- Test maintenance: route total 51→52; guide count 5→6; inline strong/em markup removed only for text-equivalence comparison. For this exact article route, the approved negative seven-day sentence and paired mismatch question are explicitly required and excluded from the generic promise scanner; every other seven-day occurrence still fails unless it is the exact conditional stock-dispatch policy. Product rules were not relaxed.

Result: **PASS — local pre-publication QA; pending user final Preview approval and actual publication date.** This is not Production acceptance. No deployment or TP-SEO-007 work is authorized by this package.
