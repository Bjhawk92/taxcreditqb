import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DealForm } from "@/components/deal-form";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { listDeals } from "@/lib/locker";

export const Route = createFileRoute("/hq/deals")({
  validateSearch: (s: Record<string, unknown>) => ({
    new: s.new === "1" ? "1" : undefined,
  }),
  component: DealsPage,
});

function DealsPage() {
  const { new: showNew } = Route.useSearch();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listDeals>>>([]);
  const [open, setOpen] = useState(showNew === "1");
  useEffect(() => {
    if (showNew === "1") setOpen(true);
  }, [showNew]);

  function load() {
    listDeals()
      .then(setRows)
      .catch(() => setRows([]));
  }
  useEffect(load, []);

  return (
    <main id="main">
      <HqHeader
        title="My Projects"
        sub="Create and manage development profiles. Save site details and open project-specific documents, scoring work, and analysis."
      />
      <HqMain>
        <Button type="button" onClick={() => setOpen((v) => !v)}>
          {open ? "Close form" : "Add a project"}
        </Button>
        {open ? (
          <div className="mt-8">
            <DealForm
              onSaved={(id) => {
                void navigate({
                  to: "/hq/deal/$dealId",
                  params: { dealId: String(id) },
                });
              }}
            />
          </div>
        ) : null}

        <div className="mt-10">
          {rows.length === 0 ? (
            <HqEmpty
              title="No deals yet"
              body="Create a Deal Profile to reuse project facts across checklists, letters, and modeling."
            />
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {rows.map((d) => (
                <li key={d.id} className="border border-line p-6">
                  <p className="font-display text-sm font-semibold uppercase tracking-nav text-muted">
                    {d.stage}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold">{d.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {[d.city, d.state].filter(Boolean).join(", ") || "Location TBD"}
                    {d.deal_type ? ` · ${d.deal_type}` : ""}
                  </p>
                  <Button asChild className="mt-5" variant="secondary">
                    <Link to="/hq/deal/$dealId" params={{ dealId: String(d.id) }}>
                      Open deal
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </HqMain>
    </main>
  );
}
