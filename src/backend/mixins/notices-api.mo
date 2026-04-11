import List "mo:core/List";
import Runtime "mo:core/Runtime";
import NoticeTypes "../types/notices";
import CommonTypes "../types/common";
import NoticesLib "../lib/notices";
import AuthLib "../lib/auth";

mixin (
  _notices : List.List<NoticesLib.Notice>,
) {
  var _nextNoticeId : Nat = 1;

  public query func listNotices() : async [NoticeTypes.Notice] {
    NoticesLib.listNotices(_notices);
  };

  public query func getNotice(id : CommonTypes.NoticeId) : async ?NoticeTypes.Notice {
    NoticesLib.getNotice(_notices, id);
  };

  // Admin only
  public shared func adminPostNotice(
    loginId : Text,
    password : Text,
    title : Text,
    content : Text,
  ) : async NoticeTypes.Notice {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    let notice = NoticesLib.postNotice(_notices, _nextNoticeId, title, content);
    _nextNoticeId += 1;
    notice;
  };

  public shared func adminDeleteNotice(
    loginId : Text,
    password : Text,
    id : CommonTypes.NoticeId,
  ) : async Bool {
    if (not AuthLib.verifyAdmin(loginId, password)) Runtime.trap("Unauthorized");
    NoticesLib.deleteNotice(_notices, id);
  };
};
