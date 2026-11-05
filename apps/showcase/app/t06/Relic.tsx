"use client";
import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useState, type ReactNode } from "react";

const RelicScene = dynamic(() => import("./RelicScene"), { ssr: false });
type State = "idle" | "loading" | "ready" | "poster";

class Boundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

const hasWebGL = () => {
  try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch { return false; }
};

/** Loads the 3D relic only when motion is allowed and WebGL exists; otherwise a self-made SVG poster. */
export default function Relic() {
  const [state, setState] = useState<State>("idle");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !hasWebGL()) { setState("poster"); return; }
    // three.js is ~240KB: start it once the main thread is idle so it doesn't block first interaction. The poster shows meanwhile.
    const ric: (cb: () => void, o?: { timeout: number }) => number = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 300));
    const cic: (id: number) => void = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(() => setState("loading"), { timeout: 2000 });
    return () => cic(id);
  }, []);
  const onReady = useCallback(() => setState("ready"), []);
  const onFail = useCallback(() => setState("poster"), []);

  return (
    <div data-relic={state} className="relative aspect-square w-full">
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(255,61,139,.35),rgba(61,242,255,.12)_45%,transparent_70%)] blur-2xl" />
      {(state === "loading" || state === "ready") && <Boundary onError={onFail}><RelicScene onReady={onReady} /></Boundary>}
      {state !== "ready" && (
        <svg viewBox="0 0 200 200" className="absolute inset-[18%]" role="img" aria-label="VOIDRUNNER 렐릭 (정적 이미지)">
          <polygon points="100,18 171,59 171,141 100,182 29,141 29,59" fill="#1a0b18" stroke="#ff3d8b" strokeWidth="2" />
          <polygon points="100,18 171,59 100,100 29,59" fill="none" stroke="#3df2ff" strokeOpacity=".6" />
          <path d="M100 100V182M100 100L171 141M100 100L29 141" stroke="#3df2ff" strokeOpacity=".4" />
          <circle cx="100" cy="100" r="92" fill="none" stroke="#ff3d8b" strokeOpacity=".5" />
        </svg>
      )}
    </div>
  );
}
