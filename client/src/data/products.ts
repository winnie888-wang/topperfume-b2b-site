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
};

const realVisual = {
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
  { slug: "rose-fragrance-mist", name: "Rose Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Floral · Fruity", image: realVisual.fragranceRose, realImage: true, tags: ["Fragrance Mist", "Private Label", "Real visual"], briefing: "Authorized product image used to demonstrate a private-label fragrance-mist format. Product name, fragrance brief and commercial details require confirmation." },
  { slug: "violet-fragrance-mist", name: "Violet Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Floral · Warm", image: realVisual.fragranceViolet, realImage: true, tags: ["Fragrance Mist", "Private Label", "Real visual"], briefing: "Authorized product image used to demonstrate a colour-led fragrance-mist format. Product name and development parameters require confirmation." },
  { slug: "amber-fragrance-mist", name: "Amber Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Warm · Amber", image: realVisual.fragranceAmber, realImage: true, tags: ["Fragrance Mist", "Giftable", "Real visual"], briefing: "Authorized product image used to demonstrate a warm packaging and fragrance-mist direction. Product name and final brief require confirmation." },
  { slug: "blue-fragrance-mist", name: "Blue Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Fresh · Musky", image: realVisual.fragranceBlue, realImage: true, tags: ["Fragrance Mist", "Fresh", "Real visual"], briefing: "Authorized product image used to demonstrate a cool-toned fragrance-mist format. Commercial details require confirmation." },
  { slug: "pink-fragrance-mist", name: "Pink Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Fruity · Floral", image: realVisual.fragrancePink, realImage: true, tags: ["Fragrance Mist", "Pink story", "Real visual"], briefing: "Authorized product image used to demonstrate a bright fruit-floral packaging direction. Product details require confirmation." },
  { slug: "red-fragrance-mist", name: "Red Fragrance Mist", nameStatus: nameToConfirm, category: "fragrance", format: "250 ml fragrance mist", descriptor: "Floral · Modern", image: realVisual.fragranceRed, realImage: true, tags: ["Fragrance Mist", "Red story", "Real visual"], briefing: "Authorized product image used to demonstrate a high-contrast fragrance-mist visual direction. Product details require confirmation." },
  { slug: "body-lotion-lineup", name: "Body Lotion Line", nameStatus: nameToConfirm, category: "skincare", format: "Body lotion / pump bottle", descriptor: "Daily body care", image: realVisual.skincareLotionLine, realImage: true, tags: ["Body Care", "Private Label", "Real visual"], briefing: "Authorized product image used to demonstrate a body-lotion collection, pump component and colour-led body-care assortment. Product name and formula claims require confirmation." },
  { slug: "body-mist-lavender", name: "Body Mist", nameStatus: nameToConfirm, category: "skincare", format: "177 ml body mist", descriptor: "Fine fragrance body care", image: realVisual.skincareMist, realImage: true, tags: ["Body Care", "Mist", "Real visual"], briefing: "Authorized product image used to demonstrate a translucent body-mist format and cap component. Product name and formula details require confirmation." },
  { slug: "body-lotion-production", name: "Body Lotion Format", nameStatus: nameToConfirm, category: "skincare", format: "473 ml body lotion", descriptor: "Moisture body care", image: realVisual.skincareProduction, realImage: true, tags: ["Body Care", "Pump", "Real visual"], briefing: "Authorized product image used to demonstrate a pump-bottle body-lotion format and production-scale visual. Product name and claims require confirmation." },
  { slug: "deodorant-stick-line", name: "Deodorant Stick Line", nameStatus: nameToConfirm, category: "skincare", format: "75 g deodorant stick", descriptor: "Personal care", image: realVisual.skincareDeodorant, realImage: true, tags: ["Personal Care", "Stick", "Real visual"], briefing: "Authorized product image used to demonstrate a deodorant-stick assortment with multiple colour directions. Product name and specifications require confirmation." },
  { slug: "body-cream-line", name: "Body Cream Line", nameStatus: nameToConfirm, category: "skincare", format: "444 ml pump body cream", descriptor: "Targeted body care", image: realVisual.skincareCream, realImage: true, tags: ["Body Care", "Pump", "Real visual"], briefing: "Authorized product image used to demonstrate a colour-coded body-cream assortment. Product name, formula and claims require confirmation." },
  { slug: "compact-powder", name: "Compact Powder", nameStatus: nameToConfirm, category: "makeup", format: "Pressed powder compact", descriptor: "Face colour", image: realVisual.makeupCompact, realImage: true, tags: ["Complexion", "Compact", "Real visual"], briefing: "Authorized product image used to demonstrate a premium compact format, refill area and tactile pouch presentation. Product name and shade details require confirmation." },
  { slug: "lip-color-collection", name: "Lip Color Collection", nameStatus: nameToConfirm, category: "makeup", format: "Lipstick and lip product assortment", descriptor: "Colour makeup", image: realVisual.makeupLip, realImage: true, tags: ["Lip", "Collection", "Real visual"], briefing: "Authorized product image used to demonstrate a multi-format colour-makeup collection. Product name, shades and components require confirmation." },
  { slug: "beauty-gift-set", name: "Beauty Gift Set", nameStatus: nameToConfirm, category: "makeup", format: "Multi-product gift set", descriptor: "Giftable beauty", image: realVisual.makeupGift, realImage: true, tags: ["Gift Set", "Packaging", "Real visual"], briefing: "Authorized product image used to demonstrate a premium multi-product beauty gift set. Product name, assortment and packaging scope require confirmation." },
  { slug: "beauty-fragrance-set", name: "Beauty & Fragrance Set", nameStatus: nameToConfirm, category: "makeup", format: "Multi-product presentation set", descriptor: "Cross-category gifting", image: realVisual.makeupSet, realImage: true, tags: ["Gift Set", "Cross-category", "Real visual"], briefing: "Authorized product image used to demonstrate a cross-category beauty and fragrance set. Product name, assortment and commercial details require confirmation." },
];

export const categoryMeta: Record<ProductCategory, { eyebrow: string; title: string; intro: string; tone: string; materials: string }> = {
  fragrance: { eyebrow: "01 / Fragrance portfolio", title: "Private Label Fragrance", intro: "Browse fragrance-mist formats and authorised product visuals before requesting a sample or quote.", tone: "rose", materials: "Mist formats · fragrance scope [TO CONFIRM] · packaging" },
  skincare: { eyebrow: "02 / Skincare portfolio", title: "Private Label Skincare", intro: "Browse body-care and personal-care formats using authorised product visuals.", tone: "sage", materials: "Formula scope [TO CONFIRM] · components · packaging" },
  makeup: { eyebrow: "03 / Makeup portfolio", title: "Private Label Makeup", intro: "Browse colour-makeup and gift-set formats using authorised product visuals.", tone: "plum", materials: "Shade scope [TO CONFIRM] · components · packaging" },
};

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
