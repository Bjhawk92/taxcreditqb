import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { QapDirectory } from "@/components/qap-directory";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/tools")({
  head: () =>
    seo({
      title: "Tools | State QAP Directory | Tax Credit QB",
      description:
        "Find state Qualified Allocation Plans and housing agency resources in one place. A free LIHTC QAP directory for all 50 states, Washington, D.C., and Puerto Rico.",
    }),
  component: Tools,
});

function Tools() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Tools"
        title="The right resources. Before your next move."
        sub="Find state Qualified Allocation Plans and housing agency resources in one place. Start your research here, then bring your deal-specific questions to Tax Credit QB."
      />

      <section
        className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20"
        aria-labelledby="qap-heading"
      >
        <h2
          id="qap-heading"
          className="font-display text-section font-semibold leading-section"
        >
          All 50 States’ QAPs
        </h2>
        <p className="mt-3 font-display text-lg font-semibold uppercase tracking-nav text-steel">
          Plus Washington, D.C. and Puerto Rico
        </p>
        <p className="mt-5 max-w-3xl text-lede text-ink/80">
          Explore official housing agency resources for Section 42 Low-Income
          Housing Tax Credit Qualified Allocation Plans, allocation
          requirements, and application information.
        </p>
        <div className="mt-10">
          <QapDirectory />
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <article className="border border-line bg-paper p-6 md:p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Related
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              The Playbook
            </h2>
            <p className="mt-3 text-ink/80">
              Presentation frameworks for city introductions, public hearings,
              and neighborhood meetings.
            </p>
            <Button asChild className="mt-6">
              <Link to="/playbook">Explore the Playbook</Link>
            </Button>
          </article>
          <article className="border border-line bg-paper p-6 md:p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Related
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              The Film Room
            </h2>
            <p className="mt-3 text-ink/80">
              Practical breakdowns of development strategy, marketing, and the
              conversations that move deals forward.
            </p>
            <Button asChild className="mt-6">
              <Link to="/videos">Visit the Film Room</Link>
            </Button>
          </article>
        </div>
      </section>

      <CtaBand
        title="Found the requirements. Have a question about your next move?"
        line="Bring your deal-specific question to Ask the QB for practical guidance grounded in development experience."
        primary={{ label: "Explore Ask the QB", to: "/access" }}
        secondary={{ label: "Discuss Your Deal", to: "/inquiry" }}
      />
    </main>
  );
}
