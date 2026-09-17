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
        "Study the field. Read the defense. Real development situations, presentation strategies, and the decisions that move LIHTC deals forward.",
    }),
  component: Videos,
});

function Videos() {
  return (
    <main id="main">
      <PageHero
        eyebrow="The Film Room"
        title="Study the field. Read the defense."
        sub="Review real development situations, presentation strategies, difficult questions, and the decisions that move LIHTC deals forward. Each breakdown helps your team recognize the defensive alignment, anticipate pressure, and prepare the next play."
      />
      <section
        className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20"
        aria-label="Film Room library"
      >
        <FilmLibrary clips={FILM_CLIPS} />
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
