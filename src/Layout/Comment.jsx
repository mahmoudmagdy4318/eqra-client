import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Grid,

} from "@material-ui/core";

const Comment = () => {
  return (
    <div
      class="tweetEntry-content p-2"
      style={{ "border-bottom": "1px solid #e1e8ed" }}
    >
      <a class="tweetEntry-account-group" href="[accountURL]">
        <img
          class="tweetEntry-avatar"
          src="http://placekitten.com/200/200"
          alt=""
          style={{
            width: "30px",
            height: "30px",
            "margin-left": "-42px",
          }}
        />

        <strong class="tweetEntry-fullname" style={{ "font-size": "12px" }}>
          [fullname]
        </strong>

        <span class="tweetEntry-username" style={{ "font-size": "12px" }}>
          @<b>[username]</b>
        </span>

        <span class="tweetEntry-timestamp" style={{ "font-size": "12px" }}>
          - [timestamp]
        </span>
      </a>

      <div class="tweetEntry-text-container" style={{ "font-size": "12px" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam ipsum,
        finibus ac est sed, vestibulum condimentum neque. Sed eget iaculis
      </div>

      <Grid container xs={12} justify={"flex-end"} style={{ color: "#b1bbc3" }}>
        <FontAwesomeIcon item icon="heart" size="1x" className="mt-3 mx-1" />
        <FontAwesomeIcon item icon="edit" size="1x" className="mt-3 mx-1" />
        <FontAwesomeIcon item icon="trash" size="1x" className="mt-3 mx-1" />
      </Grid>
    </div>
  );
};
export default Comment;
