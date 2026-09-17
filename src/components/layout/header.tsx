import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BinderTabStrip } from "@/components/binder-tabs";
import { BrandLockup } from "@/components/brand-lockup";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { NAV, WORK_LABEL, WORK_NAV } from "@/lib/site";
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
  const [workOpen, setWorkOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-4 py-2.5 md:px-8 md:py-3">
        <BrandLockup className="col-start-1 row-start-1" />

        <div className="col-start-3 row-start-1 hidden shrink-0 items-center gap-2 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
          >
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-1 px-2 font-display text-sm font-semibold uppercase tracking-nav text-ink hover:text-steel"
              aria-expanded={workOpen}
            >
              {WORK_LABEL}
              <ChevronDown className="size-3.5" />
            </button>
            {workOpen ? (
              <div className="absolute right-0 top-full z-50 w-80 border border-line bg-paper p-2 shadow-[0_12px_28px_rgb(30_51_86/0.12)]">
                {WORK_NAV.map((item) => (
                  <Link
                    key={item.to + item.label}
                    to={item.to}
                    className="flex flex-col px-3 py-2.5 hover:bg-paper-dim"
                    onClick={() => setWorkOpen(false)}
                  >
                    <span className="font-display text-sm font-semibold uppercase tracking-nav text-ink">
                      {item.label}
                    </span>
                    <span className="mt-0.5 text-sm text-muted">{item.blurb}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <SignedIn>
            <Button asChild variant="ghost" className="px-2">
              <Link to="/hq">My Locker</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild variant="ghost" className="px-2">
              <Link to="/register" search={{ mode: "in" }}>
                Sign in
              </Link>
            </Button>
          </SignedOut>
          <Button asChild variant="cta">
            <Link to="/game-plans">View Game Plans</Link>
          </Button>
        </div>

        <div className="col-start-3 row-start-1 flex items-center gap-2 lg:hidden">
          <Button asChild size="md" variant="cta" className="px-2.5 sm:px-3">
            <Link to="/game-plans">View Game Plans</Link>
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
          {NAV.filter((item) => item.label !== WORK_LABEL).map((item) => (
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
          <p className="mt-4 font-display text-sm font-semibold uppercase tracking-mark text-muted">
            {WORK_LABEL}
          </p>
          {WORK_NAV.map((item) => (
            <Link
              key={item.to + item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3"
            >
              <span className="font-display text-lg font-semibold uppercase tracking-nav text-ink">
                {item.label}
              </span>
              <span className="mt-1 block text-sm text-muted">{item.blurb}</span>
            </Link>
          ))}
          <Link
            to="/game-plans"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-steel"
          >
            View Game Plans
          </Link>
          <SignedOut>
            <Link
              to="/register"
              search={{ mode: "in" }}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-ink"
            >
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              to="/hq"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-ink"
            >
              My Locker
            </Link>
          </SignedIn>
          <Link
            to="/inquiry"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-ink"
          >
            Call the next play
          </Link>
        </nav>
      </div>
    </header>
  );
}
