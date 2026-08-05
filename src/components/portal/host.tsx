import { useState } from "react";
import { toast } from "sonner";
import {
  Banknote,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Megaphone,
  PlusCircle,
  UserCog,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageShell, Panel, Label } from "@/components/portal/parts";
import { usePortal } from "@/components/portal/portal-context";
import { cn } from "@/lib/utils";

/* ── Create Events ──────────────────────────────────────────────────────── */

export function CreateEventsPage() {
  const { clubs, addEvent } = usePortal();
  const [club, setClub] = useState(clubs[0]?.name ?? "AI & Robotics Club");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !venue.trim()) return;
    addEvent({ club, title: title.trim(), date: date.trim(), venue: venue.trim(), price: Number(price) || 0, capacity: Number(capacity) || 100 });
    toast(`“${title.trim()}” published — students can now register.`);
    setTitle(""); setDate(""); setVenue(""); setPrice(""); setCapacity("");
  };

  return (
    <PageShell
      kicker="Event host desk"
      title="Create Events"
      desc="Publish a club event with venue, date, fee, and capacity — it appears on the student Event Registration page instantly."
    >
      <Panel title="New event" icon={PlusCircle} className="max-w-2xl">
        <form onSubmit={publish} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Club</Label>
              <Input value={club} onChange={(e) => setClub(e.target.value)} className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div>
              <Label>Date</Label>
              <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. 18 Sep 2026" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
          </div>
          <div>
            <Label>Event title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. AI Workshop — Hands-on with LangChain" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
          </div>
          <div>
            <Label>Venue</Label>
            <Input value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="e.g. Lab 3, CSE Building" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Fee (৳, 0 = free)</Label>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min={0} placeholder="0" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div>
              <Label>Capacity</Label>
              <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} type="number" min={1} placeholder="100" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
          </div>
          <Button type="submit" disabled={!title.trim() || !date.trim() || !venue.trim()} className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
            <PlusCircle className="size-3.5" /> Publish to students
          </Button>
        </form>
      </Panel>
    </PageShell>
  );
}

/* ── Event Registration (host) ──────────────────────────────────────────── */

