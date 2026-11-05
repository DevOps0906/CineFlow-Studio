"use client";
import { useEffect, useRef } from "react";

/**
 * Signature dial (pure CSS). Hands show the visitor's local time and sweep via CSS animation
 * (disabled for reduced motion). The numeral ring counter-rotates on scroll (lib/motions).
 */
export default function Dial() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = new Date();
    const s = d.getSeconds() + d.getMilliseconds() / 1000;
    const m = d.getMinutes() + s / 60;
    const h = (d.getHours() % 12) + m / 60;
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--h", `${h * 30}deg`);
    el.style.setProperty("--m", `${m * 6}deg`);
    el.style.setProperty("--s", `${s * 6}deg`);
    el.dataset.live = "";
  }, []);

  return (
    <div ref={ref} className="dial" role="img" aria-label="AURUM Noir Calibre 01 다이얼. 현재 시각을 표시합니다.">
      <div className="dial-face" />
      <div className="dial-ticks" />
      <div className="dial-ring" data-dial-ring>
        {[["XII", "n12"], ["III", "n3"], ["VI", "n6"], ["IX", "n9"]].map(([t, c]) => (
          <span key={t} className={`dial-num ${c}`}>{t}</span>
        ))}
      </div>
      <span className="dial-brand">AURUM NOIR</span>
      <span className="dial-sub">Calibre 01</span>
      <i className="dial-hand dial-hour" />
      <i className="dial-hand dial-min" />
      <i className="dial-hand dial-sec" data-sec />
      <i className="dial-pin" />
    </div>
  );
}
