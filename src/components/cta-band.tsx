import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type To =
  | "/"
  | "/access"
  | "/huddle"
  | "/inquiry"
  | "/about"
  | "/playbook"
  | "/playbook/outreach"
  | "/playbook/builder"
  | "/advisory"
  | "/desk"
  | "/register"
  | "/videos"
  | "/tools"
  | "/game-plans"
  | "/hq"
  | "/for-partners";

export function CtaBand({
  eyebrow,
  title,
  line,
  close,
  tone = "ink",
  primary = { label: "View Game Plans", to: "/game-plans" },
  secondary = { label: "Call the next play", to: "/inquiry" },
}: {
  eyebrow?: string;
  title: string;
  line?: string;
  close?: string;
  tone?: "paper" | "ink";
  primary?: { label: string; to: To };
  secondary?: { label: string; to: To } | null;
}) {
  const ink = tone === "ink";
  return (
    <section
      className={cn(
        "px-5 py-16 md:px-8 md:py-24",
        ink ? "bg-ink text-paper" : "bg-paper-dim text-ink",
      )}
    >
      <div className="mx-auto max-w-6xl">
        {eyebrow ? (
          <p
            className={cn(
              "font-display text-sm font-semibold uppercase tracking-mark",
              ink ? "text-steel" : "text-steel",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-4 max-w-4xl font-display text-display font-semibold leading-display tracking-display">
          {title}
        </h2>
        {line ? (
          <p className={cn("mt-5 max-w-xl text-lede", ink ? "text-paper/75" : "text-ink/75")}>
            {line}
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant={ink ? "paper" : "invert"} size="lg">
            <Link to={primary.to}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button
              asChild
              variant="secondary"
              size="lg"
              className={
                ink
                  ? "border-paper/30 text-paper hover:border-paper hover:bg-ink-2"
                  : undefined
              }
            >
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
        {close ? (
          <p
            className={cn(
              "mt-8 font-display text-lg font-semibold tracking-tight",
              ink ? "text-paper" : "text-ink",
            )}
          >
            {close}
          </p>
        ) : null}
      </div>
    </section>
  );
}
