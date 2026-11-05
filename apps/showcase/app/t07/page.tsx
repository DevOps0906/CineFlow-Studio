// T07 LUMÉ — motions: M01 Blur-in, M03 Parallax, M06 Media reveal, M07 Magnetic CTA (+ liquid glass spotlight)
import MotionInit from "@/components/MotionInit";
import type { CSSProperties } from "react";
import Spotlight from "./Spotlight";

const CTA = "mailto:hello@example.com?subject=LUM%C3%89%20Collection";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-14";

const BLOBS = [
  { c: "#f3c9c0", s: 520, l: "8%", t: "10%", d: "19s", x: "60px", y: "40px" },
  { c: "#e8d9f2", s: 460, l: "58%", t: "4%", d: "23s", x: "-50px", y: "50px" },
  { c: "#fbe6cf", s: 420, l: "36%", t: "46%", d: "17s", x: "70px", y: "-40px" },
  { c: "#f6d5e0", s: 360, l: "72%", t: "52%", d: "21s", x: "-40px", y: "-50px" },
];

function Blobs() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {BLOBS.map((b, i) => (
        <span key={i} className="blob" style={{ background: b.c, width: b.s, height: b.s, left: b.l, top: b.t, "--d": b.d, "--x": b.x, "--y": b.y } as CSSProperties} />
      ))}
    </div>
  );
}

const PRODUCTS = [
  { n: "Pearl Drop", k: "이어링 · 14K 로즈골드", p: "₩ 480,000", r: <div className="relative mx-auto h-40 w-28"><div className="ring absolute left-1/2 top-0 h-12 w-12 -translate-x-1/2" /><div className="pearl absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2" /></div> },
  { n: "Halo Ring", k: "링 · 담수 진주", p: "₩ 620,000", r: <div className="relative mx-auto h-40 w-40"><div className="ring absolute inset-0" /><div className="pearl absolute left-1/2 top-[6%] h-12 w-12 -translate-x-1/2" /></div> },
  { n: "Liquid Pearl Serum", k: "세럼 · 30 ml", p: "₩ 128,000", r: <div className="bottle mx-auto mt-8 h-32 w-20" /> },
];

