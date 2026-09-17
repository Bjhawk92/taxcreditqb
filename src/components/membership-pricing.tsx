import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  MEMBERSHIP_DETAILS,
  MEMBERSHIPS,
  formatUsd,
  stripeFor,
  type MembershipPlan,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

function PlanCta({
  plan,
  featured,
}: {
  plan: MembershipPlan;
  featured?: boolean;
}) {
  const stripe = stripeFor(plan);
  const variant = featured ? "cta" : plan.id === "huddle" ? "primary" : "secondary";
  const className = "mt-8 w-full";
  const label = plan.cta;

  if (stripe) {
    return (
      <Button asChild variant={variant} className={className}>
        <a href={stripe} rel="noreferrer">
          {label}
        </a>
      </Button>
    );
  }

  const to = plan.id === "huddle" ? "/inquiry" : "/register";
  return (
    <Button asChild variant={variant} className={className}>
      <Link to={to}>{label}</Link>
    </Button>
  );
}

export function MembershipPricing() {
  return (
    <section id="pricing" className="border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Membership
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Choose the game plan that fits.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          Three monthly options. Different levels of resources, access, and
          experienced development strategy.
        </p>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5">
          {MEMBERSHIPS.map((plan) => {
            const featured = plan.id === "playbook";
            return (
              <article
                key={plan.id}
                className={cn(
                  "relative flex flex-col border bg-paper p-6 md:p-8",
                  featured
                    ? "border-steel shadow-[0_18px_40px_rgb(30_51_86/0.14)] lg:-translate-y-3 lg:pt-10"
                    : "border-line",
                )}
              >
                {featured ? (
                  <p className="absolute -top-3 left-6 bg-steel px-3 py-1 font-display text-xs font-semibold uppercase tracking-nav text-paper">
                    Most popular
                  </p>
                ) : null}
                <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  {plan.name}
                </p>
                <p className="mt-4 font-display text-5xl font-semibold leading-none tracking-tight text-ink">
                  {formatUsd(plan.price)}
                  <span className="text-lg font-semibold text-muted">
                    {plan.period}
                  </span>
                </p>
                <p className="mt-4 text-ink/80">{plan.tagline}</p>
                <p className="mt-6 font-display text-xs font-semibold uppercase tracking-mark text-muted">
                  What’s included
                </p>
                <ul className="mt-3 flex-1 space-y-3">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-steel" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <PlanCta plan={plan} featured={featured} />
              </article>
            );
          })}
        </div>

        <div className="mt-12 max-w-3xl">
          <h3 className="font-display text-sm font-semibold uppercase tracking-mark text-muted">
            Membership Details
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">
            {MEMBERSHIP_DETAILS}
          </p>
        </div>

        <div className="mt-14 max-w-2xl">
          <h3 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Not sure which game plan fits?
          </h3>
          <p className="mt-3 text-lede text-ink/80">
            Tell us where your deal stands, and we’ll help you choose the right
            level of support.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link to="/inquiry">Call the next play</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
