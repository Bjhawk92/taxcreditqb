import { createFileRoute, Link } from "@tanstack/react-router";
import { HqEmpty, HqMain } from "@/components/hq-empty";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/hq/")({
  component: HqHome,
});

function HqHome() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Team HQ"
        title="Welcome to Team HQ."
        sub="Membership, playbook files, huddles, and project work — in one place."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/hq/messages">Ask a question</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/hq/huddle">Schedule a huddle</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/inquiry">Call the next play</Link>
          </Button>
        </div>
      </PageHero>
      <HqMain>
        <div className="grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Next huddle or meeting
            </h2>
            <div className="mt-4">
              <HqEmpty
                title="Nothing on the calendar"
                body="Confirmed huddles and meeting support will list here. A request is not confirmed until Tax Credit QB accepts it."
              />
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Awaiting your review
            </h2>
            <div className="mt-4">
              <HqEmpty
                title="Nothing waiting"
                body="When a file or question needs a response, it will show here."
              />
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Recent messages
            </h2>
            <div className="mt-4">
              <HqEmpty
                title="No messages yet"
                body="Questions appear here with status: submitted, awaiting information, or answered."
              />
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              File updates
            </h2>
            <div className="mt-4">
              <HqEmpty
                title="No file updates"
                body="Deliverables recorded for your account will appear here."
              />
            </div>
          </section>
        </div>
      </HqMain>
    </main>
  );
}
