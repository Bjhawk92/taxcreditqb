import { createFileRoute, Link } from "@tanstack/react-router";
import { DeckCard } from "@/components/deck-card";
import { OutreachCatalog } from "@/components/outreach-catalog";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { DECKS } from "@/lib/playbook";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/")({
  head: () =>
    seo({
      title: "Meeting Playbook | Tax Credit QB",
      description:
        "Walk into the room prepared. Editable decks, speaking notes, Q&A guidance, and outreach resources for municipal introductions, public hearings, neighborhood meetings, and letters of support.",
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
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href="#templates">Explore the templates</a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/playbook/outreach">Outreach Playbook</Link>
          </Button>
        </div>
      </PageHero>
      <section
        id="templates"
        className="mx-auto max-w-6xl scroll-mt-40 px-5 py-14 md:px-8 md:py-20"
      >
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Presentation resources
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Three rooms. Three decks.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DECKS.map((deck) => (
            <DeckCard key={deck.slug} deck={deck} />
          ))}
        </div>
        <article className="mt-6 border border-line bg-paper p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Tool
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            Presentation Builder
          </h3>
          <p className="mt-4 max-w-3xl text-ink/80">
            Organize the facts, images, documents, audience information, and
            deal strategy Tax Credit QB needs to build a presentation around
            your project.
          </p>
          <Button asChild className="mt-6">
            <Link to="/playbook/builder">Explore the Builder</Link>
          </Button>
        </article>
        <div className="mt-12 max-w-2xl space-y-4 text-ink/80">
          <p>
            Complete templates require a Playbook membership. Members get the
            three presentation tools, speaking guidance and Q&A strategies for
            the rooms that decide a deal.
          </p>
          <p>
            Custom-built presentations are available separately, with hourly
            or flat-fee pricing based on scope.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/register">Get the Playbook</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/inquiry">Bring in the QB</Link>
          </Button>
        </div>
      </section>
      <div className="border-t border-line bg-paper-dim">
        <OutreachCatalog id="outreach" />
      </div>
    </main>
  );
}
