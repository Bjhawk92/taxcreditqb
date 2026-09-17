import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { getDeal, listDeals, listModelRequests, saveModelRequest } from "@/lib/locker";

export const Route = createFileRoute("/hq/modeling")({
  validateSearch: (s: Record<string, unknown>) => ({
    deal: typeof s.deal === "string" ? s.deal : undefined,
  }),
  component: ModelingIntake,
});

function ModelingIntake() {
  const search = Route.useSearch();
  const [deals, setDeals] = useState<Awaited<ReturnType<typeof listDeals>>>([]);
  const [existing, setExisting] = useState<Awaited<ReturnType<typeof listModelRequests>>>(
    [],
  );
  const [dealId, setDealId] = useState(search.deal ?? "");
  const [msg, setMsg] = useState<string | null>(null);
  const [prefill, setPrefill] = useState<Record<string, string>>({});

  useEffect(() => {
    listDeals()
      .then(setDeals)
      .catch(() => setDeals([]));
    listModelRequests()
      .then(setExisting)
      .catch(() => setExisting([]));
  }, []);

  useEffect(() => {
    if (!dealId) return;
    getDeal({ data: { id: Number(dealId) } }).then((res) => {
      const d = res.deal;
      if (!d) return;
      setPrefill({
        projectName: d.name,
        city: d.city ?? "",
        state: d.state ?? "",
        dealType: d.deal_type ?? "",
        unitCount: d.unit_count ?? "",
      });
    });
  }, [dealId]);

  async function onSubmit(e: FormEvent<HTMLFormElement>, submit: boolean) {
    e.preventDefault();
    if (!dealId) return;
    const form = new FormData(e.currentTarget);
    const intake: Record<string, string> = {};
    form.forEach((v, k) => {
      intake[k] = String(v);
    });
    const res = await saveModelRequest({
      data: { dealId: Number(dealId), intake, submit },
    });
    setMsg(
      res.ok
        ? submit
          ? "Submitted to Tax Credit QB for handoff to Alkaline Advisors."
          : "Draft saved. You can continue later."
        : res.error,
    );
  }

  return (
    <main id="main">
      <HqHeader
        title="Custom LIHTC Model"
        sub="Built by Alkaline Advisors. Pricing, deliverables, and turnaround are confirmed in a separate engagement — this intake does not invent them."
      />
      <HqMain>
        {existing.length ? (
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold">Existing requests</h2>
            <ul className="mt-4 space-y-2">
              {existing.map((m) => (
                <li key={m.id} className="border border-line px-4 py-3">
                  Request #{m.id} · {m.status.replace("_", " ")}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <form
          className="max-w-3xl space-y-8"
          onSubmit={(e) => {
            const intent = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
            void onSubmit(e, intent?.value === "submit");
          }}
        >
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              1. Select the deal
            </p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <select
                className="min-h-11 border border-line bg-paper px-3"
                value={dealId}
                onChange={(e) => setDealId(e.target.value)}
                name="dealSelect"
              >
                <option value="">Which deal are you working on?</option>
                {deals.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <Button asChild variant="secondary">
                <Link to="/hq/deals" search={{ new: "1" }}>
                  Create new deal
                </Link>
              </Button>
            </div>
          </div>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              2. Project + program
            </legend>
            <Field label="Project name" htmlFor="projectName">
              <Input id="projectName" name="projectName" defaultValue={prefill.projectName} />
            </Field>
            <Field label="City" htmlFor="city">
              <Input id="city" name="city" defaultValue={prefill.city} />
            </Field>
            <Field label="State" htmlFor="state">
              <Input id="state" name="state" defaultValue={prefill.state} />
            </Field>
            <Field label="Deal type" htmlFor="dealType">
              <Input id="dealType" name="dealType" defaultValue={prefill.dealType} />
            </Field>
            <Field label="Unit count" htmlFor="unitCount">
              <Input id="unitCount" name="unitCount" defaultValue={prefill.unitCount} />
            </Field>
            <Field label="9% / 4%" htmlFor="creditType">
              <Input id="creditType" name="creditType" />
            </Field>
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              3. Development budget — if applicable
            </legend>
            <Field label="Land / acquisition" htmlFor="land">
              <Input id="land" name="land" />
            </Field>
            <Field label="Hard costs" htmlFor="hard">
              <Input id="hard" name="hard" />
            </Field>
            <Field label="Soft costs" htmlFor="soft">
              <Input id="soft" name="soft" />
            </Field>
            <Field label="Developer fee" htmlFor="fee">
              <Input id="fee" name="fee" />
            </Field>
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              4. Operations + capital stack — if applicable
            </legend>
            <Field label="Rents / other income notes" htmlFor="ops">
              <Input id="ops" name="ops" />
            </Field>
            <Field label="Construction / permanent debt" htmlFor="debt">
              <Input id="debt" name="debt" />
            </Field>
            <Field label="Equity / pricing if known" htmlFor="equity">
              <Input id="equity" name="equity" />
            </Field>
            <Field label="Timing notes" htmlFor="timing">
              <Input id="timing" name="timing" />
            </Field>
          </fieldset>

          <p className="text-sm text-muted">
            Fields are optional unless Alkaline Advisors later marks them required.
            Do not email sensitive financials if this intake can carry them.
          </p>
          {msg ? <p className="text-sm">{msg}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" name="intent" value="draft" variant="secondary" disabled={!dealId}>
              Save and continue later
            </Button>
            <Button type="submit" name="intent" value="submit" disabled={!dealId}>
              Submit to Alkaline Advisors
            </Button>
          </div>
        </form>
      </HqMain>
    </main>
  );
}