export default function Page() {
  return (
    <Spotlight>
      <header id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden">
        <Blobs />
        <nav aria-label="주 메뉴" className={`${wrap} caption flex w-full items-center justify-between pt-8 text-text-muted`}>
          <a href="#top" className="font-display text-2xl normal-case tracking-[0.06em] text-text">Lumé</a>
          <ul className="hidden gap-8 md:flex"><li><a className="hover:text-text" href="#collection">Collection</a></li><li><a className="hover:text-text" href="#ritual">Ritual</a></li><li><a className="hover:text-text" href="#pearl">Pearl</a></li></ul>
          <span>Bag (0)</span>
        </nav>
        <div className={`${wrap} relative flex w-full flex-1 flex-col items-center justify-center pb-16 pt-10 text-center`}>
          <p data-m="blur-in" className="caption text-text-muted">Liquid Pearl Collection · 2027</p>
          <h1 data-m="blur-in" className="mt-4 font-display text-display leading-[0.9] tracking-display">Lumé</h1>
          <div data-m="blur-in" className="glass -mt-[0.35em] w-full max-w-[440px] p-7 text-left md:-mt-[0.45em] md:p-9">
            <div className="flex items-center gap-6">
              <div className="pearl h-20 w-20 shrink-0 md:h-24 md:w-24" />
              <div>
                <p className="caption text-text-muted">New · Serum</p>
                <p className="mt-1 font-display text-3xl leading-tight">Liquid Pearl</p>
                <p className="text-sm text-text-muted">30 ml · ₩ 128,000</p>
              </div>
            </div>
            <p className="mt-6 text-text-muted">진주 펩타이드 3%가 빛을 머금은 피부 결을 만듭니다. 주얼리처럼 빛나는 스킨케어.</p>
            <a data-m="magnetic" data-cta href="#collection" className="caption mt-7 inline-block rounded-full bg-primary px-7 py-3.5 text-primary-fg">컬렉션 보기</a>
          </div>
        </div>
      </header>

      <main id="main">
        <section id="ritual" aria-labelledby="ritual-h" className={`${wrap} py-28 md:py-36`}>
          <p className="caption text-primary">Ritual</p>
          <h2 id="ritual-h" data-m="blur-in" className="mt-4 max-w-3xl font-display text-h1 leading-none tracking-display">Three steps to a pearl glow</h2>
          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {[["Cleanse", "부드러운 젤 클렌저로 결을 정돈합니다."], ["Glow", "리퀴드 펄 세럼 두 방울을 두드려 흡수시킵니다."], ["Seal", "펄 밤으로 광채를 오래 가두어 마무리합니다."]].map(([t, d], i) => (
              <li key={t} data-m="blur-in" className="relative overflow-hidden rounded-[28px] border border-border bg-surface p-8">
                <span className="caption text-text-muted">0{i + 1}</span>
                <h3 className="mt-8 font-display text-[40px] leading-none">{t}</h3>
                <p className="mt-3 text-text-muted">{d}</p>
                <div aria-hidden className="pearl absolute -right-8 -top-8 h-24 w-24 opacity-60" />
              </li>
            ))}
          </ol>
        </section>

        <section id="collection" aria-labelledby="col-h" className="relative isolate overflow-hidden py-28 md:py-36">
          <Blobs />
          <div className={wrap}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="col-h" data-m="blur-in" className="font-display text-h1 leading-none tracking-display">The Collection</h2>
              <span className="caption text-text-muted">03 pieces</span>
            </div>
            <ul className="mt-14 grid gap-5 md:grid-cols-3">
              {PRODUCTS.map((p) => (
                <li key={p.n} data-m="blur-in" className="glass p-8">
                  <div data-m="reveal" className="flex h-52 items-center justify-center">{p.r}</div>
                  <h3 className="mt-6 font-display text-[32px] leading-none">{p.n}</h3>
                  <p className="mt-2 text-sm text-text-muted">{p.k}</p>
                  <p className="caption mt-6 border-t border-white/60 pt-5">{p.p}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="pearl" aria-labelledby="pearl-h" className={`${wrap} grid gap-14 py-28 md:grid-cols-2 md:items-center md:py-40`}>
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div data-m="parallax" data-parallax="6" className="pearl absolute inset-[16%]" role="img" aria-label="진주 일러스트 (자체 제작)" />
            <div aria-hidden className="absolute inset-0">
              {[["Pearl peptide 3%", "left-1/2 top-0 -translate-x-1/2"], ["Squalane", "bottom-[12%] left-0"], ["Niacinamide", "bottom-[12%] right-0"]].map(([t, pos]) => (
                <span key={t} className={`caption glass absolute whitespace-nowrap rounded-full px-4 py-2 text-[10px] ${pos}`}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="caption text-primary">Inside the pearl</p>
            <h2 id="pearl-h" data-m="blur-in" className="mt-4 font-display text-h1 leading-none tracking-display">Light, held in a drop</h2>
            <p data-m="blur-in" className="mt-6 max-w-md text-text-muted">담수 진주에서 얻은 펩타이드와 식물성 스쿠알란, 나이아신아마이드. 세 가지 성분이 피부 위에 얇은 빛의 막을 남깁니다.</p>
            <ul className="mt-10 space-y-3">
              {[["Pearl peptide", "3%"], ["Squalane", "5%"], ["Niacinamide", "4%"]].map(([k, v]) => (
                <li key={k} className="flex justify-between border-b border-border pb-3"><span>{k}</span><span className="caption text-text-muted">{v}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="cta-h" className="relative isolate overflow-hidden px-6 py-32 md:py-44">
          <Blobs />
          <div className="glass mx-auto max-w-2xl p-10 text-center md:p-16">
            <h2 id="cta-h" data-m="blur-in" className="font-display text-h1 leading-none tracking-display">Find your glow</h2>
            <p className="mx-auto mt-5 max-w-sm text-text-muted">플래그십 라운지에서 진주 톤 상담과 피부 진단을 받아보세요.</p>
            <a data-m="magnetic" href={CTA} className="caption mt-9 inline-block rounded-full bg-primary px-8 py-4 text-primary-fg">상담 예약</a>
          </div>
        </section>
      </main>

      <footer className={`${wrap} caption grid gap-3 border-t border-border py-8 text-text-muted md:grid-cols-3`}>
        <span className="text-text">Lumé</span>
        <a href="mailto:hello@example.com" className="normal-case tracking-normal">hello@example.com</a>
        <span className="normal-case tracking-normal md:text-right">CineFlow Studio T07 시연용 가상 브랜드 · 제품 이미지는 CSS 렌더</span>
      </footer>
      <MotionInit />
    </Spotlight>
  );
}
