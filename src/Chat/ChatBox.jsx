import React, { useState, useContext, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Pusher from "pusher-js";
import ChatList from "./ChatList";
import SendIcon from '@material-ui/icons/Send';
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
  const [messages, setMessages] = useState({});
  const [notifications, setNotifications] = useState({});
  const messagesEndRef = useRef(null);
  Pusher.logToConsole = false;

  const pusher = new Pusher("72450be663ca31a2c7b3", {
    cluster: "us2",
    authEndpoint: "/broadcasting/auth",
    auth: {
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("Authorization"),
      },
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const channel = pusher.subscribe("private-chat." + currentUser.id);
    channel.bind("message-sent",function ({message,user}) {
      if(classes==="chatbox chatbox22 chatbox--closed"){
        const data={...notifications}; 
        data[`notification.${user.id}`]={id:user.id};
        setNotifications(data);
      }else{
        const senderMessages = [
          ...messages[`message.${user.id}`],
          { reciever_id: currentUser.id,user_id:user.id ,message: message.message },
        ];
        const data={...messages}
        data[`message.${user.id}`]=senderMessages;
        setMessages(data);
      }
      return;
  });

  useEffect(() => {
    scrollToBottom();
    
    
  }, [notifications,messages]);

  const handleChatBoxStatus = (e) => {
    e.stopPropagation();
    setOpen(!open);
    const status = open
      ? "chatbox chatbox22 chatbox--tray"
      : "chatbox chatbox22";
    setClasses(status);
  };


  const sendMyMessage = async () => {
    const recieverMessages = [
      ...messages[`message.${reciever.id}`],
      { reciever_id: reciever.id,user_id:currentUser.id ,message: currentMessage },
    ];
    const data={...messages}
    data[`message.${reciever.id}`]=recieverMessages;
    setMessages(data);
    setCurrentMessage('');
    scrollToBottom();
    sendMessage(reciever.id, currentMessage);
  };

  const getMyMessages = async (reciever) => {
    const recieverMessages = await getMessages(reciever.id);
    const data={...messages};
    data[`message.${reciever.id}`]=recieverMessages;
    setMessages(data);
  };

  const handleChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const closeChatBox = (e) => {
    e.stopPropagation();
    setClasses("chatbox chatbox22 chatbox--closed");
  };

  const openChatBox = async (reciever) => {
    const data={...notifications};
    data[`notification.${reciever.id}`]=null;
    setNotifications(data);
    await getMyMessages(reciever);
    setReciever(reciever);
    setClasses("chatbox chatbox22");
    scrollToBottom();
  };

  const resetNotifications=()=>{
    const data={...notifications};
    data[`notification.${reciever.id}`]=null;
    setNotifications(data);
  }

  return (
    <React.Fragment>
      <div className={classes}>
        <div class="chatbox__title" onClick={handleChatBoxStatus}>
          {reciever.pictur && (
            <Avatar alt="Profile Picture" src={reciever.pictur} />
          )}
          {!reciever.pictur && (
            <AccountCircleIcon />  
          )}
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
          {messages[`message.${reciever.id}`] && messages[`message.${reciever.id}`].map(({ user_id, message, created_at }) => (
            <div>
              {currentUser.id === user_id && (
                <div class="chatbox__body__message chatbox__body__message--left">
                  <div class="chatbox_timing">
                    <ul>
                      {created_at&&<li>
                        <i class="fa fa-calendar"></i> {new Date(created_at).toLocaleString()}
                      </li>}
                      {!created_at&&<li>
                        <i class="fa fa-calendar"></i> {new Date().toLocaleString()}
                      </li>}
  
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
              {currentUser.id !== user_id && (
                <div class="chatbox__body__message chatbox__body__message--right">
                  <div class="chatbox_timing">
                    <ul>
                    {created_at&&<li>
                        <i class="fa fa-calendar"></i> {new Date(created_at).toLocaleString()}
                      </li>}
                      {!created_at&&<li>
                        <i class="fa fa-calendar"></i> {new Date().toLocaleString()}
                      </li>}
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
          <div ref={messagesEndRef} />
        </div>
        <div class="panel-footer">
          <div class="input-group">
            <input
              id="btn-input"
              type="text"
              class="form-control input-sm chat_set_height"
              placeholder="Type Here..."
              tabIndex="0"
              value={currentMessage}
              onChange={handleChange}
              onFocus={resetNotifications}
            />
            <span class="input-group-btn">
              <button
                onClick={sendMyMessage}
                class="btn btn-primary"
                id="btn-chat"
                disabled={!currentMessage}
              >
                <SendIcon/>
              </button>
            </span>
          </div>
        </div>
      </div>
    <ChatList openChatBox={openChatBox} notifications={notifications}/>
    </React.Fragment>
  );
};

export default ChatBox;
