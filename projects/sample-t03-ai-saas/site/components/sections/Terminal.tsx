/**
 * Self-made workflow demo (SVG). `stage` lights the graph progressively:
 * 1 = trigger fired, 2 = AI classification, 3 = routed to outputs. Used by the hero and the M04 pinned story.
 */
type Stage = 1 | 2 | 3;

const NODES = [
  { id: "gmail", x: 16, y: 44, w: 140, t: "gmail.inbox", s: "trigger · 14 new", on: 1 },
  { id: "slack", x: 16, y: 206, w: 140, t: "slack.#ops", s: "trigger · idle", on: 9 },
  { id: "ai", x: 212, y: 124, w: 140, t: "ai.classify", s: "invoice · 0.97", on: 2 },
  { id: "sheets", x: 416, y: 40, w: 128, t: "sheets", s: "append · 12", on: 3 },
  { id: "notion", x: 416, y: 210, w: 128, t: "notion", s: "skip", on: 9 },
];
const PATHS = [
  { d: "M156 70 C 188 70, 182 150, 212 150", on: 2 },
  { d: "M156 232 C 188 232, 182 150, 212 150", on: 9 },
  { d: "M352 150 C 388 150, 384 66, 416 66", on: 3 },
  { d: "M352 150 C 388 150, 384 236, 416 236", on: 9 },
];
const LOGS = [
  ["✓", "09:41:02", "gmail.inbox", "14 new messages"],
  ["✓", "09:41:02", "ai.classify", "12 invoices · 0.97"],
  ["✓", "09:41:03", "sheets.append", "12 rows · 2 → review"],
];

export default function Terminal({ stage, label, file = "flows/invoice-triage.yaml" }: { stage: Stage; label: string; file?: string }) {
  return (
    <figure className="overflow-hidden rounded-card bg-surface shadow-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3.5 font-mono text-xs text-text-muted">
        <i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" /><i className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-auto truncate">{file}</span>
      </div>
      <svg viewBox="0 0 560 300" role="img" aria-label={label} className="block w-full">
        {PATHS.map((p) => {
          const on = stage >= p.on;
          return <path key={p.d} d={p.d} fill="none" strokeWidth="1.5" stroke={on ? "var(--color-primary)" : "var(--color-border)"} className={on ? "flow-live" : undefined} />;
        })}
        {NODES.map((n) => {
          const on = stage >= n.on;
          return (
            <g key={n.id} className={on ? "node-on" : undefined}>
              <rect x={n.x} y={n.y} width={n.w} height="54" rx="8" fill="var(--color-bg)" stroke={on ? "var(--color-primary)" : "var(--color-border)"} />
              <circle cx={n.x + n.w - 14} cy={n.y + 14} r="3" fill={on ? "var(--color-primary)" : "var(--color-border)"} />
              <text x={n.x + 14} y={n.y + 23} fill="var(--color-text)" fontFamily="var(--font-mono)" fontSize="13" fontWeight="500">{n.t}</text>
              <text x={n.x + 14} y={n.y + 41} fill="var(--color-text-muted)" fontFamily="var(--font-mono)" fontSize="11">{n.s}</text>
            </g>
          );
        })}
      </svg>
      <div className="min-h-[110px] border-t border-border px-4 py-4 font-mono text-[12px] leading-[1.95] text-text-muted md:text-[12.5px]">
        {LOGS.slice(0, stage).map(([m, t, a, b], i) => (
          <p key={a} className={`truncate ${i === stage - 1 ? "caret" : ""}`}>
            <b className="font-medium text-primary">{m}</b> {t} <span className="text-signal">{a}</span> <span className="hidden sm:inline">{b}</span>
          </p>
        ))}
      </div>
    </figure>
  );
}
