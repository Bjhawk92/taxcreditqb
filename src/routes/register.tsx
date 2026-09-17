import { createFileRoute } from "@tanstack/react-router";
import { HqSignIn } from "@/components/hq-sign-in";
import { seo } from "@/lib/seo";

const PLANS = ["film", "playbook", "huddle"] as const;
type PlanId = (typeof PLANS)[number];

type RegisterSearch = { mode?: "in"; plan?: PlanId };

const PLAN_COPY: Record<
  PlanId,
  { title: string; sub: string; signupLabel: string }
> = {
  film: {
    title: "Get started",
    sub: "Create your Tax Credit QB account to subscribe to Film Room + Ask the QB.",
    signupLabel: "Create my account",
  },
  playbook: {
    title: "Get the Playbook",
    sub: "Create your Tax Credit QB account to subscribe to The Playbook.",
    signupLabel: "Create my account",
  },
  huddle: {
    title: "Join the Huddle",
    sub: "Create your Tax Credit QB account to subscribe to The Huddle.",
    signupLabel: "Create my account",
  },
};

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => ({
    mode: search.mode === "in" ? "in" : undefined,
    plan: PLANS.includes(search.plan as PlanId)
      ? (search.plan as PlanId)
      : undefined,
  }),
  head: () =>
    seo({
      title: "Get the Playbook | Tax Credit QB",
      description:
        "Create your Tax Credit QB account after you choose a Game Plan. Compare memberships, pricing, and benefits first if you have not already.",
    }),
  component: Register,
});

function Register() {
  const { mode, plan } = Route.useSearch();
  const copy = plan ? PLAN_COPY[plan] : undefined;
  return (
    <HqSignIn
      playbook
      eyebrow="Account"
      title={copy?.title ?? "Get the Playbook"}
      sub={
        copy?.sub ??
        "Create your Tax Credit QB account to access the platform. If you have not compared memberships yet, view Game Plans first."
      }
      signupLabel={copy?.signupLabel ?? "Create my account"}
      initialMode={mode === "in" ? "in" : "up"}
    />
  );
}
