import { createFileRoute, Link } from "@tanstack/react-router";
import { EmailGate } from "@/components/email-gate";
import { PageHero } from "@/components/page-hero";
import { VideoPlaceholder } from "@/components/video-placeholder";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { VIDEO_GROUPS } from "@/lib/videos";

export const Route = createFileRoute("/videos")({
  head: () =>
    seo({
      title: "Film Room | Tax Credit QB",
      description:
        "See the situation. Understand the next move. Short videos on land, contracts, meetings, hearings, and the specialists around a LIHTC deal.",
    }),
  component: Videos,
});

function Videos() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Film Room"
        title="See the situation. Understand the next move."
        sub="Get a developer’s perspective on the decisions, conversations and obstacles that shape a deal. These focused videos explain what to look for, what to ask and how to approach the next step."
      >
        <Button asChild className="mt-8" size="lg">
          <a href="#film">Explore the Film Room</a>
        </Button>
      </PageHero>
      <section
        id="film"
        className="mx-auto max-w-6xl scroll-mt-40 space-y-14 px-5 py-14 md:px-8 md:py-20"
      >
        <EmailGate
          source="film-room"
          title="Film Room"
          unlocked={
            <div className="space-y-14">
              {VIDEO_GROUPS.map((group) => (
                <div key={group.heading}>
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <h2 className="max-w-3xl font-display text-2xl font-semibold tracking-tight">
                      {group.heading}
                    </h2>
                    {group.playbook ? (
                      <Link
                        to={group.playbook.href}
                        className="font-display text-sm font-semibold uppercase tracking-nav text-steel hover:text-ink"
                      >
                        Playbook: {group.playbook.label}
                      </Link>
                    ) : null}
                  </div>
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    {group.items.map((v) =>
                      v.available ? (
                        <div key={v.id}>
                          <VideoPlaceholder
                            caption={`Video: ${v.title} — replace with recorded clip.`}
                          />
                          <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                            {v.title}
                          </h3>
                          <p className="mt-1 font-display text-sm uppercase tracking-nav text-muted">
                            {v.duration} · Member access
                          </p>
                          <p className="mt-2 text-ink/75">{v.body}</p>
                        </div>
                      ) : (
                        <div key={v.id} className="border border-line bg-paper p-6">
                          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                            Listed · not yet recorded
                          </p>
                          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                            {v.title}
                          </h3>
                          <p className="mt-2 text-ink/75">{v.body}</p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          }
        />
        <Button asChild size="lg">
          <Link to="/access">Subscribe for Film Room access</Link>
        </Button>
      </section>
    </main>
  );
}
