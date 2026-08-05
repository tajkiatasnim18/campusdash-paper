import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NewTag } from "@/components/editorial";

/* ── Primitives ─────────────────────────────────────────────────────────── */

function VConnector({ className }: { className?: string }) {
  return <div className={cn("mx-auto w-px bg-ink/45", className)} />;
}

function FlowBox({
  variant = "plain",
  className,
  children,
}: {
  variant?: "plain" | "dash" | "muted";
  className?: string;
  children: ReactNode;
}) {
  const variants = {
    plain: "border border-ink bg-sheet",
    dash: "border border-dashed border-ink/60 bg-paper/70",
    muted: "border border-ink/40 bg-paper/60",
  };
  return <div className={cn(variants[variant], className)}>{children}</div>;
}

function NodeTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="text-center">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
        {children}
      </p>
      {sub && <p className="mt-1.5 text-[12px] leading-5 text-ink-soft">{sub}</p>}
    </div>
  );
}

function Item({ n, label, isNew }: { n: string; label: string; isNew?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink/90">
      <span className="mt-px shrink-0 font-mono text-[10px] text-ink-soft">{n}.</span>
      <span className="flex-1">{label}</span>
      {isNew && <NewTag />}
    </li>
  );
}

function SectionNote({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "red" }) {
  return (
    <p
      className={cn(
        "mt-3 border-t border-dashed pt-2 text-center font-mono text-[9.5px] uppercase leading-4 tracking-[0.12em]",
        tone === "red" ? "border-newsprint/50 text-newsprint" : "border-ink/35 text-ink-soft",
      )}
    >
      {children}
    </p>
  );
}

