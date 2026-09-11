// server/app.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
var OAUTH_STATE_COOKIE = "__Host-oauth_state";
var decodeOAuthState = (state) => {
  let decoded;
  try {
    decoded = atob(state);
  } catch {
    return { redirectUri: "" };
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed.redirectUri === "string") return parsed;
  } catch {
  }
  return { redirectUri: decoded };
};

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
import { TRPCError } from "@trpc/server";

// server/_core/env.ts
var ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  inquiryEnabled: process.env.VERCEL_ENV !== "preview" && process.env.INQUIRY_ENABLED === "true",
  inquiryFromEmail: process.env.INQUIRY_FROM_EMAIL ?? "",
  inquiryRecipient: process.env.INQUIRY_TO_EMAIL ?? "melody888666@yeah.net"
};

// server/_core/notification.ts
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
import { TRPCError as TRPCError3 } from "@trpc/server";
import { z as z2 } from "zod";

// shared/businessPolicy.ts
var dispatchGuidance = "Estimated dispatch is usually around 7 days. The start date and order arrangements are agreed when you contact us. This is not a delivery estimate or a guarantee for every order.";
var transactionGuidance = "This website is for product display and inquiries. Payment methods, shipping costs, taxes, the dispatch timeline start date, returns, exchanges and other transaction terms are negotiated for each order and confirmed in writing. Submitting an inquiry does not create an order.";

// server/inquiry.ts
import { randomUUID } from "node:crypto";
var displayValue = (value) => value?.trim() || "Not provided";
function buildInquiryEmail(input) {
  const requestId = `TP-${randomUUID().slice(0, 8).toUpperCase()}`;
  const subjectReference = input.productName?.trim() || "General beauty project";
  const subject = `[TopPerfume Inquiry ${requestId}] ${input.intent.toUpperCase()} \u2014 ${subjectReference}`;
  const text2 = [
    "A new TopPerfume B2B inquiry has been submitted.",
    "",
    `Request ID: ${requestId}`,
    `Inquiry Type: ${input.intent}`,
    "",
    "PRODUCT CONTEXT",
    `Product Name: ${displayValue(input.productName)}`,
    `SKU: ${displayValue(input.sku)}`,
    `Product URL: ${displayValue(input.productUrl)}`,
    `Category: ${displayValue(input.category)}`,
    `Size / format: ${displayValue(input.format)}`,
    `MOQ: ${displayValue(input.standardMoq)}`,
    `Unit price: ${displayValue(input.unitPrice)}`,
    `Product subtotal: ${displayValue(input.subtotal)} (excludes shipping and taxes)`,
    "Final delivered quotation requires destination, availability and shipping confirmation. This is an inquiry, not an order.",
    dispatchGuidance,
    transactionGuidance,
    "",
    "BUYER DETAILS",
    `Customer Name: ${displayValue(input.customerName)}`,
    `Customer Email: ${displayValue(input.customerEmail)}`,
    `Customer WhatsApp: ${displayValue(input.customerWhatsApp)}`,
    `Country / Market: ${displayValue(input.countryMarket)}`,
    `Quantity: ${displayValue(input.quantity)}`,
    `Customization Requirement: ${displayValue(input.customizationRequirement)}`,
    `Notes: ${displayValue(input.notes)}`
  ].join("\n");
  return { requestId, subject, text: text2 };
}
async function sendInquiryEmail(input, config) {
  const message = buildInquiryEmail(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: `TopPerfume B2B Inquiry <${config.fromEmail}>`,
      to: [config.recipient],
      reply_to: input.customerEmail,
      subject: message.subject,
      text: message.text
    })
  });
  if (!response.ok) {
    const upstreamMessage = (await response.text()).slice(0, 500);
    throw new Error(`Resend delivery failed (${response.status}): ${upstreamMessage}`);
  }
  return message;
}
function isRateLimited(attempts, key, now = Date.now()) {
  const windowStart = now - 15 * 60 * 1e3;
  const recent = (attempts.get(key) ?? []).filter((timestamp2) => timestamp2 > windowStart);
  if (recent.length >= 5) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}

// client/src/data/publicAssets.ts
var PUBLIC_BLOB_ASSET_BASE_URL = "https://mqy8jl9r1rvvbx0e.public.blob.vercel-storage.com/topperfume-b2b-v2";
function publicAssetUrl(key) {
  return `${PUBLIC_BLOB_ASSET_BASE_URL}/${key}`;
}

