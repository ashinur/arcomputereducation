import AuthLib "../lib/auth";

mixin () {
  public shared func adminLogin(loginId : Text, password : Text) : async Bool {
    AuthLib.verifyAdmin(loginId, password);
  };
};
