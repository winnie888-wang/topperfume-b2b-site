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
  visibleNotes?: string;
  remainingNotes?: string;
  edition?: string;
  releaseYear?: string;
  productType?: string;
  primaryBenefit?: string;
  moisturePositioning?: string;
  keyIngredients?: string;
  texture?: string;
  skinType?: string;
  fragrance?: string;
  spf?: string;
  standardMoq?: string;
  leadTime?: string;
  sampleAvailability?: string;
};

const realVisual = {
  diorSauvage: "/manus-storage/product-01-dior-sauvage-bottle-box_51b02500.png",
  goodGirlBlushTweedTalk: "/manus-storage/product-02-good-girl-blush-tweed-talk_1ae0d387.png",
  veryGoodGirlGlam: "/manus-storage/product-03-very-good-girl-glam-bottle-box_9405022e.png",
  monParis: "/manus-storage/product-04-mon-paris-bottle_3357056d.png",
  medixVitaminCLotion: "/manus-storage/product-05-medix-vitamin-c-body-lotion_9c412e12.png",
  medixRetinolLotion: "/manus-storage/product-06-medix-retinol-body-lotion_82595db9.png",
  olayDarkSpotLotion: "/manus-storage/product-07-olay-dark-spot-body-lotion_8520dc7b.png",
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
  { slug: "carolina-herrera-very-good-girl-glam-edp-women", name: "Carolina Herrera Very Good Girl Glam Eau de Parfum for Women", category: "fragrance", format: "80 ml / 2.7 fl oz", descriptor: "Cherry · Citrus · Woody", image: realVisual.veryGoodGirlGlam, realImage: true, tags: ["Women’s Perfume", "Eau de Parfum", "Private Label"], briefing: "A glamorous statement fragrance with a sparkling cherry signature. Very Good Girl Glam Eau de Parfum combines a bright, feminine fragrance character with an expressive stiletto-inspired presentation. Bergamot and mandarin provide a fresh citrus opening, while a sparkling cherry character gives the fragrance a vibrant and distinctive identity. Its deep pink glitter bottle, black detailing and metallic gold heel create a strong luxury gifting and retail-display presence.", sku: "FR-CH-VGGG-080", b2bPrice: "US$20.00 / pc", concentration: "Eau de Parfum", gender: "Women", fragranceFamily: "Citrus · Aromatic · Woody", visibleNotes: "Bergamot · Mandarin · Sparkling Cherry character", remainingNotes: "[TO CONFIRM]", packaging: "Deep pink-to-burgundy translucent glitter stiletto bottle with a glossy black upper section, slim metallic gold heel and coordinated black, pink-glitter and gold-trimmed presentation box.", privateLabelAvailable: true, dataStatus: "confirmed" },
  { slug: "yves-saint-laurent-mon-paris-parfum-women", name: "Yves Saint Laurent Mon Paris Parfum for Women", category: "fragrance", format: "[TO CONFIRM]", descriptor: "Fruity · Floral · Musk", image: realVisual.monParis, realImage: true, tags: ["Women’s Perfume", "Parfum", "Private Label"], notes: { top: "Pear · Strawberry · Calabrian Bergamot · Raspberry", heart: "Peony · Orange Blossom · Datura · Chinese Jasmine · Sambac Jasmine", base: "Ambrox · Crystal White Musk · Indonesian Patchouli · Guatemala Patchouli" }, briefing: "A romantic fruity-floral fragrance with a rich, modern finish. Mon Paris opens with juicy pear, strawberry, raspberry and Calabrian bergamot before developing into an elegant floral heart of peony, orange blossom, datura and jasmine. Ambrox, white musk and patchouli create a warm, lasting base that adds depth to the fragrance. Its faceted pink bottle and signature black bow give the product a sophisticated, feminine presentation suitable for gifting, fragrance retail and premium beauty collections.", sku: "FR-YSL-MP-001", b2bPrice: "US$20.00 / pc", concentration: "Parfum", gender: "Women", fragranceFamily: "Sweet · Fruity · Floral", releaseYear: "2016", packaging: "Faceted clear glass bottle with soft pink fragrance liquid, black decorative neck bow, metallic silver spray hardware and gold-tone emblem detail.", privateLabelAvailable: true, dataStatus: "confirmed" },
  { slug: "vitamin-c-niacinamide-brightening-body-lotion", name: "Vitamin C + Niacinamide Brightening Body Lotion", category: "skincare", format: "444 ml / 15 fl oz", descriptor: "Vitamin C · Niacinamide · Turmeric", image: realVisual.medixVitaminCLotion, realImage: true, tags: ["Body Care", "Brightening Body Lotion", "Pump Bottle"], briefing: "Brightening body care for smoother, softer and more even-looking skin. This Vitamin C + Niacinamide Body Lotion combines brightening and moisturizing body-care ingredients including Vitamin C, Niacinamide and Turmeric. The formula is positioned for daily body care, helping improve the appearance of dullness, uneven-looking skin tone and visible dark spots while supporting softer and smoother-looking skin. The large 444 ml pump format makes it suitable for regular body-care routines and retail body-lotion collections.", sku: "SK-BL-VC-444", b2bPrice: "US$3.99 / pc", gender: "Women & Men / Unisex", productType: "Brightening Body Lotion / Body Moisturizer", keyIngredients: "Vitamin C · Niacinamide · Turmeric", texture: "[TO CONFIRM]", skinType: "[TO CONFIRM]", fragrance: "[TO CONFIRM]", spf: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Rectangular amber-orange pump bottle with white pump dispenser and modern minimal body-care packaging.", dataStatus: "confirmed" },
  { slug: "retinol-ferulic-acid-firming-body-lotion", name: "Retinol + Ferulic Acid Firming Body Lotion", category: "skincare", format: "444 ml / 15 fl oz", descriptor: "Retinol · Ferulic Acid · Firming Care", image: realVisual.medixRetinolLotion, realImage: true, tags: ["Body Care", "Firming Body Lotion", "Pump Bottle"], briefing: "Retinol-powered body care for smoother, firmer-looking skin. This Retinol + Ferulic Acid Body Lotion is designed for moisturizing and firming body-care routines. The formula is positioned to help improve the appearance of crepey-looking skin, visible fine lines and uneven texture while supporting softer and smoother-looking skin. The generous 444 ml pump format makes it suitable for regular use and body-care retail collections.", sku: "SK-BL-RET-444", b2bPrice: "[TO CONFIRM]", gender: "Women / Unisex Body Care", productType: "Firming Body Lotion / Retinol Body Cream", primaryBenefit: "Firming · Smoothing · Moisturizing", keyIngredients: "Retinol · Ferulic Acid", texture: "[TO CONFIRM]", skinType: "[TO CONFIRM]", fragrance: "[TO CONFIRM]", standardMoq: "[TO CONFIRM]", leadTime: "Approx. 7 days", packaging: "Modern rectangular deep-pink pump bottle with white pump dispenser and minimalist body-care presentation.", dataStatus: "confirmed" },
  { slug: "olay-dark-spot-correcting-body-lotion", name: "Olay Dark Spot Correcting Body Lotion", category: "skincare", format: "502 ml / 17 fl oz", descriptor: "AHA · Vitamin C · Niacinamide", image: realVisual.olayDarkSpotLotion, realImage: true, tags: ["Body Care", "Tone-Enhancing Body Lotion", "Pump Bottle"], briefing: "Brightening body care for smoother, hydrated and more even-looking skin. This tone-enhancing body lotion combines AHA, Vitamin C and Niacinamide / Vitamin B3 Complex in a daily moisturizing body-care format. It is positioned to help improve the appearance of dark spots, discoloration and uneven-looking skin tone while providing lasting hydration. The fast-absorbing formula and generous 502 ml pump format make it suitable for daily body-care routines and high-volume retail body-lotion collections.", sku: "SK-BL-OLAY-AHA-502", b2bPrice: "US$2.99 / pc", gender: "Women / General body-care use", productType: "Brightening / Tone-Enhancing Body Lotion", primaryBenefit: "Brightening · Hydrating · Tone Care", moisturePositioning: "24-hour hydration", keyIngredients: "AHA · Vitamin C · Niacinamide / Vitamin B3", texture: "Fast-absorbing body lotion", skinType: "All Skin Types", fragrance: "[TO CONFIRM]", standardMoq: "[TO CONFIRM]", leadTime: "Approx. 7 days", packaging: "Tall premium pump bottle with a warm gold/orange upper section, white lower body and gold-tone pump detail.", dataStatus: "confirmed" },
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
