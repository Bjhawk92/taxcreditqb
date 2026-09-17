import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqHeader, HqMain, LockedFeature } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { getLockerHome } from "@/lib/locker";

export const Route = createFileRoute("/hq/field-report")({
  component: FieldReport,
});

function FieldReport() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getLockerHome>> | null>(
    null,
  );
  useEffect(() => {
    getLockerHome()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const states = data?.followedStates ?? [];
  const hasPass = Boolean(data?.entitlements.filmRoom);

  return (
    <main id="main">
      <HqHeader
        title="Field Pass"
        sub="Stay current. Know the field. Your three states, QAP documents, redline updates, deadlines, agency notices, and the monthly Field Report."
      />
      <HqMain>
        <section className="border border-line p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Follow 3 States
          </p>
          {states.length ? (
            <p className="mt-3 font-display text-2xl font-semibold">{states.join(" · ")}</p>
          ) : (
            <p className="mt-3 text-ink/75">
              No states selected yet. Choose up to three states so Field Pass can
              watch the QAPs that matter to your pipeline.
            </p>
          )}
          <Button asChild className="mt-6" variant="secondary">
            <Link to="/hq/membership">Choose states</Link>
          </Button>
        </section>

        {hasPass ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <section className="border border-line p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                Current QAP documents
              </p>
              <p className="mt-3 text-ink/80">
                Official QAP, scoring, and application links for the selected
                states will be listed here as they are catalogued.
              </p>
              <Button asChild className="mt-6" variant="secondary">
                <Link to="/tools">QAP directory</Link>
              </Button>
            </section>
            <section className="border border-line p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                QAP redline + change updates
              </p>
              <p className="mt-3 text-ink/80">
                Material QAP, scoring, application, and deadline changes — what
                changed, and links to official sources.
              </p>
              <p className="mt-3 text-sm text-muted">No redline posted this period.</p>
            </section>
            <section className="border border-line p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                Deadlines & agency notices
              </p>
              <p className="mt-3 text-ink/80">
                Application windows, workshops, and HFA notices for followed
                states.
              </p>
              <Button asChild className="mt-6" variant="secondary">
                <Link to="/hq/alerts">Open alerts</Link>
              </Button>
            </section>
            <section className="border border-line p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                Film Room library
              </p>
              <p className="mt-3 text-ink/80">
                Development walkthroughs and practical LIHTC content already in
                the library. No publishing schedule is promised.
              </p>
              <Button asChild className="mt-6" variant="secondary">
                <Link to="/hq/film">Visit the Film Room</Link>
              </Button>
            </section>
          </div>
        ) : (
          <div className="mt-6">
            <LockedFeature
              title="Field Pass intelligence"
              body="QAP documents, redline updates, scoring intelligence, and followed-state notices are included with Field Pass."
              plan="Field Pass"
            />
          </div>
        )}

        <section className="mt-6 border border-line p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            The Field Report
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            Monthly issue in preparation.
          </h2>
          <p className="mt-3 max-w-2xl text-ink/80">
            When an issue is published, it will cover important QAP activity,
            scoring changes, deadlines, and industry developments. No publishing
            schedule is promised here.
          </p>
        </section>

        <section className="mt-6 border border-dashed border-line bg-paper-dim p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Equity Market Snapshot
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            Coming later.
          </h2>
          <p className="mt-3 max-w-2xl text-ink/80">
            Regional LIHTC syndicator and equity pricing intelligence will appear
            here. No pricing is published now.
          </p>
        </section>
      </HqMain>
    </main>
  );
}
