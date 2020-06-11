import React, { useState } from 'react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Button, Checkbox, FormControlLabel, TextField, Card, Typography, CardContent, CardActions } from '@material-ui/core';
import uuid from 'react-uuid';
import styles from './post.module.css';

const Post = ({ name }) => {
  let [featured, setFeatured] = useState(false);
  let [postBody, setPostBody] = useState('');
  let [postList, setPostList] = useState([
    { id: 1, body: 'gdela gdela gdelaaaaaaaaaa' },
    { id: 2, body: 'doctor kero fe 3seeeeeeeeer' },
    { id: 3, body: 'a7la msa 3la el nas el kwysa :3' },
  ]);

  const newPost = () => {
    setPostList([...postList, { id: uuid(), body: postBody }]);
    setPostBody('');
    console.log(postList);
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
          onChange={(e) => { setPostBody(e.target.value) }}
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
        {postList.map((post) => {
          return (
            <>
            <Card className={styles.root} variant="outlined" key={post.id}>
              <CardContent className={styles.posts_showPosts_body} >
                <div className={styles.posts_showPosts_body_title} >
                  <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="" />
                  <Typography color="textSecondary" className={styles.posts_showPosts_body_title_username} gutterBottom>
                    {name}
                  </Typography>
                </div>
                <Typography variant="body2" component="p">
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"> <ChatBubbleOutlineIcon /> </Button>
              </CardActions>
            </Card>
            <br/>
            </>
          )
        })}

      </div>
    </section>
  );
}

export default Post
