import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { AttendanceStatus, LeaveStatus } from "../backend";
import type {
  ApplicationId,
  ApplicationInput,
  AttendanceRecord,
  AttendanceSummary,
  CertificateId,
  LeaveRequestId,
  LeaveRequestInput,
  LeaveRequestView,
  NoticeId,
  StudentId,
  StudentInput,
  StudentUpdateInput,
} from "../types";
import { ApplicationStatus } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

// ─── Public Queries ───────────────────────────────────────────────────────────

export function useListCourses() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCourse(id: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCourse(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

export function useListNotices() {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listNotices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetNotice(id: NoticeId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["notice", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getNotice(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useGetApplication(id: ApplicationId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["application", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getApplication(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useGetCertificate(id: CertificateId) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["certificate", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCertificate(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

// ─── Student Queries ──────────────────────────────────────────────────────────

export function useStudentDashboard(studentId: StudentId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["student-dashboard", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === undefined) return null;
      return actor.getStudentDashboard(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== undefined,
  });
}

export function useStudentCertificates(studentId: StudentId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["student-certificates", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === undefined) return [];
      return actor.getStudentCertificates(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== undefined,
  });
}

export function useGetMyProfile(studentId: StudentId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["my-profile", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === undefined) return null;
      return actor.getStudentDashboard(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== undefined,
  });
}

export function useGetMyAttendance(studentId: StudentId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<{ records: AttendanceRecord[]; summary: AttendanceSummary }>({
    queryKey: ["my-attendance", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === undefined)
        return {
          records: [],
          summary: { total: 0n, present: 0n, late: 0n, absent: 0n },
        };
      return actor.getMyAttendance(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== undefined,
  });
}

export function useGetAttendanceSummary(studentId: StudentId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AttendanceSummary>({
    queryKey: ["attendance-summary", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === undefined)
        return { total: 0n, present: 0n, late: 0n, absent: 0n };
      const result = await actor.getMyAttendance(studentId);
      return result.summary;
    },
    enabled: !!actor && !isFetching && studentId !== undefined,
  });
}

export function useGetMyLeaveRequests(studentId: StudentId | undefined) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LeaveRequestView[]>({
    queryKey: ["my-leave-requests", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === undefined) return [];
      return actor.getMyLeaveRequests(studentId);
    },
    enabled: !!actor && !isFetching && studentId !== undefined,
  });
}

// ─── Student Mutations ────────────────────────────────────────────────────────

export function useSubmitApplication() {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: ApplicationInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitApplication(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useStudentLogin() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: { username: string; password: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.studentLogin(username, password);
    },
  });
}

export function useRequestLeave(studentId: StudentId | undefined) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: LeaveRequestInput) => {
      if (!actor || studentId === undefined) throw new Error("Not connected");
      return actor.submitLeaveRequest(studentId, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["my-leave-requests", studentId?.toString()],
      });
    },
  });
}

export function useUploadProfilePicture(studentId: StudentId | undefined) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pictureData: string) => {
      if (!actor || studentId === undefined) throw new Error("Not connected");
      return actor.studentUpdateProfilePicture(studentId, pictureData);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-profile", studentId?.toString()] });
      qc.invalidateQueries({
        queryKey: ["student-dashboard", studentId?.toString()],
      });
    },
  });
}

// ─── Admin Login ──────────────────────────────────────────────────────────────

export function useAdminLogin() {
  const { actor } = useBackendActor();
  return useMutation({
    mutationFn: async ({
      loginId,
      password,
    }: { loginId: string; password: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminLogin(loginId, password);
    },
  });
}

// ─── Admin Queries ────────────────────────────────────────────────────────────

export function useAdminListApplications(loginId: string, password: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["admin-applications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListApplications(loginId, password);
    },
    enabled: !!actor && !isFetching && !!loginId && !!password,
  });
}

export function useAdminListStudents(loginId: string, password: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["admin-students"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListStudents(loginId, password);
    },
    enabled: !!actor && !isFetching && !!loginId && !!password,
  });
}

