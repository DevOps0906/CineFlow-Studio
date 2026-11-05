// T05 THE ARDEN — motions: M01 Blur-in, M03 Parallax, M04 Pinned story (floor-plan tour), M06 Media reveal
import MotionInit from "@/components/MotionInit";
const CTA = "mailto:sales@example.com?subject=The%20Arden%20Private%20tour";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-14";

const TERRACES = [
  { x: 150, y: 400, w: 1140, h: 200, rows: 3 },
  { x: 260, y: 290, w: 920, h: 110, rows: 2 },
  { x: 400, y: 200, w: 640, h: 90, rows: 1 },
];

function Facade() {
  return (
    <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" className="h-full w-full" role="img" aria-label="The Arden 테라스형 외관 (자체 제작 일러스트)">
      {TERRACES.map((t, ti) => (
        <g key={ti}>
          <rect x={t.x} y={t.y} width={t.w} height={t.h} fill={ti % 2 ? "#18241f" : "#1c2a24"} />
          <path d={`M${t.x - 14} ${t.y}H${t.x + t.w + 14}`} stroke="#c9a46a" strokeWidth="3" />
          {Array.from({ length: t.rows }).map((_, r) =>
            Array.from({ length: Math.floor((t.w - 40) / 38) }).map((__, c) => (
              <rect key={`${r}-${c}`} x={t.x + 24 + c * 38} y={t.y + 14 + r * 62} width="16" height="44" className={`win ${(c * 7 + r * 5 + ti * 3) % 11 === 0 || (c * 3 + r + ti) % 13 === 0 ? "lit" : ""}`} />
            )),
          )}
          {Array.from({ length: Math.floor(t.w / 46) }).map((_, i) => (
            <ellipse key={i} cx={t.x + 10 + i * 46} cy={t.y - 6} rx="16" ry="8" fill="#2f4a3a" />
          ))}
        </g>
      ))}
      <rect x="0" y="596" width="1440" height="4" fill="#0f1a16" />
    </svg>
  );
}

const ROOMS = [
  { x: 20, y: 20, w: 300, h: 220, label: "LIVING" },
  { x: 330, y: 20, w: 250, h: 150, label: "KITCHEN" },
  { x: 330, y: 180, w: 250, h: 220, label: "MASTER" },
  { x: 20, y: 250, w: 300, h: 150, label: "TERRACE" },
];

function Plan({ active, live = false }: { active?: number; live?: boolean }) {
  return (
    <svg viewBox="0 0 600 420" className={`plan ${live ? "plan-live" : ""} block w-full`} role="img" aria-label="Type B 254㎡ 평면도">
      <rect x="10" y="10" width="580" height="400" fill="none" stroke="rgb(236 230 216 / .6)" strokeWidth="3" />
      {ROOMS.map((r, i) => (
        <g key={r.label}>
          <rect data-room={i} x={r.x} y={r.y} width={r.w} height={r.h} className={active === i ? "room-on" : undefined} />
          <text x={r.x + 16} y={r.y + 30}>{r.label}</text>
        </g>
      ))}
      <path d="M320 120a40 40 0 0 1 0 40M330 200a30 30 0 0 0 30 -30" fill="none" stroke="rgb(236 230 216 / .35)" />
      <path d="M40 250h60M200 250h100" stroke="#0f1a16" strokeWidth="4" />
    </svg>
  );
}

const TOUR = [
  ["Living", "62㎡", "남향 12m 전면창과 3.2m 층고. 한강 쪽으로 열린 거실."],
  ["Kitchen & Dining", "38㎡", "이탈리아 수제 주방과 3.6m 아일랜드. 8인 다이닝."],
  ["Master Suite", "54㎡", "드레스룸과 욕실이 이어진 침실. 아침 빛이 드는 동향."],
  ["Garden Terrace", "46㎡", "세대 전용 정원 테라스. 계절마다 바뀌는 수목 식재."],
] as const;

