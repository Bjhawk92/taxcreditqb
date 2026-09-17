import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqHeader, HqMain, HqStatus } from "@/components/hq-empty";
import { getHqHome } from "@/lib/hq";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/files")({
  component: HqFiles,
});

function HqFiles() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getHqHome>>["files"]>([]);
  useEffect(() => {
    getHqHome()
      .then((d) => setRows(d.files))
      .catch(() => setRows([]));
  }, []);

  return (
    <main id="main">
      <HqHeader
        title="Files and deliverables"
        sub="Presentations, site plans, renderings, models, and meeting documents — tagged Draft, For Review, Approved, or Final. Client approval is not municipal or financing approval."
      />
      <HqMain>
        <p className="max-w-2xl text-ink/80">
          Send files to {SITE.emails.info}. Recorded deliverables — including
          prior versions — appear below.
        </p>
        {rows.length === 0 ? (
          <div className="mt-8">
            <HqEmpty
              title="No files on record"
              body="Deliverables recorded for this account will appear here."
            />
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {rows.map((f) => (
              <li key={f.id} className="border border-line p-5">
                <HqStatus value={f.status} />
                <p className="mt-2 font-display text-xl font-semibold">{f.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {f.project_name || "Unassigned"} · {f.format || "File"}{" "}
                  {f.version ? `· ${f.version}` : ""}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Request a copy from {SITE.emails.info} if you need the current
                  file.
                </p>
              </li>
            ))}
          </ul>
        )}
      </HqMain>
    </main>
  );
}
