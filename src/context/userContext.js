import React, { useState, useEffect } from "react";
import http from "../services/httpService";

export const UserContext = React.createContext();

const Provider = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    http
      .get("http://localhost:8000/api/auth/user")
      .then(({ data: { user } }) => {
        setUser(user);
      });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};
export default Provider;
