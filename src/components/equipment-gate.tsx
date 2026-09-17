import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function EquipmentGate({ planName }: { planName: string }) {
  return (
    <section className="mt-10 border border-line bg-paper-dim p-6 md:p-8">
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Membership required
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
        This Equipment is included with {planName}.
      </h2>
      <p className="mt-3 max-w-2xl text-ink/75">
        You can still review what the resource does. Using, saving, and generating
        from it requires the matching Game Plan. À-la-carte purchase is only
        offered where an approved separate price exists.
      </p>
      <Button asChild className="mt-6">
        <Link to="/game-plans">View Game Plans</Link>
      </Button>
    </section>
  );
}