function Branch({ cols, children }: { cols: 2 | 4; children: ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-x-4 top-0 hidden h-px bg-ink/45 lg:block" />
      <div
        className={cn(
          "grid gap-x-6 gap-y-8 pt-0 lg:pt-6",
          cols === 2 ? "lg:grid-cols-2" : "lg:grid-cols-2 xl:grid-cols-4",
        )}
      >
        {Children.map(children, (child) => (
          <div className="flex flex-col items-center">
            <div className="mx-auto h-6 w-px bg-ink/45 lg:hidden" />
            <div className="mx-auto hidden h-5 w-px bg-ink/45 lg:block" />
            <div className="mt-1 w-full lg:mt-0">{child}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Nodes ──────────────────────────────────────────────────────────────── */

function RootBox() {
  return (
    <div className="mx-auto w-fit border-2 border-ink bg-sheet p-[6px]">
      <div className="border border-ink px-8 py-3 text-center sm:px-12">
        <p className="font-display text-lg font-bold tracking-wide text-ink sm:text-xl">
          CAMPUSDASH
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
          One login · four desks
        </p>
      </div>
    </div>
  );
}

const homeItems = [
  "Welcome / University Overview",
  "About University",
  "Features / Facilities",
  "Contact Information",
  "Quick Links",
  { label: "Campus AI Chatbot — schedules, how-to, locations", isNew: true },
];

const medicalItems = [
  "Health Tips & Awareness",
  "Common Diseases & Prevention",
  "First Aid Guidance",
  "Medical Facilities on Campus",
  "Emergency Contact",
  "Latest Medical Updates",
];

function HomePageBox() {
  return (
    <FlowBox className="h-full p-5">
      <NodeTitle sub="All information — public">
        Home Page
      </NodeTitle>
      <ul className="mt-4 space-y-1.5 border-t border-ink/25 pt-3">
        {homeItems.map((item, i) =>
          typeof item === "string" ? (
            <Item key={item} n={String(i + 1)} label={item} />
          ) : (
            <Item key={item.label} n={String(i + 1)} label={item.label} isNew />
          ),
        )}
      </ul>

      <FlowBox variant="dash" className="mt-4 p-4">
        <p className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-newsprint">
          Medical Information (Public)
        </p>
        <ul className="mt-3 space-y-1.5">
          {medicalItems.map((item, i) => (
            <Item key={item} n={String(i + 1)} label={item} />
          ))}
        </ul>
        <SectionNote tone="red">No login required — public access</SectionNote>
        <p className="mt-2 text-center font-mono text-[9.5px] uppercase leading-4 tracking-[0.12em] text-ink-soft">
          Doctor availability preview only — booking needs login <NewTag />
        </p>
      </FlowBox>

      <FlowBox variant="dash" className="mt-4 p-4">
        <p className="flex items-center justify-center gap-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
          Centralized AI <NewTag />
        </p>
        <ul className="mt-3 space-y-1.5">
          <Item n="1" label="Smart search across notices, notes, and PDFs" />
          <Item n="2" label="Summarization of documents and lecture materials" />
          <Item n="3" label="Personalized suggestions: events, notices, study material" />
        </ul>
        <SectionNote>Available inside both Student and Faculty dashboards</SectionNote>
      </FlowBox>
    </FlowBox>
  );
}

function LoginChain() {
  return (
    <div className="flex h-full flex-col items-center">
      <FlowBox className="w-full max-w-xs px-6 py-4 text-center">
        <NodeTitle sub="Enter University ID & Password">Login</NodeTitle>
      </FlowBox>
      <VConnector className="h-6" />
      <FlowBox className="w-full max-w-xs px-6 py-3 text-center">
        <NodeTitle>Authenticate User</NodeTitle>
      </FlowBox>
      <VConnector className="h-6" />
      <FlowBox className="w-full max-w-xs px-6 py-4 text-center">
        <NodeTitle sub="Routes to Student, Faculty, Medical Admin, or Event Host">
          Identify User Role
        </NodeTitle>
      </FlowBox>
    </div>
  );
}

function RoleDivider() {
  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center px-6">
      <VConnector className="h-8" />
      <div className="relative w-full border-t border-ink/45">
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-paper px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
          Role identified → workspace opens
        </span>
      </div>
    </div>
  );
}

type RoleDef = {
  name: string;
  nameSub?: string;
  note?: string;
  dash: string;
  dashSub?: string;
  sectionTitle: string;
  items: { n: string; label: string; isNew?: boolean }[];
  sectionNote?: string;
  sectionNoteTone?: "plain" | "red";
};

const roles: RoleDef[] = [
  {
    name: "Student",
    dash: "Student Dashboard",
    dashSub: "Today's campus, at a glance",
    sectionTitle: "Student Section",
    items: [
      { n: "1", label: "Notice" },
      {
        n: "2",
        label: "Materials — PDF & Notes Drive, Notes Engine, PDF Maker, content search",
        isNew: true,
      },
      {
        n: "3",
        label: "Booking — Meal Ticket, Transport Ticket, Medical Appointment",
        isNew: true,
      },
      { n: "4", label: "Result" },
      { n: "5", label: "AI Assistant — search / summarize / chat", isNew: true },
      { n: "6", label: "Notifications — tickets, appointments, updates", isNew: true },
    ],
    sectionNote: "Club / Event removed — see Event Host",
    sectionNoteTone: "red",
  },
  {
    name: "Faculty / Teacher",
    dash: "Faculty Dashboard",
    dashSub: "Publish, share, and track",
    sectionTitle: "Faculty Section",
    items: [
      { n: "1", label: "Notice — publish official notices" },
      {
        n: "2",
        label: "Materials — upload/share PDFs & Notes, Notes Engine, PDF Maker",
        isNew: true,
      },
      { n: "3", label: "Result" },
      { n: "4", label: "AI Assistant — search / summarize / chat", isNew: true },
    ],
    sectionNote: "Reduces admin & coordination friction",
  },
  {
    name: "Medical Admin",
    nameSub: "(Host)",
    dash: "Medical Admin Panel",
    dashSub: "Update medical info",
    sectionTitle: "Medical Admin Section",
    items: [
      { n: "1", label: "Update medical information" },
      { n: "2", label: "Manage doctor / staff availability", isNew: true },
      { n: "3", label: "Track appointment bookings & reminders", isNew: true },
      { n: "4", label: "View visit activity, privacy-controlled", isNew: true },
      { n: "5", label: "Manage medical content shown on Home Page" },
    ],
  },
  {
    name: "Event Host",
    nameSub: "(Club / Event Manager)",
    note: "Event Host = a Student → dual access below",
    dash: "Event Host Dashboard",
    dashSub: "Run clubs, events, and payments",
    sectionTitle: "Event Mgmt Section",
    items: [
      { n: "1", label: "Event Announcements — create & publish", isNew: true },
      { n: "2", label: "Online Registration & Payment", isNew: true },
      {
        n: "3",
        label: "Personalized Club Dashboard — member list, roles: admin / member",
        isNew: true,
      },
      { n: "4", label: "Event Planning", isNew: true },
      { n: "5", label: "Finance Tracking for paid events", isNew: true },
    ],
    sectionNote: "Event Host can also access the Student Section",
    sectionNoteTone: "red",
  },
];

function RoleColumn({ role }: { role: RoleDef }) {
  return (
    <div className="flex h-full flex-col items-stretch">
      <FlowBox className="px-5 py-3 text-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
          {role.name} {role.nameSub && <span className="text-ink-soft">{role.nameSub}</span>}
        </p>
      </FlowBox>
      {role.note && (
        <div className="mx-1 mt-2 border border-dashed border-ink/50 bg-paper/70 px-3 py-2 text-center font-mono text-[9.5px] uppercase leading-4 tracking-[0.08em] text-ink-soft">
          {role.note}
        </div>
      )}
      <VConnector className="h-4" />
      <FlowBox className="px-5 py-3 text-center">
        <NodeTitle sub={role.dashSub}>{role.dash}</NodeTitle>
      </FlowBox>
      <VConnector className="h-4" />
      <FlowBox className="flex-1 p-4">
        <p className="mb-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ink">
          {role.sectionTitle}
        </p>
        <ul className="space-y-2 border-t border-ink/25 pt-3">
          {role.items.map((item) => (
            <Item key={item.n} n={item.n} label={item.label} isNew={item.isNew} />
          ))}
        </ul>
        {role.sectionNote && (
          <SectionNote tone={role.sectionNoteTone ?? "plain"}>{role.sectionNote}</SectionNote>
        )}
      </FlowBox>
      <VConnector className="h-4" />
      <FlowBox variant="muted" className="px-5 py-2 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
          Logout
        </span>
      </FlowBox>
    </div>
  );
}

function FlowLegend() {
  return (
    <div className="mt-10 border-t border-ink/40 pt-4">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
        <span className="flex items-center gap-2">
          <span className="size-1.5 bg-newsprint" /> Added from the CampusDash brief
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border-2 border-ink" /> Original structure
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 border border-dashed border-newsprint/70" /> Club / Event restructuring
        </span>
      </div>
    </div>
  );
}

/* ── The chart ──────────────────────────────────────────────────────────── */

export function FlowChart({ className }: { className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <RootBox />
      <VConnector className="h-8" />
      <Branch cols={2}>
        <HomePageBox />
        <LoginChain />
      </Branch>
      <RoleDivider />
      <Branch cols={4}>
        {roles.map((role) => (
          <RoleColumn key={role.name} role={role} />
        ))}
      </Branch>
      <FlowLegend />
    </div>
  );
}
