"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const TARGET = 16 + 40 / 60; // 16:40

function fmt(h: number) {
  const m = Math.round(h * 60);
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/**
 * Signature hero: a time-of-day slider drives the light study scene through CSS variables
 * (beam angle, intensity, warmth, cast shadow). With motion allowed, the light sweeps 12:00 → 16:40 once on load.
 */
export default function LightHero({ ctaHref }: { ctaHref: string }) {
  const [hour, setHour] = useState(TARGET);
  const touched = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      if (touched.current) return;
      const k = Math.min(1, (t - start) / 1800);
      setHour(12 + (TARGET - 12) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const k = (hour - 6) / 12;
  const sun = Math.sin(Math.PI * k);
  const vars = {
    "--beam": `${70 + k * 90}deg`,
    "--glow": (0.35 + 0.65 * sun).toFixed(3),
    "--warm": (1 - sun).toFixed(3),
    "--cast": `${((k - 0.5) * -70).toFixed(1)}deg`,
  } as CSSProperties;

  return (
    <header id="top" data-hour={hour.toFixed(2)} style={vars} className="light-scene grain relative isolate flex min-h-svh flex-col overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="scene-wall" /><div className="light-beam" /><div className="scene-slab" /><div className="scene-slit" /><div className="scene-floor" /><div className="scene-cast" />
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

      <h1 className="relative z-10 px-5 pt-8 font-display text-display font-bold leading-[0.82] tracking-display md:px-12 md:pt-12">
        LIGHT<span className="outline-text block">STUDY</span>
        <span className="sr-only"> — STRATA Atelier, 빛이 구조를 완성합니다</span>
      </h1>

      <div aria-hidden className="caption absolute right-14 top-[110px] z-10 hidden space-y-3 text-right text-text-muted lg:block">
        <p className="anno">N 37°34′ · E 126°58′</p>
        <p className="anno">Sun altitude {Math.round(sun * 62)}° · azimuth {Math.round(90 + k * 180)}°</p>
      </div>

      <div className="relative z-10 mt-auto grid gap-10 bg-gradient-to-t from-bg via-bg/85 to-transparent px-6 pb-12 pt-28 md:grid-cols-2 md:items-end md:bg-none md:px-14 md:pb-14 md:pt-0">
        <div className="max-w-[440px]">
          <p data-m="blur-in" className="text-[24px] font-semibold tracking-[-0.02em] md:text-[26px]">빛이 구조를 완성합니다.</p>
          <p data-m="blur-in" className="mt-3 text-text-muted">하루 동안 움직이는 태양의 각도를 계산해, 구조가 빛을 받아들이는 방식을 설계합니다.</p>
          <a data-m="blur-in" data-cta href={ctaHref} className="caption mt-8 inline-block border-b border-primary py-3 text-primary">프로젝트 상담 →</a>
        </div>
        <div className="w-full md:max-w-[520px] md:justify-self-end">
          <label htmlFor="light-time" className="caption flex justify-between text-text-muted"><span>06:00</span><span>12:00</span><span>18:00</span></label>
          <input id="light-time" type="range" min={6} max={18} step={1 / 12} value={hour}
            onChange={(e) => { touched.current = true; setHour(Number(e.target.value)); }}
            aria-label="시간대 (빛의 각도 조절)" aria-valuetext={fmt(hour)}
            style={{ "--pct": `${k * 100}%` } as CSSProperties} className="light-range mt-3" />
          <p className="mt-3 font-display text-[40px] font-light leading-none tracking-[-0.03em] md:text-[44px]">
            {fmt(hour)}<span className="caption ml-3 align-middle text-text-muted">KST · drag to change light</span>
          </p>
        </div>
      </div>
    </header>
  );
}
