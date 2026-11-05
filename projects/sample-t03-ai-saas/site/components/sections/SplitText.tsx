/** M02 helper: splits text into word spans (aria-hidden) and exposes the sentence once via sr-only text. */
export default function SplitText({ text, accent = [] }: { text: string; accent?: string[] }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span data-m="split" aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i}>
            <span data-split-word className={accent.includes(w) ? "text-primary" : undefined}>{w}</span>{" "}
          </span>
        ))}
      </span>
    </>
  );
}
