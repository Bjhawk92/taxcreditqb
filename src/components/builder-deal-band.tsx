import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DealPicker } from "@/components/deal-picker";
import { Button } from "@/components/ui/button";
import { listDeals, savePresentationBrief } from "@/lib/locker";

type Deals = Awaited<ReturnType<typeof listDeals>>;

export function BuilderDealBand({ initialDeal }: { initialDeal?: string }) {
  const [memberDeals, setMemberDeals] = useState<Deals | null>(null);
  const [dealId, setDealId] = useState(initialDeal ?? "");
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    listDeals()
      .then((rows) => {
        setMemberDeals(rows);
        if (!initialDeal && rows.length === 1) setDealId(String(rows[0].id));
      })
      .catch(() => setMemberDeals(null));
  }, [initialDeal]);

  const deal = memberDeals?.find((d) => String(d.id) === dealId);
  const market = [deal?.city, deal?.state].filter(Boolean).join(", ");

  if (!memberDeals) {
    return (
      <section className="border-b border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-6 md:px-8">
          <p className="text-sm text-ink/80">
            Browse the builder without an account. Create an account when you
            want to attach a Deal Profile and save a brief in My Locker.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-5 py-6 md:px-8">
        {memberDeals.length ? (
          <>
            <DealPicker deals={memberDeals} value={dealId} onChange={setDealId} />
            {deal ? (
              <p className="mt-3 text-sm text-ink/75">
                {deal.name}
                {market ? ` · ${market}` : ""}
                {deal.deal_type ? ` · ${deal.deal_type}` : ""}
                {deal.stage ? ` · ${deal.stage}` : ""}
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-ink/80">
            No Deal Profiles yet. Create one in My Locker so presentation intake
            can reuse project facts.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild>
            <Link
              to="/inquiry"
              search={{
                intent: "presentation-builder",
                project: deal?.name,
                market: market || undefined,
              }}
            >
              Start a presentation
            </Link>
          </Button>
          {memberDeals.length ? (
            <Button
              type="button"
              variant="secondary"
              disabled={!dealId}
              onClick={() => {
                void savePresentationBrief({ data: { dealId: Number(dealId) } }).then(
                  (res) =>
                    setNote(res.ok ? "Brief saved to My Documents." : res.error),
                );
              }}
            >
              Save brief to My Locker
            </Button>
          ) : (
            <Button asChild variant="secondary">
              <Link to="/hq/deals" search={{ new: "1" }}>
                Create a deal
              </Link>
            </Button>
          )}
        </div>
        {note ? <p className="mt-3 text-sm">{note}</p> : null}
      </div>
    </section>
  );
}
