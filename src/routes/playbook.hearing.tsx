import { createFileRoute, Link } from "@tanstack/react-router";
import { EmailGate } from "@/components/email-gate";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { MYTHS } from "@/lib/playbook";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/hearing")({
  head: () =>
    seo({
      title: "Public Hearing Deck | LIHTC Myths & Site Facts",
      description:
        "The public hearing is where preparation, credibility, and execution come together. Present the development clearly, address the opposition’s strongest arguments, and give decision-makers a defensible reason to support the project.",
    }),
  component: Hearing,
});

function Hearing() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Public Hearing"
        title="Make the winning case."
        sub="The public hearing is where preparation, credibility, and execution come together. Present the development clearly, establish the relevant facts, address the opposition’s strongest arguments, and give decision-makers a defensible reason to support the project."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="max-w-2xl text-lede text-ink/80">
          LIHTC — “light-c” or “lie-tech” — is the Low-Income Housing Tax
          Credit. In a packed chamber you do not teach the code. You take the
          line they will say, and you put the fact on a slide they can live
          with on the record.
        </p>
        <div className="mt-12 space-y-4">
          {MYTHS.map((myth, i) => (
            <article key={myth.line} className="border border-line bg-paper p-5 md:p-7">
              <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                Slide {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                “{myth.line}”
              </h2>
              <p className="mt-3 text-ink/80">{myth.fact}</p>
              <p className="mt-3 font-display text-sm font-semibold uppercase tracking-nav text-muted">
                What the slide carries — {myth.slide}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-14">
          <EmailGate
            source="hearing"
            title="Public Hearing — myth map sample"
            unlocked={
              <div className="border border-line bg-paper-dim p-6 md:p-8">
                <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  Unlocked
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Sample outline
                </h2>
                <p className="mt-3 text-ink/75">
                  The myth set on this page is the sample. Site-specific facts
                  are custom work.
                </p>
              </div>
            }
          />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/register">Get the Playbook</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/inquiry">Call the next play</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
