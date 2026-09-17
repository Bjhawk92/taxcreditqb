import { createFileRoute } from "@tanstack/react-router";
import { PresentationBuilderPage } from "@/components/presentation-builder";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/builder")({
  head: () =>
    seo({
      title: "Presentation Builder | Tax Credit QB",
      description:
        "Bring us the deal. We’ll build the game plan. A guided workspace for the facts, audience, images, and documents Tax Credit QB needs to make the strongest case.",
    }),
  component: PresentationBuilderPage,
});
