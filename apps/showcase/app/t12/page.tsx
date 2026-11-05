// T12 SEOUL SOUND WEEK — motions: M01 Blur-in, M03 Parallax, M06 Media reveal, M07 Magnetic CTA (+ live countdown, lineup gallery)
import MotionInit from "@/components/MotionInit";
import type { CSSProperties } from "react";
import Countdown from "./Countdown";
import HeroTitle from "@/components/HeroTitle";

const CTA = "mailto:tickets@example.com?subject=SEOUL%20SOUND%20WEEK%202027";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-14";

const LINEUP = [
  ["NOVA BLUE", "Fri 14", "Main", "linear-gradient(160deg,#2b3cff,#0b0b0b)"],
  ["KIM HARU", "Fri 14", "River", "linear-gradient(160deg,#ff4d2e,#3a0d06)"],
  ["THE PAPER MOONS", "Sat 15", "Main", "linear-gradient(160deg,#b9a6ff,#1d1438)"],
  ["SÉRAPHINE", "Sat 15", "Dome", "linear-gradient(160deg,#ffd166,#3b2a05)"],
  ["DAWN UNIT", "Sun 16", "Garage", "linear-gradient(160deg,#06d6a0,#032b22)"],
  ["MIRA K", "Sun 16", "River", "linear-gradient(160deg,#ff8fab,#3a0d1c)"],
  ["LOW TIDE CLUB", "Mon 17", "Dome", "linear-gradient(160deg,#4cc9f0,#05222e)"],
  ["OKAY SUMMER", "Mon 17", "Main", "linear-gradient(160deg,#f5f5f0,#3d3d38)"],
];
const STAGES = [["01", "Main Stage", "17:00—23:00"], ["02", "River Stage", "15:00—22:00"], ["03", "Forest Dome", "19:00—02:00"], ["04", "Night Garage", "22:00—05:00"]];

