import React,{useState} from 'react'
import { Button, Card, Typography, CardContent, CardActions, Menu, MenuItem, Paper, IconButton, InputBase, Divider } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';

import styles from './post.module.css';

const SinglePost = ({post,setPostData}) => {

  let [inputField, setInputField] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const deletePost = (id) => async () => {
    try {
      await axiosInstance.delete(`api/post/${id}`);
      setAnchorEl(null);
      setPostList(postList.filter(p => p.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
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
        <ChatBubbleOutlineIcon className={styles.post_action_icons} onClick={() => setInputField(true)} />
        <div>
          {currentUserLikes.includes(post.id) ?
            <FavoriteIcon color={'secondary'} className={styles.post_action_icons} onClick={() => reactLove(post.id)} /> :
            <FavoriteBorderIcon className={styles.post_action_icons} onClick={() => reactLove(post.id)} />
          }
          {post.likes}
        </div>
      </CardActions>

      <Paper component="form" className={styles.paperRoot} onSubmit={(e) => { e.preventDefault(); console.log(e) }}>
        <InputBase
          className={styles.input}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <Divider className={styles.divider} orientation="vertical" />
        <IconButton color="primary" className={styles.iconButton} aria-label="directions">
          <SendIcon />
        </IconButton>
      </Paper>

    </Card>
  )
}

export default SinglePost
