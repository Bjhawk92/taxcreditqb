import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const FEATURES = [
  "Municipal Introduction template",
  "Public Hearing template",
  "Neighborhood Meeting template",
  "Film Room library",
  "Monthly virtual strategy session on Playbook and Huddle plans",
  "Member rate on custom presentations",
  "Member rate on meeting attendance",
];

export function PricingCard() {
  return (
    <div className="border border-line bg-paper p-6 md:p-8">
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Playbook membership
      </p>
      <p className="mt-3 text-ink/75">
        Playbook resources, the Film Room, and monthly access that matches your
        plan. Not unlimited consulting.
      </p>
      <ul className="mt-6 space-y-3">
        {FEATURES.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <Check className="mt-0.5 size-4 shrink-0 text-steel" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3">
        <Button asChild>
          <Link to="/game-plans">Get the Playbook</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/inquiry">Call the next play</Link>
        </Button>
      </div>
    </div>
  );
}
