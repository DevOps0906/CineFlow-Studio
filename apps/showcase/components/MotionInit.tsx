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
    return root ? initMotions(root) : undefined;
  }, []);
  return <span ref={ref} hidden />;
}
