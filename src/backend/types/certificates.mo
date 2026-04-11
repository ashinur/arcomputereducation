import CommonTypes "common";

module {
  public type Certificate = {
    id : CommonTypes.CertificateId;
    studentId : CommonTypes.StudentId;
    studentName : Text;
    courseName : Text;
    courseId : CommonTypes.CourseId;
    issuedAt : CommonTypes.Timestamp;
    certificateCode : Text;
  };
};
