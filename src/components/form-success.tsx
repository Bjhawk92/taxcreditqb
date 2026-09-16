import type { ReactNode } from "react";

export function FormSuccess({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-line bg-paper p-6 md:p-8" role="status">
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Received
      </p>
      <h2 className="mt-3 font-display text-section font-semibold text-ink">{title}</h2>
      <div className="prose-liht mt-4 max-w-xl text-ink/75">{children}</div>
    </div>
  );
}
