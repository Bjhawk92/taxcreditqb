import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { SignedIn, SignedOut } from "@/lib/auth/gates";

export const Route = createFileRoute("/tools/modeling")({
  head: () =>
    seo({
      title: "Custom LIHTC Model | Alkaline Advisors | Tax Credit QB",
      description:
        "Institutional-quality LIHTC financial modeling customized to your deal, built by Alkaline Advisors and available through Tax Credit QB.",
    }),
  component: ModelingProduct,
});

function ModelingProduct() {
  return (
    <main id="main">
      <PageHero
        eyebrow="Equipment · Financial modeling"
        title="Custom LIHTC Model"
        sub="Institutional-quality LIHTC financial modeling customized to your development, built by Alkaline Advisors and available through Tax Credit QB."
      />
      <section className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Custom pricing
        </p>
        <p className="mt-4 text-lede text-ink/80">
          Bring your deal. We’ll build the model around it. This is a customized
          professional modeling engagement — not an automatically generated
          spreadsheet from Tax Credit QB.
        </p>
        <p className="mt-4 text-ink/80">
          Provider: {SITE.alkaline.name}. Price, member price, deliverables,
          turnaround, and revision allowance are confirmed in writing for each
          assignment. They are not published here until approved.
        </p>
        <ul className="mt-8 space-y-2 text-ink/80">
          <li>Select or create a Deal Profile so known facts carry forward.</li>
          <li>Complete the intake you can; save and continue later.</li>
          <li>Authorized Tax Credit QB / Alkaline personnel receive the request in a private workflow.</li>
        </ul>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <SignedIn>
            <Button asChild size="lg">
              <Link to="/hq/modeling" search={{ deal: undefined }}>
                Build my model
              </Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button asChild size="lg">
              <Link to="/register">Create account to continue</Link>
            </Button>
          </SignedOut>
          <Button asChild variant="secondary" size="lg">
            <Link to="/desk/modeling">About Alkaline Advisors</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
