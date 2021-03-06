import axiosIntance from "../../API/axiosInstance";
import axiosInstance from "../../API/axiosInstance";

export async function getMessages(recieverId) {
  console.log(recieverId);
  return await axiosInstance.get(`/api/private-messages/${recieverId}`);
}

export async function sendMessage(reciever_id, message) {
  return await axiosInstance.post("/api/private-messages", {
    reciever_id,
    message,
  });
}

export async function getUnseenMessagesUsers() {
  return await axiosInstance.get("/api/unseen");
}

export async function seenMessages(id) {
  return await axiosInstance.post(`/api/seen/${id}`);
}

// axiosInstance.post("/api/chat",{message:"hello world"});
