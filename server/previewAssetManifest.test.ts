import { describe, expect, it } from "vitest";
import { approvedPublicAssetKeys, getApprovedPublicSourceUrl } from "../scripts/previewAssetManifest.mjs";

describe("approved Preview asset manifest", () => {
  it("contains exactly the 32 approved customer-facing image keys", () => {
    expect(approvedPublicAssetKeys).toHaveLength(32);
    expect(new Set(approvedPublicAssetKeys).size).toBe(32);
  });

  it("only produces public storage source URLs for approved image assets", () => {
    for (const key of approvedPublicAssetKeys) {
      expect(key).toMatch(/\.(png|jpg)$/);
      expect(getApprovedPublicSourceUrl(key)).toMatch(/\/manus-storage\//);
    }
  });
});
