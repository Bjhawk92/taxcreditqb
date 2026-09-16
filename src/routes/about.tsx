import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { Quote } from "@/components/quote";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Brett Johnson | Tax Credit QB",
      description:
        "Proven experience. Your winning edge. Brett Johnson’s development record—about 70 communities across nine states—behind Tax Credit QB.",
    }),
  component: About,
});

function About() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Proven experience. Your winning edge."
        sub="Tax Credit QB brings Brett Johnson’s development experience to teams that need additional capacity—without taking over the deal."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-7">
          <p className="text-lede text-ink/80">
            Experience building approximately 70 LIHTC communities across nine
            states. That record is what staff, elected officials, neighbors,
            and capital already know how to read.
          </p>
          <p className="mt-5 text-ink/80">
            Brett does not take the developer’s project. He adds judgment,
            relationships, and presence so the sponsor can enter the rooms that
            decide the deal with a stronger case.
          </p>
          <Quote className="mt-8">You own the deal. We QB it.</Quote>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/access">Schedule a huddle</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/inquiry">Talk about your deal</Link>
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
