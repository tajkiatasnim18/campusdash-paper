import { toast } from "sonner";
import { Bus, Check, Stethoscope, Ticket, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageShell, Panel, FakeQr } from "@/components/portal/parts";
import { usePortal } from "@/components/portal/portal-context";

/* ── Medical Appointment ────────────────────────────────────────────────── */

export function MedicalPage() {
  const { doctors, appointments, bookMedical } = usePortal();
  const mine = [...appointments].reverse().find((a) => a.patient === "You");

  return (
    <PageShell
      kicker="Campus medical center"
      title="Medical Appointment"
      desc="View doctor availability, book a slot online, and get a reminder so you never miss it."
    >
      {mine && (
        <div className="flex items-center gap-3 border border-pine/50 bg-pine/5 p-4">
          <span className="flex size-10 items-center justify-center border border-pine/50 bg-pine/10">
            <Check className="size-5 text-pine" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-pine">Appointment booked</p>
            <p className="font-display text-lg font-semibold leading-snug text-ink">{mine.doctor}</p>
            <p className="text-[12px] text-ink-soft">{mine.date} · reminder sent to your notifications</p>
          </div>
        </div>
      )}
      <Panel title="Doctor availability — today" icon={Stethoscope}>
        <ul className="space-y-2">
          {doctors.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-2 border border-ink/20 bg-paper px-3 py-2.5">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink">{d.name}</p>
                <p className="text-[11.5px] text-ink-soft">{d.title} · {d.hours}</p>
              </div>
              {d.available ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { bookMedical(d.id); toast.success(`Appointment with ${d.name} booked — reminder will follow.`); }}
                  className="shrink-0 rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
                >
                  Book
                </Button>
              ) : (
                <Badge variant="outline" className="shrink-0 rounded-sm border-ink/30 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">Away</Badge>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-dashed border-ink/30 pt-2 text-[11.5px] text-ink-soft">
          The Medical Admin keeps this availability current. Public preview on the Home Page shows
          availability only — booking needs login.
        </p>
      </Panel>
    </PageShell>
  );
}

/* ── Transport Ticket ───────────────────────────────────────────────────── */

export function TransportPage() {
  const { routes, transportBooked, bookTransport } = usePortal();

  return (
    <PageShell
      kicker="Campus transport"
      title="Transport Ticket"
      desc="Clear routes and schedules, capacity-aware seat booking, and a digital QR ticket for boarding."
    >
      <Panel title="Seat booking" icon={Bus}>
        {transportBooked ? (
          <div className="flex items-center gap-5">
            <FakeQr seed={transportBooked.seat} />
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-pine">
                <Check className="size-3" /> Seat confirmed
              </p>
              <p className="mt-1 font-display text-xl font-semibold leading-snug text-ink">{transportBooked.route}</p>
              <p className="mt-1 text-[12.5px] text-ink-soft">{transportBooked.seat} · departs {transportBooked.departs}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">Show QR at boarding — bus tracking live on route</p>
            </div>
          </div>
        ) : (
          <>
            <ul className="space-y-2">
              {routes.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-2 border border-ink/20 bg-paper px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-ink">{r.name}</p>
                    <p className="text-[11.5px] text-ink-soft">{r.stops}</p>
                    <p className="text-[11px] text-ink-soft">{r.free} seats free · departs {r.departs}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={r.free === 0}
                    onClick={() => { bookTransport(r.id); toast.success(`Seat confirmed on ${r.name} — QR ticket ready.`); }}
                    className="shrink-0 rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
                  >
                    {r.free === 0 ? "Full" : "Book"}
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-dashed border-ink/30 pt-2 text-[11.5px] text-ink-soft">
              Capacity-aware: live seat counts come straight from the transport desk.
            </p>
          </>
        )}
      </Panel>
    </PageShell>
  );
}

/* ── Meal Ticket ────────────────────────────────────────────────────────── */

export function MealPage() {
  const { meal, claimMeal } = usePortal();
  const ratio = Math.round((meal.claimed / meal.total) * 100);

  return (
    <PageShell
      kicker="Cafeteria desk"
      title="Meal Ticket"
      desc="Digital meal tickets with a live counter — remaining slots vs. claimed, updated in real time."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Live meal ratio" icon={Utensils}>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-bold text-ink">{meal.claimed}</span>
            <span className="font-display text-xl text-ink-soft">/ {meal.total} claimed</span>
          </div>
          <div className="mt-4 h-2.5 w-full bg-ink/15">
            <div className="h-full bg-ink transition-all duration-500" style={{ width: `${ratio}%` }} />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            {meal.total - meal.claimed} slots remaining today
          </p>
          <div className="mt-auto pt-5">
            {meal.claimed >= meal.total ? (
              <Button disabled className="w-full rounded-sm font-mono text-[11px] uppercase tracking-[0.14em]">All slots claimed</Button>
            ) : (
              <Button
                onClick={() => { claimMeal(); toast.success("Lunch ticket claimed — show it at the counter."); }}
                className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.14em] text-paper hover:bg-ink/90"
              >
                <Ticket className="size-3.5" /> Claim today's ticket
              </Button>
            )}
          </div>
        </Panel>
        <Panel title="How it works" icon={Ticket}>
          <ul className="space-y-2 text-[12.5px] leading-5 text-ink/90">
            <li className="flex gap-2"><span className="font-mono text-[10px] text-newsprint">1.</span> Claim your ticket before lunch — the counter updates live.</li>
            <li className="flex gap-2"><span className="font-mono text-[10px] text-newsprint">2.</span> Show the ticket at the counter; no paper coupons.</li>
            <li className="flex gap-2"><span className="font-mono text-[10px] text-newsprint">3.</span> The cafeteria sees demand in real time and plans portions — less waste.</li>
          </ul>
          <p className="mt-auto border-t border-dashed border-ink/30 pt-3 text-[11.5px] text-ink-soft">
            {meal.lastTicket ? `Last claimed ticket: ${meal.lastTicket}.` : "You haven't claimed a ticket today yet."}
          </p>
        </Panel>
      </div>
    </PageShell>
  );
}
