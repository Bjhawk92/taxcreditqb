import { FOLLOWED_STATE_LIMIT, WATCH_STATES } from "@/lib/followed-states";
import { cn } from "@/lib/utils";

export function StateWatchPicker({
  value,
  onChange,
  states = WATCH_STATES,
  limit = FOLLOWED_STATE_LIMIT,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  states?: readonly string[];
  limit?: number;
}) {
  const remaining = limit - value.length;
  return (
    <div>
      <p className="mb-2 text-sm text-ink/75">
        Choose up to {limit} states to monitor
        {value.length ? ` · ${value.length} of ${limit} selected` : ""}.
      </p>
      <div className="flex flex-wrap gap-2">
        {states.map((state) => {
          const on = value.includes(state);
          const locked = !on && remaining <= 0;
          return (
            <button
              key={state}
              type="button"
              disabled={locked}
              onClick={() =>
                onChange(on ? value.filter((item) => item !== state) : [...value, state])
              }
              className={cn(
                "min-h-11 border px-3 py-2 text-sm",
                on
                  ? "border-ink bg-ink text-paper"
                  : locked
                    ? "cursor-not-allowed border-line bg-paper-dim text-muted"
                    : "border-line bg-paper text-ink hover:border-ink",
              )}
            >
              {state}
            </button>
          );
        })}
      </div>
    </div>
  );
}
