import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Bell,
  Bus,
  CalendarDays,
  Check,
  FileText,
  MapPin,
  NotebookPen,
  Search,
  Sparkles,
  Stethoscope,
  Ticket,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Kicker } from "@/components/editorial";
import { cn } from "@/lib/utils";
import type { BusRoute, CampusEvent, Doctor, DriveFile, MealState, Notice } from "@/lib/campus-data";

function Card({ title, icon: Icon, children, className }: { title: string; icon: React.ElementType; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("flex flex-col border border-ink/30 bg-sheet p-5", className)}>
      <div className="flex items-center justify-between border-b border-ink/20 pb-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">{title}</p>
        <Icon className="size-4 text-ink/40" />
      </div>
      <div className="flex flex-1 flex-col pt-4">{children}</div>
    </section>
  );
}

function FakeQr({ seed }: { seed: string }) {
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

type Props = {
  userName?: string;
  notices: Notice[];
  events: CampusEvent[];
  meal: MealState;
  doctors: Doctor[];
  routes: BusRoute[];
  files: DriveFile[];
  transportBooked: { route: string; seat: string; departs: string } | null;
  medicalBooked: { doctor: string; date: string } | null;
  onClaimMeal: () => void;
  onBookTransport: (routeId: number) => void;
  onBookMedical: (doctorId: number) => void;
  onRegisterEvent: (eventId: number) => void;
};

export function StudentHub({
  userName,
  notices,
  events,
  meal,
  doctors,
  routes,
  files,
  transportBooked,
  medicalBooked,
  onClaimMeal,
  onBookTransport,
  onBookMedical,
  onRegisterEvent,
}: Props) {
  const [noticeQuery, setNoticeQuery] = useState("");
  const [fileQuery, setFileQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiReply, setAiReply] = useState<string | null>(null);

  const ratio = Math.round((meal.claimed / meal.total) * 100);
  const filteredNotices = notices.filter((n) =>
    (n.title + n.category + n.body).toLowerCase().includes(noticeQuery.toLowerCase()),
  );
  const filteredFiles = files.filter((f) =>
    (f.name + f.folder).toLowerCase().includes(fileQuery.toLowerCase()),
  );

  const askAi = (q: string) => {
    const query = q.toLowerCase();
    if (query.includes("midterm") || query.includes("exam")) {
      const notice = notices.find((n) => n.category === "Exams");
      setAiReply(
        notice
          ? `Found it — “${notice.title}” (${notice.date}). Exams begin Monday 10 August; hall tickets arrive Friday. Want a summary of the full routine?`
          : "I don't see an exam notice yet — check back after the registrar publishes the routine.",
      );
    } else if (query.includes("meal") || query.includes("lunch")) {
      setAiReply(
        `The lunch counter shows ${meal.claimed} of ${meal.total} slots claimed (${ratio}%). You can claim a ticket from the Meal card on this page.`,
      );
    } else if (query.includes("bus") || query.includes("transport")) {
      setAiReply("Route 1 (Campus ⇄ Uttara) departs 7:00 and 14:30. Book a seat from the Transport card — digital QR ticket included.");
    } else if (query.includes("club") || query.includes("event")) {
      setAiReply("Clubs publish events from the Event Host desk. Right now TechNova 2026 has 214 of 400 seats registered — join from the Events card.");
    } else {
      setAiReply("Here's a start: notices live under the hub feed, files under the Notes Drive, and every booking card shows live counters. Ask me about midterms, meals, buses, or events.");
    }
  };

  return (
    <div className="space-y-10">
      {/* Greeting strip */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker>Student desk — the morning edition</Kicker>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Good morning{userName ? `, ${userName.split(" ")[0]}` : ""}.
          </h2>
          <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-ink-soft">
            Today's campus at a glance — live counters for meals, seats, and the clinic, plus the
            official notices you can't miss.
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          5 August 2026 · Fall term, week 1
        </span>
      </div>

      {/* Row 1 — the three live bookings */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Meal */}
        <Card title="Meal ticket — live ratio" icon={Utensils}>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold text-ink">{meal.claimed}</span>
            <span className="font-display text-lg text-ink-soft">/ {meal.total} claimed</span>
          </div>
          <div className="mt-3 h-2 w-full bg-ink/15">
            <div className="h-full bg-ink transition-all duration-500" style={{ width: `${ratio}%` }} />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
            {meal.total - meal.claimed} slots remaining today
          </p>
          <div className="mt-auto pt-5">
            {meal.claimed >= meal.total ? (
              <Button disabled className="w-full rounded-sm font-mono text-[11px] uppercase tracking-[0.14em]">
                All slots claimed
              </Button>
            ) : (
              <Button
                onClick={onClaimMeal}
                className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.14em] text-paper hover:bg-ink/90"
              >
                <Ticket className="size-3.5" /> Claim today's ticket
              </Button>
            )}
            <p className="mt-2 text-center text-[11px] text-ink-soft">Cafeteria sees demand in real time.</p>
          </div>
        </Card>

        {/* Transport */}
        <Card title="Transport — seat booking" icon={Bus}>
          {transportBooked ? (
            <div className="flex items-center gap-4">
              <FakeQr seed={transportBooked.seat} />
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-pine">
                  <Check className="size-3" /> Seat confirmed
                </p>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{transportBooked.route}</p>
                <p className="mt-1 text-[12px] text-ink-soft">
                  {transportBooked.seat} · departs {transportBooked.departs}
                </p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                  Show QR at boarding
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[12.5px] leading-5 text-ink-soft">
                Pick a route and book a seat — capacity-aware, digital ticket on boarding.
              </p>
              <ul className="mt-3 space-y-2">
                {routes.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-2 border border-ink/20 bg-paper px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-[12.5px] font-medium text-ink">{r.name}</p>
                      <p className="text-[11px] text-ink-soft">{r.free} seats free · {r.departs}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={r.free === 0}
                      onClick={() => onBookTransport(r.id)}
                      className="shrink-0 rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
                    >
                      {r.free === 0 ? "Full" : "Book"}
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>

        {/* Medical */}
        <Card title="Medical — appointment" icon={Stethoscope}>
          {medicalBooked ? (
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center border border-pine/50 bg-pine/10">
                <Check className="size-5 text-pine" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-pine">Appointment booked</p>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{medicalBooked.doctor}</p>
                <p className="text-[12px] text-ink-soft">{medicalBooked.date} · reminder sent</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[12.5px] leading-5 text-ink-soft">Doctor availability today — book a slot online.</p>
              <ul className="mt-3 space-y-2">
                {doctors.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-2 border border-ink/20 bg-paper px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-[12.5px] font-medium text-ink">{d.name}</p>
                      <p className="text-[11px] text-ink-soft">{d.hours}</p>
                    </div>
                    {d.available ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onBookMedical(d.id)}
                        className="shrink-0 rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
                      >
                        Book
                      </Button>
                    ) : (
                      <Badge variant="outline" className="shrink-0 rounded-sm border-ink/30 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
                        Away
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>

      {/* Row 2 — notices + events */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Official notice hub" icon={Bell} className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
            <Input
              value={noticeQuery}
              onChange={(e) => setNoticeQuery(e.target.value)}
              placeholder="Search notices, categories, content…"
              className="rounded-sm border-ink/30 bg-paper pl-8 font-serif text-[13px]"
            />
          </div>
          <ul className="mt-4 space-y-0 border border-ink/20">
            {filteredNotices.map((n) => (
              <li key={n.id} className="border-b border-ink/15 px-4 py-3 last:border-b-0">
                <div className="flex flex-wrap items-center gap-2">
                  {n.urgent && (
                    <Badge className="rounded-sm border-transparent bg-newsprint font-mono text-[9px] uppercase tracking-[0.14em] text-paper">
                      Urgent
                    </Badge>
                  )}
                  <Badge variant="outline" className="rounded-sm border-ink/30 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                    {n.category}
                  </Badge>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">{n.date}</span>
                </div>
                <p className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink">{n.title}</p>
                <p className="mt-1 text-[12.5px] leading-5 text-ink-soft">{n.body}</p>
                <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">— {n.author}</p>
              </li>
            ))}
            {filteredNotices.length === 0 && (
              <li className="px-4 py-6 text-center text-[12.5px] text-ink-soft">No notices match “{noticeQuery}”.</li>
            )}
          </ul>
        </Card>

        <Card title="Upcoming events" icon={CalendarDays}>
          <ul className="space-y-3">
            {events.map((e) => {
              const full = e.registered >= e.capacity;
              return (
                <li key={e.id} className="border border-ink/20 bg-paper px-3 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-newsprint">{e.club}</p>
                      <p className="mt-0.5 text-[13px] font-medium leading-snug text-ink">{e.title}</p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-ink-soft">
                        <MapPin className="size-3" /> {e.venue} · {e.date}
                      </p>
                      <p className="mt-0.5 text-[11px] text-ink-soft">
                        {e.registered} / {e.capacity} registered · {e.price === 0 ? "free" : `${e.price} ৳`}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={full}
                    onClick={() => onRegisterEvent(e.id)}
                    className="mt-2 w-full rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
                  >
                    {full ? "Full" : "Register"}
                  </Button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 border-t border-dashed border-ink/30 pt-2 text-[11px] leading-5 text-ink-soft">
            Events are published by club hosts from the Event Management desk.
          </p>
        </Card>
      </div>

      {/* Row 3 — notes drive + AI */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="PDF & notes drive" icon={FileText} className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
            <Input
              value={fileQuery}
              onChange={(e) => setFileQuery(e.target.value)}
              placeholder="Search files — content-aware, not just names…"
              className="rounded-sm border-ink/30 bg-paper pl-8 font-serif text-[13px]"
            />
          </div>
          <ul className="mt-4 space-y-2">
            {filteredFiles.map((f) => (
              <li key={f.id} className="flex items-center gap-3 border border-ink/20 bg-paper px-3 py-2.5">
                {f.kind === "pdf" ? (
                  <FileText className="size-4 shrink-0 text-newsprint" />
                ) : (
                  <NotebookPen className="size-4 shrink-0 text-pine" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{f.name}</p>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">{f.folder} · {f.size}</p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
                  {f.kind === "pdf" ? "PDF" : "Note"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-5 text-ink-soft">
            Folders, sharing, AI tagging and PDF export live here — teacher-shared materials appear
            in this drive automatically.
          </p>
        </Card>

        <Card title="Campus AI assistant" icon={Sparkles}>
          <div className="flex gap-2">
            <Input
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && aiQuery.trim()) askAi(aiQuery);
              }}
              placeholder="Ask about midterms, meals, buses…"
              className="rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
            />
            <Button
              size="icon"
              onClick={() => aiQuery.trim() && askAi(aiQuery)}
              className="shrink-0 rounded-sm bg-ink text-paper hover:bg-ink/90"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
          {aiReply ? (
            <div className="mt-4 flex-1 border border-ink/25 bg-paper p-4">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-newsprint">AI · campus edition</p>
              <p className="mt-2 text-[13px] leading-6 text-ink/90">{aiReply}</p>
            </div>
          ) : (
            <div className="mt-4 flex-1 border border-dashed border-ink/30 bg-paper p-4">
              <p className="text-[12px] leading-5 text-ink-soft">Try:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["When are midterms?", "Meal counter?", "Bus to Uttara?", "Any club events?"].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setAiQuery(q);
                      askAi(q);
                    }}
                    className="border border-ink/30 px-2 py-1 text-[11px] text-ink-soft transition-colors hover:bg-ink hover:text-paper"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
