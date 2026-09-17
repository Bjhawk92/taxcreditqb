import type { ReactNode } from "react";

export function HqHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          My Locker
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-display font-semibold leading-display tracking-display">
          {title}
        </h1>
        {sub ? (
          <p className="mt-4 max-w-2xl text-lede text-ink/80">{sub}</p>
        ) : null}
      </div>
    </header>
  );
}

export function HqMain({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">{children}</div>
  );
}

export function HqEmpty({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border border-dashed border-line bg-paper-dim px-5 py-8">
      <p className="font-display text-xl font-semibold tracking-tight">{title}</p>
      <p className="mt-2 max-w-xl text-ink/75">{body}</p>
    </div>
  );
}

export function HqStatus({ value }: { value: string }) {
  return (
    <span className="font-display text-sm font-semibold uppercase tracking-nav text-muted">
      {value}
    </span>
  );
}
