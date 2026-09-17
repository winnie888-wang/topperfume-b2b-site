# TopPerfume SEO wave 1 — 2026-09-17

## Scope and source

Only TP-SEO-001 and TP-SEO-002 from the user-supplied `TopPerfume_SEO启动内容包_V1 (1).md` are published. The two complete English bodies, all five tables and original procurement links are preserved. Chinese review/implementation notes and the other four outlines are excluded. No MELODY files, product records, inquiry processing, mail credentials or consent settings are changed.

- `/buyer-guides/custom-logo-perfume-buying-guide`
- `/buyer-guides/first-wholesale-perfume-order`
- `/buyer-guides` provides the article list, linked from the shared footer. Fragrance and private-label pages also link to the guides.

Source Markdown is retained under `content/buyer-guides/`. The reviewed HTML, metadata and each source SHA-256 are in `shared/buyer-guides.json`. HTML is compiled from these trusted sources using the already installed Markdown renderer; no runtime Markdown dependency is added. When editing an article in future, update both source and generated HTML; the source-preservation tests detect divergence. All formal URLs use `https://topperfume.cn`.

## Checks completed before deployment

- TypeScript check passed after the final article navigation adjustment.
- Vite build, static SEO rendering, review exclusion, server and Vercel function bundling passed. The existing large-chunk warning is non-blocking.
- Seven targeted tests passed (`server/buyerGuides.test.ts`, `server/seo.test.ts`). They check exact article scope/source preservation, tables, links, canonical, Article schema, sitemap inclusion and the unchanged 38-product publication scope.
- Saved English source bodies match the attachment exactly (line-ending normalization only). Five distinct existing destination URLs returned HTTP 200; the order-terms anchor exists.
- Preview HTML has noindex, one H1 per page, unique title/description/canonical and full crawlable bodies. Articles contain two and three tables respectively.
- Browser: 375 px mobile and 1280 px desktop show no document overflow; mobile tables scroll inside their own container (keyboard horizontal movement observed). Article cross-link navigation returns to the beginning of the selected article. Existing quote/WhatsApp entry points are reused; no inquiry is submitted and no email is sent.
- Production build omits internal release-review pages. Existing Preview mail/indexing safeguards and Production consent rules are reused.

## Release and rollback baseline

Before this release, Vercel confirms Production READY at `72869ff8d52678d9f8b51429b2c47ae2987a7fa8`, deployment `dpl_5XYgh7F757yJgPcjuUxSEFvnXij7`, host `topperfume-b2b-site-e21u0jek2-winnie9.vercel.app`.

Release branch: `codex/seo-buyer-guides-wave-1`. Preview must be verified before promoting this work to Production. Use normal authorized Git operations and preserve branch protection; never force-push. No environment change or database migration is required.

Rollback: select the above existing READY Production deployment in Vercel and restore its Production aliases, then verify `topperfume.cn`. Revert the release commit/merge in Git through the normal repository workflow to align future builds. Do not reset or force-push. The existing product scope, mail configuration and consent settings remain the rollback baseline. No actual rollback drill has been performed.

## Search Console

Existing access to the `topperfume.cn` domain property is available. Before publishing, the sitemap report shows `https://topperfume.cn/sitemap.xml` successful, last read 2026-09-09, 27 discovered URLs; these are historical Google report figures, not the new sitemap count. Recheck the live sitemap after deployment and request URL indexing for each of the two articles once. A successful request does not establish actual indexing. Deployment receipts and the final response record the final commit, live checks and Google responses.
