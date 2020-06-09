import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Comment from "./Comment";
import _ from "lodash";
import Moment from "react-moment";
import PostLikes from "../Likes/Post_Likes";
import axiosInstance from "../API/axiosInstance";
import AlertDialog from "../utils/DeleteConfirmation";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const Post = (props) => {
  const { data: postData, click, handleDeletePost, onLike } = props;
  const classes = useStyles();
  const [show, showComment] = useState(false);
  const [timePassed, setTimePassed] = useState("");
  const [togglePopUp, setTogglePopUp] = useState(false);
  const getDateDifference = (timeToCompare) => {
    const dateNow = new Date();
    const postDate = new Date(timeToCompare);
    const diffTime = Math.abs(dateNow - postDate + 7200000);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays) setTimePassed(diffDays + (diffDays > 1 ? " days" : " day"));
    else {
      const diffHoures = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHoures)
        setTimePassed(diffHoures + (diffHoures > 1 ? " hours" : " hour"));
      else {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes)
          setTimePassed(diffMinutes + (diffMinutes > 1 ? " mins" : " min"));
        else {
          const diffSeconds = Math.floor(diffTime / 1000);
          setTimePassed(diffSeconds + (diffSeconds > 1 ? " secs" : " sec"));
        }
      }
    }
  };

  useEffect(() => {
    if (!postData.created_at) return;
    const interval = setInterval(() => {
      getDateDifference(postData.created_at);
    }, 1000);
    // return clearInterval(interval);
  }, [postData.created_at]);

  return (
    <>
      <div class="tweetEntry-tweetHolder">
        <div class="tweetEntry">
          <div class="tweetEntry-content">
            <div className="d-md-flex flex-row justify-content-md-between align-items-md-baseline">
              <a class="tweetEntry-account-group" href="[accountURL]">
                <img
                  class="tweetEntry-avatar"
                  src="http://placekitten.com/200/200"
                  alt=""
                />

                <strong class="tweetEntry-fullname">
                  {_.get(postData, "user.name")}
                </strong>

                <span class="tweetEntry-username">
                  @<b>[username]</b>
                </span>

                <span class="tweetEntry-timestamp">{timePassed}</span>
              </a>
              <div className="ml-md-5">
                <FontAwesomeIcon
                  item
                  icon="edit"
                  size="1x"
                  className="mt-3 mx-1"
                />
                <FontAwesomeIcon
                  item
                  icon="trash"
                  size="1x"
                  className="mt-3 mx-1"
                  onClick={() => setTogglePopUp(true)}
                />
              </div>
            </div>
            <div
              class="tweetEntry-text-container"
              onClick={() => click(postData.id)}
            >
              {postData.body_content}
            </div>
          </div>

          {_.get(postData, "files.length") ? (
            <div class="optionalMedia">
              <img
                class="optionalMedia-img"
                src="http://placekitten.com/500/400"
                alt=""
              />
            </div>
          ) : (
            <></>
          )}

          <div
            class="tweetEntry-action-list"
            style={{ "line-height": "24px", color: "#b1bbc3" }}
          >
            <FontAwesomeIcon
              icon="reply"
              size="1x"
              className="ml-5 mt-3"
              onClick={() => showComment(!show)}
            />
            <FontAwesomeIcon icon="retweet" size="1x" className="ml-5 mt-3" />
            <FontAwesomeIcon
              icon="heart"
              size="1x"
              className="ml-5 mt-3"
              onClick={onLike}
            />
            <PostLikes
              id={postData.id}
              type="post"
              noOfLikes={postData.likes}
            />
          </div>
          {show === true && (
            <div className="mt-2">
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="comment"
                  multiline={true}
                  name="comment"
                  placeholder="Add comment"
                  ml={5}
                  className="mb-2"
                />
              </form>
              {/* <Comment /> */}
            </div>
          )}
        </div>
      </div>
      <AlertDialog
        toggle={togglePopUp}
        setOpen={setTogglePopUp}
        onConfirm={handleDeletePost(postData.id)}
      />
    </>
  );
};
export default Post;
