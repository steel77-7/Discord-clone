import React from "react";

export const ChannelCreationForm = () => {
  return (
    <>
      <div className="flex flex-col gap-4 bg-neutral-700 absolute w-96 h-96 p-4 left-1/2 top-1/3 rounded-xl">
        <h1 className="text-2xl">Create Channel</h1>
        <div className="flex flex-col gap-1">
          <p>channel type</p>
          <div className="flex  gap-5 justify-between rounded-md p-3 hover:bg-zinc-600 bg-zinc-800">
            <div className="flex gap-5">
              <h1 className="text-3xl">#</h1>
              <div className="flex flex-col">
                <p className="text-2xl">Text channel</p>
                <p>Send messages</p>
              </div>
            </div>
            <input type="radio" name="channel-type" id="" />
          </div>
          <div className="flex p-3 gap-5 justify-between rounded-md hover:bg-zinc-600 bg-zinc-800">
            <div className="flex gap-5">
              <h1 className="text-3xl">#</h1>
              <div className="flex flex-col">
                <p className="text-2xl">Voice channel</p>
                <p>Make voice or video calls</p>
              </div>
            </div>
            <input type="radio" name="channel-type" id=""className="  " />
          </div>
          <p>Channel name</p>
          <input type="text" className="flex rounded-md bg-zinc-800 p-1 outline-none" placeholder="New Channel... "/>
          <div className="flex gap-2 my-2">
            <button className="flex p-2  bg-indigo-700 rounded-lg hover:bg-indigo-500">Cancel</button>
            <button className="flex p-2  bg-indigo-700 rounded-lg hover:bg-indigo-500">Create</button>
          </div>
        </div>
      </div>
    </>
  );
};
