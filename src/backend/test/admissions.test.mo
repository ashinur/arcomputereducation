import { test; suite; expect } "mo:test";
import List "mo:core/List";
import Admissions "../lib/admissions";

func makeInput(name : Text, courseId : Text) : Admissions.ApplicationInput {
  {
    name;
    email = name # "@example.com";
    phone = "0000000000";
    courseId;
    photo = null;
    aadhaar = null;
    marksheet10 = null;
    marksheet12 = null;
    passCertificate = null;
  };
};

suite(
  "Admissions",
  func() {
    test(
      "submitApplication stores a pending application",
      func() {
        let apps = List.empty<Admissions.AdmissionApplication>();
        let a = Admissions.submitApplication(apps, 1, makeInput("Asha", "DCA"));
        expect.nat(a.id).equal(1);
        expect.text(a.name).equal("Asha");
        expect.text(a.courseId).equal("DCA");
        expect.bool(a.status == #pending).isTrue();
        expect.nat(apps.size()).equal(1);
      },
    );

    test(
      "listApplications returns all applications",
      func() {
        let apps = List.empty<Admissions.AdmissionApplication>();
        ignore Admissions.submitApplication(apps, 1, makeInput("A", "DCA"));
        ignore Admissions.submitApplication(apps, 2, makeInput("B", "ADCA"));
        expect.nat(Admissions.listApplications(apps).size()).equal(2);
      },
    );

    test(
      "getApplication finds an existing application",
      func() {
        let apps = List.empty<Admissions.AdmissionApplication>();
        ignore Admissions.submitApplication(apps, 9, makeInput("Asha", "DCA"));
        switch (Admissions.getApplication(apps, 9)) {
          case (?a) expect.text(a.name).equal("Asha");
          case null expect.bool(false).isTrue();
        };
        expect.bool(Admissions.getApplication(apps, 100) == null).isTrue();
      },
    );

    test(
      "updateApplicationStatus changes the status",
      func() {
        let apps = List.empty<Admissions.AdmissionApplication>();
        ignore Admissions.submitApplication(apps, 1, makeInput("A", "DCA"));
        expect.bool(Admissions.updateApplicationStatus(apps, 1, #approved)).isTrue();
        switch (Admissions.getApplication(apps, 1)) {
          case (?a) expect.bool(a.status == #approved).isTrue();
          case null expect.bool(false).isTrue();
        };
      },
    );

    test(
      "updateApplicationStatus returns false for an unknown id",
      func() {
        let apps = List.empty<Admissions.AdmissionApplication>();
        expect.bool(Admissions.updateApplicationStatus(apps, 1, #rejected)).isFalse();
      },
    );

    test(
      "deleteApplication removes only the requested application",
      func() {
        let apps = List.empty<Admissions.AdmissionApplication>();
        ignore Admissions.submitApplication(apps, 1, makeInput("A", "DCA"));
        ignore Admissions.submitApplication(apps, 2, makeInput("B", "ADCA"));
        expect.bool(Admissions.deleteApplication(apps, 1)).isTrue();
        expect.nat(apps.size()).equal(1);
        expect.bool(Admissions.deleteApplication(apps, 1)).isFalse();
      },
    );
  },
);
