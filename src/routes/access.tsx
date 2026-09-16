import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { PricingCard } from "@/components/pricing-card";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/access")({
  head: () =>
    seo({
      title: "Ask the QB | Tax Credit QB Playbook",
      description:
        "Ask the QB. Playbook membership: three decks, game film, and a monthly huddle. Call in the play when the room is live.",
    }),
  component: Access,
});

const LAYERS = [
  {
    n: "A",
    title: "Ask the QB",
    kind: "Huddle",
    body: "Three-play playbook. Game film. One 30-minute huddle a month. Which room, which play, which coverage.",
    cta: "Join below",
  },
  {
    n: "B",
    title: "Scripted plays",
    kind: "Custom decks",
    body: "Opening drive · Game day · Walkthrough · Full three-play package for one site. Hourly when the defense changes late. Members get the discount.",
    cta: "Call in the play",
    to: "/inquiry" as const,
  },
  {
    n: "C",
    title: "Put the QB in the game",
    kind: "Game day",
    body: "The QB takes the snap in the room. Reduced member day rate. Travel extra — quoted. Not a co-GP. You still own the ball.",
    cta: "Put the QB in",
    to: "/inquiry" as const,
  },
];

function Access() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Ask the QB"
        title="Three rooms. One playbook. Call in the play."
        sub="Huddle monthly. Script the deck when the site is live. Put the QB under center on game day. Templates stay with the member — not for resale."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {LAYERS.map((layer) => (
            <div key={layer.n} className="flex flex-col border border-line bg-paper p-6">
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                {layer.n} · {layer.kind}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                {layer.title}
              </h2>
              <p className="mt-3 flex-1 text-ink/75">{layer.body}</p>
              {layer.to ? (
                <Button asChild variant="secondary" className="mt-6">
                  <Link to={layer.to}>{layer.cta}</Link>
                </Button>
              ) : (
                <p className="mt-6 font-display text-sm font-semibold uppercase tracking-nav text-muted">
                  {layer.cta}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-xl">
          <PricingCard />
        </div>
      </section>
    </main>
  );
}
