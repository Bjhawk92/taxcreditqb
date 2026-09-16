/** Decorative three-ring binder hardware. Hidden from AT. */
export function BinderRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-0 z-30 hidden w-16 lg:block"
    >
      <div className="absolute inset-y-0 left-0 w-6 bg-ink/20" />
      <div className="absolute inset-y-10 left-[22px] w-[3px] rounded-full bg-ring-dark/80" />
      {[18, 50, 82].map((top) => (
        <div
          key={top}
          className="absolute left-3 -translate-y-1/2"
          style={{ top: `${top}%` }}
        >
          <div className="size-9 rounded-full bg-desk shadow-[inset_0_2px_4px_rgb(0_0_0_/_0.45)] ring-4 ring-paper" />
          <div className="binder-ring absolute left-1.5 top-[-7px] h-12 w-8 rounded-full border-[5px] border-ring border-l-ring-dark" />
        </div>
      ))}
    </div>
  );
}
