import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Calendar,
  CalendarClock,
  Camera,
  CheckCircle2,
  ClipboardList,
  Download,
  LogOut,
  Megaphone,
  User,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useStudentAuth } from "../../hooks/useAuth";
import {
  useGetMyAttendance,
  useGetMyLeaveRequests,
  useListNotices,
  useRequestLeave,
  useStudentCertificates,
  useStudentDashboard,
  useUploadProfilePicture,
} from "../../hooks/useBackend";
import { formatTimestamp } from "../../lib/format";
import type { AttendanceRecord, LeaveRequestView } from "../../types";
import { AttendanceStatus, COURSE_LIST, LeaveStatus } from "../../types";

// ─── Utility helpers ──────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  return formatTimestamp(ts, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCourseFullName(courseId: string): string {
  const found = COURSE_LIST.find((c) => c.id === courseId);
  return found ? found.fullName : courseId;
}

// ─── Small shared components ──────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
}: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-primary" />
      </div>
      <h2 className="font-display font-semibold text-lg text-foreground">
        {title}
      </h2>
    </div>
  );
}

function StatusBadge({ enrolled }: { enrolled: boolean }) {
  return enrolled ? (
    <Badge
      variant="outline"
      className="bg-primary/10 text-primary border-primary/30 font-medium"
    >
      Approved &amp; Enrolled
    </Badge>
  ) : (
    <Badge
      variant="outline"
      className="bg-accent/15 text-accent border-accent/30 font-medium"
    >
      Pending Review
    </Badge>
  );
}

function LeaveStatusBadge({ status }: { status: LeaveStatus }) {
  if (status === LeaveStatus.approved)
    return (
      <Badge
        variant="outline"
        className="bg-green-50 text-green-700 border-green-200 text-xs"
      >
        Approved
      </Badge>
    );
  if (status === LeaveStatus.rejected)
    return (
      <Badge
        variant="outline"
        className="bg-destructive/10 text-destructive border-destructive/20 text-xs"
      >
        Rejected
      </Badge>
    );
  return (
    <Badge
      variant="outline"
      className="bg-accent/10 text-accent border-accent/20 text-xs"
    >
      Pending
    </Badge>
  );
}

function AttendanceStatusIcon({ status }: { status: AttendanceStatus }) {
  if (status === AttendanceStatus.present)
    return <CheckCircle2 size={15} className="text-green-600 shrink-0" />;
  if (status === AttendanceStatus.late)
    return <CalendarClock size={15} className="text-accent shrink-0" />;
  return <XCircle size={15} className="text-destructive shrink-0" />;
}

// ─── Profile Picture Section ──────────────────────────────────────────────────

function ProfilePictureSection({
  studentId,
  currentPicture,
}: {
  studentId: bigint;
  currentPicture?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const uploadMutation = useUploadProfilePicture(studentId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setPreview(base64);
      uploadMutation.mutate(base64, {
        onSuccess: () => toast.success("Profile picture updated!"),
        onError: () => toast.error("Failed to update profile picture."),
      });
    };
    reader.readAsDataURL(file);
  };

  const displayImage = preview ?? currentPicture;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center">
          {displayImage ? (
            <img
              src={displayImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={36} className="text-muted-foreground" />
          )}
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
          aria-label="Upload profile picture"
          data-ocid="profile-pic-upload-btn"
        >
          <Camera size={14} />
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        data-ocid="profile-pic-input"
      />
      {uploadMutation.isPending && (
        <p className="text-xs text-muted-foreground animate-pulse">
          Uploading…
        </p>
      )}
    </div>
  );
}

// ─── Attendance Section ───────────────────────────────────────────────────────

