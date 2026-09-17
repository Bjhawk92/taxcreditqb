import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DealForm } from "@/components/deal-form";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { formatModelStatus } from "@/lib/deal-fields";
import { getDeal } from "@/lib/locker";
import { dealNextPlay } from "@/lib/next-play";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hq/deal/$dealId")({
  component: DealWorkspace,
});

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "equipment", label: "Equipment" },
  { id: "checklists", label: "Checklists" },
  { id: "documents", label: "Documents" },
  { id: "letters", label: "Letters" },
  { id: "presentations", label: "Presentations" },
  { id: "model", label: "Financial model" },
  { id: "qb", label: "QB Access" },
  { id: "activity", label: "Activity" },
] as const;

function DealWorkspace() {
  const { dealId } = Route.useParams();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");
  const [editing, setEditing] = useState(false);
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<typeof getDeal>> | null>(
    null,
  );
  function load() {
    getDeal({ data: { id: Number(dealId) } })
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setReady(true));
  }
  useEffect(() => {
    setReady(false);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealId]);
  const deal = data?.deal;

  if (!ready) {
    return (
      <main id="main">
        <HqHeader title="Deal" sub="Loading this Deal Profile." />
        <HqMain>
          <p className="text-ink/75">Loading…</p>
        </HqMain>
      </main>
    );
  }

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

  const next = dealNextPlay(
    deal,
    (data?.checklists ?? []).map((c) => ({ ...c, deal_id: deal.id })),
    (data?.outstanding ?? []).map((o) => ({ ...o, deal_id: deal.id })),
  );

  const dates = [
    ["Application due", deal.application_due],
    ["Expected award", deal.expected_award],
    ["Award date", deal.award_date],
    ["Expected closing", deal.expected_closing],
    ["Construction start", deal.expected_construction_start],
    ["Expected completion", deal.expected_completion],
    ["Placed in service", deal.placed_in_service],
  ].filter(([, v]) => v);

  return (
    <main id="main">
      <HqHeader
        title={deal.name}
        sub={[deal.city, deal.state].filter(Boolean).join(", ") || "Location TBD"}
      />
      <div className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto px-5 md:px-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center border-b-2 border-transparent font-display text-sm font-semibold uppercase tracking-nav text-muted",
                tab === t.id && "border-ink text-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <HqMain>
        <p className="font-display text-sm font-semibold uppercase tracking-nav text-muted">
          {deal.deal_type || "Deal type TBD"} · {deal.stage}
        </p>

        {tab === "overview" ? (
          <div className="mt-8 space-y-6">
            <section className="border border-line p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                Next play
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">{next.title}</h2>
              <p className="mt-2 text-ink/75">{next.body}</p>
              <p className="mt-3 text-sm text-muted">
                Confirm current requirements against the applicable QAP, HFA
                guidance, lender, investor, and counsel requirements.
              </p>
              <Button asChild className="mt-6">
                <a href={next.to}>Open next play</a>
              </Button>
            </section>
            <div className="grid gap-4 md:grid-cols-2">
              <section className="border border-line p-6">
                <h2 className="font-display text-xl font-semibold">Overview</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="text-muted">Units</dt>
                    <dd>{deal.unit_count || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">HFA</dt>
                    <dd>{deal.hfa || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Programs</dt>
                    <dd>{deal.programs || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">AMI / set-asides</dt>
                    <dd>{deal.ami_set_asides || "Not set"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Next milestone</dt>
                    <dd>{deal.next_milestone || "Not set"}</dd>
                  </div>
                </dl>
                <Button
                  type="button"
                  className="mt-6"
                  variant="secondary"
                  onClick={() => setEditing((v) => !v)}
                >
                  {editing ? "Close editor" : "Edit deal"}
                </Button>
              </section>
              <section className="border border-line p-6">
                <h2 className="font-display text-xl font-semibold">Important dates</h2>
                {dates.length ? (
                  <dl className="mt-4 space-y-2 text-sm">
                    {dates.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-muted">{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="mt-4 text-ink/75">No dates recorded yet.</p>
                )}
                <h3 className="mt-6 font-display text-lg font-semibold">Outstanding items</h3>
                {data?.outstanding.length ? (
                  <ul className="mt-2 space-y-1 text-sm">
                    {data.outstanding.slice(0, 6).map((item) => (
                      <li key={item.label}>{item.label}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-ink/75">No outstanding checklist items.</p>
                )}
              </section>
            </div>
            {editing ? (
              <DealForm
                initial={deal}
                onSaved={() => {
                  setEditing(false);
                  load();
                }}
              />
            ) : null}
          </div>
        ) : null}

        {tab === "equipment" || tab === "checklists" ? (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">Checklists</h2>
            {data?.checklists.length ? (
              <ul className="mt-4 space-y-2">
                {data.checklists.map((c) => (
                  <li key={c.id} className="border border-line px-4 py-3">
                    {c.title} — {c.status.replace("_", " ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink/75">No checklists started.</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link
                  to="/hq/equipment"
                  search={{ deal: dealId, resource: "pre-application" }}
                >
                  Pre-application
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/hq/equipment" search={{ deal: dealId, resource: "post-award" }}>
                  Post-award
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/hq/equipment" search={{ deal: dealId, resource: "deal" }}>
                  Deal checklist
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/hq/equipment" search={{ deal: dealId, resource: "site-control" }}>
                  Site control
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <a href={`/playbook/builder?deal=${encodeURIComponent(dealId)}`}>
                  Presentation Builder
                </a>
              </Button>
            </div>
          </section>
        ) : null}

        {tab === "documents" ? (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">Documents</h2>
            {data?.documents.length ? (
              <ul className="mt-4 space-y-2">
                {data.documents.map((d) => (
                  <li key={d.id}>
                    {d.name}{" "}
                    <span className="text-sm text-muted">· {d.doc_type}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink/75">No documents saved to this deal.</p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/documents">Open My Documents</Link>
            </Button>
          </section>
        ) : null}

        {tab === "letters" ? (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">Letters</h2>
            {data?.documents.filter((d) => d.doc_type === "letter").length ? (
              <ul className="mt-4 space-y-2">
                {data.documents
                  .filter((d) => d.doc_type === "letter")
                  .map((d) => (
                    <li key={d.id}>{d.name}</li>
                  ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink/75">No letters saved to this deal.</p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/letters" search={{ deal: dealId }}>
                Letter Builder
              </Link>
            </Button>
          </section>
        ) : null}

        {tab === "presentations" ? (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">Presentations</h2>
            <p className="mt-2 text-ink/75">
              Presentation Builder still uses the public intake. Select this deal
              there so Tax Credit QB starts from known project facts.
            </p>
            {data?.documents.filter((d) => d.doc_type === "presentation").length ? (
              <ul className="mt-4 space-y-2">
                {data.documents
                  .filter((d) => d.doc_type === "presentation")
                  .map((d) => (
                    <li key={d.id}>{d.name}</li>
                  ))}
              </ul>
            ) : (
              <p className="mt-4 text-ink/75">No presentation briefs on this deal yet.</p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <a href={`/playbook/builder?deal=${encodeURIComponent(dealId)}`}>
                Presentation Builder
              </a>
            </Button>
          </section>
        ) : null}

        {tab === "model" ? (
          <section className="mt-8 border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Financial model</h2>
            <p className="mt-2 text-sm text-muted">Provider: Alkaline Advisors</p>
            {data?.models[0] ? (
              <p className="mt-4">
                Status: {formatModelStatus(data.models[0].status)}
                {data.models[0].submitted_at
                  ? ` · submitted ${data.models[0].submitted_at}`
                  : ""}
              </p>
            ) : (
              <p className="mt-4 text-ink/75">No custom model request on this deal.</p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/modeling" search={{ deal: dealId }}>
                Build my model
              </Link>
            </Button>
          </section>
        ) : null}

        {tab === "qb" ? (
          <section className="mt-8 space-y-4">
            <p className="text-ink/80">
              Ask a question or schedule a huddle using this Deal Profile so the
              team does not have to re-enter the project.
            </p>
            {data?.questions[0] ? (
              <ul className="space-y-2 text-sm">
                {data.questions.map((q) => (
                  <li key={q.id} className="border border-line px-4 py-3">
                    {q.status} — {q.body.slice(0, 160)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-ink/75">No Ask the QB activity on this deal yet.</p>
            )}
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/hq/messages" search={{ deal: dealId }}>
                  Ask the QB
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/hq/huddle" search={{ deal: dealId }}>
                  Schedule a huddle
                </Link>
              </Button>
            </div>
          </section>
        ) : null}

        {tab === "activity" ? (
          <section className="mt-8 space-y-4">
            <h2 className="font-display text-xl font-semibold">Activity</h2>
            <p className="text-sm text-muted">
              Recent questions, huddles, documents, and model requests on this deal.
            </p>
            <ul className="space-y-2 text-sm">
              {(data?.questions ?? []).map((q) => (
                <li key={`q-${q.id}`} className="border border-line px-4 py-3">
                  Ask the QB · {q.status} — {q.body.slice(0, 140)}
                </li>
              ))}
              {(data?.huddles ?? []).map((h) => (
                <li key={`h-${h.id}`} className="border border-line px-4 py-3">
                  Huddle · {h.status} — {h.question.slice(0, 140)}
                </li>
              ))}
              {(data?.documents ?? []).map((d) => (
                <li key={`d-${d.id}`} className="border border-line px-4 py-3">
                  Document · {d.doc_type} — {d.name}
                </li>
              ))}
              {(data?.models ?? []).map((m) => (
                <li key={`m-${m.id}`} className="border border-line px-4 py-3">
                  Model · {formatModelStatus(m.status)}
                </li>
              ))}
            </ul>
            {!data?.questions.length &&
            !data?.huddles.length &&
            !data?.documents.length &&
            !data?.models.length ? (
              <p className="text-ink/75">No activity recorded on this deal yet.</p>
            ) : null}
          </section>
        ) : null}
      </HqMain>
    </main>
  );
}
