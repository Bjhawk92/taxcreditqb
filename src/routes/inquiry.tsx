import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { FormSuccess } from "@/components/form-success";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { seo } from "@/lib/seo";
import { NEEDS, SITE } from "@/lib/site";
import { submitForm } from "@/lib/submit-form";

type InquirySearch = { intent?: string };

export const Route = createFileRoute("/inquiry")({
  validateSearch: (search: Record<string, unknown>): InquirySearch => ({
    intent: typeof search.intent === "string" ? search.intent : undefined,
  }),
  head: () =>
    seo({
      title: "Project Inquiry | Tax Credit QB",
      description:
        "Tell us what you are working on and where the deal stands. Confidential. You remain the developer.",
    }),
  component: Inquiry,
});

function Inquiry() {
  const { intent } = useSearch({ from: "/inquiry" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      await submitForm(
        Object.fromEntries(data.entries()) as Record<string, string>,
        "Tax Credit QB project inquiry",
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const defaultNeed = NEEDS.some((n) => n.value === intent) ? intent : "";

  return (
    <main id="main">
      <PageHero
        eyebrow="Call the next play"
        title="What’s the game situation?"
        sub="Tell us what you are working on and where the deal stands. Complete as much or as little as you know today. The conversation is confidential, and there is no pressure pitch."
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        {status === "success" ? (
          <FormSuccess title="Inquiry received.">
            <p>
              We’ll review and follow up. You remain the developer and owner of
              the opportunity.
            </p>
            <p className="mt-3">If it’s urgent, email {SITE.emails.brett}.</p>
          </FormSuccess>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <Field label="Full name" htmlFor="fullName">
              <Input id="fullName" name="fullName" required autoComplete="name" />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </Field>
            <Field label="Company" htmlFor="company">
              <Input id="company" name="company" autoComplete="organization" />
            </Field>
            <Field label="Phone" htmlFor="phone">
              <Input id="phone" name="phone" type="tel" autoComplete="tel" />
            </Field>
            <Field label="City / state" htmlFor="market">
              <Input id="market" name="market" required />
            </Field>
            <Field label="What you need" htmlFor="need">
              <Select id="need" name="need" required defaultValue={defaultNeed}>
                <option value="" disabled>
                  Select
                </option>
                {NEEDS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Site address (optional)" htmlFor="site">
              <Input id="site" name="site" />
            </Field>
            <Field label="Timing" htmlFor="timing">
              <Input id="timing" name="timing" placeholder="Hearing date, staff meeting, etc." />
            </Field>
            <Field label="Notes" htmlFor="notes">
              <Textarea id="notes" name="notes" rows={5} />
            </Field>
            <p className="text-sm text-muted">{SITE.disclaimer}</p>
            {status === "error" ? (
              <p className="text-sm text-muted">Couldn’t send. Email {SITE.emails.info}.</p>
            ) : null}
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Call the next play"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
