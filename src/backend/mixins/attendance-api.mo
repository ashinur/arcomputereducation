import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AttendanceTypes "../types/attendance";
import CommonTypes "../types/common";
import AttendanceLib "../lib/attendance";
import StudentsLib "../lib/students";
import AuthLib "../lib/auth";

mixin (
  _attendance : List.List<AttendanceLib.AttendanceRecord>,
  _students : List.List<StudentsLib.Student>,
) {
  var _nextAttendanceId : Nat = 1;

  // Admin: mark attendance for a student
  public shared func adminMarkAttendance(
    loginId : Text,
    password : Text,
    studentId : CommonTypes.StudentId,
    date : Text,
    status : CommonTypes.AttendanceStatus,
  ) : async AttendanceTypes.AttendanceRecord {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    let record = AttendanceLib.markAttendance(_attendance, _nextAttendanceId, studentId, date, status);
    _nextAttendanceId += 1;
    record;
  };

  // Admin: get all attendance for a student
  public query func adminGetStudentAttendance(
    loginId : Text,
    password : Text,
    studentId : CommonTypes.StudentId,
  ) : async [AttendanceTypes.AttendanceRecord] {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    AttendanceLib.getStudentAttendance(_attendance, studentId);
  };

  // Student: get own attendance + summary
  public query func getMyAttendance(
    studentId : CommonTypes.StudentId,
  ) : async { records : [AttendanceTypes.AttendanceRecord]; summary : AttendanceTypes.AttendanceSummary } {
    let records = AttendanceLib.getStudentAttendance(_attendance, studentId);
    let summary = AttendanceLib.getAttendanceSummary(_attendance, studentId);
    { records; summary };
  };
};
