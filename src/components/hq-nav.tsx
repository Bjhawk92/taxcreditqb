import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const HQ_NAV = [
  { to: "/hq", label: "My Locker", exact: true },
  { to: "/hq/deals", label: "My Deals", exact: false },
  { to: "/hq/equipment", label: "My Equipment", exact: false },
  { to: "/hq/documents", label: "My Documents", exact: false },
  { to: "/hq/membership", label: "My Game Plan", exact: false },
  { to: "/hq/messages", label: "Ask the QB", exact: false },
  { to: "/hq/huddle", label: "My Huddles", exact: false },
  { to: "/hq/account", label: "Account", exact: false },
] as const;

export function HqNav({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <div className="border-b border-line bg-paper-dim">
      <div className="mx-auto flex max-w-6xl px-5 py-2 md:px-8">
        <nav aria-label="My Locker" className="flex gap-4 overflow-x-auto">
          {HQ_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className={cn(
                "inline-flex min-h-11 shrink-0 items-center border-b-2 border-transparent font-display text-sm font-semibold uppercase tracking-nav text-muted hover:text-ink",
                "[&.active]:border-ink [&.active]:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              to="/hq/admin"
              className="inline-flex min-h-11 shrink-0 items-center border-b-2 border-transparent font-display text-sm font-semibold uppercase tracking-nav text-muted hover:text-ink [&.active]:border-ink [&.active]:text-ink"
            >
              Admin
            </Link>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
