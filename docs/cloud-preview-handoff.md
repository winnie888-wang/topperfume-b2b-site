# Cloud Preview handoff — 2026-09-11

## Latest status — owner confirmed receipt (2026-09-12)

- Email delivery verification: PASS. One authorized test was sent at 2026-09-12 14:52:34 Asia/Shanghai; Resend recorded Delivered, and the owner subsequently confirmed actual receipt. Do not send again or repeat completed verification.
- Evidence: `mail-delivery-verification.json`. Remaining release work and ownership: `release-readiness-2026-09-12.md`.
- Existing Vercel runtime credentials matched the melody888666 workspace's existing sending key and sender inquiry@mail.topperfume.cn. Recipient and Reply-to were melody888666@yeah.net. No key was replaced or disclosed.
- GitHub branch synchronization is complete: local and remote feat/website-optimization-body-lotion matched a3921bad340b72ec2d6b439d5af9ecb4f6de182b. Main remained bab3a9eb6fa99e0cdb3371ba54ca84ae858a76fc.
- All three temporary mail-test deployments were deleted and the temporary CLI-created automation access credential was revoked. The existing website Preview stays Ready, noindex and email-disabled; Production is unchanged.
- Follow-up: complete browser form flow PASSED with a local mock receiver (form-flow-validation.json). Real mail was not repeated. Actual mailbox reply handling and analytics account verification remain untested. See acceptance-2026-09-12.md for current release gates.
- This documentation update does not deploy or change the website. The older cloud acceptance/form pages and historical sections below predate this result; their old mail/GitHub outstanding items are superseded by this section.

## Historical follow-up: confirmed contacts and order terms (2026-09-12, before mail test)

- Final Preview: https://topperfume-b2b-site-78m25b2ya-winnie9.vercel.app/ (Vercel account with project access required).
- Updated form: https://topperfume-b2b-site-78m25b2ya-winnie9.vercel.app/previews/business-information-form.html
- Deployment `dpl_8pRU7fjbBUDmSD9ooSosWvdYtR9Z` is Ready / Preview; source `8f98de24a004bb4567a6326ac297164c7c6a5749`. Cloud build passed. Explicit noindex and email-off runtime settings retained, confirmed recipient pinned to melody888666@yeah.net.
- Final authenticated cloud Contact check: correct email/WhatsApp, dispatch and written terms, decoded wholesale-quote draft, noindex,nofollow, no horizontal overflow at 373 px. Generic Contact actions use quote intent, not customization. Type checking and five WhatsApp tests were rerun after that small correction and passed.
- Final project API check: Production remains `dpl_7KZmhScqdBDfLezr43kqLCHjdvjk`, production branch main, Preview authentication protection unchanged. No real mail/WhatsApp inquiry sent; no merge or production deployment.
- Public contacts stay WhatsApp +86 190 6678 2710 and melody888666@yeah.net. They are confirmed and no longer requested in the remaining-information form.
- Estimated dispatch is usually around 7 days, with the start date and arrangements agreed per order; this is neither a delivery estimate nor an unconditional guarantee. Payment, freight, taxes, returns and other transaction conditions are agreed per order in writing. An inquiry does not create an order.
- Contact page, product terms, inquiry drafts, footer link and corresponding SEO now use this guidance. Product prices, MOQ, capacities and separate fragrance records are unchanged in this follow-up.
- TypeScript passed; 21 affected tests passed in four suites; production-mode build passed (existing chunk-size warning only). Prior product, image and responsive checks are retained rather than repeated.
- Vercel has existing protected RESEND_API_KEY and INQUIRY_FROM_EMAIL values for Preview and Production. Their presence is verified, their validity and domain status are not. Official Preview environment pull returned protected placeholders; the temporary file was deleted. The Resend browser session requires login. Public email visibility is not delivery verification.
- GitHub connector write still returns 403 Resource not accessible by integration. Official Git Credential Manager device authentication was opened but GitHub requires account login. No authenticated push occurred. Source remains on the optimization branch; Preview can be uploaded through the already authorized Vercel CLI.
- Real mail remains disabled and untested. After explicit authorization, plan one clearly marked TEST to the confirmed sales mailbox, then verify provider status, inbox/spam and reply handling. Configure credentials only in the relevant platforms.

## Previous Preview: business answers applied

