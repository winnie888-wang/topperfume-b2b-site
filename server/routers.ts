import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ENV } from "./_core/env";
import { isRateLimited, sendInquiryEmail } from "./inquiry";
import { publicProcedure, router } from "./_core/trpc";

const inquiryAttempts = new Map<string, number[]>();
const inquiryInput = z.object({
  intent: z.enum(["sample", "quote", "project"]),
  productName: z.string().trim().max(180).optional(),
  sku: z.string().trim().max(120).optional(),
  productUrl: z.string().url().max(600).optional(),
  category: z.string().trim().max(80).optional(),
  quantity: z.string().trim().min(1).max(80),
  countryMarket: z.string().trim().min(2).max(120),
  customerName: z.string().trim().min(2).max(120),
  customerEmail: z.string().trim().email().max(320),
  customerWhatsApp: z.string().trim().max(80).optional(),
  customizationRequirement: z.string().trim().max(240).optional(),
  notes: z.string().trim().max(3_000).optional(),
  website: z.string().max(200).optional(),
  formStartedAt: z.number().int(),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  inquiry: router({
    submit: publicProcedure.input(z.unknown()).mutation(async ({ ctx, input }) => {
      const parsed = inquiryInput.safeParse(input);
      if (!parsed.success) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Please complete the required fields with a valid email address." });
      }
      const submittedAt = Date.now();
      const source = ctx.req.ip || ctx.req.socket.remoteAddress || "unknown";

      if (parsed.data.website) {
        return { success: true, requestId: "TP-RECEIVED" } as const;
      }
      if (submittedAt - parsed.data.formStartedAt < 900) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Please take a moment to complete the inquiry form." });
      }
      if (isRateLimited(inquiryAttempts, source, submittedAt)) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS", message: "Too many submissions. Please try again in a few minutes." });
      }
      if (!ENV.resendApiKey || !ENV.inquiryFromEmail) {
        throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Inquiry delivery is temporarily unavailable. Please use WhatsApp while we restore the service." });
      }

      try {
        const message = await sendInquiryEmail(parsed.data, {
          apiKey: ENV.resendApiKey,
          fromEmail: ENV.inquiryFromEmail,
          recipient: ENV.inquiryRecipient,
        });
        return { success: true, requestId: message.requestId } as const;
      } catch (error) {
        console.error("[Inquiry] Email delivery failed", error instanceof Error ? error.message : "unknown error");
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "We could not send your inquiry right now. Please try again or use WhatsApp." });
      }
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
