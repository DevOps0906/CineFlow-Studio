// T02 MAISON ÉCRU — motions: M01 Blur-in, M02 Split reveal, M03 Parallax, M06 Media reveal
import MotionInit from "@/components/MotionInit";
import type { CSSProperties } from "react";
import SplitText from "@/components/SplitText";

const CTA = "mailto:atelier@example.com?subject=MAISON%20%C3%89CRU%20Private%20viewing";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-14";

type Look = { n: string; name: string; mat: string; a: string; b: string; g: "coat" | "dress" | "shirt" | "trouser" };
const LOOKS: Look[] = [
  { n: "01", name: "Raw Linen Coat", mat: "리넨 100% · 무염색", a: "#dcd2c0", b: "#bfb29b", g: "coat" },
  { n: "02", name: "Undyed Silk Dress", mat: "실크 100% · 무염색", a: "#f1ebdf", b: "#d6cbb7", g: "dress" },
  { n: "03", name: "Poplin Shirt", mat: "코튼 포플린", a: "#f8f5ef", b: "#e0d9cb", g: "shirt" },
  { n: "04", name: "Wool Trouser", mat: "울 트윌 · 차콜", a: "#2c2a27", b: "#151413", g: "trouser" },
  { n: "05", name: "Madder Red Coat", mat: "꼭두서니 식물 염색", a: "#b3261e", b: "#7a1812", g: "coat" },
  { n: "06", name: "Hemp Shirt Dress", mat: "헴프 · 내추럴", a: "#cbbfa8", b: "#a89b83", g: "dress" },
];

function Garment({ look, className = "" }: { look: Look; className?: string }) {
  return (
    <div className={`relative aspect-[3/4] overflow-hidden bg-surface ${className}`}>
      <svg aria-hidden viewBox="0 0 100 20" className="absolute left-1/2 top-[3%] w-[34%] -translate-x-1/2 text-text/50">
        <path d="M50 2v4M50 6 10 18h80Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className={`garment fabric g-${look.g}`} style={{ "--a": look.a, "--b": look.b } as CSSProperties} />
    </div>
  );
}

