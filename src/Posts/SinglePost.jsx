import React, { useEffect, useState } from "react";
import Home from "../Layout/Home";
import axiosInstance from "../API/axiosInstance";
import Post from "../Layout/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Comment from "../Layout/Comment";
import { useHistory } from "react-router-dom";

function SinglePost(props) {
  const { id } = props;
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [finalPage, setFinalPage] = useState(1);
  const [togglePopUp, setTogglePopUp] = useState(false);
  const history = useHistory();

  const getPostData = async () => {
    const data = await axiosInstance.get(`api/post/${id}`);
    setPostData(data.data);
  };
  const getComments = async () => {
    const data = await axiosInstance.get(
      `api/comment?post_id=${id}&page=${currPage}`
    );
    setComments([...comments, ...data.data]);
    setFinalPage(data.meta.last_page);
  };
  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    getComments();
  }, [currPage]);

  const handleDeleteComment = (id) => async () => {
    try {
      await axiosInstance.delete(`api/comment/${id}`);
      setComments(comments.filter((c) => c.id != id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (id) => async () => {
    try {
      await axiosInstance.delete(`api/post/${id}`);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    const like = await axiosInstance.post("api/comment/like", {
      comment_id: id,
      user_id: 22,
    });
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
    console.log(like);
  };
  const handlePostLike = async (id) => {
    try {
      const like = await axiosInstance.post("api/post/like", {
        post_id: id,
        user_id: 22,
      });
      setPostData({ ...postData, likes: postData.likes + 1 });
      console.log(like);
    } catch (error) {
      console.log(error);
    }
  };

  const submitEditingComment = (commentData) => {
    return axiosInstance
      .patch(`api/comment/${commentData.id}`, commentData)
      .then((res) => {
        setComments(
          comments.map((c) => (c.id === commentData.id ? commentData : c))
        );
      });
  };

  const submitEditingPost = (editedPost) => {
    console.log(editedPost);
    return axiosInstance
      .patch(`/api/post/${editedPost.id}`, editedPost)
      .then((res) => {
        console.log(res);
        setPostData(editedPost);
      });
  };
  return (
    <>
      {/* <div>{id}</div> */}
      <Post
        data={postData}
        click={() => {}}
        handleDeletePost={handleDelete}
        onLike={() => handlePostLike(postData.id)}
        submitEditingPost={submitEditingPost}
      />
      <InfiniteScroll
        dataLength={comments.length} //This field to render the next data
        next={() => setCurrPage(currPage + 1)}
        hasMore={currPage < finalPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {comments.map((c) => {
          return (
            <Comment
              key={c.id}
              data={c}
              onDelete={handleDeleteComment}
              onLike={() => handleLike(c.id)}
              submitEditingPost={submitEditingComment}
            />
          );
        })}
      </InfiniteScroll>
    </>
  );
}

export default Home(SinglePost);
