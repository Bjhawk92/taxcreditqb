import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import banner from "@/assets/tax-credit-qb-banner.png";

export function BrandLockup({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Tax Credit QB home"
      className={cn(
        "flex min-w-0 shrink items-center",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className,
      )}
    >
      <img
        src={banner}
        alt="Tax Credit QB"
        className="h-11 w-auto max-w-[min(62vw,16rem)] sm:h-14 sm:max-w-[22rem] md:h-16 md:max-w-[28rem] lg:h-[4.5rem] lg:max-w-none xl:h-20"
      />
    </Link>
  );
}
