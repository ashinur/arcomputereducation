import { test; suite; expect } "mo:test";
import List "mo:core/List";
import Notices "../lib/notices";

suite(
  "Notices",
  func() {
    test(
      "postNotice stores a notice and returns it",
      func() {
        let notices = List.empty<Notices.Notice>();
        let n = Notices.postNotice(notices, 1, "Holiday", "Closed on Monday");
        expect.nat(n.id).equal(1);
        expect.text(n.title).equal("Holiday");
        expect.text(n.content).equal("Closed on Monday");
        expect.nat(notices.size()).equal(1);
      },
    );

    test(
      "listNotices returns notices in insertion order",
      func() {
        let notices = List.empty<Notices.Notice>();
        ignore Notices.postNotice(notices, 1, "First", "a");
        ignore Notices.postNotice(notices, 2, "Second", "b");
        let all = Notices.listNotices(notices);
        expect.nat(all.size()).equal(2);
        expect.text(all[0].title).equal("First");
        expect.text(all[1].title).equal("Second");
      },
    );

    test(
      "getNotice finds an existing notice",
      func() {
        let notices = List.empty<Notices.Notice>();
        ignore Notices.postNotice(notices, 7, "Exam", "Next week");
        switch (Notices.getNotice(notices, 7)) {
          case (?n) expect.text(n.title).equal("Exam");
          case null expect.bool(false).isTrue();
        };
      },
    );

    test(
      "getNotice returns null when missing",
      func() {
        let notices = List.empty<Notices.Notice>();
        expect.bool(Notices.getNotice(notices, 99) == null).isTrue();
      },
    );

    test(
      "deleteNotice removes an existing notice",
      func() {
        let notices = List.empty<Notices.Notice>();
        ignore Notices.postNotice(notices, 1, "A", "a");
        ignore Notices.postNotice(notices, 2, "B", "b");
        expect.bool(Notices.deleteNotice(notices, 1)).isTrue();
        expect.nat(notices.size()).equal(1);
        expect.bool(Notices.getNotice(notices, 1) == null).isTrue();
      },
    );

    test(
      "deleteNotice returns false for an unknown id",
      func() {
        let notices = List.empty<Notices.Notice>();
        ignore Notices.postNotice(notices, 1, "A", "a");
        expect.bool(Notices.deleteNotice(notices, 42)).isFalse();
        expect.nat(notices.size()).equal(1);
      },
    );
  },
);
