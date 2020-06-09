import React,{useState} from 'react'; 

const ChatBox = () => { 
  
  const [classes,setClasses] = useState("chatbox chatbox22"); 
  const [open, setOpen] =useState(true); 
  const [currentMessage, setCurrentMessage] =useState(''); 
  const [sentMessages, setSentMessages] =useState([]); 
  const handleChatBoxStatus=()=>{ 
    setOpen(!open); const status=
    open ? "chatbox chatbox22 chatbox--tray":"chatbox chatbox22";
    setClasses(status); 
  } 

  const handleChange=(e)=>{
    setCurrentMessage(e.target.value);
  }

  
    return (
        <React.Fragment>
          <div className={classes}>
            <div class="chatbox__title" onClick={handleChatBoxStatus}>
              <h5>Leave a message</h5>
              <button class="chatbox__title__close">
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
              <div class="chatbox__body__message chatbox__body__message--left">
                <div class="chatbox_timing">
                  <ul>
                    <li><i class="fa fa-calendar"></i> 22/11/2018</li>
                    <li><i class="fa fa-clock-o"></i> 7:00 PM</li>
                  </ul>
                </div>
                <img src="https://www.gstatic.com/webp/gallery/2.jpg" alt="user" />
                <div class="clearfix"></div>
                <div class="ul_section_full">
                  <ul class="ul_msg">
                    <li><strong>Person Name</strong></li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
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
              <div class="chatbox__body__message chatbox__body__message--right">
                <div class="chatbox_timing">
                  <ul>
                    <li><i class="fa fa-calendar"></i> 22/11/2018</li>
                    <li><i class="fa fa-clock-o"></i> 7:00 PM</li>
                  </ul>
                </div>
                <img src="https://www.gstatic.com/webp/gallery/2.jpg" alt="user" />
                <div class="clearfix"></div>
                <div class="ul_section_full">
                  <ul class="ul_msg">
                    <li><strong>Person Name</strong></li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
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
            </div>
            <div class="panel-footer">
              <div class="input-group">
                <input
                  id="btn-input"
                  type="text"
                  class="form-control input-sm chat_set_height"
                  placeholder="Type your message here..."
                  tabindex="0"
                  value={currentMessage}
                  onChange={handleChange}
                />
                <span class="input-group-btn">
                  <button class="btn bt_bg btn-sm" id="btn-chat">
                    Send
                  </button>
                </span>
              </div>
            </div>
          </div>
        </React.Fragment> 
    ); 
} 

export default ChatBox;
