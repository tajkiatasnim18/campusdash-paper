import { useState } from "react";
import { toast } from "sonner";
import { Award, BellRing, CheckCircle2, FileText, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/utils";
import { PageShell, Panel, Label } from "@/components/portal/parts";
import { usePortal, type NotificationItem } from "@/components/portal/portal-context";

/* ── Notice Hub ─────────────────────────────────────────────────────────── */

export function NoticeHub({ faculty = false }: { faculty?: boolean }) {
  const { notices, publishNotice } = usePortal();
  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [urgent, setUrgent] = useState(false);

  const filtered = notices.filter((n) =>
    (n.title + n.category + n.body).toLowerCase().includes(query.toLowerCase()),
  );

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    publishNotice({ title: title.trim(), category: category.trim() || "General", body: body.trim(), urgent });
    toast(urgent ? "Urgent notice published to the hub." : "Notice published to the hub.");
    setTitle(""); setCategory(""); setBody(""); setUrgent(false);
  };

  return (
    <PageShell
      kicker={faculty ? "Faculty desk — publish" : "Student desk — stay informed"}
      title={faculty ? "Notice Hub — publish official notices" : "Notice Hub"}
      desc="One official feed for exam schedules, results, circulars, and announcements — with categories, search, and urgent alerts."
    >
      {faculty && (
        <Panel title="Publish an official notice" icon={Sparkles}>
          <form onSubmit={publish} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <Label>Headline</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Make-up class — CSE 201, Friday 3 pm" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
              </div>
              <div>
                <Label>Category</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Exams · Results · General …" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
              </div>
            </div>
            <div>
              <Label>Body</Label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={3} placeholder="Students see this immediately in the hub." className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-ink">
                <Checkbox checked={urgent} onCheckedChange={(v) => setUrgent(v === true)} className="rounded-none border-ink/50" />
                Mark as urgent — red alert
              </label>
              <Button type="submit" disabled={!title.trim() || !body.trim()} className="rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
                Set in print
              </Button>
            </div>
          </form>
        </Panel>
      )}

      <Panel title="Official feed" icon={BellRing}>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notices, categories, content…" className="rounded-sm border-ink/30 bg-paper pl-8 font-serif text-[13px]" />
        </div>
        <ul className="mt-4 space-y-0 border border-ink/20">
          {filtered.map((n) => (
            <li key={n.id} className="border-b border-ink/15 px-4 py-3 last:border-b-0">
              <div className="flex flex-wrap items-center gap-2">
                {n.urgent && <Badge className="rounded-sm border-transparent bg-newsprint font-mono text-[9px] uppercase tracking-[0.14em] text-paper">Urgent</Badge>}
                <Badge variant="outline" className="rounded-sm border-ink/30 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">{n.category}</Badge>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">{n.date}</span>
              </div>
              <p className="mt-1.5 font-display text-[15px] font-semibold leading-snug text-ink">{n.title}</p>
              <p className="mt-1 text-[12.5px] leading-5 text-ink-soft">{n.body}</p>
              <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">— {n.author}</p>
            </li>
          ))}
          {filtered.length === 0 && <li className="px-4 py-6 text-center text-[12.5px] text-ink-soft">No notices match “{query}”.</li>}
        </ul>
      </Panel>
    </PageShell>
  );
}

/* ── Notifications ──────────────────────────────────────────────────────── */

export function NotificationsPage() {
  const { notifications } = usePortal();
  return (
    <PageShell
      kicker="The wire"
      title="Notifications"
      desc="Tickets, appointments, urgent notices, club announcements, and payment updates land here automatically."
    >
      <Panel title="Inbox — latest first" icon={BellRing}>
        <ul className="space-y-2">
          {notifications.map((item, i) => (
            <NotificationRow key={i} item={item} />
          ))}
          {notifications.length === 0 && (
            <li className="border border-dashed border-ink/30 bg-paper px-4 py-6 text-center text-[12.5px] text-ink-soft">
              All caught up — nothing new on the wire.
            </li>
          )}
        </ul>
      </Panel>
    </PageShell>
  );
}

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <li
      className={cn(
        "flex items-start gap-2.5 border px-3 py-2.5",
        item.tone === "urgent" ? "border-newsprint/60 bg-newsprint/5" : "border-ink/20 bg-paper",
      )}
    >
      <span className={cn("mt-1 size-1.5 shrink-0", item.tone === "urgent" ? "bg-newsprint" : item.tone === "ok" ? "bg-pine" : "bg-ink/40")} />
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] leading-5 text-ink">{item.text}</p>
        <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">{item.time}</p>
      </div>
    </li>
  );
}

/* ── Results ────────────────────────────────────────────────────────────── */

