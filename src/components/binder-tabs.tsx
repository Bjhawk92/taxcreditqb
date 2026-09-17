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
  hq: "binder-tab-hq",
  tools: "binder-tab-tools",
} as const;

export function BinderTabs() {
  return (
    <nav
      aria-label="Playbook tabs"
      className="fixed top-64 right-2 z-50 hidden w-[10.5rem] lg:block xl:right-8"
    >
      <ul className="flex flex-col gap-1">
        {NAV.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              title={item.blurb}
              className={cn(
                "flex h-12 w-full items-center justify-end rounded-r-md px-4 shadow-md transition-transform duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
                TAB[item.tab],
                "hover:translate-x-1 [&.active]:translate-x-1 [&.active]:brightness-110",
              )}
            >
              <span className="whitespace-nowrap font-display text-lg font-semibold uppercase tracking-nav">
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
      className="flex flex-wrap gap-1.5 border-b border-line bg-paper px-2 py-2 sm:gap-2 sm:px-3 md:gap-1.5 md:px-3 md:py-2.5 lg:hidden"
    >
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "inline-flex min-h-12 flex-1 basis-[46%] items-center justify-center rounded-sm px-2 text-center font-display text-base font-semibold uppercase tracking-[0.04em] sm:min-h-12 sm:basis-[30%] sm:text-lg sm:tracking-nav md:min-h-12 md:basis-[22%] md:px-2.5 md:text-lg",
            TAB[item.tab],
            "opacity-95 [&.active]:opacity-100 [&.active]:ring-2 [&.active]:ring-ink [&.active]:ring-offset-1 [&.active]:ring-offset-paper",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
