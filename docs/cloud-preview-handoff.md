# Cloud Preview handoff — 2026-09-11

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
