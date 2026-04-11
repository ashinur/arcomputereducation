import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/students";
import CommonTypes "../types/common";

module {
  public type Student = Types.Student;
  public type StudentView = Types.StudentView;
  public type StudentInput = Types.StudentInput;
  public type StudentUpdateInput = Types.StudentUpdateInput;

  public func toView(student : Student) : StudentView {
    {
      id = student.id;
      username = student.username;
      name = student.name;
      email = student.email;
      phone = student.phone;
      courseId = student.courseId;
      enrolled = student.enrolled;
      profilePicture = student.profilePicture;
      applicationId = student.applicationId;
      createdAt = student.createdAt;
    };
  };

  // Simple password storage (no real hashing on ICP — store as-is or use a trivial transform)
  public func hashPassword(password : Text) : Text {
    password;
  };

  public func createStudent(
    students : List.List<Student>,
    nextId : Nat,
    input : StudentInput,
  ) : StudentView {
    let student : Student = {
      id = nextId;
      var username = input.username;
      var passwordHash = hashPassword(input.password);
      var name = input.name;
      var email = input.email;
      var phone = input.phone;
      var courseId = input.courseId;
      var enrolled = false;
      var profilePicture = null;
      applicationId = input.applicationId;
      createdAt = Time.now();
    };
    students.add(student);
    toView(student);
  };

  public func loginStudent(
    students : List.List<Student>,
    username : Text,
    password : Text,
  ) : ?StudentView {
    let hashed = hashPassword(password);
    switch (students.find(func(s) { s.username == username and s.passwordHash == hashed })) {
      case (?s) ?toView(s);
      case null null;
    };
  };

  public func getStudent(students : List.List<Student>, id : CommonTypes.StudentId) : ?StudentView {
    switch (students.find(func(s) { s.id == id })) {
      case (?s) ?toView(s);
      case null null;
    };
  };

  public func getStudentByUsername(students : List.List<Student>, username : Text) : ?StudentView {
    switch (students.find(func(s) { s.username == username })) {
      case (?s) ?toView(s);
      case null null;
    };
  };

  public func updateStudent(
    students : List.List<Student>,
    id : CommonTypes.StudentId,
    input : StudentUpdateInput,
  ) : Bool {
    switch (students.find(func(s) { s.id == id })) {
      case (?s) {
        switch (input.name) { case (?v) s.name := v; case null {} };
        switch (input.email) { case (?v) s.email := v; case null {} };
        switch (input.phone) { case (?v) s.phone := v; case null {} };
        switch (input.courseId) { case (?v) s.courseId := v; case null {} };
        switch (input.enrolled) { case (?v) s.enrolled := v; case null {} };
        true;
      };
      case null false;
    };
  };

  public func updateProfilePicture(
    students : List.List<Student>,
    id : CommonTypes.StudentId,
    pictureData : Text,
  ) : Bool {
    switch (students.find(func(s) { s.id == id })) {
      case (?s) {
        s.profilePicture := ?pictureData;
        true;
      };
      case null false;
    };
  };

  public func deleteStudent(
    students : List.List<Student>,
    id : CommonTypes.StudentId,
  ) : Bool {
    let sizeBefore = students.size();
    let filtered = students.filter(func(s) { s.id != id });
    students.clear();
    students.append(filtered);
    students.size() < sizeBefore;
  };

  public func listStudents(students : List.List<Student>) : [StudentView] {
    students.map<Student, StudentView>(toView).toArray();
  };
};