export default function Page() {
  return (
    <>
      <header id="top" className="dusk grain relative isolate flex min-h-svh flex-col overflow-hidden">
        <div aria-hidden className="absolute left-1/2 top-[18%] -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(233,200,138,.22),transparent_62%)] blur-xl" />
        <nav aria-label="주 메뉴" className={`${wrap} caption relative z-10 flex w-full items-center justify-between pt-8 text-text-muted`}>
          <a href="#top" className="text-text">The Arden</a>
          <ul className="hidden gap-8 md:flex">
            <li><a className="hover:text-text" href="#residences">Residences</a></li>
            <li><a className="hover:text-text" href="#tour">Tour</a></li>
            <li><a className="hover:text-text" href="#location">Location</a></li>
          </ul>
          <a href={CTA} className="text-primary">Private tour</a>
        </nav>
        <div className={`${wrap} relative z-10 w-full pt-14 text-center md:pt-20`}>
          <p data-m="blur-in" className="caption text-primary">Han-nam, Seoul — 24 Residences</p>
          <h1 data-m="blur-in" className="mt-6 font-display text-display font-medium italic leading-[0.85] tracking-display">The Arden</h1>
          <p data-m="blur-in" className="mx-auto mt-6 max-w-lg text-text-muted">한남동 언덕 위, 단 24세대. 모든 세대가 정원을 품은 테라스 레지던스.</p>
          <a data-cta data-m="blur-in" href={CTA} className="caption mt-9 inline-block border border-primary px-7 py-4 text-primary transition-colors hover:bg-primary hover:text-primary-fg">프라이빗 투어 예약</a>
        </div>
        <div className="relative mt-auto h-[38svh] min-h-[220px] w-full md:h-[46svh]">
          <div data-m="parallax" data-parallax="4" className="absolute inset-0"><Facade /></div>
        </div>
        <dl className="caption relative z-10 grid grid-cols-2 gap-y-4 border-t border-border bg-bg px-6 py-5 md:grid-cols-4 md:px-14">
          {[["Completion", "2027 Q3"], ["Residences", "24"], ["Size", "198—312㎡"], ["Ceiling", "3.2 m"]].map(([k, v]) => (
            <div key={k}><dt className="text-text-muted">{k}</dt><dd className="mt-1 font-display text-xl normal-case tracking-normal text-text">{v}</dd></div>
          ))}
        </dl>
      </header>

      <main id="main">
        <section id="residences" aria-labelledby="res-h" className={`${wrap} py-28 md:py-40`}>
          <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-end">
            <p className="caption text-primary">Residences</p>
            <h2 id="res-h" data-m="blur-in" className="font-display text-h1 italic leading-none tracking-display">Three ways to live with a garden</h2>
          </div>
          <ul className="mt-14 grid gap-4 md:grid-cols-3">
            {[["Type A", "198㎡", "3 Bedrooms · 정원 32㎡", 12], ["Type B", "254㎡", "4 Bedrooms · 정원 46㎡", 9], ["Penthouse", "312㎡", "4 Bedrooms · 루프 정원 120㎡", 3]].map(([t, a, d, n]) => (
              <li key={t} data-m="blur-in" className="border border-border bg-surface p-8 transition-colors hover:border-primary">
                <p className="caption text-text-muted">{n} residences</p>
                <h3 className="mt-6 font-display text-[44px] italic leading-none">{t}</h3>
                <p className="mt-2 font-display text-2xl text-primary">{a}</p>
                <p className="mt-6 text-text-muted">{d}</p>
                <p className="caption mt-8 border-t border-border pt-5">분양가 문의</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="tour" aria-labelledby="tour-h" data-m="pin" className="border-y border-border bg-surface md:min-h-svh">
          <div className={`${wrap} py-24 md:flex md:min-h-svh md:flex-col md:justify-center`}>
            <p className="caption text-primary">Floor plan tour · Type B</p>
            <h2 id="tour-h" className="mb-12 mt-5 font-display text-h1 italic leading-none tracking-display">Walk through 254㎡</h2>
            <div className="md:grid md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-16">
              <ol className="space-y-12 md:space-y-6">
                {TOUR.map(([t, a, d], i) => (
                  <li key={t} data-step={i} className="md:border-l md:pl-6">
                    <p className="caption text-text-muted">0{i + 1} · {a}</p>
                    <h3 className="mt-2 font-display text-[30px] italic leading-none">{t}</h3>
                    <p className="mt-2 text-text-muted">{d}</p>
                    <div className="mt-6 md:hidden"><Plan active={i} /></div>
                  </li>
                ))}
              </ol>
              <div className="hidden md:block"><Plan live /></div>
            </div>
          </div>
        </section>

        <section id="location" aria-labelledby="loc-h" className={`${wrap} grid gap-14 py-28 md:grid-cols-2 md:items-center md:py-40`}>
          <div>
            <p className="caption text-primary">Location</p>
            <h2 id="loc-h" data-m="blur-in" className="mt-5 font-display text-h1 italic leading-none tracking-display">Quiet hill, close to everything</h2>
            <ul className="mt-12 border-t border-border">
              {[["한강공원", "도보 3분"], ["이태원·한남 상권", "차량 5분"], ["남산", "차량 8분"], ["강남 업무지구", "차량 15분"]].map(([k, v]) => (
                <li key={k} className="flex justify-between border-b border-border py-5"><span>{k}</span><span className="caption text-text-muted">{v}</span></li>
              ))}
            </ul>
          </div>
          <div data-m="reveal" className="aspect-square bg-bg">
            <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="위치 약도 (자체 제작)">
              <path d="M0 300 C 90 270, 160 330, 250 290 S 360 250, 400 270 L400 400 L0 400Z" fill="#16241f" />
              <path d="M0 300 C 90 270, 160 330, 250 290 S 360 250, 400 270" fill="none" stroke="#3b5a4c" strokeWidth="3" />
              <g stroke="rgb(236 230 216 / .15)">{Array.from({ length: 9 }).map((_, i) => <path key={i} d={`M${i * 50} 0V280M0 ${i * 40}H400`} />)}</g>
              <circle cx="200" cy="170" r="10" fill="#c9a46a" /><circle cx="200" cy="170" r="28" fill="none" stroke="#c9a46a" strokeOpacity=".4" />
              <text x="220" y="165" fill="#ece6d8" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2">THE ARDEN</text>
              <text x="24" y="330" fill="#a9b0a3" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">HAN RIVER</text>
            </svg>
          </div>
        </section>

        <section aria-labelledby="cta-h" className="border-t border-border px-6 py-32 text-center md:py-44">
          <p className="caption text-primary">By appointment only</p>
          <h2 id="cta-h" data-m="blur-in" className="mx-auto mt-6 max-w-4xl font-display text-h1 italic leading-[0.95] tracking-display">See the garden before the walls go up.</h2>
          <a href={CTA} className="caption mt-12 inline-block bg-primary px-8 py-4 text-primary-fg">프라이빗 투어 예약</a>
        </section>
      </main>

      <footer className={`${wrap} caption grid gap-3 border-t border-border py-8 text-text-muted md:grid-cols-3`}>
        <span className="text-text">The Arden</span>
        <a href="mailto:sales@example.com" className="normal-case tracking-normal">sales@example.com</a>
        <span className="normal-case tracking-normal md:text-right">CineFlow Studio T05 시연용 가상 단지 · 수치·일러스트는 샘플</span>
      </footer>
      <MotionInit />
    </>
  );
}
