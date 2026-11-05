"use client";
import { useEffect, useRef } from "react";
import { initMotions } from "@/lib/motions";

/**
 * Initialises the shared motions on the closest `.tpl` root. Rendered at the END of each page (inside the page
 * segment) so it runs only after the page has hydrated — DOM changes (pin spacers, count-up text) must not
 * happen before hydration or React reports a mismatch.
 */
export default function MotionInit() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>(".tpl");
    if (!root) return;
    // Match the overscroll/background colour to the template once (instead of a costly html:has() selector).
    const html = document.documentElement;
    const prev = html.style.backgroundColor;
    html.style.backgroundColor = getComputedStyle(root).backgroundColor;
    const stop = initMotions(root);
    return () => { stop(); html.style.backgroundColor = prev; };
  }, []);
  return <span ref={ref} hidden />;
}
