import type { ReactNode } from "react";
import { PlaybookBackdrop } from "@/components/playbook-backdrop";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-line bg-paper", className)}>
      <div className="relative overflow-hidden">
        <PlaybookBackdrop />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          {eyebrow ? (
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 max-w-4xl font-display text-display font-semibold leading-display tracking-display text-ink">
            {title}
          </h1>
          {sub ? <p className="mt-5 max-w-2xl text-lede text-ink/75">{sub}</p> : null}
          {children}
        </div>
      </div>
    </header>
  );
}
