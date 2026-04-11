module {
  public let ADMIN_LOGIN_ID : Text = "arcomputereducation.com";
  public let ADMIN_PASSWORD : Text = "Ashinur@123";

  public func verifyAdmin(loginId : Text, password : Text) : Bool {
    loginId == ADMIN_LOGIN_ID and password == ADMIN_PASSWORD;
  };
};
