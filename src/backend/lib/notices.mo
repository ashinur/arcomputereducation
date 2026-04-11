import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/notices";
import CommonTypes "../types/common";

module {
  public type Notice = Types.Notice;

  public func postNotice(
    notices : List.List<Notice>,
    nextId : Nat,
    title : Text,
    content : Text,
  ) : Notice {
    let notice : Notice = {
      id = nextId;
      title = title;
      content = content;
      postedAt = Time.now();
    };
    notices.add(notice);
    notice;
  };

  public func listNotices(notices : List.List<Notice>) : [Notice] {
    notices.toArray();
  };

  public func getNotice(notices : List.List<Notice>, id : CommonTypes.NoticeId) : ?Notice {
    notices.find(func(n) { n.id == id });
  };

  public func deleteNotice(notices : List.List<Notice>, id : CommonTypes.NoticeId) : Bool {
    let sizeBefore = notices.size();
    let filtered = notices.filter(func(n) { n.id != id });
    notices.clear();
    notices.append(filtered);
    notices.size() < sizeBefore;
  };
};
