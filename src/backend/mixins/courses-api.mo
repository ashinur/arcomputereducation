import List "mo:core/List";
import CourseTypes "../types/courses";
import CoursesLib "../lib/courses";

mixin (_courses : List.List<CoursesLib.Course>) {
  public query func listCourses() : async [CourseTypes.Course] {
    CoursesLib.listCourses(_courses);
  };

  public query func getCourse(id : Text) : async ?CourseTypes.Course {
    CoursesLib.getCourse(_courses, id);
  };
};
