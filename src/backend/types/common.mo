module {
  public type Timestamp = Int;
  public type StudentId = Nat;
  public type ApplicationId = Nat;
  public type NoticeId = Nat;
  public type CertificateId = Nat;
  public type AttendanceId = Nat;
  public type LeaveRequestId = Nat;

  public type ApplicationStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type AttendanceStatus = {
    #present;
    #absent;
    #late;
  };

  public type LeaveStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type CourseId = Text;
};
