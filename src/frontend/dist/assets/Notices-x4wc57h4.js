import { g as useAdminAuth, r as reactExports, j as jsxRuntimeExports, B as Button, u as ue } from "./index-Djvn3v0p.js";
import { C as Card, a as CardContent } from "./card-BYxng7tC.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BJTLfEvh.js";
import { I as Input } from "./input-CE9166TT.js";
import { L as Label } from "./label-BYwFRBM8.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { T as Textarea } from "./textarea-DP3vurDj.js";
import { a as useListNotices, z as useAdminPostNotice, B as useAdminDeleteNotice } from "./useBackend-CWemGVNS.js";
import { P as Plus } from "./plus-BkXBaNkL.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { B as Bell } from "./bell-Di6Cqm-z.js";
import { C as CalendarDays } from "./calendar-days-CDnatwL0.js";
import { T as Trash2 } from "./trash-2-DKiTmS7B.js";
import { C as CircleAlert } from "./circle-alert-CDQ6zKhW.js";
import "./Combination-CAZ7bin_.js";
function formatDate(timestamp) {
  const ms = Number(timestamp) / 1e6;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function ConfirmDeleteDialog({
  open,
  title,
  onConfirm,
  onCancel,
  isLoading
}) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full mx-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Notice" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
      "Are you sure you want to delete the notice",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
        '"',
        title,
        '"'
      ] }),
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
          "data-ocid": "confirm-delete-notice-btn",
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
function AdminNoticesPage() {
  const { admin } = useAdminAuth();
  const loginId = (admin == null ? void 0 : admin.loginId) ?? "";
  const password = (admin == null ? void 0 : admin.password) ?? "";
  const { data: notices, isLoading } = useListNotices();
  const postMutation = useAdminPostNotice(loginId, password);
  const deleteMutation = useAdminDeleteNotice(loginId, password);
  const [open, setOpen] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const handlePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      ue.error("Title and content are required.");
      return;
    }
    try {
      await postMutation.mutateAsync({
        title: title.trim(),
        content: content.trim()
      });
      ue.success("Notice posted successfully!");
      setTitle("");
      setContent("");
      setOpen(false);
    } catch {
      ue.error("Failed to post notice. Please try again.");
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      ue.success("Notice deleted.");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete notice.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDeleteDialog,
      {
        open: !!deleteTarget,
        title: (deleteTarget == null ? void 0 : deleteTarget.title) ?? "",
        onConfirm: handleDeleteConfirm,
        onCancel: () => setDeleteTarget(null),
        isLoading: deleteMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Notice Board" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Post and manage institute notices" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "gap-2 bg-primary hover:bg-primary/90",
            "data-ocid": "post-notice-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
              " Post Notice"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Post New Notice" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handlePost,
              className: "space-y-4 mt-2",
              "data-ocid": "post-notice-form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ntitle", children: "Title" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "ntitle",
                      placeholder: "Notice title",
                      value: title,
                      onChange: (e) => setTitle(e.target.value),
                      className: "mt-1.5",
                      required: true,
                      "data-ocid": "notice-title-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ncontent", children: "Content" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "ncontent",
                      placeholder: "Write the notice content here...",
                      value: content,
                      onChange: (e) => setContent(e.target.value),
                      rows: 5,
                      className: "mt-1.5 resize-none",
                      required: true,
                      "data-ocid": "notice-content-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      className: "flex-1 bg-primary hover:bg-primary/90",
                      disabled: postMutation.isPending,
                      "data-ocid": "notice-submit-btn",
                      children: postMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
                        " ",
                        "Posting..."
                      ] }) : "Post Notice"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => setOpen(false),
                      children: "Cancel"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-3xl", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, k)) }) : notices && notices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: notices.map((notice, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.05 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border bg-card hover:shadow-subtle transition-smooth",
              "data-ocid": `notice-card-${notice.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 16, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-1", children: notice.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 11 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(notice.postedAt) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: notice.content })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "ghost",
                      className: "text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0",
                      onClick: () => setDeleteTarget(notice),
                      "data-ocid": `delete-notice-${notice.id}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                    }
                  )
                ] }) })
              ] }) })
            }
          )
        },
        notice.id.toString()
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Bell,
          {
            size: 48,
            className: "mx-auto text-muted-foreground/30 mb-4"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: "No Notices Yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Post your first notice to keep students informed." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setOpen(true),
            className: "gap-2 bg-primary hover:bg-primary/90",
            "data-ocid": "empty-post-notice-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
              " Post First Notice"
            ]
          }
        )
      ] }),
      notices && notices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 text-xs text-muted-foreground p-3 bg-card rounded-lg border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 13 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Notices are visible to all students and visitors on the public notice board." })
      ] })
    ] }) })
  ] });
}
export {
  AdminNoticesPage as default
};
