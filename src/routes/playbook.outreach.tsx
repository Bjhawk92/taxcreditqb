import { createFileRoute } from "@tanstack/react-router";
import { OutreachCatalog } from "@/components/outreach-catalog";
import { PageHero } from "@/components/page-hero";
import { OUTREACH_INTRO } from "@/lib/playbook";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/outreach")({
  head: () =>
    seo({
      title: "Outreach Playbook | Tax Credit QB",
      description:
        "Get the right people behind the deal. Introduction emails and letters of support for municipal, community, and partner outreach on LIHTC developments.",
    }),
  component: OutreachPlaybook,
});

function OutreachPlaybook() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Outreach Playbook"
        title={OUTREACH_INTRO.title}
        sub={OUTREACH_INTRO.body}
      />
      <OutreachCatalog showIntro={false} />
    </main>
  );
}
