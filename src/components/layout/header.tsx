import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BinderTabStrip } from "@/components/binder-tabs";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const TAB = {
  navy: "binder-tab-navy",
  blue: "binder-tab-blue",
  gold: "binder-tab-gold",
  green: "binder-tab-green",
  burgundy: "binder-tab-burgundy",
  slate: "binder-tab-slate",
  hq: "binder-tab-hq",
  tools: "binder-tab-tools",
} as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="relative mx-auto flex h-28 w-full max-w-7xl items-center justify-between gap-3 px-4 md:h-32 md:px-8">
        <Wordmark compact />

        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center px-36 lg:flex xl:px-40">
          <p className="max-w-3xl text-center">
            <span className="block font-display text-[1.6875rem] font-semibold uppercase leading-none tracking-nav xl:text-[1.875rem]">
              <span className="text-ink">Proven experience. </span>
              <span className="text-steel">Your winning edge.</span>
            </span>
            <span className="mt-2 hidden font-display text-lg font-semibold uppercase tracking-mark text-ink/65 xl:block">
              LIHTC Development Strategy + Execution
            </span>
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Button asChild variant="ghost" className="px-2">
            <Link to="/inquiry">Call in the play</Link>
          </Button>
          <Button asChild variant="cta">
            <Link to="/register">
              <BookOpen className="size-4" aria-hidden="true" />
              Get the Playbook
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="md" variant="cta" className="px-3">
            <Link to="/register">
              <BookOpen className="size-4" aria-hidden="true" />
              Get the Playbook
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <BinderTabStrip />

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-line bg-paper lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex gap-3 border-b border-line py-3"
            >
              <span className={cn("mt-1 h-10 w-1.5 shrink-0 rounded-sm", TAB[item.tab])} />
              <span className="flex flex-col">
                <span className="font-display text-lg font-semibold uppercase tracking-nav text-ink">
                  {item.label}
                </span>
                <span className="mt-1 text-sm leading-snug text-muted">{item.blurb}</span>
              </span>
            </Link>
          ))}
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-steel"
          >
            Get the Playbook
          </Link>
          <Link
            to="/inquiry"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-ink"
          >
            Call in the play
          </Link>
          <Link
            to="/access"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-ink"
          >
            Ask the QB
          </Link>
        </nav>
      </div>
    </header>
  );
}
