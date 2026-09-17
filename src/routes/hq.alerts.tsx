import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqHeader, HqMain, LockedFeature } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { getLockerHome } from "@/lib/locker";

export const Route = createFileRoute("/hq/alerts")({
  component: AlertsPage,
});

const SAMPLE = [
  {
    kind: "QAP change",
    title: "Sample: QAP scoring set-aside language revised",
    when: "Watch window",
    detail: "Material application and scoring changes for a followed state will land here with a link to the official source.",
  },
  {
    kind: "Deadline",
    title: "Sample: 9% pre-application window",
    when: "Next 45 days",
    detail: "Application, reservation, and award dates from your Deal Profiles and followed-state calendars.",
  },
  {
    kind: "Agency notice",
    title: "Sample: HFA workshop posted",
    when: "When published",
    detail: "Agency notices for the three states on your Field Pass will appear in this lane.",
  },
];

function AlertsPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getLockerHome>> | null>(
    null,
  );
  useEffect(() => {
    getLockerHome()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const notices = data?.notifications ?? [];
  const deals = data?.deals ?? [];
  const premium = Boolean(data?.entitlements.filmRoom);

  return (
    <main id="main">
      <HqHeader
        title="Alerts & Deadlines"
        sub="QAP changes, application windows, reservations, awards, compliance dates, and reminders saved to this locker."
      />
      <HqMain>
        <section className="border border-line p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Locker notices
          </p>
          {notices.length ? (
            <ul className="mt-4 space-y-3">
              {notices.slice(0, 8).map((n) => (
                <li key={n.id} className="border-b border-line pb-3 last:border-0">
                  <p className="font-semibold">{n.title}</p>
                  {n.body ? <p className="mt-1 text-sm text-ink/75">{n.body}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-ink/75">
              No notices yet. Billing, verification, document, and model updates
              will appear here.
            </p>
          )}
        </section>

        <section className="mt-6 border border-line p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Project dates
          </p>
          {deals.length ? (
            <ul className="mt-4 space-y-3">
              {deals.map((d) => (
                <li key={d.id}>
                  <Link
                    to="/hq/deal/$dealId"
                    params={{ dealId: String(d.id) }}
                    className="font-semibold hover:text-steel"
                  >
                    {d.name}
                  </Link>
                  <p className="text-sm text-muted">
                    {[d.city, d.state].filter(Boolean).join(", ") || "Location TBD"}
                    {d.stage ? ` · ${d.stage}` : ""}
                    {d.next_milestone ? ` · ${d.next_milestone}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-ink/75">
              Add a project to pin application, reservation, award, and
              placed-in-service dates to this board.
            </p>
          )}
          <Button asChild className="mt-6" variant="secondary">
            <Link to="/hq/deals" search={{ new: "1" }}>
              Add a project
            </Link>
          </Button>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {SAMPLE.map((item) => (
            <article key={item.title} className="border border-line p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-nav text-muted">
                {item.kind}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{item.when}</p>
              <p className="mt-3 text-sm text-ink/75">{item.detail}</p>
            </article>
          ))}
        </div>

        {premium ? (
          <section className="mt-6 border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Field Pass watch
            </p>
            <p className="mt-3 text-ink/80">
              Monitoring{" "}
              {data?.followedStates?.length
                ? data.followedStates.join(" · ")
                : "no states yet"}
              . QAP redlines, scoring changes, and agency notices for those
              states will populate this list.
            </p>
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/field-report">Open Field Pass</Link>
            </Button>
          </section>
        ) : (
          <div className="mt-6">
            <LockedFeature
              title="QAP redline alerts"
              body="Followed-state QAP, scoring, and deadline alerts are part of Field Pass. Upgrade to watch up to three states."
              plan="Field Pass"
            />
          </div>
        )}
      </HqMain>
    </main>
  );
}
