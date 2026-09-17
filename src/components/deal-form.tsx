import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { DEAL_PROGRAMS, DEAL_STAGES, DEAL_TYPES } from "@/lib/deal-fields";
import { saveDeal, type DealRow } from "@/lib/locker";

function dateVal(v?: string | null) {
  return v ? v.slice(0, 10) : "";
}

export function DealForm({
  initial,
  onSaved,
}: {
  initial?: Partial<DealRow> | null;
  onSaved: (id: number) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [programs, setPrograms] = useState<string[]>(
    initial?.programs ? initial.programs.split(",").map((s) => s.trim()).filter(Boolean) : [],
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const res = await saveDeal({
        data: {
          id: initial?.id,
          name: String(form.get("name") ?? ""),
          city: String(form.get("city") ?? ""),
          state: String(form.get("state") ?? ""),
          address: String(form.get("address") ?? ""),
          county: String(form.get("county") ?? ""),
          hfa: String(form.get("hfa") ?? ""),
          deal_type: String(form.get("deal_type") ?? ""),
          unit_count: String(form.get("unit_count") ?? ""),
          stage: String(form.get("stage") ?? ""),
          ami_set_asides: String(form.get("ami_set_asides") ?? ""),
          next_milestone: String(form.get("next_milestone") ?? ""),
          programs: programs.join(", "),
          application_due: String(form.get("application_due") ?? ""),
          expected_award: String(form.get("expected_award") ?? ""),
          award_date: String(form.get("award_date") ?? ""),
          expected_closing: String(form.get("expected_closing") ?? ""),
          expected_construction_start: String(form.get("expected_construction_start") ?? ""),
          expected_completion: String(form.get("expected_completion") ?? ""),
          placed_in_service: String(form.get("placed_in_service") ?? ""),
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      if (res.id) onSaved(res.id);
    } catch {
      setError("Could not save that deal. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel md:col-span-2">
        Core deal information
      </p>
      <Field label="Project name" htmlFor="deal-name">
        <Input id="deal-name" name="name" required defaultValue={initial?.name ?? ""} />
      </Field>
      <Field label="Street / site" htmlFor="deal-address" hint="Optional">
        <Input id="deal-address" name="address" defaultValue={initial?.address ?? ""} />
      </Field>
      <Field label="City" htmlFor="deal-city" hint="Optional">
        <Input id="deal-city" name="city" defaultValue={initial?.city ?? ""} />
      </Field>
      <Field label="State" htmlFor="deal-state" hint="Optional">
        <Input id="deal-state" name="state" defaultValue={initial?.state ?? ""} />
      </Field>
      <Field label="County" htmlFor="deal-county" hint="Optional">
        <Input id="deal-county" name="county" defaultValue={initial?.county ?? ""} />
      </Field>
      <Field label="Housing finance agency" htmlFor="deal-hfa" hint="Optional">
        <Input id="deal-hfa" name="hfa" defaultValue={initial?.hfa ?? ""} />
      </Field>
      <Field label="Deal type" htmlFor="deal-type" hint="Optional">
        <select
          id="deal-type"
          name="deal_type"
          className="min-h-11 w-full border border-line bg-paper px-3"
          defaultValue={initial?.deal_type ?? ""}
        >
          <option value="">Select</option>
          {DEAL_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Unit count" htmlFor="deal-units" hint="Optional">
        <Input id="deal-units" name="unit_count" defaultValue={initial?.unit_count ?? ""} />
      </Field>
      <Field label="Current stage" htmlFor="deal-stage">
        <select
          id="deal-stage"
          name="stage"
          className="min-h-11 w-full border border-line bg-paper px-3"
          defaultValue={initial?.stage ?? "Evaluating Site"}
        >
          {DEAL_STAGES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Next milestone" htmlFor="deal-next" hint="Optional">
        <Input
          id="deal-next"
          name="next_milestone"
          defaultValue={initial?.next_milestone ?? ""}
        />
      </Field>

      <p className="mt-4 font-display text-sm font-semibold uppercase tracking-mark text-steel md:col-span-2">
        Optional program information
      </p>
      <Field label="AMI / set-asides" htmlFor="deal-ami" hint="Optional">
        <Input
          id="deal-ami"
          name="ami_set_asides"
          defaultValue={initial?.ami_set_asides ?? ""}
        />
      </Field>
      <div className="md:col-span-2">
        <p className="mb-2 font-display text-sm font-semibold uppercase tracking-nav">
          Other programs
        </p>
        <div className="flex flex-wrap gap-2">
          {DEAL_PROGRAMS.map((item) => {
            const on = programs.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setPrograms((cur) =>
                    on ? cur.filter((x) => x !== item) : [...cur, item],
                  )
                }
                className={
                  on
                    ? "min-h-11 border border-ink bg-ink px-3 text-sm text-paper"
                    : "min-h-11 border border-line bg-paper px-3 text-sm"
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 font-display text-sm font-semibold uppercase tracking-mark text-steel md:col-span-2">
        Important dates — optional
      </p>
      <Field label="Application due" htmlFor="application_due">
        <Input
          id="application_due"
          name="application_due"
          type="date"
          defaultValue={dateVal(initial?.application_due)}
        />
      </Field>
      <Field label="Expected award" htmlFor="expected_award">
        <Input
          id="expected_award"
          name="expected_award"
          type="date"
          defaultValue={dateVal(initial?.expected_award)}
        />
      </Field>
      <Field label="Award date" htmlFor="award_date">
        <Input
          id="award_date"
          name="award_date"
          type="date"
          defaultValue={dateVal(initial?.award_date)}
        />
      </Field>
      <Field label="Expected closing" htmlFor="expected_closing">
        <Input
          id="expected_closing"
          name="expected_closing"
          type="date"
          defaultValue={dateVal(initial?.expected_closing)}
        />
      </Field>
      <Field label="Expected construction start" htmlFor="expected_construction_start">
        <Input
          id="expected_construction_start"
          name="expected_construction_start"
          type="date"
          defaultValue={dateVal(initial?.expected_construction_start)}
        />
      </Field>
      <Field label="Expected completion" htmlFor="expected_completion">
        <Input
          id="expected_completion"
          name="expected_completion"
          type="date"
          defaultValue={dateVal(initial?.expected_completion)}
        />
      </Field>
      <Field label="Placed-in-service target" htmlFor="placed_in_service">
        <Input
          id="placed_in_service"
          name="placed_in_service"
          type="date"
          defaultValue={dateVal(initial?.placed_in_service)}
        />
      </Field>
      {error ? <p className="md:col-span-2 text-sm text-ink">{error}</p> : null}
      <div className="md:col-span-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save deal"}
        </Button>
      </div>
    </form>
  );
}
