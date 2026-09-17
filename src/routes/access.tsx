import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { MembershipPricing } from "@/components/membership-pricing";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/access")({
  head: () =>
    seo({
      title: "Huddle | One-on-one advice | Tax Credit QB",
      description:
        "Talk through the deal. Get clear on the next move. Private virtual sessions with Brett Johnson, according to your membership.",
    }),
  component: Access,
});

const TOPICS = [
  "Market entry",
  "Land negotiations",
  "Team selection",
  "Presentation strategy",
  "Meeting preparation",
  "Project positioning",
];

function Access() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Huddle"
        title="Talk through the deal. Get clear on the next move."
        sub="Bring your questions, concerns or upcoming decisions to a private virtual session with Brett Johnson. Whether you want a second perspective or help working through a specific obstacle, the conversation centers on your deal and what to do next."
      >
        <Button asChild className="mt-8" size="lg">
          <a href="#schedule">Schedule a huddle</a>
        </Button>
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <h2 className="font-display text-section font-semibold leading-section">
          What a session can cover
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOPICS.map((item) => (
            <li key={item} className="border border-line bg-paper px-5 py-4">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-2xl space-y-4 text-ink/80">
          <h2 className="font-display text-section font-semibold leading-section">
            Direct access that matches your membership.
          </h2>
          <p>
            Film Room members can submit private questions without scheduled
            calls. Playbook members receive one 30-minute virtual strategy
            session each month. Huddle members receive two 45-minute sessions
            each month, along with one monthly deal or presentation review.
          </p>
          <p>
            Document review and additional work depend on the agreed scope.
            Additional sessions can be scheduled separately.
          </p>
        </div>
      </section>
      <div id="schedule" className="scroll-mt-40">
        <MembershipPricing />
      </div>
    </main>
  );
}
