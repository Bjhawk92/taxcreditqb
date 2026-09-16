import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { FormSuccess } from "@/components/form-success";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { submitForm } from "@/lib/submit-form";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact Tax Credit QB",
      description:
        "Contact Tax Credit QB. Prefer a huddle? Ask the QB. Prefer game day? Call in the play.",
    }),
  component: Contact,
});

function Contact() {
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
        "Tax Credit QB contact",
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main id="main">
      <PageHero
        eyebrow="Contact"
        title="Contact Tax Credit QB"
        sub={`${SITE.emails.info} · ${SITE.emails.brett}`}
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        {status === "success" ? (
          <FormSuccess title="Message received.">
            <p>We’ll get back to you. For a live room, use inquiry so it is routed.</p>
          </FormSuccess>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <Field label="Name" htmlFor="name">
              <Input id="name" name="name" required autoComplete="name" />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" required autoComplete="email" />
            </Field>
            <Field label="Message" htmlFor="message">
              <Textarea id="message" name="message" required rows={6} />
            </Field>
            {status === "error" ? (
              <p className="text-sm text-muted">Couldn’t send. Email {SITE.emails.info}.</p>
            ) : null}
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send"}
            </Button>
          </form>
        )}
      </section>
    </main>
  );
}
