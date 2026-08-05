import {
  Award,
  Banknote,
  BarChart3,
  BellRing,
  Bus,
  CalendarCheck,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileCheck2,
  FileOutput,
  FolderOpen,
  HardDrive,
  HeartPulse,
  Megaphone,
  Newspaper,
  NotebookPen,
  PlusCircle,
  SlidersHorizontal,
  Sparkles,
  Stethoscope,
  Upload,
  UserCog,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type RoleKey = "student" | "faculty" | "medical" | "host";

export type ModuleDef = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type RoleDef = {
  key: RoleKey;
  label: string;
  sub: string;
  modules: ModuleDef[];
};

export const PORTAL_ROLES: RoleDef[] = [
  {
    key: "student",
    label: "Student",
    sub: "Student Section",
    modules: [
      { id: "notice-hub", label: "Notice Hub", icon: Newspaper },
      { id: "materials", label: "Materials", icon: FolderOpen },
      { id: "notes-drive", label: "Notes Drive", icon: HardDrive },
      { id: "notes-engine", label: "Notes Engine", icon: NotebookPen },
      { id: "pdf-maker", label: "PDF Maker", icon: FileOutput },
      { id: "medical", label: "Medical Appointment", icon: Stethoscope },
      { id: "transport", label: "Transport Ticket", icon: Bus },
      { id: "meal", label: "Meal Ticket", icon: Utensils },
      { id: "clubs", label: "Club Dashboard", icon: Users },
      { id: "events", label: "Event Registration", icon: CalendarCheck },
      { id: "payments", label: "Event Payment", icon: CreditCard },
      { id: "results", label: "Result", icon: Award },
      { id: "ai", label: "AI Assistant", icon: Sparkles },
      { id: "notifications", label: "Notifications", icon: BellRing },
    ],
  },
  {
    key: "faculty",
    label: "Faculty / Teacher",
    sub: "Faculty Section",
    modules: [
      { id: "notice-hub", label: "Notice Hub", icon: Newspaper },
      { id: "materials", label: "Materials", icon: FolderOpen },
      { id: "notes-drive", label: "Notes Drive", icon: HardDrive },
      { id: "pdf-upload", label: "PDF Upload", icon: Upload },
      { id: "notes-engine", label: "Notes Engine", icon: NotebookPen },
      { id: "pdf-maker", label: "PDF Maker", icon: FileOutput },
      { id: "results", label: "Result", icon: Award },
      { id: "ai", label: "AI Assistant", icon: Sparkles },
      { id: "notifications", label: "Notifications", icon: BellRing },
    ],
  },
  {
    key: "medical",
    label: "Medical Admin",
    sub: "Medical Admin Section",
    modules: [
      { id: "medical-info", label: "Update Medical Information", icon: HeartPulse },
      { id: "manage-content", label: "Manage Medical Content", icon: SlidersHorizontal },
      { id: "doctor-availability", label: "Doctor Availability", icon: CalendarClock },
      { id: "appointments", label: "Appointment Management", icon: ClipboardList },
      { id: "visit-records", label: "Visit Records", icon: FileCheck2 },
      { id: "notifications", label: "Notifications", icon: BellRing },
    ],
  },
  {
    key: "host",
    label: "Event Host",
    sub: "Event Host Section",
    modules: [
      { id: "create-events", label: "Create Events", icon: PlusCircle },
      { id: "registrations", label: "Event Registration", icon: ClipboardCheck },
      { id: "payments", label: "Online Payment", icon: Banknote },
      { id: "members", label: "Member Management", icon: UserCog },
      { id: "finance", label: "Finance Tracking", icon: Wallet },
      { id: "announcements", label: "Club Announcements", icon: Megaphone },
      { id: "analytics", label: "Event Analytics", icon: BarChart3 },
    ],
  },
];

export function getRole(key: string | undefined): RoleDef | undefined {
  return PORTAL_ROLES.find((r) => r.key === key);
}

export function getModule(role: RoleDef, id: string | undefined): ModuleDef {
  return role.modules.find((m) => m.id === id) ?? role.modules[0];
}
