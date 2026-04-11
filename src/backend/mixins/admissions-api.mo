import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AdmissionTypes "../types/admissions";
import CommonTypes "../types/common";
import AdmissionsLib "../lib/admissions";
import AuthLib "../lib/auth";

mixin (
  _applications : List.List<AdmissionsLib.AdmissionApplication>,
) {
  var _nextApplicationId : Nat = 1;

  public shared func submitApplication(input : AdmissionTypes.ApplicationInput) : async AdmissionTypes.AdmissionApplicationView {
    let view = AdmissionsLib.submitApplication(_applications, _nextApplicationId, input);
    _nextApplicationId += 1;
    view;
  };

  public query func getApplication(id : CommonTypes.ApplicationId) : async ?AdmissionTypes.AdmissionApplicationView {
    AdmissionsLib.getApplication(_applications, id);
  };

  // Admin only
  public shared func adminListApplications(loginId : Text, password : Text) : async [AdmissionTypes.AdmissionApplicationView] {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    AdmissionsLib.listApplications(_applications);
  };

  public shared func adminUpdateApplicationStatus(
    loginId : Text,
    password : Text,
    id : CommonTypes.ApplicationId,
    status : CommonTypes.ApplicationStatus,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    AdmissionsLib.updateApplicationStatus(_applications, id, status);
  };

  // Admin: delete an application
  public shared func adminDeleteApplication(
    loginId : Text,
    password : Text,
    applicationId : CommonTypes.ApplicationId,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    AdmissionsLib.deleteApplication(_applications, applicationId);
  };
};
