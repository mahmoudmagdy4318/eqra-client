import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import PrimarySearchAppBar from "./Layout/NavBar";
// import MiniDrawer from "./Layout/SideBar";
// import { red } from "@material-ui/core/colors";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "./Layout/Home";

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="signup" exact path="/register" render={() => <SignUp />} />
        <Route key="home" exact path="/" render={() => <Home />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
