import React from "react";
import { DmChatNav } from "../impementationstructures/dmChatNavStructure";
import { useSelector, useDispatch } from "react-redux";
import { ServerChatNavStructure } from "../impementationstructures/serverChatNavStructure";
export const ChatNav = () => {
  const user = useSelector((state) => state.user);
  const server = useSelector(state=>state.serverInfo)
  return (
    <>
      <div className="flex flex-col">
        {server._id!==null?<ServerChatNavStructure/>:<DmChatNav />}
        <UserComponent user={user} />
      </div>
    </>
  );
};



const UserComponent = ({ user }) => {
  return (
    <>
      <div className="flex w-w-chatList absolute bottom-0 flex-grow flex-1 bg-gray-800 h-24 items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <img src="" alt="" className="flex h-10 w-10 bg-white rounded-full" />
          {user.name}
        </div>
        <div className="flex">
          <ul className="flex gap-3 mx-2">
            <li>option</li>
            <li>option</li>
            <li>option</li>
          </ul>
        </div>
      </div>
    </>
  );
};
