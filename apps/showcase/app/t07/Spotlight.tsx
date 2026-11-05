"use client";
import { useEffect, useRef } from "react";

/** Pointer highlight on glass panels: sets --mx/--my/--spot on the wrapper (fine pointer + motion allowed only). */
export default function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const move = (e: PointerEvent) => {
      el.querySelectorAll<HTMLElement>(".glass").forEach((g) => {
        const r = g.getBoundingClientRect();
        g.style.setProperty("--mx", `${e.clientX - r.left}px`);
        g.style.setProperty("--my", `${e.clientY - r.top}px`);
        g.style.setProperty("--spot", "1");
      });
    };
    const leave = () => el.querySelectorAll<HTMLElement>(".glass").forEach((g) => g.style.setProperty("--spot", "0"));
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
