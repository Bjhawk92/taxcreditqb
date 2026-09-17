import { Link } from "@tanstack/react-router";
import { ShieldMark } from "@/components/shield-mark";
import wordmark from "@/assets/tax-credit-qb-wordmark.png";

export function BrandLockup() {
  return (
    <Link
      to="/"
      aria-label="Tax Credit QB home"
      className="col-span-3 row-start-2 flex min-w-0 items-center gap-x-2.5 self-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:gap-x-3"
    >
      <ShieldMark className="h-16 w-auto object-contain object-left sm:h-28 md:h-32 lg:h-36 xl:h-40" />
      <img
        src={wordmark}
        alt=""
        width={1297}
        height={306}
        className="h-16 w-auto min-w-0 max-w-full object-contain object-left sm:h-28 md:h-32 lg:h-36 xl:h-40"
      />
    </Link>
  );
}
