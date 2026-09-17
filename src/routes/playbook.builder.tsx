import { createFileRoute } from "@tanstack/react-router";
import { PresentationBuilderPage } from "@/components/presentation-builder";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/playbook/builder")({
  head: () =>
    seo({
      title: "Presentation Builder | Tax Credit QB",
      description:
        "Bring us the deal. We’ll build the case. A guided workspace for the project facts, audience, images, and documents Tax Credit QB needs to develop your presentation.",
    }),
  component: PresentationBuilderPage,
});
