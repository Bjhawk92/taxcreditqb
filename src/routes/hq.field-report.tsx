import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqHeader, HqMain } from "@/components/hq-empty";
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

  return (
    <main id="main">
      <HqHeader
        title="The Field Report"
        sub="Monthly LIHTC intelligence covering QAP activity, scoring changes, deadlines, and industry developments."
      />
      <HqMain>
        <section className="border border-line p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            States you follow
          </p>
          {states.length ? (
            <p className="mt-3 text-ink/80">{states.join(" · ")}</p>
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

        <section className="mt-6 border border-line p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Latest issue
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
            The Field Report is being prepared.
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
            This section will eventually hold regional LIHTC syndicator and
            equity pricing intelligence. No pricing is published here yet.
          </p>
        </section>
      </HqMain>
    </main>
  );
}
