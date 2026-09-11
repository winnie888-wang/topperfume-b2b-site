import { randomUUID } from "node:crypto";

export type InquiryEmailInput = {
  intent: "sample" | "quote" | "project";
  productName?: string;
  sku?: string;
  productUrl?: string;
  category?: string;
  format?: string;
  standardMoq?: string;
  unitPrice?: string;
  subtotal?: string;
  quantity: string;
  countryMarket: string;
  customerName: string;
  customerEmail: string;
  customerWhatsApp?: string;
  customizationRequirement?: string;
  notes?: string;
};

type MailConfig = {
  apiKey: string;
  fromEmail: string;
  recipient: string;
};

const displayValue = (value?: string) => value?.trim() || "Not provided";

export function buildInquiryEmail(input: InquiryEmailInput) {
  const requestId = `TP-${randomUUID().slice(0, 8).toUpperCase()}`;
  const subjectReference = input.productName?.trim() || "General beauty project";
  const subject = `[TopPerfume Inquiry ${requestId}] ${input.intent.toUpperCase()} — ${subjectReference}`;
  const text = [
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
    "",
    "BUYER DETAILS",
    `Customer Name: ${displayValue(input.customerName)}`,
    `Customer Email: ${displayValue(input.customerEmail)}`,
    `Customer WhatsApp: ${displayValue(input.customerWhatsApp)}`,
    `Country / Market: ${displayValue(input.countryMarket)}`,
    `Quantity: ${displayValue(input.quantity)}`,
    `Customization Requirement: ${displayValue(input.customizationRequirement)}`,
    `Notes: ${displayValue(input.notes)}`,
  ].join("\n");

  return { requestId, subject, text };
}

export async function sendInquiryEmail(input: InquiryEmailInput, config: MailConfig) {
  const message = buildInquiryEmail(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `TopPerfume B2B Inquiry <${config.fromEmail}>`,
      to: [config.recipient],
      reply_to: input.customerEmail,
      subject: message.subject,
      text: message.text,
    }),
  });

  if (!response.ok) {
    const upstreamMessage = (await response.text()).slice(0, 500);
    throw new Error(`Resend delivery failed (${response.status}): ${upstreamMessage}`);
  }

  return message;
}

type AttemptStore = Map<string, number[]>;

export function isRateLimited(attempts: AttemptStore, key: string, now = Date.now()) {
  const windowStart = now - 15 * 60 * 1000;
  const recent = (attempts.get(key) ?? []).filter((timestamp) => timestamp > windowStart);
  if (recent.length >= 5) {
    attempts.set(key, recent);
    return true;
  }
  recent.push(now);
  attempts.set(key, recent);
  return false;
}
