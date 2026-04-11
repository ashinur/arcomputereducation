import { c as createLucideIcon, g as useAdminAuth, G as GraduationCap, j as jsxRuntimeExports, L as Link } from "./index-Djvn3v0p.js";
import { B as Badge } from "./badge-CuiB0NEK.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BYxng7tC.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { l as useAdminListStudents, m as useAdminListApplications, n as useAdminListCertificates, a as useListNotices, o as useAdminListLeaveRequests, L as LeaveStatus } from "./useBackend-CWemGVNS.js";
import { A as ApplicationStatus } from "./index-DBzDkiVo.js";
import { F as FileText } from "./file-text-DQvz_Mlk.js";
import { A as Award } from "./award-CCVjlD58.js";
import { B as Bell } from "./bell-Di6Cqm-z.js";
import { C as CalendarCheck } from "./calendar-check-DdII1gCp.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { U as Users, T as TrendingUp } from "./users-ChpGOxpB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
const adminNavItems = [
  {
    href: "/admin/students",
    icon: Users,
    label: "Manage Students",
    description: "Create and update student accounts"
  },
  {
    href: "/admin/applications",
    icon: FileText,
    label: "Applications",
    description: "Review admission applications"
  },
  {
    href: "/admin/certificates",
    icon: Award,
    label: "Certificates",
    description: "Issue and manage certificates"
  },
  {
    href: "/admin/notices",
    icon: Bell,
    label: "Notice Board",
    description: "Post and manage notices"
  },
  {
    href: "/admin/leave",
    icon: CalendarCheck,
    label: "Leave Requests",
    description: "Approve or reject student leave"
  }
];
function AdminDashboardPage() {
  const { admin } = useAdminAuth();
  const loginId = (admin == null ? void 0 : admin.loginId) ?? "";
  const password = (admin == null ? void 0 : admin.password) ?? "";
  const { data: students, isLoading: loadingStudents } = useAdminListStudents(
    loginId,
    password
  );
  const { data: applications, isLoading: loadingApps } = useAdminListApplications(loginId, password);
  const { data: certificates, isLoading: loadingCerts } = useAdminListCertificates(loginId, password);
  const { data: notices, isLoading: loadingNotices } = useListNotices();
  const { data: leaveRequests, isLoading: loadingLeave } = useAdminListLeaveRequests(loginId, password);
  const pendingApps = (applications == null ? void 0 : applications.filter((a) => a.status === ApplicationStatus.pending).length) ?? 0;
  const pendingLeave = (leaveRequests == null ? void 0 : leaveRequests.filter((r) => r.leaveStatus === LeaveStatus.pending).length) ?? 0;
  const stats = [
    {
      label: "Total Students",
      value: (students == null ? void 0 : students.length) ?? 0,
      icon: GraduationCap,
      loading: loadingStudents
    },
    {
      label: "Applications",
      value: (applications == null ? void 0 : applications.length) ?? 0,
      icon: FileText,
      loading: loadingApps,
      badge: pendingApps > 0 ? `${pendingApps} pending` : void 0
    },
    {
      label: "Certificates Issued",
      value: (certificates == null ? void 0 : certificates.length) ?? 0,
      icon: Award,
      loading: loadingCerts
    },
    {
      label: "Notices Posted",
      value: (notices == null ? void 0 : notices.length) ?? 0,
      icon: Bell,
      loading: loadingNotices
    },
    {
      label: "Leave Requests",
      value: (leaveRequests == null ? void 0 : leaveRequests.length) ?? 0,
      icon: CalendarCheck,
      loading: loadingLeave,
      badge: pendingLeave > 0 ? `${pendingLeave} pending` : void 0
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -16 },
        animate: { opacity: 1, x: 0 },
        className: "flex items-center gap-3",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Admin Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "AR Computer Education — Management Panel" })
        ] })
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8", children: stats.map(({ label, value, icon: Icon, loading, badge }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border bg-card",
              "data-ocid": `stat-${label.toLowerCase().replace(/\s+/g, "-")}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }) }),
                  badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs bg-accent/15 text-accent border-accent/30", children: badge })
                ] }),
                loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-12 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-2xl text-foreground", children: value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
              ] })
            }
          )
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground mb-4", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8", children: adminNavItems.map(
        ({ href, icon: Icon, label, description }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.3 + i * 0.07 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: href, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Card,
              {
                className: "border-border bg-card hover:shadow-elevated transition-smooth cursor-pointer group h-full",
                "data-ocid": `admin-nav-${href.split("/").pop()}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground text-sm mb-1 flex items-center gap-1", children: [
                    label,
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronRight,
                      {
                        size: 14,
                        className: "ml-auto text-muted-foreground group-hover:text-foreground transition-colors"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: description })
                ] })
              }
            ) })
          },
          href
        )
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-primary" }),
            " Recent Applications"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin/applications",
              className: "text-xs text-primary hover:underline font-normal",
              children: "View all"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: loadingApps ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["sk1", "sk2", "sk3"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full" }, k)) }) : applications && applications.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: applications.slice(0, 5).map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 py-2 border-b border-border last:border-0",
            "data-ocid": `app-row-${app.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground truncate", children: app.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: app.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: app.status === ApplicationStatus.approved ? "bg-green-100 text-green-700 border-green-200" : app.status === ApplicationStatus.rejected ? "bg-red-100 text-red-700 border-red-200" : "bg-yellow-100 text-yellow-700 border-yellow-200",
                  children: app.status
                }
              )
            ]
          },
          app.id.toString()
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground py-4 text-center", children: "No applications yet." }) })
      ] })
    ] }) })
  ] });
}
export {
  AdminDashboardPage as default
};
