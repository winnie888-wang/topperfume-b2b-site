export type ProductCategory = "fragrance" | "skincare" | "makeup";

export type Product = {
  slug: string;
  name: string;
  nameStatus?: string;
  category: ProductCategory;
  format: string;
  descriptor: string;
  image: string;
  realImage?: boolean;
  tags: string[];
  notes?: { top: string; heart: string; base: string };
  briefing: string;
  sku?: string;
  b2bPrice?: string;
  concentration?: string;
  gender?: string;
  fragranceFamily?: string;
  packaging?: string;
  privateLabelAvailable?: boolean;
  dataStatus?: "confirmed" | "reference";
  keyNotes?: string;
  edition?: string;
};

const realVisual = {
  diorSauvage: "/manus-storage/product-01-dior-sauvage-bottle-box_51b02500.png",
  goodGirlBlushTweedTalk: "/manus-storage/product-02-good-girl-blush-tweed-talk_1ae0d387.png",
  fragranceRose: "/manus-storage/fragrance-jam-spill_f3448635.jpg",
  fragranceViolet: "/manus-storage/fragrance-my-soul_c875037f.jpg",
  fragranceAmber: "/manus-storage/fragrance-vanilla-amber_ac1dc3b6.jpg",
  fragranceBlue: "/manus-storage/fragrance-santal-berry_0dac099c.jpg",
  fragrancePink: "/manus-storage/fragrance-nectar-pulse_aa7ed316.jpg",
  fragranceRed: "/manus-storage/fragrance-ginger-apple_691d3ee3.jpg",
  skincareLotionLine: "/manus-storage/skincare-body-lotion-lineup_028ae330.webp",
  skincareMist: "/manus-storage/skincare-body-mist-lavender_ee715b54.webp",
  skincareProduction: "/manus-storage/skincare-body-lotion-production_5c58c423.webp",
  skincareDeodorant: "/manus-storage/skincare-deodorant-lineup_a0d584ec.jpg",
  skincareCream: "/manus-storage/skincare-body-cream-lineup_0a974df3.webp",
  makeupCompact: "/manus-storage/makeup-compact-highlight.webp_440c8c70.jpg",
  makeupLip: "/manus-storage/makeup-lip-color-collection_f464b653.jpg",
  makeupGift: "/manus-storage/makeup-gift-set_f7628bb6.jpg",
  makeupSet: "/manus-storage/makeup-fragrance-set_6f5f55e3.jpg",
};

const nameToConfirm = "[NAME TO CONFIRM]";