export function RegistrationsPage() {
  const { events, registerEvent } = usePortal();
  return (
    <PageShell
      kicker="Event host desk"
      title="Event Registration"
      desc="Live registration ledger — see demand across every published event."
    >
      <Panel title="Registrations ledger" icon={ClipboardCheck}>
        <div className="overflow-x-auto">
          <Table className="min-w-[640px]">
            <TableHeader>
              <TableRow className="border-ink/30 hover:bg-transparent">
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Event</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Club</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Date · venue</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Fee</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Registered</TableHead>
                <TableHead className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e) => {
                const full = e.registered >= e.capacity;
                return (
                  <TableRow key={e.id} className="border-ink/20 hover:bg-muted/60">
                    <TableCell className="py-3 text-[13px] font-medium text-ink">{e.title}</TableCell>
                    <TableCell className="py-3 text-[13px] text-ink-soft">{e.club}</TableCell>
                    <TableCell className="py-3 text-[13px] text-ink-soft">{e.date} · {e.venue}</TableCell>
                    <TableCell className="py-3 text-[13px] text-ink-soft">{e.price === 0 ? "Free" : `৳${e.price}`}</TableCell>
                    <TableCell className="py-3 text-[13px] text-ink">{e.registered} / {e.capacity}</TableCell>
                    <TableCell className="py-3 text-right">
                      <Button size="sm" variant="outline" disabled={full} onClick={() => { registerEvent(e.id); toast("Registration added to the ledger."); }} className="rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper">
                        {full ? "Full" : "+1 reg"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </PageShell>
  );
}

/* ── Online Payment (host) ──────────────────────────────────────────────── */

export function HostPaymentsPage() {
  const { payments } = usePortal();
  const collected = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  return (
    <PageShell
      kicker="Event host desk"
      title="Online Payment"
      desc="Every student payment lands here — bKash and Rocket, reconciled against the ledger."
    >
      <Panel title="Payment records" icon={Banknote}>
        <p className="mb-3 border border-ink/20 bg-paper px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          Collected: <span className="text-pine">৳{collected.toLocaleString()}</span>
        </p>
        <div className="overflow-x-auto">
          <Table className="min-w-[560px]">
            <TableHeader>
              <TableRow className="border-ink/30 hover:bg-transparent">
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Event</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Club</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Amount</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Method</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id} className="border-ink/20 hover:bg-muted/60">
                  <TableCell className="py-2.5 text-[13px] font-medium text-ink">{p.event}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{p.club}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink">৳{p.amount}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{p.method}</TableCell>
                  <TableCell className="py-2.5">
                    <span className={cn("font-mono text-[9.5px] uppercase tracking-[0.12em]", p.status === "paid" ? "text-pine" : "text-newsprint")}>
                      {p.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </PageShell>
  );
}

/* ── Member Management ──────────────────────────────────────────────────── */

export function MembersPage() {
  const { clubs } = usePortal();
  return (
    <PageShell
      kicker="Event host desk"
      title="Member Management"
      desc="Club member lists and roles — admin versus member — for every club you host."
    >
      <Panel title="Club rosters" icon={UserCog}>
        <ul className="space-y-2">
          {clubs.map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-3 border border-ink/20 bg-paper px-3 py-3">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink">{c.name}</p>
                <p className="text-[11.5px] text-ink-soft">{c.members} members</p>
              </div>
              <span className={cn("font-mono text-[10px] uppercase tracking-[0.14em]", c.role === "Admin" ? "text-newsprint" : "text-ink-soft")}>
                {c.role}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-dashed border-ink/30 pt-2 text-[11.5px] text-ink-soft">
          Roles control who can publish events and announcements within each club dashboard.
        </p>
      </Panel>
    </PageShell>
  );
}

/* ── Finance Tracking ───────────────────────────────────────────────────── */

export function FinancePage() {
  const { events } = usePortal();
  const revenue = events.reduce((s, e) => s + e.price * e.registered, 0);
  const expenses = 12000;
  const net = revenue - expenses;

  return (
    <PageShell
      kicker="Event host desk"
      title="Finance Tracking"
      desc="The ledger never drifts — collected is computed live from registrations × fee."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="border border-ink/30 bg-sheet p-5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Collected</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">৳{revenue.toLocaleString()}</p>
        </div>
        <div className="border border-ink/30 bg-sheet p-5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Expenses</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink-soft">৳{expenses.toLocaleString()}</p>
        </div>
        <div className="border border-ink/30 bg-sheet p-5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Net</p>
          <p className={cn("mt-1 font-display text-3xl font-bold", net >= 0 ? "text-pine" : "text-newsprint")}>
            ৳{net.toLocaleString()}
          </p>
        </div>
      </div>
      <Panel title="Per-event breakdown" icon={Wallet}>
        <ul className="space-y-2">
          {events.map((e) => (
            <li key={e.id} className="flex items-center justify-between gap-3 border border-ink/20 bg-paper px-3 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-ink">{e.title}</p>
                <p className="text-[11.5px] text-ink-soft">{e.registered} registrations</p>
              </div>
              <span className="font-mono text-[11px] text-ink">৳{(e.price * e.registered).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </PageShell>
  );
}

/* ── Club Announcements ─────────────────────────────────────────────────── */

export function AnnouncementsPage() {
  const { clubs, announcements, addAnnouncement } = usePortal();
  const [club, setClub] = useState(clubs[0]?.name ?? "AI & Robotics Club");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addAnnouncement({ club, title: title.trim(), body: body.trim() });
    toast("Announcement sent — students see it on their Club Dashboard and Notifications.");
    setTitle(""); setBody("");
  };

  return (
    <PageShell
      kicker="Event host desk"
      title="Club Announcements"
      desc="Reach every club member from one place — announcements land in their dashboards."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Write an announcement" icon={Megaphone}>
          <form onSubmit={publish} className="space-y-4">
            <div>
              <Label>Club</Label>
              <Input value={club} onChange={(e) => setClub(e.target.value)} className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div>
              <Label>Headline</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Workshop moved to Friday" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div>
              <Label>Body</Label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} placeholder="What members need to know…" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <Button type="submit" disabled={!title.trim() || !body.trim()} className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
              <Megaphone className="size-3.5" /> Send announcement
            </Button>
          </form>
        </Panel>
        <Panel title="Recent announcements" icon={CalendarDays}>
          <ul className="space-y-2">
            {announcements.map((a) => (
              <li key={a.id} className="border border-ink/20 bg-paper px-3 py-3">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-newsprint">{a.club} · {a.date}</p>
                <p className="mt-1 text-[13px] font-medium leading-snug text-ink">{a.title}</p>
                <p className="mt-1 text-[12.5px] leading-5 text-ink-soft">{a.body}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}

/* ── Event Analytics ────────────────────────────────────────────────────── */

export function AnalyticsPage() {
  const { events } = usePortal();
  const maxRegistered = Math.max(...events.map((e) => e.registered), 1);
  const revenue = events.reduce((s, e) => s + e.price * e.registered, 0);

  return (
    <PageShell
      kicker="Event host desk"
      title="Event Analytics"
      desc="Demand at a glance — fill rate per event and total revenue."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="border border-ink/30 bg-sheet p-5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Events published</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">{events.length}</p>
        </div>
        <div className="border border-ink/30 bg-sheet p-5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Total registrations</p>
          <p className="mt-1 font-display text-3xl font-bold text-ink">{events.reduce((s, e) => s + e.registered, 0)}</p>
        </div>
        <div className="border border-ink/30 bg-sheet p-5">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Projected revenue</p>
          <p className="mt-1 font-display text-3xl font-bold text-pine">৳{revenue.toLocaleString()}</p>
        </div>
      </div>
      <Panel title="Fill rate by event" icon={BarChart3}>
        <ul className="space-y-4">
          {events.map((e) => {
            const pct = Math.round((e.registered / e.capacity) * 100);
            return (
              <li key={e.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate text-[13px] font-medium text-ink">{e.title}</p>
                  <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                    {e.registered}/{e.capacity} · {pct}%
                  </p>
                </div>
                <div className="mt-1.5 h-2.5 w-full bg-ink/10">
                  <div className="h-full bg-ink transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 border-t border-dashed border-ink/30 pt-3 text-[11.5px] text-ink-soft">
          Bars show fill rate; events at 100% are sold out. Compare across clubs to plan capacity.
        </p>
      </Panel>
    </PageShell>
  );
}
