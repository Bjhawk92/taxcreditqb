import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { getLockerSession } from "@/lib/locker";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/verify")({
  component: VerifyEmail,
});

function VerifyEmail() {
  const [session, setSession] = useState<Awaited<ReturnType<typeof getLockerSession>> | null>(
    null,
  );
  useEffect(() => {
    getLockerSession()
      .then(setSession)
      .catch(() => setSession(null));
  }, []);

  return (
    <main id="main">
      <HqHeader
        title="Verify your email"
        sub="Sensitive locker work should sit on a confirmed address. A mailer is not connected yet, so verification links are not sent automatically."
      />
      <HqMain>
        <section className="max-w-xl border border-line p-6">
          <p className="text-ink/80">
            {session?.emailVerified
              ? `${session.email ?? "This address"} is marked verified.`
              : `${session?.email ?? "This address"} is not marked verified. Tax Credit QB can confirm it operationally until the mailer is connected.`}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`mailto:${SITE.emails.info}?subject=${encodeURIComponent("Resend email verification")}&body=${encodeURIComponent(session?.email ?? "")}`}
              className="inline-flex min-h-11 items-center font-display text-sm font-semibold uppercase tracking-nav text-steel"
            >
              Resend verification
            </a>
            <Button asChild variant="secondary">
              <Link to="/hq/account">Change email</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/register" search={{ mode: "in" }}>
                Return to sign in
              </Link>
            </Button>
            <Button asChild>
              <Link to="/hq">Continue to My Locker</Link>
            </Button>
          </div>
        </section>
      </HqMain>
    </main>
  );
}
