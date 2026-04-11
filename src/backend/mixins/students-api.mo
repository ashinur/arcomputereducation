import List "mo:core/List";
import Runtime "mo:core/Runtime";
import StudentTypes "../types/students";
import CommonTypes "../types/common";
import StudentsLib "../lib/students";
import AttendanceLib "../lib/attendance";
import LeaveLib "../lib/leave";
import AuthLib "../lib/auth";

mixin (
  _students : List.List<StudentsLib.Student>,
  _attendance : List.List<AttendanceLib.AttendanceRecord>,
  _leaveRequests : List.List<LeaveLib.LeaveRequest>,
) {
  var _nextStudentId : Nat = 1;

  public shared func studentLogin(username : Text, password : Text) : async ?StudentTypes.StudentView {
    StudentsLib.loginStudent(_students, username, password);
  };

  public query func getStudentDashboard(id : CommonTypes.StudentId) : async ?StudentTypes.StudentView {
    StudentsLib.getStudent(_students, id);
  };

  // Student: update own profile picture
  public shared func studentUpdateProfilePicture(
    studentId : CommonTypes.StudentId,
    pictureData : Text,
  ) : async Bool {
    StudentsLib.updateProfilePicture(_students, studentId, pictureData);
  };

  // Admin only
  public shared func adminCreateStudent(
    loginId : Text,
    password : Text,
    input : StudentTypes.StudentInput,
  ) : async StudentTypes.StudentView {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    let view = StudentsLib.createStudent(_students, _nextStudentId, input);
    _nextStudentId += 1;
    view;
  };

  public shared func adminUpdateStudent(
    loginId : Text,
    password : Text,
    id : CommonTypes.StudentId,
    input : StudentTypes.StudentUpdateInput,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    StudentsLib.updateStudent(_students, id, input);
  };

  public shared func adminUpdateStudentProfilePicture(
    loginId : Text,
    password : Text,
    studentId : CommonTypes.StudentId,
    pictureData : Text,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    StudentsLib.updateProfilePicture(_students, studentId, pictureData);
  };

  public shared func adminListStudents(loginId : Text, password : Text) : async [StudentTypes.StudentView] {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    StudentsLib.listStudents(_students);
  };

  public query func adminGetStudent(
    loginId : Text,
    password : Text,
    id : CommonTypes.StudentId,
  ) : async ?StudentTypes.StudentView {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    StudentsLib.getStudent(_students, id);
  };

  // Admin: delete a student and all associated records
  public shared func adminDeleteStudent(
    loginId : Text,
    password : Text,
    studentId : CommonTypes.StudentId,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    AttendanceLib.deleteForStudent(_attendance, studentId);
    LeaveLib.deleteForStudent(_leaveRequests, studentId);
    StudentsLib.deleteStudent(_students, studentId);
  };
};
