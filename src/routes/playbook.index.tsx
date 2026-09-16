import { createFileRoute, Link } from "@tanstack/react-router";
import { DeckCard } from "@/components/deck-card";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { DECKS } from "@/lib/playbook";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/")({
  head: () =>
    seo({
      title: "Meeting Decks for LIHTC Developers | Tax Credit QB",
      description:
        "Three rooms. Three decks. Private introduction, public hearing, neighborhood meeting. Template or custom. You own the deal. We QB it.",
    }),
  component: PlaybookIndex,
});

function PlaybookIndex() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Playbook"
        title="The product is the meeting. The playbook is how you get there."
        sub="Opening drive. Game day. Walkthrough. Same offense. Template for members. We script it when the site is live."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="bg-paper-dim font-display text-xs font-semibold uppercase tracking-nav">
              <tr>
                <th className="px-4 py-3">Room</th>
                <th className="px-4 py-3">Who is in it</th>
                <th className="px-4 py-3">What they need to believe</th>
                <th className="px-4 py-3">Play</th>
              </tr>
            </thead>
            <tbody>
              {DECKS.map((d) => (
                <tr key={d.slug} className="border-t border-line">
                  <td className="px-4 py-4 font-medium">{d.name}</td>
                  <td className="px-4 py-4 text-ink/75">{d.room}</td>
                  <td className="px-4 py-4 text-ink/75">{d.job}</td>
                  <td className="px-4 py-4">
                    <Link to={d.href} className="font-display font-semibold uppercase tracking-nav">
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DECKS.map((deck) => (
            <DeckCard key={deck.slug} deck={deck} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/access">Ask the QB</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/inquiry">Call in the play</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
