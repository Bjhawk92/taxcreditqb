import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Quote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("border-l-2 border-ink pl-5 md:pl-6", className)}>
      <p className="font-display text-section font-semibold leading-section tracking-display text-ink">
        {children}
      </p>
    </blockquote>
  );
}
