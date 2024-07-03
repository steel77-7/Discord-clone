import React from "react";
import { ServerNavbar } from "./serverNavbar";
import { ChatNav } from "./chatnav";
import { ChatArea } from "./chat/chatarea";

export const Mainarea = () => {
  return (
    <>
      <div className="w-screen h-svh flex  overflow-hidden ">
          <ServerNavbar />
          <ChatNav />
          <ChatArea />
        
      </div>
    </>
  );
};
