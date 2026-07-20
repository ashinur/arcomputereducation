import { test; suite; expect } "mo:test";
import List "mo:core/List";
import Attendance "../lib/attendance";

suite(
  "Attendance",
  func() {
    test(
      "markAttendance stores a record and returns it",
      func() {
        let records = List.empty<Attendance.AttendanceRecord>();
        let r = Attendance.markAttendance(records, 1, 42, "2026-01-01", #present);
        expect.nat(r.id).equal(1);
        expect.nat(r.studentId).equal(42);
        expect.text(r.date).equal("2026-01-01");
        expect.nat(records.size()).equal(1);
      },
    );

    test(
      "getStudentAttendance returns only that student's records",
      func() {
        let records = List.empty<Attendance.AttendanceRecord>();
        ignore Attendance.markAttendance(records, 1, 1, "2026-01-01", #present);
        ignore Attendance.markAttendance(records, 2, 1, "2026-01-02", #absent);
        ignore Attendance.markAttendance(records, 3, 2, "2026-01-01", #present);
        expect.nat(Attendance.getStudentAttendance(records, 1).size()).equal(2);
        expect.nat(Attendance.getStudentAttendance(records, 2).size()).equal(1);
        expect.nat(Attendance.getStudentAttendance(records, 3).size()).equal(0);
      },
    );

    test(
      "getAttendanceSummary counts each status",
      func() {
        let records = List.empty<Attendance.AttendanceRecord>();
        ignore Attendance.markAttendance(records, 1, 1, "d1", #present);
        ignore Attendance.markAttendance(records, 2, 1, "d2", #present);
        ignore Attendance.markAttendance(records, 3, 1, "d3", #absent);
        ignore Attendance.markAttendance(records, 4, 1, "d4", #late);
        ignore Attendance.markAttendance(records, 5, 2, "d1", #absent);
        let summary = Attendance.getAttendanceSummary(records, 1);
        expect.nat(summary.total).equal(4);
        expect.nat(summary.present).equal(2);
        expect.nat(summary.absent).equal(1);
        expect.nat(summary.late).equal(1);
      },
    );

    test(
      "getAttendanceSummary is all zeros for a student with no records",
      func() {
        let records = List.empty<Attendance.AttendanceRecord>();
        let summary = Attendance.getAttendanceSummary(records, 99);
        expect.nat(summary.total).equal(0);
        expect.nat(summary.present).equal(0);
        expect.nat(summary.absent).equal(0);
        expect.nat(summary.late).equal(0);
      },
    );

    test(
      "deleteForStudent removes only that student's records",
      func() {
        let records = List.empty<Attendance.AttendanceRecord>();
        ignore Attendance.markAttendance(records, 1, 1, "d1", #present);
        ignore Attendance.markAttendance(records, 2, 2, "d1", #present);
        Attendance.deleteForStudent(records, 1);
        expect.nat(records.size()).equal(1);
        expect.nat(Attendance.getStudentAttendance(records, 1).size()).equal(0);
        expect.nat(Attendance.getStudentAttendance(records, 2).size()).equal(1);
      },
    );
  },
);
