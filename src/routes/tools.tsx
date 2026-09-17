import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
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
        "The right tools for the next play. Find practical resources that help your team evaluate the field, understand the requirements, prepare the strategy, and move the deal forward.",
    }),
  component: Tools,
});

function Tools() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Tools"
        title="The right tools for the next play."
        sub="Find practical resources that help your team evaluate the field, understand the requirements, prepare the strategy, and move the deal forward."
      />

      <section className="mx-auto max-w-6xl px-5 pt-14 md:px-8 md:pt-20">
        <article className="border border-line bg-paper p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Tool
          </p>
          <h2 className="mt-3 font-display text-section font-semibold leading-section">
            Presentation Builder
          </h2>
          <p className="mt-4 max-w-3xl text-lede text-ink/80">
            A guided workspace for assembling the project information and
            assets required for a custom presentation.
          </p>
          <Button asChild className="mt-6">
            <Link to="/playbook/builder">Explore the Builder</Link>
          </Button>
        </article>
      </section>

      <section
        className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20"
        aria-labelledby="qap-heading"
      >
        <details
          id="qap"
          className="group border border-line bg-paper open:bg-paper"
        >
          <summary className="cursor-pointer list-none px-6 py-6 marker:content-none md:px-8 md:py-8 [&::-webkit-details-marker]:hidden">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Tool
            </p>
            <h2
              id="qap-heading"
              className="mt-3 font-display text-section font-semibold leading-section"
            >
              All 50 States’ QAPs
            </h2>
            <p className="mt-3 font-display text-lg font-semibold uppercase tracking-nav text-steel">
              Plus Washington, D.C. and Puerto Rico
            </p>
            <p className="mt-5 max-w-3xl text-lede text-ink/80">
              Explore official housing agency resources for Section 42
              Low-Income Housing Tax Credit Qualified Allocation Plans,
              allocation requirements, and application information.
            </p>
            <span className="mt-6 inline-flex min-h-11 items-center gap-2 border border-ink bg-ink px-5 font-display text-sm font-semibold uppercase tracking-nav text-paper group-open:border-rule group-open:bg-transparent group-open:text-ink">
              <span className="group-open:hidden">View the directory</span>
              <span className="hidden group-open:inline">Hide the directory</span>
              <ChevronDown
                className="size-4 transition-transform duration-150 group-open:rotate-180"
                aria-hidden="true"
              />
            </span>
          </summary>
          <div className="border-t border-line px-6 py-8 md:px-8">
            <QapDirectory />
          </div>
        </details>
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
              Presentation frameworks for municipal introductions, public
              hearings, and neighborhood meetings — plus the Outreach Playbook
              for introductions and letters of support.
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
              decisions that move deals downfield.
            </p>
            <Button asChild className="mt-6">
              <Link to="/videos">Visit the Film Room</Link>
            </Button>
          </article>
        </div>
      </section>

      <CtaBand
        title="Bring the question. Call the next play."
        line="Submit a focused question about the development, strategy, obstacle, or decision in front of you. Tax Credit QB will review the situation and provide practical guidance grounded in real development experience."
        primary={{ label: "Get the Playbook", to: "/register" }}
        secondary={{ label: "Call the next play", to: "/inquiry" }}
      />
    </main>
  );
}
