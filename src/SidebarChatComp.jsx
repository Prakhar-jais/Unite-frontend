import React from 'react'
import "./SidebarChatComp.css";
import { Avatar, } from "@material-ui/core";
import { useState, useEffect } from 'react';

export default function SidebarChatComp({ contacts, currentUser ,changeChat}) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };


  return (
    <>

      {
        currentUserImage && currentUserName && (
          <div className="sidebarChat">
            {
              contacts.map((contact, index) => {
                return <>
                <div className={`contact ${index===currentSelected ?"selected":""}`} 
                key={index} onClick={()=>{
                  changeCurrentChat(index,contact);
                }} >
                  <Avatar  src={`data:image/svg+xml;base64,${contact.avatarImage}`} />
                  <div className="sidebarChat__info">
                    <div className="roomName">
                      <h2>{contact.username}</h2>
                    </div>
                    <div className="message">
                      <p>This is the last message</p>
                    </div>

                  </div>
                  </div>
                </>
              })
              
            }
            
            

          </div>
        )
      }
    </>


  )
}

