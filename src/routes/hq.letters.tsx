import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DealPicker } from "@/components/deal-picker";
import { EquipmentGate } from "@/components/equipment-gate";
import { HqHeader, HqMain } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { LETTER_TYPES, type LetterDeal } from "@/lib/letters";
import { getAccountProfile, getDeal, getLockerHome, listDeals, saveLetter } from "@/lib/locker";
import { escapeHtml } from "@/lib/utils";

export const Route = createFileRoute("/hq/letters")({
  validateSearch: (s: Record<string, unknown>) => ({
    deal: typeof s.deal === "string" ? s.deal : undefined,
  }),
  component: LetterBuilder,
});

function LetterBuilder() {
  const search = Route.useSearch();
  const [deals, setDeals] = useState<Awaited<ReturnType<typeof listDeals>>>([]);
  const [canPremium, setCanPremium] = useState<boolean | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [dealId, setDealId] = useState(search.deal ?? "");
  const [typeId, setTypeId] = useState<string>(LETTER_TYPES[0].id);
  const [audience, setAudience] = useState("");
  const [signatory, setSignatory] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const [gated, setGated] = useState(false);

  useEffect(() => {
    listDeals()
      .then((rows) => {
        setDeals(rows);
        if (!search.deal && rows.length === 1) setDealId(String(rows[0].id));
      })
      .catch(() => setDeals([]));
    getLockerHome()
      .then((h) => setCanPremium(Boolean(h.entitlements.premiumEquipment)))
      .catch(() => setCanPremium(false));
    getAccountProfile()
      .then((p) => setCompany(p.company?.name || p.member?.company || null))
      .catch(() => setCompany(null));
  }, [search.deal]);

  useEffect(() => {
    if (!dealId) return;
    void fillFromDeal(dealId, typeId, audience, signatory, company);
    // Only regenerate when deal or letter type changes so body edits are kept.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealId, typeId]);

  async function fillFromDeal(
    id: string,
    letterType: string,
    nextAudience: string,
    nextSignatory: string,
    nextCompany: string | null,
  ) {
    const res = await getDeal({ data: { id: Number(id) } });
    const letter = LETTER_TYPES.find((t) => t.id === letterType) ?? LETTER_TYPES[0];
    const dealRow = res.deal;
    if (!dealRow) return;
    const ctx: LetterDeal = {
      name: dealRow.name,
      city: dealRow.city,
      state: dealRow.state,
      deal_type: dealRow.deal_type,
      unit_count: dealRow.unit_count,
      stage: dealRow.stage,
      company: nextCompany,
      audience: nextAudience,
      signatory: nextSignatory,
    };
    setBody(letter.body(ctx));
    setName(`${letter.name} — ${dealRow.name}`);
  }

  async function save() {
    if (!dealId) return;
    const res = await saveLetter({
      data: { dealId: Number(dealId), letterType: typeId, name, body },
    });
    if ("gated" in res && res.gated) {
      setGated(true);
      return;
    }
    setSaved(res.ok ? "Saved to My Locker." : res.error);
  }

  function download(kind: "txt" | "doc") {
    const blob = new Blob(
      [kind === "doc" ? `<html><body><pre>${escapeHtml(body)}</pre></body></html>` : body],
      { type: kind === "doc" ? "application/msword" : "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name || "letter"}.${kind === "doc" ? "doc" : "txt"}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (canPremium === false || gated) {
    return (
      <main id="main">
        <HqHeader
          title="Letter Builder"
          sub="Select a deal, choose a letter type, complete missing details, then save or export."
        />
        <HqMain>
          <EquipmentGate planName="The Playbook" />
        </HqMain>
      </main>
    );
  }

  return (
    <main id="main">
      <HqHeader
        title="Letter Builder"
        sub="Select a deal, choose a letter type, complete missing details, then save or export."
      />
      <HqMain>
        {canPremium === null ? (
          <p className="mb-6 text-sm text-muted">Checking Game Plan access…</p>
        ) : null}
        <ol className="space-y-6">
          <li>
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              1. Select deal
            </p>
            <div className="mt-2">
              <DealPicker deals={deals} value={dealId} onChange={setDealId} />
            </div>
          </li>
          <li>
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              2. Select letter type
            </p>
            <select
              className="mt-2 min-h-11 border border-line bg-paper px-3"
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
            >
              {LETTER_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </li>
          <li className="grid gap-4 md:grid-cols-2">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel md:col-span-2">
              3. Confirm missing information
            </p>
            <Field label="Addressee" htmlFor="audience" hint="Overrides this letter only">
              <Input
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </Field>
            <Field label="Signatory" htmlFor="signatory" hint="Overrides this letter only">
              <Input
                id="signatory"
                value={signatory}
                onChange={(e) => setSignatory(e.target.value)}
              />
            </Field>
            <div>
              <Button
                type="button"
                onClick={() => void fillFromDeal(dealId, typeId, audience, signatory, company)}
                disabled={!dealId}
              >
                Preview letter
              </Button>
            </div>
          </li>
          <li>
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
              4. Preview
            </p>
            <Field label="Document name" htmlFor="letter-name">
              <Input id="letter-name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <textarea
              className="mt-3 min-h-64 w-full border border-line bg-paper p-4 font-sans text-sm"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </li>
        </ol>
        <div className="mt-6">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
            5. Save / export
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Button type="button" onClick={() => void save()} disabled={!dealId || !body}>
              Save to My Locker
            </Button>
            <Button type="button" variant="secondary" onClick={() => download("doc")}>
              Download Word
            </Button>
            <Button type="button" variant="secondary" onClick={() => window.print()}>
              Print / PDF
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => void navigator.clipboard.writeText(body)}
            >
              Copy text
            </Button>
          </div>
        </div>
        {saved ? <p className="mt-4 text-sm">{saved}</p> : null}
      </HqMain>
    </main>
  );
}
