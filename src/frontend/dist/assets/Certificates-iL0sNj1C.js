import { g as useAdminAuth, r as reactExports, j as jsxRuntimeExports, B as Button, u as ue } from "./index-Djvn3v0p.js";
import { C as Card, a as CardContent } from "./card-BYxng7tC.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BJTLfEvh.js";
import { L as Label } from "./label-BYwFRBM8.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DCTVpo5b.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { n as useAdminListCertificates, l as useAdminListStudents, x as useAdminIssueCertificate, y as useAdminDeleteCertificate } from "./useBackend-CWemGVNS.js";
import { P as Plus } from "./plus-BkXBaNkL.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { A as Award } from "./award-CCVjlD58.js";
import { L as LoaderCircle } from "./loader-circle-CQN-IIdU.js";
import { P as Printer } from "./printer-CKcEtZTM.js";
import { D as Download } from "./download-BCNFK0Sr.js";
import { T as Trash2 } from "./trash-2-DKiTmS7B.js";
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
  certName,
  onConfirm,
  onCancel,
  isLoading
}) {
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border shadow-elevated p-6 max-w-sm w-full mx-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 18, className: "text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground", children: "Delete Certificate" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
      "Are you sure you want to delete the certificate for",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: certName }),
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
          "data-ocid": "confirm-delete-cert-btn",
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
function CertificatePrintView({ cert }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        width: "740px",
        minHeight: "520px",
        padding: "48px",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        color: "#fff",
        fontFamily: "Georgia, serif",
        position: "relative",
        borderRadius: "12px",
        boxSizing: "border-box"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 16,
              left: 16,
              width: 40,
              height: 40,
              borderTop: "3px solid #d4af37",
              borderLeft: "3px solid #d4af37"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              borderTop: "3px solid #d4af37",
              borderRight: "3px solid #d4af37"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 16,
              left: 16,
              width: 40,
              height: 40,
              borderBottom: "3px solid #d4af37",
              borderLeft: "3px solid #d4af37"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 16,
              right: 16,
              width: 40,
              height: 40,
              borderBottom: "3px solid #d4af37",
              borderRight: "3px solid #d4af37"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 32 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 13,
                letterSpacing: 4,
                color: "#d4af37",
                textTransform: "uppercase",
                marginBottom: 8
              },
              children: "AR Computer Education"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", letterSpacing: 2 }, children: "Kodaldhowa, Fakiragram, Kokrajhar — 783345" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 28,
                fontWeight: "bold",
                letterSpacing: 3,
                color: "#d4af37",
                textTransform: "uppercase"
              },
              children: "Certificate of Completion"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                width: 120,
                height: 2,
                background: "#d4af37",
                margin: "12px auto 0"
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: 28, lineHeight: 1.8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 14, color: "#cbd5e1", marginBottom: 8 }, children: "This is to certify that" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                fontSize: 32,
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: 8
              },
              children: cert.studentName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 14, color: "#cbd5e1", marginBottom: 6 }, children: "has successfully completed the course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 22, fontWeight: "bold", color: "#d4af37" }, children: cert.courseName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 40
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: "Date of Issue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 14, color: "#e2e8f0", fontWeight: "bold" }, children: formatDate(cert.issuedAt) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      width: 120,
                      height: 1,
                      background: "#475569",
                      marginBottom: 8
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8" }, children: "Authorized Signature" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 12, color: "#d4af37", marginTop: 4 }, children: "AR Computer Education" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "right" }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 11, color: "#94a3b8", marginBottom: 2 }, children: "Certificate Code" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: {
                      fontSize: 13,
                      color: "#e2e8f0",
                      fontFamily: "monospace",
                      fontWeight: "bold"
                    },
                    children: cert.certificateCode
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function CertCard({
  cert,
  onPrint,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border bg-card hover:shadow-elevated transition-smooth",
      "data-ocid": `cert-card-${cert.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 16, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-foreground text-sm truncate", children: cert.studentName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: cert.courseName })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground space-y-0.5 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "Code:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium text-foreground", children: cert.certificateCode })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            "Issued: ",
            formatDate(cert.issuedAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "flex-1 gap-1.5 text-xs",
              onClick: () => onPrint(cert),
              "data-ocid": `print-cert-${cert.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 13 }),
                " Print"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "text-destructive hover:text-destructive hover:bg-destructive/10",
              onClick: () => onDelete(cert),
              "data-ocid": `delete-cert-${cert.id}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
            }
          )
        ] })
      ] })
    }
  );
}
function AdminCertificatesPage() {
  const { admin } = useAdminAuth();
  const loginId = (admin == null ? void 0 : admin.loginId) ?? "";
  const password = (admin == null ? void 0 : admin.password) ?? "";
  const { data: certificates, isLoading } = useAdminListCertificates(
    loginId,
    password
  );
  const { data: students } = useAdminListStudents(loginId, password);
  const issueMutation = useAdminIssueCertificate(loginId, password);
  const deleteMutation = useAdminDeleteCertificate(loginId, password);
  const [issueOpen, setIssueOpen] = reactExports.useState(false);
  const [selectedStudentId, setSelectedStudentId] = reactExports.useState("");
  const [printCert, setPrintCert] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const printRef = reactExports.useRef(null);
  const enrolledStudents = (students == null ? void 0 : students.filter((s) => s.enrolled)) ?? [];
  const handleIssue = async (e) => {
    e.preventDefault();
    if (!selectedStudentId) {
      ue.error("Please select a student.");
      return;
    }
    try {
      await issueMutation.mutateAsync(BigInt(selectedStudentId));
      ue.success("Certificate issued successfully.");
      setIssueOpen(false);
      setSelectedStudentId("");
    } catch {
      ue.error("Failed to issue certificate.");
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      ue.success("Certificate deleted.");
      setDeleteTarget(null);
    } catch {
      ue.error("Failed to delete certificate.");
    }
  };
  const triggerPrint = () => {
    if (!printRef.current || !printCert) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate — ${printCert.studentName}</title>
          <style>
            body { margin: 0; padding: 40px; background: #f8fafc; display: flex; justify-content: center; }
            @media print {
              body { padding: 0; background: white; }
              @page { size: A4 landscape; margin: 0; }
            }
          </style>
        </head>
        <body>${printRef.current.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDeleteDialog,
      {
        open: !!deleteTarget,
        certName: (deleteTarget == null ? void 0 : deleteTarget.studentName) ?? "",
        onConfirm: handleDeleteConfirm,
        onCancel: () => setDeleteTarget(null),
        isLoading: deleteMutation.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Certificates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Issue and manage student certificates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => setIssueOpen(true),
          className: "gap-2",
          "data-ocid": "issue-cert-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
            " Issue Certificate"
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, k)) }) : certificates && certificates.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: certificates.map((cert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.07 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          CertCard,
          {
            cert,
            onPrint: setPrintCert,
            onDelete: setDeleteTarget
          }
        )
      },
      cert.id.toString()
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Award,
        {
          size: 40,
          className: "mx-auto text-muted-foreground/30 mb-3"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg text-foreground mb-2", children: "No Certificates Yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Issue certificates to enrolled students." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "mt-2 gap-1.5",
          onClick: () => setIssueOpen(true),
          "data-ocid": "empty-issue-cert-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Issue First Certificate"
          ]
        }
      )
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: issueOpen, onOpenChange: (o) => !o && setIssueOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Issue Certificate" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleIssue, className: "space-y-4 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Select Enrolled Student *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: selectedStudentId,
              onValueChange: setSelectedStudentId,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", "data-ocid": "cert-student-select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Choose a student" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: enrolledStudents.length > 0 ? enrolledStudents.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id.toString(), children: [
                  s.name,
                  " — ",
                  s.courseId.toUpperCase()
                ] }, s.id.toString())) : /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", disabled: true, children: "No enrolled students" }) })
              ]
            }
          ),
          enrolledStudents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Only enrolled students can receive certificates. Go to Students to update enrollment." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full",
            disabled: issueMutation.isPending || enrolledStudents.length === 0,
            "data-ocid": "issue-cert-submit",
            children: issueMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin mr-2" }),
              " Issuing..."
            ] }) : "Issue Certificate"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!printCert, onOpenChange: (o) => !o && setPrintCert(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Certificate Preview" }) }),
      printCert && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: printRef, className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CertificatePrintView, { cert: printCert }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setPrintCert(null), children: "Close" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2",
              onClick: triggerPrint,
              "data-ocid": "print-cert-confirm",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 15 }),
                " Print Certificate"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "gap-2",
              onClick: triggerPrint,
              "data-ocid": "download-cert-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 15 }),
                " Save as PDF"
              ]
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminCertificatesPage as default
};
