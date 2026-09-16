import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { DeckCard } from "@/components/deck-card";
import { EmailCapture } from "@/components/email-capture";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { PlaybookBackdrop } from "@/components/playbook-backdrop";
import { ProofBar } from "@/components/proof-bar";
import { Quote } from "@/components/quote";
import { Button } from "@/components/ui/button";
import { DECKS } from "@/lib/playbook";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Tax Credit QB | LIHTC Development Strategy + Execution",
      description:
        "Your deal. A stronger game plan. Add proven development experience to your team — land, modeling, city meetings, public hearings. Explore the playbook or bring in the QB.",
    }),
  component: Home,
});

const STEPS = [
  {
    n: "01",
    title: "Read the defense",
    body: "Private intro. Public hearing. Neighborhood. Three rooms. Pick the play that fits the coverage.",
  },
  {
    n: "02",
    title: "Install the play",
    body: "Playbook members get the three-deck system. Custom decks are this sponsor, this site, this snap — we script it.",
  },
  {
    n: "03",
    title: "Huddle — or put the QB in the game",
    body: "Thirty-minute huddle is in the membership. Game day in person is a reduced member rate. Travel extra.",
  },
];

const DESK = [
  { title: "Model", body: "LIHTC proforma by Alkaline Advisors. Named. Not in-house." },
  { title: "Render", body: "Drawings and architectural introduction when the room needs to see it." },
  { title: "GC", body: "Contractor relationships when the sponsor is thin on the build side." },
  { title: "Syndicator", body: "Introductions. You keep the relationship. We QB the rooms before equity prices." },
];

function Home() {
  return (
    <main id="main">
      <section className="relative overflow-hidden border-b border-line">
        <PlaybookBackdrop />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            LIHTC development strategy + execution
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-hero font-semibold leading-display tracking-display text-ink">
            <span className="block">Your deal.</span>
            <span className="block text-steel">A stronger game plan.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lede text-ink/80">
            Add proven development experience to your team, exactly where you
            need it. From land negotiations and financial modeling to city
            meetings and public hearings, Tax Credit QB helps shape the
            strategy, make the right connections and move the deal forward.
          </p>
          <p className="mt-4 max-w-2xl text-lede text-ink/80">
            Get the presentation tools and direct advice to lead
            confidently—or bring an experienced QB into the room.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/playbook">Explore the playbook</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/inquiry">Bring in the QB</Link>
            </Button>
          </div>
        </div>
      </section>

      <ProofBar />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          The playbook
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          The deck is the meeting. The meeting is the deal.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DECKS.map((deck) => (
            <DeckCard key={deck.slug} deck={deck} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            How it works
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n}>
                <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  {step.n}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-ink/75">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              The QB
            </p>
            <h2 className="mt-3 font-display text-section font-semibold leading-section">
              Brett Johnson does not take the deal. You own the ball.
            </h2>
            <p className="mt-5 text-lede text-ink/80">
              He is under center for the rooms that decide whether the drive
              lives. Résumé, pocket presence, judgment. You stay the sponsor.
            </p>
            <Quote className="mt-8">If we can’t run it, we know who can.</Quote>
            <Button asChild className="mt-8">
              <Link to="/about">About the QB</Link>
            </Button>
          </div>
          <PhotoPlaceholder
            aspect="photo"
            caption="Photo: Brett on site — replace with authentic image."
          />
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Deal Desk · Sideline
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-section font-semibold leading-section">
            The model is not the meeting. You still need both.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DESK.map((item) => (
              <div key={item.title} className="border border-line bg-paper p-5">
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink/75">{item.body}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="secondary" className="mt-8">
            <Link to="/desk">The sideline</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <EmailCapture />
      </section>

      <CtaBand
        eyebrow="Your winning edge"
        title="Your deal. A stronger game plan."
        line="Get the presentation tools and direct advice to lead confidently—or bring an experienced QB into the room."
        primary={{ label: "Explore the playbook", to: "/playbook" }}
        secondary={{ label: "Bring in the QB", to: "/inquiry" }}
      />
    </main>
  );
}
