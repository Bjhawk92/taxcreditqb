/** Three rings locked in the viewport. All visible without scrolling. */
export function BinderRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-32 left-3 z-50 hidden h-72 w-14 md:block lg:left-6"
    >
      <div className="absolute inset-y-2 left-[22px] w-[3px] rounded-full bg-ring-dark/80" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-2"
          style={{ top: `${i * 5.5 + 0.5}rem` }}
        >
          <div className="size-9 rounded-full bg-desk shadow-[inset_0_2px_4px_rgb(0_0_0_/_0.45)] ring-4 ring-paper" />
          <div className="binder-ring absolute left-1.5 top-[-7px] h-12 w-8 rounded-full border-[5px] border-ring border-l-ring-dark" />
        </div>
      ))}
    </div>
  );
}
