import { put } from "@vercel/blob";
import { approvedPublicAssetKeys, getApprovedPublicSourceUrl } from "./previewAssetManifest.mjs";

const isVercelPreview = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "preview";

if (!isVercelPreview) {
  console.info("Preview asset migration skipped outside Vercel Preview.");
  process.exit(0);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error("Preview asset migration requires the configured server-side Blob credential.");
}

const uploads = await Promise.all(
  approvedPublicAssetKeys.map(async (key) => {
    const source = await fetch(getApprovedPublicSourceUrl(key));
    if (!source.ok || !source.body) {
      throw new Error(`Could not retrieve approved public asset: ${key} (${source.status})`);
    }

    const blob = await put(`topperfume-b2b-v2/${key}`, source.body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 31_536_000,
      contentType: source.headers.get("content-type") || undefined,
    });

    return { key, url: blob.url, size: Number(source.headers.get("content-length") || 0) };
  })
);

console.info(`Preview asset migration completed: ${uploads.length} approved public assets.`);
for (const upload of uploads) {
  console.info(`BLOB_ASSET ${JSON.stringify(upload)}`);
}
