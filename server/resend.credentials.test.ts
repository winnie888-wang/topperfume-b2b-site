import { describe, expect, it } from "vitest";

describe("Resend server credential", () => {
  it("authenticates against the sending endpoint without sending a message", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.INQUIRY_FROM_EMAIL;
    expect(apiKey).toMatch(/^re_/);
    expect(fromEmail).toContain("@");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        subject: "Credential validation only",
        text: "No email is sent by this validation request.",
      }),
    });
    const responseText = await response.text();

    expect(response.status, `Resend status ${response.status}: ${responseText}`).toBe(422);
  }, 15_000);
});
