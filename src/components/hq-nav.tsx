import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { cn } from "@/lib/utils";

const HQ_NAV = [
  { to: "/hq", label: "Home", exact: true, admin: false },
  { to: "/hq/membership", label: "My Membership", exact: false, admin: false },
  { to: "/hq/playbook", label: "Playbook", exact: false, admin: false },
  { to: "/hq/film", label: "Film Room", exact: false, admin: false },
  { to: "/hq/huddle", label: "Huddle", exact: false, admin: false },
  { to: "/hq/projects", label: "My Projects", exact: false, admin: false },
  { to: "/hq/files", label: "Files", exact: false, admin: false },
  { to: "/hq/messages", label: "Questions", exact: false, admin: false },
  { to: "/hq/meetings", label: "Meeting Support", exact: false, admin: false },
  { to: "/hq/billing", label: "Billing", exact: false, admin: false },
  { to: "/hq/admin", label: "Admin", exact: false, admin: true },
] as const;

export function HqNav({ isAdmin = false }: { isAdmin?: boolean }) {
  const items = HQ_NAV.filter((item) => !item.admin || isAdmin);
  return (
    <div className="border-b border-line bg-paper-dim">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-2 md:flex-row md:items-center md:justify-between md:px-8">
        <nav aria-label="Team HQ" className="flex gap-4 overflow-x-auto">
          {items.map((item) => (
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
        </nav>
        <div className="flex min-h-11 shrink-0 items-center">
          <UserButton />
        </div>
      </div>
    </div>
  );
}
