import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StripeJoinButton } from "@/components/stripe-join";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const FEATURES = [
  "Municipal Introduction template",
  "Public Hearing template",
  "Neighborhood Meeting template",
  "Film Room library",
  `One ${SITE.access.consult} per membership period`,
  "Member rate on custom presentations",
  "Member rate on meeting attendance",
];

export function PricingCard() {
  return (
    <div className="border border-line bg-paper p-6 md:p-8">
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        {SITE.access.launchLabel}
      </p>
      <p className="mt-4 font-display text-6xl font-semibold leading-none tracking-tight text-ink">
        {SITE.access.price}
        <span className="text-2xl text-muted">{SITE.access.cadence}</span>
      </p>
      <p className="mt-3 text-ink/75">
        Three presentation tools, the Film Room, and one scheduled huddle
        of at least 30 minutes per membership period. Not unlimited
        consulting.
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
        <StripeJoinButton label="Schedule a huddle" />
        <Button asChild variant="secondary">
          <Link to="/inquiry">Talk about your deal</Link>
        </Button>
      </div>
    </div>
  );
}
