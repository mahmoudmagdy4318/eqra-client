import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";


const App = () => {
  return (
    <div>
      <>
        <BrowserRouter>
          <Route key="login" exact path="/login" render={() => <Login />} />
          <Route key="signup" exact path="/register" render={() => <SignUp />}
          />
          {/* <Route key="home" exact path="/" render={() => <Home />} /> */}
        </BrowserRouter>
      </>
    </div>
  );
};

export default App;
