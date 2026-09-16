import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/playbook")({
  component: PlaybookLayout,
});

const LINKS = [
  { to: "/playbook", label: "All templates", exact: true },
  { to: "/playbook/private-intro", label: "Municipal Introduction", exact: false },
  { to: "/playbook/hearing", label: "Public Hearing", exact: false },
  { to: "/playbook/neighborhood", label: "Neighborhood Meeting", exact: false },
] as const;

function PlaybookLayout() {
  return (
    <>
      <div className="border-b border-line bg-paper-dim">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-5 md:px-8">
          {LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className={cn(
                "inline-flex min-h-12 shrink-0 items-center border-b-2 border-transparent font-display text-sm font-semibold uppercase tracking-nav text-muted transition-colors hover:text-ink",
                "[&.active]:border-ink [&.active]:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
