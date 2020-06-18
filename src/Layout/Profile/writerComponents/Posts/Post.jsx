import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core';


import styles from './post.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosInstance from '../../../../API/axiosInstance';
import SinglePost from './SinglePost';

const Post = ({ name, image, setNewFeaturedPosts, userid }) => {
  let [featured, setFeatured] = useState(false);
  let [postBody, setPostBody] = useState('');
  let [postList, setPostList] = useState([]);
  let [currentUserLikes, setCurrentUserLikes] = useState([]);

  let [currPage, setCurrPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);

  const newPost = () => {
    if (postBody !== "") {
      if (featured) { setNewFeaturedPosts(true) }
      let newPostData = {
        body_content: postBody,
        genres: [],
        isFeatured: featured,
      };
      axiosInstance.post("api/post", newPostData)
        .then((res) => {
          setPostList([{ id: res.data.id, new: true, body_content: res.data.body_content }, ...postList]);
          setPostBody('');
          setFeatured(false);
        })
        .catch((err) => console.log({ err }));
    }
  };

  useEffect(() => {
    axiosInstance.get(`api/userposts/${userid}?page=${currPage}`)
      .then((data) => {
        setPostList([...data.data]);
        setLastPage(data.meta.last_page);
      })
      .catch(err => console.log(err));
  }, [currPage, userid, currentUserLikes]);

  useEffect(() => {
    axiosInstance.get(
      `api/posts/${userid}/likes`
    ).then(res =>
      setCurrentUserLikes([].concat.apply([], ...res))
    )
  }, [userid])

  const deletedPost = (id) => {
    setPostList(postList.filter(p => p.id !== id));
  }

  return (
    <section className={styles.posts}>
      <div className={styles.posts_postForm}>
        <TextField
          id="filled-textarea"
          label="What is on your mind ?"
          placeholder="Placeholder"
          multiline
          variant="standard"
          className={styles.posts_postForm_postBody}
          onChange={(e) => { setPostBody(e.target.value); }}
          value={postBody}
        />

        <div className={styles.posts_postForm_action}>
          <FormControlLabel
            className={styles.posts_postForm_action_label}
            control={
              <Checkbox
                checked={featured}
                onChange={() => setFeatured(!featured)}
                name="checkedB"
                color="primary"
              />
            }
            label="Featured Post ?"
          />

          <Button variant="contained" color="primary" onClick={newPost}>
            Post
          </Button>
        </div>
      </div>
      <br />
      <div className={styles.posts_showPosts}>
        <InfiniteScroll
          dataLength={postList.length} //This field to render the next data
          next={() => setCurrPage(currPage + 1)}
          hasMore={currPage < lastPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>......</b>
            </p>
          }
        >
          {postList.map((post) => {
            return (
              <SinglePost
                key={post.id}
                post={post}
                currentUserLikes={currentUserLikes}
                deletedPost={deletedPost}
                userid={userid}
                image={image}
                name={name}
                setCurrentUserLikes={setCurrentUserLikes}
                setPostList={setPostList}
                postList={postList}
              />
            )
          })}
        </InfiniteScroll>
      </div>
    </section >
  );
};

export default Post