export function useAdminGetStudent(
  loginId: string,
  password: string,
  id: StudentId,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["admin-student", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.adminGetStudent(loginId, password, id);
    },
    enabled: !!actor && !isFetching && !!loginId && !!password,
  });
}

export function useAdminListCertificates(loginId: string, password: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListCertificates(loginId, password);
    },
    enabled: !!actor && !isFetching && !!loginId && !!password,
  });
}

export function useAdminGetStudentAttendance(
  loginId: string,
  password: string,
  studentId: StudentId | undefined,
) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<AttendanceRecord[]>({
    queryKey: ["admin-student-attendance", studentId?.toString()],
    queryFn: async () => {
      if (!actor || studentId === undefined) return [];
      return actor.adminGetStudentAttendance(loginId, password, studentId);
    },
    enabled:
      !!actor &&
      !isFetching &&
      !!loginId &&
      !!password &&
      studentId !== undefined,
  });
}

export function useAdminListLeaveRequests(loginId: string, password: string) {
  const { actor, isFetching } = useBackendActor();
  return useQuery<LeaveRequestView[]>({
    queryKey: ["admin-leave-requests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListLeaveRequests(loginId, password);
    },
    enabled: !!actor && !isFetching && !!loginId && !!password,
  });
}

// ─── Admin Mutations ──────────────────────────────────────────────────────────

export function useAdminCreateStudent(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: StudentInput) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminCreateStudent(loginId, password, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-students"] });
    },
  });
}

export function useAdminUpdateStudent(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: { id: StudentId; input: StudentUpdateInput }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminUpdateStudent(loginId, password, id, input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-students"] });
    },
  });
}

export function useAdminUpdateApplicationStatus(
  loginId: string,
  password: string,
) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: ApplicationId; status: ApplicationStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminUpdateApplicationStatus(loginId, password, id, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-applications"] });
    },
  });
}

export function useAdminPostNotice(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
    }: { title: string; content: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminPostNotice(loginId, password, title, content);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notices"] });
    },
  });
}

export function useAdminDeleteNotice(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: NoticeId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteNotice(loginId, password, id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notices"] });
    },
  });
}

export function useAdminDeleteStudent(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (studentId: StudentId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteStudent(loginId, password, studentId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-students"] });
    },
  });
}

export function useAdminDeleteApplication(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (applicationId: ApplicationId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteApplication(loginId, password, applicationId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-applications"] });
    },
  });
}

export function useAdminDeleteCertificate(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (certificateId: CertificateId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteCertificate(loginId, password, certificateId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-certificates"] });
    },
  });
}

export function useAdminDeleteLeaveRequest(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: LeaveRequestId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminDeleteLeaveRequest(loginId, password, id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-leave-requests"] });
    },
  });
}

export function useReviewLeaveRequest(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: { id: LeaveRequestId; status: LeaveStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminRespondLeaveRequest(loginId, password, id, status);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-leave-requests"] });
    },
  });
}

export function useAdminMarkAttendance(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      studentId,
      date,
      status,
    }: { studentId: StudentId; date: string; status: AttendanceStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminMarkAttendance(
        loginId,
        password,
        studentId,
        date,
        status,
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["admin-student-attendance", vars.studentId.toString()],
      });
    },
  });
}

export function useAdminIssueCertificate(loginId: string, password: string) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (studentId: StudentId) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminIssueCertificate(loginId, password, studentId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-certificates"] });
    },
  });
}

export function useAdminUpdateProfilePicture(
  loginId: string,
  password: string,
) {
  const { actor } = useBackendActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      studentId,
      pictureData,
    }: { studentId: StudentId; pictureData: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.adminUpdateStudentProfilePicture(
        loginId,
        password,
        studentId,
        pictureData,
      );
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({
        queryKey: ["admin-student", vars.studentId.toString()],
      });
      qc.invalidateQueries({ queryKey: ["admin-students"] });
    },
  });
}

export { ApplicationStatus, AttendanceStatus, LeaveStatus };
