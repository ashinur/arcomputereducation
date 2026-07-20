import { test; suite; expect } "mo:test";
import List "mo:core/List";
import Students "../lib/students";

func makeInput(username : Text, password : Text, courseId : Text) : Students.StudentInput {
  {
    username;
    password;
    name = "Name " # username;
    email = username # "@example.com";
    phone = "0000000000";
    courseId;
    applicationId = null;
  };
};

suite(
  "Students",
  func() {
    test(
      "hashPassword is a stable identity transform",
      func() {
        expect.text(Students.hashPassword("secret")).equal("secret");
      },
    );

    test(
      "createStudent stores a new, not-yet-enrolled student",
      func() {
        let students = List.empty<Students.Student>();
        let s = Students.createStudent(students, 1, makeInput("asha", "pw", "DCA"));
        expect.nat(s.id).equal(1);
        expect.text(s.username).equal("asha");
        expect.bool(s.enrolled).isFalse();
        expect.bool(s.profilePicture == null).isTrue();
        expect.nat(students.size()).equal(1);
      },
    );

    test(
      "loginStudent succeeds with correct credentials",
      func() {
        let students = List.empty<Students.Student>();
        ignore Students.createStudent(students, 1, makeInput("asha", "pw", "DCA"));
        switch (Students.loginStudent(students, "asha", "pw")) {
          case (?s) expect.text(s.username).equal("asha");
          case null expect.bool(false).isTrue();
        };
      },
    );

    test(
      "loginStudent fails with a wrong password or unknown user",
      func() {
        let students = List.empty<Students.Student>();
        ignore Students.createStudent(students, 1, makeInput("asha", "pw", "DCA"));
        expect.bool(Students.loginStudent(students, "asha", "nope") == null).isTrue();
        expect.bool(Students.loginStudent(students, "ghost", "pw") == null).isTrue();
      },
    );

    test(
      "getStudent and getStudentByUsername look up correctly",
      func() {
        let students = List.empty<Students.Student>();
        ignore Students.createStudent(students, 7, makeInput("asha", "pw", "DCA"));
        switch (Students.getStudent(students, 7)) {
          case (?s) expect.text(s.username).equal("asha");
          case null expect.bool(false).isTrue();
        };
        expect.bool(Students.getStudent(students, 999) == null).isTrue();
        switch (Students.getStudentByUsername(students, "asha")) {
          case (?s) expect.nat(s.id).equal(7);
          case null expect.bool(false).isTrue();
        };
        expect.bool(Students.getStudentByUsername(students, "ghost") == null).isTrue();
      },
    );

    test(
      "updateStudent applies only the provided fields",
      func() {
        let students = List.empty<Students.Student>();
        ignore Students.createStudent(students, 1, makeInput("asha", "pw", "DCA"));
        let ok = Students.updateStudent(students, 1, { name = ?"New Name"; email = null; phone = null; courseId = ?"ADCA"; enrolled = ?true });
        expect.bool(ok).isTrue();
        switch (Students.getStudent(students, 1)) {
          case (?s) {
            expect.text(s.name).equal("New Name");
            expect.text(s.courseId).equal("ADCA");
            expect.bool(s.enrolled).isTrue();
            expect.text(s.email).equal("asha@example.com");
          };
          case null expect.bool(false).isTrue();
        };
      },
    );

    test(
      "updateStudent returns false for an unknown id",
      func() {
        let students = List.empty<Students.Student>();
        let ok = Students.updateStudent(students, 42, { name = ?"x"; email = null; phone = null; courseId = null; enrolled = null });
        expect.bool(ok).isFalse();
      },
    );

    test(
      "updateProfilePicture sets the picture data",
      func() {
        let students = List.empty<Students.Student>();
        ignore Students.createStudent(students, 1, makeInput("asha", "pw", "DCA"));
        expect.bool(Students.updateProfilePicture(students, 1, "data:image/png;base64,xxx")).isTrue();
        switch (Students.getStudent(students, 1)) {
          case (?s) expect.bool(s.profilePicture == ?"data:image/png;base64,xxx").isTrue();
          case null expect.bool(false).isTrue();
        };
        expect.bool(Students.updateProfilePicture(students, 999, "x")).isFalse();
      },
    );

    test(
      "deleteStudent removes only the requested student",
      func() {
        let students = List.empty<Students.Student>();
        ignore Students.createStudent(students, 1, makeInput("a", "pw", "DCA"));
        ignore Students.createStudent(students, 2, makeInput("b", "pw", "DCA"));
        expect.bool(Students.deleteStudent(students, 1)).isTrue();
        expect.nat(students.size()).equal(1);
        expect.bool(Students.deleteStudent(students, 1)).isFalse();
      },
    );

    test(
      "listStudents returns a view of every student",
      func() {
        let students = List.empty<Students.Student>();
        ignore Students.createStudent(students, 1, makeInput("a", "pw", "DCA"));
        ignore Students.createStudent(students, 2, makeInput("b", "pw", "DCA"));
        expect.nat(Students.listStudents(students).size()).equal(2);
      },
    );
  },
);
