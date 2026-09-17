import { Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmailCapture({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Get on the field.
      </p>
      <p className={cn("mt-2 text-ink/75", compact ? "text-sm" : "text-lede max-w-md")}>
        Create a free account to access public resources, explore the Film Room, and
        see which level of support fits your next deal.
      </p>
      <Button asChild variant="cta" className="mt-4" size={compact ? "md" : "lg"}>
        <Link to="/register">
          <BookOpen className="size-4" aria-hidden="true" />
          Get the Playbook
        </Link>
      </Button>
    </div>
  );
}
