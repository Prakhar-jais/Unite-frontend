import React from 'react'
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import black from "@material-ui/core/colors/black";
import { Avatar, IconButton } from "@material-ui/core";
import "./Sidebar.css";
import { useState, useEffect ,useRef} from 'react';
import SidebarChatComp from './SidebarChatComp';
import { allUsersRoute ,host} from './APIRoutes';
import { useNavigate } from 'react-router-dom'
import axios from "./axios"
import Welcome from './Welcome';
import Chat from "./Chat"
import {io} from "socket.io-client";

function Sidebar() {


  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat] = useState(undefined)
  useEffect(() => {
    ( async() => {
      if (!localStorage.getItem("App-User")) {
        navigate("/");
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem("App-User")))
        
        
      }
    })()

  }, [])
//socket code use effect start:
  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser]);
// end :
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data)
          
        }
        else {
       
          navigate("/setAvatar");
        }
      }
    })()

  }, [currentUser]);

  const handleChatChange = (chat)=>{
      setCurrentChat(chat);
  }
  

  return (
    
    <>
      {
        
        
        currentUser && (
          <div className="sidebar">
            <div className='sidebar_header'>
              <div>

                <Avatar  src ={`data:image/svg+xml;base64,${currentUser.avatarImage}`} style={{
                  border: "2px solid black",


                }}  />
                <h4>{currentUser.username}</h4>
              </div>
              <div className='sidebar_headerRight'>
                <IconButton>
                  <DonutLargeIcon style={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <ChatIcon style={{ color: "black" }} />
                </IconButton>
                <IconButton>
                  <MoreVertIcon style={{ color: "black" }} />
                </IconButton>
              </div>
            </div>
            <div className="sidebar_search">
              <div className='sidebar_searchContainer'>
                <SearchOutlinedIcon style={{ color: "black" }} />
                <input placeholder='New Chat' type='text' />
              </div>
            </div>

            <div className="sidebar_chats">
              <SidebarChatComp contacts={contacts} currentUser={currentUser}  changeChat={handleChatChange}/>
              {/* <Welcome currentUser={currentUser}/> */}

            </div>

          </div>
        )


      }
      {

        currentChat === undefined ?(
          <Welcome currentUser={currentUser}/>
        ) : (
          <Chat currentChat={currentChat} currentUser={currentUser} socket = {socket}/>
        )
      }
        

    </>

  )
}

export default Sidebar; 