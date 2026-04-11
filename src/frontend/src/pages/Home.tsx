import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  Clock,
  Cpu,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Mail,
  MapPin,
  Monitor,
  Network,
  Phone,
  Printer,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useListCourses, useListNotices } from "../hooks/useBackend";

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "500+", label: "Students Enrolled", icon: Users },
  { value: "8", label: "Courses Offered", icon: BookOpen },
  { value: "10+", label: "Years of Excellence", icon: Award },
  { value: "100%", label: "Placement Support", icon: BriefcaseBusiness },
];

// ─── Why Choose Us ────────────────────────────────────────────────────────────
const features = [
  {
    icon: Monitor,
    title: "Industry-Relevant Curriculum",
    desc: "Courses designed with modern industry requirements and practical training in mind.",
  },
  {
    icon: Award,
    title: "Certified Programs",
    desc: "Government-recognised certifications that employers trust for career advancement.",
  },
  {
    icon: Users,
    title: "Expert Faculty",
    desc: "Learn from experienced professionals with real-world expertise in every domain.",
  },
  {
    icon: Clock,
    title: "Flexible Timings",
    desc: "Morning and evening batches available to suit your schedule and convenience.",
  },
];

// ─── All 8 Courses with benefits ─────────────────────────────────────────────
const ALL_COURSES = [
  {
    id: "dca",
    name: "DCA",
    fullName: "Diploma in Computer Applications",
    duration: "3 months",
    icon: Monitor,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    description:
      "Comprehensive Computer Fundamentals training for beginners looking to build a strong digital foundation.",
    benefits: [
      "Computer basics & operating systems",
      "MS Office suite proficiency",
      "Typing speed & accuracy",
      "Basic programming concepts",
      "Job-ready certification",
    ],
  },
  {
    id: "adca",
    name: "ADCA",
    fullName: "Advanced Diploma in Computer Applications",
    duration: "6 months",
    icon: LayoutDashboard,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    description:
      "Advanced Computer Applications course for deeper technical skills and industry readiness.",
    benefits: [
      "Advanced Office tools & automation",
      "Database management (Access/MySQL)",
      "Web development basics",
      "Hardware knowledge essentials",
      "Industry-ready certification",
    ],
  },
  {
    id: "excel",
    name: "Excel",
    fullName: "MS Excel Mastery",
    duration: "1.5 months",
    icon: FileText,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    description:
      "Complete MS Excel training for data management, analysis, and business reporting.",
    benefits: [
      "Data entry and formatting",
      "Formulas and functions",
      "Charts and graphs",
      "Pivot tables & data analysis",
      "Spreadsheet automation",
    ],
  },
  {
    id: "ms-office",
    name: "MS Office",
    fullName: "Complete MS Office Suite",
    duration: "2 months",
    icon: Cpu,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    description:
      "Master Word, Excel, PowerPoint, and Outlook for complete office productivity.",
    benefits: [
      "Word processing (MS Word)",
      "Professional presentations (PowerPoint)",
      "Spreadsheets (Excel basics)",
      "Email management (Outlook)",
      "Office productivity boost",
    ],
  },
  {
    id: "tally",
    name: "Tally",
    fullName: "Accounting & GST with Tally",
    duration: "2 months",
    icon: Calculator,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    description:
      "GST billing, accounting, and Tally software for finance and business administration.",
    benefits: [
      "GST billing and returns",
      "Accounting fundamentals",
      "Inventory management",
      "Financial reports generation",
      "Business compliance skills",
    ],
  },
  {
    id: "dtp",
    name: "DTP",
    fullName: "Desktop Publishing",
    duration: "2 months",
    icon: Printer,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    description:
      "Professional desktop publishing and graphic design for print and digital media.",
    benefits: [
      "Page layout and design",
      "Graphic design basics",
      "Publishing software mastery",
      "Brochure and poster creation",
      "Print-ready output skills",
    ],
  },
  {
    id: "programming",
    name: "Programming",
    fullName: "Computer Programming",
    duration: "3 months",
    icon: TrendingUp,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    description:
      "Python/C programming fundamentals to build a strong software career foundation.",
    benefits: [
      "Python/C programming basics",
      "Algorithm thinking skills",
      "Problem-solving techniques",
      "Build real projects",
      "Software career foundation",
    ],
  },
  {
    id: "hardware",
    name: "Hardware & Networking",
    fullName: "Hardware and Networking",
    duration: "3 months",
    icon: Network,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    description:
      "PC assembly, troubleshooting, and network setup for a career in IT support.",
    benefits: [
      "PC assembly and repair",
      "Hardware troubleshooting",
      "Network setup and configuration",
      "Router and switch management",
      "IT support career preparation",
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { data: backendCourses } = useListCourses();
  const { data: notices } = useListNotices();

  // Merge backend names/descriptions over fallback data if available
  const displayCourses = ALL_COURSES.map((course) => {
    const bc = backendCourses?.find((c) => c.id === course.id);
    return bc
      ? { ...course, name: bc.name, description: bc.description }
      : course;
  });

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-card">
        <div className="absolute inset-0 gradient-subtle opacity-50 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-accent/15 text-accent border-accent/30 hover:bg-accent/20 font-medium">
                🎓 Admission Open 2025–26
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-3">
                Unlock Your
                <br />
                <span className="text-primary">Digital Future</span>
              </h1>
              <p className="text-lg font-semibold text-foreground mb-2">
                AR Computer Education
              </p>
              <div className="flex flex-col gap-1.5 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary shrink-0" />
                  Kodaldhowa Ward No. 2, Fakiragram, Kokrajhar, Assam — 783345
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-primary shrink-0" />
                  +91 6002880939
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-primary shrink-0" />
                  arcomputer.education0@gmail.com
                </span>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link to="/admission">
                  <Button
                    size="lg"
                    className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-card"
                    data-ocid="hero-apply-now"
                  >
                    Apply Now <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/admission/status">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2"
                    data-ocid="hero-track-application"
                  >
                    <Search size={16} /> Track Application
                  </Button>
                </Link>
                <Link to="/student/login">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="gap-2 text-primary hover:bg-primary/10"
                    data-ocid="hero-student-login"
                  >
                    <GraduationCap size={16} /> Student Login
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative hidden md:block"
            >
              <div className="rounded-2xl overflow-hidden shadow-elevated aspect-[4/3] bg-secondary">
                <img
                  src="/assets/generated/hero-classroom.dim_800x600.jpg"
                  alt="Students learning at AR Computer Education"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-elevated p-4 flex items-center gap-3 border border-border">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    500+ Students
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Successful careers
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-accent rounded-xl shadow-elevated p-3 flex items-center gap-2">
                <Award size={18} className="text-accent-foreground" />
                <span className="text-xs font-semibold text-accent-foreground">
                  Govt. Recognised
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────────────────── */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <Icon size={22} className="text-primary-foreground/70 mb-1" />
                <div className="font-display font-bold text-3xl text-primary-foreground">
                  {value}
                </div>
                <div className="text-xs text-primary-foreground/75">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Section ───────────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/25">
              Featured Courses
            </Badge>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Explore Our Comprehensive
              <br />
              Computer Courses
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From computer basics to advanced programming — we offer 8
              specialised courses designed to give you real skills, recognised
              certifications, and job placement support.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayCourses.map((course, i) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                >
                  <Card
                    className="h-full card-hover border-border group"
                    data-ocid={`course-card-${course.id}`}
                  >
                    <CardContent className="p-5 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-11 h-11 rounded-xl ${course.iconBg} flex items-center justify-center group-hover:scale-110 transition-smooth`}
                        >
                          <Icon size={20} className={course.iconColor} />
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs font-normal shrink-0"
                        >
                          {course.duration}
                        </Badge>
                      </div>

                      {/* Title & description */}
                      <h3 className="font-display font-bold text-foreground text-base mb-0.5">
                        {course.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2 font-medium">
                        {course.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 flex-none line-clamp-2">
                        {course.description}
                      </p>

                      {/* Benefits */}
                      <ul className="space-y-1.5 mb-5 flex-1">
                        {course.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-2 text-xs text-foreground"
                          >
                            <CheckCircle2
                              size={13}
                              className="text-primary shrink-0 mt-0.5"
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link to="/admission">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-between gap-1.5 text-primary hover:text-primary hover:bg-primary/10 px-3 border border-primary/20 hover:border-primary/40 transition-smooth"
                          data-ocid={`course-enroll-${course.id}`}
                        >
                          Enroll Now <ArrowRight size={13} />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/courses">
              <Button
                variant="outline"
                size="lg"
                className="gap-2"
                data-ocid="view-all-courses"
              >
                View Full Course Details <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="bg-secondary/40 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-2">
              Why Choose AR Computer?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We are committed to providing the best computer education in
              Kokrajhar district with hands-on training and career support.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border shadow-subtle card-hover text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notices Section ───────────────────────────────────────────────── */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Notices – 3 cols */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground">
                    Latest Notices & Announcements
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stay updated with campus news and important information
                  </p>
                </div>
                <Link to="/notices" className="shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-primary"
                    data-ocid="view-all-notices"
                  >
                    View All <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>

              {notices && notices.length > 0 ? (
                <div className="space-y-3">
                  {notices.slice(0, 3).map((notice, i) => (
                    <motion.div
                      key={notice.id.toString()}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Card
                        className="border-border hover:border-primary/30 transition-smooth"
                        data-ocid={`notice-card-${notice.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                              <FileText size={14} className="text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm text-foreground leading-snug mb-1">
                                {notice.title}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-2">
                                {notice.content}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  <div className="pt-2">
                    <Link to="/notices">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-primary border-primary/30 hover:bg-primary/5"
                        data-ocid="notice-view-all-btn"
                      >
                        View All Notices <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <Card className="border-border bg-muted/20">
                  <CardContent className="p-8 text-center">
                    <FileText
                      size={32}
                      className="mx-auto mb-3 text-muted-foreground/40"
                    />
                    <p className="text-sm text-muted-foreground font-medium">
                      No notices posted yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check back soon for updates and announcements.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* CTA – 2 cols */}
            <div className="md:col-span-2">
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground shadow-elevated">
                <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mb-5">
                  <GraduationCap
                    size={28}
                    className="text-primary-foreground"
                  />
                </div>
                <h2 className="font-display font-bold text-2xl mb-3 leading-tight">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-primary-foreground/80 mb-6 text-sm leading-relaxed">
                  Join hundreds of students who have built successful careers
                  with AR Computer Education. Apply today and take the first
                  step toward your digital future.
                </p>
                <div className="flex flex-col gap-3">
                  <Link to="/admission">
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-card"
                      data-ocid="cta-apply-now"
                    >
                      Apply for Admission
                    </Button>
                  </Link>
                  <Link to="/student/login">
                    <Button
                      variant="outline"
                      className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      data-ocid="cta-student-login"
                    >
                      Student Login
                    </Button>
                  </Link>
                </div>

                {/* Contact snippet */}
                <div className="mt-6 pt-5 border-t border-primary-foreground/20 space-y-2">
                  <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-2 font-medium">
                    Contact Us
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
                    <Phone size={12} />
                    +91 6002880939
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
                    <Mail size={12} />
                    arcomputer.education0@gmail.com
                  </div>
                  <div className="flex items-start gap-2 text-xs text-primary-foreground/80">
                    <MapPin size={12} className="shrink-0 mt-0.5" />
                    Kodaldhowa Ward No. 2, Fakiragram, Kokrajhar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
