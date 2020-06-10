import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import PostLikes from "./Likes/Post_Likes";
import Test from "./Layout/test";
import SinglePost from "./Posts/SinglePost";
import UserContext  from "./context/userContext";
import UserCategory from "./Category/Category";
import Home from "./Layout/Home";
import ProtectedRoute from "./components/common/protecteRoute";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./auth/Logout";
import http from "./services/httpService";
import Profile from './Layout/Profile';
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
  faImage
);

const App = () => {
  
  const getUser=()=>{
      http.get('http://localhost:8000/api/auth/user').then((data,error)=>{
        console.log(data);
      })    
  }

  useEffect(() => {
    const currentUser= getUser();
    console.log(currentUser);
  }, []);


  return (
    <div>
      {/* <ToastContainer /> */}
      <UserContext.Provider>
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
            <Route key="profile" exact path="/profile" render={() => <Profile />} />
            <Route
              key="category"
              exact
              path="/category"
              render={() => <UserCategory />}
            />
            <Route
              key="post"
              exact
              path="/post/:id"
              render={(routeprops) => (
                <SinglePost id={routeprops.match.params.id} />
              )}
            />
            <Route path="*" render={() => "404 Not Found"} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
};

export default App;
