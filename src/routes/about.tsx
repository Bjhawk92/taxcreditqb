import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Quote } from "@/components/quote";
import { Button } from "@/components/ui/button";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Brett Johnson | Tax Credit QB",
      description:
        "Brett Johnson, founding partner of Overland Property Group. Approximately 70 tax-credit communities across nine states. An operator’s perspective for LIHTC developers.",
    }),
  component: About,
});

const BIO = [
  "Brett Johnson was a founding partner of Overland Property Group (OPG), where he helped build a nationally recognized development company with approximately 70 tax-credit communities across nine states. His experience spans the business, financial, and local approval challenges of affordable housing development—from identifying an opportunity and securing a site to building support, assembling relationships, and bringing a community to completion.",
  "At OPG, Brett helped shape the company’s vision and growth strategy while continually looking for ways to improve its developments. He emphasized quality, market positioning, and the importance of delivering communities that residents were proud to call home. During his tenure, OPG earned multiple industry awards and national recognition for its development work.",
  "Brett’s approach combines a forward-looking view of markets with a practical understanding of what makes a deal work. He identifies emerging opportunities, evaluates obstacles, and helps translate a development concept into a strategy that can withstand financial scrutiny and public attention. His experience includes land negotiations, historic rehabilitation, development marketing, and the relationships necessary to move complex Low-Income Housing Tax Credit (LIHTC) projects forward.",
  "A significant part of that work happens across the table. Brett has experience presenting developments to city managers, planning officials, elected councils, neighborhood groups, and financial partners. He understands how to establish a developer’s credibility, explain the LIHTC program clearly, address concerns, and connect a proposed development to a community’s housing needs. His perspective comes from having his own projects, capital, and reputation at stake in those conversations.",
  "Through his work at OPG, Brett also developed relationships across the affordable housing industry, including developers, syndicators, consultants, architects, and contractors. He understands both the value of experienced judgment and the importance of bringing the right specialist into a deal at the right time.",
  "Brett’s industry leadership extends beyond OPG. He helped establish the Kansas Housing Association and served as its President and Chairman of the Board, contributing an owner and developer’s perspective to the organization’s work.",
  "He was also a founding member of the Affordable Housing Developers Coalition (AHDC), a group of leaders from prominent affordable housing development companies focused on federal policy affecting the industry’s ability to meet the nation’s affordable housing needs.",
  "Brett brings an operator’s perspective to affordable housing: how to evaluate an opportunity, anticipate resistance, assemble the right team, and keep a development moving. His credibility rests on a record of building communities and navigating the decisions, negotiations, and relationships required to deliver them. OPG’s growth under Brett and his partners was also documented by Affordable Housing Finance, which ranked the company No. 26 on its developers list in 2017.",
];

function About() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Experience that changes the field."
        sub="Tax Credit QB brings Brett Johnson’s development experience to teams that need additional perspective, capacity, or leadership without surrendering control of the deal."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-4">
          <figure>
            <img
              src="/photos/brett-johnson.jpg"
              alt="Brett Johnson, founder of Tax Credit QB"
              width={494}
              height={494}
              className="w-full border border-line bg-paper-dim object-cover object-top"
            />
            <figcaption className="mt-4">
              <p className="font-display text-2xl font-semibold tracking-tight">
                Brett Johnson
              </p>
              <p className="mt-1 text-sm text-muted">
                Founder, Tax Credit QB · Founding partner, Overland Property
                Group
              </p>
            </figcaption>
          </figure>
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild>
              <Link to="/inquiry">Call the next play</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/access">Schedule a huddle</Link>
            </Button>
          </div>
        </div>
        <div className="md:col-span-8">
          <div className="max-w-2xl space-y-5 text-ink/80">
            {BIO.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <Quote className="mt-10">You own the deal. We QB it.</Quote>
        </div>
      </section>
    </main>
  );
}
