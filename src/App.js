import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import PostLikes from "./Likes/Post_Likes";
import Home from "./Layout/Home";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faUpload, faReply, faRetweet, faHeart,
   faEdit, faTrash, faHome,faBell,faUserCircle} from '@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faKey, faUpload, faReply, faRetweet,
  faHeart, faEdit, faTrash, faHome, faBell, faUserCircle);
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
          path="/block/:id/likes"
          render={(routeprops) => (
            <PostLikes
              id={routeprops.match.params.id}
              type="comment"
              noOfLikes="56"
            />
          )}
        />
        <Route key="home" exact path="/" render={() => <Home />} />
      </BrowserRouter>
    </div>
  );
};

export default App;
