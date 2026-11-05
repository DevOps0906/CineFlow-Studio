"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { SCRUB_EVENT } from "@/lib/motions";
import Car from "./Car";

const PHASES = [
  { k: "0—100 km/h", v: "2.9", u: "s" },
  { k: "Range (WLTP)", v: "612", u: "km" },
  { k: "Charge 10—80%", v: "18", u: "min" },
];

/** Drive HUD for the scroll-scrub section. Before any scrub event (no JS / reduced motion) all stats are listed statically. */
export function DriveHud() {
  const [p, setP] = useState<number | null>(null);
  useEffect(() => {
    const on = (e: Event) => { const d = (e as CustomEvent<{ id: string; p: number }>).detail; if (d.id === "drive") setP(d.p); };
    window.addEventListener(SCRUB_EVENT, on);
    return () => window.removeEventListener(SCRUB_EVENT, on);
  }, []);

  if (p === null) {
    return (
      <dl data-hud="static" className="grid grid-cols-3 gap-6">
        {PHASES.map((f) => <div key={f.k}><dt className="caption text-text-muted">{f.k}</dt><dd className="font-display text-[44px] font-semibold leading-none md:text-[64px]">{f.v}<span className="ml-1 text-xl text-text-muted">{f.u}</span></dd></div>)}
      </dl>
    );
  }
  const phase = Math.min(2, Math.floor(p * 3));
  const speed = Math.round(Math.min(1, p / 0.45) * 100);
  const f = PHASES[phase];
  return (
    <div data-hud="live" data-phase={phase} className="flex flex-wrap items-end justify-between gap-6">
      <div aria-live="polite">
        <p className="caption text-text-muted">{f.k}</p>
        <p className="font-display text-[64px] font-semibold leading-none md:text-[104px]">{f.v}<span className="ml-2 text-2xl text-text-muted">{f.u}</span></p>
      </div>
      <p className="font-mono text-sm text-text-muted"><span data-speed className="font-display text-[44px] font-light text-primary md:text-[64px]">{String(speed).padStart(3, "0")}</span> km/h</p>
    </div>
  );
}

const COLORS = [
  { n: "Volt Orange", c: "#ff5a1f", d: "기본" },
  { n: "Graphite", c: "#3a3d42", d: "+ ₩0" },
  { n: "Glacier", c: "#d7dadf", d: "+ ₩1,200,000" },
  { n: "Midnight Blue", c: "#1d2a4a", d: "+ ₩1,200,000" },
];

/** Colour configurator: swatches recolour the car body (CSS variable). */
export function Configurator() {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="relative mx-auto max-w-4xl" style={{ "--car": COLORS[i].c } as CSSProperties}>
        <Car className="block w-full" label={`VELOCE E1 ${COLORS[i].n} 측면`} />
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <div aria-live="polite">
          <p className="caption text-text-muted">Exterior</p>
          <p data-color-name className="font-display text-[36px] font-semibold uppercase leading-none">{COLORS[i].n}</p>
          <p className="text-sm text-text-muted">{COLORS[i].d}</p>
        </div>
        <div role="group" aria-label="외장 색상" className="flex gap-3">
          {COLORS.map((c, k) => (
            <button key={c.n} type="button" aria-pressed={k === i} aria-label={c.n} onClick={() => setI(k)}
              className={`h-11 w-11 rounded-full border-2 transition-transform ${k === i ? "scale-110 border-text" : "border-border hover:scale-105"}`} style={{ background: c.c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** M05 Seamless video loop slot: renders only when a licensed source is configured. */
export function HeroVideo() {
  const src = process.env.NEXT_PUBLIC_T08_VIDEO;
  const [ok, setOk] = useState(false);
  useEffect(() => { setOk(Boolean(src) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, [src]);
  if (!ok) return null;
  return <video className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" src={src} autoPlay muted loop playsInline aria-hidden="true" />;
}
