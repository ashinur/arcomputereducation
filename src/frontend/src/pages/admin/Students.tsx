import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AttendanceStatus } from "../../backend";
import { useAdminAuth } from "../../hooks/useAuth";
import {
  useAdminCreateStudent,
  useAdminDeleteStudent,
  useAdminGetStudentAttendance,
  useAdminListStudents,
  useAdminMarkAttendance,
  useAdminUpdateStudent,
} from "../../hooks/useBackend";
import { COURSE_LIST } from "../../types";
import type { StudentId, StudentView } from "../../types";

interface CreateForm {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  username: string;
  password: string;
}

interface EditForm {
  name: string;
  email: string;
  phone: string;
  courseId: string;
  enrolled: boolean;
  username: string;
}

const EMPTY_CREATE: CreateForm = {
  name: "",
  email: "",
  phone: "",
  courseId: "",
  username: "",
  password: "",
};

// ─── Confirmation Dialog ─────────────────────────────────────────────────────

function ConfirmDeleteDialog({
  open,
  name,
  onConfirm,
  onCancel,
  isLoading,
}: {
  open: boolean;
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full mx-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <Trash2 size={18} className="text-destructive" />
          </div>
          <h3 className="font-display font-semibold text-foreground">
            Delete Student
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">{name}</span>? This
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid="confirm-delete-btn"
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin mr-2" />
            ) : null}
            Delete
          </Button>
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Attendance Panel ─────────────────────────────────────────────────────────

