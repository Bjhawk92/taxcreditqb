import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { SITE } from "@/lib/site";

export function HqSignIn() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  async function onEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name || email,
          callbackURL: "/hq",
        });
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/hq",
        });
        if (err) throw new Error(err.message);
      }
      window.location.href = "/hq";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="main">
      <PageHero
        eyebrow="Team HQ"
        title="Welcome to Team HQ."
        sub="Your resources, conversations and project work—all in one place."
      />
      <div className="mx-auto max-w-lg px-5 py-12 md:px-8 md:py-16">
        {!authEnabled ? (
          <p className="text-muted">Sign-in is not enabled on this environment.</p>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="secondary"
                  onClick={() => void signIn(p.providerId, { callbackURL: "/hq" })}
                >
                  Continue with {p.label}
                </Button>
              ))}
            </div>
            <p className="text-center text-sm text-muted">or email</p>
            <form onSubmit={onEmail} className="space-y-4">
              {mode === "up" ? (
                <Field label="Name" htmlFor="hq-name">
                  <Input id="hq-name" name="name" autoComplete="name" />
                </Field>
              ) : null}
              <Field label="Email" htmlFor="hq-email">
                <Input
                  id="hq-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </Field>
              <Field label="Password" htmlFor="hq-password">
                <Input
                  id="hq-password"
                  name="password"
                  type="password"
                  required
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  minLength={8}
                />
              </Field>
              {error ? <p className="text-sm text-ink">{error}</p> : null}
              <Button type="submit" disabled={busy}>
                {busy ? "Please wait…" : mode === "up" ? "Create account" : "Sign in"}
              </Button>
            </form>
            <button
              type="button"
              className="text-sm underline-offset-4 hover:underline"
              onClick={() => setMode(mode === "in" ? "up" : "in")}
            >
              {mode === "in"
                ? "Need portal access? Create an account"
                : "Already have an account? Sign in"}
            </button>
            <div>
              <button
                type="button"
                className="text-sm underline-offset-4 hover:underline"
                onClick={() => setResetOpen((v) => !v)}
              >
                Forgot password?
              </button>
              {resetOpen ? (
                <p className="mt-3 text-sm text-muted">
                  Password reset mail is not connected. Write{" "}
                  <a className="underline" href={`mailto:${SITE.emails.info}`}>
                    {SITE.emails.info}
                  </a>{" "}
                  from the account email and we will reset it. A reset will not
                  be sent from this page.
                </p>
              ) : null}
            </div>
          </div>
        )}

        <p className="mt-10 text-ink/80">
          Not a member yet?{" "}
          <Link
            to="/access"
            className="font-display font-semibold uppercase tracking-nav text-steel hover:text-ink"
          >
            Inquire about membership
          </Link>
        </p>
      </div>
    </main>
  );
}
