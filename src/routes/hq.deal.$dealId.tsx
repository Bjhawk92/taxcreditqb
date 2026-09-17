import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { getDeal } from "@/lib/locker";

export const Route = createFileRoute("/hq/deal/$dealId")({
  component: DealWorkspace,
});

function DealWorkspace() {
  const { dealId } = Route.useParams();
  const [data, setData] = useState<Awaited<ReturnType<typeof getDeal>> | null>(
    null,
  );
  useEffect(() => {
    getDeal({ data: { id: Number(dealId) } })
      .then(setData)
      .catch(() => setData(null));
  }, [dealId]);
  const deal = data?.deal;

  if (!deal) {
    return (
      <main id="main">
        <HqHeader title="Deal" />
        <HqMain>
          <HqEmpty title="Deal not found" body="This Deal Profile is not on your account." />
        </HqMain>
      </main>
    );
  }

  return (
    <main id="main">
      <HqHeader
        title={String(deal.name)}
        sub={[deal.city, deal.state].filter(Boolean).join(", ") || "Location TBD"}
      />
      <HqMain>
        <p className="font-display text-sm font-semibold uppercase tracking-nav text-muted">
          {String(deal.deal_type || "Deal type TBD")} · {String(deal.stage)}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Overview</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-muted">Units</dt>
                <dd>{String(deal.unit_count || "Not set")}</dd>
              </div>
              <div>
                <dt className="text-muted">HFA</dt>
                <dd>{String(deal.hfa || "Not set")}</dd>
              </div>
              <div>
                <dt className="text-muted">Next milestone</dt>
                <dd>{String(deal.next_milestone || "Not set")}</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm text-muted">
              Confirm current requirements against the applicable QAP, HFA
              guidance, lender, investor, and counsel requirements.
            </p>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Checklists</h2>
            {data?.checklists.length ? (
              <ul className="mt-4 space-y-2">
                {data.checklists.map((c) => (
                  <li key={c.id}>
                    {c.title} — {c.status.replace("_", " ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink/75">No checklists started.</p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/equipment" search={{ deal: dealId, resource: undefined }}>
                Open Equipment
              </Link>
            </Button>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Letters & documents</h2>
            {data?.documents.length ? (
              <ul className="mt-4 space-y-2">
                {data.documents.map((d) => (
                  <li key={d.id}>{d.name}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink/75">No documents saved to this deal.</p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/letters" search={{ deal: dealId }}>
                Letter Builder
              </Link>
            </Button>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Financial model</h2>
            {data?.models[0] ? (
              <p className="mt-4">
                Alkaline Advisors · {data.models[0].status.replace("_", " ")}
              </p>
            ) : (
              <p className="mt-4 text-ink/75">
                No custom model request on this deal.
              </p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/modeling" search={{ deal: dealId }}>
                Build my model
              </Link>
            </Button>
          </section>
        </div>
      </HqMain>
    </main>
  );
}