export const products: Product[] = [
  { slug: "dior-sauvage-parfum-spray-men", name: "Dior Sauvage Parfum Spray for Men", category: "fragrance", format: "100 ml / 3.4 oz", descriptor: "Earthy · Woody · Spicy", image: realVisual.diorSauvage, realImage: true, tags: ["Men’s Perfume", "Parfum", "Private Label"], notes: { top: "Bergamot", heart: "Pepper", base: "Amber Wood" }, briefing: "A bold woody fragrance with a fresh masculine signature. Sauvage combines bright bergamot freshness with pepper and warm amber wood, creating a powerful fragrance profile for customers who prefer fresh, woody and sophisticated scents.", sku: "FR-DI-SAU-100", b2bPrice: "US$20.00 / pc", concentration: "Parfum", gender: "Men", fragranceFamily: "Earthy & Woody", packaging: "Dark navy-to-black gradient glass bottle with black cylindrical cap and matching premium black gift box.", privateLabelAvailable: true, dataStatus: "confirmed" },
  { slug: "carolina-herrera-good-girl-blush-tweed-talk-edp-women", name: "Carolina Herrera Good Girl Blush Tweed Talk Eau de Parfum for Women", category: "fragrance", format: "80 ml / 2.7 oz", descriptor: "Oriental Floral", image: realVisual.goodGirlBlushTweedTalk, realImage: true, tags: ["Women’s Perfume", "Eau de Parfum", "Private Label"], briefing: "A fashion-led women’s fragrance with a statement presentation. Good Girl Blush Tweed Talk combines a feminine oriental-floral positioning with an expressive high-heel bottle and coordinated tweed-inspired packaging. Its distinctive presentation makes it particularly suitable for gifting, fragrance retail and visually driven beauty collections.", sku: "FR-CH-GGBT-080", b2bPrice: "US$20.00 / pc", concentration: "Eau de Parfum", gender: "Women", fragranceFamily: "Oriental Floral", keyNotes: "[TO CONFIRM]", edition: "2025", packaging: "Sculptural high-heel bottle with a black-and-white tweed pattern, glossy black upper section, soft pink belt accent and matching patterned presentation box with gold-tone edging.", privateLabelAvailable: true, dataStatus: "confirmed" },
  { slug: "amber-fragrance-mist", name: "Amber Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Warm · Amber", image: realVisual.fragranceAmber, realImage: true, tags: ["Fragrance Mist", "Giftable", "Product visual"], briefing: "Product image used as a reference for a warm packaging and fragrance-mist direction. Product name and final brief require confirmation." },
  { slug: "blue-fragrance-mist", name: "Blue Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Fresh · Musky", image: realVisual.fragranceBlue, realImage: true, tags: ["Fragrance Mist", "Fresh", "Product visual"], briefing: "Product image used as a reference for a cool-toned fragrance-mist format. Commercial details require confirmation." },
  { slug: "pink-fragrance-mist", name: "Pink Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Fruity · Floral", image: realVisual.fragrancePink, realImage: true, tags: ["Fragrance Mist", "Pink story", "Product visual"], briefing: "Product image used as a reference for a bright fruit-floral packaging direction. Product details require confirmation." },
  { slug: "red-fragrance-mist", name: "Red Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Floral · Modern", image: realVisual.fragranceRed, realImage: true, tags: ["Fragrance Mist", "Red story", "Product visual"], briefing: "Product image used as a reference for a high-contrast fragrance-mist visual direction. Product details require confirmation." },
  { slug: "body-lotion-lineup", name: "Body Lotion Line", nameStatus: nameToConfirm, category: "skincare", format: "Body lotion / pump bottle", descriptor: "Daily body care", image: realVisual.skincareLotionLine, realImage: true, tags: ["Body Care", "Private Label", "Product visual"], briefing: "Product image used as a reference for a body-lotion collection, pump component and colour-led body-care assortment. Product name and formula claims require confirmation." },
  { slug: "body-mist-lavender", name: "Body Mist", nameStatus: nameToConfirm, category: "skincare", format: "177 ml body mist", descriptor: "Fine fragrance body care", image: realVisual.skincareMist, realImage: true, tags: ["Body Care", "Mist", "Product visual"], briefing: "Product image used as a reference for a translucent body-mist format and cap component. Product name and formula details require confirmation." },
  { slug: "body-lotion-production", name: "Body Lotion Format", nameStatus: nameToConfirm, category: "skincare", format: "473 ml body lotion", descriptor: "Moisture body care", image: realVisual.skincareProduction, realImage: true, tags: ["Body Care", "Pump", "Product visual"], briefing: "Product image used as a reference for a pump-bottle body-lotion format and production-scale visual. Product name and claims require confirmation." },
  { slug: "deodorant-stick-line", name: "Deodorant Stick Line", nameStatus: nameToConfirm, category: "skincare", format: "75 g deodorant stick", descriptor: "Personal care", image: realVisual.skincareDeodorant, realImage: true, tags: ["Personal Care", "Stick", "Product visual"], briefing: "Product image used as a reference for a deodorant-stick assortment with multiple colour directions. Product name and specifications require confirmation." },
  { slug: "body-cream-line", name: "Body Cream Line", nameStatus: nameToConfirm, category: "skincare", format: "444 ml pump body cream", descriptor: "Targeted body care", image: realVisual.skincareCream, realImage: true, tags: ["Body Care", "Pump", "Product visual"], briefing: "Product image used as a reference for a colour-coded body-cream assortment. Product name, formula and claims require confirmation." },
  { slug: "compact-powder", name: "Compact Powder", nameStatus: nameToConfirm, category: "makeup", format: "Pressed powder compact", descriptor: "Face colour", image: realVisual.makeupCompact, realImage: true, tags: ["Complexion", "Compact", "Product visual"], briefing: "Product image used as a reference for a premium compact format, refill area and tactile pouch presentation. Product name and shade details require confirmation." },
  { slug: "lip-color-collection", name: "Lip Color Collection", nameStatus: nameToConfirm, category: "makeup", format: "Lipstick and lip product assortment", descriptor: "Colour makeup", image: realVisual.makeupLip, realImage: true, tags: ["Lip", "Collection", "Product visual"], briefing: "Product image used as a reference for a multi-format colour-makeup collection. Product name, shades and components require confirmation." },
  { slug: "beauty-gift-set", name: "Beauty Gift Set", nameStatus: nameToConfirm, category: "makeup", format: "Multi-product gift set", descriptor: "Giftable beauty", image: realVisual.makeupGift, realImage: true, tags: ["Gift Set", "Packaging", "Product visual"], briefing: "Product image used as a reference for a premium multi-product beauty gift set. Product name, assortment and packaging scope require confirmation." },
  { slug: "beauty-fragrance-set", name: "Beauty & Fragrance Set", nameStatus: nameToConfirm, category: "makeup", format: "Multi-product presentation set", descriptor: "Cross-category gifting", image: realVisual.makeupSet, realImage: true, tags: ["Gift Set", "Cross-category", "Product visual"], briefing: "Product image used as a reference for a cross-category beauty and fragrance set. Product name, assortment and commercial details require confirmation." },
];

export const categoryMeta: Record<ProductCategory, { eyebrow: string; title: string; intro: string; tone: string; materials: string }> = {
  fragrance: { eyebrow: "01 / Fragrance portfolio", title: "Private Label Fragrance", intro: "Browse fragrance-mist product references before requesting a sample or quote.", tone: "rose", materials: "Mist formats · fragrance scope [TO CONFIRM] · packaging" },
  skincare: { eyebrow: "02 / Skincare portfolio", title: "Private Label Skincare", intro: "Browse body-care and personal-care product references.", tone: "sage", materials: "Formula scope [TO CONFIRM] · components · packaging" },
  makeup: { eyebrow: "03 / Makeup portfolio", title: "Private Label Makeup", intro: "Browse colour-makeup and gift-set product references.", tone: "plum", materials: "Shade scope [TO CONFIRM] · components · packaging" },
};

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
