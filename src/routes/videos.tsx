import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { VIDEOS } from "@/lib/videos";

export const Route = createFileRoute("/videos")({
  head: () =>
    seo({
      title: "Field Video | Tax Credit QB",
      description:
        "Short clips: land, contracts, arranging the private intro, selling the same résumé to staff, elected, and neighbors.",
    }),
  component: Videos,
});

function Videos() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Game film"
        title="Short clips. Not a course dump."
        sub="Playbook members get the film room. Until Stripe is live, these are labeled placeholders."
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {VIDEOS.map((v) => (
            <div key={v.id}>
              <VideoPlaceholder caption={`Video: ${v.title} — replace with recorded clip.`} />
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                {v.title}
              </h2>
              <p className="mt-1 font-display text-sm uppercase tracking-nav text-muted">
                {v.duration} placeholder
              </p>
              <p className="mt-2 text-ink/75">{v.body}</p>
            </div>
          ))}
        </div>
        <Button asChild className="mt-10">
          <Link to="/access">Ask the QB</Link>
        </Button>
      </section>
    </main>
  );
}
