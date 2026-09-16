import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProofBar({ className }: { className?: string }) {
  return (
    <section
      aria-label="Tax Credit QB proof"
      className={cn("border-y border-line bg-paper-dim", className)}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {SITE.proof.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              "px-5 py-6 md:px-8 md:py-7",
              i % 2 === 1 && "border-l border-line",
              i >= 2 && "border-t border-line md:border-t-0",
              (i === 2 || i === 3) && "md:border-l",
            )}
          >
            <p className="font-display text-3xl font-semibold leading-display tracking-tight text-ink md:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 font-display text-sm font-semibold uppercase tracking-nav text-muted">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
