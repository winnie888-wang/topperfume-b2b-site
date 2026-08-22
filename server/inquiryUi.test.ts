import { describe, expect, it } from "vitest";
import { getInquiryDisplayState } from "@shared/inquiryUi";

describe("inquiry display state", () => {
  it("keeps the form visible before a submission succeeds", () => {
    expect(getInquiryDisplayState(false)).toEqual({ showForm: true, showSuccess: false });
  });

  it("switches to the success state without requiring the form subtree to unmount", () => {
    expect(getInquiryDisplayState(true)).toEqual({ showForm: false, showSuccess: true });
  });
});
