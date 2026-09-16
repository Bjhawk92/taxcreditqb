import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ProofBar({ className }: { className?: string }) {
  return (
    <section
      aria-label="Experience behind Tax Credit QB"
      className={cn("border-y border-line bg-paper-dim", className)}
    >
      <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Experience behind Tax Credit QB
        </p>
      </div>
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
            <p
              className={cn(
                "font-display font-semibold leading-display tracking-tight text-ink",
                item.value.length > 8
                  ? "text-2xl md:text-3xl"
                  : "text-3xl md:text-4xl",
              )}
            >
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
