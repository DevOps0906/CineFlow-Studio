/** HTML/CSS UI mockups (self-made, no external media). */
const frame = "rounded-2xl border border-accent/15 bg-surface p-5 shadow-[0_20px_60px_-30px_rgba(55,48,163,.35)]";
const Dot = ({ c }: { c: string }) => <span className={`h-2.5 w-2.5 rounded-full ${c}`} />;
const Bar = ({ w, strong }: { w: string; strong?: boolean }) => <div className={`h-2.5 rounded-full ${strong ? "bg-accent" : "bg-accent-soft"}`} style={{ width: w }} />;

export function HeroMock() {
  return (
    <div className={frame} role="img" aria-label="NOVA Flow 워크플로 편집 화면 목업 (플레이스홀더)">
      <div className="mb-4 flex gap-1.5"><Dot c="bg-rose-300" /><Dot c="bg-amber-300" /><Dot c="bg-emerald-300" /></div>
      <div className="grid grid-cols-3 gap-3">
        {["수집", "분류", "전송"].map((n, i) => (
          <div key={n} className="rounded-xl bg-bg p-3"><p className="text-xs text-muted">단계 {i + 1}</p><p className="mt-1 text-sm font-semibold">{n}</p><div className="mt-3 space-y-2"><Bar w="80%" strong /><Bar w="55%" /></div></div>
        ))}
      </div>
      <div className="mt-4 space-y-2"><Bar w="92%" /><Bar w="70%" /><Bar w="84%" /></div>
    </div>
  );
}

export function StepMock({ step }: { step: 0 | 1 | 2 }) {
  const titles = ["연결: 도구 3개 연동됨", "설계: 규칙 4개 구성됨", "실행: 오늘 128건 처리됨"];
  return (
    <div className={frame} role="img" aria-label={`${titles[step]} 화면 목업 (플레이스홀더)`}>
      <p className="mb-4 text-sm font-semibold">{titles[step]}</p>
      <div className="space-y-3">
        {[0, 1, 2].map((r) => (
          <div key={r} className="flex items-center gap-3 rounded-xl bg-bg p-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-xs font-bold text-accent">{step === 0 ? "A" + (r + 1) : step === 1 ? "R" + (r + 1) : "#" + (r + 1)}</span>
            <div className="flex-1 space-y-2"><Bar w={`${85 - r * 15}%`} strong={r === 0} /><Bar w={`${60 - r * 10}%`} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
