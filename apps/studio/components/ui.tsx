import { STATUS_LABEL, type Status } from "@/lib/data";

const C: Record<Status, string> = { built: "bg-emerald-400/15 text-emerald-300", "spec-draft": "bg-amber-400/15 text-amber-300", planned: "bg-zinc-500/20 text-zinc-300" };

export const StatusBadge = ({ s }: { s: Status }) => <span className={`rounded-full px-2.5 py-0.5 text-xs ${C[s]}`}>{STATUS_LABEL[s]}</span>;

export const Card = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <section className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
    {title && <h2 className="mb-4 text-sm font-medium text-zinc-300">{title}</h2>}
    {children}
  </section>
);

export const Bar = ({ value, total }: { value: number; total: number }) => (
  <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={total} className="h-2 w-full overflow-hidden rounded-full bg-white/10">
    <div className="h-full rounded-full bg-amber-400" style={{ width: `${total ? (value / total) * 100 : 0}%` }} />
  </div>
);
