import type { backendInterface, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillInformation, _ImmutableObjectStorageRefillResult } from "../backend";
import type { ApplicationStatus as CandidApplicationStatus } from "../declarations/backend.did.d.ts";
import { AttendanceStatus, LeaveStatus } from "../backend";

// Cast a status string to the candid variant ApplicationStatus type
function appStatus(s: "pending" | "approved" | "rejected"): CandidApplicationStatus {
  return { [s]: null } as unknown as CandidApplicationStatus;
}

const now = BigInt(Date.now()) * BigInt(1000000);

export const mockBackend: backendInterface = {
  // Object storage internal methods
  _immutableObjectStorageBlobsAreLive: async (hashes: Array<Uint8Array>) => hashes.map(() => true),
  _immutableObjectStorageBlobsToDelete: async (): Promise<Array<Uint8Array>> => [],
  _immutableObjectStorageConfirmBlobDeletion: async (): Promise<void> => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({ method: "mock", blob_hash: _blobHash }),
  _immutableObjectStorageRefillCashier: async (_info: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> => ({ success: true }),
  _immutableObjectStorageUpdateGatewayPrincipals: async (): Promise<void> => undefined,

  adminLogin: async () => true,

  adminCreateStudent: async (_loginId, _password, input) => ({
    id: BigInt(1),
    username: input.username,
    enrolled: false,
    applicationId: undefined,
    name: input.name,
    createdAt: now,
    email: input.email,
    phone: input.phone,
    courseId: input.courseId,
  }),

  adminDeleteApplication: async () => true,
  adminDeleteCertificate: async () => true,
  adminDeleteLeaveRequest: async () => true,
  adminDeleteNotice: async () => true,
  adminDeleteStudent: async () => true,

  adminGetStudent: async () => ({
    id: BigInt(1),
    username: "student001",
    enrolled: true,
    applicationId: BigInt(1),
    name: "Rahul Das",
    createdAt: now,
    email: "rahul@example.com",
    phone: "+91 9876543210",
    courseId: "dca",
  }),

  adminGetStudentAttendance: async () => [
    { id: BigInt(1), status: AttendanceStatus.present, studentId: BigInt(1), date: "2026-04-01", markedAt: now },
    { id: BigInt(2), status: AttendanceStatus.late, studentId: BigInt(1), date: "2026-04-02", markedAt: now },
    { id: BigInt(3), status: AttendanceStatus.absent, studentId: BigInt(1), date: "2026-04-03", markedAt: now },
  ],

  adminIssueCertificate: async (_loginId, _password, studentId) => ({
    id: BigInt(1),
    studentId,
    studentName: "Rahul Das",
    issuedAt: now,
    courseName: "Diploma in Computer Applications (DCA)",
    certificateCode: "ARC-2026-0001",
    courseId: "dca",
  }),

  adminListApplications: async () => [
    {
      id: BigInt(1),
      status: appStatus("pending"),
      name: "Priya Sharma",
      submittedAt: now,
      email: "priya@example.com",
      phone: "+91 9876543211",
      courseId: "adca",
      photo: undefined,
      aadhaar: undefined,
      marksheet10: undefined,
      marksheet12: undefined,
      passCertificate: undefined,
    },
    {
      id: BigInt(2),
      status: appStatus("approved"),
      name: "Amit Roy",
      submittedAt: now,
      email: "amit@example.com",
      phone: "+91 9876543212",
      courseId: "dca",
      photo: undefined,
      aadhaar: undefined,
      marksheet10: undefined,
      marksheet12: undefined,
      passCertificate: undefined,
    },
  ],

  adminListCertificates: async () => [
    {
      id: BigInt(1),
      studentId: BigInt(1),
      studentName: "Rahul Das",
      issuedAt: now,
      courseName: "Diploma in Computer Applications (DCA)",
      certificateCode: "ARC-2026-0001",
      courseId: "dca",
    },
  ],

  adminListLeaveRequests: async () => [
    {
      id: BigInt(1),
      studentId: BigInt(1),
      startDate: "2026-04-05",
      endDate: "2026-04-07",
      reason: "Family function",
      leaveStatus: LeaveStatus.pending,
      submittedAt: now,
    },
    {
      id: BigInt(2),
      studentId: BigInt(2),
      startDate: "2026-04-10",
      endDate: "2026-04-11",
      reason: "Medical appointment",
      leaveStatus: LeaveStatus.approved,
      submittedAt: now,
      respondedAt: now,
    },
  ],

  adminListStudents: async () => [
    {
      id: BigInt(1),
      username: "student001",
      enrolled: true,
      applicationId: BigInt(1),
      name: "Rahul Das",
      createdAt: now,
      email: "rahul@example.com",
      phone: "+91 9876543210",
      courseId: "dca",
    },
    {
      id: BigInt(2),
      username: "student002",
      enrolled: false,
      applicationId: undefined,
      name: "Priya Sharma",
      createdAt: now,
      email: "priya@example.com",
      phone: "+91 9876543211",
      courseId: "adca",
    },
  ],

  adminMarkAttendance: async (_loginId, _password, studentId, date, status) => ({
    id: BigInt(Date.now()),
    status,
    studentId,
    date,
    markedAt: now,
  }),

  adminPostNotice: async (_loginId, _password, title, content) => ({
    id: BigInt(1),
    title,
    postedAt: now,
    content,
  }),

  adminRespondLeaveRequest: async () => true,
  adminUpdateApplicationStatus: async () => true,
  adminUpdateStudent: async () => true,
  adminUpdateStudentProfilePicture: async () => true,

  getApplication: async () => ({
    id: BigInt(1),
    status: appStatus("pending"),
    name: "Priya Sharma",
    submittedAt: now,
    email: "priya@example.com",
    phone: "+91 9876543211",
    courseId: "adca",
    photo: undefined,
    aadhaar: undefined,
    marksheet10: undefined,
    marksheet12: undefined,
    passCertificate: undefined,
  }),

  getCertificate: async () => ({
    id: BigInt(1),
    studentId: BigInt(1),
    studentName: "Rahul Das",
    issuedAt: now,
    courseName: "Diploma in Computer Applications (DCA)",
    certificateCode: "ARC-2026-0001",
    courseId: "dca",
  }),

  getCourse: async (id) => ({
    id,
    name: "Diploma in Computer Applications (DCA)",
    durationMonths: BigInt(6),
    description: "A comprehensive course covering computer fundamentals, MS Office, and internet basics.",
    benefits: ["Job-ready skills", "Certificate upon completion", "Practical training"],
  }),

  getMyAttendance: async () => ({
    records: [
      { id: BigInt(1), status: AttendanceStatus.present, studentId: BigInt(1), date: "2026-04-01", markedAt: now },
      { id: BigInt(2), status: AttendanceStatus.late, studentId: BigInt(1), date: "2026-04-02", markedAt: now },
    ],
    summary: { total: 2n, present: 1n, late: 1n, absent: 0n },
  }),

  getMyLeaveRequests: async () => [
    {
      id: BigInt(1),
      studentId: BigInt(1),
      startDate: "2026-04-05",
      endDate: "2026-04-07",
      reason: "Family function",
      leaveStatus: LeaveStatus.pending,
      submittedAt: now,
    },
  ],

  getNotice: async () => ({
    id: BigInt(1),
    title: "Admissions Open for 2026 Batch",
    postedAt: now,
    content: "AR Computer Education is pleased to announce that admissions are now open for the 2026 batch. Apply now!",
  }),

  getStudentCertificates: async () => [
    {
      id: BigInt(1),
      studentId: BigInt(1),
      studentName: "Rahul Das",
      issuedAt: now,
      courseName: "Diploma in Computer Applications (DCA)",
      certificateCode: "ARC-2026-0001",
      courseId: "dca",
    },
  ],

  getStudentDashboard: async () => ({
    id: BigInt(1),
    username: "student001",
    enrolled: true,
    applicationId: BigInt(1),
    name: "Rahul Das",
    createdAt: now,
    email: "rahul@example.com",
    phone: "+91 9876543210",
    courseId: "dca",
  }),

  listCourses: async () => [
    {
      id: "dca",
      name: "Diploma in Computer Applications (DCA)",
      durationMonths: BigInt(6),
      description: "A comprehensive course covering computer fundamentals, MS Office, internet basics, and data entry.",
      benefits: ["MS Office Mastery", "Internet & Email", "Data Entry", "Certificate"],
    },
    {
      id: "adca",
      name: "Advanced Diploma in Computer Applications (ADCA)",
      durationMonths: BigInt(12),
      description: "Advanced topics including programming, networking, Tally, DTP, and web development.",
      benefits: ["Programming Basics", "Networking", "Tally ERP", "DTP & Design"],
    },
    {
      id: "excel",
      name: "Microsoft Excel",
      durationMonths: BigInt(3),
      description: "Complete Excel training from basic to advanced including formulas, charts, and pivot tables.",
      benefits: ["Formulas & Functions", "Charts & Graphs", "Pivot Tables", "Data Analysis"],
    },
    {
      id: "msoffice",
      name: "MS Office Suite",
      durationMonths: BigInt(3),
      description: "Word, Excel, PowerPoint, and Outlook for professional productivity.",
      benefits: ["Word Processing", "Spreadsheets", "Presentations", "Email Management"],
    },
    {
      id: "tally",
      name: "Tally ERP 9 & Prime",
      durationMonths: BigInt(3),
      description: "Complete accounting software training with GST and inventory management.",
      benefits: ["GST Returns", "Inventory", "Payroll", "Financial Reports"],
    },
    {
      id: "dtp",
      name: "Desktop Publishing (DTP)",
      durationMonths: BigInt(3),
      description: "PageMaker, CorelDraw, Photoshop, and Illustrator for creative design.",
      benefits: ["Photoshop", "CorelDraw", "Page Layout", "Print Design"],
    },
  ],

  listNotices: async () => [
    {
      id: BigInt(1),
      title: "Admissions Open for 2026 Batch",
      postedAt: now,
      content: "AR Computer Education is pleased to announce that admissions are now open for the 2026 batch.",
    },
    {
      id: BigInt(2),
      title: "Holiday Notice: Bihu Celebration",
      postedAt: now - BigInt(86400000000000),
      content: "The institute will remain closed on April 14th for Bihu celebrations. Classes resume April 15th.",
    },
  ],

  studentLogin: async () => ({
    id: BigInt(1),
    username: "student001",
    enrolled: true,
    applicationId: BigInt(1),
    name: "Rahul Das",
    createdAt: now,
    email: "rahul@example.com",
    phone: "+91 9876543210",
    courseId: "dca",
  }),

  studentUpdateProfilePicture: async () => true,

  submitApplication: async (_input) => ({
    id: BigInt(3),
    status: appStatus("pending"),
    name: _input.name,
    submittedAt: now,
    email: _input.email,
    phone: _input.phone,
    courseId: _input.courseId,
    photo: undefined,
    aadhaar: undefined,
    marksheet10: undefined,
    marksheet12: undefined,
    passCertificate: undefined,
  }),

  submitLeaveRequest: async (_studentId, input) => ({
    id: BigInt(Date.now()),
    studentId: _studentId,
    startDate: input.startDate,
    endDate: input.endDate,
    reason: input.reason,
    leaveStatus: LeaveStatus.pending,
    submittedAt: now,
  }),
};
