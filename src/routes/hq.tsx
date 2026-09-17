import { Outlet, createFileRoute, Link, Navigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqNav } from "@/components/hq-nav";
import { HqSignIn } from "@/components/hq-sign-in";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getLockerSession } from "@/lib/locker";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/hq")({
  head: () =>
    seo({
      title: "Locker Room | Tax Credit QB",
      description:
        "Secure member dashboard for Tax Credit QB. Projects, Field Pass, Equipment, tools, alerts, membership, and company settings.",
    }),
  component: HqLayout,
});

function HqLayout() {
  const { user, isPending } = useCurrentUserState();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [session, setSession] = useState<Awaited<ReturnType<typeof getLockerSession>> | null>(
    null,
  );
  const [sessionReady, setSessionReady] = useState(false);
  useEffect(() => {
    if (!user) {
      setSessionReady(true);
      return;
    }
    setSessionReady(false);
    getLockerSession()
      .then(setSession)
      .catch(() => setSession(null))
      .finally(() => setSessionReady(true));
  }, [user]);

  if (isPending || !sessionReady) return null;
  if (!user) {
    return (
      <HqSignIn
        eyebrow="Locker Room"
        title="Enter the Locker Room."
        sub="Sign in to your dashboard, or create an account. New members verify email and complete a company profile before taking the field."
        signupLabel="Create my locker"
        initialMode="in"
      />
    );
  }

  const skipOnboarding =
    pathname.startsWith("/hq/onboarding") || pathname.startsWith("/hq/verify");
  if (session && !session.onboardingComplete && !skipOnboarding) {
    return <Navigate to="/hq/onboarding" />;
  }

  return (
    <div className="md:flex md:min-h-[70vh]">
      <HqNav isAdmin={Boolean(session?.isAdmin)} />
      <div className="min-w-0 flex-1">
        {session && !session.emailVerified ? (
          <div className="border-b border-line bg-paper-dim">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-3 text-sm md:flex-row md:items-center md:justify-between md:px-8">
              <p className="text-ink/80">
                Email on this account is not marked verified
                {session.email ? ` (${session.email})` : ""}. Confirm the address
                so notices and Field Pass updates can reach the right locker.
              </p>
              <Link
                to="/hq/verify"
                className="font-display text-sm font-semibold uppercase tracking-nav text-steel"
              >
                Email status
              </Link>
            </div>
          </div>
        ) : null}
        <Outlet />
      </div>
    </div>
  );
}
