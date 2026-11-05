"use client";
import gsap from "gsap";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import HeroTitle from "@/components/HeroTitle";

const TARGET = 16 + 40 / 60; // 16:40

function fmt(h: number) {
  const m = Math.round(h * 60);
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function lightVars(h: number) {
  const k = (h - 6) / 12;
  const sun = Math.sin(Math.PI * k);
  return { k, sun, css: { "--beam": `${70 + k * 90}deg`, "--glow": (0.35 + 0.65 * sun).toFixed(3), "--warm": (1 - sun).toFixed(3), "--cast": `${((k - 0.5) * -70).toFixed(1)}deg` } };
}

/**
 * Signature hero: a time-of-day slider drives the light study scene through CSS variables
 * (beam angle, intensity, warmth, cast shadow). With motion allowed, the light sweeps 12:00 → 16:40 once on load.
 */
export default function LightHero({ ctaHref }: { ctaHref: string }) {
  const [hour, setHour] = useState(TARGET);
  const touched = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // GSAP intro: the light sweeps 12:00 → 16:40. It writes CSS variables / DOM directly (no React re-render per frame)
    // and hands over to React state once, at the end or as soon as the visitor touches the slider.
    const proxy = { h: 12 };
    const paint = () => {
      const { k, css } = lightVars(proxy.h);
      const el = headerRef.current;
      if (!el) return;
      Object.entries(css).forEach(([p, v]) => el.style.setProperty(p, v));
      el.dataset.hour = proxy.h.toFixed(2);
      if (inputRef.current) { inputRef.current.value = String(proxy.h); inputRef.current.style.setProperty("--pct", `${k * 100}%`); }
      if (timeRef.current) timeRef.current.textContent = fmt(proxy.h);
    };
    paint();
    const tween = gsap.to(proxy, { h: TARGET, duration: 2, ease: "power3.out", delay: 0.2,
      onUpdate: () => { if (touched.current) tween.kill(); else paint(); },
      onComplete: () => setHour(TARGET) });
    return () => { tween.kill(); };
  }, []);

  const { k, sun, css } = lightVars(hour);
  const vars = css as CSSProperties;

  return (
    <header ref={headerRef} id="top" data-hero data-hour={hour.toFixed(2)} style={vars} className="light-scene grain relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="scene-wall" />
        <div data-hero-depth="-0.25" className="absolute inset-0"><div className="light-beam" /></div>
        <div className="scene-floor" />
        <div data-hero-depth="0.3" className="absolute inset-0"><div data-hero-visual="rise" className="absolute inset-0"><div className="scene-slab" /><div className="scene-slit" /></div></div>
        <div className="scene-cast" />
      </div>

      <nav aria-label="주 메뉴" className="caption relative z-10 flex items-center justify-between px-6 pt-8 text-text-muted md:px-14">
        <a href="#top" className="font-display text-[15px] font-bold normal-case tracking-[0.02em] text-text">STRATA</a>
        <ul className="hidden gap-8 md:flex">
          <li><a className="hover:text-text" href="#principles">Principles</a></li>
          <li><a className="hover:text-text" href="#process">Process</a></li>
          <li><a className="hover:text-text" href="#works">Works</a></li>
          <li><a className="hover:text-text" href="#contact">Contact</a></li>
        </ul>
      </nav>

      <div data-hero-out="0.6" className="relative z-10">
        <HeroTitle className="px-5 pt-8 font-display text-display font-bold leading-[0.82] tracking-display md:px-12 md:pt-12" parts={[{ t: "LIGHT", className: "block" }, { t: "STUDY", className: "outline-text block" }]} />
      </div>

      <div aria-hidden data-hero-fade className="caption absolute right-14 top-[110px] z-10 hidden space-y-3 text-right text-text-muted lg:block">
        <p className="anno">N 37°34′ · E 126°58′</p>
        <p className="anno">Sun altitude {Math.round(sun * 62)}° · azimuth {Math.round(90 + k * 180)}°</p>
      </div>

      <div className="relative z-10 mt-auto grid gap-10 bg-gradient-to-t from-bg via-bg/85 to-transparent px-6 pb-12 pt-28 md:grid-cols-2 md:items-end md:bg-none md:px-14 md:pb-14 md:pt-0">
        <div className="max-w-[440px]">
          <p data-hero-fade className="text-[24px] font-semibold tracking-[-0.02em] md:text-[26px]">빛이 구조를 완성합니다.</p>
          <p data-hero-fade className="mt-3 text-text-muted">하루 동안 움직이는 태양의 각도를 계산해, 구조가 빛을 받아들이는 방식을 설계합니다.</p>
          <a data-hero-fade data-cta href={ctaHref} className="caption mt-8 inline-block border-b border-primary py-3 text-primary">프로젝트 상담 →</a>
        </div>
        <div data-hero-fade className="w-full md:max-w-[520px] md:justify-self-end">
          <label htmlFor="light-time" className="caption flex justify-between text-text-muted"><span>06:00</span><span>12:00</span><span>18:00</span></label>
          <input ref={inputRef} id="light-time" type="range" min={6} max={18} step={1 / 12} value={hour}
            onChange={(e) => { touched.current = true; setHour(Number(e.target.value)); }}
            aria-label="시간대 (빛의 각도 조절)" aria-valuetext={fmt(hour)}
            style={{ "--pct": `${k * 100}%` } as CSSProperties} className="light-range mt-3" />
          <p className="mt-3 font-display text-[40px] font-light leading-none tracking-[-0.03em] md:text-[44px]">
            <span ref={timeRef}>{fmt(hour)}</span><span className="caption ml-3 align-middle text-text-muted">KST · drag to change light</span>
          </p>
        </div>
      </div>
    </header>
  );
}
