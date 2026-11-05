// T11 ORBITAL — motions: M01 Blur-in, M02 Split reveal, M07 Magnetic CTA (+ count-up metrics, ROI calculator, case tabs)
import MotionInit from "@/components/MotionInit";
import { CaseTabs, RoiCalc } from "./Interactive";
import HeroTitle from "@/components/HeroTitle";

const CTA = "mailto:sales@example.com?subject=ORBITAL%20Demo";
const wrap = "mx-auto max-w-[1280px] px-6 md:px-10";

function DashboardMock() {
  const pts = [92, 88, 90, 81, 78, 74, 70, 71, 66, 63, 60, 58];
  const d = pts.map((v, i) => `${i ? "L" : "M"}${20 + i * 32} ${v * 1.6}`).join(" ");
  return (
    <figure className="rounded-2xl border border-border bg-surface p-6 shadow-[0_40px_80px_-40px_rgba(11,31,58,.3)]" aria-label="ORBITAL 대시보드 예시 화면">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">운송비 추이 · 최근 12주</p>
        <span className="rounded-full bg-primary px-2.5 py-1 font-mono text-xs text-primary-fg">-18.4%</span>
      </div>
      <svg viewBox="0 0 400 170" className="mt-4 block w-full" role="img" aria-label="운송비가 12주 동안 18% 감소한 선 그래프">
        <g stroke="#dfe5ee">{[40, 80, 120, 160].map((y) => <path key={y} d={`M10 ${y}H390`} />)}</g>
        <path data-hero-fade d={`${d} L372 170 L20 170Z`} fill="rgb(0 128 107 / .1)" />
        <path data-hero-draw d={d} fill="none" stroke="#00806b" strokeWidth="2.5" />
        <circle data-hero-pop cx="372" cy={58 * 1.6} r="5" fill="#00806b" />
      </svg>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[["정시 도착", "99.2%"], ["활성 운송사", "12"], ["오늘 출고", "3,412"]].map(([k, v]) => (
          <div key={k} data-hero-pop className="rounded-lg bg-bg p-3"><p className="text-xs text-text-muted">{k}</p><p className="font-display text-lg font-semibold">{v}</p></div>
        ))}
      </div>
    </figure>
  );
}

