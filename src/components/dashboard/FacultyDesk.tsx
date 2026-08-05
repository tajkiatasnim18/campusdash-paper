import { useState } from "react";
import { toast } from "sonner";
import { FileText, Megaphone, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Kicker } from "@/components/editorial";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DriveFile, Notice, ResultRow } from "@/lib/campus-data";

type Props = {
  notices: Notice[];
  files: DriveFile[];
  results: ResultRow[];
  onPublishNotice: (n: { title: string; category: string; body: string; urgent: boolean }) => void;
};

export function FacultyDesk({ notices, files, results, onPublishNotice }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [shared, setShared] = useState<Set<number>>(new Set([1, 3]));

  const toggleShare = (id: number) => {
    setShared((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Link removed — students can no longer see this file.");
      } else {
        next.add(id);
        toast("Shared — the file now appears in students' Notes Drive.");
      }
      return next;
    });
  };

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    onPublishNotice({
      title: title.trim(),
      category: category.trim() || "General",
      body: body.trim(),
      urgent,
    });
    toast(urgent ? "Urgent notice published to the hub." : "Notice published to the hub.");
    setTitle("");
    setCategory("");
    setBody("");
    setUrgent(false);
  };

  return (
    <div className="space-y-10">
      <div>
        <Kicker>Faculty desk — the editorial office</Kicker>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Publish, share, track.
        </h2>
        <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-ink-soft">
          One reliable channel to reach every student — official notices go straight to the Notice
          Hub, and shared files land in their Notes Drive.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Publish notice */}
        <section className="border border-ink/30 bg-sheet p-5">
          <div className="flex items-center justify-between border-b border-ink/20 pb-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
              Publish an official notice
            </p>
            <Megaphone className="size-4 text-ink/40" />
          </div>
          <form onSubmit={publish} className="space-y-4 pt-4">
            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Headline</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Make-up class — CSE 201, Friday 3 pm"
                className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
              />
            </div>
            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Category</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Exams · Results · General · IT …"
                className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
              />
            </div>
            <div>
              <label className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink-soft">Body</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write the notice — students see it immediately in the hub."
                rows={4}
                className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-ink">
              <Checkbox checked={urgent} onCheckedChange={(v) => setUrgent(v === true)} className="rounded-none border-ink/50" />
              Mark as urgent — red alert on the hub
            </label>
            <Button
              type="submit"
              disabled={!title.trim() || !body.trim()}
              className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90"
            >
              Set in print
            </Button>
          </form>
        </section>

        {/* Materials */}
        <section className="border border-ink/30 bg-sheet p-5">
          <div className="flex items-center justify-between border-b border-ink/20 pb-3">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
              Materials — share to the Drive
            </p>
            <FileText className="size-4 text-ink/40" />
          </div>
          <ul className="mt-4 space-y-2">
            {files.map((f) => {
              const isShared = shared.has(f.id);
              return (
                <li key={f.id} className="flex items-center gap-3 border border-ink/20 bg-paper px-3 py-2.5">
                  <FileText className="size-4 shrink-0 text-newsprint" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-ink">{f.name}</p>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">{f.folder} · {f.size}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleShare(f.id)}
                    className={`shrink-0 rounded-sm font-mono text-[10px] uppercase tracking-[0.12em] ${
                      isShared
                        ? "border-pine/50 bg-pine/10 text-pine hover:bg-pine/20"
                        : "border-ink/40 bg-transparent text-ink hover:bg-ink hover:text-paper"
                    }`}
                  >
                    <Share2 className="size-3" /> {isShared ? "Shared" : "Share"}
                  </Button>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 border-t border-dashed border-ink/30 pt-3 text-[11.5px] leading-5 text-ink-soft">
            Students see shared files instantly in their Notes Drive. AI summarization and PDF
            export apply to everything shared here.
          </p>
        </section>
      </div>

      {/* Results */}
      <section className="border border-ink/30 bg-sheet p-5">
        <div className="flex items-center justify-between border-b border-ink/20 pb-3">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">Results — previous semester</p>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">CSE 2nd year · sample</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <Table className="min-w-[480px]">
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
        <p className="mt-3 text-[11.5px] text-ink-soft">
          You've published {notices.length} notices through the hub this term.
        </p>
      </section>
    </div>
  );
}
