import { j as jsxRuntimeExports, B as Button, L as Link } from "./index-Djvn3v0p.js";
import { B as Badge } from "./badge-CuiB0NEK.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle } from "./card-BYxng7tC.js";
import { S as Skeleton } from "./skeleton-BbYu1LM1.js";
import { u as useListCourses } from "./useBackend-CWemGVNS.js";
import { m as motion } from "./proxy-BM4JqLts.js";
import { C as Clock } from "./clock-Cyw91v7T.js";
import { A as ArrowRight } from "./arrow-right-B6EzNGBu.js";
import { B as BookOpen } from "./book-open-CzwE2F5s.js";
const COURSE_ICONS = {
  dca: "🖥️",
  adca: "💻",
  excel: "📊",
  "ms-office": "📝",
  tally: "🧾",
  dtp: "🎨",
  hardware: "🔧",
  programming: "⌨️"
};
const COURSE_FALLBACK = [
  {
    id: "dca",
    name: "DCA",
    description: "Diploma in Computer Applications — Master foundational computing, MS Office, internet usage, and basic programming.",
    durationMonths: BigInt(12)
  },
  {
    id: "adca",
    name: "ADCA",
    description: "Advanced Diploma in Computer Applications — In-depth technical skills including programming, database, and multimedia.",
    durationMonths: BigInt(18)
  },
  {
    id: "ms-office",
    name: "MS Office Suite",
    description: "Master Microsoft Word, Excel, PowerPoint and Outlook for professional productivity.",
    durationMonths: BigInt(6)
  },
  {
    id: "excel",
    name: "Excel Mastery",
    description: "Advanced Excel with formulas, pivot tables, data analysis, and macro automation.",
    durationMonths: BigInt(3)
  },
  {
    id: "tally",
    name: "Tally & Accounting",
    description: "Complete Tally ERP training for accounting, GST billing, and financial management.",
    durationMonths: BigInt(6)
  },
  {
    id: "dtp",
    name: "DTP (Desktop Publishing)",
    description: "Design skills using Photoshop, CorelDRAW, and PageMaker for print and digital media.",
    durationMonths: BigInt(6)
  },
  {
    id: "hardware",
    name: "Hardware & Networking",
    description: "Computer assembly, troubleshooting, LAN/WAN setup, and network administration.",
    durationMonths: BigInt(12)
  },
  {
    id: "programming",
    name: "Programming Fundamentals",
    description: "C, C++, and Python programming for problem-solving and software development basics.",
    durationMonths: BigInt(12)
  }
];
function CoursesPage() {
  const { data: courses, isLoading } = useListCourses();
  const displayCourses = courses && courses.length > 0 ? courses : COURSE_FALLBACK;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl text-foreground mb-3", children: "Our Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Professional computer courses designed to give you real-world skills and boost your career prospects." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-10 rounded-xl mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full mb-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
    ] }) }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: displayCourses.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.07 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: "h-full hover:shadow-elevated transition-smooth border-border group flex flex-col",
            "data-ocid": `course-card-${course.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: COURSE_ICONS[course.id] ?? "🖥️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "flex items-center gap-1 text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 10 }),
                        Number(course.durationMonths),
                        " months"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg text-foreground", children: course.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-0 flex flex-col flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-5 flex-1", children: course.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `/admission?course=${course.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    className: "w-full gap-1.5 bg-primary hover:bg-primary/90",
                    "data-ocid": `enroll-${course.id}`,
                    children: [
                      "Apply Now ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                    ]
                  }
                ) })
              ] })
            ]
          }
        )
      },
      course.id
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BookOpen,
            {
              size: 40,
              className: "mx-auto mb-4 text-primary opacity-75"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-3", children: "Ready to Enroll?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-md mx-auto", children: "Take the first step toward your computing career. Fill out our admission form to get started." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admission", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "bg-accent hover:bg-accent/90 text-accent-foreground gap-2",
              "data-ocid": "courses-cta-apply",
              children: [
                "Apply for Admission ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
              ]
            }
          ) })
        ]
      }
    ) }) })
  ] });
}
export {
  CoursesPage as default
};
