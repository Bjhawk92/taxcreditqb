import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/legal")({
  head: () =>
    seo({
      title: "Disclaimer | Tax Credit QB",
      description: SITE.disclaimer,
    }),
  component: Legal,
});

function Legal() {
  return (
    <main id="main">
      <PageHero eyebrow="Legal" title="How to read this shop." />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-lede text-ink/80">{SITE.disclaimer}</p>
        <p className="mt-6 text-ink/75">
          Modeling is performed by {SITE.alkaline.name} (
          {SITE.alkaline.href.replace("https://", "")}) unless a written
          engagement says otherwise. Tax Credit QB is not Alkaline Advisors.
        </p>
      </section>
    </main>
  );
}