// client/src/data/combinedListing.ts
var combinedListingProducts = [
  {
    "slug": "daily-niacinamide-body-lotion",
    "name": "Daily Niacinamide Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/daily-niacinamide-body-lotion/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/daily-niacinamide-body-lotion/supplied-800.webp",
        "srcSet": "/assets/products/daily-niacinamide-body-lotion/supplied-480.webp 480w, /assets/products/daily-niacinamide-body-lotion/supplied-800.webp 800w, /assets/products/daily-niacinamide-body-lotion/supplied-1254.webp 1254w",
        "thumbnail": "/assets/products/daily-niacinamide-body-lotion/supplied-160.webp",
        "fullSize": "/assets/products/daily-niacinamide-body-lotion/supplied-1254.webp",
        "width": 1254,
        "height": 1254,
        "alt": "White lotion bottle with a blue pump and niacinamide-themed artwork",
        "label": "Supplied artwork"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "standardMoq": "6 pieces",
    "minimumOrderQuantity": 6,
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Daily Niacinamide Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "01",
    "intakeIds": [
      "BC-01"
    ],
    "seoDescription": "Daily Niacinamide Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "labelInformation": [
      "The supplied label reads Daily Brightening, Niacinamide and Serum in Lotion. Ingredient concentration and full INCI are not supplied."
    ],
    "imageDisclosure": "Supplier-provided artwork. Benefit statements in the image have not been independently verified. A clean product photograph is requested.",
    "missingInformation": [
      "Full product specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and lead-time terms",
      "Customization and sample policy",
      "Exact fragrance name and SKU / image mapping relative to the separately held Daily Niacinamide series record"
    ]
  },
  {
    "slug": "luminous-glow-body-wash",
    "name": "Luminous Glow Body Wash \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Wash",
    "format": "500 mL",
    "descriptor": "Body Wash",
    "image": "/assets/products/luminous-glow-body-wash/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/luminous-glow-body-wash/supplied-800.webp",
        "srcSet": "/assets/products/luminous-glow-body-wash/supplied-480.webp 480w, /assets/products/luminous-glow-body-wash/supplied-800.webp 800w, /assets/products/luminous-glow-body-wash/supplied-1254.webp 1254w",
        "thumbnail": "/assets/products/luminous-glow-body-wash/supplied-160.webp",
        "fullSize": "/assets/products/luminous-glow-body-wash/supplied-1254.webp",
        "width": 1254,
        "height": 1254,
        "alt": "Pink Luminous Glow body wash bottle with a white pump",
        "label": "Supplied artwork"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "standardMoq": "6 pieces",
    "minimumOrderQuantity": 6,
    "tags": [
      "Body Wash"
    ],
    "briefing": "Luminous Glow Body Wash. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "01",
    "intakeIds": [
      "BC-02"
    ],
    "seoDescription": "Luminous Glow Body Wash. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "labelInformation": [],
    "imageDisclosure": "Supplier-provided artwork. Benefit statements in the image have not been independently verified. A clean product photograph is requested.",
    "missingInformation": [
      "Full product specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and lead-time terms",
      "Customization and sample policy"
    ]
  },
  {
    "slug": "gluta-glow-body-lotion-500ml",
    "name": "Gluta Glow Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/gluta-glow-body-lotion-500ml/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/gluta-glow-body-lotion-500ml/supplied-800.webp",
        "srcSet": "/assets/products/gluta-glow-body-lotion-500ml/supplied-480.webp 480w, /assets/products/gluta-glow-body-lotion-500ml/supplied-800.webp 800w, /assets/products/gluta-glow-body-lotion-500ml/supplied-1254.webp 1254w",
        "thumbnail": "/assets/products/gluta-glow-body-lotion-500ml/supplied-160.webp",
        "fullSize": "/assets/products/gluta-glow-body-lotion-500ml/supplied-1254.webp",
        "width": 1254,
        "height": 1254,
        "alt": "White Gluta Glow body lotion bottle with a pink pump, labeled 500 mL",
        "label": "Supplied artwork"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "standardMoq": "6 pieces",
    "minimumOrderQuantity": 6,
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Gluta Glow Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "01",
    "intakeIds": [
      "BC-03"
    ],
    "seoDescription": "Gluta Glow Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "labelInformation": [
      "Net contents shown on the supplied label: 500 mL."
    ],
    "imageDisclosure": "Supplier-provided artwork. Benefit statements in the image have not been independently verified. A clean product photograph is requested.",
    "missingInformation": [
      "Full product specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and lead-time terms",
      "Customization and sample policy",
      "Evidence for the UV statements in the artwork, or replacement artwork"
    ]
  },
  {
    "slug": "vanilla-cashmere-whipped-oil-body-butter-283g",
    "name": "Vanilla Cashmere Whipped Oil Body Butter \u2014 283 g",
    "category": "skincare",
    "productType": "Body Butter",
    "format": "283 g",
    "descriptor": "Body Butter",
    "image": "/assets/products/vanilla-cashmere-whipped-oil-body-butter-283g/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/vanilla-cashmere-whipped-oil-body-butter-283g/supplied-800.webp",
        "srcSet": "/assets/products/vanilla-cashmere-whipped-oil-body-butter-283g/supplied-480.webp 480w, /assets/products/vanilla-cashmere-whipped-oil-body-butter-283g/supplied-800.webp 800w, /assets/products/vanilla-cashmere-whipped-oil-body-butter-283g/supplied-1254.webp 1254w",
        "thumbnail": "/assets/products/vanilla-cashmere-whipped-oil-body-butter-283g/supplied-160.webp",
        "fullSize": "/assets/products/vanilla-cashmere-whipped-oil-body-butter-283g/supplied-1254.webp",
        "width": 1254,
        "height": 1254,
        "alt": "White tub of Vanilla Cashmere whipped oil body butter, labeled 283 g",
        "label": "Supplied artwork"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "standardMoq": "6 pieces",
    "minimumOrderQuantity": 6,
    "tags": [
      "Body Butter"
    ],
    "briefing": "Vanilla Cashmere Whipped Oil Body Butter. Confirmed net contents: 283 g. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "01",
    "intakeIds": [
      "BC-04"
    ],
    "seoDescription": "Vanilla Cashmere Whipped Oil Body Butter. Confirmed net contents: 283 g. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "labelInformation": [
      "Brand shown on the supplied packaging: eos.",
      "Net contents shown on the supplied label: 10 OZ / 283 g."
    ],
    "imageDisclosure": "Supplied product image. Packaging text identifies the pictured product; full specifications are available on request.",
    "missingInformation": [
      "Full product specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and lead-time terms",
      "Customization and sample policy"
    ]
  },
  {
    "slug": "vanilla-cashmere-body-wash-473ml",
    "name": "Vanilla Cashmere Body Wash \u2014 473 mL",
    "category": "skincare",
    "productType": "Body Wash",
    "format": "16 FL OZ / 473 mL",
    "descriptor": "Body Wash",
    "image": "/assets/products/vanilla-cashmere-body-wash-473ml/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/vanilla-cashmere-body-wash-473ml/supplied-800.webp",
        "srcSet": "/assets/products/vanilla-cashmere-body-wash-473ml/supplied-480.webp 480w, /assets/products/vanilla-cashmere-body-wash-473ml/supplied-800.webp 800w, /assets/products/vanilla-cashmere-body-wash-473ml/supplied-1254.webp 1254w",
        "thumbnail": "/assets/products/vanilla-cashmere-body-wash-473ml/supplied-160.webp",
        "fullSize": "/assets/products/vanilla-cashmere-body-wash-473ml/supplied-1254.webp",
        "width": 1254,
        "height": 1254,
        "alt": "Purple Vanilla Cashmere body wash bottle, labeled 473 mL",
        "label": "Supplied artwork"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 4.99,
    "b2bPrice": "US$4.99 / piece",
    "standardMoq": "6 pieces",
    "minimumOrderQuantity": 6,
    "tags": [
      "Body Wash"
    ],
    "briefing": "Vanilla Cashmere body wash in a 473 mL bottle, as labeled in the supplied image. Unit price: US$4.99. Contact us for order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "01",
    "intakeIds": [
      "BC-05"
    ],
    "seoDescription": "Vanilla Cashmere body wash in a 473 mL bottle, as labeled in the supplied image. Unit price: US$4.99. Contact us for order details.",
    "labelInformation": [
      "Net contents shown on the supplied label: 16 FL OZ / 473 mL."
    ],
    "imageDisclosure": "Supplied artwork. Numerical pH and sensitive-skin suitability have not been confirmed.",
    "missingInformation": [
      "Full product specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and lead-time terms",
      "Customization and sample policy"
    ]
  },
  {
    "slug": "vaseline-body-care-series-200ml",
    "name": "Vaseline Body Care Series \u2014 200 mL / 237 mL",
    "category": "skincare",
    "productType": "Body Oil",
    "format": "200 mL / 237 mL, by selected variant",
    "descriptor": "Body Oil",
    "image": "/assets/products/vaseline-body-care-series-200ml/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/vaseline-body-care-series-200ml/supplied-800.webp",
        "srcSet": "/assets/products/vaseline-body-care-series-200ml/supplied-480.webp 480w, /assets/products/vaseline-body-care-series-200ml/supplied-800.webp 800w, /assets/products/vaseline-body-care-series-200ml/supplied-1254.webp 1254w",
        "thumbnail": "/assets/products/vaseline-body-care-series-200ml/supplied-160.webp",
        "fullSize": "/assets/products/vaseline-body-care-series-200ml/supplied-1254.webp",
        "width": 1254,
        "height": 1254,
        "alt": "Six differently labeled Vaseline bottles, each marked 200 mL",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Body Oil"
    ],
    "briefing": "Vaseline body care series, priced individually at US$3.00 per piece, MOQ 6 pieces per selected variant. Vitamin B3, Cocoa Radiant Body Oil, Sunlit Glow and Gluta Ceramide are 237 mL. Golden Glow and Cera Glow remain 200 mL. Select the product label for its confirmed size.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-01-01",
      "B02-01-02",
      "B02-01-03",
      "B02-01-04",
      "B02-01-05",
      "B02-01-06"
    ],
    "seoDescription": "Vaseline body care series, priced individually at US$3.00 per piece, MOQ 6 pieces per selected variant. Vitamin B3, Cocoa Radiant Body Oil, Sunlit Glow and Gluta Ceramide are 237 mL. Golden Glow and Cera Glow remain 200 mL. Select the product label for its confirmed size.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces per selected variant",
    "labelInformation": [
      "The reference group photo shows previous 200 mL labels. Confirmed sizes vary by selected product; see the current specification above."
    ],
    "imageDisclosure": "Reference group photo, not a set. Vitamin B3, Cocoa Radiant Body Oil, Sunlit Glow and Gluta Ceramide are now confirmed as 237 mL; their pictured 200 mL labels are outdated and replacement photos are pending. Golden Glow and Cera Glow remain 200 mL. Fragrance names and the mapping to separate series photos still need confirmation.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Individual product photographs for each variant",
      "Exact product type of the Gluta Ceramide variant",
      "Full label details and evidence for any UV or quantified artwork claims",
      "Replacement 237 mL photographs for Vitamin B3, Cocoa Radiant Body Oil, Sunlit Glow and Gluta Ceramide",
      "Fragrance names and their exact SKU / image mapping for the four related series products"
    ],
    "variants": [
      {
        "id": "B02-01-01",
        "name": "Vaseline Vitamin B3 Body Oil \u2014 237 mL",
        "imagePosition": "leftmost",
        "unitPrice": 3,
        "minimumOrderQuantity": 6,
        "format": "237 mL",
        "note": "Confirmed net contents: 237 mL. The reference image shows the previous 200 mL label; updated packaging photography is pending."
      },
      {
        "id": "B02-01-02",
        "name": "Vaseline Cocoa Radiant Body Oil \u2014 237 mL",
        "imagePosition": "second from left",
        "unitPrice": 3,
        "minimumOrderQuantity": 6,
        "format": "237 mL",
        "note": "Confirmed net contents: 237 mL. The reference image shows the previous 200 mL label; updated packaging photography is pending."
      },
      {
        "id": "B02-01-03",
        "name": "Vaseline Sunlit Glow Body Oil \u2014 237 mL",
        "imagePosition": "third from left",
        "unitPrice": 3,
        "minimumOrderQuantity": 6,
        "format": "237 mL",
        "note": "Confirmed net contents: 237 mL. The reference image shows the previous 200 mL label; updated packaging photography is pending."
      },
      {
        "id": "B02-01-04",
        "name": "Vaseline Golden Glow Body Oil \u2014 200 mL",
        "imagePosition": "fourth from left",
        "unitPrice": 3,
        "minimumOrderQuantity": 6,
        "format": "200 mL"
      },
      {
        "id": "B02-01-05",
        "name": "Vaseline UV Extra Brightening Gluta Ceramide \u2014 237 mL",
        "imagePosition": "fifth from left",
        "unitPrice": 3,
        "minimumOrderQuantity": 6,
        "note": "The precise product format of Gluta Ceramide is to be confirmed. Confirmed net contents: 237 mL. The reference image shows the previous 200 mL label; updated packaging photography is pending.",
        "format": "237 mL"
      },
      {
        "id": "B02-01-06",
        "name": "Vaseline Cera Glow Body Gel Oil \u2014 200 mL",
        "imagePosition": "rightmost",
        "unitPrice": 3,
        "minimumOrderQuantity": 6,
        "format": "200 mL"
      }
    ]
  },
  {
    "slug": "khadlaj-hareem-al-sultan",
    "name": "Khadlaj Hareem Al Sultan \u2014 100 mL",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL",
    "descriptor": "Fragrance",
    "image": "/assets/products/khadlaj-hareem-al-sultan/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/khadlaj-hareem-al-sultan/supplied-800.webp",
        "srcSet": "/assets/products/khadlaj-hareem-al-sultan/supplied-480.webp 480w, /assets/products/khadlaj-hareem-al-sultan/supplied-800.webp 800w, /assets/products/khadlaj-hareem-al-sultan/supplied-810.webp 810w",
        "thumbnail": "/assets/products/khadlaj-hareem-al-sultan/supplied-160.webp",
        "fullSize": "/assets/products/khadlaj-hareem-al-sultan/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Ornate gold Hareem Al Sultan bottle with its box and a separately marked sample",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "Khadlaj Hareem Al Sultan. Confirmed net contents: 100 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-02"
    ],
    "seoDescription": "Khadlaj Hareem Al Sultan. Confirmed net contents: 100 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Khadlaj."
    ],
    "imageDisclosure": "The ornate gold main bottle is the quoted product. The red item marked SAMPLE NOT FOR SALE is a photo prop and is not included. Background stock is not included.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Main bottle formulation / concentration",
      "Verified fragrance notes"
    ]
  },
  {
    "slug": "olay-regenerist-cream-50g",
    "name": "OLAY Regenerist Cream \u2014 50 g",
    "category": "skincare",
    "productType": "Face Cream",
    "format": "50 g",
    "descriptor": "Face Cream",
    "image": "/assets/products/olay-regenerist-cream-50g/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/olay-regenerist-cream-50g/supplied-800.webp",
        "srcSet": "/assets/products/olay-regenerist-cream-50g/supplied-480.webp 480w, /assets/products/olay-regenerist-cream-50g/supplied-800.webp 800w, /assets/products/olay-regenerist-cream-50g/supplied-810.webp 810w",
        "thumbnail": "/assets/products/olay-regenerist-cream-50g/supplied-160.webp",
        "fullSize": "/assets/products/olay-regenerist-cream-50g/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Two OLAY Regenerist cream boxes, standard and night versions, marked 50 g",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Face Cream"
    ],
    "briefing": "Choose OLAY Regenerist Micro-Sculpting Cream or the Night version, each labeled 50 g. US$3.00 per piece; minimum order 6 pieces of the selected variant. Contact us for specifications and delivery details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-03-01",
      "B02-03-02"
    ],
    "seoDescription": "Choose OLAY Regenerist Micro-Sculpting Cream or the Night version, each labeled 50 g. US$3.00 per piece; minimum order 6 pieces of the selected variant. Contact us for specifications and delivery details.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces per selected variant",
    "labelInformation": [
      "Brand shown on the supplied packaging: OLAY.",
      "Net contents shown on the supplied label: 50 g."
    ],
    "imageDisclosure": "Group photo showing separate variants. The quoted price is per piece of the selected variant; this is not a set. Select a label to identify its position in the photo.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Individual product photographs for each variant"
    ],
    "variants": [
      {
        "id": "B02-03-01",
        "name": "OLAY Regenerist Micro-Sculpting Cream",
        "imagePosition": "left box",
        "unitPrice": 3,
        "minimumOrderQuantity": 6
      },
      {
        "id": "B02-03-02",
        "name": "OLAY Regenerist Micro-Sculpting Cream Night",
        "imagePosition": "right box",
        "unitPrice": 3,
        "minimumOrderQuantity": 6
      }
    ]
  },
  {
    "slug": "nivea-q10-day-cream",
    "name": "NIVEA Q10 Anti-Wrinkle Power Multi Protective Day Cream",
    "category": "skincare",
    "productType": "Face Cream",
    "format": "50 mL",
    "descriptor": "Face Cream",
    "image": "/assets/products/nivea-q10-day-cream/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/nivea-q10-day-cream/supplied-800.webp",
        "srcSet": "/assets/products/nivea-q10-day-cream/supplied-480.webp 480w, /assets/products/nivea-q10-day-cream/supplied-800.webp 800w, /assets/products/nivea-q10-day-cream/supplied-810.webp 810w",
        "thumbnail": "/assets/products/nivea-q10-day-cream/supplied-160.webp",
        "fullSize": "/assets/products/nivea-q10-day-cream/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "NIVEA Q10 cream jar and matching 50 mL box",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Face Cream"
    ],
    "briefing": "NIVEA Q10 Anti-Wrinkle Power Multi Protective Day Cream, labeled 50 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-04"
    ],
    "seoDescription": "NIVEA Q10 Anti-Wrinkle Power Multi Protective Day Cream, labeled 50 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: NIVEA.",
      "Net contents shown on the supplied label: 50 mL.",
      "The box is printed SPF 30. Supporting test documents have not been supplied; no additional protection claims are made."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Supporting documentation for the printed SPF statement"
    ]
  },
  {
    "slug": "the-ordinary-glycolic-toner",
    "name": "The Ordinary Glycolic Acid 7% Exfoliating Toner",
    "category": "skincare",
    "productType": "Toner",
    "format": "100 mL",
    "descriptor": "Toner",
    "image": "/assets/products/the-ordinary-glycolic-toner/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/the-ordinary-glycolic-toner/supplied-800.webp",
        "srcSet": "/assets/products/the-ordinary-glycolic-toner/supplied-480.webp 480w, /assets/products/the-ordinary-glycolic-toner/supplied-800.webp 800w, /assets/products/the-ordinary-glycolic-toner/supplied-810.webp 810w",
        "thumbnail": "/assets/products/the-ordinary-glycolic-toner/supplied-160.webp",
        "fullSize": "/assets/products/the-ordinary-glycolic-toner/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Three matching The Ordinary Glycolic Acid 7% toner bottles with 100 mL boxes",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Toner"
    ],
    "briefing": "The Ordinary Glycolic Acid 7% Exfoliating Toner, labeled 100 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-05"
    ],
    "seoDescription": "The Ordinary Glycolic Acid 7% Exfoliating Toner, labeled 100 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: The Ordinary.",
      "Net contents shown on the supplied label: 100 mL.",
      "Glycolic Acid 7% is the printed product name. Full INCI and usage instructions are to be confirmed."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "hobby-pure-orchid-shower-gel",
    "name": "HOBBY Fresh Care Pure Orchid Shower Gel \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Wash",
    "format": "500 mL",
    "descriptor": "Body Wash",
    "image": "/assets/products/hobby-pure-orchid-shower-gel/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/hobby-pure-orchid-shower-gel/supplied-800.webp",
        "srcSet": "/assets/products/hobby-pure-orchid-shower-gel/supplied-480.webp 480w, /assets/products/hobby-pure-orchid-shower-gel/supplied-800.webp 800w, /assets/products/hobby-pure-orchid-shower-gel/supplied-810.webp 810w",
        "thumbnail": "/assets/products/hobby-pure-orchid-shower-gel/supplied-160.webp",
        "fullSize": "/assets/products/hobby-pure-orchid-shower-gel/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Three matching HOBBY Fresh Care Pure Orchid shower gel bottles",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Body Wash"
    ],
    "briefing": "HOBBY Fresh Care Pure Orchid Shower Gel. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-06"
    ],
    "seoDescription": "HOBBY Fresh Care Pure Orchid Shower Gel. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: HOBBY."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "dr-teals-lavender-body-lotion",
    "name": "Dr Teal's Lavender Body Lotion",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "18 FL OZ / 532 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/dr-teals-lavender-body-lotion/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/dr-teals-lavender-body-lotion/supplied-800.webp",
        "srcSet": "/assets/products/dr-teals-lavender-body-lotion/supplied-480.webp 480w, /assets/products/dr-teals-lavender-body-lotion/supplied-800.webp 800w, /assets/products/dr-teals-lavender-body-lotion/supplied-810.webp 810w",
        "thumbnail": "/assets/products/dr-teals-lavender-body-lotion/supplied-160.webp",
        "fullSize": "/assets/products/dr-teals-lavender-body-lotion/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Three Dr Teal\u2019s lavender body lotion pump bottles labeled 532 mL",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Dr Teal's Lavender Body Lotion, labeled 18 FL OZ / 532 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-07"
    ],
    "seoDescription": "Dr Teal's Lavender Body Lotion, labeled 18 FL OZ / 532 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Dr Teal's.",
      "Net contents shown on the supplied label: 18 FL OZ / 532 mL."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "st-ives-oatmeal-shea-body-lotion",
    "name": "St. Ives Soothing Oatmeal & Shea Butter Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/st-ives-oatmeal-shea-body-lotion/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/st-ives-oatmeal-shea-body-lotion/supplied-800.webp",
        "srcSet": "/assets/products/st-ives-oatmeal-shea-body-lotion/supplied-480.webp 480w, /assets/products/st-ives-oatmeal-shea-body-lotion/supplied-800.webp 800w, /assets/products/st-ives-oatmeal-shea-body-lotion/supplied-810.webp 810w",
        "thumbnail": "/assets/products/st-ives-oatmeal-shea-body-lotion/supplied-160.webp",
        "fullSize": "/assets/products/st-ives-oatmeal-shea-body-lotion/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Three St. Ives oatmeal and shea butter body lotion pump bottles",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "St. Ives Soothing Oatmeal & Shea Butter Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-08"
    ],
    "seoDescription": "St. Ives Soothing Oatmeal & Shea Butter Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: St. Ives."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "st-ives-coconut-orchid-body-lotion",
    "name": "St. Ives Softening Coconut & Orchid Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/st-ives-coconut-orchid-body-lotion/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/st-ives-coconut-orchid-body-lotion/supplied-800.webp",
        "srcSet": "/assets/products/st-ives-coconut-orchid-body-lotion/supplied-480.webp 480w, /assets/products/st-ives-coconut-orchid-body-lotion/supplied-800.webp 800w, /assets/products/st-ives-coconut-orchid-body-lotion/supplied-810.webp 810w",
        "thumbnail": "/assets/products/st-ives-coconut-orchid-body-lotion/supplied-160.webp",
        "fullSize": "/assets/products/st-ives-coconut-orchid-body-lotion/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Two St. Ives coconut and orchid body lotion pump bottles",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "St. Ives Softening Coconut & Orchid Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-09"
    ],
    "seoDescription": "St. Ives Softening Coconut & Orchid Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: St. Ives."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "garnier-vitamin-c-body-serum-lotion",
    "name": "Garnier Bright Complete Vitamin C Body Serum Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/garnier-vitamin-c-body-serum-lotion/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/garnier-vitamin-c-body-serum-lotion/supplied-800.webp",
        "srcSet": "/assets/products/garnier-vitamin-c-body-serum-lotion/supplied-480.webp 480w, /assets/products/garnier-vitamin-c-body-serum-lotion/supplied-800.webp 800w, /assets/products/garnier-vitamin-c-body-serum-lotion/supplied-810.webp 810w",
        "thumbnail": "/assets/products/garnier-vitamin-c-body-serum-lotion/supplied-160.webp",
        "fullSize": "/assets/products/garnier-vitamin-c-body-serum-lotion/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Three yellow Garnier Bright Complete Vitamin C body serum lotion pump bottles",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Garnier Bright Complete Vitamin C Body Serum Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-10"
    ],
    "seoDescription": "Garnier Bright Complete Vitamin C Body Serum Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Garnier."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Full label details and evidence for any UV or quantified artwork claims"
    ]
  },
  {
    "slug": "simple-moisturising-facial-wash",
    "name": "Simple Moisturising Facial Wash",
    "category": "skincare",
    "productType": "Facial Cleanser",
    "format": "150 mL / 5.1 FL OZ",
    "descriptor": "Facial Cleanser",
    "image": "/assets/products/simple-moisturising-facial-wash/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/simple-moisturising-facial-wash/supplied-800.webp",
        "srcSet": "/assets/products/simple-moisturising-facial-wash/supplied-480.webp 480w, /assets/products/simple-moisturising-facial-wash/supplied-800.webp 800w, /assets/products/simple-moisturising-facial-wash/supplied-960.webp 960w",
        "thumbnail": "/assets/products/simple-moisturising-facial-wash/supplied-160.webp",
        "fullSize": "/assets/products/simple-moisturising-facial-wash/supplied-960.webp",
        "width": 960,
        "height": 1280,
        "alt": "Two Simple moisturising facial wash tubes labeled 150 mL",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "tags": [
      "Facial Cleanser"
    ],
    "briefing": "Simple Moisturising Facial Wash, labeled 150 mL / 5.1 FL OZ. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "02",
    "intakeIds": [
      "B02-11"
    ],
    "seoDescription": "Simple Moisturising Facial Wash, labeled 150 mL / 5.1 FL OZ. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and order details.",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Simple.",
      "Net contents shown on the supplied label: 150 mL / 5.1 FL OZ."
    ],
    "imageDisclosure": "Supplied product photo. Repeated bottles and background stock are not a bundle. Price is per piece.",
    "missingInformation": [
      "Full specifications and INCI",
      "Supplier SKU",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "lattafa-al-noble-ameer",
    "name": "Lattafa Al Noble Ameer",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL / 3.4 FL OZ",
    "descriptor": "Fragrance",
    "image": "/assets/products/lattafa-al-noble-ameer/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/lattafa-al-noble-ameer/supplied-800.webp",
        "srcSet": "/assets/products/lattafa-al-noble-ameer/supplied-480.webp 480w, /assets/products/lattafa-al-noble-ameer/supplied-800.webp 800w, /assets/products/lattafa-al-noble-ameer/supplied-810.webp 810w",
        "thumbnail": "/assets/products/lattafa-al-noble-ameer/supplied-160.webp",
        "fullSize": "/assets/products/lattafa-al-noble-ameer/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Black bottle with a gold deer-shaped cap and matching gold-and-black box \u2014 Lattafa Al Noble Ameer",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 5,
    "b2bPrice": "US$5.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "Lattafa Al Noble Ameer. US$5.00 per piece with a minimum order of 2 pieces. Packaging marked 100 mL / 3.4 FL OZ. Contact us for product specifications and order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "03",
    "intakeIds": [
      "PF-01"
    ],
    "seoDescription": "Lattafa Al Noble Ameer. US$5.00 per piece with a minimum order of 2 pieces. Packaging marked 100 mL / 3.4 FL OZ. Contact us for product specifications and order details.",
    "minimumOrderQuantity": 2,
    "standardMoq": "2 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Lattafa.",
      "Net contents shown on the supplied label: 100 mL / 3.4 FL OZ.",
      "Concentration printed on the supplied label: Eau de Parfum."
    ],
    "imageDisclosure": "Supplied photo showing the named bottle and its pictured box. Background products are not included. Price is per piece.",
    "packaging": "Black bottle with a gold deer-shaped cap and matching gold-and-black box.",
    "missingInformation": [
      "Verified fragrance notes",
      "Supplier SKU",
      "Stock and dispatch terms",
      "Full formulation and ingredient list",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "lattafa-badee-al-oud-sublime",
    "name": "Lattafa Bade\u2019e Al Oud Sublime \u2014 100 mL",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL",
    "descriptor": "Fragrance",
    "image": "/assets/products/lattafa-badee-al-oud-sublime/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/lattafa-badee-al-oud-sublime/supplied-800.webp",
        "srcSet": "/assets/products/lattafa-badee-al-oud-sublime/supplied-480.webp 480w, /assets/products/lattafa-badee-al-oud-sublime/supplied-800.webp 800w, /assets/products/lattafa-badee-al-oud-sublime/supplied-810.webp 810w",
        "thumbnail": "/assets/products/lattafa-badee-al-oud-sublime/supplied-160.webp",
        "fullSize": "/assets/products/lattafa-badee-al-oud-sublime/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Red rectangular bottle with gold-patterned label and matching red box \u2014 Lattafa Bade\u2019e Al Oud Sublime",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 5,
    "b2bPrice": "US$5.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "Lattafa Bade\u2019e Al Oud Sublime. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "03",
    "intakeIds": [
      "PF-02"
    ],
    "seoDescription": "Lattafa Bade\u2019e Al Oud Sublime. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 2,
    "standardMoq": "2 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Lattafa."
    ],
    "imageDisclosure": "Supplied photo showing the named bottle and its pictured box. Background products are not included. Price is per piece.",
    "packaging": "Red rectangular bottle with gold-patterned label and matching red box.",
    "missingInformation": [
      "Concentration / formulation",
      "Verified fragrance notes",
      "Supplier SKU",
      "Stock and dispatch terms",
      "Full formulation and ingredient list",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "lattafa-khamrah-qahwa",
    "name": "Lattafa Khamrah Qahwa \u2014 100 mL",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL",
    "descriptor": "Fragrance",
    "image": "/assets/products/lattafa-khamrah-qahwa/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/lattafa-khamrah-qahwa/supplied-800.webp",
        "srcSet": "/assets/products/lattafa-khamrah-qahwa/supplied-480.webp 480w, /assets/products/lattafa-khamrah-qahwa/supplied-800.webp 800w, /assets/products/lattafa-khamrah-qahwa/supplied-810.webp 810w",
        "thumbnail": "/assets/products/lattafa-khamrah-qahwa/supplied-160.webp",
        "fullSize": "/assets/products/lattafa-khamrah-qahwa/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Faceted clear bottle with amber liquid and a brown Qahwa box \u2014 Lattafa Khamrah Qahwa",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 5,
    "b2bPrice": "US$5.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "Lattafa Khamrah Qahwa. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "03",
    "intakeIds": [
      "PF-03"
    ],
    "seoDescription": "Lattafa Khamrah Qahwa. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 2,
    "standardMoq": "2 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Lattafa."
    ],
    "imageDisclosure": "Supplied photo showing the named bottle and its pictured box. Background products are not included. Price is per piece.",
    "packaging": "Faceted clear bottle with amber liquid and a brown Qahwa box.",
    "missingInformation": [
      "Concentration / formulation",
      "Verified fragrance notes",
      "Supplier SKU",
      "Stock and dispatch terms",
      "Full formulation and ingredient list",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "lattafa-khamrah",
    "name": "Lattafa Khamrah \u2014 100 mL",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL",
    "descriptor": "Fragrance",
    "image": "/assets/products/lattafa-khamrah/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/lattafa-khamrah/supplied-800.webp",
        "srcSet": "/assets/products/lattafa-khamrah/supplied-480.webp 480w, /assets/products/lattafa-khamrah/supplied-800.webp 800w, /assets/products/lattafa-khamrah/supplied-810.webp 810w",
        "thumbnail": "/assets/products/lattafa-khamrah/supplied-160.webp",
        "fullSize": "/assets/products/lattafa-khamrah/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Faceted clear bottle with amber liquid and a dark Khamrah box \u2014 Lattafa Khamrah",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 5,
    "b2bPrice": "US$5.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "Lattafa Khamrah. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "03",
    "intakeIds": [
      "PF-04"
    ],
    "seoDescription": "Lattafa Khamrah. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 2,
    "standardMoq": "2 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Lattafa."
    ],
    "imageDisclosure": "Supplied photo showing the named bottle and its pictured box. Background products are not included. Price is per piece.",
    "packaging": "Faceted clear bottle with amber liquid and a dark Khamrah box.",
    "missingInformation": [
      "Concentration / formulation",
      "Verified fragrance notes",
      "Supplier SKU",
      "Stock and dispatch terms",
      "Full formulation and ingredient list",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "lattafa-al-noble-safeer",
    "name": "Lattafa Al Noble Safeer",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL / 3.4 FL OZ",
    "descriptor": "Fragrance",
    "image": "/assets/products/lattafa-al-noble-safeer/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/lattafa-al-noble-safeer/supplied-800.webp",
        "srcSet": "/assets/products/lattafa-al-noble-safeer/supplied-480.webp 480w, /assets/products/lattafa-al-noble-safeer/supplied-800.webp 800w, /assets/products/lattafa-al-noble-safeer/supplied-810.webp 810w",
        "thumbnail": "/assets/products/lattafa-al-noble-safeer/supplied-160.webp",
        "fullSize": "/assets/products/lattafa-al-noble-safeer/supplied-810.webp",
        "width": 810,
        "height": 1080,
        "alt": "Green bottle with a gold deer-shaped cap and matching green-and-gold box \u2014 Lattafa Al Noble Safeer",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 5,
    "b2bPrice": "US$5.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "Lattafa Al Noble Safeer. US$5.00 per piece with a minimum order of 2 pieces. Packaging marked 100 mL / 3.4 FL OZ. Contact us for product specifications and order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "03",
    "intakeIds": [
      "PF-05"
    ],
    "seoDescription": "Lattafa Al Noble Safeer. US$5.00 per piece with a minimum order of 2 pieces. Packaging marked 100 mL / 3.4 FL OZ. Contact us for product specifications and order details.",
    "minimumOrderQuantity": 2,
    "standardMoq": "2 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: Lattafa.",
      "Net contents shown on the supplied label: 100 mL / 3.4 FL OZ.",
      "Concentration printed on the supplied label: Eau de Parfum."
    ],
    "imageDisclosure": "Supplied photo showing the named bottle and its pictured box. Background products are not included. Price is per piece.",
    "packaging": "Green bottle with a gold deer-shaped cap and matching green-and-gold box.",
    "missingInformation": [
      "Verified fragrance notes",
      "Supplier SKU",
      "Stock and dispatch terms",
      "Full formulation and ingredient list",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "kayali-oudgasm-cafe-oud-19",
    "name": "KAYALI Oudgasm Caf\xE9 Oud | 19",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL / 3.4 FL OZ",
    "descriptor": "Fragrance",
    "image": "/assets/products/kayali-oudgasm-cafe-oud-19/supplied-756.webp",
    "gallery": [
      {
        "src": "/assets/products/kayali-oudgasm-cafe-oud-19/supplied-756.webp",
        "srcSet": "/assets/products/kayali-oudgasm-cafe-oud-19/supplied-480.webp 480w, /assets/products/kayali-oudgasm-cafe-oud-19/supplied-756.webp 756w",
        "thumbnail": "/assets/products/kayali-oudgasm-cafe-oud-19/supplied-160.webp",
        "fullSize": "/assets/products/kayali-oudgasm-cafe-oud-19/supplied-756.webp",
        "width": 756,
        "height": 1280,
        "alt": "Dark faceted bottle with gold lettering and matching dark box \u2014 KAYALI Oudgasm Caf\xE9 Oud | 19",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 5,
    "b2bPrice": "US$5.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "KAYALI Oudgasm Caf\xE9 Oud | 19. US$5.00 per piece with a minimum order of 2 pieces. Packaging marked 100 mL / 3.4 FL OZ. Contact us for product specifications and order details.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "03",
    "intakeIds": [
      "PF-06"
    ],
    "seoDescription": "KAYALI Oudgasm Caf\xE9 Oud | 19. US$5.00 per piece with a minimum order of 2 pieces. Packaging marked 100 mL / 3.4 FL OZ. Contact us for product specifications and order details.",
    "minimumOrderQuantity": 2,
    "standardMoq": "2 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: KAYALI.",
      "Net contents shown on the supplied label: 100 mL / 3.4 FL OZ.",
      "Concentration printed on the supplied label: Eau de Parfum Intense."
    ],
    "imageDisclosure": "Supplied photo showing the named bottle and its pictured box. Background products are not included. Price is per piece.",
    "packaging": "Dark faceted bottle with gold lettering and matching dark box.",
    "missingInformation": [
      "Verified fragrance notes",
      "Supplier SKU",
      "Stock and dispatch terms",
      "Full formulation and ingredient list",
      "Sample and customization policy"
    ]
  },
  {
    "slug": "french-avenue-liquid-brun",
    "name": "French Avenue Liquid Brun \u2014 100 mL",
    "category": "fragrance",
    "productType": "Fragrance",
    "format": "100 mL",
    "descriptor": "Fragrance",
    "image": "/assets/products/french-avenue-liquid-brun/supplied-800.webp",
    "gallery": [
      {
        "src": "/assets/products/french-avenue-liquid-brun/supplied-800.webp",
        "srcSet": "/assets/products/french-avenue-liquid-brun/supplied-480.webp 480w, /assets/products/french-avenue-liquid-brun/supplied-800.webp 800w, /assets/products/french-avenue-liquid-brun/supplied-960.webp 960w",
        "thumbnail": "/assets/products/french-avenue-liquid-brun/supplied-160.webp",
        "fullSize": "/assets/products/french-avenue-liquid-brun/supplied-960.webp",
        "width": 960,
        "height": 1280,
        "alt": "Tall copper-toned bottle with a brown Liquid Brun box \u2014 French Avenue Liquid Brun",
        "label": "Supplied photo"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 5,
    "b2bPrice": "US$5.00 / piece",
    "tags": [
      "Fragrance"
    ],
    "briefing": "French Avenue Liquid Brun. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "03",
    "intakeIds": [
      "PF-07"
    ],
    "seoDescription": "French Avenue Liquid Brun. Confirmed net contents: 100 mL. US$5.00 per piece. Minimum order: 2 pieces. Contact us for product specifications and delivery terms.",
    "minimumOrderQuantity": 2,
    "standardMoq": "2 pieces",
    "labelInformation": [
      "Brand shown on the supplied packaging: French Avenue."
    ],
    "imageDisclosure": "Supplied photo showing the named bottle and its pictured box. Background products are not included. Price is per piece.",
    "packaging": "Tall copper-toned bottle with a brown Liquid Brun box.",
    "missingInformation": [
      "Concentration / formulation",
      "Verified fragrance notes",
      "Supplier SKU",
      "Stock and dispatch terms",
      "Full formulation and ingredient list",
      "Sample and customization policy"
    ]
  }
];

// client/src/data/latestListing.ts
var latestListingProducts = [
  {
    "slug": "glutaglow-body-lotion-400ml-600ml",
    "name": "GlutaGlow Body Lotion \u2014 725 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "725 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/glutaglow-body-lotion-400ml-600ml/supplied-1-800.webp",
    "gallery": [
      {
        "src": "/assets/products/glutaglow-body-lotion-400ml-600ml/supplied-1-800.webp",
        "srcSet": "/assets/products/glutaglow-body-lotion-400ml-600ml/supplied-1-480.webp 480w, /assets/products/glutaglow-body-lotion-400ml-600ml/supplied-1-800.webp 800w, /assets/products/glutaglow-body-lotion-400ml-600ml/supplied-1-1200.webp 1200w",
        "thumbnail": "/assets/products/glutaglow-body-lotion-400ml-600ml/supplied-1-160.webp",
        "fullSize": "/assets/products/glutaglow-body-lotion-400ml-600ml/supplied-1-1200.webp",
        "width": 1200,
        "height": 1200,
        "alt": "Two pink-pump GlutaGlow lotion bottles labeled 400 mL and 600 mL",
        "label": "Supplied view"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "GlutaGlow Body Lotion. Confirmed net contents: 725 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "seoDescription": "GlutaGlow Body Lotion. Confirmed net contents: 725 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "04",
    "intakeIds": [
      "B04-01-400",
      "B04-01-600"
    ],
    "labelInformation": [
      "The supplied reference photo carries previous 400 mL / 600 mL labeling; the current confirmed net contents are 725 mL."
    ],
    "missingInformation": [
      "Supplier SKU and brand details",
      "Full specifications, ingredients and usage instructions",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Evidence for any benefit statements in the supplied artwork",
      "Replacement product photograph showing the confirmed 725 mL packaging"
    ],
    "imageDisclosure": "Reference photo with previous 400 mL / 600 mL labeling. The current offering is 725 mL, priced per piece. Replacement packaging photography is pending; the photographed label has not been altered. The two pictured sizes are no longer offered; this is one 725 mL product, not a set."
  },
  {
    "slug": "healthy-white-body-lotion-400ml",
    "name": "Healthy White Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/healthy-white-body-lotion-400ml/supplied-1-800.webp",
    "gallery": [
      {
        "src": "/assets/products/healthy-white-body-lotion-400ml/supplied-1-800.webp",
        "srcSet": "/assets/products/healthy-white-body-lotion-400ml/supplied-1-480.webp 480w, /assets/products/healthy-white-body-lotion-400ml/supplied-1-800.webp 800w, /assets/products/healthy-white-body-lotion-400ml/supplied-1-1200.webp 1200w",
        "thumbnail": "/assets/products/healthy-white-body-lotion-400ml/supplied-1-160.webp",
        "fullSize": "/assets/products/healthy-white-body-lotion-400ml/supplied-1-1200.webp",
        "width": 1200,
        "height": 1200,
        "alt": "Healthy White lotion in a pink-pump bottle labeled 400 mL",
        "label": "Supplied view"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Healthy White Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "seoDescription": "Healthy White Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "04",
    "intakeIds": [
      "B04-02"
    ],
    "labelInformation": [
      "The supplied reference photo carries previous 400 mL labeling; the current confirmed net contents are 500 mL."
    ],
    "missingInformation": [
      "Supplier SKU and brand details",
      "Full specifications, ingredients and usage instructions",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Evidence for any benefit statements in the supplied artwork",
      "Replacement product photograph showing the confirmed 500 mL packaging"
    ],
    "imageDisclosure": "Reference photo with previous 400 mL labeling. The current offering is 500 mL, priced per piece. Replacement packaging photography is pending; the photographed label has not been altered."
  },
  {
    "slug": "cocoa-radiant-body-gel-oil",
    "name": "Cocoa Radiant Body Gel Oil \u2014 237 mL",
    "category": "skincare",
    "productType": "Body Gel Oil",
    "format": "237 mL",
    "descriptor": "Body Gel Oil",
    "image": "/assets/products/cocoa-radiant-body-gel-oil/supplied-1-800.webp",
    "gallery": [
      {
        "src": "/assets/products/cocoa-radiant-body-gel-oil/supplied-1-800.webp",
        "srcSet": "/assets/products/cocoa-radiant-body-gel-oil/supplied-1-480.webp 480w, /assets/products/cocoa-radiant-body-gel-oil/supplied-1-800.webp 800w, /assets/products/cocoa-radiant-body-gel-oil/supplied-1-1200.webp 1200w",
        "thumbnail": "/assets/products/cocoa-radiant-body-gel-oil/supplied-1-160.webp",
        "fullSize": "/assets/products/cocoa-radiant-body-gel-oil/supplied-1-1200.webp",
        "width": 1200,
        "height": 1200,
        "alt": "Transparent Cocoa Radiant body gel oil bottle with a blue cap and brown label",
        "label": "Supplied view"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 2,
    "b2bPrice": "US$2.00 / piece",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "tags": [
      "Body Gel Oil"
    ],
    "briefing": "Cocoa Radiant Body Gel Oil. Confirmed net contents: 237 mL. US$2.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "seoDescription": "Cocoa Radiant Body Gel Oil. Confirmed net contents: 237 mL. US$2.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "05",
    "intakeIds": [
      "B05-02"
    ],
    "labelInformation": [],
    "missingInformation": [
      "Supplier SKU and brand details",
      "Full specifications, ingredients and usage instructions",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Evidence for any benefit statements in the supplied artwork",
      "Formulation and identity comparison with Cocoa Radiant Body Oil (separate product format)"
    ],
    "imageDisclosure": "Supplied image. Product names and readable net contents come from the pictured label. Benefit statements in the artwork have not been independently verified."
  },
  {
    "slug": "essential-healing-body-lotion-725ml",
    "name": "Essential Healing Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/essential-healing-body-lotion-725ml/supplied-1-800.webp",
    "gallery": [
      {
        "src": "/assets/products/essential-healing-body-lotion-725ml/supplied-1-800.webp",
        "srcSet": "/assets/products/essential-healing-body-lotion-725ml/supplied-1-480.webp 480w, /assets/products/essential-healing-body-lotion-725ml/supplied-1-800.webp 800w, /assets/products/essential-healing-body-lotion-725ml/supplied-1-1200.webp 1200w",
        "thumbnail": "/assets/products/essential-healing-body-lotion-725ml/supplied-1-160.webp",
        "fullSize": "/assets/products/essential-healing-body-lotion-725ml/supplied-1-1200.webp",
        "width": 1200,
        "height": 1200,
        "alt": "Yellow Essential Healing body lotion bottle with a blue pump, labeled 725 mL",
        "label": "Supplied view"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Essential Healing Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "seoDescription": "Essential Healing Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "05",
    "intakeIds": [
      "B05-03"
    ],
    "labelInformation": [
      "The supplied reference photo carries previous 725 mL labeling; the current confirmed net contents are 500 mL."
    ],
    "missingInformation": [
      "Supplier SKU and brand details",
      "Full specifications, ingredients and usage instructions",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Evidence for any benefit statements in the supplied artwork",
      "Replacement product photograph showing the confirmed 500 mL packaging"
    ],
    "imageDisclosure": "Reference photo with previous 725 mL labeling. The current offering is 500 mL, priced per piece. Replacement packaging photography is pending; the photographed label has not been altered."
  },
  {
    "slug": "advanced-repair-body-lotion-725ml",
    "name": "Advanced Repair Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/advanced-repair-body-lotion-725ml/supplied-1-800.webp",
    "gallery": [
      {
        "src": "/assets/products/advanced-repair-body-lotion-725ml/supplied-1-800.webp",
        "srcSet": "/assets/products/advanced-repair-body-lotion-725ml/supplied-1-480.webp 480w, /assets/products/advanced-repair-body-lotion-725ml/supplied-1-800.webp 800w, /assets/products/advanced-repair-body-lotion-725ml/supplied-1-1200.webp 1200w",
        "thumbnail": "/assets/products/advanced-repair-body-lotion-725ml/supplied-1-160.webp",
        "fullSize": "/assets/products/advanced-repair-body-lotion-725ml/supplied-1-1200.webp",
        "width": 1200,
        "height": 1200,
        "alt": "White Advanced Repair body lotion bottle with a blue pump, labeled 725 mL",
        "label": "Supplied view"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Advanced Repair Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "seoDescription": "Advanced Repair Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "05",
    "intakeIds": [
      "B05-06"
    ],
    "labelInformation": [
      "The supplied reference photo carries previous 725 mL labeling; the current confirmed net contents are 500 mL."
    ],
    "missingInformation": [
      "Supplier SKU and brand details",
      "Full specifications, ingredients and usage instructions",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Evidence for any benefit statements in the supplied artwork",
      "Replacement product photograph showing the confirmed 500 mL packaging"
    ],
    "imageDisclosure": "Reference photo with previous 725 mL labeling. The current offering is 500 mL, priced per piece. Replacement packaging photography is pending; the photographed label has not been altered."
  },
  {
    "slug": "calm-healing-body-lotion",
    "name": "Calm Healing Body Lotion \u2014 500 mL",
    "category": "skincare",
    "productType": "Body Lotion",
    "format": "500 mL",
    "descriptor": "Body Lotion",
    "image": "/assets/products/calm-healing-body-lotion/supplied-1-800.webp",
    "gallery": [
      {
        "src": "/assets/products/calm-healing-body-lotion/supplied-1-800.webp",
        "srcSet": "/assets/products/calm-healing-body-lotion/supplied-1-480.webp 480w, /assets/products/calm-healing-body-lotion/supplied-1-800.webp 800w, /assets/products/calm-healing-body-lotion/supplied-1-1200.webp 1200w",
        "thumbnail": "/assets/products/calm-healing-body-lotion/supplied-1-160.webp",
        "fullSize": "/assets/products/calm-healing-body-lotion/supplied-1-1200.webp",
        "width": 1200,
        "height": 1200,
        "alt": "Purple Calm Healing body lotion bottle with a blue pump",
        "label": "Supplied view"
      }
    ],
    "commercialType": "Wholesale",
    "orderUnit": "piece",
    "unitPrice": 3,
    "b2bPrice": "US$3.00 / piece",
    "minimumOrderQuantity": 6,
    "standardMoq": "6 pieces",
    "tags": [
      "Body Lotion"
    ],
    "briefing": "Calm Healing Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "seoDescription": "Calm Healing Body Lotion. Confirmed net contents: 500 mL. US$3.00 per piece. Minimum order: 6 pieces. Contact us for product specifications and delivery terms.",
    "realImage": true,
    "dataStatus": "confirmed",
    "sourceBatch": "05",
    "intakeIds": [
      "B05-07"
    ],
    "labelInformation": [],
    "missingInformation": [
      "Supplier SKU and brand details",
      "Full specifications, ingredients and usage instructions",
      "Stock, shipping and dispatch terms",
      "Sample and customization policy",
      "Evidence for any benefit statements in the supplied artwork"
    ],
    "imageDisclosure": "Supplied image. Product names and readable net contents come from the pictured label. Benefit statements in the artwork have not been independently verified."
  }
];

// client/src/data/products.ts
var realVisual = {
  diorSauvage: publicAssetUrl("product-01-dior-sauvage-bottle-box_51b02500.png"),
  goodGirlBlushTweedTalk: publicAssetUrl("product-02-good-girl-blush-tweed-talk_1ae0d387.png"),
  veryGoodGirlGlam: publicAssetUrl("product-03-very-good-girl-glam-bottle-box_9405022e.png"),
  monParis: publicAssetUrl("product-04-mon-paris-bottle_3357056d.png"),
  medixVitaminCLotion: publicAssetUrl("product-05-medix-vitamin-c-body-lotion_9c412e12.png"),
  medixRetinolLotion: publicAssetUrl("product-06-medix-retinol-body-lotion_82595db9.png"),
  olayDarkSpotLotion: publicAssetUrl("product-07-olay-dark-spot-body-lotion_8520dc7b.png"),
  jergensUltraHealingLotion: publicAssetUrl("product-08-jergens-ultra-healing-body-lotion_bd2450c3.png"),
  bareVanillaBodyMist: publicAssetUrl("product-10-bare-vanilla-body-mist_bf37ea81.png"),
  veganHydratingLipOilGloss: publicAssetUrl("product-11-vegan-hydrating-lip-oil-gloss_f92e8c52.png"),
  hydratingMirrorShineLipGlaze: publicAssetUrl("product-12-hydrating-mirror-shine-lip-glaze_d0866c8c.png"),
  mochaChocolateEyeshadowPalette: publicAssetUrl("product-13-mocha-chocolate-eyeshadow-palette_ca2216bd.png"),
  radiantGlowMoisturizingLipGloss: publicAssetUrl("product-14-radiant-glow-lip-gloss_e7660ba0.png"),
  braceletLipGlossPalette: publicAssetUrl("product-15-bracelet-lip-gloss-palette_84ef5aef.png"),
  ultimatePressedPowderEyeshadowPalette: publicAssetUrl("product-16-vegan-pressed-powder-eyeshadow-palette_faef4ea4.png"),
  lightweightHydratingLiquidConcealer: publicAssetUrl("product-17-lightweight-hydrating-liquid-concealer_231c2117.png"),
  deluxeBrowDefinitionSet: publicAssetUrl("product-18-deluxe-brow-definition-set_d8c18541.png"),
  multiUseComplexionPalette: publicAssetUrl("product-19-multi-use-complexion-palette_1a4ca030.png"),
  blushDuoPalette: publicAssetUrl("product-20-blush-duo-palette_8af7b46f.png"),
  creamyContourFoundationStick: publicAssetUrl("product-21-creamy-contour-foundation-stick_5b359b7c.png"),
  faceContourCorrectingPalette: publicAssetUrl("product-22-face-contour-correcting-palette-saturated_62a460a7.png"),
  pureSeductionMistLotionSet: publicAssetUrl("product-23-pure-seduction-mist-lotion-set_c74ce5a3.png"),
  fragranceRose: publicAssetUrl("fragrance-jam-spill_f3448635.jpg"),
  fragranceViolet: publicAssetUrl("fragrance-my-soul_c875037f.jpg"),
  fragranceAmber: publicAssetUrl("fragrance-vanilla-amber_ac1dc3b6.jpg"),
  fragranceBlue: publicAssetUrl("fragrance-santal-berry_0dac099c.jpg")
};
var products = [
  ...latestListingProducts,
  ...combinedListingProducts,
  {
    slug: "vitamin-c-body-lotion-502ml",
    name: "Vitamin C Body Lotion \u2014 502 mL",
    category: "skincare",
    format: "502 mL / 17 FL OZ",
    descriptor: "Body Lotion \xB7 502 mL \xB7 Pump Bottle",
    image: "/assets/products/vitamin-c-body-lotion-502ml/01-vitamin-c-body-lotion-502ml-main-800.webp",
    gallery: [
      { file: "01-vitamin-c-body-lotion-502ml-main", label: "Front view", alt: "Vitamin C body lotion, 502 mL, front view" },
      { file: "02-vitamin-c-body-lotion-502ml-texture", label: "Texture artwork", alt: "Vitamin C body lotion with a lotion texture illustration" },
      { file: "03-vitamin-c-body-lotion-502ml-benefits", label: "Label & artwork", alt: "Vitamin C body lotion with supplied product benefit descriptions" },
      { file: "04-vitamin-c-body-lotion-502ml-two-bottles", label: "Alternate views", alt: "Two bottles of the same Vitamin C body lotion shown at different angles" }
    ].map(({ file, label, alt }) => ({
      src: `/assets/products/vitamin-c-body-lotion-502ml/${file}-1254.webp`,
      srcSet: [480, 800, 1254].map((size) => `/assets/products/vitamin-c-body-lotion-502ml/${file}-${size}.webp ${size}w`).join(", "),
      thumbnail: `/assets/products/vitamin-c-body-lotion-502ml/${file}-160.webp`,
      label,
      alt,
      width: 1254,
      height: 1254
    })),
    imageDisclosure: "Supplied product artwork; front image digitally edited. Texture and benefit descriptions are part of the artwork; independent supporting evidence has not been provided. The two-bottle view shows the same product. Price is per bottle.",
    tags: ["Body Care", "Body Lotion", "502 mL", "2-bottle MOQ"],
    briefing: "Vitamin C Body Lotion in a 502 mL pump bottle, labelled 17 FL OZ / 502 mL. Offered at US$2.99 per bottle, with a minimum order of 2 bottles. Ask for ingredient documentation, availability and delivery terms for your market before ordering.",
    productType: "Body Lotion",
    b2bPrice: "US$2.99 / bottle",
    standardMoq: "2 bottles",
    unitPrice: 2.99,
    minimumOrderQuantity: 2,
    commercialType: "Wholesale",
    packaging: "Single pump bottle, as shown in the supplied artwork.",
    dataStatus: "confirmed",
    missingInformation: [
      "Supplier SKU and brand details",
      "Full INCI ingredients and vitamin C concentration",
      "Fragrance, shelf life and usage instructions",
      "Stock, dispatch time, shipping and tax terms",
      "Carton quantity, dimensions and shipping weight",
      "Certifications and evidence for benefit claims",
      "Sample policy and private-label or customization options"
    ]
  },
  { slug: "dior-sauvage-parfum-spray-men", name: "Dior Sauvage Parfum Spray for Men", category: "fragrance", format: "100 ml / 3.4 oz", descriptor: "Earthy \xB7 Woody \xB7 Spicy", image: realVisual.diorSauvage, realImage: true, tags: ["Men\u2019s Perfume", "Parfum", "Product visual"], notes: { top: "Bergamot", heart: "Pepper", base: "Amber Wood" }, briefing: "A bold woody fragrance with a fresh masculine signature. Sauvage combines bright bergamot freshness with pepper and warm amber wood, creating a powerful fragrance profile for customers who prefer fresh, woody and sophisticated scents.", sku: "FR-DI-SAU-100", b2bPrice: "US$20.00 / pc", concentration: "Parfum", gender: "Men", fragranceFamily: "Earthy & Woody", packaging: "Dark navy-to-black gradient glass bottle with black cylindrical cap and matching premium black gift box.", dataStatus: "confirmed" },
  { slug: "carolina-herrera-good-girl-blush-tweed-talk-edp-women", name: "Carolina Herrera Good Girl Blush Tweed Talk Eau de Parfum for Women", category: "fragrance", format: "80 ml / 2.7 oz", descriptor: "Oriental Floral", image: realVisual.goodGirlBlushTweedTalk, realImage: true, tags: ["Women\u2019s Perfume", "Eau de Parfum", "Product visual"], briefing: "A fashion-led women\u2019s fragrance with a statement presentation. Good Girl Blush Tweed Talk combines a feminine oriental-floral positioning with an expressive high-heel bottle and coordinated tweed-inspired packaging. Its distinctive presentation makes it particularly suitable for gifting, fragrance retail and visually driven beauty collections.", sku: "FR-CH-GGBT-080", b2bPrice: "US$20.00 / pc", concentration: "Eau de Parfum", gender: "Women", fragranceFamily: "Oriental Floral", keyNotes: "[TO CONFIRM]", edition: "2025", packaging: "Sculptural high-heel bottle with a black-and-white tweed pattern, glossy black upper section, soft pink belt accent and matching patterned presentation box with gold-tone edging.", dataStatus: "confirmed" },
  { slug: "carolina-herrera-very-good-girl-glam-edp-women", name: "Carolina Herrera Very Good Girl Glam Eau de Parfum for Women", category: "fragrance", format: "80 ml / 2.7 fl oz", descriptor: "Cherry \xB7 Citrus \xB7 Woody", image: realVisual.veryGoodGirlGlam, realImage: true, tags: ["Women\u2019s Perfume", "Eau de Parfum", "Product visual"], briefing: "A glamorous statement fragrance with a sparkling cherry signature. Very Good Girl Glam Eau de Parfum combines a bright, feminine fragrance character with an expressive stiletto-inspired presentation. Bergamot and mandarin provide a fresh citrus opening, while a sparkling cherry character gives the fragrance a vibrant and distinctive identity. Its deep pink glitter bottle, black detailing and metallic gold heel create a strong luxury gifting and retail-display presence.", sku: "FR-CH-VGGG-080", b2bPrice: "US$20.00 / pc", concentration: "Eau de Parfum", gender: "Women", fragranceFamily: "Citrus \xB7 Aromatic \xB7 Woody", visibleNotes: "Bergamot \xB7 Mandarin \xB7 Sparkling Cherry character", remainingNotes: "[TO CONFIRM]", packaging: "Deep pink-to-burgundy translucent glitter stiletto bottle with a glossy black upper section, slim metallic gold heel and coordinated black, pink-glitter and gold-trimmed presentation box.", dataStatus: "confirmed" },
  { slug: "yves-saint-laurent-mon-paris-parfum-women", name: "Yves Saint Laurent Mon Paris Parfum for Women", category: "fragrance", format: "[TO CONFIRM]", descriptor: "Fruity \xB7 Floral \xB7 Musk", image: realVisual.monParis, realImage: true, tags: ["Women\u2019s Perfume", "Parfum", "Product visual"], notes: { top: "Pear \xB7 Strawberry \xB7 Calabrian Bergamot \xB7 Raspberry", heart: "Peony \xB7 Orange Blossom \xB7 Datura \xB7 Chinese Jasmine \xB7 Sambac Jasmine", base: "Ambrox \xB7 Crystal White Musk \xB7 Indonesian Patchouli \xB7 Guatemala Patchouli" }, briefing: "A romantic fruity-floral fragrance with a rich, modern finish. Mon Paris opens with juicy pear, strawberry, raspberry and Calabrian bergamot before developing into an elegant floral heart of peony, orange blossom, datura and jasmine. Ambrox, white musk and patchouli create a warm, lasting base that adds depth to the fragrance. Its faceted pink bottle and signature black bow give the product a sophisticated, feminine presentation suitable for gifting, fragrance retail and premium beauty collections.", sku: "FR-YSL-MP-001", b2bPrice: "US$20.00 / pc", concentration: "Parfum", gender: "Women", fragranceFamily: "Sweet \xB7 Fruity \xB7 Floral", releaseYear: "2016", packaging: "Faceted clear glass bottle with soft pink fragrance liquid, black decorative neck bow, metallic silver spray hardware and gold-tone emblem detail.", dataStatus: "confirmed" },
  { slug: "vitamin-c-niacinamide-brightening-body-lotion", name: "Vitamin C + Niacinamide Brightening Body Lotion", category: "skincare", format: "444 ml / 15 fl oz", descriptor: "Vitamin C \xB7 Niacinamide \xB7 Turmeric", image: realVisual.medixVitaminCLotion, realImage: true, tags: ["Body Care", "Brightening Body Lotion", "Pump Bottle"], briefing: "Brightening body care for smoother, softer and more even-looking skin. This Vitamin C + Niacinamide Body Lotion combines brightening and moisturizing body-care ingredients including Vitamin C, Niacinamide and Turmeric. The formula is positioned for daily body care, helping improve the appearance of dullness, uneven-looking skin tone and visible dark spots while supporting softer and smoother-looking skin. The large 444 ml pump format makes it suitable for regular body-care routines and retail body-lotion collections.", sku: "SK-BL-VC-444", b2bPrice: "US$3.99 / pc", gender: "Women & Men / Unisex", productType: "Brightening Body Lotion / Body Moisturizer", keyIngredients: "Vitamin C \xB7 Niacinamide \xB7 Turmeric", texture: "[TO CONFIRM]", skinType: "[TO CONFIRM]", fragrance: "[TO CONFIRM]", spf: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Rectangular amber-orange pump bottle with white pump dispenser and modern minimal body-care packaging.", dataStatus: "confirmed" },
  { slug: "retinol-ferulic-acid-firming-body-lotion", name: "Retinol + Ferulic Acid Firming Body Lotion", category: "skincare", format: "444 ml / 15 fl oz", descriptor: "Retinol \xB7 Ferulic Acid \xB7 Firming Care", image: realVisual.medixRetinolLotion, realImage: true, tags: ["Body Care", "Firming Body Lotion", "Pump Bottle"], briefing: "Retinol-powered body care for smoother, firmer-looking skin. This Retinol + Ferulic Acid Body Lotion is designed for moisturizing and firming body-care routines. The formula is positioned to help improve the appearance of crepey-looking skin, visible fine lines and uneven texture while supporting softer and smoother-looking skin. The generous 444 ml pump format makes it suitable for regular use and body-care retail collections.", sku: "SK-BL-RET-444", b2bPrice: "US$3.99 / pc", gender: "Women / Unisex Body Care", productType: "Firming Body Lotion / Retinol Body Cream", primaryBenefit: "Firming \xB7 Smoothing \xB7 Moisturizing", keyIngredients: "Retinol \xB7 Ferulic Acid", texture: "[TO CONFIRM]", skinType: "[TO CONFIRM]", fragrance: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Modern rectangular deep-pink pump bottle with white pump dispenser and minimalist body-care presentation.", dataStatus: "confirmed" },
  { slug: "olay-dark-spot-correcting-body-lotion", name: "Olay Dark Spot Correcting Body Lotion", category: "skincare", format: "502 ml / 17 fl oz", descriptor: "AHA \xB7 Vitamin C \xB7 Niacinamide", image: realVisual.olayDarkSpotLotion, realImage: true, tags: ["Body Care", "Tone-Enhancing Body Lotion", "Pump Bottle"], briefing: "Brightening body care for smoother, hydrated and more even-looking skin. This tone-enhancing body lotion combines AHA, Vitamin C and Niacinamide / Vitamin B3 Complex in a daily moisturizing body-care format. It is positioned to help improve the appearance of dark spots, discoloration and uneven-looking skin tone while providing lasting hydration. The fast-absorbing formula and generous 502 ml pump format make it suitable for daily body-care routines and high-volume retail body-lotion collections.", sku: "SK-BL-OLAY-AHA-502", b2bPrice: "US$2.99 / pc", gender: "Women / General body-care use", productType: "Brightening / Tone-Enhancing Body Lotion", primaryBenefit: "Brightening \xB7 Hydrating \xB7 Tone Care", moisturePositioning: "24-hour hydration", keyIngredients: "AHA \xB7 Vitamin C \xB7 Niacinamide / Vitamin B3", texture: "Fast-absorbing body lotion", skinType: "All Skin Types", fragrance: "[TO CONFIRM]", standardMoq: "[TO CONFIRM]", leadTime: "Approx. 7 days", packaging: "Tall premium pump bottle with a warm gold/orange upper section, white lower body and gold-tone pump detail.", dataStatus: "confirmed" },
  { slug: "jergens-ultra-healing-body-lotion", name: "Jergens Ultra Healing Body Lotion", category: "skincare", format: "946 ml / 32 fl oz", descriptor: "Vitamin C \xB7 E \xB7 B5", image: realVisual.jergensUltraHealingLotion, realImage: true, tags: ["Body Care", "Intensive Moisturizer", "Pump Bottle"], briefing: "Intensive daily moisture for extra dry skin. Jergens Ultra Healing Body Lotion is positioned as a rich daily moisturizer for extra dry skin. The formula contains Vitamins C, E and B5 and is designed to provide intensive hydration while helping skin feel softer, smoother and more comfortable. Its fast-absorbing formula and large 946 ml pump format make it suitable for everyday body-care routines and high-volume retail body-lotion collections.", sku: "SK-BL-JER-UH-946", b2bPrice: "[TO CONFIRM]", productType: "Intensive Moisturizing Body Lotion / Dry Skin Body Care", primaryBenefit: "Moisturizing \xB7 Hydrating \xB7 Smoothing", keyIngredients: "Vitamin C \xB7 Vitamin E \xB7 Vitamin B5", texture: "Fast-absorbing lotion", skinType: "Extra Dry Skin", dermatologistTested: "Yes \u2014 according to supplied product information", fragrance: "[TO CONFIRM]", standardMoq: "[TO CONFIRM]", leadTime: "Approx. 7 days", packaging: "Large white pump bottle with clean minimal packaging and orange accent design.", dataStatus: "confirmed" },
  { slug: "victorias-secret-bare-vanilla-body-fragrance-mist", name: "Victoria\u2019s Secret Bare Vanilla Body Fragrance Mist", category: "fragrance", format: "250 ml / 8.4 fl oz", descriptor: "Warm \xB7 Sweet \xB7 Vanilla", image: realVisual.bareVanillaBodyMist, realImage: true, tags: ["Women\u2019s Body Mist", "Vanilla", "Product visual"], briefing: "A warm vanilla body mist for everyday fragrance use. Bare Vanilla Body Fragrance Mist is positioned as a soft, sweet and warm women\u2019s fragrance mist with a clear vanilla scent identity. Its light and wearable body-mist format makes it suitable for daily use, gifting and feminine fragrance collections. The 250 ml bottle size, elegant transparent packaging and gold-tone cap create a clean and attractive presentation for retail and wholesale fragrance assortments.", sku: "FR-VS-BV-250", b2bPrice: "US$2.00 / pc", gender: "Women", productType: "Body Fragrance Mist", fragranceFamily: "Warm \xB7 Sweet \xB7 Vanilla", visibleNotes: "Vanilla", remainingNotes: "[TO CONFIRM]", standardMoq: "2 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Tall transparent body-mist bottle with soft nude-beige fragrance liquid, rectangular front label and metallic gold cap.", dataStatus: "confirmed" },
  { slug: "vegan-hydrating-lip-oil-gloss", name: "Vegan Hydrating Lip Oil Gloss", category: "makeup", format: "[TO CONFIRM]", descriptor: "Mirror Shine \xB7 Moisturizing \xB7 Watery Finish", image: realVisual.veganHydratingLipOilGloss, realImage: true, tags: ["Lip Makeup", "Lip Oil / Lip Gloss", "Product visual"], briefing: "High-shine hydration with a smooth, juicy-looking lip finish. This moisturizing lip oil combines lip-care positioning with a glossy makeup finish. Its lightweight watery texture is designed to create a smooth, mirror-like shine and a fresh, hydrated, fuller-looking appearance. Visible pink, berry and peach-inspired options make it suitable for trend-driven makeup collections, beauty retailers and social-commerce sellers.", sku: "MU-LIP-OIL-001", b2bPrice: "US$2.00 / pc", productType: "Hydrating Lip Oil / Lip Gloss", primaryBenefit: "Moisturizing \xB7 Hydrating", finish: "Mirror Shine / Glossy", texture: "Watery / Smooth", vegan: "Yes \u2014 according to supplied product information", veganCertification: "[TO CONFIRM]", shadeOptions: "Deep Berry Pink \xB7 Rose Pink \xB7 Peach Nude \xB7 Soft Pink", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Squeezable glossy lip-oil tubes in bright pink, rose and peach variations with decorative transparent jewel-style applicator bases.", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "hydrating-mirror-shine-lip-glaze", name: "Hydrating Mirror-Shine Lip Glaze", category: "makeup", format: "[TO CONFIRM]", descriptor: "Mirror Gloss \xB7 Jelly Texture \xB7 Moisturizing", image: realVisual.hydratingMirrorShineLipGlaze, realImage: true, tags: ["Lip Makeup", "MIRROR SHINE", "TRENDING", "Product visual"], briefing: "Juicy mirror shine with a smooth, moisturizing lip finish. This Hydrating Mirror-Shine Lip Glaze combines high-impact gloss with a smooth jelly-like texture for a fresh, polished lip look. Available in multiple pink, berry, red and warm-toned shade directions, it is designed for trend-led makeup collections and visually driven beauty retail. Reflective silver-tone packaging gives a premium appearance, while the transparent tube allows buyers and customers to see the lip color directly.", sku: "MU-LG-002", b2bPrice: "US$2.99 / pc", productType: "Lip Glaze / Lip Jelly / High-Shine Lip Color", primaryBenefit: "Moisturizing \xB7 Long-Lasting", finish: "Mirror Shine / High Gloss", texture: "Smooth Jelly", shadeOptions: "Rose Pink \xB7 Berry Red \xB7 Deep Wine \xB7 Warm Brown \xB7 Coral Red \xB7 Bright Pink", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Compact transparent lip-glaze tubes showing the lip shade inside, with reflective silver-tone caps and decorative metallic detailing.", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "mocha-chocolate-9-shade-eyeshadow-palette", name: "Mocha Chocolate 9-Shade Eyeshadow Palette", category: "makeup", format: "[TO CONFIRM]", descriptor: "Matte \xB7 Shimmer \xB7 Warm Brown", image: realVisual.mochaChocolateEyeshadowPalette, realImage: true, tags: ["Eye Makeup", "WARM NEUTRALS", "MATTE + SHIMMER", "Product visual"], briefing: "Nine warm neutral shades inspired by mocha, caramel and rich chocolate tones. This compact palette brings together wearable matte neutrals and luminous shimmer shades for soft daytime makeup, warm smoky eyes and more defined evening looks. Its warm-toned color story is suitable for medium-to-deep skin tones while remaining versatile across a broad range of skin tones. The transparent lid and nine-pan format make it suitable for trend-led makeup collections, online beauty retailers and everyday eye-makeup assortments.", sku: "MU-EYE-MOCHA-009", b2bPrice: "US$2.99 / pc", productType: "9-Color Eyeshadow Palette", primaryBenefit: "Mocha Brown \xB7 Warm Neutral \xB7 Everyday Glam", numberOfShades: "9", colorFamily: "Mocha \xB7 Chocolate \xB7 Warm Brown \xB7 Neutral", finish: "Matte + Shimmer", paletteFormat: "Compact 9-Pan", individualPanWeight: "[TO CONFIRM]", shadeOptions: "Matte Nude \xB7 Matte Beige \xB7 Warm Caramel \xB7 Mocha Brown \xB7 Deep Chocolate \xB7 Bronze Shimmer \xB7 Champagne / Gold Shimmer", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Compact square 9-pan eyeshadow palette with transparent lid and deep brown base; warm nude, caramel and mocha mattes are paired with bronze and gold shimmer shades.", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "radiant-glow-moisturizing-lip-gloss", name: "Radiant Glow Moisturizing Lip Gloss", category: "makeup", format: "[TO CONFIRM]", descriptor: "Glossy \xB7 Hydrating \xB7 Silky Smooth", image: realVisual.radiantGlowMoisturizingLipGloss, realImage: true, tags: ["Lip Makeup", "8 COLORS", "HYDRATING GLOSS", "Product visual"], briefing: "Glossy hydration with a smooth, radiant lip finish. This Radiant Glow Moisturizing Lip Gloss is designed to deliver shine, hydration and a soft, smooth lip appearance in one easy-to-apply format. Its glossy formula creates a fresh, juicy-looking finish while helping lips feel moisturized and comfortable. With eight visible color directions, it is suitable for trend-led beauty collections, online makeup stores, social-commerce sellers and everyday lip-makeup assortments.", sku: "MU-LIP-GLOSS-003", b2bPrice: "US$1.99 / pc", productType: "Moisturizing Lip Gloss / Gloss Gel", primaryBenefit: "Glossy \xB7 Moisturizing \xB7 Silky Smooth", numberOfShades: "8", colorFamily: "Clear \xB7 Ice Blue \xB7 Peach \xB7 Pink \xB7 Red \xB7 Nude Brown \xB7 Berry", finish: "Glossy / Radiant", texture: "Silky Smooth", shadeOptions: "Clear / Milky White \xB7 Ice Blue \xB7 Peach Nude \xB7 Soft Pink \xB7 Bright Red \xB7 Rose Pink \xB7 Warm Nude Brown \xB7 Deep Berry", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Soft pink tube-style lip-gloss packaging with transparent applicator-style tips and visible glossy formula across eight color directions.", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "2-in-1-bracelet-lip-gloss-palette-mirror", name: "2-in-1 Bracelet Lip Gloss Palette with Mirror", category: "makeup", format: "[TO CONFIRM]", descriptor: "Bracelet \xB7 Mirror \xB7 Dual Lip Color", image: realVisual.braceletLipGlossPalette, realImage: true, tags: ["Lip Makeup", "BRACELET + MIRROR", "DUAL LIP COLOR", "Product visual"], briefing: "Portable beauty in a polished bracelet-inspired format. This 2-in-1 Bracelet Lip Gloss Palette combines two coordinated lip colors with a built-in mirror and an attached bracelet-style chain. Its glossy water-gloss finish and compact presentation make it suitable for gifting, trend-led makeup collections, beauty retail and social-commerce assortments. Four visible colorways offer mauve, rose, brick red, coral, berry and warm nude directions.", sku: "MU-LIP-BRACELET-004", b2bPrice: "US$2.99 / pc", productType: "2-in-1 Lip Gloss Palette / Bracelet Makeup", primaryBenefit: "Bracelet \xB7 Mirror \xB7 Dual Lip Color \xB7 Portable Beauty", numberOfShades: "2 lip colors per palette / 4 visible colorways", colorFamily: "Mauve \xB7 Rose Pink \xB7 Brick Red \xB7 Coral \xB7 Berry \xB7 Warm Nude", finish: "Glossy / Water-Gloss", shadeOptions: "Mauve / Rose Pink \xB7 Brick Red / Coral Pink \xB7 Berry / Rose \xB7 Warm Nude / Coral Red", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Polished silver-tone compact with a hinged mirror, two lip-color pans and an attached bracelet-style chain.", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "16-shade-vegan-pressed-powder-eyeshadow-palette", name: "16-Shade Vegan Pressed Powder Eyeshadow Palette", category: "makeup", format: "[TO CONFIRM]", descriptor: "16 Shades \xB7 Matte + Shimmer \xB7 High-Pigment", image: realVisual.ultimatePressedPowderEyeshadowPalette, realImage: true, tags: ["Eye Makeup", "16 SHADES", "MATTE + SHIMMER", "HIGH PIGMENT", "Product visual"], briefing: "A 16-shade pressed-powder eyeshadow palette offered in Warm Neutrals and Vintage Jean Baby color stories. The supplied product information gives the palette high-pigment positioning and Vegan positioning according to supplied product information, with matte and shimmer finishes for everyday neutral looks, warm smoky eyes, soft glam and denim-inspired color accents. It is suitable for trend-led makeup collections and buyers seeking varied eye-makeup color directions across a broad range of skin tones.", sku: "MU-EYE-ULT-016", b2bPrice: "US$2.99 / pc", productType: "Pressed Powder Eyeshadow Palette", primaryBenefit: "16 Shades \xB7 High-Pigment \xB7 Matte + Shimmer", numberOfShades: "16", colorFamily: "Warm Neutrals \xB7 Vintage Jean Baby", finish: "Matte + Shimmer", paletteFormat: "Compact 16-Pan", individualPanWeight: "[TO CONFIRM]", vegan: "Vegan positioning according to supplied product information", veganCertification: "[TO CONFIRM]", shadeOptions: "Warm Neutrals: Beige \xB7 Nude \xB7 Caramel \xB7 Warm Brown \xB7 Chocolate \xB7 Bronze \xB7 Copper / Vintage Jean Baby: Silver \xB7 Cool Nude \xB7 Taupe \xB7 Rose \xB7 Blue \xB7 Denim-inspired tones", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Compact 16-pan eyeshadow palettes shown in Warm Neutrals and Vintage Jean Baby color stories with clear lids and black cases.", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "8ml-lightweight-hydrating-liquid-concealer", name: "8ml Lightweight Hydrating Liquid Concealer", category: "makeup", format: "8 ml", descriptor: "Multi-Shade \xB7 Lightweight \xB7 Custom Logo", image: realVisual.lightweightHydratingLiquidConcealer, realImage: true, tags: ["Face Makeup", "6 SHADES", "CUSTOM LOGO", "LIGHTWEIGHT", "Product visual"], briefing: "Lightweight complexion coverage in a compact, customizable format. This 8 ml Liquid Concealer is designed for lightweight face makeup with a smooth, comfortable application and moisturizing positioning. The visible range includes approximately six complexion directions from light beige to deep brown, helping buyers assemble flexible face-makeup assortments across lighter, medium and deeper complexion tones. Its transparent tube keeps the shade visible at a glance, while the supplied product visual demonstrates custom-logo placement. The compact format is suited to daily makeup, beauty retail, online stores and emerging cosmetic brands seeking an easy-to-merchandise face product.", sku: "MU-FACE-CON-008", b2bPrice: "US$2.99 / pc", productType: "Liquid Concealer", primaryBenefit: "Lightweight \xB7 Moisturizing \xB7 Hydrating", numberOfShades: "Approximately 6 visible shades", colorFamily: "Light Beige \xB7 Natural Beige \xB7 Warm Tan \xB7 Caramel \xB7 Deep Brown", finish: "[TO CONFIRM]", texture: "Lightweight Liquid / Cream", shadeOptions: "Light Ivory \xB7 Light Beige \xB7 Natural Beige \xB7 Warm Tan \xB7 Caramel \xB7 Deep Brown", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Slim transparent 8 ml concealer tubes with soft pink caps; visible shades range from light beige to deep brown, and the supplied visual demonstrates \u201CYOUR LOGO\u201D placement.", privateLabelAvailable: true, privateLabelStatus: "Available according to supplied product information", customLogoStatus: "Available according to supplied product information", customPackagingStatus: "[TO CONFIRM]", customShadesStatus: "[TO CONFIRM]", customizationMoq: "[TO CONFIRM]", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "3-in-1-deluxe-brow-definition-set", name: "3-in-1 Deluxe Brow Definition Set", category: "makeup", format: "Mixed set: 0.2 g + 0.085 g + 6 ml", descriptor: "Shape \xB7 Define \xB7 Set", image: realVisual.deluxeBrowDefinitionSet, realImage: true, tags: ["Brow Makeup", "3-IN-1", "COMPLETE BROW KIT", "NEW COLLECTION", "Product visual"], briefing: "Everything needed to shape, define and set brows in one coordinated kit. The 3-in-1 Deluxe Brow Definition Set combines an angled Brow Definer for outline and filling, a slim Precision Brow Pencil for finer-looking strokes and detailed definition, and a Clear Brow Gel to help maintain a neat, polished brow appearance. The integrated spoolie supports blending, while the coordinated black-and-pink presentation gives the set a polished retail-ready format for makeup retailers, gifting collections and online beauty stores.", sku: "MU-BROW-SET-003", b2bPrice: "US$2.99 / set", productType: "3-in-1 Eyebrow Makeup Kit", primaryBenefit: "Natural Definition \xB7 Shape \xB7 Fill \xB7 Set", numberOfShades: "[TO CONFIRM]", colorFamily: "Brow Pencil Shades [TO CONFIRM]", finish: "Natural / Polished", setComponents: "3 products: Brow Definer \xB7 Precision Brow Pencil \xB7 Clear Brow Gel", browDefinerSpec: "Angled brow pencil \xB7 0.2 g / 0.007 oz", precisionBrowPencilSpec: "Slim precision tip with built-in spoolie \xB7 0.085 g / 0.003 oz", clearBrowGelSpec: "Clear setting gel with spoolie applicator \xB7 Transparent \xB7 6 ml", ingredients: "[TO CONFIRM]", standardMoq: "12 sets", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Coordinated black brow pencils with soft pink metallic accents, matching pink clear-brow-gel tube and presentation box.", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "16-color-multi-use-complexion-palette", name: "16-Color Multi-Use Complexion Palette", category: "makeup", format: "[TO CONFIRM]", descriptor: "16 Colors \xB7 Conceal \xB7 Correct \xB7 Contour \xB7 Highlight", image: realVisual.multiUseComplexionPalette, realImage: true, tags: ["Face Makeup", "16 COLORS", "MULTI-USE", "PRIVATE LABEL", "Product visual"], briefing: "One compact palette for complexion correction, concealing, contouring and highlighting. This 16-Color Multi-Use Complexion Palette brings together light, medium and deep complexion directions with lighter highlighting shades and orange, lavender and green corrector directions. Its coordinated multi-pan format gives professional makeup kits, beauty retailers and online stores a versatile face-makeup reference in one SKU. The supplied visual shows selected application examples; exact finish, coverage and formula performance remain to be confirmed.", sku: "MU-FACE-PAL-016", b2bPrice: "US$2.99 / pc", productType: "Multi-Use Concealer / Contour / Highlight Palette", primaryBenefit: "Conceal \xB7 Correct \xB7 Contour \xB7 Highlight", numberOfShades: "16", colorFamily: "Light to Deep Complexion Shades + Correctors", paletteFormat: "Compact 16-Pan", finish: "[TO CONFIRM]", coverage: "[TO CONFIRM]", texture: "Cream / Pressed Formula [TO CONFIRM]", shadeOptions: "Light Beige \xB7 Natural Beige \xB7 Warm Beige \xB7 Tan \xB7 Caramel \xB7 Deep Brown \xB7 Highlight shades \xB7 Warm Orange \xB7 Lavender \xB7 Green correctors", shadeCodes: "[TO CONFIRM]", individualPanWeight: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Compact black 16-pan complexion palette with coordinated light-to-deep complexion and corrective shades; supplied visual also shows a retail carton.", privateLabelAvailable: true, privateLabelStatus: "Available according to supplied product information", customLogoStatus: "Available according to supplied product information", customPackagingStatus: "[TO CONFIRM]", customShadesStatus: "[TO CONFIRM]", customizationMoq: "[TO CONFIRM]", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "2-in-1-blush-duo-palette", name: "2-in-1 Blush Duo Palette", category: "makeup", format: "[TO CONFIRM]", descriptor: "2 Shades \xB7 Buildable Cheek Color \xB7 Multi-Shade", image: realVisual.blushDuoPalette, realImage: true, tags: ["Face Makeup", "BLUSH DUO", "5 COLORWAYS", "CUSTOM LOGO", "Product visual"], briefing: "A compact two-pan cheek palette with five visible color directions for flexible makeup assortments. The 2-in-1 Blush Duo Palette pairs two coordinated cheek colors in each soft-pink compact, with visible directions spanning Soft Rose Nude, Baby Pink, Mocha Rose, Berry Pink and Coral Red. Its compact multi-shade presentation suits beauty retail, online makeup stores and curated color-makeup collections. Formula format, finish and precise shade information remain to be confirmed.", sku: "MU-FACE-BLUSH-002", b2bPrice: "US$2.99 / pc", productType: "Blush Duo / Cheek Color Palette", primaryBenefit: "2-in-1 \xB7 Buildable Cheek Color \xB7 Multi-Shade", numberOfShades: "2 cheek colors per compact / 5 visible colorways", colorFamily: "Soft Rose Nude \xB7 Baby Pink \xB7 Mocha Rose \xB7 Berry Pink \xB7 Coral Red", paletteFormat: "Compact 2-Pan", finish: "[TO CONFIRM]", texture: "[TO CONFIRM]", shadeOptions: "01 Soft Rose Nude \xB7 02 Baby Pink \xB7 03 Mocha Rose \xB7 04 Berry Pink \xB7 05 Coral Red", shadeCodes: "[TO CONFIRM]", individualPanWeight: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Soft pink square compact with two rectangular cheek-color pans; supplied visual shows five visible color variations.", privateLabelStatus: "[TO CONFIRM]", customLogoStatus: "Available according to supplied product information", customPackagingStatus: "[TO CONFIRM]", customShadesStatus: "[TO CONFIRM]", customizationMoq: "[TO CONFIRM]", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "creamy-contour-foundation-stick", name: "Creamy Contour & Foundation Stick", category: "makeup", format: "[TO CONFIRM]", descriptor: "5 Shade Directions \xB7 Creamy Stick \xB7 Face Sculpting", image: realVisual.creamyContourFoundationStick, realImage: true, tags: ["Face Makeup", "CONTOUR STICK", "5 SHADE DIRECTIONS", "PRIVATE LABEL", "Product visual"], briefing: "A creamy stick format for contouring and complexion-focused makeup collections. The Creamy Contour & Foundation Stick is supplied in five visible shade directions\u2014Fair, Light, Medium, Tan and Medium Dark\u2014within sleek rose-nude packaging and an angled bullet profile. The compact stick format offers buyers a coordinated face-makeup option for contour and complexion enhancement assortments. Finish, coverage, exact shade codes and formula details remain to be confirmed.", sku: "MU-FACE-STICK-005", b2bPrice: "US$2.99 / pc", productType: "Contour Stick / Foundation Stick", primaryBenefit: "Creamy Stick \xB7 Contour \xB7 Complexion Enhancement", numberOfShades: "5 visible shade directions", colorFamily: "Fair \xB7 Light \xB7 Medium \xB7 Tan \xB7 Medium Dark", finish: "[TO CONFIRM]", coverage: "[TO CONFIRM]", texture: "Creamy Stick", shadeOptions: "Fair \xB7 Light \xB7 Medium \xB7 Tan \xB7 Medium Dark", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Sleek rose-nude rectangular stick packaging with an angled bullet profile; supplied visual shows five visible complexion directions.", privateLabelAvailable: true, privateLabelStatus: "Available according to supplied product information", customLogoStatus: "[TO CONFIRM]", customPackagingStatus: "[TO CONFIRM]", customShadesStatus: "[TO CONFIRM]", customizationMoq: "[TO CONFIRM]", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "12-color-face-contour-correcting-palette", name: "12-Color Face Contour & Correcting Palette", category: "makeup", format: "[TO CONFIRM]", descriptor: "12 Colors \xB7 Sculpt \xB7 Define \xB7 Correct", image: realVisual.faceContourCorrectingPalette, realImage: true, tags: ["Face Makeup", "12 COLORS", "CONTOUR PALETTE", "PRIVATE LABEL", "Product visual"], briefing: "A bold purple compact with twelve visible directions spanning light beige through rich chocolate brown, with bright orange, red and deep red / burgundy accents. This multi-pan format gives buyers a concise contouring and face-makeup color-direction reference for curated face-makeup assortments. The accent pans may be suitable for correcting or artistic face-makeup applications depending on final confirmed formula and shade positioning. Formula structure, finish, coverage, texture, ingredients, precise shade names and codes, and pan weight remain to be confirmed.", sku: "MU-FACE-CONTOUR-012", b2bPrice: "US$2.99 / pc", productType: "Contour Palette / Multi-Use Face Palette", primaryBenefit: "Sculpting \xB7 Contouring \xB7 Correcting", numberOfShades: "12", colorFamily: "Beige \xB7 Tan \xB7 Brown \xB7 Orange \xB7 Red \xB7 Deep Red", paletteFormat: "Compact 12-Pan", finish: "[TO CONFIRM]", coverage: "[TO CONFIRM]", texture: "[TO CONFIRM]", individualPanWeight: "[TO CONFIRM]", vegan: "Vegan positioning according to supplied product information", veganCertification: "[TO CONFIRM]", shadeOptions: "Light Beige \xB7 Soft Sand \xB7 Warm Beige \xB7 Honey Beige \xB7 Golden Tan \xB7 Taupe Brown \xB7 Medium Brown \xB7 Deep Brown \xB7 Rich Chocolate Brown \xB7 Bright Orange \xB7 Red \xB7 Deep Red / Burgundy", shadeCodes: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 pcs", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Bold purple compact with a 12-pan layout; supplied visual shows neutral beige-to-brown directions alongside bright orange, red and deep red / burgundy accents.", privateLabelAvailable: true, privateLabelStatus: "Available according to supplied product information", customLogoStatus: "[TO CONFIRM]", customPackagingStatus: "[TO CONFIRM]", customShadesStatus: "[TO CONFIRM]", customizationMoq: "[TO CONFIRM]", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" },
  { slug: "pure-seduction-fragrance-mist-lotion-set", name: "Pure Seduction Fragrance Mist & Lotion Set", category: "fragrance", format: "2-Piece Set \xB7 250 ml + 236 ml", descriptor: "2-Piece Set \xB7 Fragrance Layering \xB7 Gift Ready", image: realVisual.pureSeductionMistLotionSet, realImage: true, tags: ["2-PIECE SET", "BODY MIST + LOTION", "GIFT READY", "Product visual"], briefing: "A coordinated women\u2019s body-fragrance and body-care duo for everyday layering and gifting. This set pairs a 250 ml Fragrance Mist with a matching 236 ml Fragrance Lotion in a unified pink presentation. The two-piece format gives buyers a clear Body Mist + Lotion option for women\u2019s fragrance collections, gift assortments and beauty retail. Fragrance notes, ingredients and product-specific customization scope remain to be confirmed.", sku: "FR-SET-PS-250236", b2bPrice: "US$3.99 / set", gender: "Women", productType: "2-Piece Fragrance Mist & Body Lotion Set", primaryBenefit: "Body Mist + Lotion \xB7 Fragrance Layering \xB7 Gift Ready", setComponents: "2 pieces: Fragrance Mist \u2014 250 ml / 8.4 fl oz \xB7 Fragrance Lotion \u2014 236 ml / 8 fl oz", fragrance: "[TO CONFIRM]", ingredients: "[TO CONFIRM]", standardMoq: "12 sets", leadTime: "Approx. 7 days", sampleAvailability: "Available", packaging: "Transparent pink fragrance-mist bottle with a gold-tone cap paired with a soft metallic-pink fragrance-lotion tube; supplied visual is a coordinated pink floral gift presentation.", privateLabelStatus: "[TO CONFIRM]", customLogoStatus: "[TO CONFIRM]", customPackagingStatus: "[TO CONFIRM]", customFragranceStatus: "[TO CONFIRM]", customizationMoq: "[TO CONFIRM]", customizationStatus: "[TO CONFIRM]", dataStatus: "confirmed" }
];
var getProduct = (slug) => products.find((product) => product.slug === slug);

// shared/productTerms.ts
function withOrderTerms(product) {
  const price = product.b2bPrice?.match(/^US\$(\d+(?:\.\d+)?)\s*\/\s*(piece|pc|bottle|set)s?$/i);
  const moq = product.standardMoq?.match(/^(\d+)\s+(?:pieces?|pcs|bottles?|sets?)(?:$|\s+per\s)/i);
  return {
    ...product,
    unitPrice: product.unitPrice ?? (price ? Number(price[1]) : void 0),
    minimumOrderQuantity: product.minimumOrderQuantity ?? (moq ? Number(moq[1]) : void 0),
    orderUnit: product.orderUnit ?? (price?.[2] === "set" ? "set" : price?.[2] === "bottle" ? "bottle" : "piece")
  };
}

// server/inquiryProduct.ts
function resolveInquiryProduct(input) {
  const quantity = Number(input.quantity);
  if (!Number.isSafeInteger(quantity) || quantity < 1) throw new Error("Enter a positive whole-number quantity.");
  if (!input.productUrl) return input;
  const url = new URL(input.productUrl);
  const match = url.pathname.match(/^\/products\/([^/]+)\/?$/);
  const source = match && getProduct(match[1]);
  if (!source) throw new Error("Please select a product from the catalogue.");
  const product = withOrderTerms(source);
  const variant = product.variants?.find((item) => item.id === url.searchParams.get("variant"));
  if ((product.variants || url.searchParams.has("variant")) && !variant) throw new Error("Please select a currently available product variant.");
  const minimum = variant?.minimumOrderQuantity ?? product.minimumOrderQuantity;
  if (minimum !== void 0 && quantity < minimum) throw new Error(`Minimum order: ${minimum} pieces for the selected product.`);
  const price = variant?.unitPrice ?? product.unitPrice;
  return {
    ...input,
    productName: variant?.name ?? product.name,
    sku: product.sku,
    productUrl: `https://topperfume.cn/products/${product.slug}${variant ? `?variant=${variant.id}` : ""}`,
    category: product.productType ?? product.category,
    format: variant?.format ?? product.format,
    standardMoq: minimum === void 0 ? "To be confirmed" : `${minimum} ${product.orderUnit ?? "piece"}s`,
    unitPrice: price === void 0 ? "To be confirmed" : `US$${price.toFixed(2)} / ${product.orderUnit ?? "piece"}`,
    subtotal: price === void 0 ? "To be confirmed" : `US$${(price * quantity).toFixed(2)}`
  };
}

// server/routers.ts
var inquiryAttempts = /* @__PURE__ */ new Map();
var inquiryInput = z2.object({
  intent: z2.enum(["sample", "quote", "project"]),
  productName: z2.string().trim().max(180).optional(),
  sku: z2.string().trim().max(120).optional(),
  productUrl: z2.string().url().max(600).optional(),
  category: z2.string().trim().max(80).optional(),
  quantity: z2.string().trim().min(1).max(80),
  countryMarket: z2.string().trim().min(2).max(120),
  customerName: z2.string().trim().min(2).max(120),
  customerEmail: z2.string().trim().email().max(320),
  customerWhatsApp: z2.string().trim().max(80).optional(),
  customizationRequirement: z2.string().trim().max(240).optional(),
  notes: z2.string().trim().max(3e3).optional(),
  website: z2.string().max(200).optional(),
  formStartedAt: z2.number().int()
});
var appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true
      };
    })
  }),
  inquiry: router({
    submit: publicProcedure.input(z2.unknown()).mutation(async ({ ctx, input }) => {
      const parsed = inquiryInput.safeParse(input);
      if (!parsed.success) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "Please complete the required fields with a valid email address." });
      }
      const submittedAt = Date.now();
      const source = ctx.req.ip || ctx.req.socket.remoteAddress || "unknown";
      if (parsed.data.website) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "Unable to accept this submission." });
      }
      if (submittedAt - parsed.data.formStartedAt < 900) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "Please take a moment to complete the inquiry form." });
      }
      if (isRateLimited(inquiryAttempts, source, submittedAt)) {
        throw new TRPCError3({ code: "TOO_MANY_REQUESTS", message: "Too many submissions. Please try again in a few minutes." });
      }
      let verifiedInput;
      try {
        verifiedInput = resolveInquiryProduct(parsed.data);
      } catch (error) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: error instanceof Error ? error.message : "Please check your product selection." });
      }
      if (!ENV.inquiryEnabled || !ENV.resendApiKey || !ENV.inquiryFromEmail) {
        throw new TRPCError3({ code: "PRECONDITION_FAILED", message: "Inquiry delivery is temporarily unavailable. Please use WhatsApp while we restore the service." });
      }
      try {
        const message = await sendInquiryEmail(verifiedInput, {
          apiKey: ENV.resendApiKey,
          fromEmail: ENV.inquiryFromEmail,
          recipient: ENV.inquiryRecipient
        });
        return { success: true, requestId: message.requestId };
      } catch (error) {
        console.error("[Inquiry] Email delivery failed", error instanceof Error ? error.message : "unknown error");
        throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "We could not send your inquiry right now. Please try again or use WhatsApp." });
      }
    })
  })
  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";

