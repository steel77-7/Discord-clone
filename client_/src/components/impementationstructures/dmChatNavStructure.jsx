import React from "react";

export const DmChatNav = () => {

    
  return (
    <>
      <div className="flex h-full flex-col  w-w-chatList bg-slate-700 left-20">
        <div className="flex w-96 h-fit items-center flex-col border-b  border-solid border-slate-900 ">
          <input
            type="text"
            className="h-7 w-72 m-2 p-1 relative -left-10 bg-slate-800 rounded-md text-white placeholder-slate-200 "
            placeholder="Find a conversation"
          />
        </div>
        <ChatNavRoutes />
        <DirectMessages />
      </div>
    </>
  );
};

const ChatNavRoutes = () => {
  return (
    <>
      <div className="flex cahtnavroutes text-slate-300">
        <ul className="flex flex-col  m-3 text-xl flex-grow">
          <li className="hover:bg-slate-400 p-2 rounded-md">Friends</li>
          <li className="hover:bg-slate-400 p-2 rounded-md">Nitro</li>
          <li className="hover:bg-slate-400 p-2 rounded-md">Shop</li>
        </ul>
      </div>
    </>
  );
};

const DirectMessages = () => {
  return (
    <>
      <div className="flex flex-col text-slate-300">
        <div className="flex justify-between flex-1 p-3">
          Direct Messages
          <button className="h-3 w-3 rounded-full  flex ">+</button>
        </div>

        <div className="flex flex-col  gap-3 h-dmHeight   overflow-y-auto  overflow dm-scroll">
        {Array(50).fill().map((_, index) => (
          <SingleDirectMessageComponent key={index} />
        ))}
      </div>
      </div>
    </>
  );
};

const SingleDirectMessageComponent = () => {
  return (
  <>
    <div className="flex flex-1 justify-around p-4 hover:bg-slate-400 m-1 rounded-md">
      <img src="" alt="loading" className="flex h-10 w-10 rounded-full bg-slate-50" />  
      someone
    </div>
  </>
  );
};


/* import React from "react";

export const DmChatNav = () => {
  return (
    <div className="flex h-full flex-col w-w-chatList bg-slate-700">
      <div className="flex w-96 h-fit items-center flex-col border-b border-solid border-slate-900">
        <input
          type="text"
          className="h-7 w-72 m-2 p-1 relative -left-10 bg-slate-800 rounded-md text-white placeholder-slate-200"
          placeholder="Find a conversation"
        />
      </div>
      <ChatNavRoutes />
      <DirectMessages />
    </div>
  );
};

const ChatNavRoutes = () => {
  return (
    <div className="flex text-slate-300">
      <ul className="flex flex-col m-3 text-xl flex-grow">
        <li className="hover:bg-slate-400 p-2 rounded-md">Friends</li>
        <li className="hover:bg-slate-400 p-2 rounded-md">Nitro</li>
        <li className="hover:bg-slate-400 p-2 rounded-md">Shop</li>
      </ul>
    </div>
  );
};

const DirectMessages = () => {
  return (
    <div className="flex flex-col text-slate-300 flex-grow">
      <div className="flex justify-between items-center p-3">
        Direct Messages
        <button className="h-6 w-6 rounded-full flex items-center justify-center bg-slate-800 text-white">+</button>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {Array(10).fill().map((_, index) => (
          <SingleDirectMessageComponent key={index} />
        ))}
      </div>
    </div>
  );
};

const SingleDirectMessageComponent = () => {
  return (
    <div className="flex items-center p-4 hover:bg-slate-400 m-1 rounded-md">
      <img src="" alt="User avatar" className="h-10 w-10 rounded-full bg-slate-50" />
      <span className="ml-3">Someone</span>
    </div>
  );
};

 */