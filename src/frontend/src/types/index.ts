// Re-export backend types for use throughout the app
export type {
  Course,
  CourseId,
  AdmissionApplicationView,
  ApplicationId,
  ApplicationInput,
  StudentView,
  StudentId,
  StudentInput,
  StudentUpdateInput,
  Notice,
  NoticeId,
  Certificate,
  CertificateId,
  Timestamp,
  ExternalBlob,
  AttendanceRecord,
  AttendanceSummary,
  LeaveRequestView,
  LeaveRequestInput,
  LeaveRequestId,
  AttendanceId,
} from "../backend";

export { AttendanceStatus, LeaveStatus } from "../backend";

export enum ApplicationStatus {
  pending = "pending",
  approved = "approved",
  rejected = "rejected",
}

// Auth session types
export interface AdminSession {
  loginId: string;
  password: string;
  isAuthenticated: boolean;
}

export interface StudentSession {
  studentId: bigint;
  username: string;
  name: string;
  isAuthenticated: boolean;
}

export interface AuthState {
  admin: AdminSession | null;
  student: StudentSession | null;
}

// UI helper types
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface NavItem {
  label: string;
  href: string;
  requiresAuth?: "admin" | "student";
}

export const COURSE_LIST = [
  {
    id: "dca",
    name: "DCA",
    fullName: "Diploma in Computer Applications",
    duration: 12,
  },
  {
    id: "adca",
    name: "ADCA",
    fullName: "Advanced Diploma in Computer Applications",
    duration: 18,
  },
  {
    id: "excel",
    name: "Excel Mastery",
    fullName: "Excel Mastery & Data Analysis",
    duration: 3,
  },
  {
    id: "ms-office",
    name: "MS Office Suite",
    fullName: "MS Office Suite (Word, Excel, PowerPoint)",
    duration: 6,
  },
  {
    id: "tally",
    name: "Tally",
    fullName: "Tally & Accounting Software",
    duration: 6,
  },
  {
    id: "dtp",
    name: "DTP",
    fullName: "Desktop Publishing (Photoshop, CorelDraw)",
    duration: 6,
  },
  {
    id: "hardware",
    name: "Hardware & Networking",
    fullName: "Computer Hardware & Networking",
    duration: 12,
  },
  {
    id: "programming",
    name: "Programming",
    fullName: "Programming Fundamentals (C, C++, Python)",
    duration: 12,
  },
] as const;
