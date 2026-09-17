import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { DealPicker } from "@/components/deal-picker";
import { HqEmpty, HqHeader, HqMain, HqStatus } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Textarea } from "@/components/ui/field";
import { getHqHome, submitHqQuestion } from "@/lib/hq";
import { getLockerHome, listDeals } from "@/lib/locker";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/messages")({
  validateSearch: (s: Record<string, unknown>) => ({
    deal: typeof s.deal === "string" ? s.deal : undefined,
  }),
  component: HqMessages,
});

function HqMessages() {
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

  const remaining = home?.usage.questionsRemaining ?? 0;
  const allowance = home?.entitlements.askQuestionsPerMonth ?? 0;
  const blocked = allowance > 0 && remaining <= 0;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (blocked) {
      setMsg("No Ask the QB questions remaining this period.");
      return;
    }
    const form = new FormData(e.currentTarget);
    const deal = deals.find((d) => String(d.id) === dealId);
    const res = await submitHqQuestion({
      data: {
        body: String(form.get("body") ?? ""),
        projectName: deal?.name,
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
      "Submitted. Status starts as submitted — not answered until a Tax Credit QB teammate replies. This is not a promise that Brett personally answers, and replies are not immediate.",
    );
    e.currentTarget.reset();
    load();
  }

  const questions = data?.questions ?? [];
  const messages = data?.messages ?? [];
  const empty = questions.length === 0 && messages.length === 0;

  return (
    <main id="main">
      <HqHeader
        title="Ask the QB"
        sub="Private thread with Tax Credit QB. Support volume follows your Game Plan — not unlimited, not immediate."
      />
      <HqMain>
        <p className="max-w-2xl text-sm text-muted">
          {allowance
            ? `${home?.usage.questionsUsed ?? 0} used · ${remaining} remaining of ${allowance} this month.`
            : "Ask the QB is included with a Game Plan. View Game Plans to see allowances."}{" "}
          Attachments are not accepted here until storage is connected. Email files
          to {SITE.emails.info}.
        </p>
        {blocked ? (
          <p className="mt-4 text-ink/80">
            No questions remaining this period.{" "}
            <Link to="/game-plans" className="font-semibold text-steel">
              View Game Plans
            </Link>
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-4">
            {allowance === 0 ? (
              <p className="text-sm text-ink/75">
                No Ask the QB allowance is assigned yet. You may still send a
                question; volume follows the Game Plan once it is on the account.{" "}
                <Link to="/game-plans" className="font-semibold text-steel">
                  View Game Plans
                </Link>
              </p>
            ) : null}
            <DealPicker deals={deals} value={dealId} onChange={setDealId} />
            <Field label="Question or message" htmlFor="body">
              <Textarea id="body" name="body" required rows={5} />
            </Field>
            <Button type="submit">Submit</Button>
            {msg ? <p className="text-sm">{msg}</p> : null}
          </form>
        )}
        {msg && blocked ? <p className="mt-4 text-sm">{msg}</p> : null}
        <h2 className="mt-12 font-display text-2xl font-semibold">Thread</h2>
        {empty ? (
          <div className="mt-4">
            <HqEmpty
              title="No questions yet"
              body="Statuses: submitted, awaiting information, answered."
            />
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {questions.map((r) => (
              <li key={`q-${r.id}`} className="border border-line p-5">
                <HqStatus value={`Question · ${r.status}`} />
                {r.project_name ? (
                  <p className="mt-1 text-sm text-muted">{r.project_name}</p>
                ) : null}
                <p className="mt-2">{r.body}</p>
                {r.answer ? (
                  <p className="mt-3 border-t border-line pt-3 text-ink/80">
                    Reply: {r.answer}
                  </p>
                ) : null}
              </li>
            ))}
            {messages.map((r) => (
              <li key={`m-${r.id}`} className="border border-line p-5">
                <HqStatus value={`Message · ${r.status}`} />
                <p className="mt-2">{r.body}</p>
              </li>
            ))}
          </ul>
        )}
      </HqMain>
    </main>
  );
}
