import shield from "@/assets/tax-credit-qb-shield.png";
import { cn } from "@/lib/utils";

export function ShieldMark({
  className,
  wrapperClassName,
  alt = "",
  width = 1084,
  height = 1226,
}: {
  className?: string;
  wrapperClassName?: string;
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
    </span>
  );
}
