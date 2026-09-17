import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const LOCKER_NAV = [
  { to: "/hq", label: "Dashboard Home", match: ["/hq"] },
  { to: "/hq/deals", label: "My Projects", match: ["/hq/deals", "/hq/deal", "/hq/projects"] },
  { to: "/hq/field-report", label: "Field Pass", match: ["/hq/field-report", "/hq/film"] },
  { to: "/hq/equipment", label: "Equipment Room", match: ["/hq/equipment", "/hq/documents", "/hq/files", "/hq/letters", "/hq/playbook"] },
  { to: "/hq/modeling", label: "Tools & Models", match: ["/hq/modeling"] },
  { to: "/hq/alerts", label: "Alerts & Deadlines", match: ["/hq/alerts"] },
  { to: "/hq/membership", label: "Membership & Billing", match: ["/hq/membership", "/hq/billing"] },
  { to: "/hq/account", label: "Company & Team", match: ["/hq/account", "/hq/onboarding"] },
] as const;

function active(pathname: string, match: readonly string[]) {
  return match.some((prefix) => {
    if (prefix === "/hq") return pathname === "/hq" || pathname === "/hq/";
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

export function HqNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <aside className="hidden w-60 shrink-0 border-r border-line bg-paper-dim md:block">
        <nav aria-label="Locker Room" className="sticky top-24 flex flex-col px-3 py-6">
          <p className="px-3 font-display text-sm font-semibold uppercase tracking-mark text-steel">
            Locker Room
          </p>
          {LOCKER_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "mt-1 flex min-h-11 items-center px-3 font-display text-sm font-semibold uppercase tracking-nav text-muted hover:bg-paper hover:text-ink",
                active(pathname, item.match) && "bg-paper text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              to="/hq/admin"
              className={cn(
                "mt-4 flex min-h-11 items-center px-3 font-display text-sm font-semibold uppercase tracking-nav text-muted hover:bg-paper hover:text-ink",
                pathname.startsWith("/hq/admin") && "bg-paper text-ink",
              )}
            >
              Admin
            </Link>
          ) : null}
        </nav>
      </aside>
      <div className="border-b border-line bg-paper-dim md:hidden">
        <nav aria-label="Locker Room" className="flex gap-3 overflow-x-auto px-4 py-2">
          {LOCKER_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center border-b-2 border-transparent font-display text-sm font-semibold uppercase tracking-nav text-muted",
                active(pathname, item.match) && "border-ink text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              to="/hq/admin"
              className="inline-flex min-h-11 shrink-0 items-center border-b-2 border-transparent font-display text-sm font-semibold uppercase tracking-nav text-muted [&.active]:border-ink [&.active]:text-ink"
            >
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
    </>
  );
}