export default function Page() {
  return (
    <>
      <header id="top" data-hero className="grain relative isolate flex min-h-svh flex-col overflow-hidden">
        <div aria-hidden data-hero-depth="-0.6" data-m="parallax" data-parallax="10" className="absolute -right-[18vw] top-[8%] -z-10 h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] md:-right-[8vw] md:h-[58vw] md:w-[58vw]"><div data-hero-visual="scale" className="h-full w-full"><div className="sun h-full w-full opacity-80" /></div></div>
        <nav aria-label="주 메뉴" className={`${wrap} caption flex w-full items-center justify-between pt-7`}>
          <a href="#top" className="font-display text-xl normal-case tracking-[0.04em]">SSW<span className="text-primary">27</span></a>
          <ul className="hidden gap-8 md:flex"><li><a className="hover:text-primary" href="#lineup">Lineup</a></li><li><a className="hover:text-primary" href="#stages">Stages</a></li><li><a className="hover:text-primary" href="#tickets">Tickets</a></li></ul>
          <a href="#tickets" className="text-primary">Tickets →</a>
        </nav>
        <div className={`${wrap} grid w-full flex-1 items-end gap-10 pb-12 pt-10 lg:grid-cols-[1.3fr_1fr]`}>
          <div>
            <p data-hero-fade className="caption text-accent">May 14—17, 2027 · Nodeul Island, Seoul</p>
            <HeroTitle kinetic className="mt-4 font-display text-display uppercase leading-[0.86] tracking-display" parts={[{ t: "Seoul", br: true }, { t: "Sound", br: true }, { t: "Week" }, { t: "2027", className: "outline-text" }]} />
          </div>
          <div data-hero-fade className="border border-border bg-bg/60 p-5 backdrop-blur-md md:p-6 lg:mb-4">
            <p className="caption mb-3 text-text-muted">Opening night in</p>
            <Countdown />
            <p className="mt-6 text-text-muted">4일, 4개 스테이지, 60팀. 한강 한가운데 섬에서 열리는 도시의 소리 축제.</p>
            <a data-m="magnetic" data-cta href="#tickets" className="caption mt-6 inline-block bg-primary px-7 py-4 font-bold text-primary-fg">티켓 예매</a>
          </div>
        </div>
      </header>

      <main id="main">
        <div aria-hidden className="overflow-hidden border-y border-border bg-primary py-4 text-primary-fg">
          <div data-marquee="36" className="marquee font-display text-[28px] uppercase md:text-[40px]" style={{ "--dur": "36s" } as CSSProperties}>
            {[0, 1].map((k) => <span key={k} className="whitespace-nowrap pr-8">14—17 May 2027 ✶ Nodeul Island ✶ 4 Stages ✶ 60 Artists ✶ 14—17 May 2027 ✶ Nodeul Island ✶ 4 Stages ✶ 60 Artists ✶&nbsp;</span>)}
          </div>
        </div>

        <section id="lineup" aria-labelledby="lineup-h" className="py-24 md:py-32">
          <div className={`${wrap} flex flex-wrap items-end justify-between gap-4`}>
            <h2 id="lineup-h" data-m="blur-in" className="font-display text-h1 uppercase leading-none tracking-display">Lineup <span className="text-primary">Wave 1</span></h2>
            <p className="caption text-text-muted">← Scroll / drag →</p>
          </div>
          <ul tabIndex={0} aria-label="라인업 (가로 스크롤)" className="scroller mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:px-14">
            {LINEUP.map(([n, d, s, g]) => (
              <li key={n} className="w-[72vw] max-w-[340px] shrink-0 snap-start">
                <div data-m="reveal" className="poster flex aspect-[3/4] items-end p-5" style={{ "--g": g } as CSSProperties}>
                  <div className="relative z-10">
                    <p className="caption text-text/80">{d} · {s}</p>
                    <p className="mt-2 font-display text-[40px] uppercase leading-[0.9]">{n}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="stages" aria-labelledby="stages-h" className="border-y border-border bg-surface">
          <div className={`${wrap} py-24 md:py-32`}>
            <h2 id="stages-h" data-m="blur-in" className="font-display text-h1 uppercase leading-none tracking-display">Four stages</h2>
            <ul className="mt-12 grid border-t border-border md:grid-cols-4">
              {STAGES.map(([n, t, h]) => (
                <li key={t} data-m="blur-in" className="border-b border-border py-8 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                  <p className="font-display text-[80px] leading-none text-primary md:text-[120px]">{n}</p>
                  <h3 className="mt-4 font-display text-[28px] uppercase leading-none">{t}</h3>
                  <p className="caption mt-2 text-text-muted">{h}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tickets" aria-labelledby="tickets-h" className={`${wrap} py-24 md:py-32`}>
          <h2 id="tickets-h" data-m="blur-in" className="font-display text-h1 uppercase leading-none tracking-display">Tickets</h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {[["1-Day Pass", "₩ 99,000", "하루 · 전 스테이지", false, false], ["4-Day Pass", "₩ 279,000", "4일 · 전 스테이지 · 재입장", true, false], ["VIP 4-Day", "₩ 490,000", "라운지 · 전용 입장 · 굿즈", false, true]].map(([t, p, d, best, sold]) => (
              <li key={t as string} data-m="blur-in" className={`flex flex-col border p-8 ${best ? "border-primary" : "border-border"} ${sold ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-[32px] uppercase leading-none">{t}</h3>
                  {best && <span className="caption bg-primary px-2 py-1 text-primary-fg">Best</span>}
                </div>
                <p className="mt-2 text-text-muted">{d}</p>
                <p className="mt-10 font-display text-[44px] leading-none">{p}</p>
                {sold
                  ? <span className="caption mt-6 border border-border px-6 py-4 text-center text-text-muted" aria-disabled="true">Sold out</span>
                  : <a href={CTA} className={`caption mt-6 px-6 py-4 text-center font-bold ${best ? "bg-primary text-primary-fg" : "border border-text"}`}>예매하기</a>}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={`${wrap} caption grid gap-3 border-t border-border py-8 text-text-muted md:grid-cols-3`}>
        <span className="text-text">Seoul Sound Week 2027</span>
        <a href="mailto:tickets@example.com" className="normal-case tracking-normal">tickets@example.com</a>
        <span className="normal-case tracking-normal md:text-right">CineFlow Studio T12 시연용 가상 행사 · 아티스트는 가상</span>
      </footer>
      <MotionInit />
    </>
  );
}
