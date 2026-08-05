import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Small caps mono label with a red ink square — newspaper section marker. */
export function Kicker({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "red" }) {
  return (
    <p className={cn("flex items-center gap-2", tone === "red" ? "kicker-red" : "kicker")}>
      <span className={cn("inline-block size-1.5", tone === "red" ? "bg-newsprint" : "bg-ink/60")} />
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  desc,
  tone = "muted",
}: {
  kicker: string;
  title: string;
  desc?: string;
  tone?: "muted" | "red";
}) {
  return (
    <div className="max-w-3xl">
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {desc && <p className="mt-4 text-[15px] leading-7 text-ink-soft">{desc}</p>}
    </div>
  );
}

/** Thin hairline divider. */
export function Hairline({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-ink/20", className)} />;
}

/** New/merged tag used across the blueprint. */
export function NewTag({ label = "NEW" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 border border-newsprint/70 px-1.5 py-px font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-newsprint">
      <span className="size-1 bg-newsprint" />
      {label}
    </span>
  );
}

export function Masthead({ active = "home" }: { active?: "home" | "blueprint" }) {
  return (
    <header className="relative z-40">
      {/* Top rule + wordmark row */}
      <div className="border-b border-ink/60 bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
              Campus<span className="text-newsprint">Dash</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft sm:inline">
              Est. NITER
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              to="/flowchart"
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                active === "blueprint" ? "text-newsprint" : "text-ink/70 hover:text-ink",
              )}
            >
              Full blueprint
            </Link>
          </nav>

          <Button asChild variant="outline" size="sm" className="rounded-sm border-ink/40 bg-transparent font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-ink hover:text-paper">
            <Link to="/auth">
              Sign in
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Dateline strip */}
      <div className="border-b border-ink/60 bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft sm:px-6">
          <span>Vol. I — No. 1</span>
          <span className="hidden sm:inline">The NITER campus gazette — a student &amp; faculty hub</span>
          <span>5 August 2026</span>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-1 border-b-2 border-t border-ink/60" />
      </div>
    </header>
  );
}
