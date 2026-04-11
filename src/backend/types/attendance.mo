import CommonTypes "common";

module {
  public type AttendanceRecord = {
    id : CommonTypes.AttendanceId;
    studentId : CommonTypes.StudentId;
    date : Text;
    status : CommonTypes.AttendanceStatus;
    markedAt : CommonTypes.Timestamp;
  };

  public type AttendanceSummary = {
    total : Nat;
    present : Nat;
    absent : Nat;
    late : Nat;
  };
};
