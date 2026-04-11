import CommonTypes "common";

module {
  public type LeaveRequest = {
    id : CommonTypes.LeaveRequestId;
    studentId : CommonTypes.StudentId;
    startDate : Text;
    endDate : Text;
    reason : Text;
    var leaveStatus : CommonTypes.LeaveStatus;
    submittedAt : CommonTypes.Timestamp;
    var respondedAt : ?CommonTypes.Timestamp;
  };

  public type LeaveRequestView = {
    id : CommonTypes.LeaveRequestId;
    studentId : CommonTypes.StudentId;
    startDate : Text;
    endDate : Text;
    reason : Text;
    leaveStatus : CommonTypes.LeaveStatus;
    submittedAt : CommonTypes.Timestamp;
    respondedAt : ?CommonTypes.Timestamp;
  };

  public type LeaveRequestInput = {
    startDate : Text;
    endDate : Text;
    reason : Text;
  };
};
