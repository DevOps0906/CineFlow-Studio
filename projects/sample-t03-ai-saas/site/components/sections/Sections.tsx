import SplitText from "./SplitText";
import Terminal from "./Terminal";

const CTA_HREF = "mailto:demo@example.com?subject=NOVA%20Flow%20%EB%AC%B4%EB%A3%8C%20%EB%8D%B0%EB%AA%A8%20%EC%8B%A0%EC%B2%AD";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-16";
const btn = "inline-flex items-center rounded-control bg-primary px-6 py-4 font-semibold text-primary-fg transition-[filter] hover:brightness-110";

export function Hero() {
  const stats = [["68%", "반복 업무 시간 절감"], ["12 min", "첫 워크플로 구축"], ["99.9%", "월간 실행 성공률"], ["240+", "연동 앱"]];
  return (
    <header id="top" className="grain relative isolate overflow-hidden">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -top-[12%] right-[6%] -z-10 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(198,244,50,.13),transparent_60%)] blur-2xl" />

      <nav aria-label="주 메뉴" className={`${wrap} relative z-10 flex items-center justify-between py-7 font-mono text-[13px] text-text-muted`}>
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-text">nova<span className="text-primary">/</span>flow</a>
        <ul className="hidden gap-8 md:flex">
          <li><a className="hover:text-text" href="#product">product</a></li>
          <li><a className="hover:text-text" href="#how">how it works</a></li>
          <li><a className="hover:text-text" href="#demo">demo</a></li>
        </ul>
        <a href={CTA_HREF} className="text-primary">→ book a demo</a>
      </nav>

      <div className={`${wrap} relative z-10 grid gap-14 pb-16 pt-8 lg:grid-cols-[1.12fr_1fr] lg:items-center lg:gap-14 lg:pt-14`}>
        <div>
          <span data-m="blur-in" className="inline-flex items-center gap-2.5 rounded-full border border-border px-3.5 py-2 font-mono text-xs text-text-muted">
            <i className="pulse-dot h-[7px] w-[7px] rounded-full bg-primary" />v2.4 · 128,402 runs today
          </span>
          <h1 className="mt-8 font-display text-display font-bold leading-[0.94] tracking-display">
            <SplitText text="Turn repetition into flow." accent={["flow."]} />
          </h1>
          <p data-m="blur-in" className="mt-5 text-[22px] font-semibold tracking-[-0.02em] md:text-[26px]">반복 업무를, 흐름으로.</p>
          <p data-m="blur-in" className="mt-4 max-w-[500px] text-text-muted">앱을 연결하고 규칙을 설계하면 NOVA Flow가 실행합니다. 팀은 판단이 필요한 일에만 집중하세요.</p>
          <div data-m="blur-in" className="mt-10 flex flex-wrap gap-3.5">
            <a data-m="magnetic" data-cta href={CTA_HREF} className={btn}>무료 데모 신청</a>
            <span className="inline-flex items-center rounded-control border border-border px-5 py-4 font-mono text-sm">$ npx nova init</span>
          </div>
        </div>
        <div data-m="blur-in"><Terminal stage={3} label="워크플로 데모: 메일 트리거가 AI 분류를 거쳐 시트에 기록되는 흐름" /></div>
      </div>

      <div className={`${wrap} relative z-10`}>
        <dl className="grid grid-cols-2 gap-y-8 border-t border-border py-8 lg:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-[28px] font-semibold tracking-[-0.02em] md:text-[32px]">{n}</dd>
              <dd className="font-mono text-xs text-text-muted">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

export function Logos() {
  return (
    <section aria-label="고객사 (가상 예시)" className="border-y border-border">
      <div className={`${wrap} flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-8 font-mono text-sm text-text-muted`}>
        <span className="text-xs">// trusted by teams at</span>
        {["lumen", "atlas&co", "parcel", "fieldnote", "quanta", "northbeam"].map((n) => <span key={n} className="text-base text-text/70">{n}</span>)}
      </div>
    </section>
  );
}

const TILES = ["GM", "SL", "NT", "SH", "HS", "GH", "JR", "FG", "ST", "DB", "AS", "TL"];
const BARS = [38, 52, 44, 61, 57, 70, 48, 66, 74, 69, 81, 77, 64, 85, 79, 88, 72, 90, 84, 93, 87, 95, 91, 98];

