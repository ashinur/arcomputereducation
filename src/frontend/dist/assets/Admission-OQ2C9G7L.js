import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, u as ue, X } from "./index-Djvn3v0p.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BYxng7tC.js";
import { I as Input } from "./input-CE9166TT.js";
import { L as Label } from "./label-BYwFRBM8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DCTVpo5b.js";
import { u as useListCourses, b as useSubmitApplication, E as ExternalBlob } from "./useBackend-CWemGVNS.js";
import { C as COURSE_LIST } from "./index-DBzDkiVo.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { C as CircleCheckBig } from "./circle-check-big-CeE4cJRx.js";
import { U as User } from "./user-BK063M04.js";
import { C as CircleAlert } from "./circle-alert-CDQ6zKhW.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
import "./Combination-CAZ7bin_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function FileUploadField({
  label,
  accept = "image/*,.pdf",
  required,
  onChange,
  dataOcid
}) {
  const [fileName, setFileName] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const uid = label.replace(/\s+/g, "-").toLowerCase();
  const handleChange = (e) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) ?? null;
    setFileName((file == null ? void 0 : file.name) ?? null);
    onChange(file);
  };
  const handleClear = (e) => {
    e.preventDefault();
    setFileName(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor: uid,
        className: "text-sm font-medium mb-1.5 block cursor-pointer",
        children: [
          label,
          " ",
          required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors group",
        "data-ocid": dataOcid,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              id: uid,
              type: "file",
              accept,
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
              onChange: handleChange
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors", children: fileName ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 16, className: "text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 16, className: "text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1", children: fileName ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: fileName }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Click to upload",
              " ",
              accept.includes("image") && !accept.includes(".pdf") ? "image" : "image or PDF"
            ] }) })
          ] }),
          fileName && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleClear,
              className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors pointer-events-auto z-10",
              "aria-label": "Remove file",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "text-muted-foreground" })
            }
          )
        ]
      }
    )
  ] });
}
function AdmissionPage() {
  const { data: courses } = useListCourses();
  const submitMutation = useSubmitApplication();
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [applicationId, setApplicationId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    courseId: new URLSearchParams(window.location.search).get("course") ?? ""
  });
  const [files, setFiles] = reactExports.useState({
    photo: null,
    aadhaar: null,
    marksheet10: null,
    marksheet12: null,
    passCertificate: null
  });
  const courseOptions = courses && courses.length > 0 ? courses : COURSE_LIST.map((c) => ({
    id: c.id,
    name: c.fullName,
    description: "",
    durationMonths: BigInt(c.duration)
  }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.courseId || !form.gender) {
      ue.error("Please fill in all required fields.");
      return;
    }
    if (!files.photo) {
      ue.error("Please upload your passport photo.");
      return;
    }
    if (!files.aadhaar) {
      ue.error("Please upload your Aadhaar card.");
      return;
    }
    try {
      const buildBlob = async (file) => {
        if (!file) return void 0;
        const buf = await file.arrayBuffer();
        return ExternalBlob.fromBytes(new Uint8Array(buf));
      };
      const finalInput = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        courseId: form.courseId,
        photo: await buildBlob(files.photo),
        aadhaar: await buildBlob(files.aadhaar),
        marksheet10: await buildBlob(files.marksheet10),
        marksheet12: await buildBlob(files.marksheet12),
        passCertificate: await buildBlob(files.passCertificate)
      };
      const result = await submitMutation.mutateAsync(finalInput);
      setApplicationId(result.id);
      setSubmitted(true);
      ue.success("Application submitted successfully!");
    } catch {
      ue.error("Failed to submit application. Please try again.");
    }
  };
  if (submitted && applicationId !== null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-16 max-w-lg text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 40, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-3", children: "Application Submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Your admission application has been received. Your application ID is:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-muted/50 rounded-xl px-6 py-4 mb-6 font-mono text-2xl font-bold text-primary",
              "data-ocid": "application-id",
              children: [
                "#",
                applicationId.toString()
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Save this ID to track your application status. Our team will review it within 1–3 business days." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admission/status", children: "Track Status" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: () => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    fatherName: "",
                    dob: "",
                    gender: "",
                    email: "",
                    phone: "",
                    address: "",
                    courseId: ""
                  });
                },
                children: "New Application"
              }
            )
          ] })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl text-foreground mb-3", children: "Admission Application" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Fill in your details and upload the required documents to apply for admission at AR Computer Education." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-6",
        "data-ocid": "admission-form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-xl flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18, className: "text-primary" }),
              "Personal Information"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "name", children: [
                    "Full Name ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "name",
                      placeholder: "Enter your full name",
                      value: form.name,
                      onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                      className: "mt-1.5",
                      required: true,
                      "data-ocid": "admission-name"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fatherName", children: "Father's Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "fatherName",
                      placeholder: "Enter father's full name",
                      value: form.fatherName,
                      onChange: (e) => setForm((f) => ({ ...f, fatherName: e.target.value })),
                      className: "mt-1.5",
                      "data-ocid": "admission-father-name"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dob", children: "Date of Birth" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "dob",
                      type: "date",
                      value: form.dob,
                      onChange: (e) => setForm((f) => ({ ...f, dob: e.target.value })),
                      className: "mt-1.5",
                      "data-ocid": "admission-dob"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "gender", children: [
                    "Gender ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.gender,
                      onValueChange: (v) => setForm((f) => ({ ...f, gender: v })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "mt-1.5",
                            "data-ocid": "admission-gender-select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "male", children: "Male" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "female", children: "Female" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
                        ] })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "phone", children: [
                    "Phone Number ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "phone",
                      placeholder: "+91 XXXXX XXXXX",
                      value: form.phone,
                      onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value })),
                      className: "mt-1.5",
                      required: true,
                      "data-ocid": "admission-phone"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "email", children: [
                    "Email Address ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      placeholder: "your@email.com",
                      value: form.email,
                      onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                      className: "mt-1.5",
                      required: true,
                      "data-ocid": "admission-email"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "address", children: "Residential Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "address",
                    placeholder: "Enter your full residential address",
                    value: form.address,
                    onChange: (e) => setForm((f) => ({ ...f, address: e.target.value })),
                    className: "mt-1.5",
                    "data-ocid": "admission-address"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "course", children: [
                  "Course ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: form.courseId,
                    onValueChange: (v) => setForm((f) => ({ ...f, courseId: v })),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "mt-1.5",
                          "data-ocid": "admission-course-select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a course" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: courseOptions.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectItem,
                        {
                          value: c.id,
                          "data-ocid": `course-option-${c.id}`,
                          children: c.name
                        },
                        c.id
                      )) })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border shadow-subtle", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "font-display text-xl flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 18, className: "text-primary" }),
              "Required Documents"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileUploadField,
                  {
                    label: "Passport Photo",
                    required: true,
                    onChange: (f) => setFiles((prev) => ({ ...prev, photo: f })),
                    accept: "image/*",
                    dataOcid: "upload-photo"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileUploadField,
                  {
                    label: "Aadhaar Card",
                    required: true,
                    onChange: (f) => setFiles((prev) => ({ ...prev, aadhaar: f })),
                    accept: "image/*,.pdf",
                    dataOcid: "upload-aadhaar"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileUploadField,
                  {
                    label: "10th Marksheet",
                    onChange: (f) => setFiles((prev) => ({ ...prev, marksheet10: f })),
                    accept: "image/*,.pdf",
                    dataOcid: "upload-marksheet10"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  FileUploadField,
                  {
                    label: "12th Marksheet",
                    onChange: (f) => setFiles((prev) => ({ ...prev, marksheet12: f })),
                    accept: "image/*,.pdf",
                    dataOcid: "upload-marksheet12"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FileUploadField,
                {
                  label: "Pass Certificate",
                  onChange: (f) => setFiles((prev) => ({ ...prev, passCertificate: f })),
                  accept: "image/*,.pdf",
                  dataOcid: "upload-pass-cert"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/50 rounded-lg p-4 flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleAlert,
                  {
                    size: 16,
                    className: "text-muted-foreground shrink-0 mt-0.5"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Photo and Aadhaar card are mandatory. All documents will be reviewed by our admin team. Ensure images are clear and readable. Accepted formats: JPG, PNG, PDF (max 5MB each)." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              size: "lg",
              className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold",
              disabled: submitMutation.isPending,
              "data-ocid": "admission-submit",
              children: submitMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin mr-2" }),
                "Submitting Application..."
              ] }) : "Submit Application"
            }
          )
        ]
      }
    ) }) })
  ] });
}
export {
  AdmissionPage as default
};
