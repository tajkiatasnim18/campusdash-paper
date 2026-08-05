// Seed data and shared types for the CampusDash portal pages.
// These mirror the modules in the flowchart — swap for Convex tables when
// wiring the real backend.

export type Notice = {
  id: number;
  title: string;
  category: string;
  urgent?: boolean;
  body: string;
  date: string;
  author: string;
};

export const seedNotices: Notice[] = [
  {
    id: 1,
    title: "Midterm Examination Routine — Fall 2026",
    category: "Exams",
    urgent: true,
    body: "The midterm routine for all departments has been published. Exams begin Monday, 10 August. Hall tickets will be available on the portal from Friday.",
    date: "05 Aug 2026",
    author: "Office of the Registrar",
  },
  {
    id: 2,
    title: "Library to stay open until 11 pm during exam week",
    category: "General",
    body: "The central library will extend its hours from 7 August through 14 August. Quiet floors 3 & 4 open for overnight study.",
    date: "04 Aug 2026",
    author: "Central Library",
  },
  {
    id: 3,
    title: "Semester Final Results Published",
    category: "Results",
    body: "Final results for the previous semester are now live under Results. Grade review requests close on 15 August.",
    date: "03 Aug 2026",
    author: "Examination Committee",
  },
  {
    id: 4,
    title: "Campus Wi-Fi maintenance — Sunday, 10 pm to 2 am",
    category: "IT",
    body: "The campus network will be intermittently unavailable during scheduled maintenance. Meal and transport counters will still work offline.",
    date: "02 Aug 2026",
    author: "IT Services",
  },
  {
    id: 5,
    title: "Blood donation camp at the Medical Center",
    category: "Medical",
    body: "A voluntary blood donation camp runs at the Medical Center, 10 am to 4 pm. Registration at the front desk or via the portal.",
    date: "01 Aug 2026",
    author: "Campus Medical Center",
  },
];

export type CampusEvent = {
  id: number;
  club: string;
  title: string;
  date: string;
  venue: string;
  price: number; // 0 = free
  registered: number;
  capacity: number;
};

export const seedEvents: CampusEvent[] = [
  {
    id: 1,
    club: "AI & Robotics Club",
    title: "TechNova 2026 — Tech & Innovation Fest",
    date: "22 Aug 2026",
    venue: "Central Auditorium",
    price: 500,
    registered: 214,
    capacity: 400,
  },
  {
    id: 2,
    club: "Cultural Society",
    title: "Annual Cultural Night",
    date: "28 Aug 2026",
    venue: "Open Air Stage",
    price: 300,
    registered: 168,
    capacity: 300,
  },
  {
    id: 3,
    club: "CSE Club",
    title: "CSE Career Fair — companies on campus",
    date: "05 Sep 2026",
    venue: "Main Building, Hall 2",
    price: 0,
    registered: 301,
    capacity: 500,
  },
  {
    id: 4,
    club: "Sports Club",
    title: "Inter-Department Football Tournament",
    date: "12 Sep 2026",
    venue: "Main Field",
    price: 100,
    registered: 96,
    capacity: 120,
  },
];

export type Doctor = {
  id: number;
  name: string;
  title: string;
  hours: string;
  available: boolean;
};

export const seedDoctors: Doctor[] = [
  { id: 1, name: "Dr. Ayesha Rahman", title: "General Physician", hours: "9 am – 1 pm", available: true },
  { id: 2, name: "Dr. Tanvir Hossain", title: "Medicine", hours: "2 pm – 6 pm", available: true },
  { id: 3, name: "Dr. Nusrat Jahan", title: "Dental Care", hours: "Tue & Thu, 10 am – 2 pm", available: false },
  { id: 4, name: "Dr. Kamal Uddin", title: "First Aid & Emergency", hours: "On call", available: true },
];

export type BusRoute = {
  id: number;
  name: string;
  stops: string;
  departs: string;
  seats: number;
  free: number;
};

export const seedRoutes: BusRoute[] = [
  { id: 1, name: "Route 1 — Campus ⇄ Uttara", stops: "NITER → House Building → Uttara Sector 12", departs: "7:00 / 14:30", seats: 42, free: 9 },
  { id: 2, name: "Route 2 — Campus ⇄ Mirpur", stops: "NITER → Kachijhuli → Mirpur 10", departs: "7:15 / 15:00", seats: 38, free: 4 },
  { id: 3, name: "Route 3 — Campus ⇄ Dhanmondi", stops: "NITER → Asulia → Dhanmondi 27", departs: "6:45 / 14:00", seats: 40, free: 17 },
];

export type DriveFile = {
  id: number;
  name: string;
  folder: string;
  size: string;
  kind: "pdf" | "note";
  shared?: boolean;
};

export const seedFiles: DriveFile[] = [
  { id: 1, name: "Data Structures — Lecture 12.pdf", folder: "CSE 201", size: "1.4 MB", kind: "pdf", shared: true },
  { id: 2, name: "OOP Midterm Short Notes", folder: "CSE 203", size: "24 KB", kind: "note", shared: true },
  { id: 3, name: "Physics Lab Manual 2026.pdf", folder: "PHY 101", size: "3.1 MB", kind: "pdf", shared: false },
  { id: 4, name: "Linear Algebra — Problem Set 4", folder: "MATH 205", size: "18 KB", kind: "note", shared: false },
  { id: 5, name: "Thermodynamics Slides (Week 6).pdf", folder: "ME 110", size: "2.2 MB", kind: "pdf", shared: true },
];

export type ResultRow = {
  course: string;
  title: string;
  credits: number;
  grade: string;
  points: number;
};

