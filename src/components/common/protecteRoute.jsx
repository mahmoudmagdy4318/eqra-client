import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from '../../services/authService';

const ProtecteRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getJwt()){
          return <Redirect to={{pathname:'/login'}} />
        }
      return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};


export default ProtecteRoute;
