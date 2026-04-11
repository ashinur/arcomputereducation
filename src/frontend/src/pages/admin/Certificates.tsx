import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Award, Download, Loader2, Plus, Printer, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAdminAuth } from "../../hooks/useAuth";
import {
  useAdminDeleteCertificate,
  useAdminIssueCertificate,
  useAdminListCertificates,
  useAdminListStudents,
} from "../../hooks/useBackend";
import type { Certificate, CertificateId, StudentId } from "../../types";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ConfirmDeleteDialog({
  open,
  certName,
  onConfirm,
  onCancel,
  isLoading,
}: {
  open: boolean;
  certName: string;
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
            Delete Certificate
          </h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Are you sure you want to delete the certificate for{" "}
          <span className="font-semibold text-foreground">{certName}</span>?
          This cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onConfirm}
            disabled={isLoading}
            data-ocid="confirm-delete-cert-btn"
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

/** Styled certificate card for printing */
function CertificatePrintView({ cert }: { cert: Certificate }) {
  return (
    <div
      style={{
        width: "740px",
        minHeight: "520px",
        padding: "48px",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        color: "#fff",
        fontFamily: "Georgia, serif",
        position: "relative",
        borderRadius: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* Corner decorations */}
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          width: 40,
          height: 40,
          borderTop: "3px solid #d4af37",
          borderLeft: "3px solid #d4af37",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 40,
          height: 40,
          borderTop: "3px solid #d4af37",
          borderRight: "3px solid #d4af37",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          width: 40,
          height: 40,
          borderBottom: "3px solid #d4af37",
          borderLeft: "3px solid #d4af37",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 40,
          height: 40,
          borderBottom: "3px solid #d4af37",
          borderRight: "3px solid #d4af37",
        }}
      />

      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: 4,
            color: "#d4af37",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          AR Computer Education
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", letterSpacing: 2 }}>
          Kodaldhowa, Fakiragram, Kokrajhar — 783345
        </div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: "bold",
            letterSpacing: 3,
            color: "#d4af37",
            textTransform: "uppercase",
          }}
        >
          Certificate of Completion
        </div>
        <div
          style={{
            width: 120,
            height: 2,
            background: "#d4af37",
            margin: "12px auto 0",
          }}
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: 28, lineHeight: 1.8 }}>
        <div style={{ fontSize: 14, color: "#cbd5e1", marginBottom: 8 }}>
          This is to certify that
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#ffffff",
            marginBottom: 8,
          }}
        >
          {cert.studentName}
        </div>
        <div style={{ fontSize: 14, color: "#cbd5e1", marginBottom: 6 }}>
          has successfully completed the course
        </div>
        <div style={{ fontSize: 22, fontWeight: "bold", color: "#d4af37" }}>
          {cert.courseName}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 40,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>
            Date of Issue
          </div>
          <div style={{ fontSize: 14, color: "#e2e8f0", fontWeight: "bold" }}>
            {formatDate(cert.issuedAt)}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 120,
              height: 1,
              background: "#475569",
              marginBottom: 8,
            }}
          />
          <div style={{ fontSize: 11, color: "#94a3b8" }}>
            Authorized Signature
          </div>
          <div style={{ fontSize: 12, color: "#d4af37", marginTop: 4 }}>
            AR Computer Education
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 2 }}>
            Certificate Code
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#e2e8f0",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            {cert.certificateCode}
          </div>
        </div>
      </div>
    </div>
  );
}

