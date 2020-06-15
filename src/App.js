import React, { useEffect, Profiler } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import PostLikes from "./Likes/Post_Likes";
import Test from "./Layout/test";
import SinglePost from "./Posts/SinglePost";
import UserContext from "./context/userContext";
// Category & Events
import UserCategory from "./Category/Category";
import CreateEvent from "./Event/CreateEvent";
import EventDetails from "./Event/EventDetails";
import AllEvents from "./Event/AllEvents";
import Home from "./Layout/Home";
import ProtectedRoute from "./components/common/protecteRoute";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./auth/Logout";
import http from "./services/httpService";
// import Profile from './Layout/Profile';
import { library } from "@fortawesome/fontawesome-svg-core";
import auth from "./services/authService";
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
  faUserPlus,
  faCamera,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import Profile from "./Layout/Profile";
import EditUserProfile from "./Layout/Profile/EditUserProfile";
import TrendsPosts from "./Trends/TrendsPosts";
// import ProtectedRoute from "./ProtectedRoute";

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
  faImage,
  faUserPlus,
  faCamera,
  faCalendarWeek
);

const App = () => {
  return (
    <div>
      {/* <ToastContainer /> */}
      <UserContext>
        <BrowserRouter>
          <Switch>
            <Route key="login" exact path="/login" render={() => <Login />} />
            <Route
              key="signup"
              exact
              path="/register"
              render={() => <SignUp />}
            />
            <Route key="logout" exact path="/logout" component={Logout} />
            <Route key="home" exact path="/" render={() => <Test />} />
            <Route
              key="category"
              exact
              path="/category"
              render={() => <UserCategory />}
            />
            <Route
              key="createEvent"
              exact
              path="/newEvent"
              component={CreateEvent}
            />
            <Route
              key="createEvent"
              exact
              path="/events"
              component={AllEvents}
            />
            <Route
              key="createEvent"
              exact
              path="/event/:id"
              component={EventDetails}
            />
            <Route
              key="post"
              exact
              path="/post/:id"
              render={(routeprops) => (
                <SinglePost id={routeprops.match.params.id} />
              )}
            />
            <Route
              key="profile"
              exact
              path="/profile/:id"
              render={(routeprops) => (
                <Profile id={routeprops.match.params.id} />
              )}
            />
            <Route
              key="editUserProfile"
              exact
              path="/editprofile"
              component={EditUserProfile}
            />
            <Route
              key="trendsPosts"
              exact
              path="/search"
              render={() => <TrendsPosts />}
            />
            <Route path="*" render={() => "404 Not Found"} />
          </Switch>
        </BrowserRouter>
      </UserContext>
    </div>
  );
};

export default App;
