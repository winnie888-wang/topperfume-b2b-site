import type { IncomingMessage } from "node:http";

type VercelRewrittenRequest = Pick<IncomingMessage, "url">;

/**
 * Restores a source path captured by vercel.json before Express/tRPC handles it.
 * This lets one serverless function safely receive /api/* and /manus-storage/*.
 */
export function restoreVercelRequestPath(request: VercelRewrittenRequest): void {
  const incomingUrl = request.url ?? "/";
  const url = new URL(incomingUrl, "http://localhost");
  const sourcePath = url.searchParams.get("__path");

  if (!sourcePath || !sourcePath.startsWith("/")) return;

  url.searchParams.delete("__path");
  const search = url.searchParams.toString();
  request.url = `${sourcePath}${search ? `?${search}` : ""}`;
}
