import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOTIONS, SECTIONS, TEMPLATES } from "@/lib/data";
import { Card, StatusBadge } from "@/components/ui";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ id: t.slug }));
}

type P = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { id } = await params;
  const t = TEMPLATES.find((x) => x.slug === id);
  return { title: t ? `${t.id} ${t.name} — CineFlow Studio` : "카테고리" };
}

export default async function CategoryPage({ params }: P) {
  const { id } = await params;
  const i = TEMPLATES.findIndex((x) => x.slug === id);
  if (i < 0) notFound();
  const t = TEMPLATES[i];
  const prev = TEMPLATES[i - 1];
  const next = TEMPLATES[i + 1];
  const motions = t.motions.map((m) => MOTIONS.find((x) => x.id === m)!);
  const ready = motions.filter((m) => m.implemented).length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <nav aria-label="breadcrumb" className="text-sm text-zinc-500">
        <Link href="/" className="hover:text-white">대시보드</Link> / 카테고리 / {t.id}
      </nav>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm text-zinc-500">{t.id} · {t.priority}</p>
          <h1 className="mt-1 text-3xl font-semibold">{t.name}</h1>
          <p className="mt-2 max-w-2xl text-zinc-400">{t.summary}</p>
        </div>
        <StatusBadge s={t.status} />
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="핵심 히어로"><p className="text-lg">{t.hero}</p></Card>
        <Card title="진행 상태">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-zinc-400">Spec</dt><dd className="min-w-0 break-all">{t.specPath ? <code className="text-xs">{t.specPath}</code> : "미작성"}</dd></div>
            <div className="flex justify-between"><dt className="text-zinc-400">모션 준비도</dt><dd>{ready}/{motions.length}</dd></div>
            <div className="flex justify-between"><dt className="text-zinc-400">에셋 라이선스</dt><dd>{t.status === "planned" ? "미착수" : "미확정"}</dd></div>
          </dl>
          {t.demoNote && <p className="mt-3 text-xs text-zinc-400">{t.demoNote}</p>}
        </Card>
      </div>

      <Card title="섹션 구성">
        <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {SECTIONS.map((s, n) => (
            <li key={s} className="rounded-lg border border-white/10 px-3 py-2 text-sm"><span className="mr-2 text-zinc-500">{n + 1}</span>{s}</li>
          ))}
        </ol>
      </Card>

      <Card title={`사용 모션 (${t.motionsNote})`}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {motions.map((m) => (
            <li key={m.id} className="rounded-lg border border-white/10 p-3">
              <p className="font-mono text-xs text-zinc-500">{m.id} · {m.group}</p>
              <p className="mt-1">{m.name}</p>
              <p className={`mt-1 text-xs ${m.implemented ? "text-emerald-300" : "text-zinc-500"}`}>{m.implemented ? "구현됨" : "미구현"}</p>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex justify-between text-sm">
        {prev ? <Link href={`/category/${prev.slug}`} className="text-zinc-400 hover:text-white">← {prev.id} {prev.name}</Link> : <span />}
        {next ? <Link href={`/category/${next.slug}`} className="text-zinc-400 hover:text-white">{next.id} {next.name} →</Link> : <span />}
      </div>
    </div>
  );
}
