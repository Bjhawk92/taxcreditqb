import { Link } from "@tanstack/react-router";
import { Check, Folder } from "lucide-react";
import type { ReactNode } from "react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import {
  ASSET_FOLDERS,
  BRIEF_ITEMS,
  BUILDER_BENEFITS,
  BUILDER_INFO,
  BUILDER_INTRO,
  BUILDER_SERVICES,
  BUILDER_STEPS,
  BUILDER_TYPES,
  COMMUNITY_SUPPORT_ASSETS,
  FINANCIAL_DESIGNATIONS,
  IMAGE_FIELDS,
  REVIEW_STEPS,
  WORKSPACE_STAGES,
} from "@/lib/presentation-builder";
import { cn } from "@/lib/utils";

function InquiryLink({
  intent,
  children,
  variant = "primary",
  size = "lg",
  className,
}: {
  intent: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "cta" | "paper";
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link to="/inquiry" search={{ intent }}>
        {children}
      </Link>
    </Button>
  );
}

export function PresentationBuilderPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={BUILDER_INTRO.eyebrow}
        title={BUILDER_INTRO.title}
        sub={BUILDER_INTRO.sub}
      >
        <p className="mt-5 max-w-2xl text-lede text-ink/75">{BUILDER_INTRO.note}</p>
        <div className="mt-8 flex flex-col items-start gap-3">
          <InquiryLink intent="presentation-builder" variant="cta">
            Start a presentation
          </InquiryLink>
          <Button asChild variant="secondary" size="lg">
            <a href="#how-it-works">See how it works</a>
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Choose the presentation
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          One workspace. The presentation the room requires.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          These are the assignments the builder will support. Selection and
          intake are not live yet. Use Start a Presentation to tell us which
          room you are preparing for.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BUILDER_TYPES.map((item) => (
            <article
              key={item.name}
              className="flex flex-col border border-line bg-paper p-5 md:p-6"
            >
              <p className="font-display text-xs font-semibold uppercase tracking-mark text-steel">
                Coming to the Builder
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                {item.name}
              </h3>
              <p className="mt-3 flex-1 text-sm text-ink/75">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-40 border-y border-line bg-paper-dim"
      >
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            How the builder will work
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
            Eight steps. One organized brief.
          </h2>
          <ol className="mt-10 grid grid-cols-4 gap-2 md:grid-cols-8">
            {BUILDER_STEPS.map((step, i) => (
              <li key={step.n} className="flex items-center gap-2">
                <span className="inline-flex size-10 shrink-0 items-center justify-center border border-ink bg-ink font-display text-sm font-semibold text-paper">
                  {step.n}
                </span>
                {i < BUILDER_STEPS.length - 1 ? (
                  <span className="hidden h-px flex-1 bg-rule md:block" />
                ) : null}
              </li>
            ))}
          </ol>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {BUILDER_STEPS.map((step) => (
              <li key={step.n} className="border border-line bg-paper p-5">
                <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  {step.n}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-ink/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Information the builder will organize
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          The facts of the deal. Structured before anyone opens a slide.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          Categories the complete tool will collect. These are not form fields.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BUILDER_INFO.map((group) => (
            <article key={group.name} className="border border-line bg-paper p-6">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {group.name}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink/75">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 bg-steel" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-10 border border-line bg-paper-dim p-6 md:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight">
            Financial information can be designated
          </h3>
          <p className="mt-3 max-w-2xl text-ink/80">
            Clients will mark each financial item so the presentation never
            carries numbers that belong only in a closed room.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {FINANCIAL_DESIGNATIONS.map((item) => (
              <li
                key={item}
                className="border border-line bg-paper px-4 py-4 font-display text-sm font-semibold uppercase tracking-nav text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 grid gap-4 border border-line bg-paper md:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-dim md:col-span-5 md:aspect-auto">
            <img
              src="/textures/site-plan.jpg"
              alt=""
              className="absolute inset-0 size-full object-cover opacity-55 mix-blend-multiply"
            />
          </div>
          <div className="p-6 md:col-span-7 md:p-8">
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Every image will carry its source
            </h3>
            <p className="mt-3 text-ink/80">
              When uploads are live, each file will include the information
              needed to use it accurately and with permission.
            </p>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {IMAGE_FIELDS.map((field) => (
                <div key={field} className="border border-line bg-paper-dim px-3 py-3">
                  <dt className="font-display text-xs font-semibold uppercase tracking-mark text-muted">
                    {field}
                  </dt>
                  <dd className="mt-2 h-px w-2/3 bg-line" aria-hidden="true" />
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            A guided way to organize the assignment
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
            Everything we need. Organized around your deal.
          </h2>
          <p className="mt-5 max-w-2xl text-lede text-ink/80">
            The Presentation Builder gives your team a structured process for
            assembling the information Tax Credit QB needs to understand the
            project and prepare the presentation. Clear prompts help organize
            the development facts, audience, objectives, supporting documents,
            visual assets, anticipated concerns, and requested outcome.
          </p>
          <p className="mt-5 max-w-2xl text-lede text-ink/80">
            Tax Credit QB reviews the completed submission, identifies missing
            information, determines the presentation strategy, and confirms the
            scope before production begins. Nothing is published, presented as
            fact, or included in a final presentation without professional
            review.
          </p>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {BUILDER_BENEFITS.map((item) => (
              <li key={item} className="flex gap-3 border border-line bg-paper px-5 py-4">
                <Check className="mt-0.5 size-4 shrink-0 text-steel" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Asset organization
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Files grouped by purpose. Not one generic folder.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          A preview of how project materials will be organized. Uploads are not
          active on this page.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ASSET_FOLDERS.map((folder) => (
            <li
              key={folder}
              className={cn(
                "border bg-paper p-4",
                folder === "Community Support" ? "border-ink" : "border-line",
              )}
            >
              <Folder
                className={cn(
                  "size-5",
                  folder === "Community Support" ? "text-steel" : "text-muted",
                )}
                aria-hidden="true"
              />
              <p className="mt-3 font-display text-sm font-semibold uppercase tracking-nav text-ink">
                {folder}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8 border border-ink bg-paper p-6 md:p-8">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Community Support
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
            Letters the builder will hold
          </h3>
          <p className="mt-3 max-w-2xl text-ink/80">
            Community Support will collect letters by source. This catalog
            shows what the folder can contain. Letters are not drafted here.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {COMMUNITY_SUPPORT_ASSETS.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-ink/80">
                <span className="mt-2 size-1 shrink-0 bg-steel" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Presentation Brief
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
            Your Presentation Brief
          </h2>
          <p className="mt-5 max-w-2xl text-lede text-ink/80">
            Before the assignment is submitted, the builder will organize the
            information into a structured brief containing:
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BRIEF_ITEMS.map((item, i) => (
              <li key={item} className="border border-line bg-paper px-5 py-4">
                <p className="font-display text-xs font-semibold uppercase tracking-mark text-steel">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 font-medium text-ink">{item}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl font-display text-lg font-semibold tracking-tight text-ink">
            You review the Presentation Brief before it is submitted to Tax
            Credit QB.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          À la carte presentation services
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Presentation work is scoped separately from membership.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          Monthly memberships do not include custom production. The builder
          prepares the assignment. Fees, schedule, and deliverables are
          confirmed before work begins.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {BUILDER_SERVICES.map((service) => (
            <article
              key={service.intent}
              className={cn(
                "flex flex-col bg-paper p-6 md:p-8",
                service.intent === "custom-presentation"
                  ? "border-2 border-ink"
                  : "border border-line",
              )}
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {service.name}
              </h3>
              <p className="mt-3 font-display text-lg font-semibold uppercase tracking-nav text-steel">
                {service.price}
              </p>
              <p className="mt-4 flex-1 text-ink/75">{service.body}</p>
              <InquiryLink
                intent={service.intent}
                variant={service.intent === "custom-presentation" ? "cta" : "primary"}
                size="md"
                className="mt-8 w-full"
              >
                {service.cta}
              </InquiryLink>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Scope and review
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
            What happens after you submit.
          </h2>
          <ol className="mt-10 space-y-3">
            {REVIEW_STEPS.map((step, i) => (
              <li key={step} className="flex gap-4 border border-line bg-paper px-5 py-4">
                <span className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-ink/85">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-ink/80">
            Custom presentation work may involve additional research, document
            review, financial analysis, renderings, consultant coordination,
            meeting preparation, travel, or participation. These services are
            separately scoped unless expressly included in the proposal.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
          Your project workspace
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-section font-semibold leading-section">
          Follow the assignment from intake to delivery.
        </h2>
        <p className="mt-5 max-w-2xl text-lede text-ink/80">
          Clients will eventually be able to save progress, return to the
          assignment, add materials, respond to information requests, and
          follow the presentation through delivery. The track below is a
          preview of that status system. It is not operational yet.
        </p>
        <ol className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {WORKSPACE_STAGES.map((stage, i) => (
            <li
              key={stage}
              className={cn(
                "border bg-paper p-4",
                i === 0 ? "border-ink" : "border-line",
              )}
            >
              <p className="font-display text-xs font-semibold uppercase tracking-mark text-steel">
                Stage {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 font-display text-lg font-semibold tracking-tight text-ink">
                {stage}
              </p>
              {i === 0 ? (
                <p className="mt-2 font-display text-xs font-semibold uppercase tracking-mark text-muted">
                  Preview
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-ink px-5 py-16 text-paper md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl font-display text-display font-semibold leading-display tracking-display">
            Your information. Organized into a stronger case.
          </h2>
          <p className="mt-5 max-w-xl text-lede text-paper/75">
            Stop assembling presentations through scattered emails, unlabeled
            images, and disconnected documents. The Presentation Builder gives
            your team a guided way to deliver the information Tax Credit QB
            needs to understand the assignment and build the case.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <InquiryLink intent="presentation-builder" variant="paper">
              Start a presentation
            </InquiryLink>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-paper/30 text-paper hover:border-paper hover:bg-ink-2"
            >
              <Link to="/inquiry">Call the next play</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
