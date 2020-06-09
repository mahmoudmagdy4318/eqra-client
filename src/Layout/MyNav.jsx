import React from "react";
import "../styles/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const MyNav = () => {
  return (
    <>
      <nav className="nav my-nav">
        <Link className="menu-item m-md-3 pb-2" href="#">
          <FontAwesomeIcon item icon="home" size="1x" className="mt-3 mx-1" />
          <span className="mt-2 pt-1 ml-2">Home</span>
        </Link>

        <Link className="menu-item m-md-3 pb-2" href="#">
          <FontAwesomeIcon item icon="bell" size="1x" className="mt-3 mx-1" />
          <span className="mt-2 pt-1 ml-2">Notifications</span>
        </Link>

        <Link className="menu-item m-md-3 pb-2" href="#">
          <FontAwesomeIcon item icon="envelope" size="1x" className="mt-3 mx-1" />
          <span className="mt-2 pt-1 ml-2">Messeges</span>
        </Link>

        <Link className="menu-item m-md-3 pb-2" to="/profile">
          <FontAwesomeIcon item icon="user-circle" size="1x" className="mt-3 mx-1" />
          <span className="mt-2 pt-1 ml-2">Profile</span>
        </Link>
      </nav>
    </>
  );
};
export default MyNav;