export default function Page() {
  return (
    <>
      <header id="top" data-hero>
        <nav aria-label="주 메뉴" className={`${wrap} flex items-center justify-between py-6`}>
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"><span aria-hidden className="h-5 w-5 rounded-full border-[5px] border-primary" />ORBITAL</a>
          <ul className="hidden gap-8 text-sm font-medium text-text-muted md:flex"><li><a className="hover:text-text" href="#platform">플랫폼</a></li><li><a className="hover:text-text" href="#cases">고객 사례</a></li><li><a className="hover:text-text" href="#roi">ROI 계산</a></li></ul>
          <a href={CTA} className="rounded-lg bg-text px-4 py-2 text-sm font-semibold text-bg">데모 요청</a>
        </nav>
        <div className={`${wrap} grid gap-14 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pb-28 lg:pt-16`}>
          <div>
            <p data-hero-fade className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">Logistics Cloud for B2B</p>
            <HeroTitle className="mt-5 font-display text-display font-semibold leading-[1.08] tracking-display" parts={[{ t: "물류비" }, { t: "18%", className: "text-primary" }, { t: "절감, 첫 분기부터." }]} />
            <p data-hero-fade className="mt-6 max-w-lg text-lg text-text-muted">경로 최적화, 운송사 자동 배정, 실시간 추적을 하나의 플랫폼에서. 340개 기업이 ORBITAL로 운송비를 줄였습니다.</p>
            <div data-hero-fade className="mt-9 flex flex-wrap gap-3">
              <a data-m="magnetic" data-cta href={CTA} className="rounded-lg bg-primary px-6 py-4 font-semibold text-primary-fg">30분 데모 요청</a>
              <a href="#cases" className="rounded-lg border border-border bg-surface px-6 py-4 font-semibold">고객 사례 보기</a>
            </div>
          </div>
          <div data-hero-visual="rise" data-hero-tilt><DashboardMock /></div>
        </div>
        <div className="border-y border-border bg-surface">
          <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-10 gap-y-3 py-6 font-mono text-sm text-text-muted`}>
            <span className="text-xs">340+ teams</span>
            {["HANEUL FOODS", "GRIDLINE", "MORROW", "NORTHPORT", "SEOWON CHEM"].map((n) => <span key={n} className="font-semibold tracking-[0.1em] text-text-muted">{n}</span>)}
          </div>
        </div>
      </header>

      <main id="main">
        <section aria-labelledby="metrics-h" className={`${wrap} py-24 md:py-32`}>
          <h2 id="metrics-h" className="sr-only">핵심 성과 (샘플 데이터)</h2>
          <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {[["18", 0, "%", "평균 운송비 절감"], ["99.2", 1, "%", "정시 도착률"], ["2.4", 1, "x", "피크 처리량"], ["340", 0, "+", "도입 기업"]].map(([v, dec, u, l]) => (
              <div key={l as string} data-m="blur-in" className="border-l border-border pl-6">
                <dd className="font-display text-[48px] font-semibold leading-none tracking-tight md:text-[64px]"><span data-count={v} data-decimals={dec}>{v}</span><span className="text-primary">{u}</span></dd>
                <dt className="mt-2 text-text-muted">{l}</dt>
              </div>
            ))}
          </dl>
        </section>

        <section id="platform" aria-labelledby="plat-h" className="border-y border-border bg-surface">
          <div className={`${wrap} py-24 md:py-32`}>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">Platform</p>
            <h2 id="plat-h" data-m="blur-in" className="mt-3 max-w-2xl font-display text-h1 font-semibold leading-tight tracking-display">하나의 플랫폼, 세 개의 모듈</h2>
            <ul className="mt-12 grid gap-4 md:grid-cols-3">
              {[["Route AI", "수요·교통·창고 위치를 반영해 매일 최적 경로를 다시 계산합니다.", "M4 20c4-8 12-8 16-16M4 20h4M16 4h4v4"], ["Carrier Hub", "운송사 단가와 품질을 비교해 건별로 자동 배정합니다.", "M3 7h18M3 12h18M3 17h12"], ["Live Visibility", "모든 화물의 위치와 예상 도착 시간을 실시간으로 공유합니다.", "M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12ZM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"]].map(([t, d, icon]) => (
                <li key={t} data-m="blur-in" className="rounded-2xl border border-border bg-bg p-8">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#00806b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={icon} /></svg>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{t}</h3>
                  <p className="mt-2 text-text-muted">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="cases" aria-labelledby="cases-h" className={`${wrap} py-24 md:py-32`}>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">Customer stories</p>
          <h2 id="cases-h" data-m="blur-in" className="mb-10 mt-3 font-display text-h1 font-semibold leading-tight tracking-display">숫자로 증명된 결과</h2>
          <CaseTabs />
        </section>

        <section id="roi" aria-labelledby="roi-h" className="border-t border-border bg-surface">
          <div className={`${wrap} py-24 md:py-32`}>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">ROI calculator</p>
            <h2 id="roi-h" data-m="blur-in" className="mb-10 mt-3 font-display text-h1 font-semibold leading-tight tracking-display">우리 회사는 얼마나 절감할까?</h2>
            <RoiCalc cta={CTA} />
          </div>
        </section>

        <section aria-labelledby="cta-h" className="bg-accent text-accent-fg">
          <div className={`${wrap} flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center`}>
            <h2 id="cta-h" className="max-w-xl font-display text-h2 font-semibold leading-tight">30분 데모로 우리 회사의 절감액을 확인하세요.</h2>
            <a data-m="magnetic" href={CTA} className="rounded-lg bg-primary px-7 py-4 font-semibold text-primary-fg">데모 요청</a>
          </div>
        </section>
      </main>

      <footer className={`${wrap} grid gap-3 py-8 text-sm text-text-muted md:grid-cols-3`}>
        <span className="font-display font-bold text-text">ORBITAL</span>
        <a href="mailto:sales@example.com">sales@example.com</a>
        <span className="md:text-right">CineFlow Studio T11 시연용 가상 기업 · 수치·사례는 샘플</span>
      </footer>
      <MotionInit />
    </>
  );
}