export default function Page() {
  return (
    <>
      <header id="top" className="grain relative overflow-hidden">
        <nav aria-label="주 메뉴" className={`${wrap} caption relative z-10 flex items-center justify-between border-b border-border py-6`}>
          <a href="#top" className="font-medium">Maison Écru</a>
          <span className="hidden text-text-muted md:inline">SS27 — Collection 04</span>
          <ul className="flex gap-6 md:gap-8">
            <li><a href="#lookbook" className="hover:text-primary">Lookbook</a></li>
            <li className="hidden sm:block"><a href="#atelier" className="hover:text-primary">Atelier</a></li>
            <li><a href="#viewing" className="hover:text-primary">Viewing</a></li>
          </ul>
        </nav>
        <div className={`${wrap} relative z-10 grid gap-10 pb-14 pt-10 md:grid-cols-12 md:gap-8 md:pb-20 md:pt-16`}>
          <div className="md:col-span-8">
            <p data-m="blur-in" className="caption text-primary">Spring Summer 2027 · Paris / Seoul</p>
            <h1 className="mt-6 font-display tracking-display">
              <span data-m="blur-in" className="block text-h1 italic leading-none">Maison</span>
              <span data-m="blur-in" className="block pt-[0.2em] text-display leading-[0.86]">ÉCRU</span>
            </h1>
            <p className="mt-8 font-display text-h2 italic leading-tight"><SplitText text="Undyed. Unhurried. Unseasonal." /></p>
            <p data-m="blur-in" className="mt-5 max-w-md text-text-muted">염색하지 않은 실과 천천히 짠 원단. 계절이 지나도 남는 옷을 만듭니다.</p>
            <div data-m="blur-in" className="mt-9 flex flex-wrap items-center gap-6">
              <a data-cta href="#lookbook" className="caption bg-text px-7 py-4 text-bg transition-colors hover:bg-primary hover:text-primary-fg">룩북 보기</a>
              <a href={CTA} className="caption border-b border-text py-2 hover:border-primary hover:text-primary">프라이빗 뷰잉</a>
            </div>
          </div>
          <figure className="md:col-span-4 md:self-end">
            <div data-m="parallax" data-parallax="5"><Garment look={LOOKS[0]} /></div>
            <figcaption className="caption mt-4 flex justify-between text-text-muted"><span>Look 01</span><span>Raw Linen Coat</span></figcaption>
          </figure>
        </div>
      </header>

      <main id="main">
        <div aria-hidden className="overflow-hidden bg-text py-5 text-bg">
          <div className="marquee font-display text-[32px] italic md:text-[44px]" style={{ "--dur": "48s" } as CSSProperties}>
            {[0, 1].map((k) => <span key={k} className="whitespace-nowrap pr-10">Spring Summer 2027 ✶ Raw linen ✶ Undyed silk ✶ Plant-dyed madder ✶ Made in Seoul ✶ Spring Summer 2027 ✶ Raw linen ✶ Undyed silk ✶ Plant-dyed madder ✶ Made in Seoul ✶&nbsp;</span>)}
          </div>
        </div>

        <section aria-labelledby="manifesto-h" className={`${wrap} grid gap-10 py-28 md:grid-cols-12 md:py-40`}>
          <p className="caption text-primary md:col-span-3">Manifesto</p>
          <div className="md:col-span-9">
            <h2 id="manifesto-h" data-m="blur-in" className="font-display text-h1 italic leading-[1.02] tracking-display">“We do not dye.<br />We wait for the fibre.”</h2>
            <p data-m="blur-in" className="mt-8 max-w-xl text-text-muted">우리는 실을 물들이지 않습니다. 원단이 가진 본래의 색을 기다립니다. 유일한 예외는 뿌리에서 얻은 꼭두서니 붉은색입니다.</p>
            <dl className="mt-16 grid grid-cols-3 border-t border-text">
              {[["24", "Looks"], ["3", "Fibres"], ["0", "Synthetic dyes"]].map(([n, l]) => (
                <div key={l} data-m="blur-in" className="pt-6">
                  <dd className="font-display text-[44px] leading-none md:text-[72px]">{n}</dd>
                  <dt className="caption mt-3 text-text-muted">{l}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="lookbook" aria-labelledby="lookbook-h" className={`${wrap} pb-28 md:pb-48`}>
          <div className="flex items-end justify-between border-b border-text pb-6">
            <h2 id="lookbook-h" className="font-display text-h1 italic leading-none tracking-display">Lookbook</h2>
            <span className="caption text-text-muted">06 / 24 looks</span>
          </div>
          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 md:[&>li:nth-child(3n+2)]:translate-y-24">
            {LOOKS.map((l) => (
              <li key={l.n}>
                <figure>
                  <div data-m="reveal"><Garment look={l} /></div>
                  <figcaption className="mt-5">
                    <p className="caption text-text-muted">Look {l.n}</p>
                    <p className="mt-1 font-display text-[26px] italic leading-tight">{l.name}</p>
                    <p className="text-sm text-text-muted">{l.mat}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        <section id="atelier" aria-labelledby="atelier-h" className="border-y border-border bg-surface">
          <div className={`${wrap} grid gap-14 py-28 md:grid-cols-2 md:items-center md:py-36`}>
            <div>
              <p className="caption text-primary">Atelier</p>
              <h2 id="atelier-h" data-m="blur-in" className="mt-5 font-display text-h1 italic leading-none tracking-display">Four slow hands</h2>
              <ol className="mt-12 border-t border-text">
                {[["Weave", "직기에서 하루 12미터만 짭니다."], ["Cut", "패턴은 한 장씩 손으로 재단합니다."], ["Stitch", "인치당 12땀, 보이지 않는 솔기."], ["Finish", "세탁 후 자연 건조로 결을 남깁니다."]].map(([t, d], i) => (
                  <li key={t} data-m="blur-in" className="grid grid-cols-[3rem_1fr] gap-4 border-b border-border py-6 md:grid-cols-[4rem_10rem_1fr]">
                    <span className="caption pt-2 text-text-muted">0{i + 1}</span>
                    <span className="font-display text-[28px] italic leading-none">{t}</span>
                    <span className="col-start-2 text-text-muted md:col-start-auto">{d}</span>
                  </li>
                ))}
              </ol>
            </div>
            <figure>
              <div data-m="reveal" className="fabric aspect-[4/5]" style={{ "--a": "#d8cdb8", "--b": "#b9ab92" } as CSSProperties} role="img" aria-label="리넨 원단 스와치 (자체 제작 일러스트)" />
              <figcaption className="caption mt-4 text-text-muted">Swatch 04 — Raw linen, 280 g/m²</figcaption>
            </figure>
          </div>
        </section>

        <section id="viewing" aria-labelledby="viewing-h" className={`${wrap} py-32 text-center md:py-48`}>
          <p className="caption text-primary">Private viewing · Seongsu, Seoul</p>
          <h2 id="viewing-h" data-m="blur-in" className="mx-auto mt-6 max-w-5xl font-display text-h1 italic leading-[0.95] tracking-display">By appointment, never by season.</h2>
          <a href={CTA} className="caption mt-12 inline-block bg-primary px-8 py-4 text-primary-fg transition-opacity hover:opacity-90">프라이빗 뷰잉 예약</a>
        </section>
      </main>

      <footer className={`${wrap} caption grid gap-3 border-t border-text py-8 text-text-muted md:grid-cols-3`}>
        <span className="text-text">Maison Écru</span>
        <a href="mailto:atelier@example.com" className="normal-case tracking-normal">atelier@example.com</a>
        <span className="normal-case tracking-normal md:text-right">CineFlow Studio T02 시연용 가상 브랜드 · 모든 시각 요소 자체 제작</span>
      </footer>
      <MotionInit />
    </>
  );
}
