import { createFileRoute, Link } from "@tanstack/react-router";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/billing")({
  component: HqBilling,
});

function HqBilling() {
  return (
    <main id="main">
      <HqHeader
        title="Billing and account"
        sub="Subscription, invoices, receipts, and approved scopes. Card data stays with the payment provider — not on this site."
      />
      <HqMain>
        <HqEmpty
          title="No invoices yet"
          body={`Invoices, receipts, and a billing portal will appear here once a membership is active. Questions go to ${SITE.emails.info}.`}
        />
        <p className="mt-6 max-w-2xl text-ink/80">
          Account settings (name and email) follow the sign-in provider. Payment
          methods are not collected on this page.
        </p>
        <Button asChild className="mt-8">
          <Link to="/access">Membership inquiry</Link>
        </Button>
      </HqMain>
    </main>
  );
}
