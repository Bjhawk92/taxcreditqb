import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/desk/")({
  head: () =>
    seo({
      title: "Deal Desk | Modeling, Renderings, Intros",
      description:
        "If the QB does not do that piece, the QB knows who does. LIHTC modeling via Alkaline Advisors. Renderings, architects, GCs, syndicators.",
    }),
  component: DeskIndex,
});

const ITEMS = [
  {
    title: "LIHTC modeling",
    body: "Fulfilled by Alkaline Advisors. Tax Credit QB QBs the work. Alkaline builds the model. Not in-house.",
    href: "/desk/modeling" as const,
  },
  {
    title: "Renderings / architect",
    body: "When the room needs to see the product, not hear about it. Introduction, not a studio on payroll.",
  },
  {
    title: "Contractor relationships",
    body: "GCs who have actually closed LIHTC. You still hold the contract.",
  },
  {
    title: "Syndicator relationships",
    body: "Introductions so equity can see a sponsor who can stand up in city hall.",
  },
];

function DeskIndex() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Sideline"
        title="If we can’t run it, we know who can."
        sub="The sideline. The QB is the connector — not the syndicator, not the architect, not Alkaline."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {ITEMS.map((item) => (
            <div key={item.title} className="border border-line bg-paper p-6 md:p-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                {item.title}
              </h2>
              <p className="mt-3 text-ink/75">{item.body}</p>
              {"href" in item && item.href ? (
                <Button asChild variant="secondary" className="mt-6">
                  <Link to={item.href}>Modeling with Alkaline</Link>
                </Button>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Partner:{" "}
          <a href={SITE.alkaline.href} className="underline" rel="noreferrer">
            {SITE.alkaline.name}
          </a>{" "}
          — disclosed on every modeling mention.
        </p>
        <Button asChild className="mt-8">
          <Link to="/inquiry">Call in the play</Link>
        </Button>
      </section>
    </main>
  );
}
