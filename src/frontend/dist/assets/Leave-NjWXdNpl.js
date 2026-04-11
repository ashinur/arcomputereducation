import { g as useAdminAuth, r as reactExports, j as jsxRuntimeExports, u as ue, B as Button } from "./index-Djvn3v0p.js";
import { B as Badge } from "./badge-CuiB0NEK.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BYxng7tC.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DCTVpo5b.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { o as useAdminListLeaveRequests, C as useReviewLeaveRequest, D as useAdminDeleteLeaveRequest, L as LeaveStatus } from "./useBackend-CWemGVNS.js";
import { C as Clock } from "./clock-Cyw91v7T.js";
import { C as CalendarDays } from "./calendar-days-CDnatwL0.js";
import { C as CircleCheckBig } from "./circle-check-big-CeE4cJRx.js";
import { C as CircleX } from "./circle-x-CdT5OaaX.js";
import { T as Trash2 } from "./trash-2-DKiTmS7B.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import "./Combination-CAZ7bin_.js";
function statusBadge(status) {
  if (status === LeaveStatus.approved)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 border-green-200", children: "Approved" });
  if (status === LeaveStatus.rejected)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-800 border-red-200", children: "Rejected" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-800 border-yellow-200", children: "Pending" });
}
function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}
function ConfirmDeleteDialog({
  open,
  onConfirm,
  onCancel,
  isLoading
}) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full mx-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Leave Request" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-5", children: "Are you sure you want to delete this leave request? This cannot be undone." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "destructive",
          className: "flex-1",
          onClick: onConfirm,
          disabled: isLoading,
          "data-ocid": "confirm-delete-leave-btn",
          children: [
            isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
            "Delete"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onCancel, children: "Cancel" })
    ] })
  ] }) });
}
function LeaveCard({
  request,
  onReview,
  onDelete,
  isReviewing
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: "border border-border rounded-lg p-4 bg-card space-y-3",
      "data-ocid": "admin-leave-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
              "Student ID:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: request.studentId.toString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatDate(request.startDate) }),
              " → ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatDate(request.endDate) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 line-clamp-2", children: request.reason })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: statusBadge(request.leaveStatus) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1 flex-wrap", children: [
          request.leaveStatus === LeaveStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-green-700 border-green-300 hover:bg-green-50 gap-1",
                onClick: () => onReview(request.id, LeaveStatus.approved),
                disabled: isReviewing,
                "data-ocid": "leave-approve-btn",
                children: [
                  isReviewing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
                  "Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "text-red-700 border-red-300 hover:bg-red-50 gap-1",
                onClick: () => onReview(request.id, LeaveStatus.rejected),
                disabled: isReviewing,
                "data-ocid": "leave-reject-btn",
                children: [
                  isReviewing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3 w-3" }),
                  "Reject"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "text-destructive hover:text-destructive hover:bg-destructive/10 gap-1 ml-auto",
              onClick: () => onDelete(request),
              "data-ocid": "leave-delete-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
                "Delete"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function AdminLeavePage() {
  const { admin } = useAdminAuth();
  const loginId = (admin == null ? void 0 : admin.loginId) ?? "";
  const password = (admin == null ? void 0 : admin.password) ?? "";
  const [filter, setFilter] = reactExports.useState("all");
  const [reviewingId, setReviewingId] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(
    null
  );
  const { data: requests, isLoading } = useAdminListLeaveRequests(
    loginId,
    password
  );
  const reviewMutation = useReviewLeaveRequest(loginId, password);
  const deleteMutation = useAdminDeleteLeaveRequest(loginId, password);
  const filtered = (requests ?? []).filter((r) => {
    if (filter === "all") return true;
    return r.leaveStatus === filter;
  });
  const pendingCount = (requests ?? []).filter(
    (r) => r.leaveStatus === LeaveStatus.pending
  ).length;
  const handleReview = async (id, status) => {
    setReviewingId(id);
    try {
      await reviewMutation.mutateAsync({ id, status });
      ue.success(
        status === LeaveStatus.approved ? "Leave approved" : "Leave rejected"
      );
    } catch {
      ue.error("Failed to update leave request");
    } finally {
      setReviewingId(null);
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      ue.success("Leave request deleted");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete leave request");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDeleteDialog,
      {
        open: !!deleteTarget,
        onConfirm: handleDeleteConfirm,
        onCancel: () => setDeleteTarget(null),
        isLoading: deleteMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Leave Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Review and manage student leave applications" })
      ] }),
      pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-yellow-100 text-yellow-800 border-yellow-200 gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
        pendingCount,
        " pending"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6", children: [
        {
          label: "Total",
          value: (requests == null ? void 0 : requests.length) ?? 0,
          icon: CalendarDays,
          color: "text-primary"
        },
        {
          label: "Pending",
          value: (requests ?? []).filter(
            (r) => r.leaveStatus === LeaveStatus.pending
          ).length,
          icon: Clock,
          color: "text-yellow-600"
        },
        {
          label: "Approved",
          value: (requests ?? []).filter(
            (r) => r.leaveStatus === LeaveStatus.approved
          ).length,
          icon: CircleCheckBig,
          color: "text-green-600"
        },
        {
          label: "Rejected",
          value: (requests ?? []).filter(
            (r) => r.leaveStatus === LeaveStatus.rejected
          ).length,
          icon: CircleX,
          color: "text-red-600"
        }
      ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color} shrink-0` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
        ] })
      ] }) }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base font-medium flex items-center justify-between flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All Requests" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filter, onValueChange: setFilter, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectTrigger,
              {
                className: "w-36",
                "data-ocid": "leave-filter-select",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: LeaveStatus.pending, children: "Pending" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: LeaveStatus.approved, children: "Approved" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: LeaveStatus.rejected, children: "Rejected" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: isLoading ? ["s1", "s2", "s3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-lg" }, k)) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "text-center py-12 text-muted-foreground",
            "data-ocid": "leave-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "No leave requests found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: filter !== "all" ? "Try changing the filter above." : "Students haven't submitted any leave requests yet." })
            ]
          }
        ) : filtered.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          LeaveCard,
          {
            request: req,
            onReview: handleReview,
            onDelete: setDeleteTarget,
            isReviewing: reviewingId === req.id
          },
          req.id.toString()
        )) })
      ] })
    ] }) })
  ] });
}
export {
  AdminLeavePage as default
};
