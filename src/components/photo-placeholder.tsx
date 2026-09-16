import { cn } from "@/lib/utils";

type Aspect = "photo" | "portrait" | "wide" | "square";

const aspectClass: Record<Aspect, string> = {
  photo: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/9]",
  square: "aspect-square",
};

export function PhotoPlaceholder({
  caption,
  kicker = "Brett Johnson photography",
  aspect = "photo",
  texture = "/textures/site-plan.jpg",
  className,
}: {
  caption: string;
  kicker?: string;
  aspect?: Aspect;
  texture?: string;
  className?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div
        className={cn(
          "relative overflow-hidden border border-line bg-paper-dim plan-grid",
          aspectClass[aspect],
        )}
      >
        <img
          src={texture}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50 mix-blend-multiply"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
          <p className="font-display text-xs font-semibold uppercase tracking-mark text-steel">
            {kicker}
          </p>
          <p className="max-w-xs font-display text-lg font-semibold leading-snug tracking-tight text-ink md:text-xl">
            Photo placeholder
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}
