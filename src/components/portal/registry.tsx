import type { ComponentType } from "react";
import { AiServices, NoticeHub, NotificationsPage, ResultsPage } from "@/components/portal/notice";
import { MedicalPage, MealPage, TransportPage } from "@/components/portal/bookings";
import {
  ClubsPage,
  EventsPage,
  MaterialsPage,
  NotesDrive,
  NotesEngine,
  PdfMaker,
  StudentPaymentsPage,
} from "@/components/portal/student";
import { FacultyMaterialsPage, PdfUploadPage } from "@/components/portal/faculty";
import {
  AppointmentsPage,
  DoctorAvailabilityPage,
  ManageContentPage,
  MedicalInfoPage,
  VisitRecordsPage,
} from "@/components/portal/medical";
import {
  AnalyticsPage,
  AnnouncementsPage,
  CreateEventsPage,
  FinancePage,
  HostPaymentsPage,
  MembersPage,
  RegistrationsPage,
} from "@/components/portal/host";

export const ROLE_MODULES: Record<string, Record<string, ComponentType>> = {
  student: {
    "notice-hub": NoticeHub,
    materials: MaterialsPage,
    "notes-drive": NotesDrive,
    "notes-engine": NotesEngine,
    "pdf-maker": PdfMaker,
    medical: MedicalPage,
    transport: TransportPage,
    meal: MealPage,
    clubs: ClubsPage,
    events: EventsPage,
    payments: StudentPaymentsPage,
    results: ResultsPage,
    ai: AiServices,
    notifications: NotificationsPage,
  },
  faculty: {
    "notice-hub": () => <NoticeHub faculty />,
    materials: FacultyMaterialsPage,
    "notes-drive": NotesDrive,
    "pdf-upload": PdfUploadPage,
    "notes-engine": NotesEngine,
    "pdf-maker": PdfMaker,
    results: ResultsPage,
    ai: AiServices,
    notifications: NotificationsPage,
  },
  medical: {
    "medical-info": MedicalInfoPage,
    "manage-content": ManageContentPage,
    "doctor-availability": DoctorAvailabilityPage,
    appointments: AppointmentsPage,
    "visit-records": VisitRecordsPage,
    notifications: NotificationsPage,
  },
  host: {
    "create-events": CreateEventsPage,
    registrations: RegistrationsPage,
    payments: HostPaymentsPage,
    members: MembersPage,
    finance: FinancePage,
    announcements: AnnouncementsPage,
    analytics: AnalyticsPage,
  },
};
