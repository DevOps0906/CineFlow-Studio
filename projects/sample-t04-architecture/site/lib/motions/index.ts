import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const PROGRESS_EVENT = "m04:progress";

/**
 * M01 Blur-in, M03 Parallax, M04 Pinned story, M06 Media reveal.
 * M04 also broadcasts scroll progress (0..1) via window event; the M08 Model reveal scene listens to it.
 * Reduced-motion users get static content (3D is not loaded either, see components/three/ModelStage).
 */
export function initMotions(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    root.setAttribute("data-motion-ready", "");

    gsap.utils.toArray<HTMLElement>('[data-m="blur-in"]', root).forEach((el) => {
      gsap.to(el, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });

    // M06 Media reveal (900ms, power2.inOut)
    gsap.utils.toArray<HTMLElement>('[data-m="reveal"]', root).forEach((el) => {
      gsap.to(el, { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power2.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });

    return () => root.removeAttribute("data-motion-ready");
  });

  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
    // M03 Parallax
    gsap.utils.toArray<HTMLElement>('[data-m="parallax"]', root).forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // M04 Pinned story (+ progress broadcast for M08)
    const pin = root.querySelector<HTMLElement>('[data-m="pin"]');
    if (!pin) return;
    const steps = pin.querySelectorAll("[data-step]").length;
    pin.setAttribute("data-pin-on", "");
    pin.setAttribute("data-active", "0");
    const emit = (p: number) => window.dispatchEvent(new CustomEvent(PROGRESS_EVENT, { detail: p }));
    emit(0);
    const st = ScrollTrigger.create({
      trigger: pin, start: "top top", end: () => `+=${window.innerHeight * steps}`, pin: true, scrub: true,
      onUpdate: (self) => {
        pin.setAttribute("data-active", String(Math.min(steps - 1, Math.floor(self.progress * steps))));
        emit(self.progress);
      },
    });
    return () => { st.kill(); pin.removeAttribute("data-pin-on"); pin.removeAttribute("data-active"); };
  });

  return () => { mm.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
}
