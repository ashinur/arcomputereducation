import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Upload,
  User,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import { useListCourses, useSubmitApplication } from "../hooks/useBackend";
import { COURSE_LIST } from "../types";
import type { ApplicationInput } from "../types";

interface FileUploadFieldProps {
  label: string;
  accept?: string;
  required?: boolean;
  onChange: (file: File | null) => void;
  dataOcid?: string;
}

function FileUploadField({
  label,
  accept = "image/*,.pdf",
  required,
  onChange,
  dataOcid,
}: FileUploadFieldProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = label.replace(/\s+/g, "-").toLowerCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file?.name ?? null);
    onChange(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    setFileName(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label
        htmlFor={uid}
        className="text-sm font-medium mb-1.5 block cursor-pointer"
      >
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div
        className="relative border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors group"
        data-ocid={dataOcid}
      >
        <input
          ref={inputRef}
          id={uid}
          type="file"
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
        />
        <div className="flex items-center gap-3 pointer-events-none">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
            {fileName ? (
              <CheckCircle size={16} className="text-primary" />
            ) : (
              <Upload size={16} className="text-primary" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            {fileName ? (
              <p className="text-sm text-foreground font-medium truncate">
                {fileName}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click to upload{" "}
                {accept.includes("image") && !accept.includes(".pdf")
                  ? "image"
                  : "image or PDF"}
              </p>
            )}
          </div>
        </div>
        {fileName && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-muted transition-colors pointer-events-auto z-10"
            aria-label="Remove file"
          >
            <X size={14} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}

interface FormState {
  name: string;
  fatherName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  courseId: string;
}

export default function AdmissionPage() {
  const { data: courses } = useListCourses();
  const submitMutation = useSubmitApplication();
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<bigint | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    courseId: new URLSearchParams(window.location.search).get("course") ?? "",
  });

  const [files, setFiles] = useState<{
    photo: File | null;
    aadhaar: File | null;
    marksheet10: File | null;
    marksheet12: File | null;
    passCertificate: File | null;
  }>({
    photo: null,
    aadhaar: null,
    marksheet10: null,
    marksheet12: null,
    passCertificate: null,
  });

  const courseOptions =
    courses && courses.length > 0
      ? courses
      : COURSE_LIST.map((c) => ({
          id: c.id,
          name: c.fullName,
          description: "",
          durationMonths: BigInt(c.duration),
        }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.courseId ||
      !form.gender
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!files.photo) {
      toast.error("Please upload your passport photo.");
      return;
    }
    if (!files.aadhaar) {
      toast.error("Please upload your Aadhaar card.");
      return;
    }

    try {
      const buildBlob = async (file: File | null) => {
        if (!file) return undefined;
        const buf = await file.arrayBuffer();
        return ExternalBlob.fromBytes(new Uint8Array(buf));
      };

      const finalInput: ApplicationInput = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        courseId: form.courseId,
        photo: await buildBlob(files.photo),
        aadhaar: await buildBlob(files.aadhaar),
        marksheet10: await buildBlob(files.marksheet10),
        marksheet12: await buildBlob(files.marksheet12),
        passCertificate: await buildBlob(files.passCertificate),
      };

      const result = await submitMutation.mutateAsync(finalInput);
      setApplicationId(result.id);
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch {
      toast.error("Failed to submit application. Please try again.");
    }
  };

  if (submitted && applicationId !== null) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-lg text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-primary" />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground mb-3">
            Application Submitted!
          </h2>
          <p className="text-muted-foreground mb-4">
            Your admission application has been received. Your application ID
            is:
          </p>
          <div
            className="bg-muted/50 rounded-xl px-6 py-4 mb-6 font-mono text-2xl font-bold text-primary"
            data-ocid="application-id"
          >
            #{applicationId.toString()}
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Save this ID to track your application status. Our team will review
            it within 1–3 business days.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild variant="outline">
              <a href="/admission/status">Track Status</a>
            </Button>
            <Button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  fatherName: "",
                  dob: "",
                  gender: "",
                  email: "",
                  phone: "",
                  address: "",
                  courseId: "",
                });
              }}
            >
              New Application
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl text-foreground mb-3">
              Admission Application
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Fill in your details and upload the required documents to apply
              for admission at AR Computer Education.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-ocid="admission-form"
          >
            {/* Personal Information */}
            <Card className="border-border shadow-subtle">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <User size={18} className="text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="mt-1.5"
                      required
                      data-ocid="admission-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fatherName">Father's Name</Label>
                    <Input
                      id="fatherName"
                      placeholder="Enter father's full name"
                      value={form.fatherName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, fatherName: e.target.value }))
                      }
                      className="mt-1.5"
                      data-ocid="admission-father-name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={form.dob}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, dob: e.target.value }))
                      }
                      className="mt-1.5"
                      data-ocid="admission-dob"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">
                      Gender <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.gender}
                      onValueChange={(v) =>
                        setForm((f) => ({ ...f, gender: v }))
                      }
                    >
                      <SelectTrigger
                        className="mt-1.5"
                        data-ocid="admission-gender-select"
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="mt-1.5"
                      required
                      data-ocid="admission-phone"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="mt-1.5"
                      required
                      data-ocid="admission-email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Residential Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your full residential address"
                    value={form.address}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, address: e.target.value }))
                    }
                    className="mt-1.5"
                    data-ocid="admission-address"
                  />
                </div>

                <div>
                  <Label htmlFor="course">
                    Course <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.courseId}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, courseId: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1.5"
                      data-ocid="admission-course-select"
                    >
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseOptions.map((c) => (
                        <SelectItem
                          key={c.id}
                          value={c.id}
                          data-ocid={`course-option-${c.id}`}
                        >
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Document Uploads */}
            <Card className="border-border shadow-subtle">
              <CardHeader>
                <CardTitle className="font-display text-xl flex items-center gap-2">
                  <Upload size={18} className="text-primary" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FileUploadField
                    label="Passport Photo"
                    required
                    onChange={(f) =>
                      setFiles((prev) => ({ ...prev, photo: f }))
                    }
                    accept="image/*"
                    dataOcid="upload-photo"
                  />
                  <FileUploadField
                    label="Aadhaar Card"
                    required
                    onChange={(f) =>
                      setFiles((prev) => ({ ...prev, aadhaar: f }))
                    }
                    accept="image/*,.pdf"
                    dataOcid="upload-aadhaar"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FileUploadField
                    label="10th Marksheet"
                    onChange={(f) =>
                      setFiles((prev) => ({ ...prev, marksheet10: f }))
                    }
                    accept="image/*,.pdf"
                    dataOcid="upload-marksheet10"
                  />
                  <FileUploadField
                    label="12th Marksheet"
                    onChange={(f) =>
                      setFiles((prev) => ({ ...prev, marksheet12: f }))
                    }
                    accept="image/*,.pdf"
                    dataOcid="upload-marksheet12"
                  />
                </div>
                <FileUploadField
                  label="Pass Certificate"
                  onChange={(f) =>
                    setFiles((prev) => ({ ...prev, passCertificate: f }))
                  }
                  accept="image/*,.pdf"
                  dataOcid="upload-pass-cert"
                />

                <div className="bg-muted/50 rounded-lg p-4 flex gap-2">
                  <AlertCircle
                    size={16}
                    className="text-muted-foreground shrink-0 mt-0.5"
                  />
                  <p className="text-xs text-muted-foreground">
                    Photo and Aadhaar card are mandatory. All documents will be
                    reviewed by our admin team. Ensure images are clear and
                    readable. Accepted formats: JPG, PNG, PDF (max 5MB each).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              disabled={submitMutation.isPending}
              data-ocid="admission-submit"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Submitting Application...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
