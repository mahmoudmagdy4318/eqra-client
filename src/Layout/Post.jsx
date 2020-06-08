import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Comment from "./Comment";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const Post = () => {
  const classes = useStyles();
  const [show, showComment] = useState(false);

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

              <strong class="tweetEntry-fullname">[fullname]</strong>

              <span class="tweetEntry-username">
                @<b>[username]</b>
              </span>

              <span class="tweetEntry-timestamp">- [timestamp]</span>
            </a>
            <div className="ml-md-5">
            <FontAwesomeIcon item icon="edit" size="1x" className="mt-3 mx-1" />
            <FontAwesomeIcon item icon="trash" size="1x" className="mt-3 mx-1" />
            </div>
            </div>
            <div class="tweetEntry-text-container">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam
              ipsum, finibus ac est sed, vestibulum condimentum neque. Sed eget
              iaculis
            </div>
           
          </div>

          <div class="optionalMedia">
            <img
              class="optionalMedia-img"
              src="http://placekitten.com/500/400"
              alt=""
            />
          </div>

          <div
            class="tweetEntry-action-list"
            style={{ "lineHeight": "24px", color: "#b1bbc3" }}
          >
            <FontAwesomeIcon
              icon="reply"
              size="1x"
              className="ml-5 mt-3"
              onClick={() => showComment(!show)}
            />
            <FontAwesomeIcon icon="retweet" size="1x" className="ml-5 mt-3" />
            <FontAwesomeIcon icon="heart" size="1x" className="ml-5 mt-3" />
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
              <Comment />
              <Comment />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Post;
