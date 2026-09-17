import { Link } from "@tanstack/react-router";
import { ShieldMark } from "@/components/shield-mark";
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
        "inline-flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className,
      )}
      aria-label="Tax Credit QB home"
    >
      <ShieldMark
        alt="Tax Credit QB"
        className={cn(
          "w-auto",
          compact ? "h-24 md:h-28" : "h-24 md:h-32",
          invert && "brightness-0 invert",
        )}
        tmClassName={invert ? "text-paper/75" : "text-ink/70"}
      />
    </Link>
  );
}
