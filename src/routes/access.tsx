import { createFileRoute, Link } from "@tanstack/react-router";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Quote } from "@/components/quote";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { SIGN_SERVICES, SITE } from "@/lib/site";

export const Route = createFileRoute("/access")({
  head: () =>
    seo({
      title: "Sign the QB | Tax Credit QB",
      description:
        "Add an experienced QB to your team. Get a second perspective, work through the next decision, or bring Tax Credit QB onto the field—while you remain the developer.",
    }),
  component: SignTheQb,
});

function SignTheQb() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Sign the QB"
        title="Add an experienced QB to your team."
        sub="Get a second perspective, work through the next decision, build the presentation, or bring Tax Credit QB onto the field for an assignment that matters. Choose the level of support that fits the game situation while you remain the developer and decision-maker."
      >
        <Quote className="mt-8">{SITE.tagline}</Quote>
      </PageHero>
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          How to add a QB
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Choose the support that fits the game situation.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SIGN_SERVICES.map((item) => (
            <article
              key={item.label}
              className="flex flex-col border border-line bg-paper p-6 md:p-8"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                {item.label}
              </h3>
              <p className="mt-3 font-display text-lg font-semibold tracking-tight text-steel">
                {item.blurb}
              </p>
              <p className="mt-3 flex-1 text-ink/75">{item.body}</p>
              <Button asChild className="mt-6 self-start">
                <Link to={item.to}>{item.cta}</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
      <CtaBand
        title="Ready to add a QB to the roster?"
        line="Tell us what you are facing, what the deal needs, and where you want additional experience on the field. We will help identify the right service and next play."
        primary={{ label: "Call the next play", to: "/inquiry" }}
        secondary={{ label: "Get the Playbook", to: "/register" }}
      />
    </main>
  );
}
