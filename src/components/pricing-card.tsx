import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { StripeJoinButton } from "@/components/stripe-join";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const FEATURES = [
  "Opening-drive deck — private intro",
  "Game-day deck — public hearing",
  "Walkthrough deck — neighborhood",
  "Game film library",
  `${SITE.access.consult} per month`,
  "Which room, which play, which coverage",
  "Member rate on scripted (custom) decks",
  "Member rate when the QB takes the snap",
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
        Three rooms. Three plays. A huddle with the QB. You still own the
        ball.
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
        <StripeJoinButton label="Ask the QB" />
        <Button asChild variant="secondary">
          <Link to="/inquiry">Call in the play</Link>
        </Button>
      </div>
    </div>
  );
}
