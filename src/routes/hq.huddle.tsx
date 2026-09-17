import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { DealPicker } from "@/components/deal-picker";
import { HqEmpty, HqHeader, HqMain, HqStatus } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { getHqHome, submitHqHuddle } from "@/lib/hq";
import { getLockerHome, listDeals } from "@/lib/locker";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/huddle")({
  validateSearch: (s: Record<string, unknown>) => ({
    deal: typeof s.deal === "string" ? s.deal : undefined,
  }),
  component: HqHuddle,
});

function HqHuddle() {
  const search = Route.useSearch();
  const [data, setData] = useState<Awaited<ReturnType<typeof getHqHome>> | null>(
    null,
  );
  const [home, setHome] = useState<Awaited<ReturnType<typeof getLockerHome>> | null>(
    null,
  );
  const [deals, setDeals] = useState<Awaited<ReturnType<typeof listDeals>>>([]);
  const [dealId, setDealId] = useState(search.deal ?? "");
  const [msg, setMsg] = useState<string | null>(null);

  function load() {
    getHqHome()
      .then(setData)
      .catch(() => setData(null));
    getLockerHome()
      .then(setHome)
      .catch(() => setHome(null));
  }
  useEffect(() => {
    load();
    listDeals()
      .then((rows) => {
        setDeals(rows);
        if (!search.deal && rows.length === 1) setDealId(String(rows[0].id));
      })
      .catch(() => setDeals([]));
  }, [search.deal]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const deal = deals.find((d) => String(d.id) === dealId);
    const res = await submitHqHuddle({
      data: {
        question: String(form.get("question") ?? ""),
        projectInfo: deal
          ? `${deal.name}${deal.city ? ` — ${deal.city}, ${deal.state ?? ""}` : ""}`
          : String(form.get("projectInfo") ?? ""),
        deadline: String(form.get("deadline") ?? ""),
        dealId: dealId ? Number(dealId) : undefined,
      },
    }).catch(() => ({
      ok: false as const,
      error:
        "Could not send that request. Email info@taxcreditqb.com or use Call the next play.",
    }));
    if (!res.ok) {
      setMsg(res.error);
      return;
    }
    setMsg(
      "Request submitted. It is not confirmed until it is accepted on the calendar.",
    );
    e.currentTarget.reset();
    load();
  }

  const rows = data?.huddles ?? [];
  const included = Boolean(home?.entitlements.huddleSessionsPerMonth);
  const remaining = home?.usage.huddlesRemaining ?? 0;

  return (
    <main id="main">
      <HqHeader
        title="My Huddles"
        sub="Request a private session under your membership. A booking request is not a confirmed meeting. Session length and frequency follow your plan."
      />
      <HqMain>
        {included ? (
          <p className="max-w-2xl text-ink/80">
            {remaining} of {home?.entitlements.huddleSessionsPerMonth} included
            sessions remaining this period.
          </p>
        ) : (
          <p className="max-w-2xl text-ink/80">
            Live huddles are included with The Playbook and The Huddle.{" "}
            <Link to="/game-plans" className="font-semibold text-steel">
              View Game Plans
            </Link>
          </p>
        )}
        {included && remaining <= 0 ? (
          <p className="mt-4 text-ink/80">No huddle sessions remaining this period.</p>
        ) : included ? (
          <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-4">
            <DealPicker deals={deals} value={dealId} onChange={setDealId} />
            <Field label="Question or decision" htmlFor="q">
              <Textarea id="q" name="question" required rows={4} />
            </Field>
            <Field label="Upcoming deadline" htmlFor="deadline" hint="Optional">
              <Input id="deadline" name="deadline" />
            </Field>
            <p className="text-sm text-muted">
              Email supporting documents to {SITE.emails.info} with this request.
            </p>
            <Button type="submit">Submit huddle request</Button>
            {msg ? <p className="text-sm">{msg}</p> : null}
          </form>
        ) : null}
        <h2 className="mt-12 font-display text-2xl font-semibold">Your requests</h2>
        {rows.length === 0 ? (
          <div className="mt-4">
            <HqEmpty
              title="No huddles requested"
              body="Confirmed time, the virtual link, agreed notes, action items, and cancellation terms appear here after a request is accepted."
            />
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {rows.map((r) => {
              const confirmed = r.status === "accepted" || r.status === "completed";
              return (
                <li key={r.id} className="border border-line p-5">
                  <HqStatus
                    value={
                      confirmed ? r.status : `${r.status} — not a confirmed booking`
                    }
                  />
                  <p className="mt-2">{r.question}</p>
                  {confirmed && r.scheduled_at ? (
                    <p className="mt-2 text-sm">When: {r.scheduled_at}</p>
                  ) : null}
                  {confirmed && r.meeting_link ? (
                    <p className="mt-1 text-sm">
                      Link:{" "}
                      <a className="underline" href={r.meeting_link}>
                        {r.meeting_link}
                      </a>
                    </p>
                  ) : null}
                  {confirmed && r.notes ? (
                    <p className="mt-2 text-sm text-ink/80">Notes: {r.notes}</p>
                  ) : null}
                  {confirmed && r.action_items ? (
                    <p className="mt-1 text-sm text-ink/80">
                      Action items: {r.action_items}
                    </p>
                  ) : null}
                  {confirmed ? (
                    <p className="mt-3 text-sm text-muted">
                      Cancel or reschedule by emailing {SITE.emails.info}. Same-day
                      cancellations may use the membership huddle.
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </HqMain>
    </main>
  );
}
