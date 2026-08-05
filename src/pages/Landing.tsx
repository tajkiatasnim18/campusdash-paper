import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hairline, Kicker, Masthead } from "@/components/editorial";

const todayEdition = [
  { tag: "Exams", title: "Midterm routine published for all departments", by: "Office of the Registrar" },
  { tag: "Meals", title: "Lunch counter running live — 137 of 200 slots claimed", by: "Cafeteria desk" },
  { tag: "Clubs", title: "TechNova 2026: registrations and payments now open", by: "AI & Robotics Club" },
];

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
              and clubs — gathered into one practical hub for NITER. One login for students and
              teachers, and one AI assistant that actually helps.
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
                <Link to="/dashboard">Jump straight in</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              <span>4 roles</span>
              <span className="h-3 w-px bg-ink/30" />
              <span>1 login</span>
              <span className="h-3 w-px bg-ink/30" />
              <span>Public medical info</span>
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
            The blueprint, inside the portal
          </span>
          <Hairline className="flex-1" />
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
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-sm bg-ink px-8 font-mono text-[12px] uppercase tracking-[0.16em] text-paper hover:bg-ink/90">
              <Link to="/auth">
                Enter the portal <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-sm border-ink/40 bg-transparent px-8 font-mono text-[12px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
            >
              <Link to="/dashboard">Jump straight in</Link>
            </Button>
          </div>
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
                  <li><Link to="/" className="hover:text-ink">Front page</Link></li>
                  <li><Link to="/dashboard" className="hover:text-ink">The portal</Link></li>
                  <li><Link to="/dashboard/student/medical" className="hover:text-ink">Medical info</Link></li>
                </ul>
              </div>
              <div>
                <p className="kicker">The portal</p>
                <ul className="mt-3 space-y-2 text-[13px] text-ink/80">
                  <li><Link to="/auth" className="hover:text-ink">Sign in</Link></li>
                  <li><Link to="/dashboard" className="hover:text-ink">Dashboard</Link></li>
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
              Medical information stays public on the Home Page — no login required. Login is
              required only for Student, Faculty, Medical Admin, and Event Host access.
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
