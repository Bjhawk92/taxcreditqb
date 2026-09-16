/** Three rings locked to the viewport, spaced down the visible left edge. */
export function BinderRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-3 z-50 hidden w-14 md:block lg:left-6"
    >
      <div className="absolute top-16 bottom-16 left-[22px] w-[3px] rounded-full bg-ring-dark/80" />
      {[16, 50, 84].map((top) => (
        <div
          key={top}
          className="absolute left-2 -translate-y-1/2"
          style={{ top: `${top}%` }}
        >
          <div className="size-9 rounded-full bg-desk shadow-[inset_0_2px_4px_rgb(0_0_0_/_0.45)] ring-4 ring-paper" />
          <div className="binder-ring absolute left-1.5 top-[-7px] h-12 w-8 rounded-full border-[5px] border-ring border-l-ring-dark" />
        </div>
      ))}
    </div>
  );
}
