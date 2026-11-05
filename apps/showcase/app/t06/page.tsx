// T06 VOIDRUNNER — motions: M01 Blur-in, M04 Pinned story (sector map), M07 Magnetic CTA, M08 Model reveal (Relic)
import MotionInit from "@/components/MotionInit";
import Relic from "./Relic";

const CTA = "mailto:play@example.com?subject=VOIDRUNNER%20Pre-register";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-14";

const CLASSES = [
  { n: "Runner", ko: "러너", d: "벽을 달리고 공허를 가르는 기동 특화 클래스.", s: [92, 48, 61], shape: "M50 8 92 50 50 92 8 50Z" },
  { n: "Warden", ko: "워든", d: "신호를 차단하는 방벽을 세우는 방어 특화 클래스.", s: [44, 95, 52], shape: "M50 8 88 30v40L50 92 12 70V30Z" },
  { n: "Echo", ko: "에코", d: "과거의 잔상을 불러내 전장을 교란하는 전술 클래스.", s: [66, 55, 97], shape: "M50 6a44 44 0 1 0 .1 0ZM50 26a24 24 0 1 1-.1 0Z" },
];
const SECTORS = [
  ["Sector 01 — Neon Ward", "네온 간판 아래 끊긴 신호를 추적합니다. 튜토리얼 구역."],
  ["Sector 04 — Drowned Line", "물에 잠긴 지하철 노선. 수직 이동과 추격전."],
  ["Sector 07 — The Void", "도시가 끝나는 곳. 모든 기억이 모이는 최종 구역."],
] as const;

function SectorMap({ active, live = false }: { active?: number; live?: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className={`map ${live ? "map-live" : ""} block w-full`} role="img" aria-label="섹터 지도">
      <g fill="none" stroke="rgb(61 242 255 / .12)">{[60, 110, 160].map((r) => <circle key={r} cx="200" cy="200" r={r} />)}<path d="M200 20V380M20 200H380" /></g>
      <path data-sector={0} className={active === 0 ? "sector-on" : undefined} d="M200 200 L200 40 A160 160 0 0 1 338 280 Z" />
      <path data-sector={1} className={active === 1 ? "sector-on" : undefined} d="M200 200 L338 280 A160 160 0 0 1 62 280 Z" />
      <path data-sector={2} className={active === 2 ? "sector-on" : undefined} d="M200 200 L62 280 A160 160 0 0 1 200 40 Z" />
      <g fill="#eef1ff" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2"><text x="250" y="140">S01</text><text x="185" y="320">S04</text><text x="110" y="140">S07</text></g>
      <circle cx="200" cy="200" r="5" fill="#ff3d8b" />
    </svg>
  );
}

