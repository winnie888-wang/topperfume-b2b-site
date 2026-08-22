const PUBLIC_BLOB_ASSET_BASE_URL = "https://mqy8jl9r1rvvbx0e.public.blob.vercel-storage.com/topperfume-b2b-v2";

export function publicAssetUrl(key: string) {
  return `${PUBLIC_BLOB_ASSET_BASE_URL}/${key}`;
}
