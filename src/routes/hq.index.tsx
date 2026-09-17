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
  const company =
    data && "companyName" in data
      ? String((data as { companyName?: string }).companyName || "")
      : "";

  return (
    <main id="main">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Locker Room
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-display font-semibold leading-display tracking-display">
            Welcome back, {data?.firstName ?? "there"}.
          </h1>
          <p className="mt-4 max-w-2xl text-lede text-ink/80">
            {data?.entitlements.planName}
            {data?.entitlements.price ? ` · $${data.entitlements.price}/month` : ""}
            {company ? ` · ${company}` : ""}. Projects, Field Pass, Equipment, and
            the next play — all in one locker.
          </p>
        </div>
      </header>
      <HqMain>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/hq/deals" search={{ new: "1" }}>
              Add a project
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/hq/field-report">Open Field Pass</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/hq/messages" search={{ deal: undefined }}>
              Ask the QB
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/hq/alerts">Alerts</Link>
          </Button>
        </div>

        {next ? (
          <section className="mt-8 border border-line bg-paper p-6 md:p-8">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Next play
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {next.title}
            </h2>
            <p className="mt-2 max-w-2xl text-ink/75">{next.body}</p>
            <Button asChild className="mt-6">
              <a href={next.to}>{next.cta}</a>
            </Button>
          </section>
        ) : null}

        {unread.length ? (
          <section className="mt-8 border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Important alerts
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
        ) : (
          <section className="mt-8 border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Important alerts
            </p>
            <p className="mt-3 text-ink/75">
              No unread locker notices. QAP, deadline, and award alerts for your
              followed states will show here.
            </p>
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/alerts">Open alerts</Link>
            </Button>
          </section>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              My Projects
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
                title="No projects yet"
                body="Create a development profile to store site details, scoring work, documents, and analysis."
              />
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/hq/deals" search={{ new: undefined }}>
                  Open projects
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/hq/deals" search={{ new: "1" }}>
                  Add a project
                </Link>
              </Button>
            </div>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Membership
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
              <Link to="/hq/membership">Membership & billing</Link>
            </Button>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Field Pass
            </p>
            <p className="mt-3 text-ink/80">
              {data?.followedStates?.length
                ? `Watching ${data.followedStates.join(" · ")}.`
                : "Choose up to three states to monitor QAP activity."}
            </p>
            <Button asChild className="mt-6 self-start" variant="secondary">
              <Link to="/hq/field-report">Open Field Pass</Link>
            </Button>
          </article>

          <article className="flex flex-col border border-line p-6">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              Recent activity
            </p>
            {data?.documents[0] || data?.questions[0] || data?.deals[0] ? (
              <ul className="mt-3 space-y-2 text-ink/80">
                {data.deals[0] ? <li>Project on file: {data.deals[0].name}</li> : null}
                {data.questions[0] ? (
                  <li>Ask the QB: {data.questions[0].status}</li>
                ) : null}
                {data.documents[0] ? <li>Document: {data.documents[0].name}</li> : null}
              </ul>
            ) : (
              <p className="mt-3 text-ink/75">
                Activity from projects, Equipment, and Field Pass will collect here.
              </p>
            )}
            <Button asChild className="mt-6 self-start" variant="secondary">
              <Link to="/hq/equipment" search={{ deal: undefined, resource: undefined }}>
                Equipment Room
              </Link>
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
