import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqMain, HqStatus } from "@/components/hq-empty";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { getHqHome } from "@/lib/hq";

export const Route = createFileRoute("/hq/")({
  component: HqHome,
});

function firstName(name: string | null | undefined) {
  if (!name) return "there";
  return name.split(" ")[0] ?? "there";
}

function HqHome() {
  const user = useCurrentUser();
  const [data, setData] = useState<Awaited<ReturnType<typeof getHqHome>> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHqHome()
      .then(setData)
      .catch(() =>
        setError("Could not load Team HQ. Sign in again if this continues."),
      );
  }, []);

  const awaiting = [
    ...(data?.questions.filter((q) => q.status === "awaiting information") ?? []),
  ];
  const reviewFiles =
    data?.files.filter((f) => f.status === "for review") ?? [];
  const nextHuddle = data?.huddles.find((h) => h.status === "accepted");
  const nextMeeting = data?.meetings.find((m) => m.status === "accepted");
  const hasCalendar =
    Boolean(nextHuddle || nextMeeting) ||
    (data && (data.huddles.length > 0 || data.meetings.length > 0));

  return (
    <main id="main">
      <PageHero
        eyebrow="Team HQ"
        title={`Welcome back, ${firstName(user?.displayName)}.`}
        sub="Your next steps, upcoming meetings and latest project updates."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/hq/messages">Ask a question</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/hq/huddle">Schedule a huddle</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/hq/files">Upload a file</Link>
          </Button>
        </div>
      </PageHero>
      <HqMain>
        {error ? <p className="mb-6 text-sm text-ink">{error}</p> : null}

        <div className="grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Next huddle or meeting
            </h2>
            {!data || !hasCalendar ? (
              <div className="mt-4">
                <HqEmpty
                  title="Nothing on the calendar"
                  body="No huddle or meeting is scheduled. A request is not confirmed until Tax Credit QB accepts it."
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {nextHuddle ? (
                  <li className="border border-line bg-paper p-4">
                    <HqStatus value={`Huddle · ${nextHuddle.status}`} />
                    <p className="mt-1">{nextHuddle.question}</p>
                    {nextHuddle.scheduled_at ? (
                      <p className="mt-2 text-sm text-muted">{nextHuddle.scheduled_at}</p>
                    ) : null}
                  </li>
                ) : null}
                {nextMeeting ? (
                  <li className="border border-line bg-paper p-4">
                    <HqStatus value={`Meeting support · ${nextMeeting.status}`} />
                    <p className="mt-1">{nextMeeting.meeting_type}</p>
                    {nextMeeting.meeting_at ? (
                      <p className="mt-2 text-sm text-muted">{nextMeeting.meeting_at}</p>
                    ) : null}
                  </li>
                ) : null}
                {!nextHuddle && !nextMeeting
                  ? data.huddles.slice(0, 2).map((h) => (
                      <li key={`h-${h.id}`} className="border border-line bg-paper p-4">
                        <HqStatus value={`Huddle · ${h.status} — not confirmed`} />
                        <p className="mt-1">{h.question}</p>
                      </li>
                    ))
                  : null}
                {!nextHuddle && !nextMeeting
                  ? data.meetings.slice(0, 2).map((m) => (
                      <li key={`m-${m.id}`} className="border border-line bg-paper p-4">
                        <HqStatus value={`Meeting support · ${m.status} — not booked`} />
                        <p className="mt-1">{m.meeting_type}</p>
                      </li>
                    ))
                  : null}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Awaiting your review
            </h2>
            {awaiting.length === 0 && reviewFiles.length === 0 ? (
              <div className="mt-4">
                <HqEmpty
                  title="Nothing waiting"
                  body="When a file or question needs your response, it will show here. New accounts start empty."
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {awaiting.map((q) => (
                  <li key={`q-${q.id}`} className="border border-line bg-paper p-4">
                    <HqStatus value="Question · awaiting information" />
                    <p className="mt-1">{q.body}</p>
                  </li>
                ))}
                {reviewFiles.map((f) => (
                  <li key={`f-${f.id}`} className="border border-line bg-paper p-4">
                    <HqStatus value="File · for review" />
                    <p className="mt-1">{f.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Recent messages
            </h2>
            {data && data.questions.length === 0 && data.messages.length === 0 ? (
              <div className="mt-4">
                <HqEmpty
                  title="No messages yet"
                  body="Questions you submit appear here with status: submitted, awaiting information, or answered."
                />
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {data?.questions.slice(0, 3).map((m) => (
                  <li key={m.id} className="border border-line bg-paper p-4">
                    <HqStatus value={m.status} />
                    <p className="mt-1">{m.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              File updates
            </h2>
            {data && data.files.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {data.files.slice(0, 4).map((f) => (
                  <li key={f.id} className="border border-line bg-paper p-4">
                    <HqStatus value={f.status} />
                    <p className="mt-1">{f.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      {f.project_name || "Unassigned"} · {f.format || "File"}{" "}
                      {f.version ? `· ${f.version}` : ""}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4">
                <HqEmpty
                  title="No file updates"
                  body="Secure uploads are not live yet. Do not treat this portal as storing files. Email materials until object storage is connected. Logged deliverables will appear here."
                />
              </div>
            )}
          </section>
        </div>
      </HqMain>
    </main>
  );
}
