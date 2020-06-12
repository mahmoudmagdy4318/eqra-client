import React, { useState, useEffect } from "react";
import http from "../services/httpService";

export const UserContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({});
  const setAuthData = () =>
    http
      .get("http://localhost:8000/api/auth/user")
      .then(({ data: { user } }) => {
        debugger;
        setUser(user);
      });

  useEffect(() => {
    setAuthData();
  }, []);

  return (
    <UserContext.Provider value={{ data: { user }, actions: { setAuthData } }}>
      {props.children}
    </UserContext.Provider>
  );
};
export default Provider;
