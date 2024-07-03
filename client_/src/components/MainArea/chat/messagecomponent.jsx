import React from "react";

export const MessageComponent = () => {
  return (
    <>
      <div className="flex gap-4  p-3 text-gray-300 hover:bg-slate-700 group">
        <div className="flex gap-4">
          <img src="" alt="" className="flex h-12 w-12 bg-white rounded-full" />
          <div className="flex flex-col">
            <b>user</b>
            <p>helloiubobob</p>
          </div>
        </div>
        {/* <div className="group-hover:scale-0">

        <MessageMenu/>
        </div> */}
      </div>
    </>
  );
};

const MessageMenu = () => {
  return(
    <>
        <div className="flex bg-gray-900 items-center p-2">
            <ul className="flex gap-4">
            <li>option </li>
            <li>tionn</li>
            <li>asdgafg</li>
            </ul>

        </div>
    </>
  )
};
