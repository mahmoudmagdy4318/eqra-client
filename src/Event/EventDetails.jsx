import React, { useEffect, useState, useContext } from "react";
import Post from "../Layout/Post";
import axiosInstance from "../API/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom";
import Home from "../Layout/Home";
import { UserContext } from "../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import "./EventDetails.css";
// Component
import UserEventState from "./UserEventState";
const EventDetails = (props) => {
  const eventId = props.match.params.id;
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [post, setPost] = React.useState({ body_content: "", eventId });
  const [posts, setPosts] = useState([]);
  const [event, setEvent] = useState({});
  const [currPage, setCurrPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const history = useHistory();

  const getPosts = async () => {
    const postsData = await axiosInstance.get(
      `api/event/${eventId}/posts/?page=${currPage}`
    );
    setPosts([...posts, ...postsData.data]);
    setLastPage(postsData.meta.last_page);
  };

  const getEvent = async () => {
    const event = await axiosInstance.get(`api/event/${eventId}`);
    setEvent(event.data);
  };
  useEffect(() => {
    getEvent();
  }, []);
  useEffect(() => {
    getPosts();
  }, [currPage]);

  const handlePostClick = (id) => {
    history.push(`/post/${id}`);
  };

  const handleDeletePost = (id) => async () => {
    try {
      await axiosInstance.delete(`api/post/${id}`);
      setPosts(posts.filter((p) => p.id !== id));
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
  const addPost = async (e) => {
    e.preventDefault();
    const newPost = await axiosInstance.post("api/post", post);
    setPost([newPost, ...posts]);
  };
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <div class="">
      <div class="col-lg-12 p-0">
        <div class="panel profile-cover">
          <div class="profile-cover__img eventHeader">
            <CalendarTodayIcon
              fontSize={"large"}
              color={"error"}
            ></CalendarTodayIcon>
            <p className="eventDate">
              {event.start_date} – {event.end_date}
            </p>
            <h3 class="h3">{event.name}</h3>
          </div>
          <div class="profile-cover__action bg--img" data-overlay="0.3">
            {/* User State Component (Pending, Interested, Going) */}
            <UserEventState
              getEvent={getEvent}
              user={currentUser}
              eventId={eventId}
              eventName={event.name}
            />
          </div>
          <div class="profile-cover__info">
            <ul class="nav">
              <li className="eventList">
                <strong>{event.event_going_users}</strong>Going
              </li>
              <li className="eventList">
                <strong>{event.event_interested_users}</strong>Interested
              </li>
              <li className="eventList">
                <strong>{event.event_pending_users}</strong>Invited
              </li>
            </ul>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading">
            <h3>Description</h3>
            {event.description}
          </div>
          <div class="panel-heading">
            <h3 class="panel-title">Discssion</h3>
          </div>
          <div class="panel-content panel-activity">
            <form class="panel-activity__status mb-2">
              <textarea
                name="body_content"
                placeholder="Share what you've been up to..."
                class="form-control"
                value={post.body_content}
                onChange={onChange}
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
                <button
                  onClick={addPost}
                  class="btn btn-sm btn-rounded btn-info"
                >
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
                    data={p}
                    click={handlePostClick}
                    handleDeletePost={handleDeletePost}
                    onLike={() => handleLike(p.id)}
                  />
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home(EventDetails);
