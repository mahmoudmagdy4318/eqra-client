import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Writer.module.css";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Container } from "@material-ui/core";

import Details from "./writerComponents/Details/Details";
import Featured from "./writerComponents/LeftBar/Featured";
import Event from "./writerComponents/LeftBar/Event";
import Post from "./writerComponents/Posts/Post";
import Book from "./writerComponents/books/Book";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../API/axiosInstance";
import EventNavBar from "../../Event/EventNavbar";

const Writer = ({ id: visitorId }) => {
  const { data: { user: currentUser }, } = useContext(UserContext);
  let [featuredPostsList, setFeaturedPostsList] = useState([]);
  let [newFeaturedPosts, setNewFeaturedPosts] = useState(false);
  let [followersFollowing, setFollowersFollowing] = useState({ followers: null, following: null });
  let [profileOwner, setProfileOwner] = useState({});

  useEffect(() => {
    axiosInstance.get(`/api/auth/getuser/${visitorId}`)
      .then(data => setProfileOwner(data.user))
      .catch(err => console.log(err));

    axiosInstance.get(`/api/userFeaturedPosts/${visitorId}`)
      .then((data) => {
        setFeaturedPostsList([...data.data]);
      })
      .catch(err => console.log(err))
    setNewFeaturedPosts(false)

    Promise.all([
      axiosInstance.get(`api/persons-i-follow/${visitorId}`),
      axiosInstance.get(`api/my-followers/${visitorId}`)
    ]).then(data => { 
      console.log(data) 
      setFollowersFollowing({ followers: data[1] ,following: data[0] })
    })
  }, [newFeaturedPosts, visitorId])

  return (
    <>
      <EventNavBar />
      <br />
      <Container>
        {/* <Link to="/" style={{ display: "block", padding: 10 }}>
        <ArrowBackIcon /> back to home ?
      </Link> */}

        <Details
          name={profileOwner.full_name}
          email={profileOwner.email}
          image={profileOwner.pictur ? profileOwner.pictur
            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          }
          followers={followersFollowing.followers}
          following={followersFollowing.following}
          visitorId={visitorId}
          isVisitor={visitorId == currentUser.id ? false : true}
        />

        <section className={styles.grid}>
          <div>
            <Featured featuredPosts={featuredPostsList} />
            <Event />
          </div>
          <div className={styles.second}>
            <Post
              isVisitor={visitorId == currentUser.id ? false : true}
              profileOwner={profileOwner.id}
              visitorId={currentUser.id}
              setNewFeaturedPosts={setNewFeaturedPosts}
              name={profileOwner.full_name}
              image={profileOwner.pictur ? profileOwner.pictur
                : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              } />
          </div>
          <div>
            <Book
              thisUser={visitorId}
              isVisitor={visitorId == currentUser.id ? false : true}
            />
          </div>
        </section>
      </Container>
    </>
  );
};

export default Writer;
