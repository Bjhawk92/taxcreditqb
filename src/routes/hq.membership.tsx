import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { StateWatchPicker } from "@/components/state-watch-picker";
import { Button } from "@/components/ui/button";
import { getLockerHome, saveFollowedStates } from "@/lib/locker";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/membership")({
  component: HqMembership,
});

function HqMembership() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getLockerHome>> | null>(
    null,
  );
  const [followedStates, setFollowedStates] = useState<string[]>([]);
  const [stateNote, setStateNote] = useState<string | null>(null);
  const [savingStates, setSavingStates] = useState(false);
  useEffect(() => {
    getLockerHome()
      .then((home) => {
        setData(home);
        setFollowedStates(home.followedStates ?? []);
      })
      .catch(() => setData(null));
  }, []);
  const e = data?.entitlements;
  const hasPlan = e && e.planId !== "none";

  return (
    <main id="main">
      <HqHeader
        title="Membership & Billing"
        sub="Current plan, included benefits, selected states, renewal, invoices, payment method, and upgrade options."
      />
      <HqMain>
        {!hasPlan ? (
          <div>
            <HqEmpty
              title="No membership on file"
              body="This account does not have an active membership. Choose a plan to add Field Pass, Playbook, or Huddle access."
            />
            <Button asChild className="mt-6">
              <Link to="/game-plans">View Game Plans</Link>
            </Button>
          </div>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="border border-line p-5">
              <dt className="font-display text-sm uppercase tracking-nav text-muted">
                Plan
              </dt>
              <dd className="mt-1 text-xl font-semibold">{e.planName}</dd>
              {e.price ? (
                <p className="mt-1 text-sm text-ink/75">${e.price}/month</p>
              ) : null}
            </div>
            <div className="border border-line p-5">
              <dt className="font-display text-sm uppercase tracking-nav text-muted">
                Status
              </dt>
              <dd className="mt-1 text-xl font-semibold">Active</dd>
              <p className="mt-1 text-sm text-ink/75">
                Renewal {data?.usage.renewalDate ?? "not set"}
              </p>
            </div>
            <div className="border border-line p-5">
              <dt className="font-display text-sm uppercase tracking-nav text-muted">
                Ask the QB
              </dt>
              <dd className="mt-1 text-xl font-semibold">
                {data?.usage.questionsRemaining} of {e.askQuestionsPerMonth} remaining
              </dd>
            </div>
            {e.huddleSessionsPerMonth ? (
              <div className="border border-line p-5">
                <dt className="font-display text-sm uppercase tracking-nav text-muted">
                  Huddles
                </dt>
                <dd className="mt-1 text-xl font-semibold">
                  {data?.usage.huddlesRemaining} of {e.huddleSessionsPerMonth} remaining
                </dd>
              </div>
            ) : null}
          </dl>
        )}
        {hasPlan ? (
          <ul className="mt-8 max-w-2xl space-y-2 text-ink/80">
            <li>Film Room: {e.filmRoom ? "included" : "not included"}</li>
            <li>Playbook resources: {e.playbook ? "included" : "not included"}</li>
            <li>
              Premium Equipment: {e.premiumEquipment ? "included" : "not included"}
            </li>
            <li>
              Member discount on separately scoped work:{" "}
              {e.memberDiscount ? `${e.memberDiscount}%` : "none published"}
            </li>
            <li>
              Monthly deal or presentation review:{" "}
              {e.monthlyReview ? "included with The Huddle" : "not included"}
            </li>
          </ul>
        ) : null}
        <section className="mt-10 max-w-3xl border border-line p-6">
          <h2 className="font-display text-xl font-semibold">Follow 3 States</h2>
          <p className="mt-3 text-ink/75">
            Save up to three states for QAP redlines, scoring intelligence, and
            Field Report coverage.
          </p>
          <div className="mt-4">
            <StateWatchPicker value={followedStates} onChange={setFollowedStates} />
          </div>
          <Button
            type="button"
            className="mt-6"
            variant="secondary"
            disabled={savingStates}
            onClick={() => {
              setSavingStates(true);
              void saveFollowedStates({ data: { states: followedStates } })
                .then((result) => {
                  setFollowedStates(result.states);
                  setStateNote(
                    result.states.length
                      ? `Monitoring ${result.states.join(", ")}.`
                      : "No states selected.",
                  );
                })
                .finally(() => setSavingStates(false));
            }}
          >
            {savingStates ? "Saving…" : "Save states"}
          </Button>
          {stateNote ? <p className="mt-3 text-sm">{stateNote}</p> : null}
          <Button asChild className="mt-6" variant="secondary">
            <Link to="/hq/field-report">Open the Field Report</Link>
          </Button>
        </section>
        <div className="mt-10 max-w-2xl space-y-4 text-ink/80">
          <p>
            Included benefits follow the published Game Plans. Unused huddle time
            does not roll over unless your written plan says so.
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
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Invoices</h2>
            <p className="mt-3 text-ink/75">
              Receipts and invoices appear here once the payment provider is
              connected to this locker. Card data never sits on this site.
            </p>
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/billing">Open billing</Link>
            </Button>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Payment method</h2>
            <p className="mt-3 text-ink/75">
              Update the card on file through the billing portal. Until a
              membership is active, no payment method is stored.
            </p>
            <Button asChild className="mt-6">
              <Link to="/game-plans">Upgrade</Link>
            </Button>
          </section>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/game-plans">Compare Game Plans</Link>
          </Button>
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
