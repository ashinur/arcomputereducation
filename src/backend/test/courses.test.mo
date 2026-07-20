import { test; suite; expect } "mo:test";
import List "mo:core/List";
import Courses "../lib/courses";

suite(
  "Courses",
  func() {
    test(
      "seedCourses populates the expected catalog",
      func() {
        let courses = List.empty<Courses.Course>();
        Courses.seedCourses(courses);
        expect.nat(courses.size()).equal(8);
      },
    );

    test(
      "seedCourses is idempotent",
      func() {
        let courses = List.empty<Courses.Course>();
        Courses.seedCourses(courses);
        Courses.seedCourses(courses);
        expect.nat(courses.size()).equal(8);
      },
    );

    test(
      "listCourses returns every seeded course",
      func() {
        let courses = List.empty<Courses.Course>();
        Courses.seedCourses(courses);
        expect.nat(Courses.listCourses(courses).size()).equal(8);
      },
    );

    test(
      "listCourses on an empty list returns nothing",
      func() {
        let courses = List.empty<Courses.Course>();
        expect.nat(Courses.listCourses(courses).size()).equal(0);
      },
    );

    test(
      "getCourse returns the matching course with its metadata",
      func() {
        let courses = List.empty<Courses.Course>();
        Courses.seedCourses(courses);
        switch (Courses.getCourse(courses, "DCA")) {
          case (?c) {
            expect.text(c.name).equal("DCA - Diploma in Computer Applications");
            expect.nat(c.durationMonths).equal(6);
            expect.bool(c.benefits.size() > 0).isTrue();
          };
          case null expect.bool(false).isTrue();
        };
      },
    );

    test(
      "getCourse returns null for an unknown id",
      func() {
        let courses = List.empty<Courses.Course>();
        Courses.seedCourses(courses);
        expect.bool(Courses.getCourse(courses, "NOPE") == null).isTrue();
      },
    );
  },
);
