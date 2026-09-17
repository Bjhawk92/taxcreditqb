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
      <PageHero eyebrow="Legal" title="The role we play." />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-lede text-ink/80">{SITE.disclaimer}</p>
        <h2 id="terms" className="mt-12 font-display text-2xl font-semibold">
          Terms of Use
        </h2>
        <p className="mt-4 text-ink/75">
          Tax Credit QB provides educational resources, templates, and optional
          advisory services. You remain the developer and decision-maker. Deck
          templates, checklists, and generated letters are tools that must be
          adapted to the site, the QAP, and the jurisdiction. Memberships are
          billed monthly, limited to one named subscriber, and do not guarantee
          approvals, awards, financing, or project outcomes.
        </p>
        <h2 id="privacy" className="mt-12 font-display text-2xl font-semibold">
          Privacy Policy
        </h2>
        <p className="mt-4 text-ink/75">
          Account, Deal Profile, document, and modeling information is stored
          to operate My Locker and related services. We do not sell your deal
          files. Passwords are hashed by the authentication provider. Payment
          cards are processed by the payment provider and are not stored in
          Tax Credit QB application tables. Contact {SITE.emails.info} for
          account or privacy questions.
        </p>
        <p className="mt-6 text-ink/75">
          Modeling is performed by {SITE.alkaline.name} (
          {SITE.alkaline.href.replace("https://", "")}) unless a written
          engagement says otherwise. Tax Credit QB is not Alkaline Advisors.
        </p>
      </section>
    </main>
  );
}
