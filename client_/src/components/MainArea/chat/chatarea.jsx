import React from "react";
import { MessageComponent } from "./messagecomponent";
export const ChatArea = () => {
  return (
    <>
      <div className="flex flex-col bg-gray-600  w-full  h-full ">
        <div className="flex-1">
          <ChatAreaNav />
        </div>
        <div className="flex gap-4 flex-col ">
          <MessageComponent />
          <MessageComponent />
          <MessageComponent />
          <MessageComponent />
          <MessageComponent />
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Message..."
            className="flex bg-gray-900 text-slate-400 p-4 m-4 flex-1 rounded-md  outline-none"
          />
        </div>
      </div>
    </>
  );
};

const ChatAreaNav = () => {
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


