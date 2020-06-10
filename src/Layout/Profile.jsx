import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "./Post";
import "../styles/profile.css";
import axiosInstance from "../API/axiosInstance";

const Profile = () => {
  const getUserData = async () => {
    console.log("call");
    const userData = await axiosInstance.get(`api/auth/user`);
    console.log(userData);
    // setPosts([...posts, ...postsData.data]);
    // setLastPage(postsData.meta.last_page);
  };
  useEffect(
    getUserData()
  );
  return (
    <div class="">
      <div class="col-lg-12 p-0">
        <div class="panel profile-cover">
          <div class="profile-cover__img">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar6.png"
              alt=""
            />
            <h3 class="h3">Henry Foster</h3>
          </div>
          <div class="profile-cover__action bg--img" data-overlay="0.3">
            <button class="btn btn-rounded btn-info">
              <FontAwesomeIcon
                item
                icon="edit"
                size="1x"
                className="mt-3 mx-1"
              />
              <span>Edit profile</span>
            </button>
            <button class="btn btn-rounded btn-info">
              <FontAwesomeIcon
                item
                icon="plus"
                size="1x"
                className="mt-3 mx-1"
              />
              <span>Follow</span>
            </button>
            <button class="btn btn-rounded btn-info">
              <FontAwesomeIcon
                item
                icon="comment"
                size="1x"
                className="mt-3 mx-1"
              />
              <span>Message</span>
            </button>
          </div>
          <div class="profile-cover__info">
            <ul class="nav">
              <li>
                <strong>26</strong>Projects
              </li>
              <li>
                <strong>33</strong>Followers
              </li>
              <li>
                <strong>136</strong>Following
              </li>
            </ul>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading">
            <h3 class="panel-title">Activity Feed</h3>
          </div>
          <div class="panel-content panel-activity">
            <form action="#" class="panel-activity__status mb-2">
              <textarea
                name="user_activity"
                placeholder="Share what you've been up to..."
                class="form-control"
              ></textarea>
              <div class="actions">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Image"
                  >
                    <FontAwesomeIcon
                      item
                      icon="image"
                      size="1x"
                      className="mt-3 mx-1"
                    />
                  </button>
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Video"
                  >
                    <i class="fa fa-video-camera"></i>
                  </button>
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Idea"
                  >
                    <i class="fa fa-lightbulb-o"></i>
                  </button>
                  <button
                    type="button"
                    class="btn-link"
                    title=""
                    data-toggle="tooltip"
                    data-original-title="Post an Question"
                  >
                    <i class="fa fa-question-circle-o"></i>
                  </button>
                </div>
                <button type="submit" class="btn btn-sm btn-rounded btn-info">
                  Post
                </button>
              </div>
            </form>
            {/* <Post /> */}
            {/* <Post /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
