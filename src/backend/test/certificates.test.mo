import { test; suite; expect } "mo:test";
import List "mo:core/List";
import Certificates "../lib/certificates";

suite(
  "Certificates",
  func() {
    test(
      "issueCertificate stores the certificate and builds a code",
      func() {
        let certs = List.empty<Certificates.Certificate>();
        let c = Certificates.issueCertificate(certs, 5, 12, "Asha", "DCA", "Diploma");
        expect.nat(c.id).equal(5);
        expect.nat(c.studentId).equal(12);
        expect.text(c.studentName).equal("Asha");
        expect.text(c.courseName).equal("Diploma");
        expect.text(c.certificateCode).equal("ARCE-DCA-12-5");
        expect.nat(certs.size()).equal(1);
      },
    );

    test(
      "listCertificates returns all issued certificates",
      func() {
        let certs = List.empty<Certificates.Certificate>();
        ignore Certificates.issueCertificate(certs, 1, 1, "A", "DCA", "Diploma");
        ignore Certificates.issueCertificate(certs, 2, 2, "B", "ADCA", "Advanced");
        expect.nat(Certificates.listCertificates(certs).size()).equal(2);
      },
    );

    test(
      "getCertificate finds a certificate by id",
      func() {
        let certs = List.empty<Certificates.Certificate>();
        ignore Certificates.issueCertificate(certs, 3, 9, "A", "DCA", "Diploma");
        switch (Certificates.getCertificate(certs, 3)) {
          case (?c) expect.nat(c.studentId).equal(9);
          case null expect.bool(false).isTrue();
        };
        expect.bool(Certificates.getCertificate(certs, 100) == null).isTrue();
      },
    );

    test(
      "getCertificatesForStudent filters by student",
      func() {
        let certs = List.empty<Certificates.Certificate>();
        ignore Certificates.issueCertificate(certs, 1, 7, "A", "DCA", "Diploma");
        ignore Certificates.issueCertificate(certs, 2, 7, "A", "EXCEL", "Excel");
        ignore Certificates.issueCertificate(certs, 3, 8, "B", "DCA", "Diploma");
        expect.nat(Certificates.getCertificatesForStudent(certs, 7).size()).equal(2);
        expect.nat(Certificates.getCertificatesForStudent(certs, 8).size()).equal(1);
        expect.nat(Certificates.getCertificatesForStudent(certs, 999).size()).equal(0);
      },
    );

    test(
      "deleteCertificate removes only the requested certificate",
      func() {
        let certs = List.empty<Certificates.Certificate>();
        ignore Certificates.issueCertificate(certs, 1, 1, "A", "DCA", "Diploma");
        ignore Certificates.issueCertificate(certs, 2, 2, "B", "ADCA", "Advanced");
        expect.bool(Certificates.deleteCertificate(certs, 1)).isTrue();
        expect.nat(certs.size()).equal(1);
        expect.bool(Certificates.deleteCertificate(certs, 1)).isFalse();
      },
    );
  },
);
