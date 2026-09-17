import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { DeckCard } from "@/components/deck-card";
import { EmailCapture } from "@/components/email-capture";
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
        "Your next play. Backed by experience. Tax Credit QB brings seasoned development experience to your team—from land negotiations and financial modeling to public hearings.",
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
        <div className="relative mx-auto max-w-6xl px-5 py-7 md:px-8 md:py-10">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            LIHTC development strategy + execution
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.15rem,5.6vw,4.35rem)] font-semibold leading-[0.95] tracking-display text-ink">
            <span className="block">Your next play.</span>
            <span className="block text-steel">Backed by experience.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lede text-ink/80">
            Proven development experience for your next decision, difficult
            meeting or complex deal.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="cta">
              <Link to="/register">
                <BookOpen className="size-4" aria-hidden="true" />
                Get the Playbook
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/inquiry">Talk about your deal</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/playbook">Explore the playbook</Link>
            </Button>
          </div>
          <p className="mt-8 max-w-2xl text-lede text-ink/80">
            Some deals need a second perspective. Others need someone who can
            step into the room and help move things forward.
          </p>
          <p className="mt-4 max-w-2xl text-lede text-ink/80">
            Tax Credit QB brings seasoned development experience to your
            team—from land negotiations and financial modeling to building
            local support and making your case at a public hearing.
          </p>
          <p className="mt-4 max-w-2xl text-lede text-ink/80">
            Use our presentation playbook, get direct advice, or bring us in
            for the assignment.
          </p>
        </div>
      </section>

      <ProofBar />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          The playbook
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Walk into the room prepared.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          Your first city meeting, neighborhood introduction and public
          hearing each call for a different approach. Get editable
          presentation decks, speaking guidance and practical Q&A
          strategies that help your team establish credibility, uncover
          concerns and make a stronger case.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DECKS.map((deck) => (
            <DeckCard key={deck.slug} deck={deck} />
          ))}
        </div>
        <Button asChild className="mt-8">
          <Link to="/playbook">See the three presentation tools</Link>
        </Button>
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
            <h2 className="mt-3 max-w-xl font-display text-section font-semibold leading-section">
              <span className="block">A proven developer.</span>
              <span className="block">A valuable addition to your team.</span>
            </h2>
            <p className="mt-5 text-lede text-ink/80">
              Brett Johnson helped build approximately 70 affordable-housing
              communities across nine states — over 5,000 units developed,
              built and stabilized — with more than 20 years in the work.
              That experience brings perspective to the numbers, the
              negotiations and the people who influence a deal.
            </p>
            <p className="mt-4 text-lede text-ink/80">
              Bring him in for a second opinion, a difficult assignment or a
              meeting that matters. You gain an experienced operator who can
              assess the situation, make the right connections and help put
              the plan into action.
            </p>
            <Quote className="mt-8">If we can’t run it, we know who can.</Quote>
            <Button asChild className="mt-8">
              <Link to="/about">Meet the QB</Link>
            </Button>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper-dim plan-grid">
              <img
                src="/textures/site-plan.jpg"
                alt=""
                className="absolute inset-0 size-full object-cover opacity-50 mix-blend-multiply"
              />
            </div>
          </figure>
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
