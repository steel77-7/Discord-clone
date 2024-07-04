import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../redux/reducer/serverReducer";

export const ServerNavbar = () => {
  const serverList = useSelector((state) => state.serverList);
  const serverDispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col  items-center bg-slate-800 h-full  w-w-serverNav ">
        {serverList.map((server,index) => (
          <ServerNavbarIcons server={server} key={index}/>
        ))}

        <button
          className="flex justify-center items-center text-white h-14 w-14  rounded-full bg-slate-400"
          onClick={() =>
            serverDispatch(increment({ name: "new server", status: "active" }))
          }
        >
          +
        </button>
      </div>
    </>
  );
};

const ServerNavbarIcons = ({ server }) => {
  return (
    <>
      <div className="flex transition-all ease-in-out ">
        <button className="flex bg-white h-14 w-14 rounded-full transition-all hover:rounded-xl  ease-in-out m-4">
          {server.name}
        </button>
      </div>
    </>
  );
};
