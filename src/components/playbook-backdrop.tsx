import { cn } from "@/lib/utils";

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
      {/* hash marks */}
      {Array.from({ length: 14 }).map((_, i) => (
        <g key={i} opacity="0.12" stroke="#1e3356" strokeWidth="1">
          <line x1={80 + i * 80} y1="40" x2={80 + i * 80} y2="600" />
        </g>
      ))}

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
      <circle cx="550" cy="510" r="15" fill="none" stroke="#1e3356" strokeWidth="2.6" opacity="0.38" />
      <text x="550" y="516" textAnchor="middle" fontSize="11" fontFamily="Barlow Condensed, sans-serif" fill="#1e3356" opacity="0.4">
        QB
      </text>
      {/* RB */}
      <circle cx="490" cy="530" r="12" fill="none" stroke="#1e3356" strokeWidth="2" opacity="0.25" />

      {/* WR / TE — O's */}
      {[
        [220, 430],
        [300, 450],
        [880, 430],
        [980, 450],
      ].map(([x, y], i) => (
        <circle key={`w${i}`} cx={x} cy={y} r="12" fill="none" stroke="#1e3356" strokeWidth="2" opacity="0.28" />
      ))}

      {/* Defense X's */}
      {[
        [250, 280],
        [360, 300],
        [470, 290],
        [560, 270],
        [650, 290],
        [760, 300],
        [870, 280],
        [320, 180],
        [550, 160],
        [800, 180],
        [480, 120],
      ].map(([x, y], i) => (
        <g key={`x${i}`} opacity="0.26" stroke="#1e3356" strokeWidth="2.2">
          <line x1={x - 9} y1={y - 9} x2={x + 9} y2={y + 9} />
          <line x1={x + 9} y1={y - 9} x2={x - 9} y2={y + 9} />
        </g>
      ))}

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
        {/* boot */}
        <path d="M550 495 C620 500 700 470 740 420" strokeDasharray="5 4" />
      </g>
      {/* arrows */}
      <g fill="#1e3356" opacity="0.32">
        <polygon points="340,140 328,152 352,152" />
        <polygon points="460,300 448,312 468,308" />
        <polygon points="880,150 872,164 888,164" />
        <polygon points="1040,300 1028,290 1028,310" />
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