// server/db.ts
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";

// drizzle/schema.ts
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";
var users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
});

// server/db.ts
var _db = null;
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }
  try {
    const values = {
      openId: user.openId
    };
    const updateSet = {};
    const textFields = ["name", "email", "loginMethod"];
    const assignNullable = (field) => {
      const value = user[field];
      if (value === void 0) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== void 0) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== void 0) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }
    if (!values.lastSignedIn) {
      values.lastSignedIn = /* @__PURE__ */ new Date();
    }
    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = /* @__PURE__ */ new Date();
    }
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return void 0;
  }
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : void 0;
}

// server/_core/sdk.ts
var isNonEmptyString2 = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    return decodeOAuthState(state).redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString2(openId) || !isNonEmptyString2(appId) || !isNonEmptyString2(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    let sessionToken = cookies.get(COOKIE_NAME);
    if (!sessionToken) {
      const authHeader = req.headers.authorization;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.slice(7);
      }
    }
    const session = await this.verifySession(sessionToken);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/oauth.ts
import { parse as parseCookieHeader2 } from "cookie";
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app2) {
  app2.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    const { nonce } = decodeOAuthState(state);
    const expectedNonce = parseCookieHeader2(req.headers.cookie ?? "")[OAUTH_STATE_COOKIE];
    if (!nonce || nonce !== expectedNonce) {
      res.status(403).json({ error: "invalid oauth state" });
      return;
    }
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/", secure: true, sameSite: "none" });
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
function registerStorageProxy(app2) {
  app2.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/app.ts
function createApp() {
  const app2 = express();
  app2.use((req, res, next) => {
    if (process.env.SITE_INDEXABLE !== "true" || !["topperfume.cn", "www.topperfume.cn"].includes(req.hostname) || req.path.startsWith("/previews/")) res.setHeader("X-Robots-Tag", "noindex, nofollow");
    next();
  });
  app2.use(express.json({ limit: "50mb" }));
  app2.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app2);
  registerOAuthRoutes(app2);
  app2.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  return app2;
}

// server/vercelAdapter.ts
function restoreVercelRequestPath(request) {
  const incomingUrl = request.url ?? "/";
  const url = new URL(incomingUrl, "http://localhost");
  const sourcePath = url.searchParams.get("__path");
  if (!sourcePath || !sourcePath.startsWith("/")) return;
  url.searchParams.delete("__path");
  const search = url.searchParams.toString();
  request.url = `${sourcePath}${search ? `?${search}` : ""}`;
}

// server/vercel.ts
var app = createApp();
function handler(request, response) {
  restoreVercelRequestPath(request);
  return app(request, response);
}
export {
  handler as default
};
