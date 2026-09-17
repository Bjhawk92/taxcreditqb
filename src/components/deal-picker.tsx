import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function DealPicker({
  deals,
  value,
  onChange,
  name = "dealId",
  id = "deal-picker",
}: {
  deals: { id: number; name: string; city?: string | null; state?: string | null }[];
  value: string;
  onChange: (id: string) => void;
  name?: string;
  id?: string;
}) {
  return (
    <div>
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Which deal are you working on?
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <select
          id={id}
          name={name}
          className="min-h-11 border border-line bg-paper px-3"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select a deal</option>
          {deals.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
              {[d.city, d.state].filter(Boolean).length
                ? ` — ${[d.city, d.state].filter(Boolean).join(", ")}`
                : ""}
            </option>
          ))}
        </select>
        <Button asChild variant="secondary">
          <Link to="/hq/deals" search={{ new: "1" }}>
            Create new deal
          </Link>
        </Button>
      </div>
    </div>
  );
}
