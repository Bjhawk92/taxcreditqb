export const DEAL_STAGES = [
  "Evaluating Site",
  "Site Controlled",
  "Pre-Application",
  "Application Submitted",
  "Awarded",
  "Preparing to Close",
  "Under Construction",
  "Lease-Up",
  "Stabilized",
] as const;

export const DEAL_TYPES = [
  "9% LIHTC",
  "4% LIHTC + Bonds",
  "New Construction",
  "Acquisition/Rehab",
  "Adaptive Reuse",
  "Other",
] as const;

export const DEAL_PROGRAMS = [
  "HOME",
  "CDBG",
  "HTF",
  "AHP",
  "TIF",
  "PBV / Section 8",
  "Historic Credits",
  "Other",
] as const;

export const MODEL_STATUSES = [
  "draft",
  "information_needed",
  "submitted",
  "in_review",
  "modeling",
  "client_review",
  "delivered",
] as const;

export type ModelStatus = (typeof MODEL_STATUSES)[number];

export function formatModelStatus(status: string) {
  return status.replaceAll("_", " ");
}
