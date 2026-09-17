import { cn } from "@/lib/utils";

const PENCIL = "Architects Daughter, Bradley Hand, Segoe Print, cursive";

/** Faint coach's-whiteboard: X's, O's, drawn routes. Decorative. */
export function PlaybookBackdrop({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 size-full opacity-30",
        className,
      )}
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="pb-lines" width="80" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 39.5h80" stroke="#1e3356" strokeWidth="0.6" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="1200" height="640" fill="url(#pb-lines)" />
      {/* hash marks — stop at the goal line */}
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={i} opacity="0.12" stroke="#1e3356" strokeWidth="1">
          <line x1={80 + i * 80} y1="70" x2={80 + i * 80} y2="600" />
        </g>
      ))}

      {/* End zone */}
      <g opacity="0.36" stroke="#1e3356" fill="none">
        <rect x="80" y="6" width="1040" height="64" strokeWidth="1.8" />
        <line x1="80" y1="70" x2="1120" y2="70" strokeWidth="2.6" />
      </g>
      <text
        x="550"
        y="39"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Barlow Condensed, Impact, sans-serif"
        fontWeight="800"
        fontSize="52"
        letterSpacing="0.14em"
        fill="#1e3356"
        opacity="0.52"
      >
        AWARD
      </text>

      {/* OL — O's */}
      {[
        [430, 430],
        [490, 430],
        [550, 430],
        [610, 430],
        [670, 430],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="13" fill="none" stroke="#1e3356" strokeWidth="2.2" opacity="0.28" />
      ))}
      {/* QB */}
      <circle cx="550" cy="510" r="24" fill="none" stroke="#1e3356" strokeWidth="2.8" opacity="0.45" />
      <text
        x="550"
        y="510"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="22"
        fontFamily={PENCIL}
        fill="#1e3356"
        opacity="0.55"
        letterSpacing="0.04em"
      >
        QB
      </text>
      {/* RB */}
      <circle cx="490" cy="530" r="12" fill="none" stroke="#1e3356" strokeWidth="2" opacity="0.25" />

      {/* WR / TE — O's */}
      {[
        [220, 430],
        [300, 450],
        [718, 430],
        [800, 450],
        [880, 430],
        [980, 450],
      ].map(([x, y], i) => (
        <circle key={`w${i}`} cx={x} cy={y} r="12" fill="none" stroke="#1e3356" strokeWidth="2" opacity="0.28" />
      ))}

      {/* Defense X's */}
      {DEFENSE.filter((spot) => !spot.hideMark).map((spot, i) => (
        <g key={`x-${i}`} opacity="0.26" stroke="#1e3356" strokeWidth="2.2">
          <line x1={spot.x - 9} y1={spot.y - 9} x2={spot.x + 9} y2={spot.y + 9} />
          <line x1={spot.x + 9} y1={spot.y - 9} x2={spot.x - 9} y2={spot.y + 9} />
        </g>
      ))}

      {/* Defense labels — same pencil stroke, faint */}
      <g
        fill="#1e3356"
        fontFamily={PENCIL}
        fontSize="22.5"
        letterSpacing="0.08em"
        opacity="0.42"
      >
        {DEFENSE.filter((spot) => spot.label && spot.lx != null && spot.ly != null).map((spot) => (
          <text
            key={spot.label}
            x={spot.lx}
            y={spot.ly}
            fontSize={spot.fontSize}
            letterSpacing={spot.tracking}
            textAnchor={spot.anchor ?? "start"}
            transform={spot.tilt ? `rotate(${spot.tilt} ${spot.lx} ${spot.ly})` : undefined}
          >
            {spot.label.split("\n").map((line, i) => (
              <tspan key={line} x={spot.lx} dy={i === 0 ? 0 : "1.05em"}>
                {line}
              </tspan>
            ))}
          </text>
        ))}
      </g>

      {/* Routes */}
      <g fill="none" stroke="#1e3356" strokeWidth="1.8" strokeLinecap="round" opacity="0.32">
        {/* post */}
        <path d="M220 418 C220 340 220 260 220 200 C220 160 280 140 340 140" />
        {/* slant */}
        <path d="M300 438 C340 400 400 340 460 300" />
        {/* go */}
        <path d="M880 418 V150" />
        {/* out */}
        <path d="M980 438 C980 360 980 300 1040 300" />
        {/* checkdown */}
        <path d="M490 518 C430 500 380 490 340 500" strokeDasharray="6 5" />
        {/* QB sweep right, then north to the end zone */}
        <path d="M550 495 C620 500 700 470 740 420 V72" strokeDasharray="5 4" />
      </g>
      {/* arrows */}
      <g fill="#1e3356" opacity="0.32">
        <polygon points="340,140 328,152 352,152" />
        <polygon points="460,300 448,312 468,308" />
        <polygon points="880,150 872,164 888,164" />
        <polygon points="1040,300 1028,290 1028,310" />
        <polygon points="740,70 732,84 748,84" />
      </g>

      {/* Blocks — T at the defender */}
      <g fill="none" stroke="#1e3356" strokeWidth="1.9" strokeLinecap="round" opacity="0.36">
        {/* TE on NIMBY */}
        <path d="M718 418 L760 312" />
        <path d="M753 309 L767 315" />
        {/* Slot WR on FINANCING */}
        <path d="M800 438 L656 302" />
        <path d="M649 296 L663 308" />
      </g>

      {/* second play, lighter, shifted */}
      <g opacity="0.14" fill="none" stroke="#1e3356" strokeWidth="1.6">
        <circle cx="160" cy="520" r="11" />
        <circle cx="160" cy="400" r="11" />
        <path d="M160 508 C120 470 90 400 90 320" />
        <path d="M160 388 V200" />
        <g strokeWidth="2">
          <line x1="110" y1="250" x2="128" y2="268" />
          <line x1="128" y1="250" x2="110" y2="268" />
        </g>
      </g>
    </svg>
  );
}

