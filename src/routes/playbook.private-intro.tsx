import { createFileRoute, Link } from "@tanstack/react-router";
import { EmailGate } from "@/components/email-gate";
import { PageHero } from "@/components/page-hero";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Button } from "@/components/ui/button";
import { INTRO_OUTLINE } from "@/lib/playbook";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/private-intro")({
  head: () =>
    seo({
      title: "Private Introduction Deck | City, P&Z, Council",
      description:
        "A private intro deck for City Managers, P&Z directors, and council. Credibility first. Staff time is scarce. Not site-deep.",
    }),
  component: PrivateIntro,
});

function PrivateIntro() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Municipal Introduction"
        title="Introduce the company. Read the market."
        sub="Introduce your company, establish credibility and explore a new market with city managers, planning directors and council members. Present your track record while learning about local housing priorities, potential sites, governmental support and incentive opportunities."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-lede text-ink/80">
              For City Manager, Planning & Zoning, council, economic
              development. When you are exploring a market or site and need a
              read on governmental support, location, and incentives — before a
              public fight.
            </p>
            <ol className="mt-10 space-y-6">
              {INTRO_OUTLINE.map((item) => (
                <li key={item.n} className="border-t border-line pt-5">
                  <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                    {item.n}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-ink/75">{item.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="md:col-span-5">
            <PhotoPlaceholder
              aspect="wide"
              texture="/textures/deck-markup.jpg"
              kicker="Marked-up deck"
              caption="Sample slide texture — replace with the member PDF."
            />
          </div>
        </div>
        <div className="mt-14">
          <EmailGate
            source="private-intro"
            title="Private Introduction — sample outline"
            unlocked={
              <div className="border border-line bg-paper-dim p-6 md:p-8">
                <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  Unlocked
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">
                  Sample outline PDF placeholder
                </h2>
                <p className="mt-3 text-ink/75">
                  Watermarked download will sit here. Until then, the outline
                  on this page is the sample.
                </p>
              </div>
            }
          />
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
