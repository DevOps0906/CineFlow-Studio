"use client";
import { useEffect, useState } from "react";

const TARGET = new Date("2027-05-14T18:00:00+09:00").getTime();

/** Live countdown to the opening night. Renders placeholders on the server, fills in after mount (no hydration mismatch). */
export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = now === null ? null : Math.max(0, TARGET - now);
  const parts = diff === null ? null : [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1e3) % 60];
  const labels = ["Days", "Hrs", "Min", "Sec"];

  return (
    <div data-countdown={parts ? "live" : "pending"} role="timer" aria-label={parts ? `개막까지 ${parts[0]}일 ${parts[1]}시간 ${parts[2]}분` : "개막 카운트다운"} className="grid grid-cols-4 gap-2">
      {labels.map((l, i) => (
        <div key={l} className="border border-border bg-surface/80 px-2 py-3 text-center backdrop-blur">
          <p className="font-display text-[34px] leading-none tabular-nums md:text-[48px]">{parts ? String(parts[i]).padStart(i === 0 ? 3 : 2, "0") : "––"}</p>
          <p className="caption mt-2 text-text-muted">{l}</p>
        </div>
      ))}
    </div>
  );
}