type DefenseSpot = {
  x: number;
  y: number;
  label?: string;
  lx?: number;
  ly?: number;
  anchor?: "start" | "middle" | "end";
  tilt?: number;
  hideMark?: boolean;
  fontSize?: number;
  tracking?: string;
};

const DEFENSE: DefenseSpot[] = [
  { x: 250, y: 280 },
  { x: 360, y: 300 },
  { x: 470, y: 290, label: "ZONING", lx: 470, ly: 272, anchor: "middle", tilt: -2 },
  { x: 560, y: 270, label: "SITE\nCONTROL", lx: 560, ly: 228, anchor: "middle", tilt: 1 },
  { x: 650, y: 290, label: "FINANCING", lx: 650, ly: 324, anchor: "middle", tilt: 1 },
  { x: 460, y: 385, label: "COMPETITOR", lx: 460, ly: 348, anchor: "middle", tilt: -1, fontSize: 16, tracking: "0.04em" },
  { x: 520, y: 385, label: "DEADLINE", lx: 520, ly: 372, anchor: "middle", tilt: 1, fontSize: 16, tracking: "0.04em" },
  { x: 580, y: 385, label: "UNDERWRITER", lx: 580, ly: 348, anchor: "middle", tilt: -1, fontSize: 16, tracking: "0.04em" },
  { x: 640, y: 385, label: "SCORING", lx: 640, ly: 372, anchor: "middle", tilt: 1, fontSize: 16, tracking: "0.04em" },
  { x: 760, y: 300, label: "NIMBY", lx: 772, ly: 328, tilt: -2 },
  { x: 870, y: 280, label: "QAP", lx: 852, ly: 266, anchor: "end", tilt: 2 },
  { x: 550, y: 160, label: "CITY COUNCIL", lx: 568, ly: 148, tilt: -2 },
  { x: 480, y: 120, label: "CONSTRUCTION", lx: 480, ly: 102, anchor: "middle", tilt: -1 },
];
