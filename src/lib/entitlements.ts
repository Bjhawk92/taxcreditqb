import { MEMBERSHIPS } from "@/lib/pricing";
import type { AccessKind } from "@/lib/equipment-catalog";

export type PlanId = "film" | "playbook" | "huddle" | "none";

export type Entitlements = {
  planId: PlanId;
  planName: string;
  price: number | null;
  filmRoom: boolean;
  playbook: boolean;
  askQuestionsPerMonth: number;
  huddleSessionsPerMonth: number;
  monthlyReview: boolean;
  memberDiscount: number;
  premiumEquipment: boolean;
};

const NONE: Entitlements = {
  planId: "none",
  planName: "No Game Plan",
  price: null,
  filmRoom: false,
  playbook: false,
  askQuestionsPerMonth: 0,
  huddleSessionsPerMonth: 0,
  monthlyReview: false,
  memberDiscount: 0,
  premiumEquipment: false,
};

const BY_ID: Record<Exclude<PlanId, "none">, Entitlements> = {
  film: {
    planId: "film",
    planName: "Field Pass",
    price: 49,
    filmRoom: true,
    playbook: false,
    askQuestionsPerMonth: 1,
    huddleSessionsPerMonth: 0,
    monthlyReview: false,
    memberDiscount: 0,
    premiumEquipment: false,
  },
  playbook: {
    planId: "playbook",
    planName: "The Playbook",
    price: 295,
    filmRoom: true,
    playbook: true,
    askQuestionsPerMonth: 3,
    huddleSessionsPerMonth: 1,
    monthlyReview: false,
    memberDiscount: 0,
    premiumEquipment: true,
  },
  huddle: {
    planId: "huddle",
    planName: "The Huddle",
    price: 795,
    filmRoom: true,
    playbook: true,
    askQuestionsPerMonth: 4,
    huddleSessionsPerMonth: 2,
    monthlyReview: true,
    memberDiscount: 10,
    premiumEquipment: true,
  },
};

export function normalizePlanId(raw: string | null | undefined): PlanId {
  if (!raw) return "none";
  const v = raw.trim().toLowerCase();
  if (v === "film" || v.includes("film") || v.includes("field pass") || v.includes("field-pass")) {
    return "film";
  }
  if (v === "huddle" || v.includes("huddle")) return "huddle";
  if (v === "playbook" || v.includes("playbook")) return "playbook";
  return "none";
}

export function entitlementsFor(plan: string | null | undefined): Entitlements {
  const id = normalizePlanId(plan);
  if (id === "none") return NONE;
  return BY_ID[id];
}

export function remaining(used: number, allowance: number) {
  return Math.max(0, allowance - Math.max(0, used));
}

export function equipmentAllowed(access: AccessKind, plan: PlanId): boolean {
  if (access === "free" || access === "account" || access === "purchase" || access === "custom") {
    return true;
  }
  if (access === "playbook") return plan === "playbook" || plan === "huddle";
  if (access === "huddle") return plan === "huddle";
  return false;
}

export function equipmentGateLabel(access: AccessKind): string | null {
  if (access === "playbook") return "The Playbook";
  if (access === "huddle") return "The Huddle";
  return null;
}

export { MEMBERSHIPS };
