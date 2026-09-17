import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/for-partners")({
  head: () =>
    seo({
      title: "For Syndicators & Consultants | Tax Credit QB",
      description:
        "You keep the sponsor. We QB the field. Help emerging sponsors carry strong deals through the municipal, community, and financial defenses that can determine whether a development moves forward.",
    }),
  component: Partners,
});

function Partners() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Partners"
        title="You keep the sponsor. We QB the field."
        sub="Help emerging sponsors carry strong deals through the municipal, community, and financial matchups that can determine whether a development moves forward."
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-lede text-ink/80">
          Tax Credit QB helps sponsors prepare for the municipal, community,
          and financial defenses that can determine whether a strong deal
          moves forward. We help the team recognize the pressure, strengthen
          the presentation strategy, and make the case without taking the GP
          role. The service can be separately scoped as a professional
          project cost while the syndicator or consultant maintains its
          existing sponsor relationship.
        </p>
        <p className="mt-5 text-ink/80">
          Tax Credit QB is not the co-GP and does not replace the developer or
          its other professional advisers.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/inquiry">Bring in the QB</Link>
        </Button>
      </section>
    </main>
  );
}
