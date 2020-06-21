import React from "react";
import User from "./Profile/User";
import Writer from "./Profile/Writer";

const Profile = (props) => {
  const { id } = props;
  console.log(id);
  return localStorage.getItem("role") === "user" ? <User id={id}/> : <Writer id={id}/>;
};

export default Profile;