function AttendanceSection({ studentId }: { studentId: bigint }) {
  const { data, isLoading } = useGetMyAttendance(studentId);
  const records: AttendanceRecord[] = data?.records ?? [];
  const summary = data?.summary ?? {
    total: 0n,
    present: 0n,
    late: 0n,
    absent: 0n,
  };

  const totalNum = Number(summary.total);
  const presentNum = Number(summary.present);
  const lateNum = Number(summary.late);
  const absentNum = Number(summary.absent);
  const attendancePct =
    totalNum > 0 ? Math.round(((presentNum + lateNum) / totalNum) * 100) : 0;

  const sorted = [...records]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 30);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-ocid="attendance-summary"
      >
        {[
          { label: "Total Days", value: totalNum, color: "text-foreground" },
          { label: "Present", value: presentNum, color: "text-green-600" },
          { label: "Late", value: lateNum, color: "text-accent" },
          { label: "Absent", value: absentNum, color: "text-destructive" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-muted/50 rounded-lg p-3 text-center border border-border"
          >
            <p className={`text-2xl font-bold font-display ${item.color}`}>
              {item.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Attendance bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Attendance Rate</span>
          <span
            className={
              attendancePct >= 75
                ? "text-green-600 font-medium"
                : "text-destructive font-medium"
            }
          >
            {attendancePct}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${attendancePct >= 75 ? "bg-green-500" : "bg-destructive"}`}
            style={{ width: `${attendancePct}%` }}
          />
        </div>
        {attendancePct < 75 && (
          <p className="text-xs text-destructive">
            ⚠ Below 75% — please attend regularly.
          </p>
        )}
      </div>

      {/* Records table */}
      {sorted.length > 0 ? (
        <div
          className="border border-border rounded-lg overflow-hidden"
          data-ocid="attendance-records"
        >
          <div className="grid grid-cols-3 bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Date</span>
            <span>Day</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-border max-h-60 overflow-y-auto">
            {sorted.map((rec) => {
              const d = new Date(rec.date);
              return (
                <div
                  key={rec.id.toString()}
                  className="grid grid-cols-3 px-4 py-2.5 items-center text-sm"
                >
                  <span className="text-foreground font-medium">
                    {d.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {d.toLocaleDateString("en-IN", { weekday: "short" })}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <AttendanceStatusIcon status={rec.status} />
                    <span className="capitalize text-xs text-muted-foreground">
                      {rec.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="text-center py-6 text-muted-foreground"
          data-ocid="attendance-empty"
        >
          <Calendar size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">No attendance records yet.</p>
        </div>
      )}
    </div>
  );
}

// ─── Leave Request Section ────────────────────────────────────────────────────

function LeaveSection({ studentId }: { studentId: bigint }) {
  const { data: leaves = [], isLoading } = useGetMyLeaveRequests(studentId);
  const requestLeave = useRequestLeave(studentId);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (endDate < startDate) {
      toast.error("End date must be after start date.");
      return;
    }
    requestLeave.mutate(
      { startDate, endDate, reason: reason.trim() },
      {
        onSuccess: () => {
          toast.success("Leave request submitted!");
          setStartDate("");
          setEndDate("");
          setReason("");
          setShowForm(false);
        },
        onError: () => toast.error("Failed to submit leave request."),
      },
    );
  };

  const sorted = [...leaves].sort(
    (a: LeaveRequestView, b: LeaveRequestView) =>
      Number(b.submittedAt) - Number(a.submittedAt),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {leaves.length === 0
            ? "No leave requests yet."
            : `${leaves.length} request(s)`}
        </p>
        <Button
          size="sm"
          variant={showForm ? "outline" : "default"}
          onClick={() => setShowForm((v) => !v)}
          data-ocid="leave-apply-btn"
        >
          {showForm ? "Cancel" : "Apply for Leave"}
        </Button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-muted/40 border border-border rounded-lg p-4 space-y-3"
          data-ocid="leave-form"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="leave-start" className="text-xs font-medium">
                Start Date
              </Label>
              <input
                id="leave-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="leave-start-date"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="leave-end" className="text-xs font-medium">
                End Date
              </Label>
              <input
                id="leave-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="leave-end-date"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="leave-reason" className="text-xs font-medium">
              Reason
            </Label>
            <Textarea
              id="leave-reason"
              placeholder="Please describe your reason for leave…"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="text-sm resize-none"
              data-ocid="leave-reason"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={requestLeave.isPending}
            data-ocid="leave-submit-btn"
          >
            {requestLeave.isPending ? "Submitting…" : "Submit Request"}
          </Button>
        </motion.form>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : sorted.length > 0 ? (
        <div className="space-y-2" data-ocid="leave-list">
          {sorted.map((leave) => (
            <div
              key={leave.id.toString()}
              className="border border-border rounded-lg p-3 bg-background space-y-1"
              data-ocid={`leave-row-${leave.id}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">
                  {leave.startDate} → {leave.endDate}
                </p>
                <LeaveStatusBadge status={leave.leaveStatus} />
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {leave.reason}
              </p>
              <p className="text-xs text-muted-foreground/70">
                Applied: {formatDate(leave.submittedAt)}
                {leave.respondedAt
                  ? ` · Responded: ${formatDate(leave.respondedAt)}`
                  : ""}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !showForm && (
          <div
            className="text-center py-6 text-muted-foreground"
            data-ocid="leave-empty"
          >
            <CalendarClock size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">No leave requests submitted.</p>
          </div>
        )
      )}
    </div>
  );
}

