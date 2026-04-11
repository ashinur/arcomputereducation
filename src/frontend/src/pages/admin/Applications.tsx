import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  Eye,
  FileImage,
  FileText,
  Loader2,
  Trash2,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAdminAuth } from "../../hooks/useAuth";
import {
  useAdminDeleteApplication,
  useAdminListApplications,
  useAdminUpdateApplicationStatus,
} from "../../hooks/useBackend";
import { ApplicationStatus } from "../../types";
import type { AdmissionApplicationView, ApplicationId } from "../../types";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function statusBadgeClass(status: ApplicationStatus) {
  if (status === ApplicationStatus.approved)
    return "bg-green-100 text-green-700 border-green-200 border";
  if (status === ApplicationStatus.rejected)
    return "bg-red-100 text-red-700 border-red-200 border";
  return "bg-yellow-100 text-yellow-700 border-yellow-200 border";
}

function DocLink({
  label,
  blob,
}: { label: string; blob?: { getDirectURL: () => string } }) {
  if (!blob)
    return <span className="text-xs text-muted-foreground">Not uploaded</span>;
  return (
    <a
      href={blob.getDirectURL()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-xs text-primary hover:underline"
    >
      <FileImage size={12} /> View {label}
    </a>
  );
}

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
            Delete Application
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Are you sure you want to delete the application from{" "}
          <span className="font-semibold text-foreground">{name}</span>? This
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid="confirm-delete-app-btn"
          >
            {isLoading && <Loader2 size={14} className="animate-spin mr-2" />}
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

export default function AdminApplicationsPage() {
  const { admin } = useAdminAuth();
  const loginId = admin?.loginId ?? "";
  const password = admin?.password ?? "";

  const { data: applications, isLoading } = useAdminListApplications(
    loginId,
    password,
  );
  const updateMutation = useAdminUpdateApplicationStatus(loginId, password);
  const deleteMutation = useAdminDeleteApplication(loginId, password);

  const [selectedApp, setSelectedApp] =
    useState<AdmissionApplicationView | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<AdmissionApplicationView | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered =
    applications?.filter((a) =>
      filterStatus === "all" ? true : a.status === filterStatus,
    ) ?? [];

  const handleStatusChange = async (id: bigint, status: ApplicationStatus) => {
    try {
      await updateMutation.mutateAsync({ id, status });
      toast.success("Application status updated.");
      if (selectedApp?.id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status } : null));
      }
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id as ApplicationId);
      toast.success("Application deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete application.");
    }
  };

  const pendingCount =
    applications?.filter((a) => a.status === ApplicationStatus.pending)
      .length ?? 0;

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
        <div className="container mx-auto px-4">
          <h1 className="font-display font-bold text-2xl text-foreground">
            Applications
          </h1>
          <p className="text-muted-foreground text-sm">
            Review and manage admission applications
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 text-yellow-600 font-medium">
                <Clock size={12} /> {pendingCount} pending review
              </span>
            )}
          </p>
        </div>
      </section>

      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-44 bg-card" data-ocid="app-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
                <SelectItem value={ApplicationStatus.pending}>
                  ⏳ Pending
                </SelectItem>
                <SelectItem value={ApplicationStatus.approved}>
                  ✅ Approved
                </SelectItem>
                <SelectItem value={ApplicationStatus.rejected}>
                  ❌ Rejected
                </SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {filtered.length} applications
            </span>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {["sk1", "sk2", "sk3", "sk4"].map((k) => (
                <Skeleton key={k} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((app, i) => (
                <motion.div
                  key={app.id.toString()}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    className="border-border bg-card hover:shadow-subtle transition-smooth"
                    data-ocid={`app-card-${app.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="font-semibold text-foreground">
                              {app.name}
                            </span>
                            <Badge className={statusBadgeClass(app.status)}>
                              {app.status === ApplicationStatus.pending
                                ? "⏳ "
                                : ""}
                              {app.status === ApplicationStatus.approved
                                ? "✅ "
                                : ""}
                              {app.status === ApplicationStatus.rejected
                                ? "❌ "
                                : ""}
                              {app.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {app.email} · {app.phone}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap">
                            <span>
                              Course:{" "}
                              <span className="font-medium text-foreground">
                                {app.courseId.toUpperCase()}
                              </span>
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarDays size={10} />
                              {formatDate(app.submittedAt)}
                            </span>
                            <span className="font-mono text-muted-foreground/70">
                              #{app.id.toString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {app.status === ApplicationStatus.pending && (
                            <>
                              <Button
                                size="sm"
                                className="gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                                onClick={() =>
                                  handleStatusChange(
                                    app.id,
                                    ApplicationStatus.approved,
                                  )
                                }
                                disabled={updateMutation.isPending}
                                data-ocid={`approve-btn-${app.id}`}
                              >
                                <CheckCircle size={13} /> Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="gap-1.5 text-xs h-8"
                                onClick={() =>
                                  handleStatusChange(
                                    app.id,
                                    ApplicationStatus.rejected,
                                  )
                                }
                                disabled={updateMutation.isPending}
                                data-ocid={`reject-btn-${app.id}`}
                              >
                                <XCircle size={13} /> Reject
                              </Button>
                            </>
                          )}
                          {app.status !== ApplicationStatus.pending && (
                            <Select
                              value={app.status}
                              onValueChange={(v) =>
                                handleStatusChange(
                                  app.id,
                                  v as ApplicationStatus,
                                )
                              }
                            >
                              <SelectTrigger
                                className="h-8 text-xs w-32"
                                data-ocid={`status-select-${app.id}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={ApplicationStatus.pending}>
                                  Pending
                                </SelectItem>
                                <SelectItem value={ApplicationStatus.approved}>
                                  Approved
                                </SelectItem>
                                <SelectItem value={ApplicationStatus.rejected}>
                                  Rejected
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedApp(app)}
                            className="gap-1.5 h-8 text-xs"
                            data-ocid={`view-app-${app.id}`}
                          >
                            <Eye size={13} /> View Docs
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeleteTarget(app)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                            data-ocid={`delete-app-${app.id}`}
                          >
                            <Trash2 size={13} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="py-12 text-center">
                <FileText
                  size={36}
                  className="mx-auto text-muted-foreground/30 mb-3"
                />
                <p className="text-sm text-muted-foreground">
                  No applications found.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Application Detail Dialog */}
      <Dialog
        open={!!selectedApp}
        onOpenChange={(o) => !o && setSelectedApp(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">
              Application Details
            </DialogTitle>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Name
                  </span>
                  <span className="font-medium">{selectedApp.name}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Course
                  </span>
                  <span className="font-medium">
                    {selectedApp.courseId.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Email
                  </span>
                  <span className="font-medium break-all">
                    {selectedApp.email}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Phone
                  </span>
                  <span className="font-medium">{selectedApp.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Application ID
                  </span>
                  <span className="font-mono font-medium">
                    #{selectedApp.id.toString()}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Submitted
                  </span>
                  <span className="font-medium">
                    {formatDate(selectedApp.submittedAt)}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground block">
                    Status
                  </span>
                  <Badge className={statusBadgeClass(selectedApp.status)}>
                    {selectedApp.status}
                  </Badge>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                  Uploaded Documents
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Photo", blob: selectedApp.photo },
                    { label: "Aadhaar Card", blob: selectedApp.aadhaar },
                    { label: "10th Marksheet", blob: selectedApp.marksheet10 },
                    { label: "12th Marksheet", blob: selectedApp.marksheet12 },
                    {
                      label: "Pass Certificate",
                      blob: selectedApp.passCertificate,
                    },
                  ].map(({ label, blob }) => (
                    <div
                      key={label}
                      className="p-2.5 rounded-lg border border-border bg-muted/30"
                    >
                      <span className="text-xs text-muted-foreground block mb-1">
                        {label}
                      </span>
                      <DocLink label={label} blob={blob} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-1.5"
                  onClick={() =>
                    handleStatusChange(
                      selectedApp.id,
                      ApplicationStatus.approved,
                    )
                  }
                  disabled={
                    selectedApp.status === ApplicationStatus.approved ||
                    updateMutation.isPending
                  }
                  data-ocid="approve-app-btn"
                >
                  <CheckCircle size={14} /> Approve
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 gap-1.5"
                  onClick={() =>
                    handleStatusChange(
                      selectedApp.id,
                      ApplicationStatus.rejected,
                    )
                  }
                  disabled={
                    selectedApp.status === ApplicationStatus.rejected ||
                    updateMutation.isPending
                  }
                  data-ocid="reject-app-btn"
                >
                  <XCircle size={14} /> Reject
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
