import { createFileRoute, Link } from "@tanstack/react-router";
import { MembershipPricing } from "@/components/membership-pricing";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/game-plans")({
  head: () =>
    seo({
      title: "Game Plans | Membership & Pricing | Tax Credit QB",
      description:
        "Choose your game plan. Field Pass at $49/month, The Playbook at $295/month, or The Huddle at $795/month. Compare memberships, benefits, and access—then bring in the QB when the assignment needs more.",
    }),
  component: GamePlans,
});

const BEYOND = [
  {
    label: "Meeting Support",
    body: "Preparation, speaker coaching, or participation in a municipal, neighborhood, or financial meeting.",
    to: "/desk" as const,
  },
  {
    label: "Presentation Builder",
    body: "Organize the facts and assets Tax Credit QB needs to scope and build a custom presentation.",
    to: "/playbook/builder" as const,
  },
  {
    label: "Project Advisory",
    body: "Assignments that extend beyond one question, presentation, or meeting.",
    to: "/advisory" as const,
  },
  {
    label: "Partner Support",
    body: "Help emerging sponsors through municipal, community, and execution challenges without taking the GP role.",
    to: "/for-partners" as const,
  },
  {
    label: "Custom development strategy",
    body: "Hands-on strategy for a specific deal, audience, or decision—quoted separately from membership.",
    to: "/inquiry" as const,
  },
];

function GamePlans() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Game Plans"
        title="Choose your game plan."
        sub="Different deals need different levels of support. Start with Field Pass, add the Playbook and monthly strategy, or put an experienced QB in the Huddle with your team."
      >
        <p className="mt-6 max-w-2xl text-sm text-ink/70">
          Memberships are public. You can compare pricing and benefits before
          creating an account.{" "}
          <Link to="/videos" className="font-semibold text-steel underline-offset-4 hover:underline">
            Visit the Film Room
          </Link>
          .
        </p>
      </PageHero>
      <MembershipPricing showIntro={false} />
      <section className="border-b border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Need more than a membership?
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
            Bring in the QB.
          </h2>
          <p className="mt-5 max-w-2xl text-lede text-ink/80">
            Some situations call for more than templates, resources, or a
            monthly Huddle. Tax Credit QB can work directly alongside your
            team on presentations, meetings, development strategy, and other
            critical assignments. Hands-on professional work is separately
            scoped and priced from monthly memberships.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {BEYOND.map((item) => (
              <article key={item.label} className="flex flex-col border border-line bg-paper p-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                  {item.label}
                </h3>
                <p className="mt-3 flex-1 text-ink/75">{item.body}</p>
                <Link
                  to={item.to}
                  className="mt-5 font-display text-sm font-semibold uppercase tracking-nav text-steel hover:text-ink"
                >
                  Learn more
                </Link>
              </article>
            ))}
          </div>
          <Button asChild className="mt-10" size="lg" variant="cta">
            <Link to="/access">Bring in the QB</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
