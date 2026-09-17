import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Right-side hero visual: architectural site plan + development play.
 * Swap `HERO_FIELD_NOTE` later for Site Scout — same card, new copy/href.
 */
export const HERO_FIELD_NOTE = {
  kicker: "QAP Intelligence",
  title: "50 states. One field.",
  detail: "Current QAPs · Applications · Scoring · Updates",
  cta: "Explore QAPs",
  to: "/tools" as const,
  hash: "qap",
};

type Density = "full" | "simple";

export function HeroPlayDiagram({
  density = "full",
  className,
}: {
  density?: Density;
  className?: string;
}) {
  const full = density === "full";

  return (
    <div className={cn("relative h-full w-full", className)}>
      <div
        className={cn(
          "relative overflow-hidden",
          full
            ? "flex h-full items-center justify-end pr-3 xl:pr-6"
            : "mx-auto max-w-md",
        )}
      >
        <div
          className={cn(
            "relative",
            full
              ? "h-[94%] w-auto max-w-full aspect-[720/884]"
              : "aspect-[16/10] w-full overflow-hidden",
          )}
        >
          <div
            className={cn(
              full
                ? "absolute inset-0"
                : "absolute inset-x-[-6%] bottom-[-8%] h-[150%] w-[112%]",
            )}
            style={{
              maskImage: full
                ? "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 16%, #000 32%)"
                : "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
              WebkitMaskImage: full
                ? "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.55) 16%, #000 32%)"
                : "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
            }}
          >
            <img
              src="/textures/hero-play-sheet.png"
              alt=""
              width={720}
              height={884}
              className="absolute inset-0 size-full object-contain object-right mix-blend-multiply opacity-[0.64]"
            />
            <PlayOverlay density={density} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-auto",
          full
            ? "absolute bottom-[20%] right-[4%] z-20 w-52 xl:bottom-[16%] xl:right-[7%]"
            : "relative z-20 mx-auto mt-4 max-w-sm",
        )}
      >
        <FieldNoteCard />
      </div>
    </div>
  );
}

