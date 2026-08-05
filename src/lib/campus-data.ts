// Seed data and shared types for the CampusDash demo.
// These mirror the modules described in the CampusDash brief and the merged
// flowchart — swap for Convex tables when wiring the real backend.

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
};

export const seedFiles: DriveFile[] = [
  { id: 1, name: "Data Structures — Lecture 12.pdf", folder: "CSE 201", size: "1.4 MB", kind: "pdf" },
  { id: 2, name: "OOP Midterm Short Notes", folder: "CSE 203", size: "24 KB", kind: "note" },
  { id: 3, name: "Physics Lab Manual 2026.pdf", folder: "PHY 101", size: "3.1 MB", kind: "pdf" },
  { id: 4, name: "Linear Algebra — Problem Set 4", folder: "MATH 205", size: "18 KB", kind: "note" },
  { id: 5, name: "Thermodynamics Slides (Week 6).pdf", folder: "ME 110", size: "2.2 MB", kind: "pdf" },
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

// ─── Editorial content (from the CampusDash brief) ──────────────────────────

export const problemRows = [
  {
    area: "Academic",
    student: "Scattered notices; notes & PDFs on personal devices; hard to find materials.",
    staff: "Hard to distribute materials and official notices reliably to everyone.",
  },
  {
    area: "Health",
    student: "Difficult to book medical appointments; unclear doctor availability.",
    staff: "Manual coordination of appointments and limited visibility of activity.",
  },
  {
    area: "Transport",
    student: "Uncertain schedules; no easy seat booking or bus tracking.",
    staff: "Little real-time insight into demand and capacity.",
  },
  {
    area: "Meals",
    student: "Paper/informal tickets; no live view of remaining meal slots.",
    staff: "Hard to forecast demand; queues and waste.",
  },
  {
    area: "Clubs & Events",
    student: "Manual registration and payment for events.",
    staff: "Clubs struggle with member lists, event tracking, and payments.",
  },
];

export const modules = [
  {
    no: "4.1",
    title: "Centralized AI",
    blurb: "An AI layer inside the dashboard that helps both students and teachers.",
    items: [
      "Smart search across notices, notes, and PDFs",
      "Summarization of long documents and lectures",
      "Campus chatbot for schedules, how-tos, locations",
      "Suggestions for events, notices, study materials",
    ],
  },
  {
    no: "4.2",
    title: "Student Hub",
    blurb: "The home screen for every student — everything important in one view.",
    items: [
      "Personalized dashboard by role and needs",
      "Quick actions: meal, transport seat, medical appointment",
      "Latest official notices and club announcements",
      "Upcoming events and notifications",
    ],
  },
  {
    no: "4.3",
    title: "PDF & Notes Drive · Notes Engine · PDF Maker",
    blurb: "A notebook-style system with LLM-style capabilities.",
    items: [
      "Cloud storage for lecture PDFs and notes with folders & sharing",
      "Notes Engine: write and organize; AI tags and summarizes",
      "PDF Maker: notes → clean PDFs, merge, basic formatting",
      "Content-aware search — not just file names",
    ],
  },
  {
    no: "4.4",
    title: "Medical Appointment Booking",
    blurb: "Digital help for the campus medical center.",
    items: [
      "View doctor / medical staff availability",
      "Book appointments online",
      "Reminders so slots are not missed",
      "Privacy-controlled visit support",
    ],
  },
  {
    no: "4.5",
    title: "Transport Online Ticket",
    blurb: "Like an online ticket counter for campus buses.",
    items: [
      "Clear routes and schedules",
      "Book a seat online — capacity-aware",
      "Digital ticket (QR) for boarding",
      "Bus tracking so students stop guessing",
    ],
  },
  {
    no: "4.6",
    title: "Online Meal Ticket",
    blurb: "Digital meal tickets with a live counter for the meal ratio.",
    items: [
      "Claim or book meal tickets digitally",
      "Real-time ratio: remaining slots vs. claimed",
      "Fewer queues and paper coupons",
      "Cafeteria staff see demand and plan better",
    ],
  },
  {
    no: "4.7",
    title: "Official Notice Hub",
    blurb: "One official place for academic and institutional notices.",
    items: [
      "Central feed: exams, results, circulars, announcements",
      "Categories and search so notices are not buried",
      "Alerts for urgent or high-priority notices",
    ],
  },
  {
    no: "4.8",
    title: "Clubs, Events & Club Dashboards",
    blurb: "Everything about NITER clubs — join, run, and manage.",
    items: [
      "Clubs publish events; students browse and register",
      "Online booking & payment when required",
      "Personalized club dashboards and member roles",
      "Finance tracking for paid events",
    ],
  },
];

export const accessRows = [
  {
    role: "Visitor (Public)",
    login: "No",
    access: "View all information on the Home Page, including Medical Information.",
    isNew: false,
  },
  {
    role: "Student",
    login: "Yes — University ID",
    access: "Student Section: Notice, Materials, Booking, Club, Result + AI assistant.",
    isNew: false,
  },
  {
    role: "Faculty / Teacher",
    login: "Yes — Faculty ID",
    access: "Faculty Section: Notice (publish), Materials (share), Result.",
    isNew: false,
  },
  {
    role: "Medical Admin (Host)",
    login: "Yes — Admin ID",
    access: "Medical Admin Section: update & manage medical information, availability, visits.",
    isNew: false,
  },
  {
    role: "Event Host",
    login: "Yes — University ID",
    access: "Event Management workspace — plus full Student Section (hosts are all students).",
    isNew: true,
  },
];

export const benefits = {
  students: [
    "One place for campus life instead of many apps and groups",
    "Faster booking for meals, transport, and medical visits",
    "Better access to notes, books, study materials, and official notices",
    "Easier club event participation with online registration and payment",
  ],
  teachers: [
    "Reliable channel to publish official academic notices",
    "Organized way to share lecture materials and PDFs",
    "Less time on repeated manual coordination",
    "Clearer visibility that students receive important information",
  ],
  operations: [
    "Live meal ratio helps cafeteria planning and reduces waste",
    "Clearer transport demand and seat management",
    "Clubs become more organized with digital tools",
    "Overall reduction in paper-based and fragmented processes",
  ],
};

// What was added to the flowchart from the CampusDash brief (displayed on the blueprint page)
export const mergedAdditions = [
  {
    title: "Centralized AI layer",
    where: "Student & Faculty sections",
    note: "Smart search, document summarization, campus chatbot, suggestions.",
  },
  {
    title: "Medical appointment booking",
    where: "Student → Booking · Medical Admin",
    note: "Doctor availability, online booking, reminders, privacy-controlled visit support.",
  },
  {
    title: "Transport online ticket",
    where: "Student → Booking",
    note: "Routes & schedules, capacity-aware seat booking, digital QR ticket, bus tracking.",
  },
  {
    title: "Online meal ticket",
    where: "Student → Booking",
    note: "Digital tickets with a live meal-ratio counter for remaining slots.",
  },
  {
    title: "Notes Drive · Notes Engine · PDF Maker",
    where: "Student & Faculty → Materials",
    note: "Folders, sharing, access control, AI tagging & summarization, PDF generation.",
  },
  {
    title: "Notice hub upgrades",
    where: "Student & Faculty → Notice",
    note: "Categories, search, urgent/high-priority alerts, teacher publishing.",
  },
  {
    title: "Event Host role (new column)",
    where: "After “Identify User Role”",
    note: "Event management moved out of the Student Section per request — hosts are all students and keep full Student access.",
    highlight: true,
  },
];
