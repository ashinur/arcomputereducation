import List "mo:core/List";
import Runtime "mo:core/Runtime";
import LeaveTypes "../types/leave";
import CommonTypes "../types/common";
import LeaveLib "../lib/leave";
import StudentsLib "../lib/students";
import AuthLib "../lib/auth";

mixin (
  _leaveRequests : List.List<LeaveLib.LeaveRequest>,
  _students : List.List<StudentsLib.Student>,
) {
  var _nextLeaveId : Nat = 1;

  // Student: submit a leave request
  public shared func submitLeaveRequest(
    studentId : CommonTypes.StudentId,
    input : LeaveTypes.LeaveRequestInput,
  ) : async LeaveTypes.LeaveRequestView {
    let view = LeaveLib.submitLeaveRequest(_leaveRequests, _nextLeaveId, studentId, input);
    _nextLeaveId += 1;
    view;
  };

  // Student: get own leave requests
  public query func getMyLeaveRequests(
    studentId : CommonTypes.StudentId,
  ) : async [LeaveTypes.LeaveRequestView] {
    LeaveLib.getStudentLeaveRequests(_leaveRequests, studentId);
  };

  // Admin: list all leave requests
  public query func adminListLeaveRequests(
    loginId : Text,
    password : Text,
  ) : async [LeaveTypes.LeaveRequestView] {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    LeaveLib.listAllLeaveRequests(_leaveRequests);
  };

  // Admin: approve or reject a leave request
  public shared func adminRespondLeaveRequest(
    loginId : Text,
    password : Text,
    id : CommonTypes.LeaveRequestId,
    status : CommonTypes.LeaveStatus,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    LeaveLib.respondLeaveRequest(_leaveRequests, id, status);
  };

  // Admin: delete a leave request
  public shared func adminDeleteLeaveRequest(
    loginId : Text,
    password : Text,
    id : CommonTypes.LeaveRequestId,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    LeaveLib.deleteLeaveRequest(_leaveRequests, id);
  };
};
