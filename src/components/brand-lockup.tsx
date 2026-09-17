import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import shield from "@/assets/tax-credit-qb-shield.png";

function LockupCopy({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("min-w-0 flex-col justify-center", className)}>
      <span className="font-display text-lockup font-extrabold uppercase leading-lockup tracking-lockup">
        <span className="block whitespace-nowrap text-ink">
          Game Planning
          <span className={compact ? "hidden" : "hidden sm:inline"}> For</span>
        </span>
        <span className="block whitespace-nowrap text-steel">Winning Deals</span>
      </span>
      <span
        className={cn(
          "mt-1 whitespace-nowrap font-display text-lockup-sub font-semibold uppercase tracking-nav text-ink/70",
          compact ? "hidden" : "hidden sm:block",
        )}
      >
        Strategy <span aria-hidden="true">•</span> Positioning{" "}
        <span aria-hidden="true">•</span> Execution
      </span>
    </span>
  );
}

export function BrandLockup({ className }: { className?: string }) {
  return (
    <>
      <Link
        to="/"
        aria-label="Tax Credit QB home"
        className={cn(
          "flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4",
          "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
          className,
        )}
      >
        <img
          src={shield}
          alt="Tax Credit QB"
          className="h-14 w-auto shrink-0 sm:h-16 md:h-[4.75rem] lg:h-24"
        />
        <LockupCopy className="hidden min-[360px]:flex" />
      </Link>
      <LockupCopy
        compact
        className="col-span-full row-start-2 flex px-0.5 min-[360px]:hidden"
      />
    </>
  );
}
