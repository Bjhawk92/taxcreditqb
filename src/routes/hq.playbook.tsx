import { createFileRoute, Link } from "@tanstack/react-router";
import { HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { DECKS, OUTREACH_GROUPS } from "@/lib/playbook";

export const Route = createFileRoute("/hq/playbook")({
  component: HqPlaybook,
});

const SUPPORT = [
  { label: "Speaking notes", format: "PDF" },
  { label: "Q&A guide", format: "PDF" },
  { label: "Checklist", format: "PDF" },
] as const;

function HqPlaybook() {
  return (
    <main id="main">
      <HqHeader
        title="Playbook"
        sub="Templates and supporting materials included with membership. Custom decks built for a specific site are listed under My Projects — they are not the reusable templates."
      />
      <HqMain>
        <div className="grid gap-4 md:grid-cols-3">
          {DECKS.map((deck) => (
            <article key={deck.slug} className="border border-line bg-paper p-6">
              <p className="font-display text-sm uppercase tracking-nav text-steel">
                Reusable template
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                {deck.name}
              </h2>
              <p className="mt-3 text-sm text-ink/75">{deck.job}</p>
              <ul className="mt-4 space-y-1 text-sm text-muted">
                <li>Presentation — PPTX</li>
                {SUPPORT.map((item) => (
                  <li key={item.label}>
                    {item.label} — {item.format}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">
                Files attach when your membership includes them.
              </p>
              <Button asChild variant="secondary" className="mt-6">
                <Link to={deck.href}>Open public outline</Link>
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-ink/80">
          Reusable templates stay with the member and are not for resale.
          Site-specific decks are custom work, billed separately.
        </p>
        <h2 className="mt-14 font-display text-section font-semibold leading-section">
          Outreach Playbook
        </h2>
        <p className="mt-4 max-w-2xl text-ink/80">
          Introduction emails and letters of support for municipal, community,
          and partner outreach. Browse the catalog, then request project-specific
          language when the assignment calls for it.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {OUTREACH_GROUPS.map((group) => (
            <article key={group.id} className="border border-line bg-paper p-6">
              <p className="font-display text-xs font-semibold uppercase tracking-mark text-steel">
                Coming to the Playbook
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                {group.name}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink/75">
                {group.items.map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/playbook/outreach">View the Outreach Playbook</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/inquiry">Bring in the QB</Link>
          </Button>
        </div>
      </HqMain>
    </main>
  );
}
