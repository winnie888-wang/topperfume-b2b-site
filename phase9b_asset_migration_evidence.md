# Phase 9B Asset Migration Evidence

- Final GitHub Preview source commit: `f44afb83aa458558a9e1f639e0a6163ffd2f142e` on `v2-prototype`.
- Final Vercel Preview deployment: `dpl_Cf3W3nwg4f9MgBucSaZrkWFCp4eF`.
- Final Vercel Preview URL: `https://topperfume-b2b-site-86hlamcu4-winnie9.vercel.app`.
- Public Blob origin: `https://mqy8jl9r1rvvbx0e.public.blob.vercel-storage.com/topperfume-b2b-v2`.
- Approved public website images uploaded: 32.
- HTTP `HEAD` check for all 32 Blob URLs: 32 returned `200`; 0 failed.
- Hero binary verification: the Public Blob object and the prior approved public source have identical SHA-256 `ea1357955599f98abebe5e34ad3c47369bf179d62c6da729fdbcc66cdffa6855`, are both `PNG image data, 1664 x 2080`, and are both `3,883,009` bytes.
- The Vercel Preview is protected by Vercel SSO. A connector HTTP fetch therefore returns `302` to Vercel SSO instead of the page body; this is deployment protection, not an application route failure.
