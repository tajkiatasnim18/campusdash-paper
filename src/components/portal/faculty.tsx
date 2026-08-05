import { useState } from "react";
import { toast } from "sonner";
import { FileText, Share2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell, Panel, Label } from "@/components/portal/parts";
import { usePortal } from "@/components/portal/portal-context";
import { cn } from "@/lib/utils";

/* ── Materials (faculty) ────────────────────────────────────────────────── */

export function FacultyMaterialsPage() {
  const { files, toggleShare } = usePortal();

  const share = (id: number) => {
    toggleShare(id);
    const f = files.find((x) => x.id === id);
    toast(f?.shared ? "Link removed — students can no longer see this file." : "Shared — the file now appears in students' Materials.");
  };

  return (
    <PageShell
      kicker="Faculty desk — share"
      title="Materials"
      desc="Uploaded PDFs and notes, organized by course. Toggle sharing and the file lands in every student's drive."
    >
      <Panel title="Course materials" icon={FileText}>
        <ul className="space-y-2">
          {files.map((f) => (
            <li key={f.id} className="flex items-center gap-3 border border-ink/20 bg-paper px-3 py-2.5">
              <FileText className="size-4 shrink-0 text-newsprint" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-ink">{f.name}</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-soft">{f.folder} · {f.size}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => share(f.id)}
                className={cn(
                  "shrink-0 rounded-sm font-mono text-[10px] uppercase tracking-[0.12em]",
                  f.shared
                    ? "border-pine/50 bg-pine/10 text-pine hover:bg-pine/20"
                    : "border-ink/40 bg-transparent text-ink hover:bg-ink hover:text-paper",
                )}
              >
                <Share2 className="size-3" /> {f.shared ? "Shared" : "Share"}
              </Button>
            </li>
          ))}
        </ul>
      </Panel>
    </PageShell>
  );
}

/* ── PDF Upload ─────────────────────────────────────────────────────────── */

export function PdfUploadPage() {
  const { addFile } = usePortal();
  const [name, setName] = useState("");
  const [folder, setFolder] = useState("");
  const [shareNow, setShareNow] = useState(true);

  const upload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addFile({
      name: name.trim(),
      folder: folder.trim() || "General",
      size: `${Math.floor(Math.random() * 4) + 1}.${Math.floor(Math.random() * 9)} MB`,
      kind: "pdf",
      shared: shareNow,
    });
    toast(shareNow ? "Uploaded and shared with students." : "Uploaded — not shared yet.");
    setName(""); setFolder("");
  };

  return (
    <PageShell
      kicker="Faculty desk — upload"
      title="PDF Upload"
      desc="Add lecture PDFs to the Notes Drive — optionally share them with students immediately."
    >
      <Panel title="Upload a PDF" icon={Upload} className="max-w-xl">
        <form onSubmit={upload} className="space-y-4">
          <div>
            <Label>File name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Digital Logic — Lecture 9.pdf" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
          </div>
          <div>
            <Label>Course folder</Label>
            <Input value={folder} onChange={(e) => setFolder(e.target.value)} placeholder="e.g. CSE 311" className="mt-1.5 rounded-sm border-ink/30 bg-paper font-serif text-[13px]" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-[12.5px] text-ink">
            <input type="checkbox" checked={shareNow} onChange={(e) => setShareNow(e.target.checked)} className="accent-[#23211c]" />
            Share with students right away
          </label>
          <Button type="submit" disabled={!name.trim()} className="w-full rounded-sm bg-ink font-mono text-[11px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
            <Upload className="size-3.5" /> Upload to drive
          </Button>
        </form>
        <p className="mt-4 border-t border-dashed border-ink/30 pt-3 text-[11.5px] leading-5 text-ink-soft">
          Uploaded files appear in the Notes Drive; shared ones land in students' Materials
          immediately. AI summarization applies to everything shared here.
        </p>
      </Panel>
    </PageShell>
  );
}
