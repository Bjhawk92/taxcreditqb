import { createFileRoute, Link } from "@tanstack/react-router";
import { EmailGate } from "@/components/email-gate";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { OBJECTIONS } from "@/lib/playbook";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/neighborhood")({
  head: () =>
    seo({
      title: "Neighborhood Meeting | Read the Opposition | Tax Credit QB",
      description:
        "Read the opposition. Prepare the response. Uncover the concerns, misconceptions, and arguments driving resistance before they reach the public-hearing stage.",
    }),
  component: Neighborhood,
});

function Neighborhood() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Neighborhood Meeting"
        title="Read the opposition. Prepare the response."
        sub="Introduce the development and your team, then uncover the concerns driving neighborhood resistance. Document the objections, understand which arguments are gaining traction, and prepare clear, credible responses before those issues reach the public-hearing stage."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="max-w-2xl text-lede text-ink/80">
          Intro. Track record. What this site is. Open the floor in a planned
          order. Answer — don’t debate. Leave a one-pager. The opposition
          consists of objections, misinformation, resistance, and competing
          arguments—not the residents themselves. The opposition has a
          playbook; you should have one too.
        </p>
        <h2 className="mt-12 font-display text-section font-semibold">
          The opposition’s arguments
        </h2>
        <div className="mt-6 overflow-x-auto border border-line">
          <table className="w-full min-w-xl text-left text-sm">
            <thead className="bg-paper-dim font-display text-xs font-semibold uppercase tracking-nav">
              <tr>
                <th className="px-4 py-3">Concern</th>
                <th className="px-4 py-3">What is behind it</th>
                <th className="px-4 py-3">What your team should show</th>
                <th className="px-4 py-3">What your team should avoid</th>
              </tr>
            </thead>
            <tbody>
              {OBJECTIONS.map((row) => (
                <tr key={row.concern} className="border-t border-line align-top">
                  <td className="px-4 py-4 font-medium">{row.concern}</td>
                  <td className="px-4 py-4 text-ink/75">{row.mean}</td>
                  <td className="px-4 py-4 text-ink/75">{row.show}</td>
                  <td className="px-4 py-4 text-ink/75">{row.never}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-14">
          <EmailGate
            source="neighborhood"
            title="Neighborhood — objection map sample"
            unlocked={
              <div className="border border-line bg-paper-dim p-6 md:p-8">
                <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  Unlocked
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Sample outline
                </h2>
                <p className="mt-3 text-ink/75">
                  The map on this page is the sample. Site-specific Q&A is
                  custom work.
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