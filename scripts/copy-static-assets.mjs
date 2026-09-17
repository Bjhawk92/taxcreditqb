import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const from = join(ROOT, "static-assets");
const to = join(ROOT, ".vercel/output/static");

if (!existsSync(from)) {
  console.warn("[copy-static-assets] static-assets/ missing — skip");
  process.exit(0);
}

mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
console.log("[copy-static-assets] copied static-assets → .vercel/output/static");
