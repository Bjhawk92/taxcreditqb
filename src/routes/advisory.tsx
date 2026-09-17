import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/advisory")({
  head: () =>
    seo({
      title: "Project Advisory | Tax Credit QB",
      description:
        "Keep the whole deal moving downfield. Project-based and ongoing support for market strategy, land, meetings, modeling, and specialist introductions.",
    }),
  component: Advisory,
});

const LINES = [
  "Market and site strategy.",
  "Land negotiations and commercial deal terms.",
  "Municipal positioning and public opposition.",
  "Custom presentations and meeting campaigns.",
  "Pro forma modeling coordinated with Alkaline Advisors.",
  "Renderings and architectural introductions.",
  "Contractor and syndicator relationships.",
  "Marketing and lease-up strategy.",
];

function Advisory() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Project Advisory"
        title="Keep the whole deal moving downfield."
        sub="Some assignments extend beyond a single question, presentation, or meeting. Tax Credit QB works alongside your team to assess the situation, establish priorities, coordinate the right specialists, and help execute the game plan."
      >
        <Button asChild className="mt-8" size="lg">
          <Link to="/inquiry">Bring in the QB</Link>
        </Button>
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 className="font-display text-section font-semibold leading-section">
          Project-based and ongoing support
        </h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {LINES.map((item) => (
            <li key={item} className="border border-line bg-paper px-5 py-4">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-2xl space-y-4 text-ink/80">
          <p>
            Specialist roles stay transparent. Pro forma modeling is fulfilled
            by{" "}
            <a href={SITE.alkaline.href} className="underline" rel="noreferrer">
              {SITE.alkaline.name}
            </a>
            , named on every engagement — not in-house, and not included in
            membership unless a separate scope says so.
          </p>
          <p>
            Introductions to architects, contractors and syndicators are
            relationship work. They are not a guarantee that a named firm will
            take the assignment.
          </p>
          <p>
            Fees may be hourly, project-based or on retainer, depending on the
            assignment.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/inquiry">Bring in the QB</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/desk/modeling">Modeling with Alkaline</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
