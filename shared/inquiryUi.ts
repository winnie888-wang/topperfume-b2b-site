export function getInquiryDisplayState(submitted: boolean) {
  return {
    showForm: !submitted,
    showSuccess: submitted,
  } as const;
}
