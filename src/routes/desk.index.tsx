import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/desk/")({
  head: () =>
    seo({
      title: "Meeting Support | Tax Credit QB",
      description:
        "Bring the QB onto the field. Preparation, speaker coaching, supporting participation, or an active presentation role—agreed in advance.",
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
    body: "Shape the game plan, prep speakers, and work the Q&A before anyone sits down.",
  },
  {
    title: "Speaker and presentation preparation",
    body: "Prepare your team to make the case: sequence, evidence, and the questions that will land.",
  },
  {
    title: "Supporting participation",
    body: "On the field with your team. You lead. Tax Credit QB backs the points that need a second voice.",
  },
  {
    title: "Active presentation role",
    body: "When the assignment is to present. The role is written down before the meeting.",
  },
  {
    title: "Post-meeting strategy",
    body: "After the matchup, adjust the game plan and call the next play.",
  },
];

function DeskIndex() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Meeting Support"
        title="Bring the QB onto the field."
        sub="When preparation alone is not enough, bring Tax Credit QB alongside your team. Brett can help read the defense, shape the game plan, prepare speakers, participate in the discussion, and adjust the strategy as the situation develops."
      >
        <Button asChild className="mt-8" size="lg">
          <Link to="/inquiry">Bring in the QB</Link>
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
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            Huddle members receive reduced professional attendance fees under
            their membership terms. Attendance is subject to availability and a
            separate scope.
          </p>
          <p>
            Travel, lodging and related expenses are agreed separately.
          </p>
        </div>
        <Button asChild className="mt-10" size="lg">
          <Link to="/inquiry">Bring in the QB</Link>
        </Button>
      </section>
    </main>
  );
}
