import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Quote } from "@/components/quote";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About the QB | Tax Credit QB",
      description:
        "Brett Johnson is the QB — résumé, judgment, presence. ~70 communities, nine states, $40M exit. He does not take the developer’s deal.",
    }),
  component: About,
});

function About() {
  return (
    <main id="main">
      <PageHero
        eyebrow="The QB"
        title="Brett Johnson."
        sub="Operator. Builder. The quarterback in Tax Credit QB. He does not take the deal. You own the ball. He takes the snap in the rooms that matter."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-7">
          <p className="text-lede text-ink/80">
            Experience building approximately 70 LIHTC communities across nine
            states. A $40M exit. Built by doing. That résumé is what the room
            believes — City Manager, commission, neighborhood, syndicator.
          </p>
          <Quote className="mt-8">You own the deal. We QB it.</Quote>
          <p className="mt-8 text-ink/80">
            Tax Credit QB exists so ambitious developers do not have to invent
            a public process from scratch, and so they do not have to take the
            snap alone. Brett writes the playbook, calls the play, and stands
            in the pocket when the assignment requires it.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/access">Ask the QB</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/inquiry">Call in the play</Link>
            </Button>
          </div>
        </div>
        <div className="space-y-6 md:col-span-5">
          <PhotoPlaceholder
            aspect="photo"
            caption="Photo: Brett on site — replace with authentic image."
          />
          <PhotoPlaceholder
            aspect="wide"
            texture="/textures/deck-markup.jpg"
            caption="Photo: Brett in a hearing — replace with authentic image."
          />
        </div>
      </section>
    </main>
  );
}
