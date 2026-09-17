import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { listDeals, saveDeal } from "@/lib/locker";

export const Route = createFileRoute("/hq/deals")({
  validateSearch: (s: Record<string, unknown>) => ({
    new: s.new === "1" ? "1" : undefined,
  }),
  component: DealsPage,
});

const STAGES = [
  "Evaluating Site",
  "Site Controlled",
  "Pre-Application",
  "Application Submitted",
  "Awarded",
  "Preparing to Close",
  "Under Construction",
  "Lease-Up",
  "Stabilized",
];

const TYPES = [
  "9% LIHTC",
  "4% LIHTC + Bonds",
  "New Construction",
  "Acquisition/Rehab",
  "Adaptive Reuse",
  "Other",
];

function DealsPage() {
  const { new: showNew } = Route.useSearch();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listDeals>>>([]);
  const [open, setOpen] = useState(showNew === "1");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function load() {
    listDeals()
      .then(setRows)
      .catch(() => setRows([]));
  }
  useEffect(load, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    const res = await saveDeal({
      data: {
        name: String(form.get("name") ?? ""),
        city: String(form.get("city") ?? ""),
        state: String(form.get("state") ?? ""),
        address: String(form.get("address") ?? ""),
        county: String(form.get("county") ?? ""),
        hfa: String(form.get("hfa") ?? ""),
        deal_type: String(form.get("deal_type") ?? ""),
        unit_count: String(form.get("unit_count") ?? ""),
        stage: String(form.get("stage") ?? ""),
      },
    });
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setOpen(false);
    load();
  }

  return (
    <main id="main">
      <HqHeader
        title="My Deals"
        sub="Deal Profiles are the connective tissue. Enter what you know. Leave the rest blank."
      />
      <HqMain>
        <Button type="button" onClick={() => setOpen((v) => !v)}>
          {open ? "Close form" : "Add a deal"}
        </Button>
        {open ? (
          <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
            <Field label="Project name" htmlFor="deal-name">
              <Input id="deal-name" name="name" required />
            </Field>
            <Field label="Street / site" htmlFor="deal-address">
              <Input id="deal-address" name="address" />
            </Field>
            <Field label="City" htmlFor="deal-city">
              <Input id="deal-city" name="city" />
            </Field>
            <Field label="State" htmlFor="deal-state">
              <Input id="deal-state" name="state" />
            </Field>
            <Field label="County" htmlFor="deal-county">
              <Input id="deal-county" name="county" />
            </Field>
            <Field label="Housing finance agency" htmlFor="deal-hfa">
              <Input id="deal-hfa" name="hfa" />
            </Field>
            <Field label="Deal type" htmlFor="deal-type">
              <select
                id="deal-type"
                name="deal_type"
                className="min-h-11 w-full border border-line bg-paper px-3"
              >
                <option value="">Select</option>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Unit count" htmlFor="deal-units">
              <Input id="deal-units" name="unit_count" />
            </Field>
            <Field label="Current stage" htmlFor="deal-stage">
              <select
                id="deal-stage"
                name="stage"
                className="min-h-11 w-full border border-line bg-paper px-3"
                defaultValue="Evaluating Site"
              >
                {STAGES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            {error ? <p className="md:col-span-2 text-sm text-ink">{error}</p> : null}
            <div className="md:col-span-2">
              <Button type="submit" disabled={busy}>
                {busy ? "Saving…" : "Save deal"}
              </Button>
            </div>
          </form>
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
