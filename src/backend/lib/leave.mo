import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/leave";
import CommonTypes "../types/common";

module {
  public type LeaveRequest = Types.LeaveRequest;
  public type LeaveRequestView = Types.LeaveRequestView;
  public type LeaveRequestInput = Types.LeaveRequestInput;

  public func toView(r : LeaveRequest) : LeaveRequestView {
    {
      id = r.id;
      studentId = r.studentId;
      startDate = r.startDate;
      endDate = r.endDate;
      reason = r.reason;
      leaveStatus = r.leaveStatus;
      submittedAt = r.submittedAt;
      respondedAt = r.respondedAt;
    };
  };

  public func submitLeaveRequest(
    requests : List.List<LeaveRequest>,
    nextId : Nat,
    studentId : CommonTypes.StudentId,
    input : LeaveRequestInput,
  ) : LeaveRequestView {
    let req : LeaveRequest = {
      id = nextId;
      studentId = studentId;
      startDate = input.startDate;
      endDate = input.endDate;
      reason = input.reason;
      var leaveStatus = #pending;
      submittedAt = Time.now();
      var respondedAt = null;
    };
    requests.add(req);
    toView(req);
  };

  public func getStudentLeaveRequests(
    requests : List.List<LeaveRequest>,
    studentId : CommonTypes.StudentId,
  ) : [LeaveRequestView] {
    requests.filter(func(r) { r.studentId == studentId })
      .map<LeaveRequest, LeaveRequestView>(toView)
      .toArray();
  };

  public func listAllLeaveRequests(
    requests : List.List<LeaveRequest>,
  ) : [LeaveRequestView] {
    requests.map<LeaveRequest, LeaveRequestView>(toView).toArray();
  };

  public func respondLeaveRequest(
    requests : List.List<LeaveRequest>,
    id : CommonTypes.LeaveRequestId,
    status : CommonTypes.LeaveStatus,
  ) : Bool {
    switch (requests.find(func(r) { r.id == id })) {
      case (?req) {
        req.leaveStatus := status;
        req.respondedAt := ?Time.now();
        true;
      };
      case null false;
    };
  };

  public func deleteLeaveRequest(
    requests : List.List<LeaveRequest>,
    id : CommonTypes.LeaveRequestId,
  ) : Bool {
    let sizeBefore = requests.size();
    let filtered = requests.filter(func(r) { r.id != id });
    requests.clear();
    requests.append(filtered);
    requests.size() < sizeBefore;
  };

  public func deleteForStudent(
    requests : List.List<LeaveRequest>,
    studentId : CommonTypes.StudentId,
  ) {
    let filtered = requests.filter(func(r) { r.studentId != studentId });
    requests.clear();
    requests.append(filtered);
  };
};
