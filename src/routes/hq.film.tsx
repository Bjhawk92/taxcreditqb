import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Input } from "@/components/ui/field";
import { VIDEO_GROUPS } from "@/lib/videos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hq/film")({
  component: HqFilm,
});

const TOPICS = [
  { id: "all", label: "All topics", ids: [] as readonly string[] },
  { id: "land", label: "Land and negotiations", ids: ["land", "contract"] },
  { id: "muni", label: "Municipal introductions", ids: ["intro"] },
  { id: "hearings", label: "Public hearings and neighborhood concerns", ids: ["opposition"] },
  { id: "experience", label: "Presenting company experience", ids: ["rooms"] },
  { id: "partners", label: "Development partners and execution", ids: ["partners", "leaseup"] },
] as const;

function HqFilm() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]["id"]>("all");

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const topicIds = topic === "all" ? null : TOPICS.find((t) => t.id === topic)?.ids;
    return VIDEO_GROUPS.map((g) => ({
      ...g,
      items: g.items.filter((v) => {
        if (topicIds && !(topicIds as readonly string[]).includes(v.id)) return false;
        if (!needle) return true;
        return (
          v.title.toLowerCase().includes(needle) ||
          v.body.toLowerCase().includes(needle) ||
          g.heading.toLowerCase().includes(needle)
        );
      }),
    })).filter((g) => g.items.length > 0);
  }, [q, topic]);

  return (
    <main id="main">
      <HqHeader
        title="Film Room"
        sub="Instructional clips included with membership. Only real titles are listed. Unpublished clips stay marked as not recorded."
      />
      <HqMain>
        <label className="block max-w-md text-sm" htmlFor="film-search">
          <span className="mb-2 block font-display text-sm font-semibold uppercase tracking-nav">
            Search
          </span>
          <Input
            id="film-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Land, hearings, syndicators…"
          />
        </label>
        <div className="mt-6 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTopic(t.id)}
              className={cn(
                "min-h-11 rounded-sm border px-3 font-display text-sm font-semibold uppercase tracking-nav",
                topic === t.id
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-ink hover:border-ink",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        {groups.length === 0 ? (
          <div className="mt-10">
            <HqEmpty
              title="No matching clips"
              body="Nothing in the current library matches that search. Only recorded and listed titles appear here."
            />
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            {groups.map((g) => (
              <section key={g.heading}>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {g.heading}
                </h2>
                <ul className="mt-4 grid gap-4 md:grid-cols-2">
                  {g.items.map((v) => (
                    <li key={v.id} className="border border-line p-5">
                      <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                      <p className="mt-1 text-sm uppercase tracking-nav text-muted">
                        {v.available ? `${v.duration} · Available` : "Not recorded yet"}
                      </p>
                      <p className="mt-2 text-ink/75">{v.body}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </HqMain>
    </main>
  );
}
