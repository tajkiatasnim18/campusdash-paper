import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  seedAnnouncements,
  seedAppointments,
  seedClubs,
  seedDoctors,
  seedEvents,
  seedFiles,
  seedMeal,
  seedMedicalContent,
  seedMedicalTips,
  seedNotes,
  seedNotices,
  seedPayments,
  seedResults,
  seedRoutes,
  seedVisitRecords,
  type Announcement,
  type Appointment,
  type BusRoute,
  type CampusEvent,
  type Doctor,
  type DriveFile,
  type MealState,
  type MedicalContentItem,
  type NoteEntry,
  type Notice,
  type PaymentRecord,
  type ResultRow,
  type VisitRecord,
} from "@/lib/campus-data";

export type RegistrationState = "registered" | "paid";

export type NotificationItem = {
  tone: "urgent" | "ok" | "info";
  text: string;
  time: string;
};

type PortalApi = {
  // data
  notices: Notice[];
  files: DriveFile[];
  notes: NoteEntry[];
  doctors: Doctor[];
  appointments: Appointment[];
  visitRecords: VisitRecord[];
  routes: BusRoute[];
  meal: MealState;
  clubs: typeof seedClubs;
  myClubs: string[];
  events: CampusEvent[];
  myRegistrations: Record<number, RegistrationState>;
  payments: PaymentRecord[];
  medicalTips: string[];
  medicalContent: MedicalContentItem[];
  announcements: Announcement[];
  results: ResultRow[];
  transportBooked: { route: string; seat: string; departs: string } | null;
  notifications: NotificationItem[];
  // actions
  publishNotice: (n: { title: string; category: string; body: string; urgent: boolean }) => void;
  addFile: (f: { name: string; folder: string; size: string; kind: DriveFile["kind"]; shared?: boolean }) => void;
  toggleShare: (id: number) => void;
  addNote: (n: { title: string; content: string; tags: string[] }) => void;
  deleteNote: (id: number) => void;
  bookMedical: (doctorId: number) => void;
  completeAppointment: (id: number) => void;
  toggleDoctor: (id: number) => void;
  bookTransport: (routeId: number) => void;
  claimMeal: () => void;
  joinClub: (name: string) => void;
  leaveClub: (name: string) => void;
  registerEvent: (eventId: number) => void;
  payEvent: (eventId: number) => void;
  addEvent: (e: { club: string; title: string; date: string; venue: string; price: number; capacity: number }) => void;
  addTip: (tip: string) => void;
  removeTip: (index: number) => void;
  addContent: (title: string) => void;
  removeContent: (id: number) => void;
  toggleContent: (id: number) => void;
  addAnnouncement: (a: { club: string; title: string; body: string }) => void;
};

const PortalContext = createContext<PortalApi | null>(null);

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used inside <PortalProvider>");
  return ctx;
}

