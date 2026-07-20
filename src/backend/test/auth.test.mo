import { test; suite; expect } "mo:test";
import Auth "../lib/auth";

suite(
  "Auth",
  func() {
    test(
      "verifyAdmin accepts the correct credentials",
      func() {
        expect.bool(Auth.verifyAdmin(Auth.ADMIN_LOGIN_ID, Auth.ADMIN_PASSWORD)).isTrue();
      },
    );

    test(
      "verifyAdmin rejects a wrong password",
      func() {
        expect.bool(Auth.verifyAdmin(Auth.ADMIN_LOGIN_ID, "wrong")).isFalse();
      },
    );

    test(
      "verifyAdmin rejects a wrong login id",
      func() {
        expect.bool(Auth.verifyAdmin("someone@else.com", Auth.ADMIN_PASSWORD)).isFalse();
      },
    );

    test(
      "verifyAdmin rejects empty credentials",
      func() {
        expect.bool(Auth.verifyAdmin("", "")).isFalse();
      },
    );

    test(
      "verifyAdmin is case sensitive on the login id",
      func() {
        expect.bool(Auth.verifyAdmin("ARCOMPUTEREDUCATION.COM", Auth.ADMIN_PASSWORD)).isFalse();
      },
    );
  },
);
