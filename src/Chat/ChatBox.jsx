import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Pusher from "pusher-js";
import ChatList from "./ChatList";
import axiosInstance from "../API/axiosInstance";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { UserContext } from "../context/userContext";
import { getMessages, sendMessage } from "./service/messages";

const ChatBox = () => {
  const {
    data: { user: currentUser },
  } = useContext(UserContext);
  const [classes, setClasses] = useState("chatbox chatbox22 chatbox--closed");
  const [open, setOpen] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const [reciever, setReciever] = useState({});
  const [messages, setMessages] = useState([]);
  Pusher.logToConsole = true;

  const pusher = new Pusher("0e0882c25b1299c47bdb", {
    cluster: "mt1",
    authEndpoint: "/broadcasting/auth",
    auth: {
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  });
  // debugger;
  useEffect(() => {
    // debugger;
    if (!currentUser.id) return;
    console.log("one", currentUser);
    const channel = pusher.subscribe("private-chat." + currentUser.id);
    channel.bind("message-sent", function (data) {
      console.log({ data });
    });
  }, [JSON.stringify(currentUser)]);

  const handleChatBoxStatus = (e) => {
    e.stopPropagation();
    setOpen(!open);
    const status = open
      ? "chatbox chatbox22 chatbox--tray"
      : "chatbox chatbox22";
    setClasses(status);
  };

  const sendMyMessage = async () => {
    const data = [
      ...messages,
      { user_id: reciever.followed_id, message: currentMessage },
    ];
    setMessages(data);
    sendMessage(reciever.followed_id, currentMessage);
  };

  const getMyMessages = async (reciever) => {
    const messages = await getMessages(reciever.followed_id);
    setMessages(messages);
  };

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const closeChatBox = (e) => {
    e.stopPropagation();
    setClasses("chatbox chatbox22 chatbox--closed");
  };

  const openChatBox = (reciever) => {
    console.log(reciever);
    setMessages([]);
    setReciever(reciever);
    getMyMessages(reciever);
    setClasses("chatbox chatbox22");
  };

  return (
    <React.Fragment>
      <div className={classes}>
        <div class="chatbox__title" onClick={handleChatBoxStatus}>
          {reciever.pictur && (
            <Avatar alt="Profile Picture" src={reciever.pictur} />
          )}
          <AccountCircleIcon />
          <h5>{reciever.full_name}</h5>
          <button class="chatbox__title__close" onClick={closeChatBox}>
            <span>
              <svg viewBox="0 0 12 12" width="12px" height="12px">
                <line
                  stroke="#FFFFFF"
                  x1="11.75"
                  y1="0.25"
                  x2="0.25"
                  y2="11.75"
                ></line>
                <line
                  stroke="#FFFFFF"
                  x1="11.75"
                  y1="11.75"
                  x2="0.25"
                  y2="0.25"
                ></line>
              </svg>
            </span>
          </button>
        </div>
        <div class="chatbox__body">
          {messages.map(({ user_id, message, created_at }) => (
            <div>
              {currentUser.id !== user_id && (
                <div class="chatbox__body__message chatbox__body__message--left">
                  <div class="chatbox_timing">
                    <ul>
                      <li>
                        <i class="fa fa-calendar"></i> 22/11/2018
                      </li>
                      <li>
                        <i class="fa fa-clock-o"></i> 7:00 PM
                      </li>
                    </ul>
                  </div>
                  <div class="clearfix"></div>
                  <div class="ul_section_full">
                    <ul class="ul_msg">
                      <li>
                        <strong>You</strong>
                      </li>
                      <li>{message}</li>
                    </ul>
                    <div class="clearfix"></div>
                    <ul class="ul_msg2">
                      <li>
                        <i class="fa fa-pencil"></i>
                      </li>
                      <li>
                        <i class="fa fa-trash chat-trash"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {currentUser.id === user_id && (
                <div class="chatbox__body__message chatbox__body__message--right">
                  <div class="chatbox_timing">
                    <ul>
                      <li>
                        <i class="fa fa-calendar"></i> 22/11/2018
                      </li>
                      <li>
                        <i class="fa fa-clock-o"></i> 7:00 PM
                      </li>
                    </ul>
                  </div>
                  <div class="clearfix"></div>
                  <div class="ul_section_full">
                    <ul class="ul_msg">
                      <li>
                        <strong>{reciever.full_name}</strong>
                      </li>
                      <li>{message}</li>
                    </ul>
                    <div class="clearfix"></div>
                    <ul class="ul_msg2">
                      <li>
                        <i class="fa fa-pencil"></i>
                      </li>
                      <li>
                        <i class="fa fa-trash chat-trash"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div class="panel-footer">
          <div class="input-group">
            <input
              id="btn-input"
              type="text"
              class="form-control input-sm chat_set_height"
              placeholder="Type your message here..."
              tabIndex="0"
              value={currentMessage}
              onChange={handleChange}
            />
            <span class="input-group-btn">
              <button
                onClick={sendMyMessage}
                class="btn bt_bg btn-sm"
                id="btn-chat"
              >
                Send
              </button>
            </span>
          </div>
        </div>
      </div>
      <ChatList openChatBox={openChatBox} />
    </React.Fragment>
  );
};

export default ChatBox;