export function ResultsPage() {
  const { results } = usePortal();
  const totalPoints = results.reduce((s, r) => s + r.points, 0);
  const totalCredits = results.reduce((s, r) => s + r.credits, 0);
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "—";

  return (
    <PageShell
      kicker="Examination committee"
      title="Result"
      desc="Previous semester grades — grade review requests close 15 August."
    >
      <Panel title="Transcript — previous semester" icon={Award}>
        <div className="overflow-x-auto">
          <Table className="min-w-[520px]">
            <TableHeader>
              <TableRow className="border-ink/30 hover:bg-transparent">
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Course</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Title</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Credits</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Grade</TableHead>
                <TableHead className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((r) => (
                <TableRow key={r.course} className="border-ink/20 hover:bg-muted/60">
                  <TableCell className="py-2.5 text-[13px] font-medium text-ink">{r.course}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{r.title}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{r.credits}</TableCell>
                  <TableCell className="py-2.5 text-[13px] font-semibold text-ink">{r.grade}</TableCell>
                  <TableCell className="py-2.5 text-[13px] text-ink-soft">{r.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 border-t border-dashed border-ink/30 pt-3 text-[12.5px] text-ink">
          CGPA (previous semester): <span className="font-display text-lg font-bold text-ink">{cgpa}</span>{" "}
          <span className="text-ink-soft">· {totalCredits} credits</span>
        </p>
      </Panel>
    </PageShell>
  );
}

/* ── AI Services (Student & Faculty) ────────────────────────────────────── */

const suggestions = [
  "Midterms start Monday — review Data Structures Lecture 12 in your Notes Drive.",
  "The AI & Robotics Club workshop is Friday 4 pm, Lab 3.",
  "Meal counter: 137 of 200 claimed — claim early to avoid the queue.",
  "Final results are out — check the Result page for your CGPA.",
];

export function AiServices() {
  const { notices, files, notes, meal, results } = usePortal();
  const [chat, setChat] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [smartQuery, setSmartQuery] = useState("");
  const [pdfId, setPdfId] = useState<number | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [noticeQuery, setNoticeQuery] = useState("");

  const totalPoints = results.reduce((s, r) => s + r.points, 0);
  const totalCredits = results.reduce((s, r) => s + r.credits, 0);
  const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "—";

  const askChat = (q: string) => {
    const query = q.toLowerCase();
    if (query.includes("midterm") || query.includes("exam")) {
      const notice = notices.find((n) => n.category === "Exams");
      setReply(notice ? `Found it — “${notice.title}” (${notice.date}). Exams begin Monday 10 August; hall tickets arrive Friday.` : "No exam notice yet — check back soon.");
    } else if (query.includes("meal") || query.includes("lunch")) {
      setReply(`The lunch counter shows ${meal.claimed} of ${meal.total} slots claimed (${Math.round((meal.claimed / meal.total) * 100)}%). Claim from the Meal Ticket page.`);
    } else if (query.includes("bus") || query.includes("transport")) {
      setReply("Route 1 (Campus ⇄ Uttara) departs 7:00 and 14:30. Book a seat from the Transport Ticket page — QR ticket included.");
    } else if (query.includes("cgpa") || query.includes("result")) {
      setReply(`Your CGPA for the previous semester is ${cgpa} (${totalCredits} credits). Full grades are on the Result page.`);
    } else if (query.includes("library")) {
      setReply("The central library stays open until 11 pm during exam week — quiet floors 3 & 4.");
    } else {
      setReply("Ask me about midterms, meals, buses, results, or the library — I search notices, notes, and files for the answer.");
    }
  };

  const smartResults = smartQuery.trim()
    ? {
        notices: notices.filter((n) => (n.title + n.body).toLowerCase().includes(smartQuery.toLowerCase())),
        notes: notes.filter((n) => (n.title + n.content + n.tags.join(" ")).toLowerCase().includes(smartQuery.toLowerCase())),
        files: files.filter((f) => (f.name + f.folder).toLowerCase().includes(smartQuery.toLowerCase())),
      }
    : null;

  const smartTotal = smartResults ? smartResults.notices.length + smartResults.notes.length + smartResults.files.length : 0;

  const pdf = files.find((f) => f.id === pdfId);
  const filteredNotices = notices.filter((n) => (n.title + n.category).toLowerCase().includes(noticeQuery.toLowerCase()));

  return (
    <PageShell
      kicker="Centralized AI — for student & faculty"
      title="AI Services"
      desc="Smart search across notices, notes and PDFs · campus chatbot · PDF summarizer · study suggestions · notice search."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {/* 1. Chatbot */}
        <Panel title="1 · Campus chatbot" icon={Sparkles} className="lg:col-span-2">
          <div className="flex gap-2">
            <Input value={chat} onChange={(e) => setChat(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && chat.trim()) askChat(chat); }} placeholder="Schedules, how-tos, locations…" className="rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            <Button size="icon" onClick={() => chat.trim() && askChat(chat)} className="shrink-0 rounded-sm bg-ink text-paper hover:bg-ink/90">
              <Search className="size-4" />
            </Button>
          </div>
          {reply ? (
            <div className="mt-4 border border-ink/25 bg-paper p-4">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-newsprint">AI · campus edition</p>
              <p className="mt-2 text-[13px] leading-6 text-ink/90">{reply}</p>
            </div>
          ) : (
            <div className="mt-4 border border-dashed border-ink/30 bg-paper p-4">
              <Label>Try asking</Label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["When are midterms?", "Meal counter?", "Bus to Uttara?", "What's my CGPA?"].map((q) => (
                  <button key={q} onClick={() => { setChat(q); askChat(q); }} className="border border-ink/30 px-2 py-1 text-[11px] text-ink-soft transition-colors hover:bg-ink hover:text-paper">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Panel>

        {/* 2. Smart search */}
        <Panel title="2 · Smart search — notices, notes, PDFs" icon={Search} className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
            <Input value={smartQuery} onChange={(e) => setSmartQuery(e.target.value)} placeholder="Search across everything — content-aware…" className="rounded-sm border-ink/30 bg-paper pl-8 font-serif text-[13px]" />
          </div>
          {smartResults && (
            <div className="mt-4 space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">{smartTotal} result{smartTotal === 1 ? "" : "s"} for “{smartQuery}”</p>
              {smartResults.notices.length > 0 && (
                <div>
                  <p className="kicker mb-1.5">Notices</p>
                  <ul className="space-y-1">{smartResults.notices.map((n) => <li key={n.id} className="border border-ink/20 bg-paper px-3 py-2 text-[12.5px] text-ink">{n.title}</li>)}</ul>
                </div>
              )}
              {smartResults.notes.length > 0 && (
                <div>
                  <p className="kicker mb-1.5">Notes</p>
                  <ul className="space-y-1">{smartResults.notes.map((n) => <li key={n.id} className="border border-ink/20 bg-paper px-3 py-2 text-[12.5px] text-ink">{n.title}</li>)}</ul>
                </div>
              )}
              {smartResults.files.length > 0 && (
                <div>
                  <p className="kicker mb-1.5">Files</p>
                  <ul className="space-y-1">{smartResults.files.map((f) => <li key={f.id} className="flex items-center gap-2 border border-ink/20 bg-paper px-3 py-2 text-[12.5px] text-ink"><FileText className="size-3.5 text-newsprint" />{f.name}</li>)}</ul>
                </div>
              )}
              {smartTotal === 0 && <p className="text-[12.5px] text-ink-soft">Nothing found — try a different word.</p>}
            </div>
          )}
        </Panel>

        {/* 3. PDF summarizer */}
        <Panel title="3 · PDF summarizer" icon={FileText}>
          <div className="space-y-3">
            <select
              value={pdfId ?? ""}
              onChange={(e) => { setPdfId(e.target.value ? Number(e.target.value) : null); setSummary(null); }}
              className="w-full rounded-sm border border-ink/30 bg-paper px-3 py-2 font-serif text-[13px] text-ink"
            >
              <option value="">Choose a PDF from the drive…</option>
              {files.filter((f) => f.kind === "pdf").map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            <Button
              variant="outline"
              disabled={!pdfId}
              onClick={() => {
                if (!pdf) return;
                setSummary(`“${pdf.name}” covers the topic in ${pdf.size.replace(" MB", "") === pdf.size ? "about 12" : "about 40"} pages. Key points: definitions, worked examples, common exam patterns, and a short practice set. Ask the chatbot for specifics.`);
              }}
              className="w-full rounded-sm border-ink/40 bg-transparent font-mono text-[11px] uppercase tracking-[0.14em] text-ink hover:bg-ink hover:text-paper"
            >
              Summarize with AI
            </Button>
            {summary && (
              <p className="border border-ink/25 bg-paper p-3 text-[12.5px] leading-6 text-ink/90">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-newsprint">Summary · </span>
                {summary}
              </p>
            )}
          </div>
        </Panel>

        {/* 4. Study suggestions */}
        <Panel title="4 · Study suggestions" icon={CheckCircle2}>
          <ul className="space-y-2">
            {suggestions.map((s, i) => (
              <li key={i} className="flex gap-2.5 border border-ink/20 bg-paper px-3 py-2.5 text-[12.5px] leading-5 text-ink/90">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-pine" />
                {s}
              </li>
            ))}
          </ul>
        </Panel>

        {/* 5. Notice search */}
        <Panel title="5 · Notice search" icon={BellRing} className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
            <Input value={noticeQuery} onChange={(e) => setNoticeQuery(e.target.value)} placeholder="Search the official notice hub…" className="rounded-sm border-ink/30 bg-paper pl-8 font-serif text-[13px]" />
          </div>
          <ul className="mt-3 space-y-1.5">
            {filteredNotices.slice(0, 5).map((n) => (
              <li key={n.id} className="flex items-baseline justify-between gap-3 border border-ink/20 bg-paper px-3 py-2">
                <span className="text-[12.5px] text-ink">{n.title}</span>
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">{n.category}</span>
              </li>
            ))}
            {filteredNotices.length === 0 && <li className="text-[12.5px] text-ink-soft">No notices match.</li>}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}
