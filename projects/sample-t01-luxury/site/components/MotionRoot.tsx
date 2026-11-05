"use client";
import { useEffect, useRef } from "react";
import { initMotions } from "@/lib/motions";

export default function MotionRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? initMotions(ref.current) : undefined), []);
  return <div ref={ref}>{children}</div>;
}
