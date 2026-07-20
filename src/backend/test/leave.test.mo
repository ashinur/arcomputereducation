import { test; suite; expect } "mo:test";
import List "mo:core/List";
import Leave "../lib/leave";

suite(
  "Leave",
  func() {
    test(
      "submitLeaveRequest stores a pending request",
      func() {
        let requests = List.empty<Leave.LeaveRequest>();
        let r = Leave.submitLeaveRequest(requests, 1, 10, { startDate = "2026-01-01"; endDate = "2026-01-05"; reason = "Sick" });
        expect.nat(r.id).equal(1);
        expect.nat(r.studentId).equal(10);
        expect.text(r.reason).equal("Sick");
        expect.bool(r.leaveStatus == #pending).isTrue();
        expect.bool(r.respondedAt == null).isTrue();
        expect.nat(requests.size()).equal(1);
      },
    );

    test(
      "getStudentLeaveRequests filters by student",
      func() {
        let requests = List.empty<Leave.LeaveRequest>();
        ignore Leave.submitLeaveRequest(requests, 1, 1, { startDate = "a"; endDate = "b"; reason = "x" });
        ignore Leave.submitLeaveRequest(requests, 2, 1, { startDate = "a"; endDate = "b"; reason = "y" });
        ignore Leave.submitLeaveRequest(requests, 3, 2, { startDate = "a"; endDate = "b"; reason = "z" });
        expect.nat(Leave.getStudentLeaveRequests(requests, 1).size()).equal(2);
        expect.nat(Leave.getStudentLeaveRequests(requests, 2).size()).equal(1);
        expect.nat(Leave.getStudentLeaveRequests(requests, 3).size()).equal(0);
      },
    );

    test(
      "listAllLeaveRequests returns every request",
      func() {
        let requests = List.empty<Leave.LeaveRequest>();
        ignore Leave.submitLeaveRequest(requests, 1, 1, { startDate = "a"; endDate = "b"; reason = "x" });
        ignore Leave.submitLeaveRequest(requests, 2, 2, { startDate = "a"; endDate = "b"; reason = "y" });
        expect.nat(Leave.listAllLeaveRequests(requests).size()).equal(2);
      },
    );

    test(
      "respondLeaveRequest approves and stamps a response",
      func() {
        let requests = List.empty<Leave.LeaveRequest>();
        ignore Leave.submitLeaveRequest(requests, 1, 1, { startDate = "a"; endDate = "b"; reason = "x" });
        expect.bool(Leave.respondLeaveRequest(requests, 1, #approved)).isTrue();
        let all = Leave.listAllLeaveRequests(requests);
        expect.bool(all[0].leaveStatus == #approved).isTrue();
        expect.bool(all[0].respondedAt != null).isTrue();
      },
    );

    test(
      "respondLeaveRequest returns false for an unknown id",
      func() {
        let requests = List.empty<Leave.LeaveRequest>();
        expect.bool(Leave.respondLeaveRequest(requests, 1, #approved)).isFalse();
      },
    );

    test(
      "deleteLeaveRequest removes only the requested id",
      func() {
        let requests = List.empty<Leave.LeaveRequest>();
        ignore Leave.submitLeaveRequest(requests, 1, 1, { startDate = "a"; endDate = "b"; reason = "x" });
        ignore Leave.submitLeaveRequest(requests, 2, 1, { startDate = "a"; endDate = "b"; reason = "y" });
        expect.bool(Leave.deleteLeaveRequest(requests, 1)).isTrue();
        expect.nat(requests.size()).equal(1);
        expect.bool(Leave.deleteLeaveRequest(requests, 1)).isFalse();
      },
    );

    test(
      "deleteForStudent removes all of a student's requests",
      func() {
        let requests = List.empty<Leave.LeaveRequest>();
        ignore Leave.submitLeaveRequest(requests, 1, 1, { startDate = "a"; endDate = "b"; reason = "x" });
        ignore Leave.submitLeaveRequest(requests, 2, 1, { startDate = "a"; endDate = "b"; reason = "y" });
        ignore Leave.submitLeaveRequest(requests, 3, 2, { startDate = "a"; endDate = "b"; reason = "z" });
        Leave.deleteForStudent(requests, 1);
        expect.nat(requests.size()).equal(1);
        expect.nat(Leave.getStudentLeaveRequests(requests, 2).size()).equal(1);
      },
    );
  },
);
