import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/desk/modeling")({
  head: () =>
    seo({
      title: "LIHTC Modeling with Alkaline Advisors | Tax Credit QB",
      description:
        "Tax Credit QB quarterbacks. Alkaline Advisors builds the LIHTC proforma. Named, linked, not in-house.",
    }),
  component: Modeling,
});

function Modeling() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Deal Desk · Modeling"
        title="The model is not the meeting. You still need both."
        sub="Tax Credit QB QBs. Alkaline Advisors builds the LIHTC proforma. Named. Linked. Not a subsidiary."
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-lede text-ink/80">
          Sources and uses. Credit pricing sensitivity. Gap. Waterfall as
          needed. Alkaline is an independently owned real estate modeling firm.
          Do not confuse them with any other “Alkaline Advisors.”
        </p>
        <p className="mt-5">
          <a
            href={SITE.alkaline.href}
            className="font-display font-semibold uppercase tracking-nav underline"
            rel="noreferrer"
          >
            {SITE.alkaline.name} ↗
          </a>
        </p>
        <ul className="mt-8 space-y-2 text-ink/80">
          <li>Custom Excel, not a black box.</li>
          <li>QB coordinates. Alkaline delivers the file.</li>
          <li>Billed as modeling — disclosed on the invoice.</li>
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/inquiry">Call in the play</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/desk">Back to the desk</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
