import List "mo:core/List";
import CommonTypes "types/common";
import CoursesTypes "types/courses";
import StudentsTypes "types/students";

module {
  // Old types (from previous deployed version)
  type OldCourse = {
    id : CommonTypes.CourseId;
    name : Text;
    description : Text;
    durationMonths : Nat;
  };

  type OldStudent = {
    id : CommonTypes.StudentId;
    var username : Text;
    var passwordHash : Text;
    var name : Text;
    var email : Text;
    var phone : Text;
    var courseId : CommonTypes.CourseId;
    var enrolled : Bool;
    applicationId : ?CommonTypes.ApplicationId;
    createdAt : CommonTypes.Timestamp;
  };

  type OldActor = {
    courses : List.List<OldCourse>;
    students : List.List<OldStudent>;
  };

  type NewActor = {
    courses : List.List<CoursesTypes.Course>;
    students : List.List<StudentsTypes.Student>;
  };

  public func run(old : OldActor) : NewActor {
    let courses = old.courses.map<OldCourse, CoursesTypes.Course>(
      func(c) {
        {
          id = c.id;
          name = c.name;
          description = c.description;
          durationMonths = c.durationMonths;
          benefits = [];
        }
      }
    );
    let students = old.students.map<OldStudent, StudentsTypes.Student>(
      func(s) {
        {
          id = s.id;
          var username = s.username;
          var passwordHash = s.passwordHash;
          var name = s.name;
          var email = s.email;
          var phone = s.phone;
          var courseId = s.courseId;
          var enrolled = s.enrolled;
          var profilePicture = null;
          applicationId = s.applicationId;
          createdAt = s.createdAt;
        }
      }
    );
    { courses; students };
  };
};
