import React, { useEffect, useState } from "react";
import { MessageComponent } from "./messagecomponent";
import { useSelector } from "react-redux";
export const ChatArea = () => {
  const currentChat = useSelector(state=>state.currentChat)
  const user = useSelector(state=>state.user)
  const [messages,setMessages] = useState()
  const [newMessage,setNewMessage] = useState();
  useEffect(()=>{
    fetchMessages();
    console.log('currentchat',currentChat)
  },[currentChat])
  const fetchMessages = async () => {
    try {
      
      const response = await fetch(import.meta.env.VITE_SERVER_API+'/message/fetchMessage', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          Chat: `${JSON.stringify(currentChat)}`,
        },
      });

      //console.log("Messages fetched");
      const data = await response.json();
      console.log("data.messages", data);

      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = ()=>{
    if(e.key === "Enter")
      handleSendMessage();
  }
  const handleSendMessage = async ()=>{
    try {
      
      const response = await fetch(import.meta.env.VITE_SERVER_API+'/message/saveMessage', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          
        },
        body:JSON.stringify({message:newMessage , chat :currentChat, sender:user._id })
      });

      //console.log("Messages fetched");
      const data = await response.json();
      console.log("data.messages", data);

      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <>
      <div className="flex flex-col bg-gray-600  w-full  h-full ">
        <div className="flex-1">
          {currentChat._id?<MessageNav currentChat={currentChat} user={user} />:<ChatAreaNav curretnChat={currentChat} user={user} />}
        </div>
        <div className="flex gap-4 flex-col ">
          {messages &&currentChat._id&& messages.map(message=>{
            <MessageComponent message={message}/>
          })}
        </div>
        {currentChat._id&&<div className="flex">
          <input
            value={newMessage}
            type="text"
            placeholder="Message..."
            className="flex bg-gray-900 text-slate-400 p-4 m-4 flex-1 rounded-md  outline-none"
            onKeyDownCapture={handlePress}
            onChange={(e)=>setNewMessage(e.target.value)}
          />
        </div>}
      </div>
    </>
  );
};

const ChatAreaNav = ({currentChat}) => {
  return (
    <>
      <div className="flex justify-around  relative w-full h-10 chataeranav bg-slate-700 text-white">
        <ul className=" w-full flex gap-10 px-4">
          <li>friends</li>
          <li>friends</li>
          <li>friends</li>
          <li>friends</li>
        </ul>
        <div className="flex">
          <ul className=" w-full flex gap-10 px-4">
            <li>other</li>
            <li>other</li>
          </ul>
        </div>
      </div>
    </>
  );
};

const MessageNav = ({currentChat,user})=>{
  console.log('curretn chat in the message nav',currentChat)
  return (
    <>
      <div className="flex justify-around  relative w-full h-10 chataeranav bg-slate-700 text-white">
        <ul className=" w-full flex gap-10 px-4">
          <li>{currentChat._id!==null&&(currentChat.name||currentChat.members.map(member=>{
          console.log(member)
            if(member._id!==user._id){
            return member.name
            }
          }))}</li>
          <li>friends</li>
          <li>friends</li>
          <li>friends</li>
        </ul>
        <div className="flex">
          <ul className=" w-full flex gap-10 px-4">
            <li>other</li>
            <li>other</li>
          </ul>
        </div>
      </div>
    </>
  );
};



