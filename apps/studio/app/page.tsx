import Link from "next/link";
import { GATES, MOTIONS, QA_LATEST, SECTIONS, TEMPLATES } from "@/lib/data";
import { Bar, Card, StatusBadge } from "@/components/ui";

export default function Dashboard() {
  const built = TEMPLATES.filter((t) => t.status === "built").length;
  const drafts = TEMPLATES.filter((t) => t.status === "spec-draft").length;
  const mvp = MOTIONS.filter((m) => m.mvp);
  const impl = mvp.filter((m) => m.implemented).length;
  const kpis = [
    ["템플릿", `${TEMPLATES.length}종`, "카탈로그 전체"],
    ["구현됨", `${built}/${TEMPLATES.length}`, "P0 3종 중 T01"],
    ["Spec 초안", `${drafts}종`, "T03, T04 승인 대기"],
    ["MVP 모션", `${impl}/${mvp.length}`, "구현 완료"],
  ];
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">대시보드</h1>
        <p className="mt-1 text-sm text-zinc-400">PRD 기준 MVP 진행 현황 (정적 데이터, 레지스트리 연동 전)</p>
      </header>

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map(([l, v, d]) => (
          <li key={l} className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
            <p className="text-xs text-zinc-400">{l}</p><p className="mt-2 text-3xl font-semibold">{v}</p><p className="mt-1 text-xs text-zinc-500">{d}</p>
          </li>
        ))}
      </ul>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="템플릿 현황">
            <ul className="divide-y divide-white/5">
              {TEMPLATES.map((t) => (
                <li key={t.id}>
                  <Link href={`/category/${t.slug}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3 hover:bg-white/5">
                    <span className="w-10 font-mono text-sm text-zinc-400">{t.id}</span>
                    <span className="min-w-0 flex-1 truncate">{t.name}<span className="ml-2 text-xs text-zinc-500">{t.hero}</span></span>
                    <span className="text-xs text-zinc-400">{t.priority}</span>
                    <StatusBadge s={t.status} />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="승인 게이트 (3개 프로젝트)">
            <ul className="space-y-4">
              {GATES.map((g) => (
                <li key={g.name}><div className="mb-1 flex justify-between text-sm"><span>{g.name}</span><span className="text-zinc-400">{g.done}/{g.total}</span></div><Bar value={g.done} total={g.total} /></li>
              ))}
            </ul>
          </Card>
          <Card title="최근 QA">
            <p className="font-medium">{QA_LATEST.project}</p>
            <p className="mt-1 text-sm text-zinc-400">{QA_LATEST.date} · 테스트 {QA_LATEST.passed}/{QA_LATEST.total} 통과</p>
            <p className="mt-2 text-sm text-amber-300">{QA_LATEST.verdict}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-zinc-400">{QA_LATEST.gaps.map((g) => <li key={g}>{g}</li>)}</ul>
          </Card>
        </div>
      </div>

      <Card title="MVP 모션 8종">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MOTIONS.map((m) => (
            <li key={m.id} className="rounded-lg border border-white/10 p-3">
              <p className="font-mono text-xs text-zinc-500">{m.id} · {m.group}</p>
              <p className="mt-1 text-sm">{m.name}</p>
              <p className={`mt-1 text-xs ${m.implemented ? "text-emerald-300" : "text-zinc-500"}`}>{m.implemented ? "구현됨" : "미구현"}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-zinc-500">공통 섹션 구조: {SECTIONS.join(" → ")}</p>
      </Card>
    </div>
  );
}