function CertCard({
  cert,
  onPrint,
  onDelete,
}: {
  cert: Certificate;
  onPrint: (cert: Certificate) => void;
  onDelete: (cert: Certificate) => void;
}) {
  return (
    <Card
      className="border-border bg-card hover:shadow-elevated transition-smooth"
      data-ocid={`cert-card-${cert.id}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Award size={16} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground text-sm truncate">
              {cert.studentName}
            </div>
            <div className="text-xs text-muted-foreground">
              {cert.courseName}
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground space-y-0.5 mb-3">
          <div>
            Code:{" "}
            <span className="font-mono font-medium text-foreground">
              {cert.certificateCode}
            </span>
          </div>
          <div>Issued: {formatDate(cert.issuedAt)}</div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-1.5 text-xs"
            onClick={() => onPrint(cert)}
            data-ocid={`print-cert-${cert.id}`}
          >
            <Printer size={13} /> Print
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(cert)}
            data-ocid={`delete-cert-${cert.id}`}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminCertificatesPage() {
  const { admin } = useAdminAuth();
  const loginId = admin?.loginId ?? "";
  const password = admin?.password ?? "";

  const { data: certificates, isLoading } = useAdminListCertificates(
    loginId,
    password,
  );
  const { data: students } = useAdminListStudents(loginId, password);
  const issueMutation = useAdminIssueCertificate(loginId, password);
  const deleteMutation = useAdminDeleteCertificate(loginId, password);

  const [issueOpen, setIssueOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [printCert, setPrintCert] = useState<Certificate | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const enrolledStudents = students?.filter((s) => s.enrolled) ?? [];

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) {
      toast.error("Please select a student.");
      return;
    }
    try {
      await issueMutation.mutateAsync(BigInt(selectedStudentId) as StudentId);
      toast.success("Certificate issued successfully.");
      setIssueOpen(false);
      setSelectedStudentId("");
    } catch {
      toast.error("Failed to issue certificate.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id as CertificateId);
      toast.success("Certificate deleted.");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete certificate.");
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

  return (
    <div>
      <ConfirmDeleteDialog
        open={!!deleteTarget}
        certName={deleteTarget?.studentName ?? ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleteMutation.isPending}
      />

      <section className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Certificates
            </h1>
            <p className="text-muted-foreground text-sm">
              Issue and manage student certificates
            </p>
          </div>
          <Button
            onClick={() => setIssueOpen(true)}
            className="gap-2"
            data-ocid="issue-cert-btn"
          >
            <Plus size={15} /> Issue Certificate
          </Button>
        </div>
      </section>

      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
                <Skeleton key={k} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : certificates && certificates.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id.toString()}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <CertCard
                    cert={cert}
                    onPrint={setPrintCert}
                    onDelete={setDeleteTarget}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="border-border bg-card">
              <CardContent className="py-12 text-center">
                <Award
                  size={40}
                  className="mx-auto text-muted-foreground/30 mb-3"
                />
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  No Certificates Yet
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Issue certificates to enrolled students.
                </p>
                <Button
                  size="sm"
                  className="mt-2 gap-1.5"
                  onClick={() => setIssueOpen(true)}
                  data-ocid="empty-issue-cert-btn"
                >
                  <Plus size={14} /> Issue First Certificate
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Issue Certificate Dialog */}
      <Dialog open={issueOpen} onOpenChange={(o) => !o && setIssueOpen(false)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display">
              Issue Certificate
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleIssue} className="space-y-4 mt-2">
            <div>
              <Label>Select Enrolled Student *</Label>
              <Select
                value={selectedStudentId}
                onValueChange={setSelectedStudentId}
              >
                <SelectTrigger className="mt-1" data-ocid="cert-student-select">
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {enrolledStudents.length > 0 ? (
                    enrolledStudents.map((s) => (
                      <SelectItem key={s.id.toString()} value={s.id.toString()}>
                        {s.name} — {s.courseId.toUpperCase()}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No enrolled students
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {enrolledStudents.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1.5">
                  Only enrolled students can receive certificates. Go to
                  Students to update enrollment.
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={
                issueMutation.isPending || enrolledStudents.length === 0
              }
              data-ocid="issue-cert-submit"
            >
              {issueMutation.isPending ? (
                <>
                  <Loader2 size={14} className="animate-spin mr-2" /> Issuing...
                </>
              ) : (
                "Issue Certificate"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Print Preview Dialog */}
      <Dialog open={!!printCert} onOpenChange={(o) => !o && setPrintCert(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-display">
              Certificate Preview
            </DialogTitle>
          </DialogHeader>
          {printCert && (
            <div className="space-y-4">
              <div ref={printRef} className="overflow-x-auto">
                <CertificatePrintView cert={printCert} />
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setPrintCert(null)}>
                  Close
                </Button>
                <Button
                  className="gap-2"
                  onClick={triggerPrint}
                  data-ocid="print-cert-confirm"
                >
                  <Printer size={15} /> Print Certificate
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={triggerPrint}
                  data-ocid="download-cert-btn"
                >
                  <Download size={15} /> Save as PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
