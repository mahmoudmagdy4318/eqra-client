import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, TextField, Card, Typography, CardContent, CardActions, Menu, MenuItem } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './post.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosInstance from '../../../../API/axiosInstance';

const Post = ({ name }) => {
  let [featured, setFeatured] = useState(false);
  let [postBody, setPostBody] = useState('');
  let [postList, setPostList] = useState([]);
  let [postId, setPostId] = useState(0);

  let [currPage, setCurrPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);

  const newPost = () => {
    if (postBody !== "") {
      let newPostData = {
        body_content: postBody,
        genres: [1],
        isFeatured: featured,
      }
      axiosInstance
        .post("api/post", newPostData)
        .then((res) => {
          setPostList([{ id: res.data.id, new: true, body_content: res.data.body_content }, ...postList]);
          setPostBody('');
          setFeatured(false);
        })
        .catch((err) => console.log({ err }));
    }
  };

  const deletePost = (id) => async () => {
    try {
      await axiosInstance.delete(`api/post/${id}`);
      setPostList(postList.filter(p => p.id !== id));
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axiosInstance.get(`/api/userposts?page=${currPage}`)
      .then((data) => {
        console.log("server response : ", data);
        setPostList([...postList, ...data.data]);
        setLastPage(data.meta.last_page);
      })
  }, [currPage])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event,id) => {
    setAnchorEl(event.currentTarget);
    setPostId(id)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <>
                <Card className={`${styles.root} ${post.new ? styles.new_added : ""}`} variant="outlined" key={post.id}>
                  <Button className={styles.options} aria-controls="simple-menu" aria-haspopup="true" onClick={(e)=>handleClick(e,post.id)}>
                    <ExpandMoreIcon />
                  </Button>
                  <Menu
                    id={`post-${post.id}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={deletePost(postId)}>Delete {postId}</MenuItem>
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                  </Menu>
                  <CardContent className={styles.posts_showPosts_body} >
                    <div className={styles.posts_showPosts_body_title} >
                      <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="" />
                      <Typography color="textSecondary" className={styles.posts_showPosts_body_title_username} gutterBottom>
                        {name}
                      </Typography>
                    </div>
                    <Typography variant="body2" component="p">
                      {post.body_content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"> <ChatBubbleOutlineIcon /> </Button>
                  </CardActions>
                </Card>
                <br />
              </>
            )
          })}
        </InfiniteScroll>


      </div>
    </section>
  );
};

export default Post
