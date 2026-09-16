import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { isFilmReady, type FilmClip } from "@/lib/videos";

export function VideoModal({
  clip,
  onClose,
}: {
  clip: FilmClip | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const open = Boolean(clip && isFilmReady(clip));

  useEffect(() => {
    if (open) return;
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, [open]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-ink/80" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-[71] mx-auto w-auto max-h-[90dvh] max-w-4xl -translate-y-1/2 overflow-y-auto border border-line bg-paper p-4 shadow-border focus:outline-none md:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {!clip ? (
                <Dialog.Title className="sr-only">Film Room</Dialog.Title>
              ) : (
                <>
                  <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
                    {clip.format}
                    {clip.runtime ? ` · ${clip.runtime}` : ""}
                  </p>
                  <Dialog.Title className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink">
                    {clip.title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm text-ink/75">
                    {clip.description}
                  </Dialog.Description>
                </>
              )}
            </div>
            <Dialog.Close asChild>
              <Button
                type="button"
                variant="secondary"
                className="shrink-0 px-3"
                aria-label="Close video"
              >
                <X className="size-4" />
                Close
              </Button>
            </Dialog.Close>
          </div>

          {clip && isFilmReady(clip) ? (
            <div className="overflow-hidden border border-line bg-ink">
              <video
                ref={videoRef}
                className="aspect-video w-full"
                controls
                playsInline
                preload="metadata"
                poster={clip.thumbnail.src}
                controlsList="nodownload"
              >
                <source src={clip.videoSrc} />
                {clip.captionsSrc ? (
                  <track
                    kind="captions"
                    src={clip.captionsSrc}
                    srcLang="en"
                    label={clip.captionsLabel}
                    default
                  />
                ) : null}
              </video>
            </div>
          ) : null}

          {clip && !clip.captionsSrc ? (
            <p className="mt-3 text-sm text-muted">
              Captions will ship with the recorded clip.
            </p>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
