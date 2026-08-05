import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { GraduationCap, HeartPulse, LogOut, Megaphone, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { StudentHub } from "@/components/dashboard/StudentHub";
import { FacultyDesk } from "@/components/dashboard/FacultyDesk";
import { MedicalAdminDesk } from "@/components/dashboard/MedicalAdminDesk";
import { EventHostDesk } from "@/components/dashboard/EventHostDesk";
import { cn } from "@/lib/utils";
import {
  seedClubs,
  seedDoctors,
  seedEvents,
  seedFiles,
  seedMeal,
  seedMedicalTips,
  seedNotices,
  seedResults,
  seedRoutes,
  type BusRoute,
  type CampusEvent,
  type Doctor,
  type DriveFile,
  type MealState,
  type Notice,
} from "@/lib/campus-data";

type RoleKey = "student" | "faculty" | "medical" | "host";

const ROLES: { key: RoleKey; label: string; sub: string; icon: React.ElementType }[] = [
  { key: "student", label: "Student", sub: "Student Section", icon: GraduationCap },
  { key: "faculty", label: "Faculty / Teacher", sub: "Faculty Section", icon: Megaphone },
  { key: "medical", label: "Medical Admin", sub: "Medical Admin Section", icon: HeartPulse },
  { key: "host", label: "Event Host", sub: "Event Management", icon: PartyPopper },
];

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleKey>("student");

  // Shared demo state — mirrors what would live in Convex tables.
  const [notices, setNotices] = useState<Notice[]>(seedNotices);
  const [events, setEvents] = useState<CampusEvent[]>(seedEvents);
  const [meal, setMeal] = useState<MealState>(seedMeal);
  const [doctors, setDoctors] = useState<Doctor[]>(seedDoctors);
  const [routes, setRoutes] = useState<BusRoute[]>(seedRoutes);
  const [medicalTips, setMedicalTips] = useState<string[]>(seedMedicalTips);
  const [transportBooked, setTransportBooked] = useState<{ route: string; seat: string; departs: string } | null>(null);
  const [medicalBooked, setMedicalBooked] = useState<{ doctor: string; date: string } | null>(null);

  const files = useMemo(() => seedFiles, []);
  const results = useMemo(() => seedResults, []);
  const clubs = useMemo(() => seedClubs, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const claimMeal = () => {
    setMeal((prev) => {
      if (prev.claimed >= prev.total) return prev;
      const ticket = `M-${String(prev.claimed + 1).padStart(3, "0")}`;
      toast.success(`Lunch ticket ${ticket} claimed — show it at the counter.`);
      return { ...prev, claimed: prev.claimed + 1, lastTicket: ticket };
    });
  };

  const bookTransport = (routeId: number) => {
    const route = routes.find((r) => r.id === routeId);
    if (!route || route.free <= 0) return;
    const seat = `T-${routeId}-${String(route.seats - route.free).padStart(2, "0")}`;
    setRoutes((prev) => prev.map((r) => (r.id === routeId ? { ...r, free: r.free - 1 } : r)));
    setTransportBooked({ route: route.name, seat, departs: route.departs });
    toast.success(`Seat ${seat} confirmed on ${route.name}. QR ticket ready.`);
  };

  const bookMedical = (doctorId: number) => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc || !doc.available) return;
    setMedicalBooked({ doctor: doc.name, date: "Tomorrow, 11:00 am" });
    toast.success(`Appointment with ${doc.name} booked — reminder will follow.`);
  };

  const registerEvent = (eventId: number) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId && e.registered < e.capacity
          ? { ...e, registered: e.registered + 1 }
          : e,
      ),
    );
    toast.success("Registered! Your seat is held — payment link sent.");
  };

  const publishNotice = (n: { title: string; category: string; body: string; urgent: boolean }) => {
    setNotices((prev) => [
      {
        id: Date.now(),
        title: n.title,
        category: n.category,
        urgent: n.urgent,
        body: n.body,
        date: "05 Aug 2026",
        author: "Faculty Desk",
      },
      ...prev,
    ]);
  };

  const toggleDoctor = (id: number) => {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d)));
  };

  const addTip = (tip: string) => setMedicalTips((prev) => [...prev, tip]);
  const removeTip = (index: number) =>
    setMedicalTips((prev) => prev.filter((_, i) => i !== index));

  const addEvent = (e: { club: string; title: string; date: string; venue: string; price: number; capacity: number }) => {
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        club: e.club,
        title: e.title,
        date: e.date,
        venue: e.venue,
        price: e.price,
        capacity: e.capacity,
        registered: 0,
      },
    ]);
  };

  const active = ROLES.find((r) => r.key === role)!;

  return (
    <div className="min-h-screen bg-paper">
      {/* Portal masthead */}
      <header className="border-b border-ink/60 bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              Campus<span className="text-newsprint">Dash</span>
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft sm:inline">
              {active.sub} · {active.label}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft sm:inline">
              {user?.email ?? "Signed in"}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-sm border-ink/40 bg-transparent font-mono text-[10px] uppercase tracking-[0.16em] text-ink hover:bg-ink hover:text-paper"
              onClick={handleSignOut}
            >
              <LogOut className="size-3.5" />
              Sign out
            </Button>
          </div>
        </div>
        {/* Dateline */}
        <div className="border-t border-ink/40">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft sm:px-6">
            <span>Portal edition — one login, four desks</span>
            <span className="hidden sm:inline">Role identified → workspace opened</span>
          </div>
        </div>
      </header>

      {/* Role bar */}
      <div className="border-b border-ink/60 bg-sheet">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="flex items-stretch gap-1 overflow-x-auto" aria-label="Role switcher">
            {ROLES.map((r) => {
              const isActive = r.key === role;
              return (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 border-x border-transparent px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.16em] transition-colors sm:px-5",
                    isActive
                      ? "border-x-ink/30 bg-ink text-paper"
                      : "text-ink-soft hover:bg-muted hover:text-ink",
                  )}
                >
                  <r.icon className="size-3.5" />
                  {r.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {role === "student" && (
          <StudentHub
            userName={user?.name ?? undefined}
            notices={notices}
            events={events}
            meal={meal}
            doctors={doctors}
            routes={routes}
            files={files}
            transportBooked={transportBooked}
            medicalBooked={medicalBooked}
            onClaimMeal={claimMeal}
            onBookTransport={bookTransport}
            onBookMedical={bookMedical}
            onRegisterEvent={registerEvent}
          />
        )}
        {role === "faculty" && (
          <FacultyDesk notices={notices} files={files} results={results} onPublishNotice={publishNotice} />
        )}
        {role === "medical" && (
          <MedicalAdminDesk
            medicalTips={medicalTips}
            doctors={doctors}
            medicalBooked={medicalBooked}
            onToggleDoctor={toggleDoctor}
            onAddTip={addTip}
            onRemoveTip={removeTip}
          />
        )}
        {role === "host" && (
          <EventHostDesk events={events} clubs={clubs} onAddEvent={addEvent} onRegisterEvent={registerEvent} />
        )}

        <p className="mt-14 border-t border-ink/30 pt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          Demo runs on seeded data — notices, events, and counters swap for Convex tables when the
          backend is wired.
        </p>
      </main>
    </div>
  );
}