export const seedResults: ResultRow[] = [
  { course: "CSE 201", title: "Data Structures", credits: 3, grade: "A", points: 12 },
  { course: "CSE 203", title: "Object Oriented Programming", credits: 3, grade: "A-", points: 10.5 },
  { course: "MATH 205", title: "Linear Algebra", credits: 3, grade: "B+", points: 9 },
  { course: "PHY 101", title: "Physics I", credits: 3, grade: "A", points: 12 },
  { course: "ENG 102", title: "Technical English", credits: 2, grade: "A", points: 8 },
];

export type Club = {
  name: string;
  members: number;
  role: "Admin" | "Member";
};

export const seedClubs: Club[] = [
  { name: "AI & Robotics Club", members: 240, role: "Admin" },
  { name: "Cultural Society", members: 180, role: "Member" },
  { name: "CSE Club", members: 320, role: "Member" },
  { name: "Sports Club", members: 150, role: "Member" },
];

export const seedMedicalTips = [
  "Stay hydrated — carry a water bottle during exam week.",
  "Wash hands before meals at the cafeteria to avoid seasonal flu.",
  "For minor burns, run cool water over the area for 10 minutes before visiting the center.",
  "Know the emergency line: campus medical extension 4444.",
  "Dengue season: use repellent and report standing water near hostels.",
];

export type MealState = { total: number; claimed: number; lastTicket?: string };

export const seedMeal: MealState = { total: 200, claimed: 137 };

// ─── New seeds for the flowchart-driven pages ─────────────────────────────

export type NoteEntry = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  updated: string;
};

export const seedNotes: NoteEntry[] = [
  {
    id: 1,
    title: "Data Structures — Quick Recap",
    content: "Trees: a balanced BST keeps search at O(log n). Heaps power priority queues. Graphs: BFS for shortest hops, DFS for connectivity. Practice one tree traversal per day before the midterm.",
    tags: ["data-structures", "midterm"],
    updated: "04 Aug",
  },
  {
    id: 2,
    title: "OOP — Four Pillars",
    content: "Encapsulation hides state behind methods. Inheritance reuses behavior. Polymorphism lets one interface drive many implementations. Abstraction keeps callers simple.",
    tags: ["oop", "cse-203"],
    updated: "03 Aug",
  },
  {
    id: 3,
    title: "DB Normalization (1NF–3NF)",
    content: "1NF: atomic columns. 2NF: no partial dependency on a composite key. 3NF: no transitive dependency. In practice, stop at 3NF for most schemas.",
    tags: ["database"],
    updated: "01 Aug",
  },
];

export type Appointment = {
  id: number;
  doctor: string;
  date: string;
  patient: string;
  status: "booked" | "completed";
};

export const seedAppointments: Appointment[] = [
  { id: 1, doctor: "Dr. Tanvir Hossain", date: "06 Aug, 3:00 pm", patient: "CSE 2nd yr", status: "booked" },
  { id: 2, doctor: "Dr. Ayesha Rahman", date: "06 Aug, 11:30 am", patient: "BBA 1st yr", status: "booked" },
];

export type VisitRecord = {
  id: number;
  date: string;
  doctor: string;
  patient: string;
  note: string;
  status: "checked-in" | "completed";
};

export const seedVisitRecords: VisitRecord[] = [
  { id: 1, date: "04 Aug", doctor: "Dr. Ayesha Rahman", patient: "CSE 3rd yr", note: "Seasonal flu — rest, fluids, paracetamol", status: "completed" },
  { id: 2, date: "03 Aug", doctor: "Dr. Kamal Uddin", patient: "EEE 2nd yr", note: "Minor sprain — ankle wrap advised", status: "completed" },
  { id: 3, date: "03 Aug", doctor: "Dr. Tanvir Hossain", patient: "BBA 1st yr", note: "Migraine — follow-up in 5 days", status: "completed" },
  { id: 4, date: "02 Aug", doctor: "Dr. Nusrat Jahan", patient: "CSE 1st yr", note: "Dental checkup — cavity filling scheduled", status: "checked-in" },
];

export type Announcement = {
  id: number;
  club: string;
  title: string;
  body: string;
  date: string;
};

export const seedAnnouncements: Announcement[] = [
  { id: 1, club: "AI & Robotics Club", title: "Hands-on robotics workshop this Friday", body: "Lab 3, 4 pm. No prior experience needed — bring a laptop.", date: "05 Aug" },
  { id: 2, club: "Cultural Society", title: "Cultural Night auditions open", body: "Auditions at the Open Air Stage, Saturday 11 am.", date: "04 Aug" },
  { id: 3, club: "Sports Club", title: "Football trials — register by Thursday", body: "Trials on the Main Field, Friday 5 pm.", date: "03 Aug" },
];

export type PaymentRecord = {
  id: number;
  event: string;
  club: string;
  amount: number;
  method: string;
  status: "paid" | "pending";
};

export const seedPayments: PaymentRecord[] = [
  { id: 1, event: "TechNova 2026", club: "AI & Robotics Club", amount: 500, method: "bKash", status: "paid" },
  { id: 2, event: "Annual Cultural Night", club: "Cultural Society", amount: 300, method: "Rocket", status: "paid" },
  { id: 3, event: "Football Tournament", club: "Sports Club", amount: 100, method: "bKash", status: "pending" },
];

export type MedicalContentItem = {
  id: number;
  title: string;
  published: boolean;
};

export const seedMedicalContent: MedicalContentItem[] = [
  { id: 1, title: "Dengue Prevention Guide", published: true },
  { id: 2, title: "First Aid Basics", published: true },
  { id: 3, title: "Mental Health & Counseling Services", published: false },
  { id: 4, title: "Seasonal Flu — What to Do", published: true },
];
