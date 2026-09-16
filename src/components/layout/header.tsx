import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

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
      <div className="mx-auto flex h-28 w-full max-w-7xl items-center justify-between gap-3 px-5 md:h-32 md:px-8">
        <Wordmark />

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="ghost" className="px-2">
            <Link to="/inquiry">Call in the play</Link>
          </Button>
          <Button asChild>
            <Link to="/access">Ask the QB</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Button asChild size="md" className="px-3.5">
            <Link to="/access">Ask the QB</Link>
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

      <nav
        className="hidden border-t border-line xl:block"
        aria-label="Primary"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-6 px-5 md:px-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group border-b-2 border-transparent px-2 py-3 transition-colors hover:bg-paper-dim [&.active]:border-ink"
            >
              <span className="block font-display text-sm font-semibold uppercase tracking-nav text-ink">
                {item.label}
              </span>
              <span className="mt-1 block font-sans text-xs font-normal leading-snug text-muted group-hover:text-ink/70">
                {item.blurb}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-line bg-paper xl:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex flex-col justify-center border-b border-line py-3"
            >
              <span className="font-display text-lg font-semibold uppercase tracking-nav text-ink">
                {item.label}
              </span>
              <span className="mt-1 text-sm leading-snug text-muted">{item.blurb}</span>
            </Link>
          ))}
          <Link
            to="/inquiry"
            onClick={() => setOpen(false)}
            className="flex min-h-12 items-center font-display text-lg font-semibold uppercase tracking-nav text-steel"
          >
            Call in the play
          </Link>
        </nav>
      </div>
    </header>
  );
}
