import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHero } from "../hero";

/**
 * M01 Blur-in, M02 Split reveal, M04 Pinned story, M07 Magnetic CTA.
 * Everything is gated by matchMedia. Reduced-motion users get static, fully visible content.
 * Returns a cleanup function.
 */
export function initMotions(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const heroCleanup = initHero(root);
  const mm = gsap.matchMedia();
  const setup = () => {

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    root.setAttribute("data-motion-ready", "");

    // M01 Blur-in (800ms, power3.out)
    gsap.utils.toArray<HTMLElement>('[data-m="blur-in"]', root).forEach((el) => {
      gsap.to(el, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });

    // M02 Split reveal (700ms, 60ms stagger, power3.out)
    gsap.utils.toArray<HTMLElement>('[data-m="split"]', root).forEach((el) => {
      gsap.to(el.querySelectorAll("[data-split-word]"), { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.06, delay: 0.1 });
    });

    return () => root.removeAttribute("data-motion-ready");
  });

  // M04 Pinned story: tablet/desktop only, scrubbed over 3 viewport heights
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
    const el = root.querySelector<HTMLElement>('[data-m="pin"]');
    if (!el) return;
    const steps = el.querySelectorAll("[data-step]").length;
    el.setAttribute("data-pin-on", "");
    el.setAttribute("data-active", "0");
    const st = ScrollTrigger.create({
      trigger: el, start: "top top", end: () => `+=${window.innerHeight * steps}`, pin: true, scrub: true,
      onUpdate: (self) => el.setAttribute("data-active", String(Math.min(steps - 1, Math.floor(self.progress * steps)))),
    });
    return () => { st.kill(); el.removeAttribute("data-pin-on"); el.removeAttribute("data-active"); };
  });

  // M07 Magnetic CTA (300ms, power2.out): fine pointers only
  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>('[data-m="magnetic"]').forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.25, duration: 0.3, ease: "power2.out" });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
    });
    return () => cleanups.forEach((c) => c());
  });

  };
  // Hero intro runs immediately; scroll-driven recipes wait for idle so they don't block first interaction (TBT).
  const ric: (cb: () => void, o?: { timeout: number }) => number = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 200));
  const cic: (id: number) => void = window.cancelIdleCallback ?? window.clearTimeout;
  const idleId = ric(setup, { timeout: 1200 });  return () => { cic(idleId); heroCleanup(); mm.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
}
