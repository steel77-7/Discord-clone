import React from "react";
import { StreamContainer } from "./streamContainer";

export const VidCallLayout = () => {
  return (
    <>
      
        <div className="flex flex-col  flex-1 bg-slate-900   items-center justify-between">
        <Navbar />
        <div className="flex flex-wrap justify-center">

        <StreamContainer />
          <StreamContainer />
          <StreamContainer />
        </div>
          
        <CallControls />
        </div>
      
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className=" bg-slate-100 w-full">
        <ul className="flex h-10 justify-between">
          <li>Vpice channel name</li>
          <li>focus view</li>
          <li>group view</li>
        </ul>
      </nav>
    </>
  );
};

const CallControls = () => {
  return (
    <>
      <nav className=" bg-slate-100 w-3/4  ">
        <ul className="flex h-10 justify-between">
          <li>video on/off</li>
          <li>audio on/off</li>
          <li> callend</li>
        </ul>
      </nav>
    </>
  );
};
