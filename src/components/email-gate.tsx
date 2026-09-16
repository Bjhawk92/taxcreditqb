import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { SITE } from "@/lib/site";
import { submitForm } from "@/lib/submit-form";

export function EmailGate({
  source,
  title,
  unlocked,
}: {
  source: string;
  title: string;
  unlocked: ReactNode;
}) {
  const key = `tcqb-gate-${source}`;
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(key) === "1";
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("submitting");
    try {
      await submitForm(
        { email: String(data.get("email")), source },
        `Tax Credit QB — ${title}`,
      );
      window.localStorage.setItem(key, "1");
      setOpen(true);
    } catch {
      setStatus("error");
    }
  }

  if (open) return <>{unlocked}</>;

  return (
    <div className="border border-line bg-paper p-6 md:p-8">
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Sample outline
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 max-w-xl text-ink/75">
        Enter your email to unlock the sample outline. This is a watermarked
        placeholder until the PDF is loaded.
      </p>
      <form onSubmit={onSubmit} className="mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`${source}-email`}>
          Email
        </label>
        <Input
          id={`${source}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
        />
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Unlocking…" : "Unlock"}
        </Button>
      </form>
      {status === "error" ? (
        <p className="mt-3 text-sm text-muted">
          Couldn’t send. Email {SITE.emails.info}.
        </p>
      ) : null}
    </div>
  );
}
