"use client";
import { useState } from "react";

type Track = "frontend" | "data" | "ai";
const QUESTIONS: { q: string; a: [string, Track][] }[] = [
  { q: "가장 재미있어 보이는 일은?", a: [["화면을 만들고 바로 결과를 보는 일", "frontend"], ["숫자 속에서 패턴을 찾는 일", "data"], ["스스로 배우는 프로그램을 만드는 일", "ai"]] },
  { q: "주말 프로젝트로 고른다면?", a: [["나만의 포트폴리오 웹사이트", "frontend"], ["동네 카페 매출 대시보드", "data"], ["사진을 분류하는 챗봇", "ai"]] },
  { q: "일하는 방식은?", a: [["디자이너와 붙어서 빠르게", "frontend"], ["질문을 세우고 검증하며", "data"], ["실험을 반복하며 개선하며", "ai"]] },
];
const RESULT: Record<Track, { t: string; d: string; w: string }> = {
  frontend: { t: "Frontend Track", d: "React와 TypeScript로 실제 서비스 화면을 만드는 12주.", w: "취업 연계 42개사" },
  data: { t: "Data Track", d: "SQL, Python, 시각화로 의사결정을 돕는 12주.", w: "취업 연계 31개사" },
  ai: { t: "AI Engineering Track", d: "LLM 앱과 모델 서빙까지 다루는 12주.", w: "취업 연계 27개사" },
};

/** Track finder: 3 questions → recommended track. Accessible radio groups, result announced via aria-live. */
export default function Quiz({ cta }: { cta: string }) {
  const [ans, setAns] = useState<(Track | null)[]>([null, null, null]);
  const done = ans.every(Boolean);
  const pick = (() => {
    if (!done) return null;
    const c: Record<Track, number> = { frontend: 0, data: 0, ai: 0 };
    ans.forEach((a) => { if (a) c[a] += 1; });
    return (Object.keys(c) as Track[]).sort((x, y) => c[y] - c[x] || (x === ans[0] ? -1 : 1))[0];
  })();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <fieldset key={q.q} className="rounded-2xl border border-border bg-surface p-6">
            <legend className="sr-only">질문 {i + 1}: {q.q}</legend>
            <p aria-hidden className="font-display text-lg font-bold"><span className="mr-2 font-mono text-sm text-primary">Q{i + 1}</span>{q.q}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {q.a.map(([label, v]) => (
                <label key={label} className={`cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary ${ans[i] === v ? "border-primary bg-primary/10 font-semibold" : "border-border hover:border-text-muted"}`}>
                  <input type="radio" name={`q${i}`} value={v} className="sr-only" checked={ans[i] === v}
                    onChange={() => setAns((s) => s.map((x, k) => (k === i ? v : x)))} />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div aria-live="polite" data-quiz-result={pick ?? ""} className="flex flex-col justify-between rounded-2xl bg-accent p-8 text-accent-fg">
        {pick ? (
          <>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-80">추천 트랙</p>
              <p className="mt-3 font-display text-[36px] font-extrabold leading-none tracking-[-0.03em]">{RESULT[pick].t}</p>
              <p className="mt-4 opacity-90">{RESULT[pick].d}</p>
              <p className="mt-2 font-mono text-sm opacity-80">{RESULT[pick].w}</p>
            </div>
            <a href={cta} className="mt-8 inline-block rounded-xl bg-white px-6 py-4 text-center font-bold text-accent">이 트랙으로 상담 신청</a>
          </>
        ) : (
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] opacity-80">진행 {ans.filter(Boolean).length} / 3</p>
            <p className="mt-3 font-display text-[28px] font-extrabold leading-tight">세 가지 질문에 답하면 맞는 트랙을 알려드려요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
