"use client";
import { useEffect, useState } from "react";

/**
 * M05 Seamless video loop for the film frame. The self-made poster is always rendered;
 * the video mounts only when a licensed source is configured (spec §5) and motion is allowed.
 */
export default function Media() {
  const src = process.env.NEXT_PUBLIC_FILM_VIDEO;
  const [play, setPlay] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setPlay(Boolean(src) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, [src]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/film-poster.svg" alt="Calibre 01 다이얼 클로즈업 (자체 제작 일러스트)" width={2100} height={900}
        className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover" data-m="parallax" />
      {play && !failed && (
        <video className="absolute inset-0 h-full w-full object-cover" src={src} poster="/media/film-poster.svg"
          autoPlay muted loop playsInline preload="metadata" aria-hidden="true" onError={() => setFailed(true)} />
      )}
    </>
  );
}
