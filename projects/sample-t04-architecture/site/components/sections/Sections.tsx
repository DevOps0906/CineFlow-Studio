import ModelStage from "../three/ModelStage";
import { Light, Material, Structure } from "./Drawings";
import LightHero from "./LightHero";

const CTA_HREF = "mailto:studio@example.com?subject=STRATA%20Atelier%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%83%81%EB%8B%B4";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-14";

export function Hero() {
  return <LightHero ctaHref={CTA_HREF} />;
}

export function Proof() {
  const items = [["48", "Completed works"], ["7", "Design awards"], ["15 yrs", "In practice"]];
  return (
    <section aria-labelledby="proof-h" className="border-y border-border">
      <h2 id="proof-h" className="sr-only">사무소 수치 (샘플 데이터)</h2>
      <dl className="mx-auto grid max-w-[1440px] sm:grid-cols-3">
        {items.map(([n, l]) => (
          <div key={l} data-m="blur-in" className="border-b border-border px-6 py-12 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 md:px-14 md:py-16">
            <dt className="caption text-text-muted">{l}</dt>
            <dd className="mt-4 font-display text-h1 font-light leading-none tracking-display">{n}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Principles() {
  const items = [
    { t: "Structure", ko: "구조", d: "하중이 흐르는 길을 숨기지 않습니다. 정직한 구조가 공간의 형태가 됩니다.", V: Structure },
    { t: "Material", ko: "재료", d: "노출 콘크리트와 오크, 시간이 지날수록 깊어지는 재료만 씁니다.", V: Material },
    { t: "Light", ko: "빛", d: "시간대별 태양 각도를 계산해 빛이 들어오는 순간을 설계합니다.", V: Light },
  ];
  return (
    <section id="principles" aria-labelledby="principles-h" className={`${wrap} py-28 md:py-40`}>
      <div className="grid gap-6 border-b border-border pb-10 md:grid-cols-[1fr_2fr] md:items-end">
        <p className="caption text-primary">Principles</p>
        <h2 id="principles-h" data-m="blur-in" className="font-display text-h1 font-bold leading-[0.95] tracking-display">세 가지 원칙으로 짓습니다.</h2>
      </div>
      <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
        {items.map(({ t, ko, d, V }, i) => (
          <li key={t}>
            <div data-m="reveal" className="aspect-[4/5] overflow-hidden bg-surface">
              <div data-m="parallax" className="h-full w-full"><V /></div>
            </div>
            <p className="caption mt-7 text-primary">0{i + 1} · {ko}</p>
            <h3 className="mt-2 font-display text-[32px] font-semibold leading-none tracking-[-0.03em]">{t}</h3>
            <p className="mt-4 text-text-muted">{d}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

const STEPS = [
  ["Site", "땅의 경사와 바람, 햇빛을 읽는 것에서 시작합니다. 기초가 놓입니다."],
  ["Structure", "하중이 지나는 길을 따라 층이 쌓입니다. 구조가 곧 공간의 형태가 됩니다."],
  ["Light", "지붕이 덮이고 빛이 들어오면, 구조는 공간의 언어가 됩니다."],
] as const;

/** M04 Pinned story + M08 Model reveal. */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-h" data-m="pin" className="border-t border-border bg-surface md:min-h-svh">
      <div className={`${wrap} py-24 md:flex md:min-h-svh md:flex-col md:justify-center`}>
        <p className="caption text-primary">Process</p>
        <h2 id="process-h" className="mb-12 mt-5 font-display text-h1 font-bold leading-none tracking-display">대지에서 빛까지.</h2>
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-14">
          <ol className="order-2 space-y-10 md:order-1 md:space-y-8">
            {STEPS.map(([t, d], i) => (
              <li key={t} data-step={i} className="md:border-l md:pl-6">
                <p className="caption text-text-muted">0{i + 1}</p>
                <h3 className="mt-2 font-display text-[28px] font-semibold tracking-[-0.03em]">{t}</h3>
                <p className="mt-2 text-text-muted">{d}</p>
              </li>
            ))}
          </ol>
          <div className="order-1 md:order-2"><ModelStage /></div>
        </div>
      </div>
    </section>
  );
}

const WORKS = [
  ["01", "Slit House", "Seoul", "Residential", "2025"],
  ["02", "Basalt Pavilion", "Jeju", "Cultural", "2024"],
  ["03", "Quiet Office", "Busan", "Workplace", "2023"],
  ["04", "Courtyard Library", "Gyeongju", "Public", "2022"],
];

export function Works() {
  return (
    <section id="works" aria-labelledby="works-h" className={`${wrap} py-28 md:py-36`}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
        <h2 id="works-h" data-m="blur-in" className="font-display text-h1 font-bold leading-none tracking-display">Selected works</h2>
        <span className="caption text-text-muted">2022 — 2025</span>
      </div>
      <ul>
        {WORKS.map(([n, name, loc, type, y]) => (
          <li key={n} className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-border py-7 transition-colors duration-300 hover:text-primary md:grid-cols-[4rem_1.5fr_1fr_1fr_5rem]">
            <span className="caption text-text-muted">{n}</span>
            <span className="font-display text-[26px] font-semibold tracking-[-0.03em] md:text-[40px]">{name}</span>
            <span className="hidden text-text-muted md:block">{loc}</span>
            <span className="hidden text-text-muted md:block">{type}</span>
            <span className="text-right font-mono text-sm text-text-muted">{y}</span>
          </li>
        ))}
      </ul>
      <p className="caption mt-6 text-text-muted">※ 가상 프로젝트 목록 (샘플)</p>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="light-scene grain relative isolate overflow-hidden border-t border-border">
      <div aria-hidden className="light-beam -z-10" />
      <div className={`${wrap} py-32 md:py-44`}>
        <p className="caption text-primary">Contact</p>
        <h2 id="contact-h" data-m="blur-in" className="mt-6 font-display text-display font-bold leading-[0.85] tracking-display">
          LET&apos;S<span className="outline-text block">BUILD</span>
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-end">
          <p className="max-w-md text-text-muted">
            <strong className="mb-3 block text-[22px] font-semibold text-text">당신의 대지를 이야기해 주세요.</strong>
            첫 상담에서 대지와 예산, 일정을 함께 검토합니다.
          </p>
          <a href={CTA_HREF} className="caption justify-self-start border-b border-primary py-3 text-primary md:justify-self-end">프로젝트 상담 →</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className={`${wrap} caption grid gap-4 border-t border-border py-10 text-text-muted md:grid-cols-3`}>
      <span className="font-display text-[15px] font-bold normal-case tracking-[0.02em] text-text">STRATA</span>
      <a href="mailto:studio@example.com" className="normal-case tracking-normal hover:text-text">studio@example.com</a>
      <span className="normal-case tracking-normal md:text-right">CineFlow Studio T04 시연용 가상 사무소 · 모든 시각 요소와 3D 모델은 자체 제작</span>
    </footer>
  );
}
