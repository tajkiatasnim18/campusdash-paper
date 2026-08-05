import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CalendarCheck,
  CreditCard,
  FileOutput,
  FileText,
  FolderOpen,
  HardDrive,
  MapPin,
  NotebookPen,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageShell, Panel, Label } from "@/components/portal/parts";
import { usePortal } from "@/components/portal/portal-context";
import { cn } from "@/lib/utils";

/* ── Notes Drive ────────────────────────────────────────────────────────── */

export function NotesDrive() {
  const { files, addFile } = usePortal();
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState("All");
  const [name, setName] = useState("");
  const [newFolder, setNewFolder] = useState("CSE 201");

  const folders = useMemo(() => ["All", ...Array.from(new Set(files.map((f) => f.folder)))], [files]);
  const filtered = files.filter(
    (f) =>
      (f.name + f.folder).toLowerCase().includes(query.toLowerCase()) &&
      (folder === "All" || f.folder === folder),
  );

  const upload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addFile({ name: name.trim(), folder: newFolder.trim() || "General", size: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)} MB`, kind: "pdf", shared: false });
    toast("File added to your drive.");
    setName("");
  };

  return (
    <PageShell
      kicker="Personal cloud"
      title="Notes Drive"
      desc="Cloud storage for lecture PDFs and notes — folders, sharing, and content-aware search."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <Panel title={`Drive — ${files.length} files`} icon={HardDrive} className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-soft" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search files — content-aware, not just names…" className="rounded-sm border-ink/30 bg-paper pl-8 font-serif text-[13px]" />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {folders.map((f) => (
              <button
                key={f}
                onClick={() => setFolder(f)}
                className={cn(
                  "border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                  folder === f ? "border-ink bg-ink text-paper" : "border-ink/30 text-ink-soft hover:bg-muted",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <ul className="mt-4 space-y-2">
            {filtered.map((f) => (
              <li key={f.id} className="flex items-center gap-3 border border-ink/20 bg-paper px-3 py-2.5">
                {f.kind === "pdf" ? <FileText className="size-4 shrink-0 text-newsprint" /> : <NotebookPen className="size-4 shrink-0 text-pine" />}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{f.name}</p>
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">{f.folder} · {f.size}</p>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
                  {f.shared ? "Shared by faculty" : "Personal"}
                </span>
              </li>
            ))}
            {filtered.length === 0 && <li className="px-3 py-5 text-center text-[12.5px] text-ink-soft">No files match.</li>}
          </ul>
        </Panel>
        <Panel title="Add a file" icon={Plus}>
          <form onSubmit={upload} className="space-y-4">
            <div>
              <Label>File name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Signal Processing — Week 7.pdf" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div>
              <Label>Folder</Label>
              <Input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} placeholder="Folder" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <Button type="submit" disabled={!name.trim()} className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
              Upload to drive
            </Button>
          </form>
          <p className="mt-auto border-t border-dashed border-ink/30 pt-3 text-[11.5px] leading-5 text-ink-soft">
            Teacher-shared materials appear here automatically with a “Shared by faculty” tag.
          </p>
        </Panel>
      </div>
    </PageShell>
  );
}

/* ── Notes Engine ───────────────────────────────────────────────────────── */

const tagHints: [RegExp, string][] = [
  [/tree|graph|heap|stack|queue/i, "data-structures"],
  [/oop|object|class|inherit/i, "oop"],
  [/sql|database|normaliz/i, "database"],
  [/math|matrix|linear/i, "math"],
  [/physics|thermo|wave/i, "physics"],
];

function autoTags(content: string): string[] {
  const tags = new Set<string>();
  tagHints.forEach(([re, tag]) => {
    if (re.test(content)) tags.add(tag);
  });
  if (tags.size === 0) tags.add("general");
  return Array.from(tags);
}

export function NotesEngine() {
  const { notes, addNote, deleteNote } = usePortal();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [summaries, setSummaries] = useState<Record<number, string>>({});

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const tags = Array.from(new Set([...autoTags(content), ...tagInput.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)]));
    addNote({ title: title.trim(), content: content.trim(), tags });
    toast("Note saved — AI tags applied.");
    setTitle(""); setContent(""); setTagInput("");
  };

  return (
    <PageShell
      kicker="Notebook"
      title="Notes Engine"
      desc="Write and organize notes; the AI suggests keywords and tags, and can summarize anything you've written."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Write a note" icon={NotebookPen}>
          <form onSubmit={save} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Recursion patterns" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div>
              <Label>Content</Label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} placeholder="Type your notes… the engine reads the content for tags." className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <div>
              <Label>Extra tags (comma separated — optional)</Label>
              <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="midterm, exam-prep" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
            </div>
            <Button type="submit" disabled={!title.trim() || !content.trim()} className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
              Save note
            </Button>
          </form>
          {content.trim() && (
            <p className="mt-4 border-t border-dashed border-ink/30 pt-3 text-[11.5px] text-ink-soft">
              AI would tag this: <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pine">{autoTags(content).join(" · ")}</span>
            </p>
          )}
        </Panel>

        <Panel title="Your notes" icon={Sparkles}>
          <ul className="space-y-2">
            {notes.map((n) => (
              <li key={n.id} className="group border border-ink/20 bg-paper px-3 py-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-[14px] font-semibold text-ink">{n.title}</p>
                  <button onClick={() => { deleteNote(n.id); toast("Note deleted."); }} aria-label="Delete note" className="text-ink-soft opacity-0 transition-opacity hover:text-newsprint group-hover:opacity-100">
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {n.tags.map((t) => (
                    <span key={t} className="border border-pine/40 px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.12em] text-pine">{t}</span>
                  ))}
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">{n.updated}</span>
                </div>
                <p className="mt-2 text-[12.5px] leading-5 text-ink-soft">
                  {summaries[n.id] ?? (n.content.length > 120 ? n.content.slice(0, 120) + "…" : n.content)}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSummaries((prev) => ({ ...prev, [n.id]: `Summary: ${n.content.split(".")[0]}. Focus points: ${n.tags.join(", ")}.` }))}
                  className="mt-2 rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper"
                >
                  <Sparkles className="size-3" /> Summarize
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}

/* ── PDF Maker ──────────────────────────────────────────────────────────── */

export function PdfMaker() {
  const { notes, files, addFile } = usePortal();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generate = () => {
    if (selected.size === 0) return;
    const pages = selected.size * 2 + 3;
    addFile({
      name: `Export-${Date.now().toString().slice(-6)}.pdf`,
      folder: "Exports",
      size: `${pages * 34} KB`,
      kind: "pdf",
      shared: false,
    });
    toast.success(`PDF generated — ${selected.size} source${selected.size > 1 ? "s" : ""}, ${pages} pages, added to your drive.`);
    setSelected(new Set());
  };

  return (
    <PageShell
      kicker="Export desk"
      title="PDF Maker"
      desc="Convert notes into clean PDFs, merge files, and apply basic formatting — straight from your drive."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Select sources — notes & files" icon={FileOutput}>
          <ul className="space-y-1.5">
            {notes.map((n) => (
              <li key={`n-${n.id}`}>
                <label className="flex cursor-pointer items-center gap-2.5 border border-ink/20 bg-paper px-3 py-2 text-[12.5px] text-ink">
                  <input type="checkbox" checked={selected.has(`n-${n.id}`)} onChange={() => toggle(`n-${n.id}`)} className="accent-[#23211c]" />
                  <NotebookPen className="size-3.5 shrink-0 text-pine" /> {n.title}
                </label>
              </li>
            ))}
            {files.filter((f) => f.kind === "pdf").map((f) => (
              <li key={`f-${f.id}`}>
                <label className="flex cursor-pointer items-center gap-2.5 border border-ink/20 bg-paper px-3 py-2 text-[12.5px] text-ink">
                  <input type="checkbox" checked={selected.has(`f-${f.id}`)} onChange={() => toggle(`f-${f.id}`)} className="accent-[#23211c]" />
                  <FileText className="size-3.5 shrink-0 text-newsprint" /> {f.name}
                </label>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Generate" icon={FileOutput}>
          <p className="text-[12.5px] leading-5 text-ink-soft">
            {selected.size === 0
              ? "Tick notes or PDFs on the left, then generate. Merged output lands in your Notes Drive under “Exports”."
              : `${selected.size} source${selected.size > 1 ? "s" : ""} selected — the maker will merge and typeset them into one clean PDF.`}
          </p>
          <Button
            disabled={selected.size === 0}
            onClick={generate}
            className="mt-4 w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90"
          >
            <FileOutput className="size-3.5" /> Generate PDF
          </Button>
          <p className="mt-4 border-t border-dashed border-ink/30 pt-3 text-[11.5px] text-ink-soft">
            Basic formatting options — headings, spacing, page numbers — are applied automatically.
          </p>
        </Panel>
      </div>
    </PageShell>
  );
}

/* ── Club Dashboard ─────────────────────────────────────────────────────── */

export function ClubsPage() {
  const { clubs, myClubs, joinClub, leaveClub, announcements } = usePortal();
  return (
    <PageShell
      kicker="Student clubs"
      title="Club Dashboard"
      desc="Join the clubs you care about and follow their announcements."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Clubs at NITER" icon={Users}>
          <ul className="space-y-2">
            {clubs.map((c) => {
              const joined = myClubs.includes(c.name);
              return (
                <li key={c.name} className="flex items-center justify-between gap-2 border border-ink/20 bg-paper px-3 py-2.5">
                  <div>
                    <p className="text-[13px] font-medium text-ink">{c.name}</p>
                    <p className="text-[11.5px] text-ink-soft">{c.members} members · you are {joined ? "a member" : "not yet a member"}</p>
                  </div>
                  {joined ? (
                    <Button size="sm" variant="outline" onClick={() => { leaveClub(c.name); toast("Left the club."); }} className="shrink-0 rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper">
                      Leave
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => { joinClub(c.name); toast.success(`Joined ${c.name}.`); }} className="shrink-0 rounded-sm bg-ink font-mono text-[10px] uppercase tracking-[0.12em] text-paper hover:bg-ink/90">
                      Join
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </Panel>
        <Panel title="Club announcements" icon={Users}>
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

/* ── Event Registration ─────────────────────────────────────────────────── */

export function EventsPage() {
  const { events, myRegistrations, registerEvent } = usePortal();
  return (
    <PageShell
      kicker="Clubs & events"
      title="Event Registration"
      desc="Browse events published by club hosts and register online — payment, when required, happens on the Event Payment page."
    >
      <Panel title="Upcoming events" icon={CalendarCheck}>
        <ul className="space-y-3">
          {events.map((e) => {
            const full = e.registered >= e.capacity;
            const state = myRegistrations[e.id];
            return (
              <li key={e.id} className="border border-ink/20 bg-paper px-4 py-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-newsprint">{e.club}</p>
                    <p className="mt-0.5 font-display text-[16px] font-semibold leading-snug text-ink">{e.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11.5px] text-ink-soft">
                      <MapPin className="size-3" /> {e.venue} · {e.date}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-ink-soft">
                      {e.registered} / {e.capacity} registered · {e.price === 0 ? "free" : `৳${e.price}`}
                    </p>
                  </div>
                  {state === "registered" && <span className="border border-pine/50 bg-pine/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-pine">Registered — pay in Event Payment</span>}
                  {state === "paid" && <span className="border border-pine/50 bg-pine/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-pine">Paid ✓</span>}
                </div>
                {!state && (
                  <Button size="sm" variant="outline" disabled={full} onClick={() => { registerEvent(e.id); toast.success("Registered! Complete payment on the Event Payment page."); }} className="mt-2 rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-paper">
                    {full ? "Full" : "Register"}
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
    </PageShell>
  );
}

/* ── Event Payment ──────────────────────────────────────────────────────── */

export function StudentPaymentsPage() {
  const { events, myRegistrations, payEvent } = usePortal();
  const due = events.filter((e) => myRegistrations[e.id] === "registered" && e.price > 0);
  const paid = events.filter((e) => myRegistrations[e.id] === "paid" && e.price > 0);

  return (
    <PageShell
      kicker="Cashless campus"
      title="Event Payment"
      desc="Pay online for events you've registered — bKash or Rocket, instant confirmation."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Due" icon={CreditCard}>
          {due.length === 0 ? (
            <p className="border border-dashed border-ink/30 bg-paper px-4 py-6 text-center text-[12.5px] text-ink-soft">
              Nothing due — register for a paid event first.
            </p>
          ) : (
            <ul className="space-y-2">
              {due.map((e) => (
                <li key={e.id} className="border border-ink/20 bg-paper px-3 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-medium text-ink">{e.title}</p>
                      <p className="text-[11.5px] text-ink-soft">{e.club} · ৳{e.price}</p>
                    </div>
                    <Button size="sm" onClick={() => { payEvent(e.id); toast.success(`Paid ৳${e.price} via bKash — ticket confirmed.`); }} className="shrink-0 rounded-sm bg-ink font-mono text-[10px] uppercase tracking-[0.12em] text-paper hover:bg-ink/90">
                      Pay ৳{e.price}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="Receipts" icon={CreditCard}>
          <ul className="space-y-2">
            {paid.map((e) => (
              <li key={e.id} className="flex items-center justify-between border border-ink/20 bg-paper px-3 py-2.5">
                <span className="text-[12.5px] text-ink">{e.title}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-pine">Paid ৳{e.price}</span>
              </li>
            ))}
            {paid.length === 0 && <p className="text-[12.5px] text-ink-soft">No receipts yet.</p>}
          </ul>
        </Panel>
      </div>
    </PageShell>
  );
}

/* ── Materials (student) ────────────────────────────────────────────────── */

export function MaterialsPage() {
  const { files } = usePortal();
  return (
    <PageShell
      kicker="Course materials"
      title="Materials"
      desc="Lecture PDFs and notes shared by faculty — organized, searchable, always in one place."
    >
      <Panel title="Shared by faculty" icon={FolderOpen}>
        <ul className="space-y-2">
          {files.filter((f) => f.shared).map((f) => (
            <li key={f.id} className="flex items-center gap-3 border border-ink/20 bg-paper px-3 py-2.5">
              {f.kind === "pdf" ? <FileText className="size-4 shrink-0 text-newsprint" /> : <NotebookPen className="size-4 shrink-0 text-pine" />}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-ink">{f.name}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">{f.folder} · {f.size}</p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">{f.kind === "pdf" ? "PDF" : "Note"}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </PageShell>
  );
}
