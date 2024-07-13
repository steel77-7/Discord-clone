import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export const Dashboard = () => {
  const currentChat = useSelector((state) => state.currentChat);
  const user = useSelector((state) => state.user);

  

  //establishing socket connection 
 



  

  return (
    <>
      <div className="flex flex-col bg-gray-600  w-full  h-full ">
        <div className="flex-1">
        
            <ChatAreaNav curretnChat={currentChat} user={user} />
         
        </div>
        <div className="flex gap-4 flex-col overflow-y-auto">
          {/*friend lsit goes here*/ }
        </div>
        {currentChat._id && (
          <div className="flex">
            
          </div>
        )}
      </div>
    </>
  );
};

const ChatAreaNav = ({ currentChat }) => {
  return (
    <>
      <div className="flex justify-around iems-center relative w-full h-10 chataeranav bg-slate-700 text-white">
        <ul className=" w-full flex gap-10 px-4">
          <li>Friends</li>
          <li><button className="flex  p-0.5  bg-lime-600 rounded-md "> Add Friend</button></li>
        
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

const MessageNav = ({ currentChat, user }) => {

  return (
    <>
      <div className="flex justify-around items-center relative w-full h-10 chataeranav bg-slate-700 text-white">
        <ul className=" w-full flex gap-10 px-4">
          <li>
            {currentChat._id !== null &&
              (currentChat.name ||
                currentChat.members.map((member) => {
                  if (member._id !== user._id) {
                    return member.name;
                  }
                }))}
          </li>
          {/* <li>friends</li>
          <li>friends</li>
          <li>friends</li> */}
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



