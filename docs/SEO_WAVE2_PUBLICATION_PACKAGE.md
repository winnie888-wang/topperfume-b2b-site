# SEO articles 3–4: publication package

Reviewed: 2026-09-24. Authorization: the user requested the established third and fourth articles, related product SEO, verification, commit and Vercel deployment. Existing architecture, business rules, GitHub/Vercel configuration and DNS remain unchanged. The verification origin is https://topperfume-b2b-site.vercel.app; canonical URLs remain https://topperfume.cn.

## Editorial review before drafting

The six-topic launch plan identifies article 3 as perfume sample comparison and article 4 as a first makeup collection. The following briefs retain those topics and deliverables. The old plan supplies editorial direction only, never current business commitments. Current product fields and the Business Facts Source of Truth restrictions were checked before drafting.

| Required brief field | TP-SEO-003 | TP-SEO-004 |
| --- | --- | --- |
| Primary keyword | perfume sample evaluation for wholesale | first private label makeup collection |
| Secondary keywords | compare perfume samples; wholesale perfume samples; perfume sample checklist | lip gloss or eyeshadow; makeup shade planning; private label makeup MOQ; makeup sample checklist |
| Search intent | Compare shortlisted products before committing to a wholesale order | Choose the first category and shade range, then distinguish wholesale from a separate custom project |
| Buyer | Fragrance retailer with a product shortlist and a sample budget | New beauty brand or retailer selecting its first lip or eye products |
| Funnel stage | Evaluation → specific sample inquiry → quotation | Category selection → sample evaluation → project eligibility inquiry |
| SERP observation | Supplier guides emphasize sampling, scent development and comparison conditions. Search snapshot below; no claimed volume or ranking data | Supplier landing pages emphasize product ranges and low MOQs. Search snapshot below; supplier-specific minimums are not transferable |
| Competitor gap to address | A blank, traceable observation record separating preference, wear observation, package condition and unresolved order questions | A product/shade allocation worksheet that does not confuse a finished-product minimum with a private-label minimum |
| Buyer questions | Which sample is this? What does it represent? How was it compared? What remains unverified? What is the sample and freight charge? | Which look and channel? Which shades? What is counted as a SKU? Can this exact product be customized? What information is missing? |
| Outline | Identify samples → separate evaluation criteria → consistent observations → packaging check → blank worksheet → shortlist decision → inquiry → FAQ | Customer and look → lip versus eye comparison → shade planning → packaging/customization → MOQ units → sample records → blank launch worksheet → inquiry → FAQ |
| Commercial destinations | Fragrance category, Khamrah and contact/order terms | Makeup category, Hydrating Mirror-Shine Lip Glaze, Mocha Chocolate 9-Shade Eyeshadow Palette, contact/order terms |
| CTA | Discuss a sample shortlist; sample intent; no automatic availability promise | Discuss a makeup project; project intent; exact eligibility to be confirmed |
| Internal links | Category, Khamrah, first wholesale order guide, contact | Category, the two named makeup references, contact |
| Unique value | Buyer-owned observations with no invented scores, longevity claims, free samples or sample-to-bulk equivalence | Blank assortment plan plus explicit finished-product/custom-project separation and unknown shade/weight/eligibility fields |

