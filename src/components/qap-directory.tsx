import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { QAP_DIRECTORY, type QapEntry } from "@/lib/qap-directory";

function matches(entry: QapEntry, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    entry.state.toLowerCase().includes(q) ||
    entry.agency.toLowerCase().includes(q)
  );
}

function linkLabel(entry: QapEntry) {
  return entry.resourceType === "QAP PDF" ? "Open PDF" : "Visit Resource";
}

function ReportLink({ entry }: { entry: QapEntry }) {
  return (
    <Link
      to="/contact"
      search={{ state: entry.state, url: entry.url }}
      className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
    >
      Report a broken link
    </Link>
  );
}

function ResourceButton({ entry }: { entry: QapEntry }) {
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-3.5 font-display text-sm font-semibold uppercase tracking-nav text-paper hover:bg-ink-2"
    >
      {linkLabel(entry)}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function QapDirectory() {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => QAP_DIRECTORY.filter((entry) => matches(entry, query)),
    [query],
  );
  const total = QAP_DIRECTORY.length;
  const shown = results.length;

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full max-w-md">
          <label htmlFor="qap-search" className="mb-2 block font-display text-sm font-semibold uppercase tracking-nav text-ink">
            Search by state or agency
          </label>
          <Input
            id="qap-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kansas, KHRC, Texas…"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-ink/75" aria-live="polite">
            Showing {shown} of {total} jurisdictions
          </p>
          {query ? (
            <Button type="button" variant="secondary" onClick={() => setQuery("")}>
              Clear search
            </Button>
          ) : null}
        </div>
      </div>

      <p className="mt-6 max-w-3xl border border-line bg-paper-dim px-4 py-3 text-sm text-ink/80">
        Links include agency resource pages and year-specific documents. Confirm
        the applicable allocation year, amendments, and application requirements
        directly with the allocating agency.
      </p>
      <p className="mt-3 text-sm text-muted">
        This directory is free. Membership, huddles and custom work are separate
        paid services.
      </p>

      <div className="mt-8 hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            State Qualified Allocation Plan resources
          </caption>
          <thead>
            <tr className="border-b border-ink">
              <th className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-nav">
                State or jurisdiction
              </th>
              <th className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-nav">
                Agency
              </th>
              <th className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-nav">
                Resource
              </th>
              <th className="py-3 pr-4 font-display text-sm font-semibold uppercase tracking-nav">
                Link
              </th>
              <th className="py-3 font-display text-sm font-semibold uppercase tracking-nav">
                <span className="sr-only">Report</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((entry) => (
              <tr key={entry.state} className="border-b border-line align-top">
                <td className="py-4 pr-4 font-medium">{entry.state}</td>
                <td className="py-4 pr-4">{entry.agency}</td>
                <td className="py-4 pr-4 text-sm text-ink/80">
                  {entry.resourceType}
                  {entry.lastChecked ? (
                    <span className="mt-1 block text-xs text-muted">
                      Last checked {entry.lastChecked}
                    </span>
                  ) : null}
                </td>
                <td className="py-4 pr-4">
                  <ResourceButton entry={entry} />
                </td>
                <td className="py-4">
                  <ReportLink entry={entry} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-8 space-y-3 md:hidden">
        {results.map((entry) => (
          <li key={entry.state} className="border border-line bg-paper p-4">
            <p className="font-display text-xl font-semibold tracking-tight">
              {entry.state}
            </p>
            <p className="mt-1 text-sm text-muted">{entry.agency}</p>
            <p className="mt-2 text-sm text-ink/80">{entry.resourceType}</p>
            {entry.lastChecked ? (
              <p className="mt-1 text-xs text-muted">Last checked {entry.lastChecked}</p>
            ) : null}
            <div className="mt-4 flex flex-col gap-3">
              <ResourceButton entry={entry} />
              <ReportLink entry={entry} />
            </div>
          </li>
        ))}
      </ul>

      {shown === 0 ? (
        <p className="mt-8 text-ink/80">
          No jurisdictions match that search. Try the state name or agency
          abbreviation.
        </p>
      ) : null}
    </div>
  );
}
