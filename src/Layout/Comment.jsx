import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import axiosInstance from "../API/axiosInstance";
import AlertDialog from "../utils/DeleteConfirmation";
import PostLikes from "../Likes/Post_Likes";
import { Link } from "react-router-dom";
import _ from "lodash";
import CustomizedDialogs from "../utils/Edit";
import { UserContext } from "../context/userContext";

const Comment = (props) => {
  const { data, onDelete, onLike, submitEditingPost } = props;
  const [timePassed, setTimePassed] = useState("");
  const [togglePopUp, setTogglePopUp] = useState(false);
  const [toggleEditPopUp, setToggleEditPopUp] = useState(false);
  const currentUser = useContext(UserContext);

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
    if (!data.created_at) return;
    setInterval(() => {
      getDateDifference(data.created_at);
    }, 5000);
  }, [data.created_at]);

  return (
    <div
      class="tweetEntry-content p-2"
      style={{ "border-bottom": "1px solid #e1e8ed" }}
    >
      <Link
        class="tweetEntry-account-group"
        to={`/user/${_.get(data, "user.id")}`}
      >
        <img
          class="tweetEntry-avatar"
          src={require("../assets/avatar.jpg")}
          alt=""
          style={{
            width: "30px",
            height: "30px",
            "margin-left": "-42px",
          }}
        />

        <strong class="tweetEntry-fullname" style={{ "font-size": "12px" }}>
          {data.user.full_name}
        </strong>

        <span class="tweetEntry-username" style={{ "font-size": "12px" }}>
          @<b>{data.user.username}</b>
        </span>

        <span class="tweetEntry-timestamp" style={{ "font-size": "12px" }}>
          {timePassed}
        </span>
      </Link>

      <div class="tweetEntry-text-container" style={{ "font-size": "12px" }}>
        {data.content}
      </div>
      {data.image ? (
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
      <Grid container xs={12} justify={"flex-end"} style={{ color: "#b1bbc3" }}>
        <PostLikes id={data.id} type="comment" noOfLikes={data.likes} />
        <FontAwesomeIcon
          item
          icon="heart"
          size="1x"
          className="mt-3 mx-1"
          onClick={onLike}
        />
        {currentUser.id === _.get(data, "user.id") ? (
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
      </Grid>
      <AlertDialog
        toggle={togglePopUp}
        setOpen={setTogglePopUp}
        onConfirm={onDelete(data.id)}
      />
      <CustomizedDialogs
        open={toggleEditPopUp}
        setOpen={setToggleEditPopUp}
        post={data}
        submitEditingPost={submitEditingPost}
      />
    </div>
  );
};
export default Comment;
