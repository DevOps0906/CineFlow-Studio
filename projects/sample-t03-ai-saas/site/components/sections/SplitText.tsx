/** M02 helper: splits text into word spans. Full sentence is exposed once to assistive tech via sr-only text; split words are aria-hidden. */
export default function SplitText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span data-m="split" aria-hidden="true">
        {text.split(" ").map((w, i) => (
          <span key={i}><span data-split-word>{w}</span>{" "}</span>
        ))}
      </span>
    </>
  );
}
