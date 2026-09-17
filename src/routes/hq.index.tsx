import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { getLockerHome, markNotificationRead } from "@/lib/locker";
import { signOut } from "@/lib/auth/client";

export const Route = createFileRoute("/hq/")({
  component: LockerHome,
});

function LockerHome() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getLockerHome>> | null>(
    null,
  );
  useEffect(() => {
    getLockerHome()
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const next = data?.nextPlay;
  const unread = data?.notifications.filter((n) => !n.read_at) ?? [];

  return (
    <main id="main">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-12">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            My Locker
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-display font-semibold leading-display tracking-display">
            Welcome back, {data?.firstName ?? "there"}.
          </h1>
          <p className="mt-4 max-w-2xl text-lede text-ink/80">
            Your deals, Equipment, documents, Game Plan, and QB Access — all in
            one place.
          </p>
        </div>
      </header>
      <HqMain>
        {next ? (
          <section className="border border-line bg-paper p-6 md:p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Next play
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {next.title}
            </h2>
            <p className="mt-2 max-w-2xl text-ink/75">{next.body}</p>
            <p className="mt-3 text-sm text-muted">
              Confirm current requirements against the applicable QAP, HFA
              guidance, lender, investor, and counsel requirements.
            </p>
            <Button asChild className="mt-6">
              <a href={next.to}>{next.cta}</a>
            </Button>
          </section>
        ) : null}

        {unread.length ? (
          <section className="mt-8 border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Notices
            </p>
            <ul className="mt-4 space-y-3">
              {unread.slice(0, 4).map((n) => (
                <li key={n.id} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold">{n.title}</p>
                    {n.body ? <p className="text-sm text-ink/75">{n.body}</p> : null}
                  </div>
                  <div className="flex gap-2">
                    {n.href ? (
                      <Button asChild variant="secondary">
                        <a href={n.href}>Open</a>
                      </Button>
                    ) : null}
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() =>
                        void markNotificationRead({ data: { id: n.id } }).then(() =>
                          getLockerHome().then(setData),
                        )
                      }
                    >
                      Dismiss
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              My Deals
            </p>
            {data?.deals.length ? (
              <ul className="mt-4 space-y-3">
                {data.deals.slice(0, 3).map((d) => (
                  <li key={d.id}>
                    <Link
                      to="/hq/deal/$dealId"
                      params={{ dealId: String(d.id) }}
                      className="font-semibold text-ink hover:text-steel"
                    >
                      {d.name}
                    </Link>
                    <p className="text-sm text-muted">
                      {[d.city, d.state].filter(Boolean).join(", ") || "Location TBD"}{" "}
                      · {d.stage}
                      {typeof d.progress === "number" ? ` · ${d.progress}% checklist` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <HqEmpty
                title="No deals yet"
                body="Create a Deal Profile once. Equipment, letters, and modeling can reuse it."
              />
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/hq/deals" search={{ new: undefined }}>
                  Open deals
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/hq/deals" search={{ new: "1" }}>
                  Add a deal
                </Link>
              </Button>
            </div>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              My Game Plan
            </p>
            <p className="mt-3 font-display text-2xl font-semibold">
              {data?.entitlements.planName}
            </p>
            {data?.entitlements.price ? (
              <p className="mt-1 text-ink/75">${data.entitlements.price}/month</p>
            ) : (
              <p className="mt-1 text-ink/75">No membership assigned yet.</p>
            )}
            {data?.usage.renewalDate ? (
              <p className="mt-2 text-sm text-muted">Renewal {data.usage.renewalDate}</p>
            ) : null}
            <p className="mt-4 text-sm text-ink/75">
              Ask the QB: {data?.usage.questionsRemaining ?? 0} remaining this
              month
              {data?.entitlements.huddleSessionsPerMonth
                ? `. Huddles: ${data.usage.huddlesRemaining} remaining.`
                : "."}
            </p>
            <Button asChild className="mt-6 self-start" variant="secondary">
              <Link to="/hq/membership">Manage Game Plan</Link>
            </Button>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Ask the QB
            </p>
            {data?.questions[0] ? (
              <p className="mt-3 text-ink/80">
                Latest: {data.questions[0].status} —{" "}
                {data.questions[0].body.slice(0, 120)}
              </p>
            ) : (
              <p className="mt-3 text-ink/75">No questions submitted this period.</p>
            )}
            <p className="mt-2 text-sm text-muted">
              {data?.usage.questionsUsed ?? 0} used · {data?.usage.questionsRemaining ?? 0}{" "}
              remaining of {data?.entitlements.askQuestionsPerMonth ?? 0} this month.
            </p>
            <Button asChild className="mt-6 self-start">
              <Link to="/hq/messages" search={{ deal: undefined }}>
                Ask the QB
              </Link>
            </Button>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              My Huddles
            </p>
            {data?.entitlements.huddleSessionsPerMonth ? (
              data.huddles[0] ? (
                <p className="mt-3 text-ink/80">
                  {data.huddles[0].status}
                  {data.huddles[0].scheduled_at
                    ? ` · ${data.huddles[0].scheduled_at}`
                    : ""}
                </p>
              ) : (
                <p className="mt-3 text-ink/75">
                  {data.usage.huddlesRemaining} included session
                  {data.usage.huddlesRemaining === 1 ? "" : "s"} remaining this
                  period.
                </p>
              )
            ) : (
              <p className="mt-3 text-ink/75">
                Live huddles are included with The Playbook and The Huddle.
              </p>
            )}
            <Button asChild className="mt-6 self-start" variant="secondary">
              <Link to="/hq/huddle" search={{ deal: undefined }}>
                Schedule a huddle
              </Link>
            </Button>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              My Equipment
            </p>
            {data?.checklists[0] ? (
              <p className="mt-3 text-ink/80">
                {data.checklists[0].title} — {data.checklists[0].status.replace("_", " ")}
              </p>
            ) : (
              <p className="mt-3 text-ink/75">
                No saved checklists yet. Open Equipment and attach it to a deal.
              </p>
            )}
            <Button asChild className="mt-6 self-start" variant="secondary">
              <Link to="/hq/equipment" search={{ deal: undefined, resource: undefined }}>
                Open my Equipment
              </Link>
            </Button>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              My Documents
            </p>
            {data?.documents[0] ? (
              <ul className="mt-3 space-y-2 text-ink/80">
                {data.documents.slice(0, 3).map((doc) => (
                  <li key={doc.id}>{doc.name}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-ink/75">No saved documents yet.</p>
            )}
            <Button asChild className="mt-6 self-start" variant="secondary">
              <Link to="/hq/documents">Open documents</Link>
            </Button>
          </article>
        </div>
        <p className="mt-10 text-sm text-muted">
          <button
            type="button"
            className="font-display font-semibold uppercase tracking-nav text-steel hover:text-ink"
            onClick={() => void signOut("/")}
          >
            Log out
          </button>
        </p>
      </HqMain>
    </main>
  );
}
