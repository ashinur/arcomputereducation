import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  Award,
  Bell,
  CalendarCheck,
  ChevronRight,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useAdminAuth } from "../../hooks/useAuth";
import {
  useAdminListApplications,
  useAdminListCertificates,
  useAdminListLeaveRequests,
  useAdminListStudents,
  useListNotices,
} from "../../hooks/useBackend";
import { ApplicationStatus, LeaveStatus } from "../../types";

const adminNavItems = [
  {
    href: "/admin/students",
    icon: Users,
    label: "Manage Students",
    description: "Create and update student accounts",
  },
  {
    href: "/admin/applications",
    icon: FileText,
    label: "Applications",
    description: "Review admission applications",
  },
  {
    href: "/admin/certificates",
    icon: Award,
    label: "Certificates",
    description: "Issue and manage certificates",
  },
  {
    href: "/admin/notices",
    icon: Bell,
    label: "Notice Board",
    description: "Post and manage notices",
  },
  {
    href: "/admin/leave",
    icon: CalendarCheck,
    label: "Leave Requests",
    description: "Approve or reject student leave",
  },
];

export default function AdminDashboardPage() {
  const { admin } = useAdminAuth();
  const loginId = admin?.loginId ?? "";
  const password = admin?.password ?? "";

  const { data: students, isLoading: loadingStudents } = useAdminListStudents(
    loginId,
    password,
  );
  const { data: applications, isLoading: loadingApps } =
    useAdminListApplications(loginId, password);
  const { data: certificates, isLoading: loadingCerts } =
    useAdminListCertificates(loginId, password);
  const { data: notices, isLoading: loadingNotices } = useListNotices();
  const { data: leaveRequests, isLoading: loadingLeave } =
    useAdminListLeaveRequests(loginId, password);

  const pendingApps =
    applications?.filter((a) => a.status === ApplicationStatus.pending)
      .length ?? 0;

  const pendingLeave =
    leaveRequests?.filter((r) => r.leaveStatus === LeaveStatus.pending)
      .length ?? 0;

  const stats = [
    {
      label: "Total Students",
      value: students?.length ?? 0,
      icon: GraduationCap,
      loading: loadingStudents,
    },
    {
      label: "Applications",
      value: applications?.length ?? 0,
      icon: FileText,
      loading: loadingApps,
      badge: pendingApps > 0 ? `${pendingApps} pending` : undefined,
    },
    {
      label: "Certificates Issued",
      value: certificates?.length ?? 0,
      icon: Award,
      loading: loadingCerts,
    },
    {
      label: "Notices Posted",
      value: notices?.length ?? 0,
      icon: Bell,
      loading: loadingNotices,
    },
    {
      label: "Leave Requests",
      value: leaveRequests?.length ?? 0,
      icon: CalendarCheck,
      loading: loadingLeave,
      badge: pendingLeave > 0 ? `${pendingLeave} pending` : undefined,
    },
  ];

  return (
    <div>
      <section className="bg-card border-b border-border py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">
                AR Computer Education — Management Panel
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, loading, badge }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card
                  className="border-border bg-card"
                  data-ocid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon size={16} className="text-primary" />
                      </div>
                      {badge && (
                        <Badge className="text-xs bg-accent/15 text-accent border-accent/30">
                          {badge}
                        </Badge>
                      )}
                    </div>
                    {loading ? (
                      <Skeleton className="h-7 w-12 mb-1" />
                    ) : (
                      <div className="font-display font-bold text-2xl text-foreground">
                        {value}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {adminNavItems.map(
              ({ href, icon: Icon, label, description }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <Link to={href}>
                    <Card
                      className="border-border bg-card hover:shadow-elevated transition-smooth cursor-pointer group h-full"
                      data-ocid={`admin-nav-${href.split("/").pop()}`}
                    >
                      <CardContent className="p-5">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-1 flex items-center gap-1">
                          {label}
                          <ChevronRight
                            size={14}
                            className="ml-auto text-muted-foreground group-hover:text-foreground transition-colors"
                          />
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ),
            )}
          </div>

          {/* Recent Applications */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" /> Recent
                  Applications
                </span>
                <Link
                  to="/admin/applications"
                  className="text-xs text-primary hover:underline font-normal"
                >
                  View all
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingApps ? (
                <div className="space-y-2">
                  {["sk1", "sk2", "sk3"].map((k) => (
                    <Skeleton key={k} className="h-10 w-full" />
                  ))}
                </div>
              ) : applications && applications.length > 0 ? (
                <div className="space-y-2">
                  {applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id.toString()}
                      className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                      data-ocid={`app-row-${app.id}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">
                          {app.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {app.email}
                        </div>
                      </div>
                      <Badge
                        className={
                          app.status === ApplicationStatus.approved
                            ? "bg-green-100 text-green-700 border-green-200"
                            : app.status === ApplicationStatus.rejected
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }
                      >
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No applications yet.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
