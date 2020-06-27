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
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import StarBorderIcon from '@material-ui/icons/StarBorder';


// const useStyles = makeStyles((theme) => ({
  // root: {
  //   "& > *": {
  //     margin: theme.spacing(1),
  //     width: "100%",
  //   },
  // },
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%",
      },
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));
// }));

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
          <div class="tweetEntry-content mb-5">
            <div className="d-md-flex flex-row justify-content-md-between align-items-md-baseline main-content">
              <Link
                class="tweetEntry-account-group"
                to={`/profile/${postData.user.role}/${_.get(postData, "user.id")}`}
              >
              
                {postData.user.pictur == null && (
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    alt=""
                    width="60"
                    height="60"
                    className="tweetEntry-avatar"
                    
                  />
                )}
                {postData.user.pictur != null && (
                  <img
                    src={`http://localhost:8000${postData.user.pictur}`}
                    width="60"
                    height="60"
                    alt=""
                    className="tweetEntry-avatar"
                    
                  />
                )}
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

          {/* {
                postData.files?.map((file) => {
                  return(
                    <img
                  class="optionalMedia-img "
                  src={file.filename}
                  alt="postImage"
                />
                  )
                })
              } */}
          <GridList className={classes.gridList} cols={2.5}>
            {postData.files?.map((tile) => (
              <GridListTile key={tile.filename}>
                <img src={tile.filename} alt="post image" />
                <GridListTileBar
                
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                
                />
              </GridListTile>
            ))}
          </GridList>

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
