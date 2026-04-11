import List "mo:core/List";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";

import CoursesLib "lib/courses";
import StudentsLib "lib/students";
import AdmissionsLib "lib/admissions";
import NoticesLib "lib/notices";
import CertsLib "lib/certificates";
import AttendanceLib "lib/attendance";
import LeaveLib "lib/leave";

import AuthMixin "mixins/auth-api";
import CoursesMixin "mixins/courses-api";
import AdmissionsMixin "mixins/admissions-api";
import StudentsMixin "mixins/students-api";
import NoticesMixin "mixins/notices-api";
import CertsMixin "mixins/certificates-api";
import AttendanceMixin "mixins/attendance-api";
import LeaveMixin "mixins/leave-api";

import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinObjectStorage();

  let courses = List.empty<CoursesLib.Course>();
  let applications = List.empty<AdmissionsLib.AdmissionApplication>();
  let students = List.empty<StudentsLib.Student>();
  let notices = List.empty<NoticesLib.Notice>();
  let certificates = List.empty<CertsLib.Certificate>();
  let attendance = List.empty<AttendanceLib.AttendanceRecord>();
  let leaveRequests = List.empty<LeaveLib.LeaveRequest>();

  // Seed predefined courses on first run
  CoursesLib.seedCourses(courses);

  include AuthMixin();
  include CoursesMixin(courses);
  include AdmissionsMixin(applications);
  include StudentsMixin(students, attendance, leaveRequests);
  include NoticesMixin(notices);
  include CertsMixin(certificates, students, courses);
  include AttendanceMixin(attendance, students);
  include LeaveMixin(leaveRequests, students);
};
