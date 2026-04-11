import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useListCourses } from "../hooks/useBackend";

const COURSE_ICONS: Record<string, string> = {
  dca: "🖥️",
  adca: "💻",
  excel: "📊",
  "ms-office": "📝",
  tally: "🧾",
  dtp: "🎨",
  hardware: "🔧",
  programming: "⌨️",
};

const COURSE_FALLBACK = [
  {
    id: "dca",
    name: "DCA",
    description:
      "Diploma in Computer Applications — Master foundational computing, MS Office, internet usage, and basic programming.",
    durationMonths: BigInt(12),
  },
  {
    id: "adca",
    name: "ADCA",
    description:
      "Advanced Diploma in Computer Applications — In-depth technical skills including programming, database, and multimedia.",
    durationMonths: BigInt(18),
  },
  {
    id: "ms-office",
    name: "MS Office Suite",
    description:
      "Master Microsoft Word, Excel, PowerPoint and Outlook for professional productivity.",
    durationMonths: BigInt(6),
  },
  {
    id: "excel",
    name: "Excel Mastery",
    description:
      "Advanced Excel with formulas, pivot tables, data analysis, and macro automation.",
    durationMonths: BigInt(3),
  },
  {
    id: "tally",
    name: "Tally & Accounting",
    description:
      "Complete Tally ERP training for accounting, GST billing, and financial management.",
    durationMonths: BigInt(6),
  },
  {
    id: "dtp",
    name: "DTP (Desktop Publishing)",
    description:
      "Design skills using Photoshop, CorelDRAW, and PageMaker for print and digital media.",
    durationMonths: BigInt(6),
  },
  {
    id: "hardware",
    name: "Hardware & Networking",
    description:
      "Computer assembly, troubleshooting, LAN/WAN setup, and network administration.",
    durationMonths: BigInt(12),
  },
  {
    id: "programming",
    name: "Programming Fundamentals",
    description:
      "C, C++, and Python programming for problem-solving and software development basics.",
    durationMonths: BigInt(12),
  },
];

export default function CoursesPage() {
  const { data: courses, isLoading } = useListCourses();
  const displayCourses =
    courses && courses.length > 0 ? courses : COURSE_FALLBACK;

  return (
    <div>
      {/* Hero */}
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl text-foreground mb-3">
              Our Courses
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Professional computer courses designed to give you real-world
              skills and boost your career prospects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
                <Card key={k} className="border-border">
                  <CardContent className="p-5">
                    <Skeleton className="h-10 w-10 rounded-xl mb-4" />
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card
                    className="h-full hover:shadow-elevated transition-smooth border-border group flex flex-col"
                    data-ocid={`course-card-${course.id}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-3xl">
                          {COURSE_ICONS[course.id] ?? "🖥️"}
                        </div>
                        <Badge
                          variant="secondary"
                          className="flex items-center gap-1 text-xs"
                        >
                          <Clock size={10} />
                          {Number(course.durationMonths)} months
                        </Badge>
                      </div>
                      <CardTitle className="font-display text-lg text-foreground">
                        {course.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col flex-1">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {course.description}
                      </p>
                      <a href={`/admission?course=${course.id}`}>
                        <Button
                          size="sm"
                          className="w-full gap-1.5 bg-primary hover:bg-primary/90"
                          data-ocid={`enroll-${course.id}`}
                        >
                          Apply Now <ArrowRight size={14} />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <BookOpen
              size={40}
              className="mx-auto mb-4 text-primary opacity-75"
            />
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Ready to Enroll?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Take the first step toward your computing career. Fill out our
              admission form to get started.
            </p>
            <Link to="/admission">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                data-ocid="courses-cta-apply"
              >
                Apply for Admission <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
