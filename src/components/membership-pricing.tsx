import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import shield from "@/assets/tax-credit-qb-shield.png";
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

const CREDENTIAL = {
  film: {
    access: "Sideline Access",
    number: "TCQB-FP-2026-0142",
    lanyard: "#2f6fb8",
    lanyardEdge: "#1e4f8a",
    header: "bg-white text-ink",
    band: "bg-[#2f6fb8] text-white",
    name: "text-ink",
    price: "text-[#1e3356]",
    barcode: "text-[#1e3356]",
    frame: "border-[#2f6fb8] shadow-[0_16px_36px_rgb(47_111_184/0.22)]",
    inner: "ring-1 ring-inset ring-[#2f6fb8]/35",
  },
  playbook: {
    access: "Locker Room Access",
    number: "TCQB-PB-2026-0088",
    lanyard: "#c49a3c",
    lanyardEdge: "#8c6a22",
    header: "bg-ink text-paper",
    band: "bg-[#c49a3c] text-ink",
    name: "text-[#e8c56a]",
    price: "text-paper",
    barcode: "text-[#e8c56a]",
    frame: "border-[#c49a3c] shadow-[0_22px_44px_rgb(30_51_86/0.28)]",
    inner: "ring-1 ring-inset ring-[#c49a3c]/55",
  },
  huddle: {
    access: "All Access",
    number: "TCQB-HD-2026-0031",
    lanyard: "#8b3a3a",
    lanyardEdge: "#5c2222",
    header: "bg-ink-2 text-paper",
    band: "bg-[#8b3a3a] text-paper",
    name: "text-paper",
    price: "text-paper",
    barcode: "text-[#e8b4b4]",
    frame: "border-[#8b3a3a] shadow-[0_16px_36px_rgb(139_58_58/0.22)]",
    inner: "ring-1 ring-inset ring-[#8b3a3a]/50",
  },
} as const;

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

function Lanyard({ color, edge }: { color: string; edge: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="relative z-20 mx-auto -mb-3 block h-[5.75rem] w-[5.75rem]"
      aria-hidden="true"
    >
      <path d="M37 0 C35 38 33 62 41 82 L50 88 L47 0 Z" fill={color} />
      <path d="M63 0 C65 38 67 62 59 82 L50 88 L53 0 Z" fill={color} />
      <path d="M45 0 L47 84 M55 0 L53 84" stroke={edge} strokeWidth="1.1" opacity="0.55" />
      <path d="M40 6 L44 82 M60 6 L56 82" stroke="#fff" strokeWidth="0.7" opacity="0.22" />
      <rect x="41" y="80" width="18" height="12" rx="1.6" fill="#d5d8de" stroke="#8a9099" strokeWidth="0.8" />
      <rect x="44.5" y="82.5" width="11" height="7" rx="0.9" fill="#9aa1aa" />
      <path d="M50 92 v6.5" stroke="#c5c8ce" strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="50" cy="99" rx="3.4" ry="1.5" fill="#b8bec6" />
    </svg>
  );
}

function Barcode({ className }: { className?: string }) {
  const bars = [1, 2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 2, 1, 1, 2, 1, 3, 1];
  return (
    <div className={cn("flex h-7 items-end gap-px", className)} aria-hidden="true">
      {bars.map((w, i) => (
        <span
          key={i}
          className="bg-current"
          style={{ width: w, height: i % 4 === 0 ? "100%" : i % 3 === 0 ? "78%" : "92%" }}
        />
      ))}
    </div>
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

        <div
          className={cn(
            "grid items-stretch gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-6",
            showIntro ? "mt-12" : "mt-2",
          )}
        >
          {MEMBERSHIPS.map((plan) => {
            const featured = plan.id === "playbook";
            const cred = CREDENTIAL[plan.id];
            return (
              <article
                key={plan.id}
                id={`plan-${plan.id}`}
                className={cn(
                  "relative flex h-full flex-col",
                  featured && "lg:-translate-y-5",
                )}
              >
                <Lanyard color={cred.lanyard} edge={cred.lanyardEdge} />
                <div
                  className={cn(
                    "relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.15rem] border-[3px] bg-paper",
                    cred.frame,
                    cred.inner,
                  )}
                >
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      cred.header,
                    )}
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgb(255_255_255/0.28)_0%,rgb(255_255_255/0.04)_38%,transparent_52%,rgb(255_255_255/0.12)_100%)]"
                      aria-hidden="true"
                    />
                    <div className="relative pt-3">
                      <div className="mx-auto h-2.5 w-14 rounded-full bg-[#1a2436] shadow-[inset_0_1px_2px_rgb(0_0_0/0.55),0_1px_0_rgb(255_255_255/0.25)] ring-1 ring-black/20" />
                    </div>
                    <div className={cn("relative mt-3 px-3 py-1.5 text-center", cred.band)}>
                      <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.22em]">
                        Tax Credit QB · {cred.access}
                      </p>
                    </div>
                    <div className="relative px-5 pb-5 pt-3">
                      {featured ? (
                        <p className="text-center font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[#e8c56a]">
                          Most popular
                        </p>
                      ) : null}
                      <img
                        src={shield}
                        alt=""
                        width={72}
                        height={82}
                        className={cn(
                          "mx-auto mt-2 h-14 w-auto object-contain",
                          plan.id === "film" ? "" : "brightness-110",
                        )}
                      />
                      <h3
                        className={cn(
                          "mt-2 text-center font-display font-extrabold uppercase leading-[0.9] tracking-display",
                          "text-[clamp(1.85rem,3.4vw,2.7rem)]",
                          cred.name,
                        )}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 text-center font-display font-extrabold leading-none tracking-tight",
                          "text-[clamp(2.55rem,5.4vw,4.35rem)]",
                          cred.price,
                        )}
                      >
                        {formatUsd(plan.price)}
                        <span className="ml-1 align-middle text-[1.05rem] font-semibold tracking-nav opacity-80">
                          {plan.period}
                        </span>
                      </p>
                      <div className="mt-3 flex items-end justify-between gap-3">
                        <div>
                          <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] opacity-80">
                            2026 Season
                          </p>
                          <p className="mt-0.5 font-display text-[11px] font-semibold tracking-[0.12em] opacity-70">
                            {cred.number}
                          </p>
                        </div>
                        <Barcode className={cn("opacity-70", cred.barcode)} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col border-t border-line bg-paper p-6 md:p-7">
                    <p className="font-display text-lg font-semibold tracking-tight text-ink">
                      {plan.positioning}
                    </p>
                    <p className="mt-3 text-ink/80">{plan.tagline}</p>
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
                  </div>
                </div>
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
