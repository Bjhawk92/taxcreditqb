import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/desk/")({
  head: () =>
    seo({
      title: "Sideline | Meeting support | Tax Credit QB",
      description:
        "Bring experience into the room. Preparation, a supporting voice, or an active presentation role—agreed in advance. Travel extra.",
    }),
  component: DeskIndex,
});

const ROOMS = [
  "Municipal introductions",
  "Neighborhood meetings",
  "Public hearings",
  "Landowner negotiations",
  "Syndicator or lender discussions",
];

const ROLES = [
  {
    title: "Behind-the-scenes preparation",
    body: "Shape the approach, prep speakers, and work the Q&A before anyone sits down.",
  },
  {
    title: "A supporting voice",
    body: "In the room with your team. You lead. Tax Credit QB backs the points that need a second voice.",
  },
  {
    title: "An active presentation role",
    body: "When the assignment is to present. The role is written down before the meeting.",
  },
];

function DeskIndex() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Sideline"
        title="Bring experience into the room."
        sub="When the meeting calls for more than preparation, bring Tax Credit QB alongside your team. Brett can help shape the approach, prepare speakers, participate in the discussion and work through the next steps afterward."
      >
        <Button asChild className="mt-8" size="lg">
          <Link to="/inquiry">Discuss meeting support</Link>
        </Button>
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 className="font-display text-section font-semibold leading-section">
          Meetings we support
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((item) => (
            <li key={item} className="border border-line bg-paper px-5 py-4">
              {item}
            </li>
          ))}
        </ul>
        <h2 className="mt-14 font-display text-section font-semibold leading-section">
          The role is agreed in advance
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ROLES.map((role) => (
            <div key={role.title} className="border border-line bg-paper p-6">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {role.title}
              </h3>
              <p className="mt-3 text-ink/75">{role.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 max-w-2xl space-y-4 text-ink/80">
          <p>
            Premium members receive reduced professional attendance fees under
            their membership terms. Attendance is subject to availability and a
            separate scope.
          </p>
          <p>
            Travel, lodging and related expenses are agreed separately.
          </p>
        </div>
        <Button asChild className="mt-10" size="lg">
          <Link to="/inquiry">Discuss meeting support</Link>
        </Button>
      </section>
    </main>
  );
}
