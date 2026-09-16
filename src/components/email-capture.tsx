import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { SITE } from "@/lib/site";
import { submitForm } from "@/lib/submit-form";
import { cn } from "@/lib/utils";

export function EmailCapture({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm({ email, source: "playbook-notes" }, "Tax Credit QB notes");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={cn(className)}>
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Sideline notes
      </p>
      <p className={cn("mt-2 text-ink/75", compact ? "text-sm" : "text-lede max-w-md")}>
        Game film from the rooms that decide LIHTC deals. Free. No fluff.
      </p>
      {status === "success" ? (
        <p className="mt-4 border border-line bg-paper px-4 py-3 text-sm text-ink">
          You’re on the list. New notes go to {email || "your inbox"}.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className={cn(
            "mt-4 flex flex-col gap-2 sm:flex-row",
            compact && "sm:flex-col",
          )}
        >
          <label className="sr-only" htmlFor={compact ? "fn-email-compact" : "fn-email"}>
            Email
          </label>
          <Input
            id={compact ? "fn-email-compact" : "fn-email"}
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:min-w-56"
          />
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Get the film"}
          </Button>
        </form>
      )}
      {status === "error" ? (
        <p className="mt-2 text-sm text-muted">
          Couldn’t send. Email {SITE.emails.info} and we’ll add you.
        </p>
      ) : null}
    </div>
  );
}
