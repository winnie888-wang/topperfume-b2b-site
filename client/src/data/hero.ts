/**
 * Homepage Hero image interface.
 * When a higher-end fragrance product visual is supplied, replace only `src` and `alt` below.
 * Do not alter bottle shape, cap, label or proportions through this interface.
 */
import { publicAssetUrl } from "@/data/publicAssets";

export const homepageHeroVisual = {
  src: publicAssetUrl("topperfume-hero-niche-fragrance-campaign-v2_755605ca.png"),
  alt: "Single fragrance product visual on warm travertine in directional daylight",
} as const;
