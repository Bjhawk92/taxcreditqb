import { Link } from "@tanstack/react-router";
import shield from "@/assets/tax-credit-qb-shield.png";
import wordmark from "@/assets/tax-credit-qb-wordmark.png";

export function BrandLockup() {
  return (
    <>
      <Link
        to="/"
        aria-label="Tax Credit QB home"
        className="col-start-1 row-start-1 self-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink lg:row-start-2"
      >
        <img
          src={shield}
          alt=""
          width={1084}
          height={1226}
          className="h-10 w-auto sm:h-12 md:h-16 lg:h-20"
        />
      </Link>
      <Link
        to="/"
        tabIndex={-1}
        aria-hidden="true"
        className="col-span-3 row-start-2 min-w-0 self-center lg:col-span-2 lg:col-start-2"
      >
        <img
          src={wordmark}
          alt=""
          width={1297}
          height={306}
          className="h-auto w-auto max-h-[5.5rem] max-w-full object-contain object-left sm:max-h-28 md:max-h-32 lg:max-h-36 xl:max-h-40"
        />
      </Link>
    </>
  );
}
