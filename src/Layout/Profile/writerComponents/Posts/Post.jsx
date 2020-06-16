import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, TextField, Card, Typography, CardContent, CardActions, Menu, MenuItem } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './post.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import axiosInstance from '../../../../API/axiosInstance';
import CustomizedDialogs from '../../../../utils/Edit';

const Post = ({ name, image, setNewFeaturedPosts, userid }) => {
  let [featured, setFeatured] = useState(false);
  let [postBody, setPostBody] = useState('');
  let [postList, setPostList] = useState([]);
  let [postData, setPostData] = useState({});
  let [postId, setPostId] = useState(0);
  let [EditPopUp, setEditPopUp] = useState(false);
  let [currentUserLikes, setCurrentUserLikes] = useState([]);

  let [currPage, setCurrPage] = useState(1);
  let [lastPage, setLastPage] = useState(1);

  const newPost = () => {
    if (postBody !== "") {
      if (featured) { setNewFeaturedPosts(true) }
      let newPostData = {
        body_content: postBody,
        genres: [1],
        isFeatured: featured,
      };
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
      setAnchorEl(null);
      setPostList(postList.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  const EditingPost = (postData) => {
    console.log(postData);
    return axiosInstance
      .patch(`/api/post/${postData.id}`, postData)
      .then((res) => {
        console.log(res);
        setPostList([...postList.map((p) => (p.id === postData.id ? postData : p))]);
      });
  };

  useEffect(() => {
    axiosInstance.get(`api/userposts/${userid}?page=${currPage}`)
      .then((data) => {
        setPostList([...data.data]);
        setLastPage(data.meta.last_page);
      })
      .catch(err => console.log(err));
  }, [currPage, userid,currentUserLikes]);

  useEffect(() => {
    axiosInstance.get(
      `api/posts/${userid}/likes`
    ).then(res =>
      setCurrentUserLikes([].concat.apply([], ...res))
    )
  }, [userid])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, post) => {
    setPostData(post);
    setPostId(post.id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const reactLove = (id) => {
    if (currentUserLikes.includes(id)) {
      return axiosInstance
        .delete(`api/post/${id}/likes/${userid}`)
        .then(() => {
          setCurrentUserLikes(currentUserLikes.filter(item => item !== id));
        });
    } else {
      return axiosInstance
        .post("api/post/like", {
          post_id: id,
          user_id: userid,
        })
        .then(() => {
          setCurrentUserLikes([...currentUserLikes, id]);
        });
    }
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
              <Card id={`post-${post.id}`} className={`${styles.root} ${post.new ? styles.new_added : ""}`} variant="outlined" key={post.id}>
                <Button className={styles.options} aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => handleClick(e, post)}>
                  <ExpandMoreIcon />
                </Button>
                <Menu
                  id={`post-${post.id}`}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={deletePost(postId)}>Delete</MenuItem>
                  <MenuItem onClick={() => { setEditPopUp(true); }}>Edit</MenuItem>
                </Menu>
                <CardContent className={styles.posts_showPosts_body} >
                  <div className={styles.posts_showPosts_body_title} >
                    <img src={image} alt="" />
                    <Typography color="textSecondary" className={styles.posts_showPosts_body_title_username} gutterBottom>
                      {name}
                    </Typography>
                  </div>
                  <Typography variant="body2" component="p" style={{ padding: '2px 30px' }}>
                    {post.body_content}
                  </Typography>
                </CardContent>
                <CardActions className={styles.post_action} >
                  <ChatBubbleOutlineIcon className={styles.post_action_icons} />
                  <div>
                    {currentUserLikes.includes(post.id) ?
                      <FavoriteIcon color={'secondary'} className={styles.post_action_icons} onClick={() => reactLove(post.id)} /> :
                      <FavoriteBorderIcon className={styles.post_action_icons} onClick={() => reactLove(post.id)} />
                    }
                    {post.likes}
                  </div>
                </CardActions>
              </Card>
            )
          })}
        </InfiniteScroll>


      </div>
      <CustomizedDialogs
        open={EditPopUp}
        setOpen={setEditPopUp}
        post={postData}
        submitEditingPost={EditingPost}
      />
    </section >
  );
};

export default Post
