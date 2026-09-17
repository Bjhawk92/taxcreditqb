import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { getHqHome } from "@/lib/hq";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/membership")({
  component: HqMembership,
});

function HqMembership() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getHqHome>> | null>(
    null,
  );
  useEffect(() => {
    getHqHome()
      .then(setData)
      .catch(() => setData(null));
  }, []);
  const m = data?.membership;
  const hasPlan = Boolean(m?.plan);

  return (
    <main id="main">
      <HqHeader
        title="My membership"
        sub="What is included, what is not, and how much consulting remains."
      />
      <HqMain>
        {!hasPlan ? (
          <div>
            <HqEmpty
              title="No membership on file"
              body="This account does not have an active membership. Choose a plan to add Film Room, Playbook, or Huddle access."
            />
            <Button asChild className="mt-6">
              <Link to="/access">Inquire about membership</Link>
            </Button>
          </div>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="border border-line p-5">
              <dt className="font-display text-sm uppercase tracking-nav text-muted">
                Plan
              </dt>
              <dd className="mt-1 text-xl font-semibold">{m?.plan}</dd>
            </div>
            <div className="border border-line p-5">
              <dt className="font-display text-sm uppercase tracking-nav text-muted">
                Consulting remaining
              </dt>
              <dd className="mt-1 text-xl font-semibold">
                {m?.consultRemaining} of {m?.consultAllowance} sessions
                remaining this period
              </dd>
            </div>
            <div className="border border-line p-5">
              <dt className="font-display text-sm uppercase tracking-nav text-muted">
                Renewal
              </dt>
              <dd className="mt-1 text-xl font-semibold">
                {m?.renewalDate ?? "Not set"}
              </dd>
            </div>
            {m?.company ? (
              <div className="border border-line p-5">
                <dt className="font-display text-sm uppercase tracking-nav text-muted">
                  Company
                </dt>
                <dd className="mt-1 text-xl font-semibold">{m.company}</dd>
              </div>
            ) : null}
          </dl>
        )}
        <div className="mt-10 max-w-2xl space-y-4 text-ink/80">
          <p>
            Included when assigned: Film Room access on every plan. Playbook
            members also receive the presentation templates and one 30-minute
            virtual strategy session each month. Huddle members receive two
            45-minute sessions and one monthly deal or presentation review.
            Unused time does not roll over unless your written plan says so.
          </p>
          <p>
            Custom decks, in-person meeting attendance, modeling, and retainers are
            separate engagements. Member rates apply only under the terms of the
            assigned plan.
          </p>
          <p>
            Subscription changes go through the payment provider. For billing
            questions, write {SITE.emails.info}.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/hq/billing">Manage billing</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/advisory">Inquire about additional services</Link>
          </Button>
        </div>
      </HqMain>
    </main>
  );
}
