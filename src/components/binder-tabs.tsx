import { Link } from "@tanstack/react-router";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const TAB = {
  navy: "binder-tab-navy",
  blue: "binder-tab-blue",
  gold: "binder-tab-gold",
  green: "binder-tab-green",
  burgundy: "binder-tab-burgundy",
  slate: "binder-tab-slate",
} as const;

export function BinderTabs() {
  return (
    <nav
      aria-label="Playbook tabs"
      className="pointer-events-none absolute top-36 right-0 bottom-24 z-40 hidden w-12 lg:block"
    >
      <ul className="flex h-full flex-col gap-1.5">
        {NAV.map((item) => (
          <li key={item.to} className="min-h-0 flex-1">
            <Link
              to={item.to}
              title={item.blurb}
              className={cn(
                "pointer-events-auto flex h-full w-10 items-center justify-center rounded-r-md shadow-md transition-[width,filter] duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
                TAB[item.tab],
                "hover:w-12 [&.active]:w-12 [&.active]:brightness-110",
              )}
            >
              <span className="max-h-full rotate-180 font-display text-[11px] font-semibold uppercase tracking-nav [writing-mode:vertical-rl]">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function BinderTabStrip() {
  return (
    <nav
      aria-label="Playbook tabs"
      className="flex gap-1 overflow-x-auto border-b border-line bg-paper px-2 py-2 lg:hidden"
    >
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "inline-flex min-h-10 shrink-0 items-center rounded-sm px-3 font-display text-xs font-semibold uppercase tracking-nav",
            TAB[item.tab],
            "opacity-90 [&.active]:opacity-100 [&.active]:ring-2 [&.active]:ring-ink [&.active]:ring-offset-1 [&.active]:ring-offset-paper",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
