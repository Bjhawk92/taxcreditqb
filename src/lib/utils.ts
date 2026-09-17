import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Encode text for HTML/Word download bodies. Built without literal entities so they are not stripped. */
export function escapeHtml(value: string) {
  const amp = String.fromCharCode(38);
  return value.replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return `${amp}amp;`;
    if (ch === "<") return `${amp}lt;`;
    if (ch === ">") return `${amp}gt;`;
    if (ch === '"') return `${amp}quot;`;
    return `${amp}#39;`;
  });
}
