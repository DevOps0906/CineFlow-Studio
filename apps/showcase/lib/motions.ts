import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const PIN_EVENT = "m04:progress";
export const SCRUB_EVENT = "scrub:progress";

/**
 * Shared motion recipes for all P1 templates (declarative via data attributes):
 *   [data-m="blur-in"]  M01 Blur-in          [data-m="split"]    M02 Split reveal (words = [data-split-word])
 *   [data-m="parallax"] M03 Parallax (>=768)  [data-m="pin"]      M04 Pinned story (steps = [data-step])
 *   [data-m="reveal"]   M06 Media reveal      [data-m="magnetic"] M07 Magnetic CTA (fine pointer)
 *   [data-m="scrub"]    scroll progress → CSS var --p + SCRUB_EVENT      [data-count]  count-up numbers
 * Gated by matchMedia: reduced-motion users get the static, final state. Returns a cleanup function.
 */
export function initMotions(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    root.setAttribute("data-motion-ready", "");

    const blur = gsap.utils.toArray<HTMLElement>('[data-m="blur-in"]', root);
    if (blur.length) {
      ScrollTrigger.batch(blur, {
        start: "top 92%", once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, ease: "expo.out", stagger: 0.08 }),
      });
    }

    gsap.utils.toArray<HTMLElement>('[data-m="split"]', root).forEach((el) => {
      gsap.to(el.querySelectorAll("[data-split-word]"), { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.1 });
    });

    gsap.utils.toArray<HTMLElement>('[data-m="reveal"]', root).forEach((el) => {
      gsap.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
    });

    const counters = gsap.utils.toArray<HTMLElement>("[data-count]", root).map((el) => {
      const to = Number(el.dataset.count);
      const dec = Number(el.dataset.decimals ?? 0);
      const fmt = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
      const obj = { v: 0 };
      el.textContent = fmt(0);
      ScrollTrigger.create({
        trigger: el, start: "top 92%", once: true,
        onEnter: () => gsap.to(obj, { v: to, duration: 1.6, ease: "power3.out", onUpdate: () => { el.textContent = fmt(obj.v); } }),
      });
      return () => { el.textContent = fmt(to); };
    });

    gsap.utils.toArray<HTMLElement>('[data-m="scrub"]', root).forEach((el) => {
      el.style.setProperty("--p", "0");
      ScrollTrigger.create({
        trigger: el, start: "top top", end: "bottom bottom", scrub: true,
        onUpdate: (s) => {
          el.style.setProperty("--p", s.progress.toFixed(4));
          window.dispatchEvent(new CustomEvent(SCRUB_EVENT, { detail: { id: el.id, p: s.progress } }));
        },
      });
    });

    return () => { root.removeAttribute("data-motion-ready"); counters.forEach((c) => c()); };
  });

  mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
    gsap.utils.toArray<HTMLElement>('[data-m="parallax"]', root).forEach((el) => {
      const amt = Number(el.dataset.parallax ?? 8);
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });

    const kills: Array<() => void> = [];
    root.querySelectorAll<HTMLElement>('[data-m="pin"]').forEach((pin) => {
      const steps = pin.querySelectorAll("[data-step]").length || 1;
      pin.setAttribute("data-pin-on", "");
      pin.setAttribute("data-active", "0");
      const st = ScrollTrigger.create({
        trigger: pin, start: "top top", end: () => `+=${window.innerHeight * steps * 0.9}`, pin: true, scrub: true,
        onUpdate: (self) => {
          pin.setAttribute("data-active", String(Math.min(steps - 1, Math.floor(self.progress * steps))));
          window.dispatchEvent(new CustomEvent(PIN_EVENT, { detail: { id: pin.id, p: self.progress } }));
        },
      });
      kills.push(() => { st.kill(); pin.removeAttribute("data-pin-on"); pin.removeAttribute("data-active"); });
    });
    return () => kills.forEach((k) => k());
  });

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

  return () => { mm.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
}
