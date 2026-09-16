/** Three-ring binder hardware, locked to the viewport. */
export function BinderRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-1 z-50 hidden w-20 md:block lg:left-3"
    >
      <svg
        viewBox="0 0 80 1000"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="binder-spine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#5c6168" />
            <stop offset="0.35" stopColor="#d8dbe0" />
            <stop offset="0.7" stopColor="#8a9098" />
            <stop offset="1" stopColor="#4a4f56" />
          </linearGradient>
          <linearGradient id="binder-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f5f7" />
            <stop offset="0.28" stopColor="#c8ccd2" />
            <stop offset="0.55" stopColor="#6d737c" />
            <stop offset="0.82" stopColor="#dfe2e6" />
            <stop offset="1" stopColor="#9aa0a8" />
          </linearGradient>
          <filter id="binder-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.4" floodColor="#000" floodOpacity="0.35" />
          </filter>
        </defs>
        <rect x="8" y="48" width="14" height="904" rx="3.5" fill="url(#binder-spine)" />
        <rect x="11" y="56" width="8" height="888" rx="1.5" fill="#2e333a" opacity="0.35" />
        {[170, 500, 830].map((cy) => (
          <g key={cy} filter="url(#binder-shadow)">
            <ellipse cx="50" cy={cy} rx="8" ry="9" fill="#151e32" />
            <path
              d={`M 18 ${cy - 22} L 18 ${cy + 22} A 22 22 0 1 0 18 ${cy - 22} Z`}
              fill="none"
              stroke="url(#binder-ring)"
              strokeWidth="8"
              strokeLinejoin="round"
            />
            <rect x="10" y={cy - 10} width="12" height="20" rx="2" fill="url(#binder-spine)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
