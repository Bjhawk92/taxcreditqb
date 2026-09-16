import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/for-partners")({
  head: () =>
    seo({
      title: "For Syndicators & Consultants | Tax Credit QB",
      description:
        "You keep the sponsor relationship. We QB the rooms your emerging developer is not ready to walk into alone.",
    }),
  component: Partners,
});

function Partners() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Partners"
        title="You keep the sponsor. We QB the rooms."
        sub="For syndicators and consultants whose emerging GP can win a site and still lose city hall. Put a QB on their sideline."
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-lede text-ink/80">
          Put a quarterback next to your developer without taking the GP seat.
          Opening drive, game day, walkthrough — scripted and, when needed,
          the QB takes the snap. Soft-cost line item. You stay in the equity
          seat.
        </p>
        <p className="mt-5 text-ink/80">
          This is not co-GP. This is not community-engagement consulting. This
          is whether the deal survives the rooms that decide it before you
          price credits.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link to="/inquiry">Call in the play</Link>
        </Button>
      </section>
    </main>
  );
}
