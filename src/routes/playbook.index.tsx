import { createFileRoute, Link } from "@tanstack/react-router";
import { DeckCard } from "@/components/deck-card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { DECKS } from "@/lib/playbook";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/")({
  head: () =>
    seo({
      title: "Meeting Playbook | Tax Credit QB",
      description:
        "Walk into the room prepared. Editable decks, speaking notes and Q&A guidance for municipal introductions, public hearings and neighborhood meetings.",
    }),
  component: PlaybookIndex,
});

function PlaybookIndex() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Playbook"
        title="Walk into the room prepared."
        sub="Build a stronger presentation with editable decks, speaking notes and practical Q&A guidance drawn from real development experience. Each tool serves a different audience and stage of your deal."
      >
        <Button asChild className="mt-8" size="lg">
          <a href="#templates">Explore the templates</a>
        </Button>
      </PageHero>
      <section
        id="templates"
        className="mx-auto max-w-6xl scroll-mt-40 px-5 py-14 md:px-8 md:py-20"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {DECKS.map((deck) => (
            <DeckCard key={deck.slug} deck={deck} />
          ))}
        </div>
        <div className="mt-12 max-w-2xl space-y-4 text-ink/80">
          <p>
            Complete templates require a subscription. Members get the three
            presentation tools, speaking guidance and Q&A strategies for
            the rooms that decide a deal.
          </p>
          <p>
            Custom-built presentations are available separately, with hourly
            or flat-fee pricing based on scope.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/access">Subscribe</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/inquiry">Talk about a custom deck</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
