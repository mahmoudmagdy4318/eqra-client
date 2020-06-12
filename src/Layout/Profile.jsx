import React from "react";
import User from "./Profile/User";
import Writer from "./Profile/Writer";
import Home from "./Home";

const Profile = () => {
  return localStorage.getItem("role") === "user" ? <User /> : <Writer />;
};

export default Profile;
