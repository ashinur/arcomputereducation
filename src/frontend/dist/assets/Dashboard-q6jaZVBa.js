import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, d as useStudentAuth, b as useNavigate, B as Button, f as LogOut, u as ue } from "./index-Djvn3v0p.js";
import { B as Badge } from "./badge-CuiB0NEK.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BYxng7tC.js";
import { P as Primitive, L as Label } from "./label-BYwFRBM8.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { T as Textarea } from "./textarea-DP3vurDj.js";
import { e as useStudentDashboard, f as useStudentCertificates, a as useListNotices, g as useUploadProfilePicture, h as useGetMyAttendance, i as useGetMyLeaveRequests, j as useRequestLeave, A as AttendanceStatus, L as LeaveStatus } from "./useBackend-CWemGVNS.js";
import { C as COURSE_LIST } from "./index-DBzDkiVo.js";
import { U as User } from "./user-BK063M04.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { B as BookOpen } from "./book-open-CzwE2F5s.js";
import { A as Award } from "./award-CCVjlD58.js";
import { D as Download } from "./download-BCNFK0Sr.js";
import { C as CircleCheck } from "./circle-check-BSX8Vef3.js";
import { C as CircleX } from "./circle-x-CdT5OaaX.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function formatDate(ts) {
  return new Date(Number(ts) / 1e6).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function getCourseFullName(courseId) {
  const found = COURSE_LIST.find((c) => c.id === courseId);
  return found ? found.fullName : courseId;
}
function SectionHeader({
  icon: Icon,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: "text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: title })
  ] });
}
function StatusBadge({ enrolled }) {
  return enrolled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: "bg-primary/10 text-primary border-primary/30 font-medium",
      children: "Approved & Enrolled"
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: "bg-accent/15 text-accent border-accent/30 font-medium",
      children: "Pending Review"
    }
  );
}
function LeaveStatusBadge({ status }) {
  if (status === LeaveStatus.approved)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-green-50 text-green-700 border-green-200 text-xs",
        children: "Approved"
      }
    );
  if (status === LeaveStatus.rejected)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-destructive/10 text-destructive border-destructive/20 text-xs",
        children: "Rejected"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: "bg-accent/10 text-accent border-accent/20 text-xs",
      children: "Pending"
    }
  );
}
function AttendanceStatusIcon({ status }) {
  if (status === AttendanceStatus.present)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 15, className: "text-green-600 shrink-0" });
  if (status === AttendanceStatus.late)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { size: 15, className: "text-accent shrink-0" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 15, className: "text-destructive shrink-0" });
}
function ProfilePictureSection({
  studentId,
  currentPicture
}) {
  const fileRef = reactExports.useRef(null);
  const [preview, setPreview] = reactExports.useState(null);
  const uploadMutation = useUploadProfilePicture(studentId);
  const handleFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      const base64 = (_a2 = ev.target) == null ? void 0 : _a2.result;
      setPreview(base64);
      uploadMutation.mutate(base64, {
        onSuccess: () => ue.success("Profile picture updated!"),
        onError: () => ue.error("Failed to update profile picture.")
      });
    };
    reader.readAsDataURL(file);
  };
  const displayImage = preview ?? currentPicture;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 bg-muted flex items-center justify-center", children: displayImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: displayImage,
          alt: "Profile",
          className: "w-full h-full object-cover"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 36, className: "text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a;
            return (_a = fileRef.current) == null ? void 0 : _a.click();
          },
          className: "absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors",
          "aria-label": "Upload profile picture",
          "data-ocid": "profile-pic-upload-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFileChange,
        "data-ocid": "profile-pic-input"
      }
    ),
    uploadMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground animate-pulse", children: "Uploading…" })
  ] });
}
function AttendanceSection({ studentId }) {
  const { data, isLoading } = useGetMyAttendance(studentId);
  const records = (data == null ? void 0 : data.records) ?? [];
  const summary = (data == null ? void 0 : data.summary) ?? {
    total: 0n,
    present: 0n,
    late: 0n,
    absent: 0n
  };
  const totalNum = Number(summary.total);
  const presentNum = Number(summary.present);
  const lateNum = Number(summary.late);
  const absentNum = Number(summary.absent);
  const attendancePct = totalNum > 0 ? Math.round((presentNum + lateNum) / totalNum * 100) : 0;
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 30);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full rounded-lg" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        "data-ocid": "attendance-summary",
        children: [
          { label: "Total Days", value: totalNum, color: "text-foreground" },
          { label: "Present", value: presentNum, color: "text-green-600" },
          { label: "Late", value: lateNum, color: "text-accent" },
          { label: "Absent", value: absentNum, color: "text-destructive" }
        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-muted/50 rounded-lg p-3 text-center border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold font-display ${item.color}`, children: item.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: item.label })
            ]
          },
          item.label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Attendance Rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: attendancePct >= 75 ? "text-green-600 font-medium" : "text-destructive font-medium",
            children: [
              attendancePct,
              "%"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-full rounded-full transition-all duration-700 ${attendancePct >= 75 ? "bg-green-500" : "bg-destructive"}`,
          style: { width: `${attendancePct}%` }
        }
      ) }),
      attendancePct < 75 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "⚠ Below 75% — please attend regularly." })
    ] }),
    sorted.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-border rounded-lg overflow-hidden",
        "data-ocid": "attendance-records",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 bg-muted/60 px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border max-h-60 overflow-y-auto", children: sorted.map((rec) => {
            const d = new Date(rec.date);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "grid grid-cols-3 px-4 py-2.5 items-center text-sm",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: d.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "2-digit"
                  }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: d.toLocaleDateString("en-IN", { weekday: "short" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceStatusIcon, { status: rec.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-xs text-muted-foreground", children: rec.status })
                  ] })
                ]
              },
              rec.id.toString()
            );
          }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-6 text-muted-foreground",
        "data-ocid": "attendance-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 28, className: "mx-auto mb-2 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No attendance records yet." })
        ]
      }
    )
  ] });
}
function LeaveSection({ studentId }) {
  const { data: leaves = [], isLoading } = useGetMyLeaveRequests(studentId);
  const requestLeave = useRequestLeave(studentId);
  const [startDate, setStartDate] = reactExports.useState("");
  const [endDate, setEndDate] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [showForm, setShowForm] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      ue.error("Please fill in all fields.");
      return;
    }
    if (endDate < startDate) {
      ue.error("End date must be after start date.");
      return;
    }
    requestLeave.mutate(
      { startDate, endDate, reason: reason.trim() },
      {
        onSuccess: () => {
          ue.success("Leave request submitted!");
          setStartDate("");
          setEndDate("");
          setReason("");
          setShowForm(false);
        },
        onError: () => ue.error("Failed to submit leave request.")
      }
    );
  };
  const sorted = [...leaves].sort(
    (a, b) => Number(b.submittedAt) - Number(a.submittedAt)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: leaves.length === 0 ? "No leave requests yet." : `${leaves.length} request(s)` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: showForm ? "outline" : "default",
          onClick: () => setShowForm((v) => !v),
          "data-ocid": "leave-apply-btn",
          children: showForm ? "Cancel" : "Apply for Leave"
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.form,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2 },
        onSubmit: handleSubmit,
        className: "bg-muted/40 border border-border rounded-lg p-4 space-y-3",
        "data-ocid": "leave-form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "leave-start", className: "text-xs font-medium", children: "Start Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "leave-start",
                  type: "date",
                  value: startDate,
                  onChange: (e) => setStartDate(e.target.value),
                  className: "w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "leave-start-date"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "leave-end", className: "text-xs font-medium", children: "End Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "leave-end",
                  type: "date",
                  value: endDate,
                  onChange: (e) => setEndDate(e.target.value),
                  className: "w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring",
                  "data-ocid": "leave-end-date"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "leave-reason", className: "text-xs font-medium", children: "Reason" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "leave-reason",
                placeholder: "Please describe your reason for leave…",
                value: reason,
                onChange: (e) => setReason(e.target.value),
                rows: 3,
                className: "text-sm resize-none",
                "data-ocid": "leave-reason"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "sm",
              disabled: requestLeave.isPending,
              "data-ocid": "leave-submit-btn",
              children: requestLeave.isPending ? "Submitting…" : "Submit Request"
            }
          )
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, i)) }) : sorted.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "leave-list", children: sorted.map((leave) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-border rounded-lg p-3 bg-background space-y-1",
        "data-ocid": `leave-row-${leave.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
              leave.startDate,
              " → ",
              leave.endDate
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LeaveStatusBadge, { status: leave.leaveStatus })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: leave.reason }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70", children: [
            "Applied: ",
            formatDate(leave.submittedAt),
            leave.respondedAt ? ` · Responded: ${formatDate(leave.respondedAt)}` : ""
          ] })
        ]
      },
      leave.id.toString()
    )) }) : !showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-6 text-muted-foreground",
        "data-ocid": "leave-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { size: 28, className: "mx-auto mb-2 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No leave requests submitted." })
        ]
      }
    )
  ] });
}
function downloadCertificate(certCode, studentName, courseName, issuedAt) {
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
<script>window.onload=()=>window.print()<\/script>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `certificate-${certCode}.html`;
  a.click();
  URL.revokeObjectURL(url);
  ue.success("Certificate downloaded!");
}
function StudentDashboardPage() {
  var _a;
  const { student, clearStudent } = useStudentAuth();
  const navigate = useNavigate();
  const studentId = student == null ? void 0 : student.studentId;
  const { data: profile, isLoading: profileLoading } = useStudentDashboard(studentId);
  const { data: certificates = [], isLoading: certsLoading } = useStudentCertificates(studentId);
  const { data: allNotices = [], isLoading: noticesLoading } = useListNotices();
  const notices = allNotices.slice(0, 5);
  const handleLogout = () => {
    clearStudent();
    ue.success("Logged out successfully.");
    navigate({ to: "/student/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-sm sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 bg-muted flex items-center justify-center shrink-0", children: (profile == null ? void 0 : profile.profilePicture) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: profile.profilePicture,
            alt: "Profile",
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground leading-tight truncate", children: (student == null ? void 0 : student.name) ?? "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "@",
            student == null ? void 0 : student.username
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleLogout,
          className: "gap-2 shrink-0",
          "data-ocid": "student-logout",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 15 }),
            "Logout"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-6 space-y-5 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/20 bg-primary/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-xl text-foreground", children: [
              "Welcome back, ",
              ((_a = student == null ? void 0 : student.name) == null ? void 0 : _a.split(" ")[0]) ?? "Student",
              "! 👋"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Track your courses, attendance, leave, certificates, and institute notices below." })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.04 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "student-profile-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: User, title: "My Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6", children: [
              studentId !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ProfilePictureSection,
                {
                  studentId,
                  currentPicture: profile == null ? void 0 : profile.profilePicture
                }
              ),
              profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-2 w-full", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }, i)) }) : profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2 text-sm w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileRow, { label: "Name", value: profile.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileRow, { label: "Email", value: profile.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileRow, { label: "Phone", value: profile.phone }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ProfileRow,
                  {
                    label: "Course",
                    value: getCourseFullName(profile.courseId)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { enrolled: profile.enrolled }) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No profile data available." })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 0.08 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full", "data-ocid": "student-course-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "sr-only", children: "My Course" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: BookOpen, title: "My Course" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "-mt-3", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
              ] }) : profile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base leading-snug", children: getCourseFullName(profile.courseId) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: profile.enrolled ? "bg-primary/10 text-primary border-primary/30" : "bg-muted text-muted-foreground",
                    children: profile.enrolled ? "Enrolled" : "Not Yet Enrolled"
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No course data available." }) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 0.1 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "h-full", "data-ocid": "student-application-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "sr-only", children: "Application Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SectionHeader,
                  {
                    icon: ClipboardList,
                    title: "Application Status"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "-mt-3", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
              ] }) : (profile == null ? void 0 : profile.applicationId) !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { enrolled: profile.enrolled }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Application ID: #",
                  profile.applicationId.toString()
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "student-no-application", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No application submitted yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => navigate({ to: "/admission" }),
                    children: "Apply for Admission"
                  }
                )
              ] }) })
            ] })
          }
        )
      ] }),
      studentId !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.12 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "student-attendance-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Calendar, title: "My Attendance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AttendanceSection, { studentId })
          ] }) })
        }
      ),
      studentId !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.14 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "student-leave-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: CalendarClock, title: "Leave Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LeaveSection, { studentId })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.16 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "student-certificates-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Award, title: "My Certificates" }),
            certsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-lg" }, i)) }) : certificates.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: certificates.map((cert, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -10 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.16 + idx * 0.07 },
                className: "flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border",
                "data-ocid": `cert-row-${cert.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground truncate", children: cert.courseName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Code: ",
                      cert.certificateCode,
                      " · Issued:",
                      " ",
                      formatDate(cert.issuedAt)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "shrink-0 ml-3 gap-1.5",
                      onClick: () => downloadCertificate(
                        cert.certificateCode,
                        cert.studentName,
                        cert.courseName,
                        cert.issuedAt
                      ),
                      "data-ocid": `cert-download-${cert.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 13 }),
                        "Download"
                      ]
                    }
                  )
                ]
              },
              cert.id.toString()
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 text-muted-foreground",
                "data-ocid": "student-no-certs",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 32, className: "mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No certificates issued yet." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1", children: "Complete your course to receive your certificate." })
                ]
              }
            )
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.18 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "student-notices-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { icon: Megaphone, title: "Latest Notices" }),
            noticesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" })
            ] }, i)) }) : notices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: notices.map((notice, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `notice-row-${notice.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground leading-snug", children: notice.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatDate(notice.postedAt) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-3", children: notice.content })
                  ] }),
                  idx < notices.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {})
                ]
              },
              notice.id.toString()
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "text-center py-8 text-muted-foreground",
                "data-ocid": "student-no-notices",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { size: 32, className: "mx-auto mb-2 opacity-30" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No notices posted yet." })
                ]
              }
            )
          ] }) })
        }
      )
    ] })
  ] });
}
function ProfileRow({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground w-16 shrink-0 text-xs pt-0.5", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium break-words min-w-0", children: value })
  ] });
}
export {
  StudentDashboardPage as default
};
