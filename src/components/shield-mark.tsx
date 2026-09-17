import shield from "@/assets/tax-credit-qb-shield.png";
import { cn } from "@/lib/utils";

export function ShieldMark({
  className,
  wrapperClassName,
  tmClassName,
  alt = "",
  width = 1084,
  height = 1226,
}: {
  className?: string;
  wrapperClassName?: string;
  tmClassName?: string;
  alt?: string;
  width?: number;
  height?: number;
}) {
  return (
    <span className={cn("relative inline-block shrink-0", wrapperClassName)}>
      <img
        src={shield}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-[1.5%] right-0 translate-x-[45%] font-display text-[7px] font-semibold leading-none tracking-tight sm:text-[8px]",
          tmClassName ?? "text-ink/70",
        )}
      >
        TM
      </span>
    </span>
  );
}
