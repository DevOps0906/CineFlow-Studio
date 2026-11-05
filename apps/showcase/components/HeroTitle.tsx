/**
 * Hero title split into masked words → chars for the Hero Kit intro (server component, no runtime DOM splitting).
 * The sentence is exposed once to assistive tech (sr-only); the animated glyphs are aria-hidden.
 */
const graphemes = (w: string) => {
  const s = w.normalize("NFC");
  return typeof Intl !== "undefined" && "Segmenter" in Intl
    ? Array.from(new Intl.Segmenter("ko", { granularity: "grapheme" }).segment(s), (g) => g.segment)
    : Array.from(s);
};
export type TitlePart = { t: string; className?: string; br?: boolean };

export default function HeroTitle({ parts, kinetic = false, magnetic = false, className }: { parts: TitlePart[]; kinetic?: boolean; magnetic?: boolean; className?: string }) {
  const text = parts.map((p) => p.t.normalize("NFC")).join(" ").replace(/\s+/g, " ").trim();
  return (
    <h1 className={className} data-hero-title={kinetic ? "kinetic" : ""} {...(magnetic ? { "data-hero-magnetic-chars": "" } : {})}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map((p, pi) => (
          <span key={pi} className={p.className}>
            {p.t.split(" ").filter(Boolean).map((w, wi, arr) => (
              <span key={wi}>
                <span className="hero-word">
                  {graphemes(w).map((c, ci) => <span key={ci} data-char className="hero-char">{c}</span>)}
                </span>
                {wi < arr.length - 1 ? " " : ""}
              </span>
            ))}
            {p.br ? <br /> : pi < parts.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </h1>
  );
}
