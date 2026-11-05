// Copies design/tXX/tokens.css (single source of truth) into app/tXX/theme.css, scoped to `.theme-tXX`.
// Fonts are prefixed with the next/font variables (--nf-display / --nf-mono) set by each route layout.
// Run from apps/showcase: node scripts/sync-tokens.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("../..");
const IDS = ["t02", "t05", "t06", "t07", "t08", "t09", "t10", "t11", "t12"];

const lum = (hex) => {
  const v = hex.replace("#", "").match(/../g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};

for (const id of IDS) {
  const src = fs.readFileSync(path.join(ROOT, "design", id, "tokens.css"), "utf8");
  const theme = src.match(/@theme\s*{([\s\S]*?)\n}/)[1]
    .replace(/--font-display:\s*([^;]+);/, "--font-display: var(--nf-display), $1;")
    .replace(/--font-mono:\s*([^;]+);/, "--font-mono: var(--nf-mono), $1;");
  const medias = [...src.matchAll(/@media\s*\(([^)]+)\)\s*{\s*:root\s*{([^}]*)}\s*}/g)]
    .map(([, q, body]) => `@media (${q}) {\n  .theme-${id} {${body}}\n}`).join("\n");
  const bg = src.match(/--color-bg:\s*(#[0-9a-fA-F]{6})/)[1];
  const out = `/* GENERATED from design/${id}/tokens.css by scripts/sync-tokens.mjs. Do not edit; change the design token and re-run. */
.theme-${id} {${theme}
}
${medias}
html:has(.theme-${id}) { background-color: ${bg}; color-scheme: ${lum(bg) < 0.4 ? "dark" : "light"}; }
`;
  fs.mkdirSync(path.join("app", id), { recursive: true });
  fs.writeFileSync(path.join("app", id, "theme.css"), out);
  console.log("synced", id);
}
