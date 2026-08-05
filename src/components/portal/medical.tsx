import { useState } from "react";
import { toast } from "sonner";
import { CalendarClock, ClipboardList, FileCheck2, HeartPulse, Plus, SlidersHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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

/* ── Update Medical Information ─────────────────────────────────────────── */

export function MedicalInfoPage() {
  const { medicalTips, addTip, removeTip } = usePortal();
  const [tip, setTip] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tip.trim()) return;
    addTip(tip.trim());
    toast("Tip published — it now appears in the public Medical Information section.");
    setTip("");
  };

  return (
    <PageShell
      kicker="Medical admin desk"
      title="Update Medical Information"
      desc="Everything published here appears on the public Home Page — no login required."
    >
      <Panel title="Public health tips" icon={HeartPulse}>
        <ul className="space-y-2">
          {medicalTips.map((item, i) => (
            <li key={i} className="group flex items-start gap-3 border border-ink/20 bg-paper px-3 py-2.5">
              <span className="mt-0.5 font-mono text-[10px] text-ink-soft">{i + 1}.</span>
              <p className="flex-1 text-[13px] leading-5 text-ink/90">{item}</p>
              <button onClick={() => { removeTip(i); toast("Tip removed from the public section."); }} aria-label="Remove tip" className="text-ink-soft opacity-0 transition-opacity hover:text-newsprint group-hover:opacity-100">
                <Trash2 className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={add} className="mt-4 flex gap-2">
          <Input value={tip} onChange={(e) => setTip(e.target.value)} placeholder="Add a health tip or update…" className="rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
          <Button type="submit" disabled={!tip.trim()} size="icon" className="shrink-0 rounded-sm bg-ink text-paper hover:bg-ink/90">
            <Plus className="size-4" />
          </Button>
        </form>
      </Panel>
    </PageShell>
  );
}

/* ── Manage Medical Content ─────────────────────────────────────────────── */

export function ManageContentPage() {
  const { medicalContent, addContent, removeContent, toggleContent } = usePortal();
  const [title, setTitle] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addContent(title.trim());
    toast("Content added — published by default.");
    setTitle("");
  };

  return (
    <PageShell
      kicker="Medical admin desk"
      title="Manage Medical Content"
      desc="The guides and pages shown under Medical Information on the public Home Page."
    >
      <Panel title="Public medical pages" icon={SlidersHorizontal}>
        <ul className="space-y-2">
          {medicalContent.map((c) => (
            <li key={c.id} className="flex items-center justify-between gap-3 border border-ink/20 bg-paper px-3 py-2.5">
              <p className="min-w-0 truncate text-[13px] font-medium text-ink">{c.title}</p>
              <div className="flex shrink-0 items-center gap-3">
                <span className={`font-mono text-[9.5px] uppercase tracking-[0.14em] ${c.published ? "text-pine" : "text-ink-soft"}`}>
                  {c.published ? "Published" : "Draft"}
                </span>
                <Switch checked={c.published} onCheckedChange={() => { toggleContent(c.id); toast(c.published ? "Unpublished — hidden from visitors." : "Published — visible on the Home Page."); }} className="border-ink/40 bg-ink/30 data-[state=checked]:bg-pine" />
                <button onClick={() => { removeContent(c.id); toast("Content removed."); }} aria-label="Remove content" className="text-ink-soft transition-colors hover:text-newsprint">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <form onSubmit={add} className="mt-4 flex gap-2">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a medical page or guide…" className="rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
          <Button type="submit" disabled={!title.trim()} size="icon" className="shrink-0 rounded-sm bg-ink text-paper hover:bg-ink/90">
            <Plus className="size-4" />
          </Button>
        </form>
      </Panel>
    </PageShell>
  );
}

/* ── Doctor Availability ────────────────────────────────────────────────── */

export function DoctorAvailabilityPage() {
  const { doctors, toggleDoctor } = usePortal();
  return (
    <PageShell
      kicker="Medical admin desk"
      title="Doctor Availability"
      desc="What students see when booking — switch a doctor on or off and their card updates instantly."
    >
      <Panel title="Availability roster" icon={CalendarClock}>
        <ul className="space-y-2">
          {doctors.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 border border-ink/20 bg-paper px-3 py-3">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-ink">{d.name}</p>
                <p className="text-[11.5px] text-ink-soft">{d.title} · {d.hours}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={`font-mono text-[9.5px] uppercase tracking-[0.14em] ${d.available ? "text-pine" : "text-ink-soft"}`}>
                  {d.available ? "Available" : "Away"}
                </span>
                <Switch checked={d.available} onCheckedChange={() => toggleDoctor(d.id)} className="border-ink/40 bg-ink/30 data-[state=checked]:bg-pine" />
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </PageShell>
  );
}

/* ── Appointment Management ─────────────────────────────────────────────── */

export function AppointmentsPage() {
  const { appointments, completeAppointment } = usePortal();
  return (
    <PageShell
      kicker="Medical admin desk"
      title="Appointment Management"
      desc="Bookings students made online — with reminders and status tracking."
    >
      <Panel title="Today's appointments" icon={ClipboardList}>
        <div className="overflow-x-auto">
          <Table className="min-w-[560px]">
            <TableHeader>
              <TableRow className="border-ink/30 hover:bg-transparent">
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Doctor</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Slot</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Patient</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Status</TableHead>
                <TableHead className="text-right font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id} className="border-ink/20 hover:bg-muted/60">
                  <TableCell className="py-2.5 text-[13px] font-medium text-ink">{a.doctor}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{a.date}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{a.patient}</TableCell>
                  <TableCell className="py-2.5">
                    <Badge className={`rounded-sm border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.12em] ${a.status === "booked" ? "border-newsprint/50 bg-newsprint/5 text-newsprint" : "border-pine/50 bg-pine/5 text-pine"}`}>
                      {a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2.5 text-right">
                    {a.status === "booked" ? (
                      <Button size="sm" variant="outline" onClick={() => { completeAppointment(a.id); toast("Visit marked complete — recorded."); }} className="rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper">
                        Complete
                      </Button>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pine">Done</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-[11.5px] text-ink-soft">
          Completing a visit moves it into the Visit Records ledger.
        </p>
      </Panel>
    </PageShell>
  );
}

/* ── Visit Records ──────────────────────────────────────────────────────── */

export function VisitRecordsPage() {
  const { visitRecords } = usePortal();
  return (
    <PageShell
      kicker="Medical admin desk"
      title="Visit Records"
      desc="Privacy-controlled activity log — staff can see visit flow without exposing patient details."
    >
      <Panel title="Recent visits" icon={FileCheck2}>
        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="border-ink/30 hover:bg-transparent">
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Date</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Doctor</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Patient</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Note</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitRecords.map((v) => (
                <TableRow key={v.id} className="border-ink/20 hover:bg-muted/60">
                  <TableCell className="py-2.5 text-[13px] text-ink">{v.date}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{v.doctor}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{v.patient}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{v.note}</TableCell>
                  <TableCell className="py-2.5">
                    <Badge className={`rounded-sm border px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.12em] ${v.status === "checked-in" ? "border-newsprint/50 bg-newsprint/5 text-newsprint" : "border-pine/50 bg-pine/5 text-pine"}`}>
                      {v.status}
                    </Badge>
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
