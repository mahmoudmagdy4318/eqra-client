import React, { useContext } from "react";
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

const Writer = () => {
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  console.log(currentUser);
  return (
    <Container>
      <Link to="/" style={{ display: "block", padding: 10 }}>
        {" "}
        <ArrowBackIcon /> back to home ?{" "}
      </Link>

      <Details
        name={currentUser.full_name}
        description={"i teach computer science at bla bla bla never mind me :3"}
        image={
          currentUser.pictur
            ? currentUser.pictur
            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        }
        followers={40}
        following={25}
      />

      <section className={styles.grid}>
        <div>
          <Featured />
          <Event />
        </div>
        <div className={styles.second}>
          <Post name={currentUser.full_name} />
        </div>
        <div>
          <Book />
        </div>
      </section>

      {/* 
        Details 
        Grid ->
                1 : featured + events,
                2 : new post + posts,
                3 : Books,
      */}
    </Container>
  );
};

export default Writer;
