import type { Request, Response } from "express";
import { createApp } from "../server/app";
import { restoreVercelRequestPath } from "../server/vercelAdapter";

const app = createApp();

/**
 * Vercel Node Function entry. Static Vite assets are served by Vercel's output
 * directory; this function handles tRPC, OAuth and the existing storage proxy.
 */
export default function handler(request: Request, response: Response) {
  restoreVercelRequestPath(request);
  return app(request, response);
}
