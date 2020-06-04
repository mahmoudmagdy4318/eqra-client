import React, { useEffect } from "react";
import axiosInstance from "../API/axiosInstance";
function PostLikes(props) {
  const { id } = props;
  useEffect(async () => {
    try {
      const likes = await axiosInstance.get(`api/post/${id}/likes`);
      console.log(likes);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return <div></div>;
}

export default PostLikes;
