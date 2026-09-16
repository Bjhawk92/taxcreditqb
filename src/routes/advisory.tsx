import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/advisory")({
  head: () =>
    seo({
      title: "Custom Decks & In the Room | Tax Credit QB",
      description:
        "Custom meeting decks and in-person attendance for LIHTC rooms. Hourly or flat by tier. Member rates. You stay the developer.",
    }),
  component: Advisory,
});

function Advisory() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Advisory"
        title="When the playbook is not enough."
        sub="We script the actual slides for this sponsor, this site, this snap. Or we take the huddle in the room. You stay the developer. You own the ball."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="border border-line p-6 md:p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Scripted plays
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              Hourly or flat. By down.
            </h2>
            <ul className="mt-5 space-y-2 text-ink/80">
              <li>Private Intro only</li>
              <li>Hearing only</li>
              <li>Neighborhood only</li>
              <li>Full three-deck package — one site</li>
              <li>Hourly markups when the staff report drops late</li>
            </ul>
            <p className="mt-5 text-sm text-muted">
              Member rate vs non-member. Price quoted. No invented retainers on
              this page.
            </p>
          </div>
          <div className="border border-line p-6 md:p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Put the QB in the game
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              The QB takes the snap.
            </h2>
            <p className="mt-5 text-ink/80">
              Reduced member day rate versus non-member. Travel, lodging, and
              out-of-pocket extra — quoted. Not a co-GP. Not taking the deal.
              Pocket presence, not ownership.
            </p>
          </div>
        </div>
        <Button asChild className="mt-10" size="lg">
          <Link to="/inquiry">Call in the play</Link>
        </Button>
      </section>
      <CtaBand
        title="You own the ball. We call the play."
        line="Ask the QB. Call us when game day is on the calendar."
      />
    </main>
  );
}
