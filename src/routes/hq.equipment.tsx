import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { CHECKLISTS } from "@/lib/checklists";
import { EQUIPMENT_PACKAGES } from "@/lib/equipment-catalog";
import { getLockerHome, getOrCreateChecklist, listDeals, setChecklistItem } from "@/lib/locker";

export const Route = createFileRoute("/hq/equipment")({
  validateSearch: (s: Record<string, unknown>) => ({
    deal: typeof s.deal === "string" ? s.deal : undefined,
    resource: typeof s.resource === "string" ? s.resource : undefined,
  }),
  component: MyEquipment,
});

function MyEquipment() {
  const search = Route.useSearch();
  const [deals, setDeals] = useState<Awaited<ReturnType<typeof listDeals>>>([]);
  const [home, setHome] = useState<Awaited<ReturnType<typeof getLockerHome>> | null>(
    null,
  );
  const [dealId, setDealId] = useState(search.deal ?? "");
  const [slug, setSlug] = useState(search.resource ?? "pre-application");
  const [items, setItems] = useState<
    NonNullable<Awaited<ReturnType<typeof getOrCreateChecklist>> extends infer T
      ? T extends { items: infer I }
        ? I
        : never
      : never>
  >([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    listDeals()
      .then(setDeals)
      .catch(() => setDeals([]));
    getLockerHome()
      .then(setHome)
      .catch(() => setHome(null));
  }, []);

  const canPremium = Boolean(home?.entitlements.premiumEquipment);

  async function openChecklist() {
    if (!dealId) return;
    const res = await getOrCreateChecklist({
      data: { dealId: Number(dealId), slug },
    });
    if (res.ok) {
      setItems(res.items);
      setTitle(res.title);
    }
  }

  const progress = useMemo(() => {
    const countable = items.filter((i) => i.status !== "na");
    if (!countable.length) return 0;
    return Math.round(
      (countable.filter((i) => i.status === "complete").length / countable.length) *
        100,
    );
  }, [items]);

  return (
    <main id="main">
      <HqHeader
        title="My Equipment"
        sub="Use checklists and tools with a Deal Profile so progress is saved in this locker."
      />
      <HqMain>
        <div className="grid gap-4 md:grid-cols-3">
          {EQUIPMENT_PACKAGES.filter((p) => p.interactive).map((item) => (
            <article key={item.slug} className="border border-line p-5">
              <p className="font-display text-xs font-semibold uppercase tracking-nav text-steel">
                {item.accessLabel}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold">{item.name}</h2>
              <p className="mt-2 text-sm text-ink/75">{item.blurb}</p>
              <Button asChild className="mt-4" variant="secondary">
                <a href={item.href}>Open</a>
              </Button>
            </article>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Use with which deal?</h2>
          <div className="mt-4 flex flex-col gap-3 md:flex-row">
            <select
              className="min-h-11 border border-line bg-paper px-3"
              value={dealId}
              onChange={(e) => setDealId(e.target.value)}
            >
              <option value="">Select a deal</option>
              {deals.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              className="min-h-11 border border-line bg-paper px-3"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            >
              {CHECKLISTS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
            <Button type="button" onClick={() => void openChecklist()} disabled={!dealId}>
              Open checklist
            </Button>
            <Button asChild variant="secondary">
              <Link to="/hq/deals" search={{ new: "1" }}>
                Create new deal
              </Link>
            </Button>
          </div>
          {!canPremium ? (
            <p className="mt-4 text-sm text-ink/75">
              Interactive checklists are included with The Playbook.{" "}
              <Link to="/game-plans" className="font-semibold text-steel">
                View Game Plans
              </Link>
              .
            </p>
          ) : null}
        </section>

        {items.length ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-ink/75">Progress {progress}% (N/A items excluded).</p>
            <ul className="mt-6 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="border border-line p-4">
                  <p className="text-sm text-muted">{item.section}</p>
                  <p className="font-medium">{item.label}</p>
                  <select
                    className="mt-2 min-h-11 border border-line bg-paper px-3"
                    value={item.status}
                    onChange={(e) => {
                      const status = e.target.value;
                      setItems((cur) =>
                        cur.map((x) => (x.id === item.id ? { ...x, status } : x)),
                      );
                      void setChecklistItem({ data: { itemId: item.id, status } });
                    }}
                  >
                    <option value="not_started">Not started</option>
                    <option value="in_progress">In progress</option>
                    <option value="complete">Complete</option>
                    <option value="na">N/A</option>
                  </select>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <div className="mt-10">
            <HqEmpty
              title="No checklist open"
              body="Select a deal and a checklist to save progress against that Deal Profile."
            />
          </div>
        )}
      </HqMain>
    </main>
  );
}
