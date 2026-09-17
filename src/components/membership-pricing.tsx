import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  MEMBERSHIP_DETAILS,
  MEMBERSHIP_TERMS,
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

  return (
    <Button asChild variant={variant} className={className}>
      <Link to="/register" search={{ plan: plan.id }}>
        {label}
      </Link>
    </Button>
  );
}

export function MembershipPricing({
  showIntro = true,
}: {
  showIntro?: boolean;
}) {
  return (
    <section id="pricing" className="border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {showIntro ? (
          <>
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Game Plans
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
              Choose your game plan.
            </h2>
            <p className="mt-5 max-w-2xl text-lede text-ink/80">
              Different deals need different levels of support. Start with Field
              Pass, add the Playbook and monthly strategy, or put an
              experienced QB in the Huddle with your team.
            </p>
          </>
        ) : null}

        <div className={cn("grid items-stretch gap-4 lg:grid-cols-3 lg:gap-5", showIntro ? "mt-12" : "mt-0")}>
          {MEMBERSHIPS.map((plan) => {
            const featured = plan.id === "playbook";
            return (
              <article
                key={plan.id}
                id={`plan-${plan.id}`}
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
                <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                  {plan.positioning}
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
                  {plan.includes.map((item) => {
                    const key = typeof item === "string" ? item : item.title;
                    return (
                      <li key={key} className="flex gap-3 text-ink">
                        <Check className="mt-0.5 size-4 shrink-0 text-steel" />
                        {typeof item === "string" ? (
                          <span>{item}</span>
                        ) : (
                          <span>
                            <span className="font-semibold">{item.title}</span>
                            {" — "}
                            {item.body}
                          </span>
                        )}
                      </li>
                    );
                  })}
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
          <ul className="mt-5 space-y-2 text-sm text-ink/70">
            {MEMBERSHIP_TERMS.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 bg-steel" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function GamePlanTeaser() {
  return (
    <section id="game-plans" className="border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Game Plans
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          How much QB do you need?
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          Choose the level of resources, strategy, and direct access that fits
          where your deal is today.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {MEMBERSHIPS.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "flex flex-col border bg-paper p-6",
                plan.id === "playbook" ? "border-steel" : "border-line",
              )}
            >
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                {plan.name}
              </p>
              <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                {plan.positioning}
              </p>
              <p className="mt-4 font-display text-4xl font-semibold leading-none tracking-tight text-ink">
                {formatUsd(plan.price)}
                <span className="text-base font-semibold text-muted">
                  {plan.period}
                </span>
              </p>
            </article>
          ))}
        </div>
        <Button asChild className="mt-8" size="lg" variant="cta">
          <Link to="/game-plans">Compare Game Plans</Link>
        </Button>
      </div>
    </section>
  );
}
