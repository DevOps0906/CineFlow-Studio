import Dial from "./Dial";
import HeroTitle from "@/components/HeroTitle";
import Media from "./Media";
import { Finishing, Movement, Sapphire } from "./Visuals";

const CTA_HREF = "mailto:concierge@example.com?subject=AURUM%20Noir%20%EC%BB%AC%EB%A0%89%EC%85%98%20%EB%AC%B8%EC%9D%98";
const pill = "inline-flex items-center rounded-full bg-ivory px-8 py-4 text-[15px] font-semibold text-ivory-fg transition-colors duration-500 hover:bg-primary";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-16";

const SPECS = [["Power reserve", "72 h"], ["Components", "1,200"], ["Warranty", "10 yrs"]];

export function Hero() {
  return (
    <header id="top" data-hero className="grain relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_700px_at_72%_45%,#1c2647_0%,#0b1020_62%)]" />
      <div aria-hidden className="hero-spot absolute inset-0 -z-10" />
      <div aria-hidden data-hero-depth="-0.3" className="absolute left-[64%] top-[46%] -z-10 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,138,90,.18),transparent_60%)] blur-xl" />

      <nav aria-label="주 메뉴" className={`${wrap} caption relative z-10 flex items-center justify-between pt-8 text-text-muted`}>
        <a href="#top" className="font-medium text-text">Aurum Noir</a>
        <ul className="hidden gap-10 md:flex">
          <li><a className="transition-colors hover:text-text" href="#anatomy">Anatomy</a></li>
          <li><a className="transition-colors hover:text-text" href="#film">Film</a></li>
          <li><a className="transition-colors hover:text-text" href="#appointment">Concierge</a></li>
        </ul>
      </nav>

      <div className={`${wrap} relative z-10 grid gap-14 pb-12 pt-12 lg:min-h-[calc(100svh-64px)] lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-8 lg:pb-28 lg:pt-0`}>
        <div className="order-2 lg:order-1" data-hero-out="0.5">
          <p data-hero-fade className="caption text-primary">Calibre 01 — Manufacture 2026</p>
          <HeroTitle className="mt-6 font-display text-display italic leading-[0.86] tracking-display" parts={[{ t: "The weight", br: true }, { t: "of" }, { t: "time", className: "not-italic text-primary" }]} />
          <p data-hero-fade className="mt-8 max-w-[440px] text-text-muted">1,200개의 부품, 320시간의 손길. 가장 조용한 정밀함이 손목 위에서 완성됩니다.</p>
          <div data-hero-fade className="mt-11 flex flex-wrap items-center gap-7">
            <a data-m="magnetic" data-cta href={CTA_HREF} className={pill}>컬렉션 문의하기</a>
            <span className="caption hidden text-text-muted sm:inline">↓ Scroll to unveil</span>
          </div>
        </div>
        <div data-hero-depth="0.45" className="order-1 mx-auto w-[min(82vw,560px)] lg:order-2 lg:w-[min(560px,62svh)]"><div data-hero-visual="scale"><Dial /></div></div>
      </div>

      <dl data-hero-fade className={`${wrap} relative z-10 grid grid-cols-3 gap-4 border-t border-border py-8 lg:absolute lg:bottom-12 lg:right-0 lg:mx-0 lg:flex lg:gap-12 lg:border-0 lg:py-0`}>
        {SPECS.map(([k, v]) => (
          <div key={k}>
            <dt className="caption text-[10px] tracking-[0.12em] text-text-muted md:text-[11px] md:tracking-[0.24em]">{k}</dt>
            <dd className="mt-2 font-display text-[28px] italic leading-none md:text-[34px]">{v}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

export function Manifesto() {
  const facts = [["320 h", "한 점당 제작 시간"], ["7 layers", "반사 방지 코팅"], ["±2 s", "일일 오차"]];
  return (
    <section aria-labelledby="manifesto-h" className={`${wrap} py-28 md:py-40`}>
      <p className="caption text-primary">Manifesto</p>
      <h2 id="manifesto-h" data-m="blur-in" className="mt-8 max-w-[1150px] font-display text-h1 leading-[1.02] tracking-display">
        Every component is finished by hand — <em className="text-primary">then finished again.</em>
      </h2>
      <p data-m="blur-in" className="mt-8 max-w-xl text-text-muted">모든 부품은 손으로 마감되고, 다시 한 번 마감됩니다. 보이지 않는 면까지 같은 기준으로 다듬는 것이 AURUM Noir의 방식입니다.</p>
      <dl className="mt-20 grid border-t border-border sm:grid-cols-3">
        {facts.map(([n, l]) => (
          <div key={l} data-m="blur-in" className="border-b border-border py-10 sm:border-b-0 sm:border-r sm:pr-8 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-8">
            <dt className="caption text-text-muted">{l}</dt>
            <dd className="mt-4 font-display text-[56px] italic leading-none md:text-[72px]">{n}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Anatomy() {
  const parts = [
    { n: "01", en: "Sapphire", ko: "사파이어 크리스털", d: "돔형 사파이어 글라스에 7겹의 반사 방지 코팅. 어떤 각도에서도 다이얼이 선명합니다.", V: Sapphire },
    { n: "02", en: "Movement", ko: "칼리버 01", d: "자체 개발 무브먼트, 72시간 파워리저브. 1,200개의 부품이 하나의 리듬으로 움직입니다.", V: Movement },
    { n: "03", en: "Finishing", ko: "코트 드 제네브", d: "브리지마다 손으로 새긴 물결 무늬. 보이지 않는 면까지 같은 기준으로 마감합니다.", V: Finishing },
  ];
  return (
    <section id="anatomy" aria-labelledby="anatomy-h" className={`${wrap} pb-28 md:pb-40`}>
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-10">
        <h2 id="anatomy-h" data-m="blur-in" className="font-display text-h1 italic leading-none tracking-display">Anatomy</h2>
        <p className="max-w-sm text-text-muted">세 가지 원칙이 하나의 시계를 만듭니다.</p>
      </div>
      <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
        {parts.map(({ n, en, ko, d, V }) => (
          <li key={n}>
            <div data-m="reveal" className="relative aspect-[4/5] overflow-hidden bg-surface">
              <span className="caption absolute left-5 top-5 z-10 text-text-muted">{n}</span>
              <V />
            </div>
            <h3 className="mt-7 font-display text-[36px] italic leading-none">{en}</h3>
            <p className="caption mt-3 text-primary">{ko}</p>
            <p className="mt-4 text-text-muted">{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Film() {
  return (
    <section id="film" aria-labelledby="film-h" className="px-6 md:px-16">
      <h2 id="film-h" className="sr-only">제품 필름</h2>
      <div data-m="reveal" className="grain relative mx-auto aspect-[4/5] max-w-[1440px] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]">
        <Media />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
        <div className="caption absolute inset-x-6 bottom-6 z-10 flex justify-between gap-4 text-text md:inset-x-10 md:bottom-9">
          <span>Calibre 01 · 42 mm · Midnight Ivory</span>
          <span className="hidden text-text-muted sm:inline">Film 00:42</span>
        </div>
      </div>
    </section>
  );
}

export function Appointment() {
  return (
    <section id="appointment" aria-labelledby="cta-h" className="grain relative isolate overflow-hidden px-6 py-32 text-center md:py-48">
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,138,90,.16),transparent_60%)] blur-xl" />
      <p className="caption text-primary">Private appointment</p>
      <h2 id="cta-h" data-m="blur-in" className="mt-8 font-display text-display italic leading-[0.9] tracking-display">Reserve<br />your hour.</h2>
      <p data-m="blur-in" className="mx-auto mt-8 max-w-md text-text-muted">컨시어지가 부티크 방문과 컬렉션 상담 일정을 안내해 드립니다.</p>
      <a data-m="magnetic" href={CTA_HREF} className={`${pill} mt-12`}>컬렉션 문의하기</a>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={`${wrap} caption grid gap-4 border-t border-border py-10 text-[11px] text-text-muted md:grid-cols-3`}>
      <span className="text-text">Aurum Noir</span>
      <a href="mailto:concierge@example.com" className="normal-case tracking-normal hover:text-text">concierge@example.com</a>
      <span className="normal-case tracking-normal md:text-right">CineFlow Studio T01 시연용 가상 브랜드 · 모든 시각 요소는 자체 제작</span>
    </footer>
  );
}
