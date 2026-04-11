import { c as createLucideIcon, g as useAdminAuth, r as reactExports, j as jsxRuntimeExports, B as Button, u as ue } from "./index-Djvn3v0p.js";
import { B as Badge } from "./badge-CuiB0NEK.js";
import { C as Card, a as CardContent } from "./card-BYxng7tC.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BJTLfEvh.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DCTVpo5b.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { m as useAdminListApplications, v as useAdminUpdateApplicationStatus, w as useAdminDeleteApplication } from "./useBackend-CWemGVNS.js";
import { A as ApplicationStatus } from "./index-DBzDkiVo.js";
import { C as Clock } from "./clock-Cyw91v7T.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { C as CalendarDays } from "./calendar-days-CDnatwL0.js";
import { C as CircleCheckBig } from "./circle-check-big-CeE4cJRx.js";
import { C as CircleX } from "./circle-x-CdT5OaaX.js";
import { E as Eye } from "./eye-f5p77-IH.js";
import { T as Trash2 } from "./trash-2-DKiTmS7B.js";
import { F as FileText } from "./file-text-DQvz_Mlk.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
import "./Combination-CAZ7bin_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
  ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
];
const FileImage = createLucideIcon("file-image", __iconNode);
function formatDate(timestamp) {
  const ms = Number(timestamp) / 1e6;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function statusBadgeClass(status) {
  if (status === ApplicationStatus.approved)
    return "bg-green-100 text-green-700 border-green-200 border";
  if (status === ApplicationStatus.rejected)
    return "bg-red-100 text-red-700 border-red-200 border";
  return "bg-yellow-100 text-yellow-700 border-yellow-200 border";
}
function DocLink({
  label,
  blob
}) {
  if (!blob)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Not uploaded" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: blob.getDirectURL(),
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex items-center gap-1 text-xs text-primary hover:underline",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { size: 12 }),
        " View ",
        label
      ]
    }
  );
}
function ConfirmDeleteDialog({
  open,
  name,
  onConfirm,
  onCancel,
  isLoading
}) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full mx-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Application" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
      "Are you sure you want to delete the application from",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: name }),
      "? This cannot be undone."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "destructive",
          className: "flex-1",
          onClick: onConfirm,
          disabled: isLoading,
          "data-ocid": "confirm-delete-app-btn",
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
function AdminApplicationsPage() {
  const { admin } = useAdminAuth();
  const loginId = (admin == null ? void 0 : admin.loginId) ?? "";
  const password = (admin == null ? void 0 : admin.password) ?? "";
  const { data: applications, isLoading } = useAdminListApplications(
    loginId,
    password
  );
  const updateMutation = useAdminUpdateApplicationStatus(loginId, password);
  const deleteMutation = useAdminDeleteApplication(loginId, password);
  const [selectedApp, setSelectedApp] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [filterStatus, setFilterStatus] = reactExports.useState("all");
  const filtered = (applications == null ? void 0 : applications.filter(
    (a) => filterStatus === "all" ? true : a.status === filterStatus
  )) ?? [];
  const handleStatusChange = async (id, status) => {
    try {
      await updateMutation.mutateAsync({ id, status });
      ue.success("Application status updated.");
      if ((selectedApp == null ? void 0 : selectedApp.id) === id) {
        setSelectedApp((prev) => prev ? { ...prev, status } : null);
      }
    } catch {
      ue.error("Failed to update status.");
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      ue.success("Application deleted.");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete application.");
    }
  };
  const pendingCount = (applications == null ? void 0 : applications.filter((a) => a.status === ApplicationStatus.pending).length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDeleteDialog,
      {
        open: !!deleteTarget,
        name: (deleteTarget == null ? void 0 : deleteTarget.name) ?? "",
        onConfirm: handleDeleteConfirm,
        onCancel: () => setDeleteTarget(null),
        isLoading: deleteMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Applications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
        "Review and manage admission applications",
        pendingCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 inline-flex items-center gap-1 text-yellow-600 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
          " ",
          pendingCount,
          " pending review"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: filterStatus, onValueChange: setFilterStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44 bg-card", "data-ocid": "app-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Applications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ApplicationStatus.pending, children: "⏳ Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ApplicationStatus.approved, children: "✅ Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ApplicationStatus.rejected, children: "❌ Rejected" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          filtered.length,
          " applications"
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-xl" }, k)) }) : filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filtered.map((app, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border bg-card hover:shadow-subtle transition-smooth",
              "data-ocid": `app-card-${app.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: app.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: statusBadgeClass(app.status), children: [
                      app.status === ApplicationStatus.pending ? "⏳ " : "",
                      app.status === ApplicationStatus.approved ? "✅ " : "",
                      app.status === ApplicationStatus.rejected ? "❌ " : "",
                      app.status
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                    app.email,
                    " · ",
                    app.phone
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground mt-1 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Course:",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: app.courseId.toUpperCase() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 10 }),
                      formatDate(app.submittedAt)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground/70", children: [
                      "#",
                      app.id.toString()
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 flex-wrap", children: [
                  app.status === ApplicationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        className: "gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs h-8",
                        onClick: () => handleStatusChange(
                          app.id,
                          ApplicationStatus.approved
                        ),
                        disabled: updateMutation.isPending,
                        "data-ocid": `approve-btn-${app.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 13 }),
                          " Approve"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "destructive",
                        className: "gap-1.5 text-xs h-8",
                        onClick: () => handleStatusChange(
                          app.id,
                          ApplicationStatus.rejected
                        ),
                        disabled: updateMutation.isPending,
                        "data-ocid": `reject-btn-${app.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 13 }),
                          " Reject"
                        ]
                      }
                    )
                  ] }),
                  app.status !== ApplicationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: app.status,
                      onValueChange: (v) => handleStatusChange(
                        app.id,
                        v
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-8 text-xs w-32",
                            "data-ocid": `status-select-${app.id}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ApplicationStatus.pending, children: "Pending" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ApplicationStatus.approved, children: "Approved" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ApplicationStatus.rejected, children: "Rejected" })
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      onClick: () => setSelectedApp(app),
                      className: "gap-1.5 h-8 text-xs",
                      "data-ocid": `view-app-${app.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 13 }),
                        " View Docs"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      onClick: () => setDeleteTarget(app),
                      className: "text-destructive hover:text-destructive hover:bg-destructive/10 h-8",
                      "data-ocid": `delete-app-${app.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                    }
                  )
                ] })
              ] }) })
            }
          )
        },
        app.id.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FileText,
          {
            size: 36,
            className: "mx-auto text-muted-foreground/30 mb-3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No applications found." })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!selectedApp,
        onOpenChange: (o) => !o && setSelectedApp(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Application Details" }) }),
          selectedApp && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedApp.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Course" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedApp.courseId.toUpperCase() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium break-all", children: selectedApp.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: selectedApp.phone })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Application ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-medium", children: [
                  "#",
                  selectedApp.id.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Submitted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatDate(selectedApp.submittedAt) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: statusBadgeClass(selectedApp.status), children: selectedApp.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold text-muted-foreground uppercase mb-3", children: "Uploaded Documents" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                { label: "Photo", blob: selectedApp.photo },
                { label: "Aadhaar Card", blob: selectedApp.aadhaar },
                { label: "10th Marksheet", blob: selectedApp.marksheet10 },
                { label: "12th Marksheet", blob: selectedApp.marksheet12 },
                {
                  label: "Pass Certificate",
                  blob: selectedApp.passCertificate
                }
              ].map(({ label, blob }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-2.5 rounded-lg border border-border bg-muted/30",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground block mb-1", children: label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DocLink, { label, blob })
                  ]
                },
                label
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "flex-1 bg-green-600 hover:bg-green-700 text-white gap-1.5",
                  onClick: () => handleStatusChange(
                    selectedApp.id,
                    ApplicationStatus.approved
                  ),
                  disabled: selectedApp.status === ApplicationStatus.approved || updateMutation.isPending,
                  "data-ocid": "approve-app-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14 }),
                    " Approve"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  className: "flex-1 gap-1.5",
                  onClick: () => handleStatusChange(
                    selectedApp.id,
                    ApplicationStatus.rejected
                  ),
                  disabled: selectedApp.status === ApplicationStatus.rejected || updateMutation.isPending,
                  "data-ocid": "reject-app-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14 }),
                    " Reject"
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminApplicationsPage as default
};
