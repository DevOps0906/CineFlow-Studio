/** M02 helper: words animate (aria-hidden); the full sentence is exposed once via sr-only text. */
export default function SplitText({ text, accent = [], className }: { text: string; accent?: string[]; className?: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span data-m="split" aria-hidden="true" className={className}>
        {text.split(" ").map((w, i) => (
          <span key={i}>
            <span data-split-word className={accent.includes(w) ? "text-primary" : undefined}>{w}</span>{" "}
          </span>
        ))}
      </span>
    </>
  );
}
