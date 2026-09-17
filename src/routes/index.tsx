import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { DeckCard } from "@/components/deck-card";
import { EmailCapture } from "@/components/email-capture";
import { MembershipPricing } from "@/components/membership-pricing";
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
        "Your next play. Backed by experience. Tax Credit QB helps your team read the field, prepare the response, and make the strongest case—from site control and financial modeling to public approvals.",
    }),
  component: Home,
});

const WAYS = [
  {
    label: "Playbook",
    title: "Prepare.",
    body: "Use templates, presentation frameworks, speaking guidance, outreach resources, and practical development strategies to prepare for important development situations.",
    to: "/playbook" as const,
    cta: "Explore the Playbook",
  },
  {
    label: "Film Room",
    title: "Study.",
    body: "Learn from real development situations, difficult questions, presentation strategies, objections, and decisions that affect LIHTC deals.",
    to: "/videos" as const,
    cta: "Visit the Film Room",
  },
  {
    label: "Equipment",
    title: "Execute.",
    body: "Use practical development resources, directories, calculators, references, and research sources to help execute the work.",
    to: "/tools" as const,
    cta: "Explore the Equipment",
  },
  {
    label: "QB Access",
    title: "Bring in experience.",
    body: "Access Brett Johnson and Tax Credit QB directly when the team needs experience, strategy, presentation assistance, meeting participation, or help determining the next play.",
    to: "/access" as const,
    cta: "Bring in the QB",
  },
];

const DESK = [
  { title: "Model", body: "LIHTC proforma by Alkaline Advisors. Named. Not in-house." },
  { title: "Render", body: "Drawings and architectural introduction when the matchup needs to see it." },
  { title: "GC", body: "Contractor relationships when the sponsor is thin on the build side." },
  { title: "Syndicator", body: "Introductions. You keep the relationship. We QB the field before equity prices." },
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
            Practical LIHTC development strategy from someone who has built,
            financed, and defended real deals. Read the field, prepare your
            team, and make the strongest case—from site control and financial
            modeling to neighborhood meetings and public approvals.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="cta">
              <Link to="/register">
                <BookOpen className="size-4" aria-hidden="true" />
                Get the Playbook
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/inquiry">Call the next play</Link>
            </Button>
          </div>
          <p className="mt-8 max-w-2xl text-lede text-ink/80">
            Whether you are evaluating a site, preparing for opposition,
            pursuing an approval, or positioning the deal for financing,
            Tax Credit QB helps your team understand the field and
            execute the next play.
          </p>
          <p className="mt-4 max-w-2xl text-lede text-ink/80">
            Use the Playbook to prepare, the Film Room to study, Equipment to
            execute, or bring in the QB when the assignment needs experience
            on the field.
          </p>
        </div>
      </section>

      <ProofBar />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          The playbook
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Take the field prepared.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          Your first city meeting, neighborhood introduction and public
          hearing each call for a different approach. Get editable
          presentation decks, speaking guidance and practical Q&A
          strategies that help your team read the defense, prepare the
          response, and make a stronger case.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DECKS.map((deck) => (
            <DeckCard key={deck.slug} deck={deck} />
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/playbook">Explore the Playbook</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/playbook/outreach">Outreach Playbook</Link>
          </Button>
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            How Tax Credit QB helps
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WAYS.map((way) => (
              <article key={way.label} className="flex flex-col border border-line bg-paper p-6">
                <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  {way.label}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                  {way.title}
                </h3>
                <p className="mt-3 flex-1 text-ink/75">{way.body}</p>
                <Button asChild variant="secondary" className="mt-6 self-start">
                  <Link to={way.to}>{way.cta}</Link>
                </Button>
              </article>
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
            Deal Desk
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
            <Link to="/desk">Meeting support</Link>
          </Button>
        </div>
      </section>

      <MembershipPricing />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <EmailCapture />
      </section>

      <CtaBand
        eyebrow="Your winning edge"
        title="Your deal. A stronger game plan."
        line="Get the Playbook and direct advice to lead confidently—or bring in the QB when the assignment needs it."
        primary={{ label: "Get the Playbook", to: "/register" }}
        secondary={{ label: "Call the next play", to: "/inquiry" }}
      />
    </main>
  );
}
