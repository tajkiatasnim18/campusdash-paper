import { FlowChart } from "@/components/FlowChart";
import { Hairline, Kicker, Masthead, NewTag, SectionHead } from "@/components/editorial";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { accessRows, mergedAdditions } from "@/lib/campus-data";
import { Check, FileText, Lock, MapPin } from "lucide-react";

const devMap = [
  { node: "University Portal — one login", page: "App shell + auth gate", route: "everywhere" },
  { node: "Home Page (all info, public)", page: "Landing page", route: "/" },
  { node: "Medical Information (public)", page: "Landing section", route: "/#medical" },
  { node: "Login → Authenticate → Identify Role", page: "Auth page + role routing", route: "/auth → /dashboard" },
  { node: "Student Section", page: "Student Hub workspace", route: "/dashboard · student" },
  { node: "Faculty Section", page: "Faculty Desk workspace", route: "/dashboard · faculty" },
  { node: "Medical Admin Section", page: "Medical Admin panel", route: "/dashboard · medical" },
  { node: "Event Management (Event Host)", page: "Event Host workspace", route: "/dashboard · host" },
  { node: "Blueprint & access control", page: "This page", route: "/flowchart" },
];

const structure = [
  { head: "Home Page (Public)", sub: "All information, including Medical Information" },
  { head: "Login", sub: "Student Login → Student Section" },
  { head: "Login", sub: "Faculty Login → Faculty Section" },
  { head: "Login", sub: "Medical Admin Login → Medical Admin Section" },
  { head: "Login", sub: "Event Host Login → Event Management + Student Section" },
  { head: "Contact", sub: "Contact information & quick links" },
];

export default function FlowchartPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Masthead active="blueprint" />

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6">
        {/* Hero */}
        <div className="rule-double-bottom pb-10">
          <Kicker tone="red">Blueprint — Section C · Read before press</Kicker>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            The CampusDash Flowchart,
            <br className="hidden sm:block" /> revised for the web.
          </h1>
          <div className="mt-6 grid gap-8 lg:grid-cols-5">
            <p className="max-w-xl text-[15px] leading-7 text-ink-soft lg:col-span-3">
              The original hand-drawn chart is preserved node-for-node — public Home Page,
              Login → Authenticate → Identify Role, and the role-based sections. Everything the
              <span className="font-medium text-ink"> CampusDash brief</span> adds beyond the chart
              (AI, bookings, live counters, the Notes Drive, event management) has been folded in
              and marked <NewTag />. Event management now lives in its own role column after
              “Identify User Role”, exactly as requested — event hosts are all students, so the
              column carries full access to the Student Section too.
            </p>
            <div className="border border-ink/40 bg-sheet p-5 lg:col-span-2">
              <p className="kicker">At a glance</p>
              <ul className="mt-3 space-y-2 text-[13px] leading-6 text-ink/90">
                <li className="flex gap-2"><Lock className="mt-0.5 size-3.5 shrink-0 text-newsprint" /> Public: Home Page + Medical Information</li>
                <li className="flex gap-2"><Check className="mt-0.5 size-3.5 shrink-0 text-pine" /> Login required: 4 role-based sections</li>
                <li className="flex gap-2"><MapPin className="mt-0.5 size-3.5 shrink-0 text-ink-soft" /> NITER campus — built to grow beyond it</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Merged additions */}
        <section className="pt-12">
          <SectionHead
            kicker="Merged from the brief"
            title="What the CampusDash doc adds to the flowchart"
            desc="Seven additions from the brief were not present in the hand-drawn chart. Each is tagged with a red NEW marker in the flowchart below."
          />
          <div className="mt-8 grid gap-px overflow-hidden border border-ink/40 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {mergedAdditions.map((add) => (
              <div key={add.title} className="flex flex-col gap-2 bg-paper p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-[15px] font-semibold leading-snug text-ink">
                    {add.title}
                  </p>
                  {add.highlight ? <NewTag /> : null}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-newsprint">
                  {add.where}
                </p>
                <p className="text-[13px] leading-6 text-ink-soft">{add.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The flowchart */}
        <section className="pt-16">
          <SectionHead
            kicker="The chart itself"
            title="Flowchart — prepared for development"
            desc="Read it top to bottom: the portal splits into a public front page and the login chain; once the role is identified, four workspaces open. Red NEW markers show every node added from the brief."
          />
          <div className="mt-10">
            <FlowChart />
          </div>
        </section>

        {/* Development map */}
        <section className="pt-16">
          <SectionHead
            kicker="From chart to code"
            title="Development map — every node has a page"
            desc="Each flowchart node maps to a route in this very project. The dashboard behind Sign in implements all four role workspaces; the landing page implements the public Home Page."
          />
          <div className="mt-8 overflow-x-auto border border-ink/40 bg-sheet">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="border-ink/40 hover:bg-transparent">
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    Flowchart node
                  </TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    Website page
                  </TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    Route
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devMap.map((row) => (
                  <TableRow key={row.node} className="border-ink/20 hover:bg-muted/60">
                    <TableCell className="py-3 text-[13px] font-medium text-ink">
                      <span className="flex items-center gap-2">
                        <FileText className="size-3.5 shrink-0 text-ink-soft" />
                        {row.node}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-[13px] text-ink-soft">{row.page}</TableCell>
                    <TableCell className="py-3 font-mono text-[11px] text-pine">{row.route}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Structure + access control */}
        <section className="grid gap-10 pt-16 lg:grid-cols-2">
          <div>
            <Kicker>Website structure — summary</Kicker>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">How the site is organized</h3>
            <ul className="mt-5 space-y-0 border border-ink/40 bg-sheet">
              {structure.map((row, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-4 border-b border-ink/20 px-4 py-3 last:border-b-0"
                >
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink">
                    {row.head}
                  </span>
                  <span className="text-right text-[13px] leading-5 text-ink-soft">{row.sub}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Kicker>Access control</Kicker>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">Who can open what</h3>
            <div className="mt-5 overflow-x-auto border border-ink/40 bg-sheet">
              <Table>
                <TableHeader>
                  <TableRow className="border-ink/40 hover:bg-transparent">
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Role</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Login required</TableHead>
                    <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Access</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessRows.map((row) => (
                    <TableRow key={row.role} className="border-ink/20 hover:bg-muted/60">
                      <TableCell className="py-3 text-[13px] font-medium text-ink">
                        <span className="flex items-center gap-2">
                          {row.role}
                          {row.isNew && <NewTag label="new role" />}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 text-[13px] text-ink-soft">{row.login}</TableCell>
                      <TableCell className="py-3 text-[13px] leading-5 text-ink-soft">{row.access}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Note box */}
        <section className="pt-16">
          <div className="border-2 border-ink bg-sheet p-6 sm:p-8">
            <p className="kicker-red">Note — appended to the chart</p>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-ink">
              Medical information is available to all users on the Home Page — no login required.
              Login is required only for Student, Faculty, Medical Admin, and Event Host access.
              Event Hosts are students first: signing in opens both the Event Management workspace
              and the full Student Section.
            </p>
          </div>
        </section>

        <Hairline className="mt-16" />
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">
          End of blueprint — next stop: <span className="text-newsprint">Sign in and walk through the portal</span>
        </p>
      </main>
    </div>
  );
}
