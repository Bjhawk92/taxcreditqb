import { createFileRoute, Navigate } from "@tanstack/react-router";
import { HqSignIn } from "@/components/hq-sign-in";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    seo({
      title: "Sign in to Team HQ | Tax Credit QB",
      description: "Welcome to Team HQ. Sign in for your client portal.",
    }),
  component: Login,
});

function Login() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <main id="main" className="mx-auto max-w-lg px-5 py-16">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Team HQ
        </p>
        <p className="mt-4 text-muted">Loading…</p>
      </main>
    );
  }
  if (user) return <Navigate to="/hq" />;
  return <HqSignIn />;
}