- Current Preview: https://topperfume-b2b-site-k15nzgohh-winnie9.vercel.app/
- Current review and materials: https://topperfume-b2b-site-k15nzgohh-winnie9.vercel.app/previews/final-acceptance.html
- Current remaining-information form: https://topperfume-b2b-site-k15nzgohh-winnie9.vercel.app/previews/business-information-form.html
- Deployment `dpl_6RLt8cbzsngvP4Xz1DzSt6cvp87n`, Preview / Ready, source commit `9384d3f` on the same optimization branch.
- Applied 27 nonempty answers and the explicit follow-up corrections: 20 existing product pages updated, 10 individually repriced, 12 capacity gaps resolved. No new or merged product pages.
- GlutaGlow now offers only 725 mL, USD 3, MOQ 6. Original 400/600 mL options survive only in history; existing page URLs stay stable, and retired variant requests are rejected.
- Five series/fragrance mappings remain unresolved. Eight capacity-material groups require replacement photos. Blank business answers do not override existing information.
- See `business-answer-validation.json` for type checking, 31 passing affected tests, builds, SEO, cloud inquiry-draft and narrow-screen checks. Noindex, email-off and existing login protection remain enabled. Production remains `dpl_7KZmhScqdBDfLezr43kqLCHjdvjk` on main.

## Earlier Preview (retained for history)

- Preview: https://topperfume-b2b-site-68rtb8ls1-winnie9.vercel.app/
- Business form: https://topperfume-b2b-site-68rtb8ls1-winnie9.vercel.app/previews/business-information-form.html
- Dashboard: https://vercel.com/winnie9/topperfume-b2b-site/F8yx4hRMAa2oDxvpWgjf31x4oqCU
- Existing project: `winnie9/topperfume-b2b-site`, `prj_4bTtZO7MSea1AHlXqvtYApYr5qBE`.
- Deployment: `dpl_F8yx4hRMAa2oDxvpWgjf31x4oqCU`, Preview, Ready.
- Local branch: `feat/website-optimization-body-lotion`.
- Source commit recorded by Vercel: `d2f3f95af6effb48e01fa2260f7535aa8e2cca5d`.
- Uploaded the local branch through the official Vercel CLI. Native Git push lacked credentials; the GitHub connector's blob write returned 403 Resource not accessible by integration. No remote branch was pushed and no merge to main occurred.

## Access

The existing project has Vercel Authentication (`ssoProtection.deploymentType=all_except_custom_domains`). Keep this protection unchanged. On a phone, sign in to a Vercel account with access to this project, then open the Preview and business-form links. No password protection or trusted-IP rule is configured.

Authenticated browser access to the homepage, 502 mL product detail and business form succeeded. An anonymous direct curl check timed out from this machine's network; login requirements were verified through the Vercel project API, not inferred from that timeout.

## Verification

- Vercel cloud build completed successfully and the official CLI reported Preview / Ready.
- Cloud homepage and product detail both show `noindex,nofollow` metadata. Preview build explicitly used `SITE_INDEXABLE=false`; the generator also prevents indexing whenever `VERCEL_ENV=preview`.
- Cloud homepage loaded no Google Tag Manager script; no horizontal overflow at the observed 1280 px viewport.
- 502 mL detail: US$2.99/bottle, MOQ 2 bottles, initial product subtotal US$5.98, shipping and taxes to be confirmed.
- Business form: 65 rows, 12 capacity items, 5 possible-match groups; noindex; embedded images loaded. Local category filtering returned precisely the five match rows.
- Real email sending remains disabled: deployment runtime `INQUIRY_ENABLED=false`, plus server guard rejecting email delivery whenever `VERCEL_ENV=preview`. No real inquiry or email was sent. Real delivery remains unverified.
- `.vercelignore` excludes local intake/temp files, credentials, dependencies and build outputs. Dry run confirmed 402 source files and no excluded sensitive/temporary directories.
- Existing valid responsive, product and inquiry tests are retained; no new page optimization or full-site scan was performed.

## Production unchanged

Verified through the existing project's API after Preview deployment:

- Production branch: `main`.
- Production deployment: `dpl_7KZmhScqdBDfLezr43kqLCHjdvjk`.
- Production URL: `topperfume-b2b-site-aw643r50a-winnie9.vercel.app`.
- Original production source: `bab3a9eb6fa99e0cdb3371ba54ca84ae858a76fc`.

Business answers stay in the current browser; export JSON or TXT before sharing. No passwords, API keys or account tokens belong in the form or chat. Product capacity/identity gaps, contact receipt confirmation, policies, actual email setup and analytics account checks remain in the form. Formal release and GitHub branch synchronization require follow-up; this delivery authorizes neither Production deployment nor merging.
