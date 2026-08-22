import type { Request, Response } from "express";
import { createApp } from "./app";
import { restoreVercelRequestPath } from "./vercelAdapter";

const app = createApp();

/**
 * Vercel Node Function entry. The build emits this module to api/index.js so
 * Vercel receives all local Express and tRPC dependencies in one function file.
 */
export default function handler(request: Request, response: Response) {
  restoreVercelRequestPath(request);
  return app(request, response);
}
