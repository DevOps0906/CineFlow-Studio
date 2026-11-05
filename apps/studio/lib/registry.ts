import fs from "node:fs";
import path from "node:path";
import { MOTIONS, TEMPLATES, type Motion, type Template } from "./data";

/**
 * Derives live status from repository files (build time, server only):
 *  - projects/<name>/spec.md       -> template link via "템플릿: Txx", approval via "승인됨"
 *  - projects/<name>/brief.md      -> "PM 승인: 승인"
 *  - projects/<name>/site/**       -> implemented motion IDs (M0x mentions in lib/ and components/)
 *  - projects/<name>/qa-report.md  -> latest QA result
 * Data in lib/data.ts is only the static catalog (name, hero, proposed motions).
 */
const ROOT = path.resolve(process.cwd(), "../..");
const PROJECTS = path.join(ROOT, "projects");

const read = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

export interface QaSummary { project: string; date: string; passed: number; total: number; verdict: string; gaps: string[] }
export interface Gate { name: string; done: number; total: number }
interface Project {
  dir: string; sitePath: string; demoUrl?: string; template: string | null; specApproved: boolean; briefApproved: boolean; hasSite: boolean;
  reviewerSet: boolean; qaApproverSet: boolean; motions: string[]; qa: QaSummary | null;
}

function parseQa(md: string): QaSummary {
  const rows = md.split("\n").filter((l) => /\|\s*(Pass|Fail)\s*\|/.test(l));
  const gapsBlock = md.split(/^## 미검증.*$/m)[1]?.split(/^## /m)[0] ?? "";
  return {
    project: md.match(/^# QA Report — (.+)$/m)?.[1].trim() ?? "-",
    date: md.match(/일시:\s*([\d-]+)/)?.[1] ?? "-",
    passed: rows.filter((l) => /\|\s*Pass\s*\|/.test(l)).length,
    total: rows.length,
    verdict: md.match(/^## 판정:\s*(.+)$/m)?.[1].trim() ?? "-",
    gaps: gapsBlock.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim()),
  };
}

function loadProjects(): Project[] {
  if (!fs.existsSync(PROJECTS)) return [];
  return fs.readdirSync(PROJECTS, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => {
    const dir = path.join(PROJECTS, e.name);
    const spec = read(path.join(dir, "spec.md")) ?? "";
    const brief = read(path.join(dir, "brief.md")) ?? "";
    const qaMd = read(path.join(dir, "qa-report.md"));
    // Site location: standalone app (projects/<name>/site) or a route in the shared showcase app (spec: "앱 위치: apps/showcase/app/tXX").
    const showcaseRoute = spec.match(/앱 위치:\s*(apps\/showcase\/app\/t\d{2})/)?.[1];
    const siteDir = showcaseRoute ? path.join(ROOT, showcaseRoute) : path.join(dir, "site");
    const hasSite = showcaseRoute ? fs.existsSync(path.join(siteDir, "page.tsx")) : fs.existsSync(path.join(siteDir, "package.json"));
    const motions = new Set<string>();
    const scan = showcaseRoute ? walk(siteDir) : [...walk(path.join(siteDir, "lib")), ...walk(path.join(siteDir, "components"))];
    if (hasSite) for (const f of scan) for (const m of fs.readFileSync(f, "utf8").matchAll(/\bM0[1-8]\b/g)) motions.add(m[0]);
    const approval = spec.split(/^## 8\. Approval/m)[1] ?? "";
    return {
      dir: e.name,
      sitePath: path.relative(ROOT, siteDir).replaceAll("\\", "/"),
      demoUrl: spec.match(/데모:\s*(https?:\/\/\S+)/)?.[1],
      template: spec.match(/템플릿:\s*(T\d{2})/)?.[1] ?? null,
      specApproved: /승인됨|\d{4}-\d{2}-\d{2} 승인/.test(approval),
      briefApproved: /PM 승인:\s*승인/.test(brief),
      hasSite,
      reviewerSet: !/코드 리뷰어:\s*미정/.test(approval) && approval.includes("코드 리뷰어"),
      qaApproverSet: !/QA 승인자:\s*미정/.test(approval) && approval.includes("QA 승인자"),
      motions: [...motions],
      qa: qaMd ? parseQa(qaMd) : null,
    };
  });
}

export interface Registry {
  templates: Template[]; motions: Motion[]; gates: Gate[]; qa: QaSummary | null; projectCount: number;
}

export function getRegistry(): Registry {
  const projects = loadProjects();
  const implemented = new Set(projects.filter((p) => p.hasSite).flatMap((p) => p.motions));

  const templates = TEMPLATES.map((t): Template => {
    const p = projects.find((x) => x.template === t.id);
    if (!p) return t;
    const status = p.specApproved && p.hasSite ? "built" : "spec-draft";
    return {
      ...t, status,
      specPath: `projects/${p.dir}/spec.md`,
      motionsNote: p.specApproved ? "승인된 spec 기준" : "spec 초안 기준 (미승인)",
      demoUrl: p.hasSite ? p.demoUrl : undefined,
      demoNote: [
        p.hasSite ? `사이트: ${p.sitePath}` : "사이트 미구현 (spec 승인 대기)",
        p.qa ? `QA ${p.qa.passed}/${p.qa.total} 통과, 판정: ${p.qa.verdict}` : null,
      ].filter(Boolean).join(". ") + ".",
    };
  });

  const n = projects.length;
  const gates: Gate[] = [
    { name: "브리프 승인", done: projects.filter((p) => p.briefApproved).length, total: n },
    { name: "디자인 명세 승인", done: projects.filter((p) => p.specApproved).length, total: n },
    { name: "구현 리뷰", done: projects.filter((p) => p.hasSite && p.reviewerSet).length, total: projects.filter((p) => p.hasSite).length || 1 },
    { name: "QA 승인", done: projects.filter((p) => p.qa && p.qaApproverSet).length, total: projects.filter((p) => p.qa).length || 1 },
    { name: "배포", done: 0, total: projects.filter((p) => p.hasSite).length || 1 },
  ];

  const qa = projects.map((p) => p.qa).filter((q): q is QaSummary => !!q).sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
  return { templates, motions: MOTIONS.map((m) => ({ ...m, implemented: implemented.has(m.id) })), gates, qa, projectCount: n };
}
