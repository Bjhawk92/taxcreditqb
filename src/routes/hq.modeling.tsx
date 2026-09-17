import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { DealPicker } from "@/components/deal-picker";
import { HqHeader, HqMain, LockedFeature } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { formatModelStatus } from "@/lib/deal-fields";
import { getDeal, listDeals, listModelRequests, saveModelRequest } from "@/lib/locker";
import { SITE } from "@/lib/site";

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
      .then((rows) => {
        setDeals(rows);
        if (!search.deal && rows.length === 1) setDealId(String(rows[0].id));
      })
      .catch(() => setDeals([]));
    listModelRequests()
      .then(setExisting)
      .catch(() => setExisting([]));
  }, [search.deal]);

  useEffect(() => {
    if (!dealId) return;
    getDeal({ data: { id: Number(dealId) } }).then((res) => {
      const d = res.deal;
      if (!d) return;
      setPrefill({
        projectName: d.name,
        city: d.city ?? "",
        state: d.state ?? "",
        address: d.address ?? "",
        dealType: d.deal_type ?? "",
        unitCount: d.unit_count ?? "",
        ami: d.ami_set_asides ?? "",
        programs: d.programs ?? "",
        closing: d.expected_closing ?? "",
        start: d.expected_construction_start ?? "",
        completion: d.expected_completion ?? "",
        pis: d.placed_in_service ?? "",
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
    if (res.ok) {
      listModelRequests()
        .then(setExisting)
        .catch(() => undefined);
    }
  }

  return (
    <main id="main">
      <HqHeader
        title="Tools & Models"
        sub="Calculators, scoring tools, feasibility tools, and financial models. Request a customized LIHTC model from Alkaline Advisors when the deal needs it."
      />
      <HqMain>
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <article className="border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Scoring worksheet
            </p>
            <p className="mt-3 text-ink/80">
              Organized QAP scoring information for supported states, used against a Deal Profile.
            </p>
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/tools">Open Equipment scoring</Link>
            </Button>
          </article>
          <LockedFeature
            title="Feasibility calculator"
            body="In-locker feasibility runs will sit here. Until that tool ships, use a Deal Profile and request a custom model."
            plan="The Playbook"
          />
        </div>
        {existing.length ? (
          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold">Custom model requests</h2>
            <ul className="mt-4 space-y-2">
              {existing.map((m) => (
                <li key={m.id} className="border border-line px-4 py-3">
                  <p>
                    Request #{m.id} · {formatModelStatus(m.status)}
                    {m.submitted_at ? ` · submitted ${m.submitted_at}` : ""}
                  </p>
                  {m.customer_visible_notes ? (
                    <p className="mt-2 text-sm text-ink/75">{m.customer_visible_notes}</p>
                  ) : null}
                  <p className="mt-1 text-sm text-muted">Provider: {SITE.alkaline.name}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <h2 className="mb-3 font-display text-2xl font-semibold tracking-tight">
          Request a customized LIHTC model
        </h2>
        <p className="mb-8 max-w-2xl text-ink/75">
          Built by {SITE.alkaline.name}. Pricing, deliverables, and turnaround
          are confirmed in a separate engagement — this intake does not invent
          them.
        </p>
        <form
          key={dealId || "new"}
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
            <p className="mt-1 text-sm text-muted">Required</p>
            <div className="mt-2">
              <DealPicker deals={deals} value={dealId} onChange={setDealId} />
            </div>
          </div>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              2. Project + program
            </legend>
            <Field label="Project name" htmlFor="projectName" hint="From Deal Profile">
              <Input id="projectName" name="projectName" defaultValue={prefill.projectName} />
            </Field>
            <Field label="City" htmlFor="city" hint="From Deal Profile">
              <Input id="city" name="city" defaultValue={prefill.city} />
            </Field>
            <Field label="State" htmlFor="state" hint="From Deal Profile">
              <Input id="state" name="state" defaultValue={prefill.state} />
            </Field>
            <Field label="Site / address" htmlFor="address" hint="Optional">
              <Input id="address" name="address" defaultValue={prefill.address} />
            </Field>
            <Field label="Deal type" htmlFor="dealType" hint="From Deal Profile">
              <Input id="dealType" name="dealType" defaultValue={prefill.dealType} />
            </Field>
            <Field label="Unit count" htmlFor="unitCount" hint="From Deal Profile">
              <Input id="unitCount" name="unitCount" defaultValue={prefill.unitCount} />
            </Field>
            <Field label="9% / 4%" htmlFor="creditType" hint="If applicable">
              <Input id="creditType" name="creditType" />
            </Field>
            <Field label="AMI mix / set-asides" htmlFor="ami" hint="If applicable">
              <Input id="ami" name="ami" defaultValue={prefill.ami} />
            </Field>
            <Field label="Other programs" htmlFor="programs" hint="If applicable">
              <Input id="programs" name="programs" defaultValue={prefill.programs} />
            </Field>
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              3. Development budget
            </legend>
            <Field label="Land / acquisition" htmlFor="land" hint="If applicable">
              <Input id="land" name="land" />
            </Field>
            <Field label="Hard costs" htmlFor="hard" hint="If applicable">
              <Input id="hard" name="hard" />
            </Field>
            <Field label="Soft costs" htmlFor="soft" hint="If applicable">
              <Input id="soft" name="soft" />
            </Field>
            <Field label="Developer fee" htmlFor="fee" hint="If applicable">
              <Input id="fee" name="fee" />
            </Field>
            <Field label="Reserves" htmlFor="reserves" hint="If applicable">
              <Input id="reserves" name="reserves" />
            </Field>
            <Field label="Other uses" htmlFor="otherUses" hint="If applicable">
              <Input id="otherUses" name="otherUses" />
            </Field>
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              4. Operating assumptions
            </legend>
            <Field label="Rents" htmlFor="rents" hint="If applicable">
              <Input id="rents" name="rents" />
            </Field>
            <Field label="Other income" htmlFor="otherIncome" hint="If applicable">
              <Input id="otherIncome" name="otherIncome" />
            </Field>
            <Field label="Vacancy" htmlFor="vacancy" hint="If applicable">
              <Input id="vacancy" name="vacancy" />
            </Field>
            <Field label="Operating expenses" htmlFor="opex" hint="If applicable">
              <Input id="opex" name="opex" />
            </Field>
            <Field label="Replacement reserves" htmlFor="rr" hint="If applicable">
              <Input id="rr" name="rr" />
            </Field>
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              5. Capital stack
            </legend>
            <Field label="Construction debt" htmlFor="cdebt" hint="If applicable">
              <Input id="cdebt" name="cdebt" />
            </Field>
            <Field label="Permanent debt" htmlFor="pdebt" hint="If applicable">
              <Input id="pdebt" name="pdebt" />
            </Field>
            <Field label="Soft debt / grants" htmlFor="softDebt" hint="If applicable">
              <Input id="softDebt" name="softDebt" />
            </Field>
            <Field label="Deferred developer fee" htmlFor="ddf" hint="If applicable">
              <Input id="ddf" name="ddf" />
            </Field>
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              6. LIHTC + equity
            </legend>
            <Field label="Credit assumptions" htmlFor="credits" hint="If applicable">
              <Input id="credits" name="credits" />
            </Field>
            <Field label="Applicable fraction" htmlFor="fraction" hint="If applicable">
              <Input id="fraction" name="fraction" />
            </Field>
            <Field label="Eligible basis notes" htmlFor="basis" hint="If applicable">
              <Input id="basis" name="basis" />
            </Field>
            <Field label="Investor / pricing if known" htmlFor="equity" hint="Optional">
              <Input id="equity" name="equity" />
            </Field>
          </fieldset>

          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              7. Timing
            </legend>
            <Field label="Closing" htmlFor="closing" hint="From Deal Profile">
              <Input id="closing" name="closing" defaultValue={prefill.closing} />
            </Field>
            <Field label="Construction start" htmlFor="start" hint="If applicable">
              <Input id="start" name="start" defaultValue={prefill.start} />
            </Field>
            <Field label="Completion" htmlFor="completion" hint="If applicable">
              <Input id="completion" name="completion" defaultValue={prefill.completion} />
            </Field>
            <Field label="Placed in service" htmlFor="pis" hint="If applicable">
              <Input id="pis" name="pis" defaultValue={prefill.pis} />
            </Field>
            <Field label="Lease-up / stabilization" htmlFor="leaseup" hint="If applicable">
              <Input id="leaseup" name="leaseup" />
            </Field>
          </fieldset>

          <fieldset>
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              8. Supporting files
            </legend>
            <p className="mt-2 text-sm text-ink/75">
              Object storage is not connected. List file names here and email the
              files to {SITE.emails.info} with this deal name. Do not paste account
              numbers or other unnecessary sensitive data.
            </p>
            <Field label="File list / notes" htmlFor="uploads" hint="Optional">
              <Input id="uploads" name="uploads" />
            </Field>
          </fieldset>

          <p className="text-sm text-muted">
            Fields are optional unless Alkaline Advisors later marks them required.
            Overrides on this form do not change the master Deal Profile.
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
