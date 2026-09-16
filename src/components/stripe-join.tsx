import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE, STRIPE_PAYMENT_LINK } from "@/lib/site";

export function StripeJoinButton({
  label = "Ask the QB",
}: {
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  if (STRIPE_PAYMENT_LINK) {
    return (
      <Button asChild size="lg">
        <a href={STRIPE_PAYMENT_LINK} rel="noreferrer">
          {label}
        </a>
      </Button>
    );
  }

  return (
    <div>
      <Button type="button" size="lg" className="w-full" onClick={() => setOpen(true)}>
        {label}
      </Button>
      {open ? (
        <div
          className="mt-4 border border-line bg-paper p-5"
          role="status"
          aria-labelledby="stripe-title"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Stripe checkout placeholder
          </p>
          <h2 id="stripe-title" className="mt-2 font-display text-xl font-semibold text-ink">
            Ask the QB
          </h2>
          <p className="mt-3 text-sm text-ink/75">
            Stripe membership link not configured. Set VITE_STRIPE_PAYMENT_LINK.
            Until it does, email to join. Price {SITE.access.price}
            {SITE.access.cadence}. Includes {SITE.access.consult}.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Button asChild>
              <a
                href={`mailto:${SITE.emails.info}?subject=Tax%20Credit%20QB%20Playbook`}
              >
                Email to join — {SITE.emails.info}
              </a>
            </Button>
            <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
