export const SOURCE_ORIGIN = "https://3000-iqckto115tmtxd8ojbs9c-0d2fc275.us4.manus.computer";

export const approvedPublicAssetKeys = [
  "fragrance-jam-spill_f3448635.jpg",
  "fragrance-my-soul_c875037f.jpg",
  "fragrance-santal-berry_0dac099c.jpg",
  "fragrance-vanilla-amber_ac1dc3b6.jpg",
  "packaging-concept_345f706f.png",
  "product-01-dior-sauvage-bottle-box_51b02500.png",
  "product-02-good-girl-blush-tweed-talk_1ae0d387.png",
  "product-03-very-good-girl-glam-bottle-box_9405022e.png",
  "product-04-mon-paris-bottle_3357056d.png",
  "product-05-medix-vitamin-c-body-lotion_9c412e12.png",
  "product-06-medix-retinol-body-lotion_82595db9.png",
  "product-07-olay-dark-spot-body-lotion_8520dc7b.png",
  "product-08-jergens-ultra-healing-body-lotion_bd2450c3.png",
  "product-10-bare-vanilla-body-mist_bf37ea81.png",
  "product-11-vegan-hydrating-lip-oil-gloss_f92e8c52.png",
  "product-12-hydrating-mirror-shine-lip-glaze_d0866c8c.png",
  "product-13-mocha-chocolate-eyeshadow-palette_ca2216bd.png",
  "product-14-radiant-glow-lip-gloss_e7660ba0.png",
  "product-15-bracelet-lip-gloss-palette_84ef5aef.png",
  "product-16-vegan-pressed-powder-eyeshadow-palette_faef4ea4.png",
  "product-17-lightweight-hydrating-liquid-concealer_231c2117.png",
  "product-18-deluxe-brow-definition-set_d8c18541.png",
  "product-19-multi-use-complexion-palette_1a4ca030.png",
  "product-20-blush-duo-palette_8af7b46f.png",
  "product-21-creamy-contour-foundation-stick_5b359b7c.png",
  "product-22-face-contour-correcting-palette-saturated_62a460a7.png",
  "product-23-pure-seduction-mist-lotion-set_c74ce5a3.png",
  "production-concept_2a358be3.png",
  "rd-concept_3454ead1.png",
  "topperfume-hero-niche-fragrance-campaign-v2_755605ca.png",
  "topperfume-mark_8166258c.png",
  "topperfume-packaging-study_f7ac65c2.jpg",
];

export function getApprovedPublicSourceUrl(key) {
  return `${SOURCE_ORIGIN}/manus-storage/${key}`;
}
