import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import FollowersService from "../services/FollowersService";
import { getFollows } from "../Chat/service/follows";

export const UserContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({});
  const [follows, setFollows] = useState([]);
  const [followers, setFollowers] = useState([]);

  const getMyFollows = async () => {
    const { followingArray, followersArray } = await getFollows();
    setFollows(followingArray);
    setFollowers(followersArray);
  };

  const setAuthData = () =>
    http
      .get("http://localhost:8000/api/auth/user")
      .then(({ data: { user } }) => {
        setUser(user);
      });

  useEffect(() => {
    setAuthData();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("Authorization")) getMyFollows();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        data: { user, follows, followers },
        actions: { setAuthData, getMyFollows },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default Provider;
