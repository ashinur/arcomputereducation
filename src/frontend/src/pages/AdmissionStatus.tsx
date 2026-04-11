import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Clock, FileText, Search, XCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useGetApplication } from "../hooks/useBackend";
import { ApplicationStatus } from "../types";

const STATUS_CONFIG = {
  [ApplicationStatus.pending]: {
    label: "Pending Review",
    icon: Clock,
    badgeClass: "bg-secondary text-secondary-foreground border-border",
    noticeClass: "bg-muted/50 border-border",
    noticeIconClass: "text-muted-foreground",
    noticeTextClass: "text-muted-foreground",
  },
  [ApplicationStatus.approved]: {
    label: "Approved",
    icon: CheckCircle,
    badgeClass: "bg-primary/15 text-primary border-primary/30",
    noticeClass: "bg-primary/10 border-primary/30",
    noticeIconClass: "text-primary",
    noticeTextClass: "text-primary/80",
  },
  [ApplicationStatus.rejected]: {
    label: "Rejected",
    icon: XCircle,
    badgeClass: "bg-destructive/15 text-destructive border-destructive/30",
    noticeClass: "bg-destructive/10 border-destructive/30",
    noticeIconClass: "text-destructive",
    noticeTextClass: "text-destructive/80",
  },
};

export default function AdmissionStatusPage() {
  const [applicationIdInput, setApplicationIdInput] = useState("");
  const [searchId, setSearchId] = useState<bigint | undefined>(undefined);

  const {
    data: application,
    isLoading,
    isError,
  } = useGetApplication(searchId as bigint);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = applicationIdInput.trim();
    if (!trimmed) return;
    try {
      setSearchId(BigInt(trimmed));
    } catch {
      setSearchId(undefined);
    }
  };

  const statusConfig = application ? STATUS_CONFIG[application.status] : null;
  const StatusIcon = statusConfig?.icon ?? Clock;

  return (
    <div>
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl text-foreground mb-3">
              Track Application
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Enter your application ID to check the status of your admission
              application.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-border shadow-subtle">
              <CardContent className="p-6">
                <form
                  onSubmit={handleSearch}
                  className="space-y-4"
                  data-ocid="status-search-form"
                >
                  <div>
                    <Label htmlFor="appId">Application ID</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        id="appId"
                        placeholder="Enter your application ID"
                        value={applicationIdInput}
                        onChange={(e) => setApplicationIdInput(e.target.value)}
                        className="flex-1"
                        data-ocid="status-search-input"
                      />
                      <Button
                        type="submit"
                        disabled={isLoading}
                        data-ocid="status-search-btn"
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Search size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                </form>

                {isError && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                    Invalid application ID or application not found.
                  </div>
                )}

                {application && statusConfig && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                    data-ocid="application-status-result"
                  >
                    <div className="border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">
                            Application ID
                          </div>
                          <div className="font-mono font-bold text-foreground">
                            #{application.id.toString()}
                          </div>
                        </div>
                        <Badge
                          className={`${statusConfig.badgeClass} border flex items-center gap-1.5`}
                        >
                          <StatusIcon size={12} />
                          {statusConfig.label}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-muted-foreground text-xs mb-0.5">
                            Applicant Name
                          </div>
                          <div className="font-medium text-foreground">
                            {application.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-0.5">
                            Course Applied
                          </div>
                          <div className="font-medium text-foreground uppercase">
                            {application.courseId}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-0.5">
                            Phone
                          </div>
                          <div className="font-medium text-foreground">
                            {application.phone}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground text-xs mb-0.5">
                            Email
                          </div>
                          <div className="font-medium text-foreground truncate">
                            {application.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border rounded-lg p-4 flex gap-2 ${statusConfig.noticeClass}`}
                    >
                      <StatusIcon
                        size={16}
                        className={`${statusConfig.noticeIconClass} shrink-0 mt-0.5`}
                      />
                      <p className={`text-xs ${statusConfig.noticeTextClass}`}>
                        {application.status === ApplicationStatus.pending &&
                          "Your application is under review. Our admin team will process it shortly. Please check back in 1–3 business days."}
                        {application.status === ApplicationStatus.approved &&
                          "Congratulations! Your application has been approved. You can now log in to your student account."}
                        {application.status === ApplicationStatus.rejected &&
                          "Your application has been rejected. Please contact us for more information or to reapply."}
                      </p>
                    </div>

                    {application.status === ApplicationStatus.approved && (
                      <Link to="/student/login">
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Go to Student Login
                        </Button>
                      </Link>
                    )}
                    {application.status === ApplicationStatus.rejected && (
                      <Link to="/contact">
                        <Button variant="outline" className="w-full">
                          Contact Us
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                )}

                {searchId !== undefined &&
                  !isLoading &&
                  !application &&
                  !isError && (
                    <div className="mt-6 text-center py-8">
                      <FileText
                        size={36}
                        className="mx-auto text-muted-foreground/40 mb-3"
                      />
                      <p className="text-muted-foreground text-sm">
                        No application found with this ID.
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