export function PortalProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>(seedNotices);
  const [files, setFiles] = useState<DriveFile[]>(seedFiles);
  const [notes, setNotes] = useState<NoteEntry[]>(seedNotes);
  const [doctors, setDoctors] = useState<Doctor[]>(seedDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const [visitRecords] = useState<VisitRecord[]>(seedVisitRecords);
  const [routes, setRoutes] = useState<BusRoute[]>(seedRoutes);
  const [meal, setMeal] = useState<MealState>(seedMeal);
  const clubs = seedClubs;
  const [myClubs, setMyClubs] = useState<string[]>(["AI & Robotics Club"]);
  const [events, setEvents] = useState<CampusEvent[]>(seedEvents);
  const [myRegistrations, setMyRegistrations] = useState<Record<number, RegistrationState>>({ 1: "registered" });
  const [payments, setPayments] = useState<PaymentRecord[]>(seedPayments);
  const [medicalTips, setMedicalTips] = useState<string[]>(seedMedicalTips);
  const [medicalContent, setMedicalContent] = useState<MedicalContentItem[]>(seedMedicalContent);
  const [announcements, setAnnouncements] = useState<Announcement[]>(seedAnnouncements);
  const results = seedResults;
  const [transportBooked, setTransportBooked] = useState<{ route: string; seat: string; departs: string } | null>(null);

  const publishNotice: PortalApi["publishNotice"] = (n) => {
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

  const addFile: PortalApi["addFile"] = (f) => {
    setFiles((prev) => [{ id: Date.now(), ...f }, ...prev]);
  };

  const toggleShare = (id: number) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, shared: !f.shared } : f)));
  };

  const addNote: PortalApi["addNote"] = (n) => {
    setNotes((prev) => [{ id: Date.now(), updated: "05 Aug", ...n }, ...prev]);
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const bookMedical = (doctorId: number) => {
    const doc = doctors.find((d) => d.id === doctorId);
    if (!doc || !doc.available) return;
    setAppointments((prev) => [
      ...prev,
      { id: Date.now(), doctor: doc.name, date: "Tomorrow, 11:00 am", patient: "You", status: "booked" },
    ]);
  };

  const completeAppointment = (id: number) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "completed" } : a)));
  };

  const toggleDoctor = (id: number) => {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, available: !d.available } : d)));
  };

  const bookTransport = (routeId: number) => {
    const route = routes.find((r) => r.id === routeId);
    if (!route || route.free <= 0) return;
    const seat = `T-${routeId}-${String(route.seats - route.free).padStart(2, "0")}`;
    setRoutes((prev) => prev.map((r) => (r.id === routeId ? { ...r, free: r.free - 1 } : r)));
    setTransportBooked({ route: route.name, seat, departs: route.departs });
  };

  const claimMeal = () => {
    setMeal((prev) => {
      if (prev.claimed >= prev.total) return prev;
      const ticket = `M-${String(prev.claimed + 1).padStart(3, "0")}`;
      return { ...prev, claimed: prev.claimed + 1, lastTicket: ticket };
    });
  };

  const joinClub = (name: string) => setMyClubs((prev) => (prev.includes(name) ? prev : [...prev, name]));
  const leaveClub = (name: string) => setMyClubs((prev) => prev.filter((c) => c !== name));

  const registerEvent = (eventId: number) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId && e.registered < e.capacity ? { ...e, registered: e.registered + 1 } : e)),
    );
    setMyRegistrations((prev) => (prev[eventId] ? prev : { ...prev, [eventId]: "registered" }));
  };

  const payEvent = (eventId: number) => {
    const ev = events.find((e) => e.id === eventId);
    if (!ev || ev.price === 0) return;
    setMyRegistrations((prev) => ({ ...prev, [eventId]: "paid" }));
    setPayments((prev) => [
      { id: Date.now(), event: ev.title, club: ev.club, amount: ev.price, method: "bKash", status: "paid" },
      ...prev,
    ]);
  };

  const addEvent: PortalApi["addEvent"] = (e) => {
    setEvents((prev) => [
      ...prev,
      { id: Date.now(), club: e.club, title: e.title, date: e.date, venue: e.venue, price: e.price, capacity: e.capacity, registered: 0 },
    ]);
  };

  const addTip = (tip: string) => setMedicalTips((prev) => [...prev, tip]);
  const removeTip = (index: number) => setMedicalTips((prev) => prev.filter((_, i) => i !== index));

  const addContent = (title: string) =>
    setMedicalContent((prev) => [...prev, { id: Date.now(), title, published: true }]);
  const removeContent = (id: number) => setMedicalContent((prev) => prev.filter((c) => c.id !== id));
  const toggleContent = (id: number) =>
    setMedicalContent((prev) => prev.map((c) => (c.id === id ? { ...c, published: !c.published } : c)));

  const addAnnouncement: PortalApi["addAnnouncement"] = (a) => {
    setAnnouncements((prev) => [{ id: Date.now(), date: "05 Aug", ...a }, ...prev]);
  };

  const notifications = useMemo<NotificationItem[]>(() => {
    const items: NotificationItem[] = [];
    notices
      .filter((n) => n.urgent)
      .forEach((n) => items.push({ tone: "urgent", text: `URGENT — ${n.title}`, time: n.date }));
    if (meal.lastTicket) items.push({ tone: "ok", text: `Meal ticket ${meal.lastTicket} claimed — show at the counter`, time: "Today" });
    if (transportBooked) items.push({ tone: "ok", text: `Seat ${transportBooked.seat} confirmed — ${transportBooked.route}`, time: "Today" });
    const latest = appointments[appointments.length - 1];
    if (latest) items.push({ tone: "ok", text: `Appointment with ${latest.doctor} (${latest.date})`, time: "Today" });
    announcements.forEach((a) => items.push({ tone: "info", text: `${a.club}: ${a.title}`, time: a.date }));
    Object.entries(myRegistrations).forEach(([key, state]) => {
      const ev = events.find((e) => e.id === Number(key));
      if (!ev) return;
      items.push(
        state === "paid"
          ? { tone: "ok", text: `Paid ৳${ev.price} — ${ev.title}`, time: "Today" }
          : { tone: "info", text: `Registered — ${ev.title}`, time: "Today" },
      );
    });
    return items.slice(0, 14);
  }, [notices, meal.lastTicket, transportBooked, appointments, announcements, myRegistrations, events]);

  const value: PortalApi = {
    notices, files, notes, doctors, appointments, visitRecords, routes, meal, clubs, myClubs,
    events, myRegistrations, payments, medicalTips, medicalContent, announcements, results,
    transportBooked, notifications,
    publishNotice, addFile, toggleShare, addNote, deleteNote, bookMedical, completeAppointment,
    toggleDoctor, bookTransport, claimMeal, joinClub, leaveClub, registerEvent, payEvent, addEvent,
    addTip, removeTip, addContent, removeContent, toggleContent, addAnnouncement,
  };

  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}
