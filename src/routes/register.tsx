import { createFileRoute } from "@tanstack/react-router";
import { HqSignIn } from "@/components/hq-sign-in";
import { seo } from "@/lib/seo";

type RegisterSearch = { mode?: "in" };

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): RegisterSearch => ({
    mode: search.mode === "in" ? "in" : undefined,
  }),
  head: () =>
    seo({
      title: "Get the Playbook | Tax Credit QB",
      description:
        "Create your free Tax Credit QB account to explore the platform, access free resources, and choose the level of support that fits your deal.",
    }),
  component: Register,
});

function Register() {
  const { mode } = Route.useSearch();
  return (
    <HqSignIn
      playbook
      eyebrow="Account"
      title="Get the Playbook"
      sub="Create your free Tax Credit QB account to explore the platform, access free resources, and choose the level of support that fits your deal."
      signupLabel="Create my account"
      initialMode={mode === "in" ? "in" : "up"}
    />
  );
}
