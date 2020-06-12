import React from "react";

import Home from "./Home";
import User from "./Profile/User";

const Profile = () => {
  return <></>;
  // return localStorage.getItem("role") === "user" ? <User /> : <Writer />;
};

export default Home(Profile);
