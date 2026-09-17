import { createFileRoute } from "@tanstack/react-router";
import { HqSignIn } from "@/components/hq-sign-in";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/register")({
  head: () =>
    seo({
      title: "Get the Playbook | Tax Credit QB",
      description:
        "Create your free Tax Credit QB account to unlock practical tools, expert insights, and winning strategies for your next LIHTC deal.",
    }),
  component: Register,
});

function Register() {
  return (
    <HqSignIn
      playbook
      eyebrow="Playbook access"
      title="Get the Playbook"
      sub="Create your free Tax Credit QB account to unlock practical tools, expert insights, and winning strategies that help you evaluate opportunities, strengthen your deals, and confidently call the next play."
      signupLabel="Create my free account"
    />
  );
}
