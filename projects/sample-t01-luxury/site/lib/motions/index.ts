import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHero } from "../hero";

/**
 * T01 motions: M01 Blur-in, M03 Parallax, M06 Media reveal, M07 Magnetic CTA,
 * plus the signature dial-ring scroll rotation. M05 lives in components/sections/Media.tsx.
 * Everything is gated by matchMedia; reduced-motion users get static, fully visible content.
 */
export function initMotions(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const heroCleanup = initHero(root);
  const mm = gsap.matchMedia();
  const setup = () => {

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    root.setAttribute("data-motion-ready", "");

    // M01 Blur-in (cinematic ease, staggered by DOM order within the viewport)
    ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>('[data-m="blur-in"]', root), {
      start: "top 90%", once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09 }),
    });

    // M06 Media reveal
    gsap.utils.toArray<HTMLElement>('[data-m="reveal"]', root).forEach((el) => {
      gsap.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });

    // Signature: numeral ring counter-rotates as the hero scrolls away
    const ring = root.querySelector("[data-dial-ring]");
    const hero = root.querySelector("[data-hero]");
    if (ring && hero) {
      gsap.to(ring, { rotate: -30, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
    }

    return () => root.removeAttribute("data-motion-ready");
  });

  // M03 Parallax: tablet/desktop only
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
    gsap.utils.toArray<HTMLElement>('[data-m="parallax"]', root).forEach((el) => {
      gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });

  // M07 Magnetic CTA: fine pointers only
  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>('[data-m="magnetic"]').forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.25, duration: 0.3, ease: "power2.out" });
      };
      const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
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