export default function Page() {
  return (
    <>
      <header id="top" className="scan relative isolate flex min-h-svh flex-col overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(900px_600px_at_70%_40%,rgba(255,61,139,.16),transparent_65%),radial-gradient(800px_500px_at_20%_80%,rgba(61,242,255,.10),transparent_60%)]" />
        <div aria-hidden className="floor -z-10" />
        <nav aria-label="주 메뉴" className={`${wrap} caption relative z-10 flex w-full items-center justify-between pt-7 text-text-muted`}>
          <a href="#top" className="font-display text-lg font-bold normal-case tracking-[0.1em] text-text">VOID<span className="text-primary">/</span>RUNNER</a>
          <ul className="hidden gap-8 md:flex"><li><a className="hover:text-accent" href="#classes">Classes</a></li><li><a className="hover:text-accent" href="#world">World</a></li><li><a className="hover:text-accent" href="#prereg">Pre-register</a></li></ul>
          <span className="text-accent">Season 0</span>
        </nav>
        <div className={`${wrap} relative z-10 grid w-full flex-1 items-center gap-6 pb-12 pt-6 lg:grid-cols-[1.1fr_1fr]`}>
          <div className="order-2 lg:order-1">
            <p data-m="blur-in" className="caption text-accent">// Signal lost · Sector 07</p>
            <h1 data-m="blur-in" className="mt-5 font-display text-display font-bold uppercase leading-[0.86] tracking-display">
              Void<br /><span className="glow-pink text-primary">Runner</span>
            </h1>
            <p data-m="blur-in" className="mt-6 max-w-md text-text-muted">신호가 끊긴 도시에서 마지막 기억을 되찾으세요. 2027년 봄, PC와 콘솔 동시 출시.</p>
            <div data-m="blur-in" className="mt-9 flex flex-wrap gap-3">
              <a data-m="magnetic" data-cta href="#prereg" className="caption bg-primary px-7 py-4 font-bold text-primary-fg [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]">사전예약</a>
              <span className="caption border border-accent/60 px-6 py-4 text-accent">▶ Trailer 01:12</span>
            </div>
            <p className="caption mt-8 text-text-muted">PC · PS5 · Xbox Series X|S</p>
          </div>
          <div className="order-1 mx-auto w-[min(78vw,560px)] lg:order-2"><Relic /></div>
        </div>
        <span aria-hidden className="hud-corner left-4 top-4 border-l border-t md:left-8 md:top-8" />
        <span aria-hidden className="hud-corner bottom-4 right-4 border-b border-r md:bottom-8 md:right-8" />
      </header>

      <main id="main">
        <section aria-labelledby="count-h" className="border-y border-border bg-surface">
          <div className={`${wrap} grid gap-8 py-14 md:grid-cols-[1fr_1.4fr] md:items-center`}>
            <div>
              <h2 id="count-h" className="caption text-text-muted">Pre-registrations</h2>
              <p className="mt-2 font-display text-[56px] font-bold leading-none md:text-[80px]"><span data-count="1284302">1,284,302</span></p>
            </div>
            <div>
              <div className="caption flex justify-between text-text-muted"><span className="text-accent">1M ✓ 한정 스킨</span><span>1.5M 무기</span><span>2M 탈것</span></div>
              <div className="mt-3 h-2 bg-border" role="progressbar" aria-valuenow={64} aria-valuemin={0} aria-valuemax={100} aria-label="보상 달성률">
                <div className="h-full w-[64%] bg-gradient-to-r from-accent to-primary shadow-[0_0_20px_rgba(255,61,139,.6)]" />
              </div>
            </div>
          </div>
        </section>

        <section id="classes" aria-labelledby="classes-h" className={`${wrap} py-28 md:py-36`}>
          <p className="caption text-accent">// Choose your class</p>
          <h2 id="classes-h" data-m="blur-in" className="mt-4 font-display text-h1 font-bold uppercase leading-none tracking-display">Three ways to run</h2>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {CLASSES.map((c) => (
              <li key={c.n} data-m="blur-in" className="card-tilt border border-border bg-surface p-7">
                <svg viewBox="0 0 100 100" className="h-24 w-24" aria-hidden><path d={c.shape} fill="none" stroke="#ff3d8b" strokeWidth="2" fillRule="evenodd" /><path d={c.shape} fill="rgb(61 242 255 / .08)" fillRule="evenodd" transform="translate(6 6) scale(.88)" stroke="#3df2ff" strokeOpacity=".5" /></svg>
                <h3 className="mt-6 font-display text-[34px] font-bold uppercase leading-none">{c.n}</h3>
                <p className="caption mt-1 text-accent">{c.ko}</p>
                <p className="mt-4 text-text-muted">{c.d}</p>
                <dl className="mt-6 space-y-2">
                  {["SPD", "DEF", "TEC"].map((k, i) => (
                    <div key={k} className="grid grid-cols-[3rem_1fr_2rem] items-center gap-3 font-mono text-xs">
                      <dt className="text-text-muted">{k}</dt>
                      <dd className="h-1.5 bg-border"><div className="h-full bg-primary" style={{ width: `${c.s[i]}%` }} /></dd>
                      <dd className="text-right">{c.s[i]}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </section>

        <section id="world" aria-labelledby="world-h" data-m="pin" className="border-t border-border md:min-h-svh">
          <div className={`${wrap} py-24 md:flex md:min-h-svh md:flex-col md:justify-center`}>
            <p className="caption text-accent">// World map</p>
            <h2 id="world-h" className="mb-12 mt-4 font-display text-h1 font-bold uppercase leading-none tracking-display">Into the void</h2>
            <div className="md:grid md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
              <ol className="space-y-12 md:space-y-8">
                {SECTORS.map(([t, d], i) => (
                  <li key={t} data-step={i} className="md:border-l md:pl-6">
                    <h3 className="font-display text-[26px] font-bold uppercase leading-tight">{t}</h3>
                    <p className="mt-2 text-text-muted">{d}</p>
                    <div className="mx-auto mt-6 max-w-xs md:hidden"><SectorMap active={i} /></div>
                  </li>
                ))}
              </ol>
              <div className="mx-auto hidden w-full max-w-md md:block"><SectorMap live /></div>
            </div>
          </div>
        </section>

        <section id="prereg" aria-labelledby="pre-h" className="relative isolate overflow-hidden border-t border-border px-6 py-32 text-center md:py-44">
          <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,61,139,.18),transparent_60%)]" />
          <p className="caption text-accent">// Incoming transmission</p>
          <h2 id="pre-h" data-m="blur-in" className="mt-5 font-display text-display font-bold uppercase leading-[0.88] tracking-display">Run<br /><span className="text-primary glow-pink">first.</span></h2>
          <p data-m="blur-in" className="mx-auto mt-6 max-w-md text-text-muted">지금 사전예약하면 출시일에 한정 스킨 ‘Null Signal’을 지급합니다.</p>
          <a data-m="magnetic" href={CTA} className="caption mt-10 inline-block bg-primary px-8 py-4 font-bold text-primary-fg">사전예약하기</a>
        </section>
      </main>

      <footer className={`${wrap} caption grid gap-3 border-t border-border py-8 text-text-muted md:grid-cols-3`}>
        <span className="text-text">VOIDRUNNER</span>
        <a href="mailto:play@example.com" className="normal-case tracking-normal">play@example.com</a>
        <span className="normal-case tracking-normal md:text-right">CineFlow Studio T06 시연용 가상 게임 · 등급 미정</span>
      </footer>
      <MotionInit />
    </>
  );
}
