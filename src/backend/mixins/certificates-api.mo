import List "mo:core/List";
import Runtime "mo:core/Runtime";
import CertTypes "../types/certificates";
import CommonTypes "../types/common";
import CertsLib "../lib/certificates";
import StudentsLib "../lib/students";
import CoursesLib "../lib/courses";
import AuthLib "../lib/auth";

mixin (
  _certificates : List.List<CertsLib.Certificate>,
  _students : List.List<StudentsLib.Student>,
  _courses : List.List<CoursesLib.Course>,
) {
  var _nextCertId : Nat = 1;

  public query func getStudentCertificates(studentId : CommonTypes.StudentId) : async [CertTypes.Certificate] {
    CertsLib.getCertificatesForStudent(_certificates, studentId);
  };

  public query func getCertificate(id : CommonTypes.CertificateId) : async ?CertTypes.Certificate {
    CertsLib.getCertificate(_certificates, id);
  };

  // Admin only
  public shared func adminIssueCertificate(
    loginId : Text,
    password : Text,
    studentId : CommonTypes.StudentId,
  ) : async CertTypes.Certificate {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    let student = switch (StudentsLib.getStudent(_students, studentId)) {
      case (?s) s;
      case null Runtime.trap("Student not found");
    };
    let course = switch (CoursesLib.getCourse(_courses, student.courseId)) {
      case (?c) c;
      case null Runtime.trap("Course not found");
    };
    let cert = CertsLib.issueCertificate(
      _certificates,
      _nextCertId,
      studentId,
      student.name,
      student.courseId,
      course.name,
    );
    _nextCertId += 1;
    cert;
  };

  public query func adminListCertificates(loginId : Text, password : Text) : async [CertTypes.Certificate] {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    CertsLib.listCertificates(_certificates);
  };

  // Admin: delete a certificate
  public shared func adminDeleteCertificate(
    loginId : Text,
    password : Text,
    certificateId : CommonTypes.CertificateId,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    CertsLib.deleteCertificate(_certificates, certificateId);
  };
};
