import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { OUTREACH_GROUPS, OUTREACH_INTRO } from "@/lib/playbook";

function ResourceCard({ name, body }: { name: string; body: string }) {
  return (
    <article className="flex flex-col border border-line bg-paper p-6">
      <p className="font-display text-xs font-semibold uppercase tracking-mark text-steel">
        Coming to the Playbook
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
        {name}
      </h3>
      <p className="mt-3 flex-1 text-ink/75">{body}</p>
    </article>
  );
}

export function OutreachCatalog({
  showIntro = true,
  id,
}: {
  showIntro?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-40 px-5 py-14 md:px-8 md:py-20"
    >
      {showIntro ? (
        <div className="max-w-3xl">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Outreach Playbook
          </p>
          <h2 className="mt-3 font-display text-section font-semibold leading-section">
            {OUTREACH_INTRO.title}
          </h2>
          <p className="mt-5 text-lede text-ink/80">{OUTREACH_INTRO.body}</p>
        </div>
      ) : null}

      {OUTREACH_GROUPS.map((group, index) => (
        <div key={group.id} className={showIntro || index > 0 ? "mt-14" : undefined}>
          <h2 className="font-display text-section font-semibold leading-section">
            {group.name}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <ResourceCard key={item.name} name={item.name} body={item.body} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-16 max-w-2xl border-t border-line pt-12">
        <h2 className="font-display text-section font-semibold leading-section">
          Need outreach built around your project?
        </h2>
        <p className="mt-5 text-lede text-ink/80">
          Tax Credit QB can help identify the right allies, frame the request,
          and develop project-specific outreach based on the community,
          audience, and goals of the deal.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/register">Get the Playbook</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/inquiry">Call the next play</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
