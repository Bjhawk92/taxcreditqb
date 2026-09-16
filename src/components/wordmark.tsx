import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  to = "/",
  invert = false,
}: {
  className?: string;
  to?: "/";
  invert?: boolean;
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
      <img
        src="/brand/tax-credit-qb-chrome.png"
        alt="Tax Credit QB — Your winning edge"
        className={cn(
          "h-24 w-auto md:h-28",
          invert && "brightness-0 invert",
        )}
      />
    </Link>
  );
}
