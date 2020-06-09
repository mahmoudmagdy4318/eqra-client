import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faUpload,
  faReply,
  faRetweet,
  faHeart,
  faEdit,
  faTrash,
  faHome,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import PostLikes from "./Likes/Post_Likes";
import Test from "./Layout/test";
import SinglePost from "./Posts/SinglePost";
import {
  faEnvelope,
  faKey,
  faUpload,
  faReply,
  faRetweet,
  faHeart,
  faEdit,
  faTrash,
  faHome,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEnvelope,
  faKey,
  faUpload,
  faReply,
  faRetweet,
  faHeart,
  faEdit,
  faTrash,
  faHome,
  faBell,
  faUserCircle
);
import UserCategory from "./Category/Category";
import Home from "./Layout/Home";
import ProtectedRoute from "./components/common/protecteRoute";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./auth/Logout";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faUpload,
  faReply,
  faRetweet,
  faHeart,
  faEdit,
  faTrash,
  faHome,
  faBell,
  faUserCircle,
  faPlus,
  faComment,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import ProtectedRoute from "./ProtectedRoute";

library.add(
  faEnvelope,
  faKey,
  faUpload,
  faReply,
  faRetweet,
  faHeart,
  faEdit,
  faTrash,
  faHome,
  faBell,
  faUserCircle,
  faPlus,
  faComment,
  faImage
);

const App = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        {/* <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="signup" exact path="/register" render={() => <SignUp />} />
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
        <Route key="home" exact path="/" render={() => <Test />} />
        <Route
          key="post"
          exact
          path="/post/:id"
          render={(routeprops) => (
            <SinglePost id={routeprops.match.params.id} />
          )}
        /> */}
        <Switch>
          <Route key="login" exact path="/login" render={() => <Login />} />
          <Route
            key="signup"
            exact
            path="/register"
            render={() => <SignUp />}
          />
          <Route key="logout" exact path="/logout" component={Logout} />
          {/* <Route key="home" exact path="/" render={() => <Home />} /> */}
          <ProtectedRoute
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
          <ProtectedRoute key="home" exact path="/" component={Home} />
          <Route
            key="category"
            exact
            path="/category"
            render={() => <UserCategory />}
          />
          <Route path="*" render={() => "404 Not Found"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
