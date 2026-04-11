import List "mo:core/List";
import Types "../types/courses";
import CommonTypes "../types/common";

module {
  public type Course = Types.Course;

  public func seedCourses(courses : List.List<Course>) {
    if (courses.size() > 0) return; // already seeded
    courses.add({
      id = "DCA";
      name = "DCA - Diploma in Computer Applications";
      description = "A comprehensive course covering computer fundamentals, MS Office, and basic programming.";
      durationMonths = 6;
      benefits = [
        "Computer fundamentals",
        "MS Office suite",
        "Typing skills",
        "Basic programming concepts",
        "Job-ready certification",
      ];
    });
    courses.add({
      id = "ADCA";
      name = "ADCA - Advanced Diploma in Computer Applications";
      description = "An advanced course building on DCA with database management, web basics, and hardware knowledge.";
      durationMonths = 12;
      benefits = [
        "All DCA benefits",
        "Advanced spreadsheets",
        "Database management",
        "Web basics",
        "Hardware knowledge",
        "Industry-ready skills",
      ];
    });
    courses.add({
      id = "EXCEL";
      name = "Microsoft Excel";
      description = "Master spreadsheets with advanced formulas, charts, pivot tables, and data analysis.";
      durationMonths = 2;
      benefits = [
        "Data entry and formatting",
        "Formulas and functions",
        "Charts and graphs",
        "Pivot tables",
        "Data analysis",
      ];
    });
    courses.add({
      id = "MSOFFICE";
      name = "MS Office Suite";
      description = "Complete MS Office training covering Word, Excel, PowerPoint, and Outlook.";
      durationMonths = 3;
      benefits = [
        "Word processing",
        "Presentations",
        "Spreadsheets",
        "Email management",
        "Office productivity",
      ];
    });
    courses.add({
      id = "TALLY";
      name = "Tally Prime";
      description = "Learn accounting, GST billing, inventory management, and financial reporting with Tally.";
      durationMonths = 3;
      benefits = [
        "GST billing",
        "Accounting basics",
        "Inventory management",
        "Financial reports",
        "Business compliance",
      ];
    });
    courses.add({
      id = "DTP";
      name = "DTP - Desktop Publishing";
      description = "Learn graphic design, page layout, and print-ready publishing using professional tools.";
      durationMonths = 3;
      benefits = [
        "Page layout design",
        "Graphic design basics",
        "Publishing tools",
        "Brochure creation",
        "Print-ready design",
      ];
    });
    courses.add({
      id = "PROGRAMMING";
      name = "Programming (Python/C)";
      description = "Learn programming fundamentals with Python or C, build real projects, and start a software career.";
      durationMonths = 6;
      benefits = [
        "Python/C basics",
        "Algorithm thinking",
        "Problem-solving",
        "Build real projects",
        "Software career foundation",
      ];
    });
    courses.add({
      id = "HN";
      name = "Hardware & Networking";
      description = "Learn PC assembly, troubleshooting, network setup, and IT support skills.";
      durationMonths = 6;
      benefits = [
        "PC assembly",
        "Troubleshooting",
        "Network setup",
        "Router configuration",
        "IT support career",
      ];
    });
  };

  public func listCourses(courses : List.List<Course>) : [Course] {
    courses.toArray();
  };

  public func getCourse(courses : List.List<Course>, id : CommonTypes.CourseId) : ?Course {
    courses.find(func(c) { c.id == id });
  };
};
