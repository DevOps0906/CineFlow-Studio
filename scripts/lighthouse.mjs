// Runs Lighthouse (mobile, default throttling) for all 12 templates and writes docs/LIGHTHOUSE.md + JSON.
// Prereq: servers running (studio 3300, T01 3301, T03 3303, T04 3304, showcase 3305). Run: node scripts/lighthouse.mjs [label]
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const label = process.argv[2] ?? "baseline";
const T = [
  ["T01", "http://localhost:3301"], ["T02", "http://localhost:3305/t02"], ["T03", "http://localhost:3303"], ["T04", "http://localhost:3304"],
  ["T05", "http://localhost:3305/t05"], ["T06", "http://localhost:3305/t06"], ["T07", "http://localhost:3305/t07"], ["T08", "http://localhost:3305/t08"],
  ["T09", "http://localhost:3305/t09"], ["T10", "http://localhost:3305/t10"], ["T11", "http://localhost:3305/t11"], ["T12", "http://localhost:3305/t12"],
];
const outDir = path.join("docs", "lighthouse", label);
fs.mkdirSync(outDir, { recursive: true });
const rows = [];
for (const [id, url] of T) {
  const file = path.join(outDir, `${id}.json`);
  const skip = process.env.LH_SUMMARIZE_ONLY === "1";
  try {
    if (!skip) try { execFileSync(process.platform === "win32" ? "npx.cmd" : "npx", ["--yes", "lighthouse", url, "--quiet", "--output=json", `--output-path=${file}`,
      "--only-categories=performance,accessibility,best-practices,seo", "--chrome-flags=--headless=new --no-sandbox"], { stdio: "ignore", shell: process.platform === "win32", timeout: 240000 }); } catch { /* non-zero exit still writes JSON; parse below */ }
    const r = JSON.parse(fs.readFileSync(file, "utf8"));
    const s = (k) => Math.round((r.categories[k]?.score ?? 0) * 100);
    const a = (k) => r.audits[k];
    const fails = Object.values(r.audits).filter((x) => x.score !== null && x.score < 0.9 && r.categories.accessibility.auditRefs.some((ref) => ref.id === x.id && ref.weight > 0)).map((x) => x.id);
    rows.push({ id, url, perf: s("performance"), a11y: s("accessibility"), bp: s("best-practices"), seo: s("seo"),
      lcp: a("largest-contentful-paint").numericValue / 1000, cls: a("cumulative-layout-shift").numericValue, tbt: a("total-blocking-time").numericValue,
      js: Math.round((a("resource-summary")?.details?.items?.find((i) => i.resourceType === "script")?.transferSize ?? 0) / 1024), a11yFails: fails });
    console.log(id, "done");
  } catch (e) { rows.push({ id, url, error: String(e.message).slice(0, 120) }); console.log(id, "error"); }
}
fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(rows, null, 2));
const ok = (v, lim, lower = true) => (lower ? v <= lim : v >= lim) ? "✅" : "❌";
const md = [`# Lighthouse — ${label}`, "", "모바일 프리셋(기본 스로틀링: 느린 4G, CPU 4x), 로컬 `next start`. PRD §9 예산: LCP ≤ 2.5s, CLS ≤ 0.1, 접근성 ≥ 95, 초기 JS ≤ 200KB(gzip). INP는 랩 측정 불가 → TBT(≤ 200ms)를 대리 지표로 사용.", "",
  "| 템플릿 | Perf | A11y | BP | SEO | LCP (s) | CLS | TBT (ms) | JS (KB) | 접근성 감점 항목 |", "|---|---|---|---|---|---|---|---|---|---|",
  ...rows.map((r) => r.error ? `| ${r.id} | 오류 | | | | | | | | ${r.error} |` :
    `| ${r.id} | ${r.perf} | ${r.a11y} ${ok(r.a11y, 95, false)} | ${r.bp} | ${r.seo} | ${r.lcp.toFixed(2)} ${ok(r.lcp, 2.5)} | ${r.cls.toFixed(3)} ${ok(r.cls, 0.1)} | ${Math.round(r.tbt)} ${ok(r.tbt, 200)} | ${r.js} ${ok(r.js, 200)} | ${r.a11yFails.join(", ") || "-"} |`)].join("\n");
fs.writeFileSync(path.join(outDir, "README.md"), md + "\n");
console.log(md);
