import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqNav } from "@/components/hq-nav";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getLockerSession } from "@/lib/locker";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/hq")({
  head: () =>
    seo({
      title: "My Locker | Tax Credit QB",
      description:
        "Your deals, Equipment, documents, Game Plan, and QB Access — all in one place.",
    }),
  component: HqLayout,
});

function HqLayout() {
  const { user, isPending } = useCurrentUserState();
  const [session, setSession] = useState<Awaited<ReturnType<typeof getLockerSession>> | null>(
    null,
  );
  useEffect(() => {
    if (!user) return;
    getLockerSession()
      .then(setSession)
      .catch(() => setSession(null));
  }, [user]);

  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  return (
    <>
      <HqNav isAdmin={Boolean(session?.isAdmin)} />
      {session && !session.emailVerified ? (
        <div className="border-b border-line bg-paper-dim">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-3 text-sm md:flex-row md:items-center md:justify-between md:px-8">
            <p className="text-ink/80">
              Email on this account is not marked verified
              {session.email ? ` (${session.email})` : ""}. A mailer is not
              connected yet, so verification links are not sent automatically.
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
    </>
  );
}
