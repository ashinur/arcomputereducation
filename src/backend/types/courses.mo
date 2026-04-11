import CommonTypes "common";

module {
  public type Course = {
    id : CommonTypes.CourseId;
    name : Text;
    description : Text;
    durationMonths : Nat;
    benefits : [Text];
  };
};
