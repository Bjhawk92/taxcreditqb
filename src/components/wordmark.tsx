import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  to = "/",
  invert = false,
  compact = false,
}: {
  className?: string;
  to?: "/";
  invert?: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex shrink-0 items-center py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className,
      )}
      aria-label="Tax Credit QB home"
    >
      <img
        src="/brand/tax-credit-qb-shield.png"
        alt="Tax Credit QB"
        className={cn(
          "w-auto",
          compact ? "h-16 md:h-[4.75rem]" : "h-28 md:h-32",
          invert && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
