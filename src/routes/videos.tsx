import { createFileRoute } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { FilmLibrary } from "@/components/film-card";
import { PageHero } from "@/components/page-hero";
import { seo } from "@/lib/seo";
import { FILM_CLIPS } from "@/lib/videos";

export const Route = createFileRoute("/videos")({
  head: () =>
    seo({
      title: "The Film Room | Tax Credit QB",
      description:
        "See the strategy in action. Short clips. Real examples. Practical insight for your next deal, presentation, or tough question.",
    }),
  component: Videos,
});

function Videos() {
  return (
    <main id="main">
      <PageHero
        eyebrow="The Film Room"
        title="See the strategy in action."
        sub="Short clips. Real examples. Practical insight for your next deal, presentation, or tough question."
      />
      <section
        className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20"
        aria-label="Film Room library"
      >
        <FilmLibrary clips={FILM_CLIPS} />
      </section>
      <CtaBand
        title="Have a situation we should break down?"
        line="Bring us your question, your presentation, or the meeting you’re preparing for."
        primary={{ label: "Talk About Your Deal", to: "/inquiry" }}
        secondary={null}
      />
    </main>
  );
}
