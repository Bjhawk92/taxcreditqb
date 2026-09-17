import { Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { getHqAuthStatus } from "@/lib/hq-auth-status";
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

function isLiveHost() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "taxcreditqb.com" || host === "www.taxcreditqb.com" || host.endsWith(".vercel.app");
}

function explainAuthError(raw: string, mode: "in" | "up") {
  const msg = raw.toLowerCase();
  if (msg.includes("already exists") || msg.includes("user already") || msg.includes("unique")) {
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
  return "We could not complete that request. Check your details and try again, or email info@taxcreditqb.com.";
}

async function emailAuth(
  mode: "in" | "up",
  payload: { email: string; password: string; name?: string },
) {
  const path =
    mode === "up" ? "/api/auth/sign-up/email" : "/api/auth/sign-in/email";
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ ...payload, callbackURL: "/hq/onboarding" }),
  });
  const text = await res.text();
  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    /* HTML or empty */
  }
  if (!res.ok) {
    const nested =
      body.error && typeof body.error === "object"
        ? (body.error as Record<string, unknown>)
        : null;
    const msg = String(
      body.message ||
        nested?.message ||
        body.code ||
        nested?.code ||
        (text && !text.startsWith("<") ? text.slice(0, 240) : "") ||
        `HTTP ${res.status}`,
    );
    throw new Error(`${msg} · HTTP ${res.status}`);
  }
  persistSessionToken(typeof body.token === "string" ? body.token : null);
}

export function HqSignIn({
  eyebrow = "Team HQ",
  title = "Welcome to Team HQ.",
  sub = "Your resources, conversations and project work—all in one place.",
  signupLabel = "Create account",
  playbook = false,
  initialMode = "up",
}: {
  eyebrow?: string;
  title?: string;
  sub?: string;
  signupLabel?: string;
  playbook?: boolean;
  initialMode?: "in" | "up";
}) {
  const [mode, setMode] = useState<"in" | "up">(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{
    database: "neon" | "pglite";
    social: boolean;
  } | null>(null);

  useEffect(() => {
    void getHqAuthStatus()
      .then(setStatus)
      .catch(() => setStatus({ database: "pglite", social: false }));
  }, []);

  const dbMissing = isLiveHost() && status?.database === "pglite";
  const showSocial = Boolean(status?.social);

  async function onEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    const first = String(form.get("firstName") ?? "").trim();
    const last = String(form.get("lastName") ?? "").trim();
    const name = [first, last].filter(Boolean).join(" ");
    const terms = form.get("terms");
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        if (password !== confirm) {
          throw new Error("Passwords do not match.");
        }
        if (!terms) {
          throw new Error("Please agree to the Terms of Use and Privacy Policy.");
        }
      }
      await emailAuth(mode, {
        email,
        password,
        name: name || email,
      });
      window.location.href = mode === "up" ? "/hq/onboarding" : "/hq";
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
        eyebrow={eyebrow}
        title={title}
        sub={sub}
      />
      <div className="mx-auto max-w-lg px-5 py-12 md:px-8 md:py-16">
        {!authEnabled ? (
          <p className="text-muted">Sign-in is not enabled on this environment.</p>
        ) : (
          <div className="space-y-6">
            {playbook ? null : (
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
            )}

            <p className="text-sm text-ink/75">
              {mode === "in"
                ? "Sign in with the email and password for your Tax Credit QB account."
                : "Create an account with your name, email, and password. You can browse Tax Credit QB without an account; sign up when you want to save work, purchase, or use private Equipment."}
            </p>

            <form onSubmit={onEmail} className="space-y-4">
              {mode === "up" ? (
                <>
                  <Field label="First name" htmlFor="hq-first">
                    <Input id="hq-first" name="firstName" autoComplete="given-name" required />
                  </Field>
                  <Field label="Last name" htmlFor="hq-last">
                    <Input id="hq-last" name="lastName" autoComplete="family-name" required />
                  </Field>
                </>
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
              {mode === "up" ? (
                <>
                  <Field label="Confirm password" htmlFor="hq-confirm">
                    <Input
                      id="hq-confirm"
                      name="confirm"
                      type="password"
                      required
                      autoComplete="new-password"
                      minLength={8}
                    />
                  </Field>
                  <label className="flex items-start gap-3 text-sm text-ink/80">
                    <input type="checkbox" name="terms" className="mt-1" required />
                    <span>
                      I agree to the{" "}
                      <Link to="/legal" className="underline">
                        Terms of Use
                      </Link>{" "}
                      and{" "}
                      <Link to="/legal" className="underline">
                        Privacy Policy
                      </Link>
                      , and to applicable membership terms if I subscribe.
                    </span>
                  </label>
                </>
              ) : null}
              {error ? (
                <p className="border border-ink bg-paper-dim px-4 py-3 text-sm text-ink">
                  {error}
                </p>
              ) : null}
              <Button type="submit" disabled={busy || dbMissing} className="w-full" variant="cta">
                {busy
                  ? "Please wait…"
                  : mode === "up"
                    ? signupLabel
                    : "Sign in"}
              </Button>
            </form>

            {playbook ? (
              <p className="text-center text-sm text-ink/80">
                {mode === "up" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="font-display font-semibold uppercase tracking-nav text-steel hover:text-ink"
                      onClick={() => {
                        setMode("in");
                        setError(null);
                      }}
                    >
                      Sign in
                    </button>
                  </>
                ) : (
                  <>
                    Need an account?{" "}
                    <button
                      type="button"
                      className="font-display font-semibold uppercase tracking-nav text-steel hover:text-ink"
                      onClick={() => {
                        setMode("up");
                        setError(null);
                      }}
                    >
                      Get the Playbook
                    </button>
                  </>
                )}
              </p>
            ) : null}

            {showSocial ? (
              <>
                <p className="text-center text-sm text-muted">or</p>
                <div className="flex flex-col gap-2">
                  {GROK_PROVIDERS.map((p) => (
                    <Button
                      key={p.providerId}
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        void signIn(p.providerId, { callbackURL: "/hq/onboarding" }).catch(
                          (err: unknown) =>
                            setError(
                              err instanceof Error
                                ? err.message
                                : "Sign-in did not start.",
                            ),
                        )
                      }
                    >
                      Continue with {p.label}
                    </Button>
                  ))}
                </div>
              </>
            ) : null}

            <div>
              <a
                href={`mailto:${SITE.emails.info}?subject=Password%20help`}
                className="text-sm underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
        )}

        {playbook ? null : (
        <p className="mt-10 text-ink/80">
          Not a member yet?{" "}
          <Link
            to="/game-plans"
            className="font-display font-semibold uppercase tracking-nav text-steel hover:text-ink"
          >
            View Game Plans
          </Link>
        </p>
        )}
      </div>
    </main>
  );
}
