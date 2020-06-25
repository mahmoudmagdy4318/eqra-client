import React, { useState, useEffect } from "react";
import http from "../services/httpService";
import FollowersService from "../services/FollowersService";

export const UserContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({});
  const [currentUserFollowersId, setCurrentUserFollowersId] = useState([]);
  const getMyFollowers = async () => {
    const result = await FollowersService.searchForUser();
    setCurrentUserFollowersId(result.myFollowersIds);
  };
  const setAuthData = () =>
    http
      .get("http://localhost:8000/api/auth/user")
      .then(({ data: { user } }) => {
        setUser(user);
      });

  useEffect(() => {
    setAuthData();
    // getMyFollowers();

  }, []);

  return (
    <UserContext.Provider value={{ data: { user, currentUserFollowersId }, actions: { setAuthData } }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default Provider;
