import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publicAssetUrl } from "../client/src/data/publicAssets";
import { products } from "../client/src/data/products";

const clientRoot = path.resolve(import.meta.dirname, "../client");

function getSourceFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return getSourceFiles(target);
    return /\.(ts|tsx|html)$/.test(entry.name) ? [target] : [];
  });
}

describe("public customer-facing asset URLs", () => {
  it("uses the connected Public Vercel Blob origin", () => {
    expect(publicAssetUrl("topperfume-mark_8166258c.png")).toBe(
      "https://mqy8jl9r1rvvbx0e.public.blob.vercel-storage.com/topperfume-b2b-v2/topperfume-mark_8166258c.png"
    );
  });

  it("has no customer-facing Manus storage proxy dependency", () => {
    const clientSource = getSourceFiles(clientRoot).map((file) => fs.readFileSync(file, "utf8")).join("\n");
    expect(clientSource).not.toContain("/manus-storage/");
  });

  it("retains the original Blob visuals and resolves repository-hosted product assets", () => {
    expect(products).toHaveLength(52);
    for (const product of products) {
      if (product.image.startsWith("/assets/")) {
        expect(fs.existsSync(path.join(clientRoot, "public", product.image))).toBe(true);
        expect(product.gallery?.length).toBeGreaterThan(0);
        for (const image of product.gallery ?? []) {
          for (const src of [image.src, image.thumbnail, image.fullSize ?? image.src, ...image.srcSet.split(", ").map(candidate => candidate.split(" ")[0])]) {
            expect(fs.existsSync(path.join(clientRoot, "public", src))).toBe(true);
          }
        }
      } else {
        expect(product.image).toMatch(/^https:\/\/mqy8jl9r1rvvbx0e\.public\.blob\.vercel-storage\.com\/topperfume-b2b-v2\//);
      }
    }
  });
});
