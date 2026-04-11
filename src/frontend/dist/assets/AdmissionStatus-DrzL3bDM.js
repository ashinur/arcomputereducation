import { r as reactExports, j as jsxRuntimeExports, B as Button, L as Link } from "./index-Djvn3v0p.js";
import { B as Badge } from "./badge-CuiB0NEK.js";
import { C as Card, a as CardContent } from "./card-BYxng7tC.js";
import { I as Input } from "./input-CE9166TT.js";
import { L as Label } from "./label-BYwFRBM8.js";
import { c as useGetApplication } from "./useBackend-CWemGVNS.js";
import { A as ApplicationStatus } from "./index-DBzDkiVo.js";
import { C as CircleX } from "./circle-x-CdT5OaaX.js";
import { C as CircleCheckBig } from "./circle-check-big-CeE4cJRx.js";
import { C as Clock } from "./clock-Cyw91v7T.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { S as Search } from "./search-BUBdze-y.js";
import { F as FileText } from "./file-text-DQvz_Mlk.js";
const STATUS_CONFIG = {
  [ApplicationStatus.pending]: {
    label: "Pending Review",
    icon: Clock,
    badgeClass: "bg-secondary text-secondary-foreground border-border",
    noticeClass: "bg-muted/50 border-border",
    noticeIconClass: "text-muted-foreground",
    noticeTextClass: "text-muted-foreground"
  },
  [ApplicationStatus.approved]: {
    label: "Approved",
    icon: CircleCheckBig,
    badgeClass: "bg-primary/15 text-primary border-primary/30",
    noticeClass: "bg-primary/10 border-primary/30",
    noticeIconClass: "text-primary",
    noticeTextClass: "text-primary/80"
  },
  [ApplicationStatus.rejected]: {
    label: "Rejected",
    icon: CircleX,
    badgeClass: "bg-destructive/15 text-destructive border-destructive/30",
    noticeClass: "bg-destructive/10 border-destructive/30",
    noticeIconClass: "text-destructive",
    noticeTextClass: "text-destructive/80"
  }
};
function AdmissionStatusPage() {
  const [applicationIdInput, setApplicationIdInput] = reactExports.useState("");
  const [searchId, setSearchId] = reactExports.useState(void 0);
  const {
    data: application,
    isLoading,
    isError
  } = useGetApplication(searchId);
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = applicationIdInput.trim();
    if (!trimmed) return;
    try {
      setSearchId(BigInt(trimmed));
    } catch {
      setSearchId(void 0);
    }
  };
  const statusConfig = application ? STATUS_CONFIG[application.status] : null;
  const StatusIcon = (statusConfig == null ? void 0 : statusConfig.icon) ?? Clock;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl text-foreground mb-3", children: "Track Application" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Enter your application ID to check the status of your admission application." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "form",
            {
              onSubmit: handleSearch,
              className: "space-y-4",
              "data-ocid": "status-search-form",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "appId", children: "Application ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "appId",
                      placeholder: "Enter your application ID",
                      value: applicationIdInput,
                      onChange: (e) => setApplicationIdInput(e.target.value),
                      className: "flex-1",
                      "data-ocid": "status-search-input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: isLoading,
                      "data-ocid": "status-search-btn",
                      children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 16 })
                    }
                  )
                ] })
              ] })
            }
          ),
          isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive", children: "Invalid application ID or application not found." }),
          application && statusConfig && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              className: "mt-6 space-y-4",
              "data-ocid": "application-status-result",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-1", children: "Application ID" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono font-bold text-foreground", children: [
                        "#",
                        application.id.toString()
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        className: `${statusConfig.badgeClass} border flex items-center gap-1.5`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { size: 12 }),
                          statusConfig.label
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs mb-0.5", children: "Applicant Name" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: application.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs mb-0.5", children: "Course Applied" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground uppercase", children: application.courseId })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs mb-0.5", children: "Phone" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: application.phone })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs mb-0.5", children: "Email" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground truncate", children: application.email })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `border rounded-lg p-4 flex gap-2 ${statusConfig.noticeClass}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        StatusIcon,
                        {
                          size: 16,
                          className: `${statusConfig.noticeIconClass} shrink-0 mt-0.5`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-xs ${statusConfig.noticeTextClass}`, children: [
                        application.status === ApplicationStatus.pending && "Your application is under review. Our admin team will process it shortly. Please check back in 1–3 business days.",
                        application.status === ApplicationStatus.approved && "Congratulations! Your application has been approved. You can now log in to your student account.",
                        application.status === ApplicationStatus.rejected && "Your application has been rejected. Please contact us for more information or to reapply."
                      ] })
                    ]
                  }
                ),
                application.status === ApplicationStatus.approved && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full bg-primary hover:bg-primary/90", children: "Go to Student Login" }) }),
                application.status === ApplicationStatus.rejected && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: "Contact Us" }) })
              ]
            }
          ),
          searchId !== void 0 && !isLoading && !application && !isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 text-center py-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileText,
              {
                size: 36,
                className: "mx-auto text-muted-foreground/40 mb-3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No application found with this ID." })
          ] })
        ] }) })
      }
    ) }) })
  ] });
}
export {
  AdmissionStatusPage as default
};
