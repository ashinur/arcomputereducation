import Crypto "crypto";

module {
  public let ADMIN_LOGIN_ID : Text = "arcomputereducation.com";

  // SHA-256 hash of the admin password (peppered). The plaintext password is
  // intentionally NOT stored in source. Rotate by replacing this hash with the
  // output of Crypto.hashSecret(newPassword). NOTE: the admin credential is
  // still a shared secret sent by the client on every request; migrating admin
  // auth to Internet Identity / principal-based control is the recommended
  // long-term fix.
  public let ADMIN_PASSWORD_HASH : Text = "add0df10f69ab2e51b05f66bc4c161432b29de520110bc42cc8219ab9ac79622";

  public func verifyAdmin(loginId : Text, password : Text) : Bool {
    loginId == ADMIN_LOGIN_ID and Crypto.hashSecret(password) == ADMIN_PASSWORD_HASH;
  };
};
