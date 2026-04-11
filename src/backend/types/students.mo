import CommonTypes "common";

module {
  public type Student = {
    id : CommonTypes.StudentId;
    var username : Text;
    var passwordHash : Text;
    var name : Text;
    var email : Text;
    var phone : Text;
    var courseId : CommonTypes.CourseId;
    var enrolled : Bool;
    var profilePicture : ?Text;
    applicationId : ?CommonTypes.ApplicationId;
    createdAt : CommonTypes.Timestamp;
  };

  public type StudentView = {
    id : CommonTypes.StudentId;
    username : Text;
    name : Text;
    email : Text;
    phone : Text;
    courseId : CommonTypes.CourseId;
    enrolled : Bool;
    profilePicture : ?Text;
    applicationId : ?CommonTypes.ApplicationId;
    createdAt : CommonTypes.Timestamp;
  };

  public type StudentInput = {
    username : Text;
    password : Text;
    name : Text;
    email : Text;
    phone : Text;
    courseId : CommonTypes.CourseId;
    applicationId : ?CommonTypes.ApplicationId;
  };

  public type StudentUpdateInput = {
    name : ?Text;
    email : ?Text;
    phone : ?Text;
    courseId : ?CommonTypes.CourseId;
    enrolled : ?Bool;
  };
};
