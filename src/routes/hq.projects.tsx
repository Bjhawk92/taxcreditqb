import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqHeader, HqMain, HqStatus } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { getHqHome } from "@/lib/hq";

export const Route = createFileRoute("/hq/projects")({
  component: HqProjects,
});

function HqProjects() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getHqHome>>["projects"]>(
    [],
  );
  useEffect(() => {
    getHqHome()
      .then((d) => setRows(d.projects))
      .catch(() => setRows([]));
  }, []);

  return (
    <main id="main">
      <HqHeader
        title="My projects"
        sub="Workspaces for custom decks, advisory, modeling coordination, and meeting attendance. None of those are automatic with membership."
      />
      <HqMain>
        {rows.length === 0 ? (
          <HqEmpty
            title="No active assignments"
            body="When a scoped engagement is opened, you will see name, location, status, next milestone, tasks, and files awaiting review."
          />
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {rows.map((p) => (
              <li key={p.id} className="border border-line p-6">
                <HqStatus value={p.status} />
                <h2 className="mt-2 font-display text-2xl font-semibold">{p.name}</h2>
                <p className="mt-1 text-sm text-muted">
                  {p.location || "Location TBD"}
                </p>
                <p className="mt-3 text-ink/75">{p.scope}</p>
                <p className="mt-3 text-sm">Next: {p.next_milestone || "Not set"}</p>
              </li>
            ))}
          </ul>
        )}
        <Button asChild className="mt-8">
          <Link to="/inquiry">Request project support</Link>
        </Button>
      </HqMain>
    </main>
  );
}
