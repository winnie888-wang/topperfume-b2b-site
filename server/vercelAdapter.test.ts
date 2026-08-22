import { describe, expect, it } from "vitest";
import { restoreVercelRequestPath } from "./vercelAdapter";

describe("restoreVercelRequestPath", () => {
  it("restores the original API path and preserves the tRPC query", () => {
    const request = {
      url: "/api/index?__path=%2Fapi%2Ftrpc%2Finquiry.submit&batch=1&input=%7B%7D",
    };

    restoreVercelRequestPath(request);

    expect(request.url).toBe("/api/trpc/inquiry.submit?batch=1&input=%7B%7D");
  });

  it("leaves direct function calls unchanged", () => {
    const request = { url: "/api/index?batch=1" };

    restoreVercelRequestPath(request);

    expect(request.url).toBe("/api/index?batch=1");
  });
});
