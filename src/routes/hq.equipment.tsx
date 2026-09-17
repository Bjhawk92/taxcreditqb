import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { DealPicker } from "@/components/deal-picker";
import { EquipmentGate } from "@/components/equipment-gate";
import { HqEmpty, HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { CHECKLISTS } from "@/lib/checklists";
import { EQUIPMENT_PACKAGES } from "@/lib/equipment-catalog";
import { equipmentAllowed, equipmentGateLabel } from "@/lib/entitlements";
import {
  getLockerHome,
  getOrCreateChecklist,
  listDeals,
  setChecklistItem,
} from "@/lib/locker";

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
  const [filter, setFilter] = useState("all");
  const [gated, setGated] = useState(false);
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
      .then((rows) => {
        setDeals(rows);
        if (!search.deal && rows.length === 1) setDealId(String(rows[0].id));
      })
      .catch(() => setDeals([]));
    getLockerHome()
      .then(setHome)
      .catch(() => setHome(null));
  }, [search.deal]);

  async function openChecklist(nextDeal = dealId, nextSlug = slug) {
    if (!nextDeal) return;
    const res = await getOrCreateChecklist({
      data: { dealId: Number(nextDeal), slug: nextSlug },
    });
    if ("gated" in res && res.gated) {
      setGated(true);
      setItems([]);
      return;
    }
    if (res.ok) {
      setGated(false);
      setItems(res.items);
      setTitle(res.title);
    }
  }

  useEffect(() => {
    if (search.deal && search.resource) {
      setDealId(search.deal);
      setSlug(search.resource);
      void openChecklist(search.deal, search.resource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.deal, search.resource]);

  const planId = home?.entitlements.planId ?? "none";
  const canPremium = Boolean(home?.entitlements.premiumEquipment);

  const progress = useMemo(() => {
    const countable = items.filter((i) => i.status !== "na");
    if (!countable.length) return 0;
    return Math.round(
      (countable.filter((i) => i.status === "complete").length / countable.length) *
        100,
    );
  }, [items]);

  const saved = home?.checklists ?? [];
  const shownSaved = saved.filter((c) => {
    if (filter === "all") return true;
    if (filter === "in_progress") return c.status === "in_progress";
    if (filter === "complete") return c.status === "complete";
    return true;
  });

  return (
    <main id="main">
      <HqHeader
        title="My Equipment"
        sub="Use checklists and tools with a Deal Profile so progress is saved in this locker."
      />
      <HqMain>
        <div className="grid gap-4 md:grid-cols-3">
          {EQUIPMENT_PACKAGES.filter((p) => p.interactive).map((item) => {
            const allowed = equipmentAllowed(item.access, planId);
            const gate = equipmentGateLabel(item.access);
            return (
              <article key={item.slug} className="flex flex-col border border-line p-5">
                <p className="font-display text-xs font-semibold uppercase tracking-nav text-steel">
                  {item.accessLabel}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold">{item.name}</h2>
                <p className="mt-2 flex-1 text-sm text-ink/75">{item.blurb}</p>
                {allowed || item.access === "custom" ? (
                  <Button asChild className="mt-4" variant="secondary">
                    <a href={item.href}>Open</a>
                  </Button>
                ) : (
                  <p className="mt-4 text-sm text-ink/75">
                    Included with {gate}.{" "}
                    <Link to="/game-plans" className="font-semibold text-steel">
                      View Game Plans
                    </Link>
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Interactive checklists</h2>
          <div className="mt-4 space-y-4">
            <DealPicker deals={deals} value={dealId} onChange={setDealId} />
            <div className="flex flex-col gap-3 md:flex-row">
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
            </div>
          </div>
          {home && !canPremium ? <EquipmentGate planName="The Playbook" /> : null}
        </section>

        {gated ? <EquipmentGate planName="The Playbook" /> : null}

        {shownSaved.length ? (
          <section className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-semibold">Saved Equipment</h2>
              <select
                className="min-h-11 border border-line bg-paper px-3"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="in_progress">In progress</option>
                <option value="complete">Completed</option>
              </select>
            </div>
            <ul className="mt-4 space-y-2">
              {shownSaved.map((c) => (
                <li key={c.id} className="border border-line px-4 py-3 text-sm">
                  {c.title} — {c.status.replace("_", " ")}
                  <Button asChild variant="secondary" className="ml-3">
                    <Link
                      to="/hq/equipment"
                      search={{ deal: String(c.deal_id), resource: c.slug }}
                    >
                      Open
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {items.length ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-ink/75">Progress {progress}% (N/A items excluded).</p>
            <ul className="mt-6 space-y-3">
              {items.map((item) => (
                <li key={item.id} className="border border-line p-4">
                  <p className="text-sm text-muted">{item.section}</p>
                  <p className="font-medium">{item.label}</p>
                  <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <select
                      className="min-h-11 border border-line bg-paper px-3"
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
                    <input
                      className="min-h-11 border border-line bg-paper px-3"
                      placeholder="Responsible party"
                      defaultValue={item.responsible ?? ""}
                      onBlur={(e) =>
                        void setChecklistItem({
                          data: {
                            itemId: item.id,
                            status: item.status,
                            responsible: e.target.value,
                          },
                        })
                      }
                    />
                    <input
                      type="date"
                      className="min-h-11 border border-line bg-paper px-3"
                      defaultValue={item.due_date ?? ""}
                      onBlur={(e) =>
                        void setChecklistItem({
                          data: {
                            itemId: item.id,
                            status: item.status,
                            dueDate: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <textarea
                    className="mt-3 min-h-20 w-full border border-line bg-paper p-3 text-sm"
                    placeholder="Notes"
                    defaultValue={item.notes ?? ""}
                    onBlur={(e) =>
                      void setChecklistItem({
                        data: { itemId: item.id, status: item.status, notes: e.target.value },
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : canPremium && !gated ? (
          <div className="mt-10">
            <HqEmpty
              title="No checklist open"
              body="Select a deal and a checklist to save progress against that Deal Profile."
            />
          </div>
        ) : null}
      </HqMain>
    </main>
  );
}
