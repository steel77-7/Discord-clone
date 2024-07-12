import React, { useState } from "react";
import { useSelector } from "react-redux";

export const ChannelCreationForm = ({ setChannelCreationPress}) => {
  const [channelName, setChannelName] = useState("");
  const [channelType, setChannelType] = useState("");
  const serverInfo = useSelector(state=>state.serverInfo)
  const handleChannelCreation = async () => {
    console.log("handleChannel creation executed");
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_API}/guild/channelCreation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
        body: JSON.stringify({
          channelName,
          channelType,
          serverid: serverInfo._id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setChannelCreationPress(false);
      } else {
        console.error("Failed to create channel:", res.statusText);
      }
    } catch (error) {
      console.error("Error during channel creation:", error);
    }
  };

  const handleChannelType = (e) => {
    console.log(e.target.id);
    setChannelType(e.target.id);
  };

  return (
    <>
      <div className="flex flex-col gap-4 bg-neutral-700 absolute w-96 h-96 p-4 right-1/2 top-1/3 left-1/2 rounded-xl">
        <h1 className="text-2xl">Create Channel</h1>
        <div className="flex flex-col gap-1">
          <p>Channel Type</p>
          <div className="flex gap-5 justify-between rounded-md p-3 hover:bg-zinc-600 bg-zinc-800">
            <div className="flex gap-5">
              <h1 className="text-3xl">#</h1>
              <div className="flex flex-col">
                <p className="text-2xl">Text Channel</p>
                <p>Send messages</p>
              </div>
            </div>
            <input type="radio" name="channel-type" id="text_channel" onClick={handleChannelType} />
          </div>
          <div className="flex p-3 gap-5 justify-between rounded-md hover:bg-zinc-600 bg-zinc-800">
            <div className="flex gap-5">
              <h1 className="text-3xl">#</h1>
              <div className="flex flex-col">
                <p className="text-2xl">Voice Channel</p>
                <p>Make voice or video calls</p>
              </div>
            </div>
            <input type="radio" name="channel-type" id="voice_channel" onClick={handleChannelType} />
          </div>
          <p>Channel Name</p>
          <input type="text" className="flex rounded-md bg-zinc-800 p-1 outline-none" placeholder="New Channel..." onChange={(e) => setChannelName(e.target.value)} />
          <div className="flex gap-2 my-2">
            <button className="flex p-2 bg-indigo-700 rounded-lg hover:bg-indigo-500" onClick={() => setChannelCreationPress(false)}>Cancel</button>
            <button className="flex p-2 bg-indigo-700 rounded-lg hover:bg-indigo-500" onClick={handleChannelCreation}>Create</button>
          </div>
        </div>
      </div>
    </>
  );
};
