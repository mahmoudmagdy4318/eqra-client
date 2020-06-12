import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "../Home";
import Post from "../Post";
import axiosInstance from "../../API/axiosInstance";
import "../../styles/profile.css";
import { UserContext } from "../../context/userContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory ,Link} from "react-router-dom";

// import "..
const User = () => {
  const currentUser = useContext(UserContext);
  console.log(currentUser);
  const [personName, setPersonName] = React.useState([]);
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const history = useHistory();

  // const getUserData = async () => {
  //   console.log("call");
  //   const userData = await axiosInstance.get(`api/auth/user`);
  //   console.log(userData);
  //   // setPosts([...posts, ...postsData.data]);
  //   // setLastPage(postsData.meta.last_page);
  // };
  const handleChange = (event) => {
    setPersonName(event.target.value);
  };


  const getPosts = async () => {
    const postsData = await axiosInstance.get(`api/userposts?page=${currPage}`);
    console.log(postsData);
    setPosts([...posts, ...postsData.data]);
    setLastPage(postsData.meta.last_page);
  };
  useEffect(() => {
    getPosts();
  }, [currPage]);

  const handlePostClick = (id) => {
    history.push(`/post/${id}`);
  };

  const handleDeletePost = (id) => async () => {
    try {
      await axiosInstance.delete(`api/post/${id}`);
      setPosts(posts.filter((p) => p.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      const like = await axiosInstance.post("api/post/like", {
        post_id: id,
        user_id: 22,
      });
      setPosts(
        posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
      );
      console.log(like);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="">
      <div class="col-lg-12 p-0">
        <div class="panel profile-cover">
          <div class="profile-cover__img">
            {currentUser.pictur == null && (
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
            )}
            {currentUser.pictur != null && (
              <img
                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                alt=""
              />
            )}
            <h3 class="h3">{currentUser.full_name}</h3>
          </div>
          <div class="profile-cover__action bg--img" data-overlay="0.3">
            <Link class="btn btn-rounded btn-info" to="editprofile">
                <FontAwesomeIcon
                  item
                  icon="edit"
                  size="1x"
                  className="mt-3 mx-1"
                />
                <span>Edit profile</span>
            </Link>
              {/* <FontAwesomeIcon
                item
                icon="plus"
                size="1x"
                className="mt-3 mx-1"
              />
              <span>Follow</span>
            </button> */}
            <button class="btn btn-rounded btn-info">
              <FontAwesomeIcon
                item
                icon="comment"
                size="1x"
                className="mt-3 mx-1"
              />
              <span>Message</span>
            </button>
          </div>
          <div class="profile-cover__info">
            <ul class="nav">
              <li>
                <strong>26</strong>Projects
              </li>
              <li>
                <strong>33</strong>Followers
              </li>
              <li>
                <strong>136</strong>Following
              </li>
            </ul>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading">
            <h3 class="panel-title">Activity Feed</h3>
          </div>
          <div class="panel-content panel-activity">
            <form action="#" class="panel-activity__status mb-2">
              <textarea
                name="user_activity"
                placeholder="Share what you've been up to..."
                class="form-control"
              ></textarea>
              <div class="actions">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Image"
                  >
                    <FontAwesomeIcon
                      item
                      icon="image"
                      size="1x"
                      className="mt-3 mx-1"
                    />
                  </button>
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Video"
                  >
                    <i class="fa fa-video-camera"></i>
                  </button>
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Idea"
                  >
                    <i class="fa fa-lightbulb-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Question"
                  >
                    <i class="fa fa-question-circle-o"></i>
                  </button>
                </div>
                <button type="submit" class="btn btn-sm btn-rounded btn-info">
                  Post
                </button>
              </div>
            </form>
            <InfiniteScroll
              dataLength={posts.length} //This field to render the next data
              next={() => setCurrPage(currPage + 1)}
              hasMore={currPage < lastPage}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((p) => {
                return (
                  <Post
                    key={p.id}
                    data={p}
                    click={handlePostClick}
                    handleDeletePost={handleDeletePost}
                    onLike={() => handleLike(p.id)}
                  />
                );
              })}df
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home(User);
// export default Home(User);
