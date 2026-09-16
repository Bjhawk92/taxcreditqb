import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const HQ_NAV = [
  { to: "/hq", label: "Home", exact: true },
  { to: "/hq/membership", label: "My Membership", exact: false },
  { to: "/hq/playbook", label: "Playbook", exact: false },
  { to: "/hq/film", label: "Film Room", exact: false },
  { to: "/hq/huddle", label: "Huddle", exact: false },
  { to: "/hq/projects", label: "My Projects", exact: false },
  { to: "/hq/files", label: "Files", exact: false },
  { to: "/hq/messages", label: "Questions", exact: false },
  { to: "/hq/meetings", label: "Meeting Support", exact: false },
  { to: "/hq/billing", label: "Billing", exact: false },
] as const;

export function HqNav({ isAdmin = false }: { isAdmin?: boolean }) {
  void isAdmin;
  return (
    <div className="border-b border-line bg-paper-dim">
      <div className="mx-auto flex max-w-6xl px-5 py-2 md:px-8">
        <nav aria-label="Team HQ" className="flex gap-4 overflow-x-auto">
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
        </nav>
      </div>
    </div>
  );
}
