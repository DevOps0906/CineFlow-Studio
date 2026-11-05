// T09 HANA SEO — motions: M01 Blur-in, M02 Split reveal (masked lines), M03 Parallax, M06 Media reveal
import MotionInit from "@/components/MotionInit";
import SplitText from "@/components/SplitText";
import ProjectIndex from "./ProjectIndex";

const MAIL = "mailto:hana@example.com?subject=Project%20inquiry";
const wrap = "mx-auto max-w-[1440px] px-6 md:px-12";

export default function Page() {
  return (
    <>
      <header id="top" className="relative flex min-h-svh flex-col">
        <nav aria-label="주 메뉴" className={`${wrap} caption flex w-full items-center justify-between pt-7`}>
          <a href="#top">Hana Seo</a>
          <ul className="hidden gap-8 md:flex"><li><a className="hover:text-primary" href="#index">Index</a></li><li><a className="hover:text-primary" href="#about">About</a></li><li><a className="hover:text-primary" href="#contact">Contact</a></li></ul>
          <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-primary" />Available 01.2027</span>
        </nav>
        <h1 className={`${wrap} w-full flex-1 content-center pt-12 font-display text-display font-extrabold uppercase leading-[0.84] tracking-display`}>
          <span className="mask"><SplitText text="Hana" /></span>
          <span className="mask pl-[0.6em] text-primary"><SplitText text="Seo" /></span>
        </h1>
        <div className={`${wrap} grid w-full gap-6 border-t border-text py-8 md:grid-cols-3`}>
          <p data-m="blur-in" className="max-w-xs">Designer & Art Director based in Seoul. Identity, interface and type.</p>
          <p data-m="blur-in" className="max-w-xs text-text-muted">천천히, 의도적으로 움직이는 브랜드를 위한 아이덴티티와 인터페이스를 만듭니다.</p>
          <a data-cta href="#index" className="caption self-end md:text-right">(Scroll) ↓ Selected index</a>
        </div>
      </header>

      <main id="main">
        <section id="about" aria-labelledby="about-h" className={`${wrap} py-28 md:py-40`}>
          <h2 id="about-h" className="caption text-primary">About</h2>
          <p data-m="blur-in" className="mt-8 max-w-[1100px] font-display text-h2 font-medium leading-[1.15] tracking-[-0.02em]">
            I make identities and interfaces for brands that move slowly and deliberately — <span className="text-primary">tea houses, record labels, quiet banks.</span>
          </p>
          <dl className="caption mt-16 grid gap-6 border-t border-text pt-6 sm:grid-cols-3">
            <div><dt className="text-text-muted">Clients</dt><dd className="mt-2 normal-case tracking-normal">Ondo · Mute · Kiln · Lattice</dd></div>
            <div><dt className="text-text-muted">Recognition</dt><dd className="mt-2 normal-case tracking-normal">Type Directors Club ’25 · Red Dot ’24</dd></div>
            <div><dt className="text-text-muted">Practice</dt><dd className="mt-2 normal-case tracking-normal">11 years · Seoul / remote</dd></div>
          </dl>
        </section>

        <section id="index" aria-labelledby="index-h" className={`${wrap} pb-28 md:pb-40`}>
          <div className="flex items-end justify-between border-b border-text pb-4">
            <h2 id="index-h" className="font-display text-h1 font-extrabold uppercase leading-none tracking-display">Index</h2>
            <span className="caption">06 projects</span>
          </div>
          <ProjectIndex />
        </section>

        <section aria-labelledby="cases-h" className={`${wrap} pb-28 md:pb-40`}>
          <h2 id="cases-h" className="caption text-primary">Selected cases</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-[1.3fr_1fr]">
            {[["cv-1", "Ondo Tea House", "새벽 차밭의 온도를 색으로 옮긴 아이덴티티", "aspect-[4/5]"], ["cv-2", "Field Notes OS", "연구자를 위한 노트 앱의 인터페이스 시스템", "aspect-[4/5] md:mt-40"]].map(([cv, t, d, a]) => (
              <figure key={t}>
                <div data-m="reveal" className={`overflow-hidden ${a}`}><div data-m="parallax" data-parallax="5" className={`cover ${cv} h-[112%] w-full`} role="img" aria-label={`${t} 커버 (자체 제작 그래픽)`} /></div>
                <figcaption className="mt-4 flex justify-between gap-4"><span className="font-display text-2xl font-bold">{t}</span><span className="max-w-[16rem] text-right text-sm text-text-muted">{d}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section aria-labelledby="services-h" className="border-y border-text">
          <div className={`${wrap} grid gap-10 py-20 md:grid-cols-4`}>
            <h2 id="services-h" className="caption text-primary">Services</h2>
            {[["Identity", "로고, 타입, 시스템"], ["Digital", "웹, 앱, 인터랙션"], ["Direction", "캠페인, 촬영, 모션"]].map(([t, d]) => (
              <div key={t}><h3 className="font-display text-[32px] font-bold leading-none">{t}</h3><p className="mt-2 text-text-muted">{d}</p></div>
            ))}
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-h" className={`${wrap} py-28 md:py-40`}>
          <p className="caption">New projects from January 2027</p>
          <h2 id="contact-h" className="mt-6 font-display text-display font-extrabold uppercase leading-[0.84] tracking-display">
            <a href={MAIL} className="text-primary transition-opacity hover:opacity-80"><span className="mask"><SplitText text="Let's" /></span><span className="mask"><SplitText text="talk." /></span></a>
          </h2>
          <a href={MAIL} className="caption mt-10 inline-block border-b border-text pb-1">hana@example.com</a>
        </section>
      </main>

      <footer className={`${wrap} caption grid gap-3 border-t border-text py-8 text-text-muted md:grid-cols-3`}>
        <span className="text-text">Hana Seo © 2026</span>
        <span>Instagram · Are.na · Read.cv</span>
        <span className="normal-case tracking-normal md:text-right">CineFlow Studio T09 시연용 가상 인물 · 작업물은 자체 제작 그래픽</span>
      </footer>
      <MotionInit />
    </>
  );
}
