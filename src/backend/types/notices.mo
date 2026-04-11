import CommonTypes "common";

module {
  public type Notice = {
    id : CommonTypes.NoticeId;
    title : Text;
    content : Text;
    postedAt : CommonTypes.Timestamp;
  };
};
