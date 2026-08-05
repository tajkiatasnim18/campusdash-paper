import { useState } from "react";
import { toast } from "sonner";
import { HeartPulse, Plus, Stethoscope, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Kicker } from "@/components/editorial";
import type { Doctor } from "@/lib/campus-data";

type Props = {
  medicalTips: string[];
  doctors: Doctor[];
  medicalBooked: { doctor: string; date: string } | null;
  onToggleDoctor: (id: number) => void;
  onAddTip: (tip: string) => void;
  onRemoveTip: (index: number) => void;
};

export function MedicalAdminDesk({ medicalTips, doctors, medicalBooked, onToggleDoctor, onAddTip, onRemoveTip }: Props) {
  const [tip, setTip] = useState("");

  const addTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tip.trim()) return;
    onAddTip(tip.trim());
    toast("Tip published — it now appears in the public Medical Information section.");
    setTip("");
  };

  return (
    <div className="space-y-10">
      <div>
        <Kicker>Medical admin desk — the clinic office</Kicker>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Keep the campus healthy.
        </h2>
        <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-ink-soft">
          Everything you publish here appears on the public Home Page — no login required — and
          availability controls what students can book.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Public medical info */}
        <section className="border border-ink/30 bg-sheet p-5">
          <div className="flex items-center justify-between border-b border-ink/20 pb-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
              Update medical information — public
            </p>
            <HeartPulse className="size-4 text-newsprint" />
          </div>
          <p className="mt-3 text-[11.5px] leading-5 text-ink-soft">
            Shows on the Home Page under “Medical Information (Public)”. Visitors read it; students
            can also book appointments.
          </p>
          <ul className="mt-4 space-y-2">
            {medicalTips.map((item, i) => (
              <li key={i} className="group flex items-start gap-3 border border-ink/20 bg-paper px-3 py-2.5">
                <span className="mt-0.5 font-mono text-[10px] text-ink-soft">{i + 1}.</span>
                <p className="flex-1 text-[13px] leading-5 text-ink/90">{item}</p>
                <button
                  onClick={() => onRemoveTip(i)}
                  aria-label="Remove tip"
                  className="text-ink-soft opacity-0 transition-opacity hover:text-newsprint group-hover:opacity-100"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
          <form onSubmit={addTip} className="mt-4 flex gap-2">
            <Input
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              placeholder="Add a health tip or update…"
              className="rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
            />
            <Button
              type="submit"
              disabled={!tip.trim()}
              size="icon"
              className="shrink-0 rounded-sm bg-ink text-paper hover:bg-ink/90"
            >
              <Plus className="size-4" />
            </Button>
          </form>
        </section>

        {/* Doctor availability */}
        <section className="border border-ink/30 bg-sheet p-5">
          <div className="flex items-center justify-between border-b border-ink/20 pb-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
              Doctor availability — drives student booking
            </p>
            <Stethoscope className="size-4 text-ink/40" />
          </div>
          <ul className="mt-4 space-y-2">
            {doctors.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 border border-ink/20 bg-paper px-3 py-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-ink">{d.name}</p>
                  <p className="text-[11.5px] text-ink-soft">{d.title} · {d.hours}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className={`font-mono text-[9.5px] uppercase tracking-[0.14em] ${
                      d.available ? "text-pine" : "text-ink-soft"
                    }`}
                  >
                    {d.available ? "Available" : "Away"}
                  </span>
                  <Switch
                    checked={d.available}
                    onCheckedChange={() => onToggleDoctor(d.id)}
                    className="border-ink/40 bg-ink/30 data-[state=checked]:bg-pine"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-dashed border-ink/30 pt-3">
            {medicalBooked ? (
              <p className="text-[12.5px] leading-6 text-ink">
                Latest appointment: <span className="font-medium text-ink">{medicalBooked.doctor}</span> —{" "}
                {medicalBooked.date}. A reminder has been sent to the student.
              </p>
            ) : (
              <p className="text-[12.5px] leading-6 text-ink-soft">
                No appointments booked yet — availability you switch on will appear to students
                immediately.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
