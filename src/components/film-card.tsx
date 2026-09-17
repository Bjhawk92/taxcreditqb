import { Play } from "lucide-react";
import { useState } from "react";
import { VideoModal } from "@/components/video-modal";
import { isFilmReady, type FilmClip } from "@/lib/videos";
import { cn } from "@/lib/utils";

export function FilmCard({
  clip,
  onPlay,
}: {
  clip: FilmClip;
  onPlay: (id: string) => void;
}) {
  const ready = isFilmReady(clip);

  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative overflow-hidden border border-line bg-ink outline outline-1 -outline-offset-1 outline-ink/10 transition-colors duration-150 group-hover:border-ink">
        {ready ? (
          <button
            type="button"
            onClick={() => onPlay(clip.id)}
            aria-haspopup="dialog"
            aria-label={`Play ${clip.title}`}
            className="relative block aspect-video w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            <Thumbnail clip={clip} />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors duration-150 group-hover:bg-ink/35">
              <span className="inline-flex size-16 items-center justify-center rounded-full border border-paper/70 bg-paper text-ink shadow-border transition-transform duration-150 ease-out group-hover:scale-105 active:scale-[0.96]">
                <Play className="size-6 translate-x-0.5" fill="currentColor" />
              </span>
            </span>
          </button>
        ) : (
          <div className="relative aspect-video w-full">
            <Thumbnail clip={clip} />
            <span className="absolute inset-0 bg-ink/10" />
            <span className="absolute right-3 top-3 border border-paper/40 bg-ink/80 px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-mark text-paper">
              Coming Soon
            </span>
            <span className="sr-only">Video coming soon.</span>
          </div>
        )}
      </div>

      <p className="mt-4 font-display text-sm font-semibold uppercase tracking-mark text-steel">
        {clip.format}
        {ready && clip.runtime ? ` · ${clip.runtime}` : ""}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">
        {clip.title}
      </h2>
      <p className="mt-2 text-ink/75">{clip.description}</p>
      {clip.thumbnail.caption ? (
        <p className="mt-3 text-sm text-muted">{clip.thumbnail.caption}</p>
      ) : null}
    </article>
  );
}

function Thumbnail({ clip }: { clip: FilmClip }) {
  return (
    <img
      src={clip.thumbnail.src}
      alt={clip.thumbnail.alt}
      className="absolute inset-0 size-full object-cover"
    />
  );
}

export function FilmLibrary({
  clips,
  className,
}: {
  clips: FilmClip[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = clips.find((clip) => clip.id === activeId) ?? null;

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12",
          className,
        )}
      >
        {clips.map((clip) => (
          <FilmCard key={clip.id} clip={clip} onPlay={setActiveId} />
        ))}
      </div>
      <VideoModal clip={active} onClose={() => setActiveId(null)} />
    </>
  );
}
