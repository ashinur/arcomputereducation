import "./useBackend-CWemGVNS.js";
var ApplicationStatus = /* @__PURE__ */ ((ApplicationStatus2) => {
  ApplicationStatus2["pending"] = "pending";
  ApplicationStatus2["approved"] = "approved";
  ApplicationStatus2["rejected"] = "rejected";
  return ApplicationStatus2;
})(ApplicationStatus || {});
const COURSE_LIST = [
  {
    id: "dca",
    name: "DCA",
    fullName: "Diploma in Computer Applications",
    duration: 12
  },
  {
    id: "adca",
    name: "ADCA",
    fullName: "Advanced Diploma in Computer Applications",
    duration: 18
  },
  {
    id: "excel",
    name: "Excel Mastery",
    fullName: "Excel Mastery & Data Analysis",
    duration: 3
  },
  {
    id: "ms-office",
    name: "MS Office Suite",
    fullName: "MS Office Suite (Word, Excel, PowerPoint)",
    duration: 6
  },
  {
    id: "tally",
    name: "Tally",
    fullName: "Tally & Accounting Software",
    duration: 6
  },
  {
    id: "dtp",
    name: "DTP",
    fullName: "Desktop Publishing (Photoshop, CorelDraw)",
    duration: 6
  },
  {
    id: "hardware",
    name: "Hardware & Networking",
    fullName: "Computer Hardware & Networking",
    duration: 12
  },
  {
    id: "programming",
    name: "Programming",
    fullName: "Programming Fundamentals (C, C++, Python)",
    duration: 12
  }
];
export {
  ApplicationStatus as A,
  COURSE_LIST as C
};
