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
  const [followersFollowing, setFollowersFollowing] = useState([])

  useEffect(() => {
    axiosInstance.get(`/api/userFeaturedPosts/${currentUser.id}`)
      .then((data) => {
        setFeaturedPostsList([...data.data]);
      })
      .catch(err => console.log(err))
    setNewFeaturedPosts(false)

    axiosInstance.get('api/followersCount').then(data => setFollowersFollowing(data))
  }, [newFeaturedPosts, currentUser.id])
  return (
    <>
    <EventNavBar />
    <br/>
    <Container>
      {/* <Link to="/" style={{ display: "block", padding: 10 }}>
        <ArrowBackIcon /> back to home ?
      </Link> */}

      <Details
        name={currentUser.full_name}
        email={currentUser.email}
        image={currentUser.pictur ? currentUser.pictur
          : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        }
        followers={followersFollowing.followers}
        following={followersFollowing.following}
        isVisitor={visitorId === currentUser.id ? false : true}
      />

      <section className={styles.grid}>
        <div>
          <Featured featuredPosts={featuredPostsList} />
          <Event
            isVisitor={visitorId === currentUser.id ? false : true}
          />
        </div>
        <div className={styles.second}>
          <Post
            userid={currentUser.id}
            setNewFeaturedPosts={setNewFeaturedPosts}
            name={currentUser.full_name}
            image={currentUser.pictur ? currentUser.pictur
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            } />
        </div>
        <div>
          <Book />
        </div>
      </section>
    </Container>
    </>
  );
};

export default Writer;