function AttendancePanel({
  student,
  loginId,
  password,
}: {
  student: StudentView;
  loginId: string;
  password: string;
}) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [markStatus, setMarkStatus] = useState<string>(
    AttendanceStatus.present,
  );

  const { data: records, isLoading } = useAdminGetStudentAttendance(
    loginId,
    password,
    student.id as StudentId,
  );
  const markMutation = useAdminMarkAttendance(loginId, password);

  const summary = {
    total: records?.length ?? 0,
    present:
      records?.filter((r) => r.status === AttendanceStatus.present).length ?? 0,
    late:
      records?.filter((r) => r.status === AttendanceStatus.late).length ?? 0,
    absent:
      records?.filter((r) => r.status === AttendanceStatus.absent).length ?? 0,
  };

  const handleMark = async () => {
    try {
      await markMutation.mutateAsync({
        studentId: student.id as StudentId,
        date,
        status: markStatus as AttendanceStatus,
      });
      toast.success("Attendance marked successfully.");
    } catch {
      toast.error("Failed to mark attendance.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Total", value: summary.total, color: "text-foreground" },
          { label: "Present", value: summary.present, color: "text-green-600" },
          { label: "Late", value: summary.late, color: "text-yellow-600" },
          { label: "Absent", value: summary.absent, color: "text-red-600" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="text-center p-2 rounded-lg border border-border bg-muted/30"
          >
            <div className={`font-bold text-lg ${color}`}>{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Mark Attendance */}
      <div className="border border-border rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Mark Attendance
        </p>
        <div className="flex gap-2">
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex-1 text-sm"
            data-ocid="attendance-date-input"
          />
          <Select value={markStatus} onValueChange={setMarkStatus}>
            <SelectTrigger
              className="w-32"
              data-ocid="attendance-status-select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={AttendanceStatus.present}>Present</SelectItem>
              <SelectItem value={AttendanceStatus.late}>Late</SelectItem>
              <SelectItem value={AttendanceStatus.absent}>Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          className="w-full gap-1.5"
          onClick={handleMark}
          disabled={markMutation.isPending}
          data-ocid="mark-attendance-btn"
        >
          {markMutation.isPending ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <CalendarCheck size={13} />
          )}
          Mark Attendance
        </Button>
      </div>

      {/* Recent Records */}
      {isLoading ? (
        <Skeleton className="h-16 w-full" />
      ) : records && records.length > 0 ? (
        <div className="max-h-36 overflow-y-auto space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Recent Records
          </p>
          {records
            .slice()
            .reverse()
            .slice(0, 10)
            .map((r) => (
              <div
                key={r.id.toString()}
                className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0"
              >
                <span className="text-muted-foreground">{r.date}</span>
                <span
                  className={
                    r.status === AttendanceStatus.present
                      ? "text-green-600 font-medium"
                      : r.status === AttendanceStatus.late
                        ? "text-yellow-600 font-medium"
                        : "text-red-600 font-medium"
                  }
                >
                  {r.status === AttendanceStatus.present && (
                    <CheckCircle size={10} className="inline mr-1" />
                  )}
                  {r.status === AttendanceStatus.absent && (
                    <XCircle size={10} className="inline mr-1" />
                  )}
                  {r.status === AttendanceStatus.late && (
                    <CalendarDays size={10} className="inline mr-1" />
                  )}
                  {r.status}
                </span>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}

// ─── Student Row ──────────────────────────────────────────────────────────────

function StudentRow({
  student,
  onEdit,
  onDelete,
}: {
  student: StudentView;
  onEdit: (s: StudentView) => void;
  onDelete: (s: StudentView) => void;
}) {
  return (
    <tr
      className="border-b border-border hover:bg-muted/30 transition-colors"
      data-ocid={`student-row-${student.id}`}
    >
      <td className="py-3 px-4">
        <div className="font-medium text-sm text-foreground">
          {student.name}
        </div>
        <div className="text-xs text-muted-foreground">{student.email}</div>
      </td>
      <td className="py-3 px-4 text-sm text-foreground font-mono">
        {student.username}
      </td>
      <td className="py-3 px-4 text-sm text-foreground">{student.phone}</td>
      <td className="py-3 px-4 text-sm text-foreground">
        {student.courseId.toUpperCase()}
      </td>
      <td className="py-3 px-4">
        <Badge
          className={
            student.enrolled
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-yellow-100 text-yellow-700 border border-yellow-200"
          }
        >
          {student.enrolled ? "Enrolled" : "Pending"}
        </Badge>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(student)}
            className="gap-1.5"
            data-ocid={`edit-student-${student.id}`}
          >
            <Pencil size={12} /> Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(student)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
            data-ocid={`delete-student-${student.id}`}
          >
            <Trash2 size={12} /> Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminStudentsPage() {
  const { admin } = useAdminAuth();
  const loginId = admin?.loginId ?? "";
  const password = admin?.password ?? "";

  const { data: students, isLoading } = useAdminListStudents(loginId, password);
  const createMutation = useAdminCreateStudent(loginId, password);
  const updateMutation = useAdminUpdateStudent(loginId, password);
  const deleteMutation = useAdminDeleteStudent(loginId, password);

  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<StudentView | null>(null);
  const [editTab, setEditTab] = useState<"details" | "attendance">("details");
  const [deleteTarget, setDeleteTarget] = useState<StudentView | null>(null);
  const [newForm, setNewForm] = useState<CreateForm>(EMPTY_CREATE);
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    email: "",
    phone: "",
    courseId: "",
    enrolled: false,
    username: "",
  });

  const filtered =
    students?.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.username.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  useEffect(() => {
    if (editStudent) {
      setEditTab("details");
      setEditForm({
        name: editStudent.name,
        email: editStudent.email,
        phone: editStudent.phone,
        courseId: editStudent.courseId,
        enrolled: editStudent.enrolled,
        username: editStudent.username,
      });
    }
  }, [editStudent]);

  const handleNameChange = (name: string) => {
    const suggested = name
      .toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9.]/g, "");
    setNewForm((f) => ({
      ...f,
      name,
      username:
        f.username === "" || f.username === suggestedFrom(f.name)
          ? suggested
          : f.username,
    }));
  };

  function suggestedFrom(name: string) {
    return name
      .toLowerCase()
      .replace(/\s+/g, ".")
      .replace(/[^a-z0-9.]/g, "");
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newForm.name ||
      !newForm.email ||
      !newForm.phone ||
      !newForm.courseId ||
      !newForm.username ||
      !newForm.password
    ) {
      toast.error("Fill in all required fields.");
      return;
    }
    try {
      await createMutation.mutateAsync({
        name: newForm.name,
        email: newForm.email,
        phone: newForm.phone,
        courseId: newForm.courseId,
        username: newForm.username,
        password: newForm.password,
      });
      toast.success("Student account created successfully.");
      setCreateOpen(false);
      setNewForm(EMPTY_CREATE);
    } catch {
      toast.error("Failed to create student account.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStudent) return;
    try {
      await updateMutation.mutateAsync({
        id: editStudent.id,
        input: {
          name: editForm.name || undefined,
          email: editForm.email || undefined,
          phone: editForm.phone || undefined,
          courseId: editForm.courseId || undefined,
          enrolled: editForm.enrolled,
        },
      });
      toast.success("Student updated successfully.");
      setEditStudent(null);
    } catch {
      toast.error("Failed to update student.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id as StudentId);
      toast.success(`${deleteTarget.name} deleted.`);
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete student.");
    }
  };

  return (
    <div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        name={deleteTarget?.name ?? ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleteMutation.isPending}
      />

      <section className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Students
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage student accounts and enrollment
            </p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" data-ocid="create-student-btn">
                <Plus size={15} /> Create Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">
                  Create Student Account
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-3 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      placeholder="Full name"
                      value={newForm.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="mt-1"
                      data-ocid="create-name-input"
                    />
                  </div>
                  <div>
                    <Label>Phone *</Label>
                    <Input
                      placeholder="+91 XXXXX"
                      value={newForm.phone}
                      onChange={(e) =>
                        setNewForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="create-phone-input"
                    />
                  </div>
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="student@email.com"
                    value={newForm.email}
                    onChange={(e) =>
                      setNewForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="create-email-input"
                  />
                </div>
                <div>
                  <Label>Course *</Label>
                  <Select
                    value={newForm.courseId}
                    onValueChange={(v) =>
                      setNewForm((f) => ({ ...f, courseId: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1"
                      data-ocid="create-course-select"
                    >
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSE_LIST.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name} — {c.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Username *</Label>
                    <Input
                      placeholder="Username"
                      value={newForm.username}
                      onChange={(e) =>
                        setNewForm((f) => ({ ...f, username: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="create-username-input"
                    />
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Auto-suggested from name
                    </p>
                  </div>
                  <div>
                    <Label>Password *</Label>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={newForm.password}
                      onChange={(e) =>
                        setNewForm((f) => ({ ...f, password: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="create-password-input"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createMutation.isPending}
                  data-ocid="create-student-submit"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin mr-2" />{" "}
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-xs">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Search students..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                    data-ocid="student-search"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  {filtered.length} students
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-3">
                  {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                    <Skeleton key={k} className="h-12 w-full" />
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-xs text-muted-foreground">
                        <th className="text-left py-3 px-4 font-medium">
                          Student
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Username
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Phone
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Course
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((s) => (
                        <StudentRow
                          key={s.id.toString()}
                          student={s}
                          onEdit={setEditStudent}
                          onDelete={setDeleteTarget}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <User
                    size={36}
                    className="mx-auto text-muted-foreground/30 mb-3"
                  />
                  <p className="text-sm text-muted-foreground">
                    {search
                      ? "No students match your search."
                      : "No students yet. Create the first account."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Edit Dialog with Tabs */}
      <Dialog
        open={!!editStudent}
        onOpenChange={(o) => !o && setEditStudent(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Student</DialogTitle>
          </DialogHeader>
          {editStudent && (
            <div className="mt-2">
              {/* Tab Switcher */}
              <div className="flex border border-border rounded-lg overflow-hidden mb-4">
                <button
                  type="button"
                  onClick={() => setEditTab("details")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    editTab === "details"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="edit-tab-details"
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => setEditTab("attendance")}
                  className={`flex-1 py-2 text-sm font-medium transition-colors ${
                    editTab === "attendance"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="edit-tab-attendance"
                >
                  Attendance
                </button>
              </div>

              {editTab === "details" ? (
                <form onSubmit={handleUpdate} className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3 text-sm flex items-center gap-2">
                    <User
                      size={14}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      ID #{editStudent.id.toString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · @{editStudent.username}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="mt-1"
                        data-ocid="edit-name-input"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        className="mt-1"
                        data-ocid="edit-phone-input"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="mt-1"
                      data-ocid="edit-email-input"
                    />
                  </div>

                  <div>
                    <Label>Course</Label>
                    <Select
                      value={editForm.courseId}
                      onValueChange={(v) =>
                        setEditForm((f) => ({ ...f, courseId: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1"
                        data-ocid="edit-course-select"
                      >
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {COURSE_LIST.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name} — {c.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                    <div>
                      <Label className="text-sm font-medium">
                        Enrollment Status
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Mark student as enrolled
                      </p>
                    </div>
                    <Switch
                      checked={editForm.enrolled}
                      onCheckedChange={(v) =>
                        setEditForm((f) => ({ ...f, enrolled: v }))
                      }
                      data-ocid="edit-enrolled-toggle"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={updateMutation.isPending}
                      data-ocid="edit-student-submit"
                    >
                      {updateMutation.isPending ? (
                        <>
                          <Loader2 size={14} className="animate-spin mr-2" />{" "}
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditStudent(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <AttendancePanel
                  student={editStudent}
                  loginId={loginId}
                  password={password}
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
