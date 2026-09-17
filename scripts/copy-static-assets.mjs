import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const from = join(ROOT, "static-assets");
const to = join(ROOT, ".vercel/output/static");

if (existsSync(from)) {
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
  console.log("[copy-static-assets] copied static-assets → .vercel/output/static");
} else {
  console.warn("[copy-static-assets] static-assets/ missing — skip");
}

const pglite = join(ROOT, "node_modules/@electric-sql/pglite/dist");
const libs = join(ROOT, ".vercel/output/functions/__server.func/_libs");
if (existsSync(join(pglite, "pglite.wasm"))) {
  mkdirSync(libs, { recursive: true });
  for (const file of ["pglite.wasm", "initdb.wasm", "pglite.data"]) {
    const src = join(pglite, file);
    if (existsSync(src)) cpSync(src, join(libs, file));
  }
  console.log("[copy-static-assets] copied PGLite wasm into the server function");
}
