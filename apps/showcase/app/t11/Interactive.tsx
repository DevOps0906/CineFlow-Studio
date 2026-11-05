"use client";
import { useId, useState, type KeyboardEvent } from "react";

const CASES = [
  { co: "Haneul Foods", ind: "식품 유통 · 콜드체인", q: "냉장 배송 경로를 다시 짜자 폐기율이 절반으로 줄었습니다. 첫 분기에 투자비를 회수했어요.", who: "물류본부장 (가상 인물)", m: [["-21%", "운송비"], ["-48%", "폐기율"], ["99.4%", "정시 도착"]] },
  { co: "Gridline Electronics", ind: "전자 부품 · B2B", q: "운송사 12곳을 한 화면에서 비교하고 자동 배정합니다. 배차 담당 업무가 하루 4시간 줄었습니다.", who: "SCM 팀장 (가상 인물)", m: [["-17%", "운송비"], ["-4h", "일 배차 업무"], ["12", "운송사 통합"]] },
  { co: "Morrow Apparel", ind: "패션 이커머스", q: "반품 회수 동선까지 최적화하니 고객 문의가 크게 줄었습니다. 시즌 피크에도 안정적이에요.", who: "운영 디렉터 (가상 인물)", m: [["-15%", "운송비"], ["-36%", "배송 문의"], ["2.4x", "피크 처리량"]] },
];

/** Case studies as an accessible tablist (arrow keys move between tabs). */
export function CaseTabs() {
  const [i, setI] = useState(0);
  const id = useId();
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" ? 1 : CASES.length - 1)) % CASES.length;
    setI(n);
    document.getElementById(`${id}-tab-${n}`)?.focus();
  };
  const c = CASES[i];
  return (
    <div>
      <div role="tablist" aria-label="고객 사례" className="flex flex-wrap gap-2" onKeyDown={onKey}>
        {CASES.map((x, k) => (
          <button key={x.co} id={`${id}-tab-${k}`} role="tab" type="button" aria-selected={k === i} aria-controls={`${id}-panel`} tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)} className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${k === i ? "border-text bg-text text-bg" : "border-border bg-surface hover:border-text-muted"}`}>
            {x.co}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} data-case={i} className="mt-8 grid gap-8 rounded-2xl border border-border bg-surface p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
        <figure>
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-muted">{c.ind}</p>
          <blockquote className="mt-4 font-display text-h2 font-medium leading-snug tracking-[-0.02em]">“{c.q}”</blockquote>
          <figcaption className="mt-6 text-sm text-text-muted">— {c.co}, {c.who}</figcaption>
        </figure>
        <dl className="grid content-center gap-6">
          {c.m.map(([v, k]) => <div key={k} className="border-l-2 border-primary pl-5"><dd className="font-display text-[40px] font-semibold leading-none tracking-tight">{v}</dd><dt className="mt-1 text-sm text-text-muted">{k}</dt></div>)}
        </dl>
      </div>
    </div>
  );
}

const won = (n: number) => `₩ ${Math.round(n).toLocaleString("ko-KR")}`;

/** ROI calculator: annual savings = shipments × cost × 12 × 18% (sample assumption, disclosed). */
export function RoiCalc({ cta }: { cta: string }) {
  const [ship, setShip] = useState(12000);
  const [cost, setCost] = useState(6500);
  const annual = ship * cost * 12;
  const save = annual * 0.18;
  return (
    <div className="grid gap-8 rounded-2xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12">
      <div className="space-y-10">
        <label className="block">
          <span className="flex justify-between text-sm font-medium"><span>월 출고 건수</span><span className="font-mono">{ship.toLocaleString("ko-KR")}건</span></span>
          <input type="range" min={1000} max={100000} step={1000} value={ship} onChange={(e) => setShip(Number(e.target.value))} className="mt-4 w-full accent-[var(--color-primary)]" aria-label="월 출고 건수" />
        </label>
        <label className="block">
          <span className="flex justify-between text-sm font-medium"><span>건당 평균 운송비</span><span className="font-mono">{won(cost)}</span></span>
          <input type="range" min={2000} max={30000} step={500} value={cost} onChange={(e) => setCost(Number(e.target.value))} className="mt-4 w-full accent-[var(--color-primary)]" aria-label="건당 평균 운송비" />
        </label>
        <p className="text-xs text-text-muted">※ 고객사 평균 절감률 18%를 적용한 추정치입니다(샘플 가정). 실제 절감액은 데모에서 데이터로 산출합니다.</p>
      </div>
      <div className="flex flex-col justify-between rounded-xl bg-accent p-8 text-accent-fg">
        <div aria-live="polite">
          <p className="font-mono text-xs uppercase tracking-[0.08em] opacity-80">예상 연간 절감액</p>
          <p data-roi className="mt-3 font-display text-[40px] font-semibold leading-none tracking-tight md:text-[52px]">{won(save)}</p>
          <p className="mt-3 text-sm opacity-80">현재 연간 운송비 {won(annual)} 기준</p>
        </div>
        <a href={cta} className="mt-8 inline-block rounded-lg bg-primary px-6 py-4 text-center font-semibold text-primary-fg">내 데이터로 정확히 계산하기</a>
      </div>
    </div>
  );
}
