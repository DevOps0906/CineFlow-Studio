"use client";
import { useEffect, useRef, useState } from "react";

/** M05 Seamless video loop. Poster always rendered; video mounts only if a source is configured and motion is allowed. */
export default function HeroMedia() {
  const src = process.env.NEXT_PUBLIC_HERO_VIDEO; // set only after license approval (spec §5)
  const [play, setPlay] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPlay(Boolean(src) && !reduce);
  }, [src]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/hero-poster.svg" alt="" className="h-full w-full object-cover" data-m="parallax" />
      {play && !failed && (
        <video ref={ref} className="absolute inset-0 h-full w-full object-cover" src={src} poster="/media/hero-poster.svg"
          autoPlay muted loop playsInline preload="metadata" onError={() => setFailed(true)} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
    </div>
  );
}
