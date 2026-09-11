import express, { type Express } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { registerOAuthRoutes } from "./_core/oauth";
import { registerStorageProxy } from "./_core/storageProxy";

/**
 * Builds the shared Express application for local development and server runtimes.
 * Vercel serves the Vite output itself, while its API function reuses this API app.
 */
export function createApp(): Express {
  const app = express();
  app.use((req, res, next) => {
    if (process.env.SITE_INDEXABLE !== "true" || !["topperfume.cn", "www.topperfume.cn"].includes(req.hostname) || req.path.startsWith("/previews/")) res.setHeader("X-Robots-Tag", "noindex, nofollow");
    next();
  });

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  return app;
}
