"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";

export const PROJECTS = [
  { n: "01", t: "Ondo Tea House", k: "Identity · Packaging", y: "2026" },
  { n: "02", t: "Field Notes OS", k: "Interface · Product", y: "2026" },
  { n: "03", t: "Mute Records", k: "Identity · Motion", y: "2025" },
  { n: "04", t: "Kiln Studio", k: "Identity · Web", y: "2025" },
  { n: "05", t: "Lattice Bank", k: "Interface · Type", y: "2024" },
  { n: "06", t: "Haze Journal", k: "Editorial · Web", y: "2024" },
];

/** Work index: hovering a row (fine pointer) shows a floating cover preview that follows the cursor. Touch: inline thumbnails. */
export default function ProjectIndex() {
  const [hover, setHover] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => { setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches); }, []);
  useEffect(() => {
    if (!fine) return;
    const move = (e: PointerEvent) => { box.current?.style.setProperty("--px", `${e.clientX + 170}px`); box.current?.style.setProperty("--py", `${e.clientY}px`); };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [fine]);

  return (
    <>
      <ul onPointerLeave={() => setHover(null)}>
        {PROJECTS.map((p, i) => (
          <li key={p.n} onPointerEnter={() => setHover(i)}
            className={`grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-text py-5 transition-colors md:grid-cols-[4rem_1.6fr_1fr_5rem] md:py-7 ${hover !== null && hover !== i ? "text-text-muted" : ""}`}>
            <span className="caption">{p.n}</span>
            <span className="font-display text-[26px] font-bold leading-none tracking-[-0.03em] md:text-[48px]">{p.t}</span>
            <span className="hidden text-sm md:block">{p.k}</span>
            <span className={`cover cv-${i + 1} h-12 w-16 rounded md:hidden`} aria-hidden />
            <span className="caption hidden text-right md:block">{p.y}</span>
          </li>
        ))}
      </ul>
      {fine && <div ref={box} aria-hidden data-preview={hover ?? ""} className={`preview cover ${hover !== null ? `cv-${hover + 1}` : ""}`} style={{ "--ps": hover !== null ? 1 : 0 } as CSSProperties} />}
    </>
  );
}