Search snapshot on 2026-09-24: [Xuelei sample comparison](https://www.xuelei.com/en/article/91), [Kartun sample evaluation](https://www.kartunperfume.com/article/how-to-request-evaluate-perfume-samples/), [Aurora private-label makeup](https://auroracos.com/private-label-makeup/), [Season Cosmetics turnkey scope](https://www.seasoncosmetics.com/About/Turn-key-Solution). These primary supplier pages were used to assess search intent, not as TopPerfume product evidence or sources of copied prose. The competitor gap is an editorial opportunity inferred from this limited snapshot, not a claim about the entire SERP.

Editorial review result: both briefs are ready for drafting within the user's explicit publication authorization. Each provides a different buyer decision and a practical blank worksheet. No keyword-volume, test-result or manufacturer claims are approved.

## Publication metadata

| Field | TP-SEO-003 | TP-SEO-004 |
| --- | --- | --- |
| SEO title | Compare Perfume Samples for Wholesale \| TopPerfume | Lip Gloss or Eyeshadow? First Makeup Range \| TopPerfume |
| Meta description | Compare perfume samples before a wholesale order. Record scent observations, spray and packaging checks, sample costs and questions in a practical buyer worksheet. | Plan your first makeup collection: compare lip gloss and eyeshadow, organize shades, check sample details and separate wholesale terms from custom project MOQs. |
| Slug | compare-perfume-samples-wholesale | first-makeup-collection-lip-gloss-eyeshadow |
| H1 | How to Compare Perfume Samples Before a Wholesale Order | Lip Gloss or Eyeshadow? Planning Your First Makeup Collection |
| Source | content/buyer-guides/TP-SEO-003.md | content/buyer-guides/TP-SEO-004.md |
| Publication date | 2026-09-24 | 2026-09-24 |
| Schema | Article; organization author/publisher; actual publication date; no invented review/rating/test results | Article; organization author/publisher; actual publication date; no product offer or eligibility inferred from editorial examples |

H2/H3 and complete English copy are maintained in the Markdown sources. Runtime HTML, metadata and SHA-256 source fingerprints are in `shared/buyer-guides.json`. Existing articles 1–2 retain their original dates and bodies. All four routes use the existing prerenderer and sitemap generator.

## Fact boundaries and product SEO scope

- Samples are charged; shipping is paid by the buyer. Availability, sample charge amounts, shipping quotes and approval requirements are confirmed for the request.
- No new article asserts any stock, fixed arrival/production time, fragrance wear duration, clinical performance, certification or supplier authorization.
- The two makeup references have current catalogue price US$2.99/pc and wholesale MOQ 12 pcs, but neither figure is needed in the articles. Capacity/weight, shade codes, mixed-shade rules, current stock and customization eligibility remain `NEED_USER_CONFIRMATION`. Perfume service minimums are not applied to these makeup SKUs.
- Khamrah remains the existing branded wholesale product; a catalogue reference is not permission to relabel it. Its current product price/capacity/MOQ are unchanged.
- Product-page changes are limited to relevant buyer-guide links on Khamrah and the two article-4 makeup references, plus concise wholesale titles/descriptions for those two makeup references. Their descriptions explicitly ask buyers to confirm paid sample availability and customization eligibility. Category links are filtered by topic; makeup receives its relevant guide. No Qahwa/Khadlaj or other product copy is rewritten.
- Product/Offer structured data remains based on existing product fields. No stock, aggregate rating, authenticity or customization property is added. The new Article schema is checked against visible titles and dates.

## Verification and release record

Pre-deployment checks completed on 2026-09-24:

- TypeScript: pass. Existing full Production build: pass. Offline regression: **81/81** across 18 files; the real Resend credential/send test remains excluded.
- Sitemap: **50** unique URLs (38 product routes remain unchanged; two new article routes). All built routes have one H1, canonical on `https://topperfume.cn`, Production indexing metadata and parseable JSON-LD. Robots retains the canonical sitemap and existing API/preview exclusions. No indexing count or Google acceptance is inferred.
- Article HTML, source fingerprints, dates, paragraphs, tables and internal link destinations checked. Articles 1–2 retain their bodies and publication dates. Product offers retain current source prices; no stock/authorization/customization claim was added.
- Browser: both new articles inspected at 1280px desktop and 390px mobile widths. No document overflow; mobile tables scroll inside their own region. Two categories and the three linked product references also pass width/link checks. Sample and project dialogs open with the correct intent; no form was submitted and no WhatsApp message was sent. Rejected consent leaves Google Analytics scripts unloaded.
- Final asset sizes: main JS 642,111 bytes / gzip 184,476; CSS 204,619 / gzip 34,771. New article HTML gzip is approximately 6.6 KB each. The pre-existing >500 KB main-chunk warning remains. No dependencies, images, architecture or bundler configuration were added/changed. These are local build and responsive checks, **not** field Core Web Vitals or a Lighthouse score.
- Vercel alias access from the command environment timed out; a diagnostic request preserving hostname/certificate validation at the previously observed Vercel edge reset. Remote browser navigation also timed out. Local browser QA used the same final built pages through a read-only server with no mail/API endpoints. This evidence does not establish a Production application failure.

Deploy only this publication package and its scoped source/test changes through the existing GitHub integration. Do not interpret a network timeout as a reason to change DNS. The final commit/deployment identifier and any remote verification limitation belong in the release receipt after Vercel returns a result.