export function Product() {
  const card = "rounded-card border border-border bg-surface p-7 transition-colors duration-300 hover:border-primary/60";
  return (
    <section id="product" aria-labelledby="product-h" className={`${wrap} py-28 md:py-36`}>
      <p className="eyebrow">// product</p>
      <h2 id="product-h" data-m="blur-in" className="mt-5 max-w-3xl font-display text-h1 font-bold leading-[1.02] tracking-display">세 가지로 충분합니다.</h2>
      <ul className="mt-14 grid gap-4 lg:grid-cols-3">
        <li data-m="blur-in" className={card}>
          <p className="font-mono text-xs text-text-muted">01 · connect</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">240+ 앱을 연결</h3>
          <p className="mt-2 text-text-muted">메신저, 시트, CRM을 클릭 몇 번으로 연동합니다.</p>
          <ul aria-hidden className="mt-8 grid grid-cols-6 gap-2">
            {TILES.map((t, i) => (
              <li key={t} className={`grid aspect-square place-items-center rounded-md border font-mono text-[11px] ${[0, 3, 7].includes(i) ? "border-primary text-primary" : "border-border text-text-muted"}`}>{t}</li>
            ))}
          </ul>
        </li>
        <li data-m="blur-in" className={card}>
          <p className="font-mono text-xs text-text-muted">02 · automate</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">규칙은 문장처럼</h3>
          <p className="mt-2 text-text-muted">조건과 예외를 정의하면 AI가 분류와 요약을 맡습니다.</p>
          <pre aria-label="자동화 규칙 예시" className="mt-8 overflow-x-auto rounded-lg border border-border bg-bg p-4 font-mono text-[13px] leading-7">
            <span className="text-signal">when</span>: gmail.inbox{"\n"}
            {"  "}<span className="text-signal">if</span>: ai.classify == <span className="text-primary">&quot;invoice&quot;</span>{"\n"}
            <span className="text-signal">then</span>: sheets.append{"\n"}
            <span className="text-signal">else</span>: queue.review
          </pre>
        </li>
        <li data-m="blur-in" className={card}>
          <p className="font-mono text-xs text-text-muted">03 · observe</p>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">모든 실행을 기록</h3>
          <p className="mt-2 text-text-muted">실행 로그와 실패 알림으로 흐름의 상태를 확인합니다.</p>
          <div className="mt-8 rounded-lg border border-border bg-bg p-4">
            <div className="flex justify-between font-mono text-xs text-text-muted"><span>success · 24h</span><span className="text-primary">99.9%</span></div>
            <svg viewBox="0 0 240 70" className="mt-3 block w-full" role="img" aria-label="최근 24시간 실행 성공률 막대 그래프">
              {BARS.map((h, i) => <rect key={i} x={i * 10} y={70 - h * 0.7} width="6" height={h * 0.7} rx="1.5" fill={i > 19 ? "var(--color-primary)" : "var(--color-border)"} />)}
            </svg>
          </div>
        </li>
      </ul>
    </section>
  );
}

const STEPS = [
  ["Connect", "자주 쓰는 도구를 연결하면 이벤트가 트리거로 들어옵니다."],
  ["Design", "AI 분류와 조건 분기를 규칙으로 구성합니다. 코드는 필요 없습니다."],
  ["Run", "흐름이 자동으로 실행되고, 모든 결과는 로그로 남습니다."],
] as const;
const STEP_LABELS = ["1단계: 메일 트리거 수신", "2단계: AI 분류 실행", "3단계: 시트로 결과 전송"];

/** M04 Pinned story. md+: steps + crossfading terminal panels (pinned). <md or reduced motion: each step stacks with its own panel. */
export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-h" data-m="pin" className="border-t border-border md:min-h-svh">
      <div className={`${wrap} py-24 md:flex md:min-h-svh md:flex-col md:justify-center`}>
        <p className="eyebrow">// how it works</p>
        <h2 id="how-h" className="mb-14 mt-5 font-display text-h1 font-bold leading-none tracking-display">연결에서 실행까지, 3단계.</h2>
        <div className="md:grid md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
          <ol className="space-y-14 md:space-y-8">
            {STEPS.map(([t, d], i) => (
              <li key={t} data-step={i} className="md:border-l md:pl-6">
                <p className="font-mono text-xs text-primary">0{i + 1}</p>
                <h3 className="mt-2 font-display text-[28px] font-semibold tracking-tight">{t}</h3>
                <p className="mt-2 text-text-muted">{d}</p>
                <div className="mt-6 md:hidden"><Terminal stage={(i + 1) as 1 | 2 | 3} label={STEP_LABELS[i]} /></div>
              </li>
            ))}
          </ol>
          <div className="hidden md:grid [&>*]:[grid-area:1/1]">
            {STEPS.map((_, i) => <div key={i} data-panel={i}><Terminal stage={(i + 1) as 1 | 2 | 3} label={STEP_LABELS[i]} /></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Demo() {
  return (
    <section id="demo" aria-labelledby="demo-h" className="relative isolate overflow-hidden border-t border-border">
      <div aria-hidden className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto max-w-[1100px] px-6 py-32 text-center md:py-44">
        <h2 id="demo-h" data-m="blur-in" className="font-display text-display font-bold leading-[0.95] tracking-display">Ship your first<br />flow <span className="text-primary">today.</span></h2>
        <p data-m="blur-in" className="mt-6 text-text-muted">30분 데모에서 팀의 업무에 맞는 시나리오를 함께 설계합니다.</p>
        <div data-m="blur-in" className="mx-auto mt-12 flex max-w-xl flex-col gap-2 rounded-card border border-border bg-surface p-2 sm:flex-row sm:items-center">
          <span className="caret flex-1 px-4 py-3 text-left font-mono text-sm text-text-muted">$ npx nova init</span>
          <a data-m="magnetic" href={CTA_HREF} className={`${btn} justify-center py-3.5`}>무료 데모 신청</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={`${wrap} grid gap-4 border-t border-border py-10 font-mono text-xs text-text-muted md:grid-cols-3`}>
      <span className="font-display text-base font-bold text-text">nova<span className="text-primary">/</span>flow</span>
      <a href="mailto:demo@example.com" className="hover:text-text">demo@example.com</a>
      <span className="md:text-right">CineFlow Studio T03 시연용 가상 제품 · 수치는 샘플 데이터</span>
    </footer>
  );
}
