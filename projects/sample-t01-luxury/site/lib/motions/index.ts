import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Registers M01 Blur-in, M03 Parallax, M06 Media reveal, M07 Magnetic CTA.
 * M05 (seamless loop) lives in components/sections/HeroMedia.tsx.
 * All motion is gated by matchMedia; reduced-motion users get static content.
 * Returns a cleanup function (kills all triggers/tweens).
 */
export function initMotions(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    root.setAttribute("data-motion-ready", "");

    // M01 Blur-in (800ms, power3.out)
    gsap.utils.toArray<HTMLElement>('[data-m="blur-in"]', root).forEach((el) => {
      gsap.to(el, {
        opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // M06 Media reveal (900ms, power2.inOut)
    gsap.utils.toArray<HTMLElement>('[data-m="reveal"]', root).forEach((el) => {
      gsap.to(el, {
        clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    return () => root.removeAttribute("data-motion-ready");
  });

  // M03 Parallax: desktop/tablet only
  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
    gsap.utils.toArray<HTMLElement>('[data-m="parallax"]', root).forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, {
        yPercent: 8, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
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

  return () => { mm.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
}
