import { cn } from "@/lib/utils";

/** Standard module page wrapper: kicker + serif title + description. */
export function PageShell({
  kicker,
  title,
  desc,
  children,
}: {
  kicker: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        {desc && <p className="mt-2 max-w-2xl text-[13.5px] leading-6 text-ink-soft">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

/** Papery bordered panel with a mono header and optional icon. */
export function Panel({
  title,
  icon: Icon,
  children,
  className,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col border border-ink/30 bg-sheet p-5", className)}>
      <div className="flex items-center justify-between border-b border-ink/20 pb-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
          {title}
        </p>
        {Icon && <Icon className="size-4 text-ink/40" />}
      </div>
      <div className="flex flex-1 flex-col pt-4">{children}</div>
    </section>
  );
}

/** Deterministic QR placeholder for digital tickets. */
export function FakeQr({ seed }: { seed: string }) {
  const cells: boolean[] = [];
  let h = 0;
  for (let i = 0; i < 13 * 13; i++) {
    h = (h * 31 + seed.charCodeAt(i % seed.length) * 7 + i * 3) % 97;
    cells.push(h % 3 !== 0);
  }
  return (
    <div
      className="grid gap-px border border-ink/40 bg-ink/30 p-1.5"
      style={{ gridTemplateColumns: "repeat(13, 1fr)" }}
    >
      {cells.map((on, i) => (
        <span key={i} className={cn("aspect-square", on ? "bg-ink" : "bg-sheet")} />
      ))}
    </div>
  );
}

/** Small uppercase mono label inside a panel. */
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">{children}</p>
  );
}
