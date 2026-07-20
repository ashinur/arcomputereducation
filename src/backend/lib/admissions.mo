import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/admissions";
import CommonTypes "../types/common";
import Validate "validate";

module {
  public type AdmissionApplication = Types.AdmissionApplication;
  public type AdmissionApplicationView = Types.AdmissionApplicationView;
  public type ApplicationInput = Types.ApplicationInput;

  public func toView(app : AdmissionApplication) : AdmissionApplicationView {
    {
      id = app.id;
      name = app.name;
      email = app.email;
      phone = app.phone;
      courseId = app.courseId;
      status = app.status;
      photo = app.photo;
      aadhaar = app.aadhaar;
      marksheet10 = app.marksheet10;
      marksheet12 = app.marksheet12;
      passCertificate = app.passCertificate;
      submittedAt = app.submittedAt;
    };
  };

  public func submitApplication(
    applications : List.List<AdmissionApplication>,
    nextId : Nat,
    input : ApplicationInput,
  ) : AdmissionApplicationView {
    Validate.requireText(input.name, "name", 1, 100);
    Validate.requireText(input.email, "email", 3, 254);
    Validate.requireText(input.phone, "phone", 3, 20);
    Validate.requireText(input.courseId, "courseId", 1, 64);
    let app : AdmissionApplication = {
      id = nextId;
      name = input.name;
      email = input.email;
      phone = input.phone;
      courseId = input.courseId;
      var status = #pending;
      photo = input.photo;
      aadhaar = input.aadhaar;
      marksheet10 = input.marksheet10;
      marksheet12 = input.marksheet12;
      passCertificate = input.passCertificate;
      submittedAt = Time.now();
    };
    applications.add(app);
    toView(app);
  };

  public func listApplications(applications : List.List<AdmissionApplication>) : [AdmissionApplicationView] {
    let mapped = applications.map<AdmissionApplication, AdmissionApplicationView>(toView);
    mapped.toArray();
  };

  public func getApplication(applications : List.List<AdmissionApplication>, id : CommonTypes.ApplicationId) : ?AdmissionApplicationView {
    switch (applications.find(func(a) { a.id == id })) {
      case (?app) ?toView(app);
      case null null;
    };
  };

  public func updateApplicationStatus(
    applications : List.List<AdmissionApplication>,
    id : CommonTypes.ApplicationId,
    status : CommonTypes.ApplicationStatus,
  ) : Bool {
    switch (applications.find(func(a) { a.id == id })) {
      case (?app) {
        app.status := status;
        true;
      };
      case null false;
    };
  };

  public func deleteApplication(
    applications : List.List<AdmissionApplication>,
    id : CommonTypes.ApplicationId,
  ) : Bool {
    let sizeBefore = applications.size();
    let filtered = applications.filter(func(a) { a.id != id });
    applications.clear();
    applications.append(filtered);
    applications.size() < sizeBefore;
  };
};
