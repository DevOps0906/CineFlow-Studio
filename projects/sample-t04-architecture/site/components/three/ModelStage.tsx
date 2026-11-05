"use client";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const Scene = dynamic(() => import("./Scene"), { ssr: false });
type State = "idle" | "loading" | "ready" | "poster-reduced" | "poster-nowebgl" | "poster-failed";

class Boundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function hasWebGL() {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
}

/** Lazily loads the 3D scene near the viewport; falls back to the poster on reduced motion, no WebGL, or load/render failure. */
export default function ModelStage() {
  const box = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setState("poster-reduced"); return; }
    if (!hasWebGL()) { setState("poster-nowebgl"); return; }
    setStaticMode(!window.matchMedia("(min-width: 768px)").matches);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setState((s) => (s === "idle" ? "loading" : s)); io.disconnect(); } }, { rootMargin: "400px" });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  const onReady = useCallback(() => setState("ready"), []);
  const onFail = useCallback(() => setState("poster-failed"), []);
  const showPoster = state !== "ready";
  return (
    <div ref={box} data-model={state} className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface">
      {(state === "loading" || state === "ready") && (
        <Boundary onError={onFail}>
          <Scene staticMode={staticMode} onReady={onReady} onFail={onFail} />
        </Boundary>
      )}
      {showPoster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/media/poster-building.svg" alt="건축 모델 포스터 (3D 대체 이미지)" width={1200} height={800}
          className="absolute inset-0 h-full w-full object-cover" data-poster />
      )}
    </div>
  );
}
