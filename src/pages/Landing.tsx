import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  Bus,
  Check,
  GraduationCap,
  HeartPulse,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Sparkles,
  Stethoscope,
  Utensils,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hairline, Kicker, Masthead, NewTag, SectionHead } from "@/components/editorial";
import { FlowChart } from "@/components/FlowChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { accessRows, benefits, modules, problemRows } from "@/lib/campus-data";

const todayEdition = [
  { tag: "Exams", title: "Midterm routine published for all departments", by: "Office of the Registrar" },
  { tag: "Meals", title: "Lunch counter running live — 137 of 200 slots claimed", by: "Cafeteria desk" },
  { tag: "Clubs", title: "TechNova 2026: registrations and payments now open", by: "AI & Robotics Club" },
];

const publicMedical = [
  "Health Tips & Awareness",
  "Common Diseases & Prevention",
  "First Aid Guidance",
  "Medical Facilities on Campus",
  "Emergency Contact",
  "Latest Medical Updates",
];

const moduleIcons = [Sparkles, GraduationCap, BookOpen, Stethoscope, Bus, Utensils, Megaphone, Wallet];

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-paper"
    >
      <Masthead />

      {/* ── Front page hero ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Kicker tone="red">The front page — CampusDash, a student &amp; faculty hub</Kicker>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              One front page
              <br />
              for all of{" "}
              <em className="font-light text-newsprint">campus life.</em>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-ink-soft sm:text-base sm:leading-8">
              Notices, study materials, meal tickets, bus seats, medical appointments, results,
              and clubs — scattered today across groups, paper forms, and disconnected systems —
              gathered into one practical hub for NITER. One login for students and teachers. One
              place where an AI assistant genuinely helps.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-sm bg-ink px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
                <Link to="/auth">
                  Enter the portal <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-sm border-ink/40 bg-transparent px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
              >
                <Link to="/flowchart">Read the blueprint</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <span>4 roles</span>
              <span className="h-3 w-px bg-ink/30" />
              <span>8 modules</span>
              <span className="h-3 w-px bg-ink/30" />
              <span>1 login</span>
              <span className="h-3 w-px bg-ink/30" />
              <span>0 paper forms</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-2 border-ink bg-sheet p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="kicker-red">Today's edition</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft">5 Aug 2026</p>
              </div>
              <div className="mt-4 space-y-4">
                {todayEdition.map((headline) => (
                  <article key={headline.title} className="border-t border-ink/25 pt-3">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-newsprint">
                      {headline.tag}
                    </p>
                    <p className="mt-1 font-display text-[17px] font-semibold leading-snug text-ink">
                      {headline.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      By {headline.by}
                    </p>
                  </article>
                ))}
              </div>
              <p className="mt-5 border-t border-dashed border-ink/40 pt-3 text-[12px] leading-5 text-ink-soft">
                Set in motion by the portal — the same edition updates live behind your login.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-4">
          <Hairline className="flex-1" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
            Continued on page two
          </span>
          <Hairline className="flex-1" />
        </div>
      </section>

      {/* ── The problem ────────────────────────────────────────────────── */}
      <section id="problem" className="border-y border-ink/40 bg-paper/40 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            kicker="Section A — the problem"
            title="Campus life runs on scattered paper."
            desc="The recurring pain, side by side — what students feel, and what teachers and staff feel. Every row below is a module in the portal."
          />
          <div className="mt-8 overflow-x-auto border border-ink/40 bg-sheet">
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow className="border-ink/40 hover:bg-transparent">
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Area</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Student pain</TableHead>
                  <TableHead className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink">Teacher / staff pain</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {problemRows.map((row) => (
                  <TableRow key={row.area} className="border-ink/20 hover:bg-muted/60">
                    <TableCell className="py-3 align-top text-[13px] font-semibold text-ink">{row.area}</TableCell>
                    <TableCell className="py-3 align-top text-[13px] leading-6 text-ink-soft">{row.student}</TableCell>
                    <TableCell className="py-3 align-top text-[13px] leading-6 text-ink-soft">{row.staff}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ── Modules ────────────────────────────────────────────────────── */}
      <section id="modules" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            kicker="Section B — the modules"
            title="Eight bylines, one newspaper."
            desc="The CampusDash brief defines the modules; the portal delivers them. Each one maps to a workspace behind the login."
          />
          <div className="mt-10 grid gap-px overflow-hidden border border-ink/40 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((mod, i) => {
              const Icon = moduleIcons[i];
              return (
                <article
                  key={mod.no}
                  className="group flex flex-col gap-3 bg-paper p-6 transition-colors duration-200 hover:bg-sheet"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold text-newsprint">{mod.no}</span>
                    <Icon className="size-4 text-ink/40 transition-colors group-hover:text-ink" />
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">{mod.title}</h3>
                  <p className="text-[12.5px] italic leading-5 text-ink-soft">{mod.blurb}</p>
                  <ul className="mt-auto space-y-1.5 border-t border-ink/20 pt-3">
                    {mod.items.map((item) => (
                      <li key={item} className="flex gap-2 text-[12.5px] leading-5 text-ink/85">
                        <span className="mt-[7px] size-1 shrink-0 bg-ink/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Medical (public) ───────────────────────────────────────────── */}
      <section id="medical" className="border-y border-ink/40 bg-paper/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            kicker="Public edition — no login required"
            title="Medical information, open to all."
            desc="As the flowchart specifies, medical information sits on the public Home Page. Visitors read it; signed-in students can also book appointments."
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-5">
            <div className="border border-dashed border-ink/60 bg-sheet p-6 sm:p-8 lg:col-span-3">
              <div className="flex items-center gap-3">
                <HeartPulse className="size-5 text-newsprint" />
                <p className="kicker-red">Medical Information (Public)</p>
              </div>
              <div className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {publicMedical.map((item, i) => (
                  <p key={item} className="flex items-baseline gap-2.5 text-[13.5px] text-ink/90">
                    <span className="font-mono text-[10px] text-ink-soft">{i + 1}.</span>
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-6 border-t border-dashed border-ink/40 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-newsprint">
                No login required — public access
              </p>
            </div>
            <div className="flex flex-col justify-center gap-4 lg:col-span-2">
              <div className="border border-ink/40 bg-sheet p-5">
                <p className="kicker">Signed-in readers</p>
                <p className="mt-2 text-[13.5px] leading-6 text-ink-soft">
                  Students see doctor availability and book appointments online; the Medical Admin
                  keeps this section updated from their own desk.
                </p>
                <Button asChild variant="outline" className="mt-4 rounded-sm border-ink/40 bg-transparent font-mono text-[11px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper">
                  <Link to="/auth">
                    Sign in to book <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
              <p className="border-l-2 border-newsprint/70 pl-4 text-[13px] italic leading-6 text-ink-soft">
                “Emergency? Dial the campus medical extension — 4444 — from any phone on campus.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Blueprint ──────────────────────────────────────────────────── */}
      <section id="blueprint" className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            kicker="Section C — the blueprint"
            title="The flowchart, revised and set for the web."
            desc="Preserved node-for-node from the original chart, merged with the CampusDash brief, and prepared for development. Event management lives in its own role column — hosts are all students."
          />
          <div className="mt-10">
            <FlowChart />
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm border-ink/40 bg-transparent px-6 font-mono text-[12px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
            >
              <Link to="/flowchart">
                Open the full blueprint — dev map &amp; access control <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Access control ─────────────────────────────────────────────── */}
      <section id="access" className="border-y border-ink/40 bg-paper/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            kicker="Access control"
            title="Who gets in, and what opens."
            desc="One university ID, four desks. The public Home Page needs no login at all."
          />
          <div className="mt-8 overflow-x-auto border border-ink/40 bg-sheet">
            <Table className="min-w-[640px]">
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
                    <TableCell className="py-3 text-[13px] font-semibold text-ink">
                      <span className="flex items-center gap-2">
                        {row.role}
                        {row.isNew && <NewTag label="new role" />}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-[13px] text-ink-soft">{row.login}</TableCell>
                    <TableCell className="py-3 text-[13px] leading-6 text-ink-soft">{row.access}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            kicker="Why it matters"
            title="What the campus gains."
          />
          <div className="mt-10 grid gap-px overflow-hidden border border-ink/40 bg-ink/15 md:grid-cols-3">
            {(
              [
                { label: "Students", icon: GraduationCap, items: benefits.students },
                { label: "Teachers & Faculty", icon: Megaphone, items: benefits.teachers },
                { label: "Campus Operations", icon: MapPin, items: benefits.operations },
              ] as const
            ).map((col) => (
              <div key={col.label} className="bg-paper p-7">
                <div className="flex items-center gap-3">
                  <col.icon className="size-4 text-newsprint" />
                  <h3 className="font-display text-xl font-semibold text-ink">{col.label}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[13.5px] leading-6 text-ink/85">
                      <Check className="mt-1 size-3.5 shrink-0 text-pine" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="rule-double-top border-x border-b border-ink/60 bg-sheet px-6 py-12 text-center sm:px-12">
          <p className="kicker-red">Your byline is waiting</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
            Step through the portal and take your desk.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-7 text-ink-soft">
            One login routes you by role — Student Hub, Faculty Desk, Medical Admin, or Event
            Management. The meal counter, bus seats, and clinic are already live in the demo.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-sm bg-ink px-8 font-mono text-[12px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
            <Link to="/auth">
              Enter the portal <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t-2 border-ink/70">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-sm">
              <p className="font-display text-2xl font-bold text-ink">
                Campus<span className="text-newsprint">Dash</span>
              </p>
              <p className="mt-2 text-[13px] leading-6 text-ink-soft">
                A single Student &amp; Faculty Hub for NITER — academic work, daily services, and
                campus life tools in one place.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="kicker">The paper</p>
                <ul className="mt-3 space-y-2 text-[13px] text-ink/80">
                  <li><a href="#problem" className="hover:text-ink">The problem</a></li>
                  <li><a href="#modules" className="hover:text-ink">Modules</a></li>
                  <li><a href="#blueprint" className="hover:text-ink">Blueprint</a></li>
                  <li><Link to="/flowchart" className="hover:text-ink">Full blueprint</Link></li>
                </ul>
              </div>
              <div>
                <p className="kicker">The portal</p>
                <ul className="mt-3 space-y-2 text-[13px] text-ink/80">
                  <li><Link to="/auth" className="hover:text-ink">Sign in</Link></li>
                  <li><Link to="/dashboard" className="hover:text-ink">Dashboard</Link></li>
                  <li><a href="#medical" className="hover:text-ink">Medical info</a></li>
                </ul>
              </div>
              <div>
                <p className="kicker">Contact</p>
                <ul className="mt-3 space-y-2 text-[13px] text-ink/80">
                  <li className="flex items-center gap-2"><MapPin className="size-3.5 text-ink-soft" /> NITER, Dhaka</li>
                  <li className="flex items-center gap-2"><Mail className="size-3.5 text-ink-soft" /> hello@campusdash.app</li>
                  <li className="flex items-center gap-2"><Phone className="size-3.5 text-ink-soft" /> +880 0000 000000</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-2 border-ink bg-sheet p-5">
            <p className="kicker-red">Note — from the flowchart</p>
            <p className="mt-2 text-[13px] leading-6 text-ink">
              Medical information is available to all users on the Home Page (no login required).
              Login is required only for Student, Faculty, Medical Admin, and Event Host access.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-ink/30 pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft sm:flex-row">
            <span>© 2026 CampusDash — set on press at NITER</span>
            <span>Frontend · React &amp; Vite · Backend · Convex</span>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
