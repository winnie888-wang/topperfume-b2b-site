import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { latestListingProducts } from "../client/src/data/latestListing";
import { combinedListingProducts } from "../client/src/data/combinedListing";
import { getProduct, products } from "../client/src/data/products";
import { getProductSeo } from "../shared/seo";
import { prerenderBody } from "../scripts/prerender";

const readDoc = (file: string) => JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, "../docs", file), "utf8"));
const pending = readDoc("pending-listing-matches.json");
const allSourceIds = products.flatMap(p => p.intakeIds ?? []);

describe("Batch 04–05 identity and scoped quotes", () => {
  it("accounts for all 35 images and all 41 source records across five batches", () => {
    const manifest = readDoc("combined-listing-source-manifest.json");
    expect(manifest.archive).toBe("TopPerfume_Combined_Listing_Pack (2).zip");
    expect(manifest.images).toHaveLength(35);
    expect(["01", "02", "03", "04", "05"].map(batch => manifest.images.filter((i: any) => i.batch === batch).length)).toEqual([5, 11, 7, 5, 7]);
    expect(allSourceIds).toHaveLength(36);
    expect(pending).toHaveLength(5);
    expect(new Set([...allSourceIds, ...pending.map((p: any) => p.intakeId)]).size).toBe(41);
  });

  it("adds six distinct product/series pages with seven size records at USD 2.99 / MOQ 6", () => {
    expect(latestListingProducts).toHaveLength(6);
    expect(latestListingProducts.flatMap(p => p.intakeIds!)).toEqual(["B04-01-400", "B04-01-600", "B04-02", "B05-02", "B05-03", "B05-06", "B05-07"]);
    for (const product of latestListingProducts) {
      expect(product).toMatchObject({ unitPrice: 2.99, b2bPrice: "US$2.99 / piece", minimumOrderQuantity: 6, orderUnit: "piece" });
      const html = prerenderBody(`/products/${product.slug}`);
      expect(html).toContain("US$17.94");
      for (const field of ["sku", "ingredients", "fragrance", "notes", "spf", "leadTime", "sampleAvailability"]) expect(product).not.toHaveProperty(field);
    }
    expect(getProduct("cocoa-radiant-body-gel-oil")?.format).toBe("Capacity to be confirmed");
    expect(getProduct("calm-healing-body-lotion")?.format).toBe("Capacity to be confirmed");
  });

  it("keeps 400 / 600 mL selectable with accurate schema without overwriting 500 / 502 / 444 mL", () => {
    const product = getProduct("glutaglow-body-lotion-400ml-600ml")!;
    expect(product.variants?.map(v => v.format)).toEqual(["400 mL", "600 mL"]);
    const schema = getProductSeo(product).structuredData as Record<string, any>;
    expect(schema.variesBy).toBe("https://schema.org/size");
    expect(schema.hasVariant.map((v: any) => v.size)).toEqual(["400 mL", "600 mL"]);
    for (const variant of schema.hasVariant) expect(variant.offers).toMatchObject({ price: 2.99, eligibleQuantity: { minValue: 6 } });
    expect(getProduct("gluta-glow-body-lotion-500ml")?.minimumOrderQuantity).toBe(6);
    expect(getProduct("vitamin-c-body-lotion-502ml")?.minimumOrderQuantity).toBe(2);
    expect(getProduct("vitamin-c-niacinamide-brightening-body-lotion")?.format).toBe("444 ml / 15 fl oz");
  });

  it("does not create duplicate catalogue entries or reprice old variants for five unresolved matches", () => {
    expect(pending.map((p: any) => [p.intakeId, p.possibleExistingId])).toEqual([
      ["B04-03", "B02-01-05"], ["B04-04", "B02-01-03"], ["B05-01", "BC-01"], ["B05-04", "B02-01-01"], ["B05-05", "B02-01-02"],
    ]);
    for (const match of pending) {
      expect(allSourceIds).not.toContain(match.intakeId);
      expect(match).toMatchObject({ priceUSD: 2.99, moq: 6, status: "identity-unconfirmed" });
      for (const image of match.gallery) {
        expect(fs.existsSync(path.resolve(import.meta.dirname, "../client/public", `.${image.src}`))).toBe(true);
      }
    }
    expect(pending.find((p: any) => p.intakeId === "B04-04").gallery).toHaveLength(2);
    expect(getProduct("daily-niacinamide-body-lotion")?.minimumOrderQuantity).toBe(6);
    expect(getProduct("vaseline-body-care-series-200ml")?.variants?.map(v => v.unitPrice)).toEqual([3, 3, 3, 3, 3, 3]);
    expect(combinedListingProducts.filter(p => p.sourceBatch === "03").every(p => p.unitPrice === 5 && p.minimumOrderQuantity === 2)).toBe(true);
  });
});