// ─── Certificate Download ─────────────────────────────────────────────────────

function downloadCertificate(
  certCode: string,
  studentName: string,
  courseName: string,
  issuedAt: bigint,
) {
  const dateStr = formatDate(issuedAt);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Certificate – ${certCode}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#f5f0e8;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'EB Garamond',serif}
  .cert{background:#fffdf6;border:6px double #8B6914;padding:60px 80px;max-width:760px;width:100%;text-align:center;box-shadow:0 4px 32px rgba(0,0,0,.15);position:relative}
  .cert::before{content:'';position:absolute;inset:12px;border:2px solid #C9A227;pointer-events:none}
  .logo{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#8B6914;margin-bottom:4px}
  h1{font-family:'Cinzel',serif;font-size:28px;color:#5a3e1b;margin-bottom:8px}
  .divider{width:200px;height:2px;background:linear-gradient(90deg,transparent,#C9A227,transparent);margin:16px auto}
  .subtitle{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:#8B6914;margin-bottom:28px}
  .certify{font-size:16px;color:#555;margin-bottom:8px}
  .name{font-family:'Cinzel',serif;font-size:36px;color:#3d2b1f;font-weight:700;margin:12px 0}
  .course-label{font-size:15px;color:#666;margin-bottom:6px}
  .course{font-size:22px;font-weight:600;font-style:italic;color:#5a3e1b;margin-bottom:28px}
  .footer{display:flex;justify-content:space-between;margin-top:40px;font-size:13px;color:#666}
  .footer .col{text-align:center;flex:1}
  .footer .line{border-top:1px solid #bbb;padding-top:6px;margin-top:24px}
  .institute{margin-top:28px;font-size:12px;color:#999;letter-spacing:.05em}
</style>
</head>
<body>
<div class="cert">
  <p class="logo">AR Computer Education</p>
  <div class="divider"></div>
  <h1>Certificate of Completion</h1>
  <p class="subtitle">This is to certify that</p>
  <p class="name">${studentName}</p>
  <p class="course-label">has successfully completed the course</p>
  <p class="course">${courseName}</p>
  <div class="divider"></div>
  <div class="footer">
    <div class="col"><div class="line">Date Issued<br/><strong>${dateStr}</strong></div></div>
    <div class="col"><div class="line">Certificate No.<br/><strong>${certCode}</strong></div></div>
  </div>
  <p class="institute">Kodaldhowa Ward No. 2, Fakiragram, Kokrajhar – 783345 | +91 6002880939</p>
</div>
<script>window.onload=()=>window.print()</script>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `certificate-${certCode}.html`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Certificate downloaded!");
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function StudentDashboardPage() {
  const { student, clearStudent } = useStudentAuth();
  const navigate = useNavigate();

  const studentId = student?.studentId;
  const { data: profile, isLoading: profileLoading } =
    useStudentDashboard(studentId);
  const { data: certificates = [], isLoading: certsLoading } =
    useStudentCertificates(studentId);
  const { data: allNotices = [], isLoading: noticesLoading } = useListNotices();
  const notices = allNotices.slice(0, 5);

  const handleLogout = () => {
    clearStudent();
    toast.success("Logged out successfully.");
    navigate({ to: "/student/login" });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Dashboard Header */}
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar in header */}
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center shrink-0">
              {profile?.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={18} className="text-muted-foreground" />
              )}
            </div>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground leading-tight truncate">
                {student?.name ?? "Student"}
              </p>
              <p className="text-xs text-muted-foreground">
                @{student?.username}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2 shrink-0"
            data-ocid="student-logout"
          >
            <LogOut size={15} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-5 max-w-3xl">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <h1 className="font-display font-bold text-xl text-foreground">
                Welcome back, {student?.name?.split(" ")[0] ?? "Student"}! 👋
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track your courses, attendance, leave, certificates, and
                institute notices below.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Picture + Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.04 }}
        >
          <Card data-ocid="student-profile-card">
            <CardContent className="p-5">
              <SectionHeader icon={User} title="My Profile" />
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {studentId !== undefined && (
                  <ProfilePictureSection
                    studentId={studentId}
                    currentPicture={profile?.profilePicture}
                  />
                )}
                {profileLoading ? (
                  <div className="flex-1 space-y-2 w-full">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-4 w-3/4" />
                    ))}
                  </div>
                ) : profile ? (
                  <div className="flex-1 space-y-2 text-sm w-full">
                    <ProfileRow label="Name" value={profile.name} />
                    <ProfileRow label="Email" value={profile.email} />
                    <ProfileRow label="Phone" value={profile.phone} />
                    <ProfileRow
                      label="Course"
                      value={getCourseFullName(profile.courseId)}
                    />
                    <div className="pt-1">
                      <StatusBadge enrolled={profile.enrolled} />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No profile data available.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Course + Application Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <Card className="h-full" data-ocid="student-course-card">
              <CardHeader className="pb-3">
                <CardTitle className="sr-only">My Course</CardTitle>
                <SectionHeader icon={BookOpen} title="My Course" />
              </CardHeader>
              <CardContent className="-mt-3">
                {profileLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ) : profile ? (
                  <div className="space-y-2">
                    <p className="font-semibold text-foreground text-base leading-snug">
                      {getCourseFullName(profile.courseId)}
                    </p>
                    <Badge
                      variant="outline"
                      className={
                        profile.enrolled
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {profile.enrolled ? "Enrolled" : "Not Yet Enrolled"}
                    </Badge>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No course data available.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <Card className="h-full" data-ocid="student-application-card">
              <CardHeader className="pb-3">
                <CardTitle className="sr-only">Application Status</CardTitle>
                <SectionHeader
                  icon={ClipboardList}
                  title="Application Status"
                />
              </CardHeader>
              <CardContent className="-mt-3">
                {profileLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : profile?.applicationId !== undefined ? (
                  <div className="space-y-2">
                    <StatusBadge enrolled={profile.enrolled} />
                    <p className="text-xs text-muted-foreground">
                      Application ID: #{profile.applicationId.toString()}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3" data-ocid="student-no-application">
                    <p className="text-sm text-muted-foreground">
                      No application submitted yet.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate({ to: "/admission" })}
                    >
                      Apply for Admission
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Attendance */}
        {studentId !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <Card data-ocid="student-attendance-section">
              <CardContent className="p-5">
                <SectionHeader icon={Calendar} title="My Attendance" />
                <AttendanceSection studentId={studentId} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Leave Requests */}
        {studentId !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14 }}
          >
            <Card data-ocid="student-leave-section">
              <CardContent className="p-5">
                <SectionHeader icon={CalendarClock} title="Leave Requests" />
                <LeaveSection studentId={studentId} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Certificates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16 }}
        >
          <Card data-ocid="student-certificates-section">
            <CardContent className="p-5">
              <SectionHeader icon={Award} title="My Certificates" />
              {certsLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-lg" />
                  ))}
                </div>
              ) : certificates.length > 0 ? (
                <div className="space-y-3">
                  {certificates.map((cert, idx) => (
                    <motion.div
                      key={cert.id.toString()}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.16 + idx * 0.07 }}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
                      data-ocid={`cert-row-${cert.id}`}
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {cert.courseName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Code: {cert.certificateCode} · Issued:{" "}
                          {formatDate(cert.issuedAt)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0 ml-3 gap-1.5"
                        onClick={() =>
                          downloadCertificate(
                            cert.certificateCode,
                            cert.studentName,
                            cert.courseName,
                            cert.issuedAt,
                          )
                        }
                        data-ocid={`cert-download-${cert.id}`}
                      >
                        <Download size={13} />
                        Download
                      </Button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="student-no-certs"
                >
                  <Award size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No certificates issued yet.</p>
                  <p className="text-xs mt-1">
                    Complete your course to receive your certificate.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
        >
          <Card data-ocid="student-notices-section">
            <CardContent className="p-5">
              <SectionHeader icon={Megaphone} title="Latest Notices" />
              {noticesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-1.5">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  ))}
                </div>
              ) : notices.length > 0 ? (
                <div>
                  {notices.map((notice, idx) => (
                    <div
                      key={notice.id.toString()}
                      data-ocid={`notice-row-${notice.id}`}
                    >
                      <div className="py-4">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <p className="font-medium text-sm text-foreground leading-snug">
                            {notice.title}
                          </p>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {formatDate(notice.postedAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {notice.content}
                        </p>
                      </div>
                      {idx < notices.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-8 text-muted-foreground"
                  data-ocid="student-no-notices"
                >
                  <Megaphone size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No notices posted yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground w-16 shrink-0 text-xs pt-0.5">
        {label}
      </span>
      <span className="text-foreground font-medium break-words min-w-0">
        {value}
      </span>
    </div>
  );
}
