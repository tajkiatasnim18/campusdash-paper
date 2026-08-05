import { useState } from "react";
import { toast } from "sonner";
import { CalendarDays, Plus, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kicker } from "@/components/editorial";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CampusEvent, Club } from "@/lib/campus-data";

type Props = {
  events: CampusEvent[];
  clubs: Club[];
  onAddEvent: (e: { club: string; title: string; date: string; venue: string; price: number; capacity: number }) => void;
  onRegisterEvent: (eventId: number) => void;
};

export function EventHostDesk({ events, clubs, onAddEvent, onRegisterEvent }: Props) {
  const [club, setClub] = useState(clubs[0]?.name ?? "AI & Robotics Club");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    const p = Number(price) || 0;
    const cap = Number(capacity) || 100;
    if (!title.trim() || !date.trim() || !venue.trim()) return;
    onAddEvent({ club, title: title.trim(), date: date.trim(), venue: venue.trim(), price: p, capacity: cap });
    toast(`“${title.trim()}” published — students can now register.`);
    setTitle("");
    setDate("");
    setVenue("");
    setPrice("");
    setCapacity("");
  };

  const revenue = events.reduce((sum, e) => sum + e.price * e.registered, 0);
  const expenses = 12000;
  const net = revenue - expenses;

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker>Event host desk — the events room</Kicker>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Run the clubs. Run the show.
          </h2>
          <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-ink-soft">
            Event management lives here, in its own role after “Identify User Role”. Hosts are all
            students — you keep the full Student Section on the next tab over.
          </p>
        </div>
        <span className="border border-ink/40 bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          Hosts keep student access
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Create event */}
        <section className="border border-ink/30 bg-sheet p-5">
          <div className="flex items-center justify-between border-b border-ink/20 pb-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
              Create &amp; publish an event
            </p>
            <CalendarDays className="size-4 text-ink/40" />
          </div>
          <form onSubmit={publish} className="space-y-4 pt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Club</label>
                <Input
                  value={club}
                  onChange={(e) => setClub(e.target.value)}
                  className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
                />
              </div>
              <div>
                <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Date</label>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. 18 Sep 2026"
                  className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Event title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI Workshop — Hands-on with LangChain"
                className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
              />
            </div>
            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Venue</label>
              <Input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Lab 3, CSE Building"
                className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Fee (৳, 0 = free)</label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  min={0}
                  placeholder="0"
                  className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
                />
              </div>
              <div>
                <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Capacity</label>
                <Input
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  type="number"
                  min={1}
                  placeholder="100"
                  className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={!title.trim() || !date.trim() || !venue.trim()}
              className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90"
            >
              <Plus className="size-3.5" /> Publish to students
            </Button>
          </form>
        </section>

        {/* Finance */}
        <section className="border border-ink/30 bg-sheet p-5">
          <div className="flex items-center justify-between border-b border-ink/20 pb-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
              Finance tracking
            </p>
            <Wallet className="size-4 text-ink/40" />
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-px border border-ink/20 bg-ink/15">
            <div className="bg-paper p-4">
              <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Collected</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">৳{revenue.toLocaleString()}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Expenses</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink-soft">৳{expenses.toLocaleString()}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Net</dt>
              <dd className={`mt-1 font-display text-2xl font-bold ${net >= 0 ? "text-pine" : "text-newsprint"}`}>
                ৳{net.toLocaleString()}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-[12px] leading-5 text-ink-soft">
            Collected is computed live from registrations × fee, so the ledger never drifts from
            the published events.
          </p>
          <div className="mt-4 border-t border-dashed border-ink/30 pt-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Clubs &amp; member roles</p>
            <ul className="mt-2 space-y-1.5">
              {clubs.map((c) => (
                <li key={c.name} className="flex items-center justify-between text-[12.5px]">
                  <span className="text-ink">{c.name}</span>
                  <span className="flex items-center gap-2 text-ink-soft">
                    <Users className="size-3" /> {c.members} ·{" "}
                    <span className={c.role === "Admin" ? "font-semibold text-newsprint" : ""}>{c.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Events ledger */}
      <section className="border border-ink/30 bg-sheet p-5">
        <div className="flex items-center justify-between border-b border-ink/20 pb-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
            Events ledger — registrations
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{events.length} published</span>
        </div>
        <div className="mt-4 overflow-x-auto">
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
                    <TableCell className="py-3 text-[13px] text-ink">
                      {e.registered} / {e.capacity}
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={full}
                        onClick={() => onRegisterEvent(e.id)}
                        className="rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
                      >
                        {full ? "Full" : "+1 reg"}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
