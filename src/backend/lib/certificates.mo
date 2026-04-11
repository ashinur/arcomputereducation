import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/certificates";
import CommonTypes "../types/common";

module {
  public type Certificate = Types.Certificate;

  func makeCertCode(id : Nat, studentId : CommonTypes.StudentId, courseId : CommonTypes.CourseId) : Text {
    "ARCE-" # courseId # "-" # studentId.toText() # "-" # id.toText();
  };

  public func issueCertificate(
    certificates : List.List<Certificate>,
    nextId : Nat,
    studentId : CommonTypes.StudentId,
    studentName : Text,
    courseId : CommonTypes.CourseId,
    courseName : Text,
  ) : Certificate {
    let cert : Certificate = {
      id = nextId;
      studentId = studentId;
      studentName = studentName;
      courseName = courseName;
      courseId = courseId;
      issuedAt = Time.now();
      certificateCode = makeCertCode(nextId, studentId, courseId);
    };
    certificates.add(cert);
    cert;
  };

  public func listCertificates(certificates : List.List<Certificate>) : [Certificate] {
    certificates.toArray();
  };

  public func getCertificate(certificates : List.List<Certificate>, id : CommonTypes.CertificateId) : ?Certificate {
    certificates.find(func(c) { c.id == id });
  };

  public func getCertificatesForStudent(
    certificates : List.List<Certificate>,
    studentId : CommonTypes.StudentId,
  ) : [Certificate] {
    certificates.filter(func(c) { c.studentId == studentId }).toArray();
  };

  public func deleteCertificate(
    certificates : List.List<Certificate>,
    id : CommonTypes.CertificateId,
  ) : Bool {
    let sizeBefore = certificates.size();
    let filtered = certificates.filter(func(c) { c.id != id });
    certificates.clear();
    certificates.append(filtered);
    certificates.size() < sizeBefore;
  };
};
