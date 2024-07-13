import React, { useState } from "react";
import { ServerNavbar } from "./serverNavbar";
import { ChatNav } from "./chatnav";
import { ChatArea } from "./chat/chatarea";
import { Outlet } from "react-router-dom";
import { Dashboard } from "./dashboard";
export const Mainarea = () => {
  const [serverPress, setServerPress] = useState(false);
  const [serverCreationPress, setServerCreationPress] = useState(false);

  return (
    <>
      <div className="w-screen h-svh flex  overflow-hidden ">
        <ServerNavbar
          setServerCreationPress={setServerCreationPress}
          serverCreationPress={serverCreationPress}
        />

        <ChatNav serverPress={serverPress} />
        <Outlet />
      </div>
    </>
  );
};
