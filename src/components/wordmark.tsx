import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import shield from "@/assets/tax-credit-qb-shield.png";

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
        src={shield}
        alt="Tax Credit QB"
        className={cn(
          "w-auto",
          compact ? "h-14 md:h-28" : "h-20 md:h-32",
          invert && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