function FieldNoteCard() {
  const note = HERO_FIELD_NOTE;
  return (
    <article className="border border-line border-l-2 border-l-steel bg-paper/95 px-3.5 py-3 shadow-[0_8px_20px_rgb(30_51_86/0.07)]">
      <p className="font-display text-xs font-semibold uppercase tracking-mark text-steel">
        {note.kicker}
      </p>
      <p className="mt-1 font-display text-base font-semibold leading-snug tracking-tight text-ink">
        {note.title}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-ink/70">{note.detail}</p>
      <Link
        to={note.to}
        hash={note.hash}
        className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-nav text-steel hover:text-ink"
      >
        {note.cta}
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

function PlayOverlay({ density }: { density: Density }) {
  const full = density === "full";
  const steel = `hp-arrow-steel-${density}`;
  const ink = `hp-arrow-ink-${density}`;
  return (
    <svg
      className="pointer-events-none absolute inset-0 size-full opacity-[0.5] mix-blend-multiply"
      viewBox="0 0 720 884"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <marker
          id={steel}
          markerWidth="9"
          markerHeight="9"
          refX="7"
          refY="3.5"
          orient="auto"
        >
          <path d="M0 0.4 L8 3.5 L0 6.6 Z" fill="#3a7ec4" />
        </marker>
        <marker
          id={ink}
          markerWidth="8"
          markerHeight="8"
          refX="6.5"
          refY="3.2"
          orient="auto"
        >
          <path d="M0 0.4 L7 3.2 L0 6 Z" fill="#1e3356" />
        </marker>
      </defs>

      {/* Main development route: SITE → QAP → SCORE → MODEL → CONTROL */}
      <path
        d="M 356 798 C 348 750 372 690 392 598 C 404 528 328 452 348 358 C 362 298 428 232 412 176 C 398 128 352 96 368 70 C 392 48 468 42 538 52"
        fill="none"
        stroke="#3a7ec4"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#${steel})`}
      />

      {/* Checkdown — soft funds question off the QAP step */}
      <path
        d="M 392 598 C 468 586 538 548 586 508"
        fill="none"
        stroke="#3a7ec4"
        strokeWidth="1.35"
        strokeDasharray="5 5"
        strokeLinecap="round"
        markerEnd={`url(#${steel})`}
      />

      {full ? (
        <path
          d="M 356 798 C 286 772 214 708 168 652"
          fill="none"
          stroke="#1e3356"
          strokeWidth="1.25"
          strokeDasharray="4 6"
          strokeLinecap="round"
          markerEnd={`url(#${ink})`}
          opacity="0.75"
        />
      ) : null}

      {/* O's — our positions on the buildings */}
      <OMark x={228} y={402} />
      <OMark x={538} y={396} />
      <OMark x={214} y={176} />
      <OMark x={528} y={158} />
      {full ? <OMark x={358} y={686} r={10} /> : null}

      {/* X's — constraints on the field, not people */}
      <XMark x={176} y={268} />
      <XMark x={568} y={246} />
      <XMark x={612} y={472} />
      {full ? (
        <>
          <XMark x={196} y={518} />
          <XMark x={132} y={154} />
        </>
      ) : null}

      <Node x={356} y={798} n="1" />
      <Node x={392} y={598} n="2" />
      <Node x={348} y={358} n="3" />
      <Node x={412} y={176} n="4" />
      <Node x={368} y={70} n="5" />

      <Note x={402} y={818} rotate={-4}>
        SITE CONTROL
      </Note>
      <Note x={438} y={592} rotate={-2} fill="#3a7ec4">
        QAP
      </Note>
      <Note x={392} y={344} rotate={3} fill="#3a7ec4">
        SCORE
      </Note>
      <Note x={456} y={168} rotate={-6}>
        RUN MODEL
      </Note>
      {full ? (
        <>
          <Note x={418} y={58} rotate={-8} fill="#3a7ec4">
            NEXT PLAY
          </Note>
          <Note x={388} y={92} rotate={-6}>
            CONTROL
          </Note>
          <Note x={78} y={46} rotate={-7}>
            READ THE FIELD
          </Note>
        </>
      ) : null}
      <Note x={498} y={492} rotate={6}>
        SOFT FUNDS?
      </Note>
      {full ? (
        <Note x={86} y={638} rotate={-11}>
          LOCAL SUPPORT
        </Note>
      ) : null}

      {/* Small check at SCORE */}
      <path
        d="M 328 348 L 336 358 L 352 338"
        fill="none"
        stroke="#3a7ec4"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
    </svg>
  );
}

function Node({ x, y, n }: { x: number; y: number; n: string }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="12"
        fill="#f3efe6"
        fillOpacity="0.35"
        stroke="#3a7ec4"
        strokeWidth="1.6"
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="Barlow Condensed, sans-serif"
        fill="#3a7ec4"
      >
        {n}
      </text>
    </g>
  );
}

function Note({
  x,
  y,
  rotate = 0,
  fill = "#1e3356",
  children,
}: {
  x: number;
  y: number;
  rotate?: number;
  fill?: string;
  children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      transform={`rotate(${rotate} ${x} ${y})`}
      fontSize="13"
      fontWeight="600"
      fontFamily="Barlow Condensed, sans-serif"
      letterSpacing="0.14em"
      fill={fill}
      opacity="0.82"
    >
      {children}
    </text>
  );
}

function XMark({ x, y, s = 7 }: { x: number; y: number; s?: number }) {
  return (
    <g opacity="0.42" stroke="#1e3356" strokeWidth="1.65" strokeLinecap="round">
      <line x1={x - s} y1={y - s} x2={x + s} y2={y + s} />
      <line x1={x + s} y1={y - s} x2={x - s} y2={y + s} />
    </g>
  );
}

function OMark({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      fill="none"
      stroke="#1e3356"
      strokeWidth="1.55"
      opacity="0.4"
    />
  );
}
