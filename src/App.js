import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";

const App = () => {
  return (
    <div>
      <>
        <BrowserRouter>
          <Route key="login" exact path="/login" render={() => <Login />} />
          <Route
            key="signup"
            exact
            path="/register"
            render={() => <Signup />}
          />
          <Route key="home" exact path="/" render={() => <Home />} />
        </BrowserRouter>
      </>
    </div>
  );
};

export default App;
