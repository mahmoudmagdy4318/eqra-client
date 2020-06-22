import React, { Fragment, useEffect, useContext, useState } from 'react';
import { UserContext } from "../../context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from '../../API/axiosInstance';
const FollowComponent = (props) => {
    const {
        data: { user: currentUser },
      } = useContext(UserContext);
    const id = props.id;
    const updateFollowers = props.updateFollowers;
    const updateFollowing = props.updateFollowing;
  const [followText, updateFollowText] = useState("");

    const enterBtn = (e) => {
        if (followText == "following") {
          updateFollowText("unfollow");
        }
      };
      const leaveBtn = (e) => {
        if (followText == "unfollow") {
          updateFollowText("following");
        }
      };
      const clickBtn = (e) => {
        if (followText == "unfollow") {
          unfollow();
        }
        if (followText == "follow") {
          sendFollow();
        }
        bringFollowers(id);
        following(id);
      };
      const bringFollowers = async (userId) => {
        try {
          const followers = await axiosInstance.get(`api/my-followers/${userId}`);
          // console.log(followers);
          updateFollowers(followers.length);
        } catch (error) {
          console.log(error);
        }
      };
      const following = async (userId) => {
        try {
          const following = await axiosInstance.get(
            `api/persons-i-follow/${userId}`
          );
          updateFollowing(following.length);
        } catch (error) {
          console.log(error);
        }
      };
      const unfollow = async () => {
        try {
          const sendUnfollow = axiosInstance.delete(`api/unfollow/${id}`);
          console.log(sendUnfollow);
          updateFollowText("follow");
        } catch (error) {
          console.error(error);
        }
      };
      const sendFollow = async () => {
        try {
          const sendUnfollow = axiosInstance.post(`api/follow/${id}`);
          console.log(sendUnfollow);
          updateFollowText("following");
        } catch (error) {
          console.error(error);
        }
      };
      const mainUserFollowers = async (userId) => {
        try {
          console.log(userId);
          const followers = await axiosInstance.get(
            `api/persons-i-follow/${userId}`
          );
          console.log(followers);
          const guestExist = followers.some((ele) => ele.followed_id == id);
          if (guestExist == true) {
            console.log(guestExist);
            updateFollowText("following");
          } else {
            console.log(guestExist);
            updateFollowText("follow");
          }
          // debugger
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        mainUserFollowers(currentUser.id);
      }, [id]);
    return(
        <Fragment>
            {id != currentUser.id ? 
              <button
                class="btn btn-rounded btn-info"
                onMouseOver={(e) => {
                  enterBtn(e);
                }}
                onMouseLeave={(e) => {
                  leaveBtn(e);
                }}
                onClick={(e) => {
                  clickBtn(e);
                }}
              >
                {followText == "follow" && (
                  <FontAwesomeIcon
                    item
                    icon="plus"
                    size="1x"
                    className="mt-3 mx-1"
                  />
                )}
                <span>{followText}</span>
              </button>
             : "Loading"}
        </Fragment>
    )
}
export default FollowComponent;