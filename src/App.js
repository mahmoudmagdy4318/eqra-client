import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import PrimarySearchAppBar from "./Layout/NavBar";
// import MiniDrawer from "./Layout/SideBar";
// import { red } from "@material-ui/core/colors";

import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
<<<<<<< HEAD
import PostLikes from "./Likes/Post_Likes";
=======
import Home from "./Layout/Home";
>>>>>>> a8824b491b2b0c1fc59b6c1707b759de938b7bc1

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="signup" exact path="/register" render={() => <SignUp />} />
        {/* <Route key="home" exact path="/" render={() => <Home />} /> */}
        <Route
          key="postlikes"
          exact
          path="/post/:id/likes"
          render={(routeprops) => <PostLikes id={routeprops.match.params.id} />}
        />
        <Route key="home" exact path="/" render={() => <Home />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
