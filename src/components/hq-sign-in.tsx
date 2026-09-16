import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const BEARER_KEY = "grok-auth.bearer-token";

function persistSessionToken(token: string | null | undefined) {
  if (!token || typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(BEARER_KEY, token);
  } catch {
    /* storage unavailable */
  }
}

function explainAuthError(raw: string, mode: "in" | "up") {
  const msg = raw.toLowerCase();
  if (msg.includes("invalid origin")) {
    return "This page cannot create a session from this address. Open taxcreditqb.com/hq in your browser (not www) and try again.";
  }
  if (
    msg.includes("already exists") ||
    msg.includes("user already") ||
    msg.includes("unique")
  ) {
    return "An account with that email already exists. Switch to Sign in.";
  }
  if (msg.includes("password") && (msg.includes("8") || msg.includes("short") || msg.includes("least"))) {
    return "Password must be at least 8 characters.";
  }
  if (
    mode === "in" &&
    (msg.includes("invalid") ||
      msg.includes("not found") ||
      msg.includes("credential") ||
      msg.includes("incorrect"))
  ) {
    return "No account for that email, or the password is wrong. If this is your first visit, create an account first.";
  }
  return raw || "Could not complete that. Try again, or use Continue with Google.";
}

export function HqSignIn() {
  const [mode, setMode] = useState<"in" | "up">("up");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  async function onEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const { data, error: err } = await authClient.signUp.email({
          email,
          password,
          name: name || email,
          callbackURL: "/hq",
        });
        if (err) throw new Error(err.message);
        persistSessionToken(data?.token);
      } else {
        const { data, error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/hq",
        });
        if (err) throw new Error(err.message);
        persistSessionToken(data?.token);
      }
      window.location.href = "/hq";
    } catch (err) {
      setError(
        explainAuthError(err instanceof Error ? err.message : "", mode),
      );
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
            <div className="flex rounded-sm border border-line">
              <button
                type="button"
                onClick={() => {
                  setMode("up");
                  setError(null);
                }}
                className={cn(
                  "min-h-11 flex-1 font-display text-sm font-semibold uppercase tracking-nav",
                  mode === "up" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-dim",
                )}
              >
                Create account
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("in");
                  setError(null);
                }}
                className={cn(
                  "min-h-11 flex-1 font-display text-sm font-semibold uppercase tracking-nav",
                  mode === "in" ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-dim",
                )}
              >
                Sign in
              </button>
            </div>

            <p className="text-sm text-ink/75">
              Use any Gmail or personal email you already have. Nothing is sent
              to that address — it is only your login.
            </p>

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
                  placeholder="you@gmail.com"
                />
              </Field>
              <Field
                label="Password"
                htmlFor="hq-password"
                hint="At least 8 characters."
              >
                <Input
                  id="hq-password"
                  name="password"
                  type="password"
                  required
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  minLength={8}
                />
              </Field>
              {error ? (
                <p className="border border-ink bg-paper-dim px-4 py-3 text-sm text-ink">
                  {error}
                </p>
              ) : null}
              <Button type="submit" disabled={busy} className="w-full">
                {busy
                  ? "Please wait…"
                  : mode === "up"
                    ? "Create account"
                    : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted">or</p>
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
                  Password reset mail is not connected. Until the domain inbox
                  is set up, create a new account with a different email, or
                  use Continue with Google.
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
