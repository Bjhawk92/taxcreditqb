import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { FilmLibrary } from "@/components/film-card";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Input } from "@/components/ui/field";
import { FILM_CLIPS, type FilmTopic } from "@/lib/videos";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/hq/film")({
  component: HqFilm,
});

const TOPICS = [
  { id: "all", label: "All clips" },
  { id: "questions", label: "Tough questions" },
  { id: "city", label: "City introductions" },
  { id: "hearing", label: "Public hearings" },
  { id: "marketing", label: "Marketing" },
  { id: "site", label: "Site strategy" },
  { id: "team", label: "The right people" },
] as const;

function HqFilm() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]["id"]>("all");

  const clips = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return FILM_CLIPS.filter((clip) => {
      if (topic !== "all" && clip.topic !== (topic as FilmTopic)) return false;
      if (!needle) return true;
      return (
        clip.title.toLowerCase().includes(needle) ||
        clip.description.toLowerCase().includes(needle) ||
        clip.format.toLowerCase().includes(needle)
      );
    });
  }, [q, topic]);

  return (
    <main id="main">
      <HqHeader
        title="Film Room"
        sub="Short clips on the conversations, decks, and specialists around a LIHTC deal. Unpublished titles stay marked Coming Soon."
      />
      <HqMain>
        <label className="block max-w-md text-sm" htmlFor="film-search">
          <span className="mb-2 block font-display text-sm font-semibold uppercase tracking-nav">
            Search
          </span>
          <Input
            id="film-search"
            value={q}
            onChange={(e) => setQ(e.currentTarget.value)}
            placeholder="Hearings, city meetings, modeling…"
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
        {clips.length === 0 ? (
          <div className="mt-10">
            <HqEmpty
              title="No matching clips"
              body="Nothing in the current library matches that search. Only listed titles appear here."
            />
          </div>
        ) : (
          <div className="mt-10">
            <FilmLibrary clips={clips} />
          </div>
        )}
      </HqMain>
    </main>
  );
}
