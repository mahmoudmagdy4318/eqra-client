import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import Post from "../Layout/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import axiosInstance from "../API/axiosInstance";
import { useHistory } from "react-router-dom";
import './EventPosts.css';
const EventPosts = (props) => {
  const eventId = props.eventId;
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [newPostData, setNewPostData] = useState({eventId: eventId});
  const [newPostFile, setNewPostFile] = useState(null);
  const history = useHistory();
  
  const handleInput = (e) => {
    setNewPostData({ ...newPostData, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    createImage(e.target.files[0]);
  };

  function createImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      setNewPostFile(e.target.result);
    };
    reader.readAsDataURL(file);
  }
  const submitPost = (e) => {
      e.preventDefault();
    console.log(newPostData)
    axiosInstance
      .post(`api/post`, {
        ...newPostData,
        postFiles: newPostFile,
      })
      .then((res) => {
        console.log({ res });
        setPosts([res.data, ...posts]);
      })
      .catch((err) => console.log({ err }));
  };

  const getPosts = async () => {
    const postsData = await axiosInstance.get(`api/event/${eventId}/posts/?page=${currPage}`);
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

  const submitEditingPost = async (postData) => {
    console.log(postData);
    const res = await axiosInstance
      .patch(`/api/post/${postData.id}`, postData);
    console.log(res);
    setPosts([...posts.map((p) => (p.id === postData.id ? postData : p))]);
  };
  const handleLike = (id) => (currentUserLike) => {
    if (currentUserLike) {
      return axiosInstance
        .delete(`api/post/${id}/likes/${currentUser.id}`)
        .then(() => {
          setPosts(
            posts.map((p) => (p.id === id ? { ...p, likes: p.likes - 1 } : p))
          );
        });
    } else {
      return axiosInstance
        .post("api/post/like", {
          post_id: id,
          user_id: currentUser.id,
        })
        .then(() => {
          setPosts(
            posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
          );
        });
    }
  };

  const handleSubmitAddingComment = (newComment) => {
    console.log(newComment);
    return axiosInstance.post("api/comment", newComment);
  };
  return (
    <div class="panel-content panel-activity">
      <form class="panel-activity__status mb-2">
        <textarea
          name="body_content"
          placeholder="Share what you've been up to..."
          class="form-control"
          value={newPostData.body_content}
          onChange={handleInput}
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
          <button onClick={submitPost} class="btn btn-sm btn-rounded btn-info">
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
              onLike={handleLike(p.id)}
              submitEditingPost={submitEditingPost}
              onSubmitAddingComment={handleSubmitAddingComment}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default EventPosts;
