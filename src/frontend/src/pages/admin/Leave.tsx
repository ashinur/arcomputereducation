import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Loader2,
  Trash2,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { LeaveStatus } from "../../backend";
import { useAdminAuth } from "../../hooks/useAuth";
import {
  useAdminDeleteLeaveRequest,
  useAdminListLeaveRequests,
  useReviewLeaveRequest,
} from "../../hooks/useBackend";
import type { LeaveRequestId, LeaveRequestView } from "../../types";

function statusBadge(status: LeaveStatus) {
  if (status === LeaveStatus.approved)
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200">
        Approved
      </Badge>
    );
  if (status === LeaveStatus.rejected)
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>
    );
  return (
    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
      Pending
    </Badge>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function ConfirmDeleteDialog({
  open,
  onConfirm,
  onCancel,
  isLoading,
}: {
  open: boolean;
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
            Delete Leave Request
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Are you sure you want to delete this leave request? This cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid="confirm-delete-leave-btn"
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

function LeaveCard({
  request,
  onReview,
  onDelete,
  isReviewing,
}: {
  request: LeaveRequestView;
  onReview: (id: bigint, status: LeaveStatus) => void;
  onDelete: (request: LeaveRequestView) => void;
  isReviewing: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-lg p-4 bg-card space-y-3"
      data-ocid="admin-leave-card"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0">
          <p className="text-sm font-medium text-foreground">
            Student ID:{" "}
            <span className="font-mono">{request.studentId.toString()}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">{formatDate(request.startDate)}</span>
            {" → "}
            <span className="font-medium">{formatDate(request.endDate)}</span>
          </p>
          <p className="text-sm text-foreground/80 line-clamp-2">
            {request.reason}
          </p>
        </div>
        <div className="shrink-0">{statusBadge(request.leaveStatus)}</div>
      </div>

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        {request.leaveStatus === LeaveStatus.pending && (
          <>
            <Button
              size="sm"
              variant="outline"
              className="text-green-700 border-green-300 hover:bg-green-50 gap-1"
              onClick={() => onReview(request.id, LeaveStatus.approved)}
              disabled={isReviewing}
              data-ocid="leave-approve-btn"
            >
              {isReviewing ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <CheckCircle className="h-3 w-3" />
              )}
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-700 border-red-300 hover:bg-red-50 gap-1"
              onClick={() => onReview(request.id, LeaveStatus.rejected)}
              disabled={isReviewing}
              data-ocid="leave-reject-btn"
            >
              {isReviewing ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <XCircle className="h-3 w-3" />
              )}
              Reject
            </Button>
          </>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 ml-auto"
          onClick={() => onDelete(request)}
          data-ocid="leave-delete-btn"
        >
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </div>
    </motion.div>
  );
}

export default function AdminLeavePage() {
  const { admin } = useAdminAuth();
  const loginId = admin?.loginId ?? "";
  const password = admin?.password ?? "";
  const [filter, setFilter] = useState<string>("all");
  const [reviewingId, setReviewingId] = useState<bigint | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeaveRequestView | null>(
    null,
  );

  const { data: requests, isLoading } = useAdminListLeaveRequests(
    loginId,
    password,
  );
  const reviewMutation = useReviewLeaveRequest(loginId, password);
  const deleteMutation = useAdminDeleteLeaveRequest(loginId, password);

  const filtered = (requests ?? []).filter((r) => {
    if (filter === "all") return true;
    return r.leaveStatus === (filter as LeaveStatus);
  });

  const pendingCount = (requests ?? []).filter(
    (r) => r.leaveStatus === LeaveStatus.pending,
  ).length;

  const handleReview = async (id: bigint, status: LeaveStatus) => {
    setReviewingId(id);
    try {
      const updated = await reviewMutation.mutateAsync({ id, status });
      if (!updated) {
        toast.error(
          "Leave request could not be found. It may have been deleted.",
        );
        return;
      }
      toast.success(
        status === LeaveStatus.approved ? "Leave approved" : "Leave rejected",
      );
    } catch (err) {
      console.error("Failed to update leave request:", err);
      toast.error("Failed to update leave request");
    } finally {
      setReviewingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const deleted = await deleteMutation.mutateAsync(
        deleteTarget.id as LeaveRequestId,
      );
      if (!deleted) {
        toast.error(
          "Leave request could not be found. It may already be deleted.",
        );
        setDeleteTarget(null);
        return;
      }
      toast.success("Leave request deleted");
      setDeleteTarget(null);
    } catch (err) {
      console.error("Failed to delete leave request:", err);
      toast.error("Failed to delete leave request");
    }
  };

  return (
    <div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleteMutation.isPending}
      />

      <section className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Leave Requests
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Review and manage student leave applications
            </p>
          </div>
          {pendingCount > 0 && (
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 gap-1.5">
              <Clock className="h-3 w-3" />
              {pendingCount} pending
            </Badge>
          )}
        </div>
      </section>

      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total",
                value: requests?.length ?? 0,
                icon: CalendarDays,
                color: "text-primary",
              },
              {
                label: "Pending",
                value: (requests ?? []).filter(
                  (r) => r.leaveStatus === LeaveStatus.pending,
                ).length,
                icon: Clock,
                color: "text-yellow-600",
              },
              {
                label: "Approved",
                value: (requests ?? []).filter(
                  (r) => r.leaveStatus === LeaveStatus.approved,
                ).length,
                icon: CheckCircle,
                color: "text-green-600",
              },
              {
                label: "Rejected",
                value: (requests ?? []).filter(
                  (r) => r.leaveStatus === LeaveStatus.rejected,
                ).length,
                icon: XCircle,
                color: "text-red-600",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <Card key={label} className="border-border bg-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${color} shrink-0`} />
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table / List */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium flex items-center justify-between flex-wrap gap-3">
                <span>All Requests</span>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger
                    className="w-36"
                    data-ocid="leave-filter-select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value={LeaveStatus.pending}>Pending</SelectItem>
                    <SelectItem value={LeaveStatus.approved}>
                      Approved
                    </SelectItem>
                    <SelectItem value={LeaveStatus.rejected}>
                      Rejected
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading ? (
                ["s1", "s2", "s3"].map((k) => (
                  <Skeleton key={k} className="h-24 w-full rounded-lg" />
                ))
              ) : filtered.length === 0 ? (
                <div
                  className="text-center py-12 text-muted-foreground"
                  data-ocid="leave-empty-state"
                >
                  <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No leave requests found</p>
                  <p className="text-sm mt-1">
                    {filter !== "all"
                      ? "Try changing the filter above."
                      : "Students haven't submitted any leave requests yet."}
                  </p>
                </div>
              ) : (
                filtered.map((req) => (
                  <LeaveCard
                    key={req.id.toString()}
                    request={req}
                    onReview={handleReview}
                    onDelete={setDeleteTarget}
                    isReviewing={reviewingId === req.id}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
