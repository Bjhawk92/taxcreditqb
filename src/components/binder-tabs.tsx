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
      className="fixed top-28 right-2 z-50 hidden w-28 lg:block xl:right-5"
    >
      <ul className="flex flex-col gap-0.5">
        {NAV.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              title={item.blurb}
              className={cn(
                "flex h-8 w-full items-center justify-end rounded-r-md px-2.5 shadow-md transition-transform duration-150",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper",
                TAB[item.tab],
                "hover:translate-x-1 [&.active]:translate-x-1 [&.active]:brightness-110",
              )}
            >
              <span className="font-display text-xs font-semibold uppercase tracking-nav">
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
      className="flex flex-wrap gap-1 border-b border-line bg-paper px-2 py-1.5 lg:hidden"
    >
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={cn(
            "inline-flex min-h-8 flex-1 basis-[22%] items-center justify-center rounded-sm px-1.5 font-display text-[10px] font-semibold uppercase tracking-nav sm:basis-[18%] sm:text-[11px]",
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
