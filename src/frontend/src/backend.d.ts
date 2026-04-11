import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AdmissionApplicationView {
    id: ApplicationId;
    status: ApplicationStatus;
    marksheet10?: ExternalBlob;
    marksheet12?: ExternalBlob;
    name: string;
    submittedAt: Timestamp;
    aadhaar?: ExternalBlob;
    email: string;
    phone: string;
    photo?: ExternalBlob;
    passCertificate?: ExternalBlob;
    courseId: CourseId;
}
export type Timestamp = bigint;
export interface StudentView {
    id: StudentId;
    username: string;
    enrolled: boolean;
    applicationId?: ApplicationId;
    name: string;
    createdAt: Timestamp;
    email: string;
    phone: string;
    profilePicture?: string;
    courseId: CourseId;
}
export interface StudentInput {
    username: string;
    applicationId?: ApplicationId;
    password: string;
    name: string;
    email: string;
    phone: string;
    courseId: CourseId;
}
export interface StudentUpdateInput {
    enrolled?: boolean;
    name?: string;
    email?: string;
    phone?: string;
    courseId?: CourseId;
}
export type CertificateId = bigint;
export type StudentId = bigint;
export interface AttendanceSummary {
    total: bigint;
    present: bigint;
    late: bigint;
    absent: bigint;
}
export interface LeaveRequestView {
    id: LeaveRequestId;
    studentId: StudentId;
    endDate: string;
    leaveStatus: LeaveStatus;
    submittedAt: Timestamp;
    respondedAt?: Timestamp;
    startDate: string;
    reason: string;
}
export type LeaveRequestId = bigint;
export interface LeaveRequestInput {
    endDate: string;
    startDate: string;
    reason: string;
}
export interface Course {
    id: CourseId;
    name: string;
    durationMonths: bigint;
    description: string;
    benefits: Array<string>;
}
export type AttendanceId = bigint;
export interface Notice {
    id: NoticeId;
    title: string;
    postedAt: Timestamp;
    content: string;
}
export type CourseId = string;
export interface ApplicationInput {
    marksheet10?: ExternalBlob;
    marksheet12?: ExternalBlob;
    name: string;
    aadhaar?: ExternalBlob;
    email: string;
    phone: string;
    photo?: ExternalBlob;
    passCertificate?: ExternalBlob;
    courseId: CourseId;
}
export interface AttendanceRecord {
    id: AttendanceId;
    status: AttendanceStatus;
    studentId: StudentId;
    date: string;
    markedAt: Timestamp;
}
export type NoticeId = bigint;
export interface Certificate {
    id: CertificateId;
    studentId: StudentId;
    studentName: string;
    issuedAt: Timestamp;
    courseName: string;
    certificateCode: string;
    courseId: CourseId;
}
export type ApplicationId = bigint;
export enum AttendanceStatus {
    present = "present",
    late = "late",
    absent = "absent"
}
export enum LeaveStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    adminCreateStudent(loginId: string, password: string, input: StudentInput): Promise<StudentView>;
    adminDeleteApplication(loginId: string, password: string, applicationId: ApplicationId): Promise<boolean>;
    adminDeleteCertificate(loginId: string, password: string, certificateId: CertificateId): Promise<boolean>;
    adminDeleteLeaveRequest(loginId: string, password: string, id: LeaveRequestId): Promise<boolean>;
    adminDeleteNotice(loginId: string, password: string, id: NoticeId): Promise<boolean>;
    adminDeleteStudent(loginId: string, password: string, studentId: StudentId): Promise<boolean>;
    adminGetStudent(loginId: string, password: string, id: StudentId): Promise<StudentView | null>;
    adminGetStudentAttendance(loginId: string, password: string, studentId: StudentId): Promise<Array<AttendanceRecord>>;
    adminIssueCertificate(loginId: string, password: string, studentId: StudentId): Promise<Certificate>;
    adminListApplications(loginId: string, password: string): Promise<Array<AdmissionApplicationView>>;
    adminListCertificates(loginId: string, password: string): Promise<Array<Certificate>>;
    adminListLeaveRequests(loginId: string, password: string): Promise<Array<LeaveRequestView>>;
    adminListStudents(loginId: string, password: string): Promise<Array<StudentView>>;
    adminLogin(loginId: string, password: string): Promise<boolean>;
    adminMarkAttendance(loginId: string, password: string, studentId: StudentId, date: string, status: AttendanceStatus): Promise<AttendanceRecord>;
    adminPostNotice(loginId: string, password: string, title: string, content: string): Promise<Notice>;
    adminRespondLeaveRequest(loginId: string, password: string, id: LeaveRequestId, status: LeaveStatus): Promise<boolean>;
    adminUpdateApplicationStatus(loginId: string, password: string, id: ApplicationId, status: ApplicationStatus): Promise<boolean>;
    adminUpdateStudent(loginId: string, password: string, id: StudentId, input: StudentUpdateInput): Promise<boolean>;
    adminUpdateStudentProfilePicture(loginId: string, password: string, studentId: StudentId, pictureData: string): Promise<boolean>;
    getApplication(id: ApplicationId): Promise<AdmissionApplicationView | null>;
    getCertificate(id: CertificateId): Promise<Certificate | null>;
    getCourse(id: string): Promise<Course | null>;
    getMyAttendance(studentId: StudentId): Promise<{
        records: Array<AttendanceRecord>;
        summary: AttendanceSummary;
    }>;
    getMyLeaveRequests(studentId: StudentId): Promise<Array<LeaveRequestView>>;
    getNotice(id: NoticeId): Promise<Notice | null>;
    getStudentCertificates(studentId: StudentId): Promise<Array<Certificate>>;
    getStudentDashboard(id: StudentId): Promise<StudentView | null>;
    listCourses(): Promise<Array<Course>>;
    listNotices(): Promise<Array<Notice>>;
    studentLogin(username: string, password: string): Promise<StudentView | null>;
    studentUpdateProfilePicture(studentId: StudentId, pictureData: string): Promise<boolean>;
    submitApplication(input: ApplicationInput): Promise<AdmissionApplicationView>;
    submitLeaveRequest(studentId: StudentId, input: LeaveRequestInput): Promise<LeaveRequestView>;
}
