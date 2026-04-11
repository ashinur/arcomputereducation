import CommonTypes "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type AdmissionApplication = {
    id : CommonTypes.ApplicationId;
    name : Text;
    email : Text;
    phone : Text;
    courseId : CommonTypes.CourseId;
    var status : CommonTypes.ApplicationStatus;
    photo : ?Storage.ExternalBlob;
    aadhaar : ?Storage.ExternalBlob;
    marksheet10 : ?Storage.ExternalBlob;
    marksheet12 : ?Storage.ExternalBlob;
    passCertificate : ?Storage.ExternalBlob;
    submittedAt : CommonTypes.Timestamp;
  };

  public type AdmissionApplicationView = {
    id : CommonTypes.ApplicationId;
    name : Text;
    email : Text;
    phone : Text;
    courseId : CommonTypes.CourseId;
    status : CommonTypes.ApplicationStatus;
    photo : ?Storage.ExternalBlob;
    aadhaar : ?Storage.ExternalBlob;
    marksheet10 : ?Storage.ExternalBlob;
    marksheet12 : ?Storage.ExternalBlob;
    passCertificate : ?Storage.ExternalBlob;
    submittedAt : CommonTypes.Timestamp;
  };

  public type ApplicationInput = {
    name : Text;
    email : Text;
    phone : Text;
    courseId : CommonTypes.CourseId;
    photo : ?Storage.ExternalBlob;
    aadhaar : ?Storage.ExternalBlob;
    marksheet10 : ?Storage.ExternalBlob;
    marksheet12 : ?Storage.ExternalBlob;
    passCertificate : ?Storage.ExternalBlob;
  };
};
