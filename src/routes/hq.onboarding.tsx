import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { saveDeveloperProfile } from "@/lib/locker";

export const Route = createFileRoute("/hq/onboarding")({
  component: Onboarding,
});

const EXPERIENCE = [
  "9% LIHTC",
  "4% LIHTC + Bonds",
  "New Construction",
  "Acquisition/Rehab",
  "Adaptive Reuse",
  "Historic Credits",
  "HOME",
  "CDBG",
  "Housing Trust Fund",
  "AHP",
  "PBV / Section 8",
  "Other",
];

function Onboarding() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  async function finish(e: FormEvent<HTMLFormElement> | null, skip = false) {
    e?.preventDefault();
    setBusy(true);
    const form = e?.currentTarget;
    const get = (name: string) =>
      form ? String(new FormData(form).get(name) ?? "") : "";
    await saveDeveloperProfile({
      data: skip
        ? { skip: true }
        : {
            firstName: get("firstName"),
            lastName: get("lastName"),
            companyName: get("companyName"),
            website: get("website"),
            address: get("address"),
            city: get("city"),
            state: get("state"),
            phone: get("phone"),
            email: get("email"),
            statesActive: get("statesActive"),
            developmentsCompleted: get("developmentsCompleted"),
            unitsDeveloped: get("unitsDeveloped"),
            experience: picked,
          },
    });
    setBusy(false);
    void navigate({ to: "/hq" });
  }

  return (
    <main id="main">
      <HqHeader
        title="Build your developer profile."
        sub="Tell Tax Credit QB a little about your company and experience. We'll use this information to make your Equipment, documents, Deal Profiles, and QB Access more useful."
      />
      <HqMain>
        <form onSubmit={(e) => void finish(e)} className="max-w-3xl space-y-8">
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Company
            </legend>
            <Field label="First name" htmlFor="firstName">
              <Input id="firstName" name="firstName" />
            </Field>
            <Field label="Last name" htmlFor="lastName">
              <Input id="lastName" name="lastName" />
            </Field>
            <Field label="Company name" htmlFor="companyName">
              <Input id="companyName" name="companyName" />
            </Field>
            <Field label="Website — optional" htmlFor="website">
              <Input id="website" name="website" />
            </Field>
            <Field label="Business address — optional" htmlFor="address">
              <Input id="address" name="address" />
            </Field>
            <Field label="City" htmlFor="city">
              <Input id="city" name="city" />
            </Field>
            <Field label="State" htmlFor="state">
              <Input id="state" name="state" />
            </Field>
            <Field label="Primary phone" htmlFor="phone">
              <Input id="phone" name="phone" />
            </Field>
            <Field label="Primary email" htmlFor="email">
              <Input id="email" name="email" type="email" />
            </Field>
          </fieldset>
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Development experience
            </legend>
            <Field label="States active in" htmlFor="statesActive">
              <Input id="statesActive" name="statesActive" />
            </Field>
            <Field
              label="Approximate affordable / LIHTC developments completed"
              htmlFor="developmentsCompleted"
            >
              <Input id="developmentsCompleted" name="developmentsCompleted" />
            </Field>
            <Field label="Approximate units developed" htmlFor="unitsDeveloped">
              <Input id="unitsDeveloped" name="unitsDeveloped" />
            </Field>
            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-medium">Applicable experience</p>
              <div className="flex flex-wrap gap-2">
                {EXPERIENCE.map((item) => {
                  const on = picked.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setPicked((cur) =>
                          on ? cur.filter((x) => x !== item) : [...cur, item],
                        )
                      }
                      className={
                        on
                          ? "border border-ink bg-ink px-3 py-2 text-sm text-paper"
                          : "border border-line bg-paper px-3 py-2 text-sm"
                      }
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </fieldset>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save and continue"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={busy}
              onClick={() => void finish(null, true)}
            >
              Skip for now
            </Button>
          </div>
        </form>
      </HqMain>
    </main>
  );
}
