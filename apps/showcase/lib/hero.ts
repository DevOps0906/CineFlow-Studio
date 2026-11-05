import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Hero Kit — GSAP hero patterns (re-implemented from the Interactive Hero Lab PRDs, not copied code).
 * Declarative via data attributes on the hero ([data-hero]):
 *   [data-hero-title] [data-char]   intro char reveal (yPercent mask stagger; data-hero-title="kinetic" adds random rotation)
 *   [data-hero-fade]                 intro fade-up, staggered in DOM order
 *   [data-hero-visual="scale|rise|clip|drive"]  intro reveal of the main visual
 *   [data-hero-pop]                  intro pop-in (back.out), e.g. nodes, tiles, lit windows
 *   [data-hero-draw]                 SVG stroke draw
 *   [data-hero-bar]                  bar grows from 0 (scaleX)
 *   [data-hero-spin]                 spins down to rest with the visual (e.g. wheels)
 *   [data-hero-depth="0.6"]          pointer parallax depth (fine pointer) + scroll-out drift
 *   [data-hero-tilt]                 pointer 3D tilt (fine pointer)
 *   [data-hero-magnetic-chars]       chars attracted to the cursor (quickTo, n² falloff)
 *   [data-hero-out="0.4"]            scroll-out scrub (moves up / fades as the hero leaves)
 *   [data-marquee]                   GSAP marquee whose speed/direction follows scroll velocity
 * Hero also receives --hx/--hy (px) and --hn (0..1 pointer presence) for CSS spotlights.
 * Initial hidden states come from CSS when <html data-motion="on"> (set before paint), so there is no flash;
 * reduced-motion users never get hidden states. Returns a cleanup function.
 */
