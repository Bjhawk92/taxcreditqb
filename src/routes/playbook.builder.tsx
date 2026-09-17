import { createFileRoute, useSearch } from "@tanstack/react-router";
import { PresentationBuilderPage } from "@/components/presentation-builder";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/builder")({
  head: () =>
    seo({
      title: "Presentation Builder | Tax Credit QB",
      description:
        "Bring us the deal. We’ll build the game plan. A guided workspace for the facts, audience, images, and documents Tax Credit QB needs to make the strongest case.",
    }),
  component: BuilderRoute,
});

function BuilderRoute() {
  const search = useSearch({ strict: false }) as { deal?: unknown };
  const deal = typeof search.deal === "string" ? search.deal : undefined;
  return <PresentationBuilderPage initialDeal={deal} />;
}
