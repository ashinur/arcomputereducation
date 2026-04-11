import { c as createLucideIcon, r as reactExports, h as useComposedRefs, j as jsxRuntimeExports, e as cn, g as useAdminAuth, B as Button, u as ue } from "./index-Djvn3v0p.js";
import { B as Badge } from "./badge-CuiB0NEK.js";
import { C as Card, b as CardHeader, a as CardContent } from "./card-BYxng7tC.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BJTLfEvh.js";
import { I as Input } from "./input-CE9166TT.js";
import { L as Label } from "./label-BYwFRBM8.js";
import { u as usePrevious, e as useSize, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DCTVpo5b.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { u as useControllableState, P as Primitive, c as composeEventHandlers, a as createContextScope } from "./Combination-CAZ7bin_.js";
import { l as useAdminListStudents, p as useAdminCreateStudent, q as useAdminUpdateStudent, r as useAdminDeleteStudent, A as AttendanceStatus, s as useAdminGetStudentAttendance, t as useAdminMarkAttendance } from "./useBackend-CWemGVNS.js";
import { C as COURSE_LIST } from "./index-DBzDkiVo.js";
import { P as Plus } from "./plus-BkXBaNkL.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
import { S as Search } from "./search-BUBdze-y.js";
import { U as User } from "./user-BK063M04.js";
import { T as Trash2 } from "./trash-2-DKiTmS7B.js";
import { C as CalendarCheck } from "./calendar-check-DdII1gCp.js";
import { C as CircleCheckBig } from "./circle-check-big-CeE4cJRx.js";
import { C as CircleX } from "./circle-x-CdT5OaaX.js";
import { C as CalendarDays } from "./calendar-days-CDnatwL0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
const EMPTY_CREATE = {
  name: "",
  email: "",
  phone: "",
  courseId: "",
  username: "",
  password: ""
};
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Student" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
      "Are you sure you want to delete",
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
          "data-ocid": "confirm-delete-btn",
          children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }) : null,
            "Delete"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1", onClick: onCancel, children: "Cancel" })
    ] })
  ] }) });
}
function AttendancePanel({
  student,
  loginId,
  password
}) {
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [markStatus, setMarkStatus] = reactExports.useState(
    AttendanceStatus.present
  );
  const { data: records, isLoading } = useAdminGetStudentAttendance(
    loginId,
    password,
    student.id
  );
  const markMutation = useAdminMarkAttendance(loginId, password);
  const summary = {
    total: (records == null ? void 0 : records.length) ?? 0,
    present: (records == null ? void 0 : records.filter((r) => r.status === AttendanceStatus.present).length) ?? 0,
    late: (records == null ? void 0 : records.filter((r) => r.status === AttendanceStatus.late).length) ?? 0,
    absent: (records == null ? void 0 : records.filter((r) => r.status === AttendanceStatus.absent).length) ?? 0
  };
  const handleMark = async () => {
    try {
      await markMutation.mutateAsync({
        studentId: student.id,
        date,
        status: markStatus
      });
      ue.success("Attendance marked successfully.");
    } catch {
      ue.error("Failed to mark attendance.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [
      { label: "Total", value: summary.total, color: "text-foreground" },
      { label: "Present", value: summary.present, color: "text-green-600" },
      { label: "Late", value: summary.late, color: "text-yellow-600" },
      { label: "Absent", value: summary.absent, color: "text-red-600" }
    ].map(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center p-2 rounded-lg border border-border bg-muted/30",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `font-bold text-lg ${color}`, children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label })
        ]
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Mark Attendance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: date,
            onChange: (e) => setDate(e.target.value),
            className: "flex-1 text-sm",
            "data-ocid": "attendance-date-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: markStatus, onValueChange: setMarkStatus, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "w-32",
              "data-ocid": "attendance-status-select",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: AttendanceStatus.present, children: "Present" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: AttendanceStatus.late, children: "Late" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: AttendanceStatus.absent, children: "Absent" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "w-full gap-1.5",
          onClick: handleMark,
          disabled: markMutation.isPending,
          "data-ocid": "mark-attendance-btn",
          children: [
            markMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 13, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { size: 13 }),
            "Mark Attendance"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full" }) : records && records.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-36 overflow-y-auto space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: "Recent Records" }),
      records.slice().reverse().slice(0, 10).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between text-xs py-1 border-b border-border last:border-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: r.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: r.status === AttendanceStatus.present ? "text-green-600 font-medium" : r.status === AttendanceStatus.late ? "text-yellow-600 font-medium" : "text-red-600 font-medium",
                children: [
                  r.status === AttendanceStatus.present && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 10, className: "inline mr-1" }),
                  r.status === AttendanceStatus.absent && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 10, className: "inline mr-1" }),
                  r.status === AttendanceStatus.late && /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 10, className: "inline mr-1" }),
                  r.status
                ]
              }
            )
          ]
        },
        r.id.toString()
      ))
    ] }) : null
  ] });
}
function StudentRow({
  student,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "border-b border-border hover:bg-muted/30 transition-colors",
      "data-ocid": `student-row-${student.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm text-foreground", children: student.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: student.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-foreground font-mono", children: student.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-foreground", children: student.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-sm text-foreground", children: student.courseId.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            className: student.enrolled ? "bg-green-100 text-green-700 border border-green-200" : "bg-yellow-100 text-yellow-700 border border-yellow-200",
            children: student.enrolled ? "Enrolled" : "Pending"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => onEdit(student),
              className: "gap-1.5",
              "data-ocid": `edit-student-${student.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 12 }),
                " Edit"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => onDelete(student),
              className: "text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5",
              "data-ocid": `delete-student-${student.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }),
                " Delete"
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
function AdminStudentsPage() {
  const { admin } = useAdminAuth();
  const loginId = (admin == null ? void 0 : admin.loginId) ?? "";
  const password = (admin == null ? void 0 : admin.password) ?? "";
  const { data: students, isLoading } = useAdminListStudents(loginId, password);
  const createMutation = useAdminCreateStudent(loginId, password);
  const updateMutation = useAdminUpdateStudent(loginId, password);
  const deleteMutation = useAdminDeleteStudent(loginId, password);
  const [search, setSearch] = reactExports.useState("");
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [editStudent, setEditStudent] = reactExports.useState(null);
  const [editTab, setEditTab] = reactExports.useState("details");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [newForm, setNewForm] = reactExports.useState(EMPTY_CREATE);
  const [editForm, setEditForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    courseId: "",
    enrolled: false,
    username: ""
  });
  const filtered = (students == null ? void 0 : students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.username.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
  )) ?? [];
  reactExports.useEffect(() => {
    if (editStudent) {
      setEditTab("details");
      setEditForm({
        name: editStudent.name,
        email: editStudent.email,
        phone: editStudent.phone,
        courseId: editStudent.courseId,
        enrolled: editStudent.enrolled,
        username: editStudent.username
      });
    }
  }, [editStudent]);
  const handleNameChange = (name) => {
    const suggested = name.toLowerCase().replace(/\s+/g, ".").replace(/[^a-z0-9.]/g, "");
    setNewForm((f) => ({
      ...f,
      name,
      username: f.username === "" || f.username === suggestedFrom(f.name) ? suggested : f.username
    }));
  };
  function suggestedFrom(name) {
    return name.toLowerCase().replace(/\s+/g, ".").replace(/[^a-z0-9.]/g, "");
  }
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newForm.name || !newForm.email || !newForm.phone || !newForm.courseId || !newForm.username || !newForm.password) {
      ue.error("Fill in all required fields.");
      return;
    }
    try {
      await createMutation.mutateAsync({
        name: newForm.name,
        email: newForm.email,
        phone: newForm.phone,
        courseId: newForm.courseId,
        username: newForm.username,
        password: newForm.password
      });
      ue.success("Student account created successfully.");
      setCreateOpen(false);
      setNewForm(EMPTY_CREATE);
    } catch {
      ue.error("Failed to create student account.");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editStudent) return;
    try {
      await updateMutation.mutateAsync({
        id: editStudent.id,
        input: {
          name: editForm.name || void 0,
          email: editForm.email || void 0,
          phone: editForm.phone || void 0,
          courseId: editForm.courseId || void 0,
          enrolled: editForm.enrolled
        }
      });
      ue.success("Student updated successfully.");
      setEditStudent(null);
    } catch {
      ue.error("Failed to update student.");
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      ue.success(`${deleteTarget.name} deleted.`);
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete student.");
    }
  };
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Manage student accounts and enrollment" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", "data-ocid": "create-student-btn", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
          " Create Student"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Create Student Account" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "space-y-3 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Full name",
                    value: newForm.name,
                    onChange: (e) => handleNameChange(e.target.value),
                    className: "mt-1",
                    "data-ocid": "create-name-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "+91 XXXXX",
                    value: newForm.phone,
                    onChange: (e) => setNewForm((f) => ({ ...f, phone: e.target.value })),
                    className: "mt-1",
                    "data-ocid": "create-phone-input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "email",
                  placeholder: "student@email.com",
                  value: newForm.email,
                  onChange: (e) => setNewForm((f) => ({ ...f, email: e.target.value })),
                  className: "mt-1",
                  "data-ocid": "create-email-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Course *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: newForm.courseId,
                  onValueChange: (v) => setNewForm((f) => ({ ...f, courseId: v })),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "mt-1",
                        "data-ocid": "create-course-select",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select course" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COURSE_LIST.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id, children: [
                      c.name,
                      " — ",
                      c.fullName
                    ] }, c.id)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Username *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "Username",
                    value: newForm.username,
                    onChange: (e) => setNewForm((f) => ({ ...f, username: e.target.value })),
                    className: "mt-1",
                    "data-ocid": "create-username-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Auto-suggested from name" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "password",
                    placeholder: "Password",
                    value: newForm.password,
                    onChange: (e) => setNewForm((f) => ({ ...f, password: e.target.value })),
                    className: "mt-1",
                    "data-ocid": "create-password-input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                disabled: createMutation.isPending,
                "data-ocid": "create-student-submit",
                children: createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
                  " ",
                  "Creating..."
                ] }) : "Create Account"
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Search,
            {
              size: 14,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search students...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "student-search"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          filtered.length,
          " students"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, k)) }) : filtered.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Student" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-medium", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StudentRow,
          {
            student: s,
            onEdit: setEditStudent,
            onDelete: setDeleteTarget
          },
          s.id.toString()
        )) })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          User,
          {
            size: 36,
            className: "mx-auto text-muted-foreground/30 mb-3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: search ? "No students match your search." : "No students yet. Create the first account." })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: !!editStudent,
        onOpenChange: (o) => !o && setEditStudent(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Student" }) }),
          editStudent && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-border rounded-lg overflow-hidden mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setEditTab("details"),
                  className: `flex-1 py-2 text-sm font-medium transition-colors ${editTab === "details" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": "edit-tab-details",
                  children: "Details"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setEditTab("attendance"),
                  className: `flex-1 py-2 text-sm font-medium transition-colors ${editTab === "attendance" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`,
                  "data-ocid": "edit-tab-attendance",
                  children: "Attendance"
                }
              )
            ] }),
            editTab === "details" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdate, className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-3 text-sm flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  User,
                  {
                    size: 14,
                    className: "text-muted-foreground shrink-0"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                  "ID #",
                  editStudent.id.toString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "· @",
                  editStudent.username
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: editForm.name,
                      onChange: (e) => setEditForm((f) => ({ ...f, name: e.target.value })),
                      className: "mt-1",
                      "data-ocid": "edit-name-input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      value: editForm.phone,
                      onChange: (e) => setEditForm((f) => ({ ...f, phone: e.target.value })),
                      className: "mt-1",
                      "data-ocid": "edit-phone-input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "email",
                    value: editForm.email,
                    onChange: (e) => setEditForm((f) => ({ ...f, email: e.target.value })),
                    className: "mt-1",
                    "data-ocid": "edit-email-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Course" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: editForm.courseId,
                    onValueChange: (v) => setEditForm((f) => ({ ...f, courseId: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "mt-1",
                          "data-ocid": "edit-course-select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select course" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COURSE_LIST.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c.id, children: [
                        c.name,
                        " — ",
                        c.fullName
                      ] }, c.id)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border border-border bg-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Enrollment Status" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Mark student as enrolled" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    checked: editForm.enrolled,
                    onCheckedChange: (v) => setEditForm((f) => ({ ...f, enrolled: v })),
                    "data-ocid": "edit-enrolled-toggle"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "flex-1",
                    disabled: updateMutation.isPending,
                    "data-ocid": "edit-student-submit",
                    children: updateMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
                      " ",
                      "Saving..."
                    ] }) : "Save Changes"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: () => setEditStudent(null),
                    children: "Cancel"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              AttendancePanel,
              {
                student: editStudent,
                loginId,
                password
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  AdminStudentsPage as default
};