export function initHero(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const hero = root.querySelector<HTMLElement>("[data-hero]");
  const mm = gsap.matchMedia();
  const q = <T extends Element = HTMLElement>(sel: string, scope: Element = hero ?? root) => Array.from(scope.querySelectorAll<T>(sel) as NodeListOf<T>);

  // Marquees exist outside the hero too.
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const cleanups: Array<() => void> = [];
    q("[data-marquee]", root).forEach((el) => {
      const dur = Number(el.dataset.marquee || 40);
      const tween = gsap.to(el, { xPercent: -50, duration: dur, ease: "none", repeat: -1 });
      let boost = 0;
      const st = ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onUpdate: (s) => { boost = gsap.utils.clamp(-6, 6, s.getVelocity() / 400); } });
      const tick = () => { boost *= 0.92; tween.timeScale(1 + Math.abs(boost)) ; tween.reversed(boost < -0.4); };
      gsap.ticker.add(tick);
      cleanups.push(() => { gsap.ticker.remove(tick); st.kill(); tween.kill(); gsap.set(el, { clearProps: "transform" }); });
    });
    return () => cleanups.forEach((c) => c());
  });

  if (!hero) return () => mm.revert();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const kinetic = hero.querySelector("[data-hero-title]")?.getAttribute("data-hero-title") === "kinetic";
    const chars = q("[data-hero-title] [data-char]");
    const fades = q("[data-hero-fade]");
    const visuals = q("[data-hero-visual]");
    const pops = q("[data-hero-pop]");
    const draws = q<SVGPathElement>("[data-hero-draw]");
    const bars = q("[data-hero-bar]");
    const spins = q("[data-hero-spin]");

    // Take over from the CSS pre-paint states with equivalent inline states, then mark the hero as handled.
    // y/x: 0 discards the CSS pre-paint translateY(112%), which GSAP would otherwise parse into a px offset that never animates.
    gsap.set(chars, { x: 0, y: 0, yPercent: 112, rotate: kinetic ? () => gsap.utils.random(-22, 22) : 5 });
    gsap.set(fades, { opacity: 0, y: 26 });
    gsap.set(pops, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
    gsap.set(bars, { x: 0, y: 0, scaleX: 0, transformOrigin: "0% 50%" });
    gsap.set(spins, { rotate: -900, transformOrigin: "50% 50%" });
    draws.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
    visuals.forEach((v) => {
      const kind = v.dataset.heroVisual || "scale";
      if (kind === "clip") gsap.set(v, { clipPath: "inset(100% 0% 0% 0%)" });
      else if (kind === "drive") gsap.set(v, { xPercent: -70, opacity: 0 });
      else if (kind === "rise") gsap.set(v, { y: 90, opacity: 0 });
      else gsap.set(v, { scale: 0.86, rotate: -6, opacity: 0 });
    });
    hero.setAttribute("data-hero-ready", "");

    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.05, onComplete: () => hero.setAttribute("data-hero-done", "") });
    tl.to(chars, { yPercent: 0, rotate: 0, duration: kinetic ? 1 : 1.15, stagger: { each: kinetic ? 0.03 : 0.035 } }, 0)
      .to(visuals, { scale: 1, rotate: 0, y: 0, xPercent: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "power4.out", stagger: 0.12 }, 0.1)
      .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.35)
      .to(pops, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)", stagger: 0.06 }, 0.7)
      .to(draws, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.6)
      .to(bars, { scaleX: 1, duration: 1.2, ease: "power3.out" }, 0.9)
      .to(spins, { rotate: 0, duration: 1.6, ease: "power4.out" }, 0.1);
    // Wall-clock safety net: slow frames (lag smoothing) must not keep content hidden.
    const safety = window.setTimeout(() => tl.progress(1), 4000);

    // Scroll-out scrub
    const outs = q("[data-hero-out]").map((el) => gsap.to(el, {
      y: () => -120 * Number(el.dataset.heroOut || 0.4), opacity: 0.15, ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
    }));

    return () => { window.clearTimeout(safety); tl.kill(); outs.forEach((t) => t.scrollTrigger?.kill()); hero.removeAttribute("data-hero-ready"); };
  });

  mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
    const depth = q("[data-hero-depth]").map((el) => ({ f: Number(el.dataset.heroDepth || 0.5), x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }), y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }) }));
    const tilt = q("[data-hero-tilt]").map((el) => {
      gsap.set(el, { transformPerspective: 900 });
      return { ry: gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3.out" }), rx: gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3.out" }) };
    });
    const hx = gsap.quickTo(hero, "--hx", { duration: 0.6, ease: "power3.out" });
    const hy = gsap.quickTo(hero, "--hy", { duration: 0.6, ease: "power3.out" });
    const hn = gsap.quickTo(hero, "--hn", { duration: 0.5, ease: "power2.out" });
    const mag = q("[data-hero-magnetic-chars] [data-char]").map((el) => ({
      el, x: gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" }), y: gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" }),
    }));

    let raf = 0;
    let last: PointerEvent | null = null;
    const frame = () => {
      raf = 0;
      if (!last) return;
      const r = hero.getBoundingClientRect();
      const nx = (last.clientX - r.left) / r.width - 0.5;
      const ny = (last.clientY - r.top) / r.height - 0.5;
      depth.forEach((d) => { d.x(nx * 60 * d.f); d.y(ny * 40 * d.f); });
      tilt.forEach((t) => { t.ry(nx * 14); t.rx(-ny * 10); });
      hx(last.clientX - r.left); hy(last.clientY - r.top); hn(1);
      const R = 170;
      mag.forEach((m) => {
        const b = m.el.getBoundingClientRect();
        const cx = b.left + b.width / 2 - Number(gsap.getProperty(m.el, "x"));
        const cy = b.top + b.height / 2 - Number(gsap.getProperty(m.el, "y"));
        const dx = last!.clientX - cx, dy = last!.clientY - cy;
        const n = Math.max(0, 1 - Math.hypot(dx, dy) / R);
        m.x(dx * n * n * 0.45); m.y(dy * n * n * 0.45);
      });
    };
    const move = (e: PointerEvent) => { last = e; if (!raf) raf = requestAnimationFrame(frame); };
    const leave = () => { last = null; depth.forEach((d) => { d.x(0); d.y(0); }); tilt.forEach((t) => { t.ry(0); t.rx(0); }); mag.forEach((m) => { m.x(0); m.y(0); }); hn(0); };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(raf); hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); };
  });

  return () => mm.revert();
}
