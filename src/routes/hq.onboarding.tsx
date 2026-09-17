import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { getAccountProfile, saveDeveloperProfile } from "@/lib/locker";

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
  const [ready, setReady] = useState(false);
  const [prefill, setPrefill] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    website: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    statesActive: "",
    developmentsCompleted: "",
    unitsDeveloped: "",
  });

  useEffect(() => {
    let stored: { firstName?: string; lastName?: string; email?: string } = {};
    try {
      stored = JSON.parse(window.sessionStorage.getItem("locker.signup") || "{}") as typeof stored;
    } catch {
      stored = {};
    }
    getAccountProfile()
      .then((p) => {
        const nameParts = (p.name ?? "").trim().split(/\s+/);
        setPrefill({
          firstName:
            p.member?.first_name || stored.firstName || nameParts[0] || "",
          lastName:
            p.member?.last_name ||
            stored.lastName ||
            nameParts.slice(1).join(" ") ||
            "",
          companyName: p.company?.name || p.member?.company || "",
          website: p.company?.website || "",
          address: p.company?.address || "",
          city: p.company?.city || "",
          state: p.company?.state || "",
          phone: p.member?.phone || p.company?.phone || "",
          email: p.email || stored.email || p.company?.email || "",
          statesActive: p.profile?.states_active || "",
          developmentsCompleted: p.profile?.developments_completed || "",
          unitsDeveloped: p.profile?.units_developed || "",
        });
        if (p.profile?.experience) {
          setPicked(
            p.profile.experience
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          );
        }
      })
      .catch(() => {
        setPrefill((cur) => ({
          ...cur,
          firstName: stored.firstName || cur.firstName,
          lastName: stored.lastName || cur.lastName,
          email: stored.email || cur.email,
        }));
      })
      .finally(() => setReady(true));
  }, []);

  async function finish(e: FormEvent<HTMLFormElement> | null, skip = false) {
    e?.preventDefault();
    const form = e?.currentTarget;
    const get = (name: string) =>
      form ? String(new FormData(form).get(name) ?? "") : "";
    setBusy(true);
    try {
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
      try {
        window.sessionStorage.removeItem("locker.signup");
      } catch {
        /* ignore */
      }
      void navigate({ to: "/hq" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main">
      <HqHeader
        title="Build your developer profile."
        sub="Tell Tax Credit QB a little about your company and experience. We'll use this information to make your Equipment, documents, Deal Profiles, and QB Access more useful."
      />
      <HqMain>
        <form key={ready ? "ready" : "loading"} onSubmit={(e) => void finish(e)} className="max-w-3xl space-y-8">
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Company
            </legend>
            <Field label="First name" htmlFor="firstName">
              <Input id="firstName" name="firstName" defaultValue={prefill.firstName} />
            </Field>
            <Field label="Last name" htmlFor="lastName">
              <Input id="lastName" name="lastName" defaultValue={prefill.lastName} />
            </Field>
            <Field label="Company name" htmlFor="companyName">
              <Input id="companyName" name="companyName" defaultValue={prefill.companyName} />
            </Field>
            <Field label="Website — optional" htmlFor="website">
              <Input id="website" name="website" defaultValue={prefill.website} />
            </Field>
            <Field label="Business address — optional" htmlFor="address">
              <Input id="address" name="address" defaultValue={prefill.address} />
            </Field>
            <Field label="City" htmlFor="city">
              <Input id="city" name="city" defaultValue={prefill.city} />
            </Field>
            <Field label="State" htmlFor="state">
              <Input id="state" name="state" defaultValue={prefill.state} />
            </Field>
            <Field label="Primary phone" htmlFor="phone">
              <Input id="phone" name="phone" defaultValue={prefill.phone} />
            </Field>
            <Field label="Primary email" htmlFor="email">
              <Input id="email" name="email" type="email" defaultValue={prefill.email} />
            </Field>
          </fieldset>
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Development experience
            </legend>
            <Field label="States active in" htmlFor="statesActive">
              <Input id="statesActive" name="statesActive" defaultValue={prefill.statesActive} />
            </Field>
            <Field
              label="Approximate affordable / LIHTC developments completed"
              htmlFor="developmentsCompleted"
            >
              <Input
                id="developmentsCompleted"
                name="developmentsCompleted"
                defaultValue={prefill.developmentsCompleted}
              />
            </Field>
            <Field label="Approximate units developed" htmlFor="unitsDeveloped">
              <Input
                id="unitsDeveloped"
                name="unitsDeveloped"
                defaultValue={prefill.unitsDeveloped}
              />
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
