import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { archiveDocument, listDocuments } from "@/lib/locker";

export const Route = createFileRoute("/hq/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listDocuments>>>([]);
  const [filter, setFilter] = useState("all");

  function load() {
    listDocuments()
      .then(setRows)
      .catch(() => setRows([]));
  }
  useEffect(load, []);

  const shown = rows.filter((r) => (filter === "all" ? true : r.doc_type === filter));

  function download(name: string, body: string | null) {
    const blob = new Blob([body ?? ""], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main id="main">
      <HqHeader
        title="My Documents"
        sub="Private letters, checklists, and files associated with your deals."
      />
      <HqMain>
        <label className="text-sm">
          Filter
          <select
            className="ml-3 min-h-11 border border-line bg-paper px-3"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="letter">Letters</option>
            <option value="other">Other</option>
          </select>
        </label>
        {shown.length === 0 ? (
          <div className="mt-8">
            <HqEmpty
              title="No documents yet"
              body="Generated letters and uploaded deliverables will appear here, private to your account."
            />
          </div>
        ) : (
          <ul className="mt-8 space-y-3">
            {shown.map((doc) => (
              <li
                key={doc.id}
                className="flex flex-col gap-3 border border-line p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold">{doc.name}</p>
                  <p className="text-sm text-muted">
                    {doc.doc_type} · {new Date(doc.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => download(doc.name, doc.body)}
                  >
                    Download
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      void archiveDocument({ data: { id: doc.id } }).then(load);
                    }}
                  >
                    Archive
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </HqMain>
    </main>
  );
}
