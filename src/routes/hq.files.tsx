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
          Uploads and downloads are not live. A successful transfer will not be
          simulated. Send files to {SITE.emails.info} until object storage is
          attached. Logged deliverables — including prior versions — appear below
          when Tax Credit QB records them.
        </p>
        {rows.length === 0 ? (
          <div className="mt-8">
            <HqEmpty
              title="Storage is not connected"
              body="No files are on record for this account. Current deliverable and prior versions will list here once storage or a logged handoff exists."
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
                  Download is not available until storage is connected.
                </p>
              </li>
            ))}
          </ul>
        )}
      </HqMain>
    </main>
  );
}
