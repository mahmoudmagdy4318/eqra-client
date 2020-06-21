import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import PostLikes from "../Likes/Post_Likes";
import AlertDialog from "../utils/DeleteConfirmation";
import { Link } from "react-router-dom";
import CustomizedDialogs from "../utils/Edit";
import { UserContext } from "../context/userContext";
import axiosInstance from "../API/axiosInstance";
import {
  Grid,
  Paper,
  Container,
  Typography,
  withStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const Post = (props) => {
  const {
    data: postData,
    click,
    handleDeletePost,
    onLike,
    submitEditingPost,
    onSubmitAddingComment,
  } = props;
  const classes = useStyles();
  const [show, showComment] = useState(false);
  const [timePassed, setTimePassed] = useState("");
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [toggleEditPopUp, setToggleEditPopUp] = useState(false);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [newComment, setNewComment] = useState({
    content: "",
    postId: postData.id,
  });

  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  // console.log({ currentUser });
  const getDateDifference = (timeToCompare) => {
    const dateNow = new Date();
    const postDate = new Date(timeToCompare);
    const diffTime = Math.abs(dateNow - postDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays)
      setTimePassed(" " + diffDays + (diffDays > 1 ? " days ago" : " day ago"));
    else {
      const diffHoures = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHoures)
        setTimePassed(
          " " + diffHoures + (diffHoures > 1 ? " hours ago" : " hour ago")
        );
      else {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        if (diffMinutes)
          setTimePassed(
            " " + diffMinutes + (diffMinutes > 1 ? " mins ago" : " min ago")
          );
        else {
          const diffSeconds = Math.floor(diffTime / 1000);
          setTimePassed(
            " " + diffSeconds + (diffSeconds > 1 ? " secs ago" : " sec ago")
          );
        }
      }
    }
  };

  useEffect(() => {
    if (!postData.created_at) return;
    getDateDifference(postData.created_at);
    // return clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(postData)
    if (!postData.created_at) return;
    const interval = setInterval(() => {
      getDateDifference(postData.created_at);
    }, 3000);
    // return clearInterval(interval);
  }, [postData.created_at]);

  const checkForLike = async () => {
    const res = await axiosInstance.get(
      `api/post/${postData.id}/likes/${currentUser.id}`
    );
    setCurrentUserLike(res.res);
  };
  useEffect(() => {
    if (!currentUser.id || !postData.id) return;
    checkForLike();
  }, [currentUser, postData]);
  return (
    <>
      <div class="tweetEntry-tweetHolder mb-3">
        <div class="tweetEntry">
          <div class="tweetEntry-content">
            <div className="d-md-flex flex-row justify-content-md-between align-items-md-baseline main-content">
              <Link
                class="tweetEntry-account-group"
                to={`/profile/${_.get(postData, "user.id")}`}
              >
                <img
                  class="tweetEntry-avatar"
                  src="http://placekitten.com/200/200"
                  alt="img"
                />

                <strong class="tweetEntry-fullname">
                  {_.get(postData, "user.full_name")}
                </strong>

                <span class="tweetEntry-username">
                  @<b >{_.get(postData, "user.username")}</b>
                </span>
              </Link>
              <span class="tweetEntry-timestamp">{timePassed}</span>
              <div className="">
                {currentUser.id === _.get(postData, "user.id") ? (
                  <>
                    <FontAwesomeIcon
                      item
                      icon="edit"
                      size="1x"
                      className="mt-3 mx-1"
                      onClick={() => setToggleEditPopUp(true)}
                    />
                    <FontAwesomeIcon
                      item
                      icon="trash"
                      size="1x"
                      className="mt-3 mx-1"
                      onClick={() => setTogglePopUp(true)}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <Typography
              onClick={() => click(postData.id)}
              class="tweetEntry-text-container"
            >
              {postData.body_content}
            </Typography>
          </div>

          {
                postData.files?.map((file) => {
                  return(
                    <img
                  class="optionalMedia-img"
                  src={file.filename}
                  alt="postImage"
                />
                  )
                })
              }

          <div
            class="tweetEntry-action-list"
            style={{ lineHeight: "24px", color: "#b1bbc3" }}
          >
            <FontAwesomeIcon
              icon="comment"
              size="1x"
              className="ml-5 mt-3"
              onClick={() => showComment(!show)}
            />
            <FontAwesomeIcon icon="retweet" size="1x" className="ml-5 mt-3" />
            {currentUserLike ? (
              <FontAwesomeIcon
                icon="heart"
                size="1x"
                className="ml-5 mt-3"
                onClick={() => {
                  onLike(currentUserLike)
                    .then(() => {
                      setCurrentUserLike(!currentUserLike);
                    })
                    .catch((err) => console.log(err));
                }}
                style={{ color: "red" }}
              />
            ) : (
              <FontAwesomeIcon
                icon="heart"
                size="1x"
                className="ml-5 mt-3"
                onClick={() => {
                  onLike(currentUserLike)
                    .then(() => {
                      setCurrentUserLike(!currentUserLike);
                    })
                    .catch((err) => console.log(err));
                }}
              />
            )}

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
                  label="Add comment"
                  multiline={true}
                  name="comment"
                  placeholder="Add comment"
                  ml={5}
                  className="mb-2"
                  value={newComment.content}
                  onChange={(e) =>
                    setNewComment({ ...newComment, content: e.target.value })
                  }
                />
              </form>
              <div className="row">
                <div class="col-md-2 offset-md-10 ">
                  <button
                    className="  mr-md-4  px-4 py-2 post"
                    onClick={() =>
                      onSubmitAddingComment(newComment)
                        .then((res) => {
                          setNewComment({ content: "", postId: postData.id });
                          showComment(false);
                        })
                        .catch((err) => {
                          console.log(err); 
                        })
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
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

      <CustomizedDialogs
        open={toggleEditPopUp}
        setOpen={setToggleEditPopUp}
        post={postData}
        submitEditingPost={submitEditingPost}
      />
    </>
  );
};
export default Post;
