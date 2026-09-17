import { QAP_DIRECTORY } from "@/lib/qap-directory";

export const FOLLOWED_STATE_LIMIT = 3;

export const WATCH_STATES = QAP_DIRECTORY.map((entry) => entry.state);

export function parseFollowedStates(raw: string | null | undefined): string[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .map((item) => item.trim());
    }
  } catch {
    /* comma-separated fallback */
  }
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function serializeFollowedStates(states: readonly string[]): string {
  const allowed = new Set(WATCH_STATES);
  const unique: string[] = [];
  for (const state of states) {
    const name = state.trim();
    if (!name || !allowed.has(name) || unique.includes(name)) continue;
    unique.push(name);
    if (unique.length >= FOLLOWED_STATE_LIMIT) break;
  }
  return JSON.stringify(unique);
}
