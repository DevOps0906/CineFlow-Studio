// T08 VELOCE E1 — motions: M01 Blur-in, M03 Parallax, M05 Seamless video loop slot (HeroVideo), scroll scrub (Video scrub recipe)
import MotionInit from "@/components/MotionInit";
import Car from "./Car";
import { Configurator, DriveHud, HeroVideo } from "./Interactive";

const CTA = "mailto:drive@example.com?subject=VELOCE%20E1%20Test%20drive";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-14";

export default function Page() {
  return (
    <>
      <header id="top" className="grain relative isolate flex min-h-svh flex-col overflow-hidden">
        <HeroVideo />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_500px_at_50%_100%,rgba(255,90,31,.18),transparent_60%),linear-gradient(180deg,#0c0d0f,#15171a)]" />
        <nav aria-label="주 메뉴" className={`${wrap} caption flex w-full items-center justify-between pt-7 text-text-muted`}>
          <a href="#top" className="font-display text-xl font-extrabold normal-case tracking-[0.08em] text-text">VELOCE</a>
          <ul className="hidden gap-8 md:flex"><li><a className="hover:text-text" href="#drive">Performance</a></li><li><a className="hover:text-text" href="#specs">Specs</a></li><li><a className="hover:text-text" href="#design">Design</a></li></ul>
          <a href={CTA} className="text-primary">Test drive</a>
        </nav>
        <div className={`${wrap} w-full pt-10 md:pt-14`}>
          <p data-m="blur-in" className="caption text-primary">All-electric grand tourer · 2027</p>
          <h1 data-m="blur-in" className="mt-3 font-display text-display font-light uppercase leading-[0.82] tracking-display">
            Veloce <span className="font-extrabold text-primary">E1</span>
          </h1>
          <p data-m="blur-in" className="mt-5 max-w-md text-text-muted">760마력 듀얼 모터, 612km 주행거리. 장거리를 위해 태어난 전기 그랜드 투어러.</p>
          <div data-m="blur-in" className="mt-8 flex flex-wrap gap-3">
            <a data-cta href={CTA} className="caption bg-primary px-7 py-4 font-semibold text-primary-fg">시승 예약</a>
            <a href="#design" className="caption border border-border px-7 py-4 hover:border-text">구성하기</a>
          </div>
        </div>
        <div className="relative mt-auto w-full px-4 pb-6 md:px-10">
          <div aria-hidden className="absolute bottom-[18%] right-[8%] h-24 w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.18),transparent)] blur-xl" />
          <div data-m="parallax" data-parallax="3"><Car className="mx-auto block w-full max-w-[1200px]" /></div>
          <div className="road mx-auto mt-2 max-w-[1300px] opacity-40" />
        </div>
      </header>

      <main id="main">
        <section id="drive" aria-labelledby="drive-h" data-m="scrub" className="drive relative h-[300svh] border-t border-border">
          <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden py-16">
            <div className={`${wrap} w-full`}>
              <p className="caption text-primary">Performance</p>
              <h2 id="drive-h" className="mt-3 font-display text-h1 font-semibold uppercase leading-none tracking-display">Built for the long straight</h2>
            </div>
            <div className="relative">
              <div aria-hidden className="streak absolute inset-y-0 left-0 w-[200%]">
                {[18, 34, 52, 70, 86].map((t, i) => <span key={t} className="absolute h-px bg-gradient-to-r from-transparent via-text/40 to-transparent" style={{ top: `${t}%`, left: `${i * 17}%`, width: "40%" }} />)}
              </div>
              <div className="rig relative px-4">
                <div aria-hidden className="glow absolute right-[6%] top-[52%] h-10 w-40 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,.5),transparent)] blur-md" />
                <Car className="mx-auto block w-full max-w-[1000px]" />
              </div>
              <div className="road mx-auto mt-1 max-w-[1400px] opacity-50" />
            </div>
            <div className={`${wrap} w-full`}><DriveHud /></div>
          </div>
        </section>

        <section id="specs" aria-labelledby="specs-h" className={`${wrap} py-28 md:py-36`}>
          <h2 id="specs-h" className="caption text-primary">Specifications</h2>
          <dl className="mt-10 grid grid-cols-2 border-t border-border md:grid-cols-4">
            {[["0—100 km/h", "2.9", 1, "s"], ["Range", "612", 0, "km"], ["Charge 10—80%", "18", 0, "min"], ["Power", "760", 0, "hp"]].map(([k, v, dec, u]) => (
              <div key={k as string} data-m="blur-in" className="border-b border-border py-10 pr-6 md:border-b-0 md:border-r md:last:border-r-0 md:[&:not(:first-child)]:pl-8">
                <dt className="caption text-text-muted">{k}</dt>
                <dd className="mt-3 font-display text-[64px] font-semibold leading-none md:text-[88px]"><span data-count={v} data-decimals={dec}>{v}</span><span className="ml-2 text-2xl font-light text-text-muted">{u}</span></dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="design" aria-labelledby="design-h" className="border-y border-border bg-surface">
          <div className={`${wrap} py-28 md:py-36`}>
            <p className="caption text-primary">Configure</p>
            <h2 id="design-h" data-m="blur-in" className="mb-12 mt-3 font-display text-h1 font-semibold uppercase leading-none tracking-display">Make it yours</h2>
            <Configurator />
          </div>
        </section>

        <section aria-labelledby="cta-h" className="px-6 py-32 text-center md:py-44">
          <p className="caption text-primary">Seoul · Busan · Jeju</p>
          <h2 id="cta-h" data-m="blur-in" className="mt-4 font-display text-display font-light uppercase leading-[0.85] tracking-display">Feel <span className="font-extrabold text-primary">2.9s</span></h2>
          <a href={CTA} className="caption mt-12 inline-block bg-primary px-8 py-4 font-semibold text-primary-fg">시승 예약</a>
        </section>
      </main>

      <footer className={`${wrap} caption grid gap-3 border-t border-border py-8 text-text-muted md:grid-cols-3`}>
        <span className="text-text">VELOCE</span>
        <a href="mailto:drive@example.com" className="normal-case tracking-normal">drive@example.com</a>
        <span className="normal-case tracking-normal md:text-right">CineFlow Studio T08 시연용 가상 차량 · 제원은 샘플</span>
      </footer>
      <MotionInit />
    </>
  );
}
