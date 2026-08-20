# Final Commercial QA Report — TopPerfume V2 Prototype

**Scope:** `v2-prototype` only. This report verifies the current controlled prototype and does not represent a production release, a main-branch merge, or a claim of company certification or facility evidence.

## QA outcome

| Area | Result | Notes |
|---|---|---|
| Homepage, Desktop and Mobile | Pass | The approved Hero composition remains intact. Concept imagery is now disclosed directly on the Hero and capabilities visual. |
| Fragrance, Skincare and Makeup Collections | Pass | All three routes returned HTTP 200. Their visual plates were normalised with ivory mounts, small reference captions and restrained category edge treatment. |
| Product Detail, Desktop and Mobile | Pass | Product reference, decision module, Standard Order and Custom Order paths are visible and distinct. |
| Confirmed commercial data | Pass | Standard MOQ: **2 pcs**; Lead Time: **Approx. 7 days**; Free Samples: **Available**; Custom Logo, Packaging and Fragrance: **from 100 pcs**. |
| Request Sample, Get Quote and Start Your Project | Pass | Each prepares a structured request with product name, URL, category and buyer fields. |
| WhatsApp and Email | Pass | WhatsApp drafts use `+86 190 6678 2710`; email drafts use `melody888666@yeah.net`. Automated QA did not transmit a live message. |
| Links and routes | Pass | Homepage, three Collections and the inspected Product Detail route returned HTTP 200. |
| Public copy and status labels | Pass after correction | Removed customer-facing `Prototype` and unverified `Authorized` / `authorised` wording. |
| Certificates and evidence claims | Pass | No ISO, GMP, FDA, factory size, workforce, capacity, export-market or customer claim is present. |

## Remaining `[TO CONFIRM]` list

| Location | Information still requiring verified input |
|---|---|
| Product names | The 15 currently shown product references retain `[NAME TO CONFIRM]` annotations before final public naming approval. |
| Collection buyer-readiness matrices | Exact reference format, formula / fragrance / shade brief and packaging scope by category. |
| Product Detail — product expression | Exact size, product-specific fragrance / formula / shade, packaging components and private-label scope. |
| Product Detail — custom schedule | Custom-order lead time after the full brief is confirmed. |
| Certifications | `[CERTIFICATE TO CONFIRM]` remains the only certificate status. No certification claim is made. |

## Remaining concept visual list

| Location | Current label | Replacement requirement |
|---|---|---|
| Homepage Hero fragrance scene | `Illustrative / Concept Visual` | Real approved product campaign photograph, if one is supplied. |
| Homepage capabilities packaging study | `Illustrative / Concept Visual` | Real packaging-development photograph from Guiqi Technology Co., Ltd. |
| Buyer Trust — Packaging Development | `Illustrative / Concept Visual` | Real packaging-customisation photograph. |
| Buyer Trust — R&D Review | `Illustrative / Concept Visual` | Real R&D or QC photograph. |
| Buyer Trust — Production Context | `Illustrative / Concept Visual` | Real production photograph. |

## Pre-launch material required from the company

1. **Genuine certificate files** with the public certificate name, holder, scope, validity and permission to display them.
2. **Real factory, production, R&D/QC and packaging customisation photographs**, each with the permitted public caption.
3. **Final product data by SKU**, including approved public product name, size, formula / fragrance / shade, packaging, private-label scope and custom-order schedule.
4. **Manual outbound verification** on the intended devices: send one sample request to the confirmed email and one WhatsApp draft to verify the recipient workflow before publication.

## Known technical note

TypeScript validation and the production build pass. The production bundle reports a non-blocking client JavaScript chunk-size warning; this does not affect the current QA routes, but can be addressed with route-level code splitting before a later scale-up phase.

## Final visual verification

The Homepage was rechecked as a full page at **1440 × 1000** and **390 × 844** after the final disclosure update. The Hero, capabilities visual, Buyer Trust ledger, contact card, certificate placeholder and order summary remain legible; the `Illustrative / Concept Visual` labels are present without altering the approved Hero composition or mobile first-screen hierarchy.
