import React from "react";
import User from "./Profile/User";
import Writer from "./Profile/Writer";

const Profile = ({role,id}) => {
  // const { id } = props;
  console.log("role,id",role,id);

  return role == "user" ? <User id={id}/> : <Writer id={id}/>;
};

export default Profile;
