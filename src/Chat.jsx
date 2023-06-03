import React from 'react'
import { useState } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import SettingsPowerIcon from "@material-ui/icons/SettingsPower"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import Picker from "emoji-picker-react";
import "./Chat.css";
import { useNavigate } from 'react-router-dom'
import axios from "./axios"
import { useEffect,useRef } from 'react';
import { allUsersRoute } from './APIRoutes';
import Logout from './Logout';
import {sendMessageRoute,getMessageRoute} from "./APIRoutes"

function Chat({ currentChat,currentUser,socket}) {

  const [messages,setMessages] = useState([]);
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(()=>{
    (
      async()=>{
        const response = await axios.post(getMessageRoute,{
          from:currentUser._id,
          to:currentChat._id,
        })
        setMessages(response.data);
      }
      
    )() ;
    
  },[currentChat,messages]);

  const navigate = useNavigate();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  



  const handleSendMessage = async (msg) => {
    await axios.post(sendMessageRoute,{
      from : currentUser._id,
      to:currentChat._id,
      message:msg
    });
    //socket code : start

    socket.current.emit("send-msg",{
      to:currentChat._id,
      from:currentUser._id,
      message:msg,
    });

    const msgs = [...messages];
    msg.push({fromSelf:true,message:msg});
    setMessages(msgs);
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
        setArrivalMessage({fromSelf:false,message:msg});
      });
    }
  },[]);

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>
      [...prev,arrivalMessage]
    ) 
  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages]);


  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);

  };

  const sendChat = (e)=>{
    e.preventDefault();
    if(msg.length>0){
      handleSendMessage(msg);
      setMsg('');
    }
  }
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
        <div className="chat_headerInfo">
          <h3>{currentChat.username}</h3>
          <p>Last Seen at .....</p>
        </div>
        <div className="chat_headerRight">
          <IconButton onClick={() => {
            const handleClick = async () => {
              localStorage.clear();
              navigate("/");
            };
            handleClick();
          }}>

            <SettingsPowerIcon />

          </IconButton>

        </div>
      </div>

      <div className="chat_body">
        {messages.map((message)=>(
          <p className={`chat_message ${message.fromSelf ? "": "chat_reciever"}`}>
          <span className="chat_name">{message.name}</span>
          {message.message}
          <span className="chat_timestamp">{message.timestamp}</span>
        </p>
        ))}

        
      </div>
      <div className="chat_footer">
        <InsertEmoticonIcon onClick={handleEmojiPickerHideShow} />
        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        <form>
          <input value={msg} onChange={(e) => { setMsg(e.target.value) }} placeholder="Type..." type="test" />
          <button onClick={(e) => { sendChat(e)}} type="submit">Send a message</button>

        </form>
        <MicIcon />
      </div>

    </div>
  )
}

export default Chat