import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

export function VideoPlaceholder({
  caption,
  className,
}: {
  caption: string;
  className?: string;
}) {
  return (
    <figure className={cn(className)}>
      <div className="relative aspect-video overflow-hidden border border-line bg-ink">
        <img
          src="/textures/hero-grid.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-paper/40 text-paper">
            <Play className="size-5 translate-x-0.5" fill="currentColor" />
          </span>
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-paper">
            Video: replace with recorded clip
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
