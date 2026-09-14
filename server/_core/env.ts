export const ENV = {
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
  inquiryRecipient: process.env.INQUIRY_TO_EMAIL ?? "melody888666@yeah.net",
};
