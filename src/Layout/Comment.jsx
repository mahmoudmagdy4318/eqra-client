import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@material-ui/core";
import axiosInstance from "../API/axiosInstance";
import AlertDialog from "../utils/DeleteConfirmation";
import PostLikes from "../Likes/Post_Likes";

const Comment = (props) => {
  const { data, onDelete, onLike } = props;
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
    if (!data.created_at) return;
    setInterval(() => {
      getDateDifference(data.created_at);
    }, 1000);
  }, [data.created_at]);

  return (
    <div
      class="tweetEntry-content p-2"
      style={{ "border-bottom": "1px solid #e1e8ed" }}
    >
      <a class="tweetEntry-account-group" href="[accountURL]">
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
          {data.user.name}
        </strong>

        <span class="tweetEntry-username" style={{ "font-size": "12px" }}>
          @<b>[username]</b>
        </span>

        <span class="tweetEntry-timestamp" style={{ "font-size": "12px" }}>
          {timePassed}
        </span>
      </a>

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
        <FontAwesomeIcon item icon="edit" size="1x" className="mt-3 mx-1" />
        <FontAwesomeIcon
          item
          icon="trash"
          size="1x"
          className="mt-3 mx-1"
          onClick={() => setTogglePopUp(true)}
        />
      </Grid>
      <AlertDialog
        toggle={togglePopUp}
        setOpen={setTogglePopUp}
        onConfirm={onDelete(data.id)}
      />
    </div>
  );
};
export default Comment;
