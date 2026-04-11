import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/attendance";
import CommonTypes "../types/common";

module {
  public type AttendanceRecord = Types.AttendanceRecord;
  public type AttendanceSummary = Types.AttendanceSummary;

  public func markAttendance(
    records : List.List<AttendanceRecord>,
    nextId : Nat,
    studentId : CommonTypes.StudentId,
    date : Text,
    status : CommonTypes.AttendanceStatus,
  ) : AttendanceRecord {
    let record : AttendanceRecord = {
      id = nextId;
      studentId = studentId;
      date = date;
      status = status;
      markedAt = Time.now();
    };
    records.add(record);
    record;
  };

  public func getStudentAttendance(
    records : List.List<AttendanceRecord>,
    studentId : CommonTypes.StudentId,
  ) : [AttendanceRecord] {
    records.filter(func(r) { r.studentId == studentId }).toArray();
  };

  public func getAttendanceSummary(
    records : List.List<AttendanceRecord>,
    studentId : CommonTypes.StudentId,
  ) : AttendanceSummary {
    let studentRecords = records.filter(func(r) { r.studentId == studentId });
    let total = studentRecords.size();
    let present = studentRecords.filter(func(r) { r.status == #present }).size();
    let absent = studentRecords.filter(func(r) { r.status == #absent }).size();
    let late = studentRecords.filter(func(r) { r.status == #late }).size();
    { total; present; absent; late };
  };

  public func deleteForStudent(
    records : List.List<AttendanceRecord>,
    studentId : CommonTypes.StudentId,
  ) {
    let filtered = records.filter(func(r) { r.studentId != studentId });
    records.clear();
    records.append(filtered);
  };
};
