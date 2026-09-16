import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqNav } from "@/components/hq-nav";
import { HqSignIn } from "@/components/hq-sign-in";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getHqHome } from "@/lib/hq";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/hq")({
  head: () =>
    seo({
      title: "Team HQ | Tax Credit QB",
      description:
        "Your private client portal. Resources, conversations and project work in one place.",
    }),
  component: HqLayout,
});

function HqLayout() {
  const { user, isPending } = useCurrentUserState();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    getHqHome()
      .then((d) => setIsAdmin(Boolean(d.membership?.isAdmin)))
      .catch(() => setIsAdmin(false));
  }, [user]);

  if (isPending) {
    return (
      <main id="main" className="mx-auto max-w-lg px-5 py-16">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Team HQ
        </p>
        <p className="mt-4 text-muted">Loading your portal…</p>
      </main>
    );
  }
  if (!user) return <HqSignIn />;
  return (
    <>
      <HqNav isAdmin={isAdmin} />
      <Outlet />
    </>
  );
}
