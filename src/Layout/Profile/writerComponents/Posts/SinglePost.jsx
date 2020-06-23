import React, { useState } from 'react'
import { Button, Card, Typography, CardContent, CardActions, Menu, MenuItem, Paper, IconButton, InputBase, Divider } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';

import styles from './post.module.css';
import CustomizedDialogs from '../../../../utils/Edit';
import axiosInstance from '../../../../API/axiosInstance';
import { Link } from 'react-router-dom';

const SinglePost = ({ post, deletedPost, currentUserLikes, userid, image, name, setCurrentUserLikes, setPostList, postList, isVisitor }) => {
  console.log("current likes", currentUserLikes);

  let [postData, setPostData] = useState({});
  let [inputField, setInputField] = useState(false)
  let [anchorEl, setAnchorEl] = React.useState(null);
  let [EditPopUp, setEditPopUp] = useState(false);
  let [commentBody, setCommentBody] = useState("")

  const EditingPost = (postData) => {
    return axiosInstance
      .patch(`/api/post/${postData.id}`, postData)
      .then((res) => {
        console.log(res);
        setPostList([...postList.map((p) => (p.id === postData.id ? postData : p))]);
      });
  };
  const deletePost = (id) => async () => {
    try {
      await axiosInstance.delete(`api/post/${id}`);
      setAnchorEl(null);
      deletedPost(post.id)
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (event, post) => {
    setPostData(post);
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

  const newComment = (e, id) => {
    e.preventDefault();
    setCommentBody("");
    setInputField(false);
    axiosInstance.post("api/comment", { content: commentBody, postId: id }).then(() => { setInputField(false) });

  }

  return (
    <>
      <Card id={`post-${post.id}`} className={`${styles.root} ${post.new ? styles.new_added : ""}`} variant="outlined" key={post.id}>
        {!isVisitor ? <>
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
            <MenuItem onClick={deletePost(post.id)}>Delete</MenuItem>
            <MenuItem onClick={() => { setEditPopUp(true); }}>Edit</MenuItem>
          </Menu>
        </> : ''}
        <CardContent className={styles.posts_showPosts_body} >
          <div className={styles.posts_showPosts_body_title} >
            <img src={image} alt="" />
            <Typography color="textSecondary" className={styles.posts_showPosts_body_title_username} gutterBottom>
              {name}
            </Typography>
          </div>
          <Typography variant="body2" component="p" style={{ padding: '2px 30px' }}>
            <Link to={`/post/${post.id}`} >{post.body_content} </Link>
          </Typography>
        </CardContent>
        <CardActions className={styles.post_action} >
          <ChatBubbleOutlineIcon className={styles.post_action_icons} onClick={() => setInputField(!inputField)} />
          <div>
            {currentUserLikes.includes(post.id) ?
              <FavoriteIcon color={'secondary'} className={styles.post_action_icons} onClick={() => reactLove(post.id)} /> :
              <FavoriteBorderIcon className={styles.post_action_icons} onClick={() => reactLove(post.id)} />
            }
            {post.likes}
          </div>
        </CardActions>

        <Paper component="form" className={`${styles.paperRoot} ${inputField ? styles.shown : ""}`} onSubmit={(e) => newComment(e, post.id)}>
          <InputBase
            className={styles.input}
            placeholder="Search Google Maps"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={commentBody}
            onChange={(e) => { setCommentBody(e.target.value) }}
          />
          <Divider className={styles.divider} orientation="vertical" />
          <IconButton color="primary" className={styles.iconButton} aria-label="directions" onClick={(e) => newComment(e, post.id)}>
            <SendIcon />
          </IconButton>
        </Paper>

      </Card>
      <CustomizedDialogs
        open={EditPopUp}
        setOpen={setEditPopUp}
        post={postData}
        submitEditingPost={EditingPost}
      />
    </>
  )
}

export default SinglePost
