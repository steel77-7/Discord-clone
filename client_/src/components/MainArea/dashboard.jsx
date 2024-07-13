import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export const Dashboard = () => {
  const currentChat = useSelector((state) => state.currentChat);
  const user = useSelector((state) => state.user);
  const [addFriendPress, setAddFriendPress] = useState(false);
  const[friendList,setFriendList] =useState([]);
  useEffect(()=>{
    fetchFriends();
  },[])

  const fetchFriends = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/friends/getFriends",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      const data = await response.json();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="nav flex flex-col bg-gray-600  w-full  h-full text-white ">
        <div className="flex-1">
          <FriendNav
            setAddFriendPress={setAddFriendPress}
            addFriendPress={addFriendPress}
            user={user}
          />
          <h1 className="ml-3 text-2xl">Friends</h1>
          {addFriendPress ? (
            <AddFriendComponent />
          ) : (
            <div className=" some flex flex-col  gap-2 m-2 overflow-y-auto">
              <FriendComponent currentChat={currentChat} />
              <FriendComponent currentChat={currentChat} />
              <FriendComponent currentChat={currentChat} />
              <FriendComponent currentChat={currentChat} />
              <FriendComponent currentChat={currentChat} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const FriendNav = ({ setAddFriendPress }) => {
  return (
    <>
      <div className="flex justify-around iems-center relative w-full h-10  bg-slate-700 text-white">
        <ul className=" w-full flex gap-10 px-4">
          <li>
            <button onClick={() => setAddFriendPress(false)}>Friends</button>{" "}
          </li>
          <li>
            <button
              className="flex  p-0.5  bg-lime-600 rounded-md "
              onClick={() => setAddFriendPress(true)}
            >
              Add Friend
            </button>
          </li>
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

const FriendComponent = ({ currentChat }) => {
  return (
    <>
      <div className="flex p-2 bg-zinc-700 w-11/12 h-20 items-center  rounded-md gap-2 hover:bg-zinc-500">
        <img
          src=""
          alt="loading"
          className="flex h-12 w-12 bg-slate-300 rounded-full"
        />
        name
      </div>
    </>
  );
};

const AddFriendComponent = () => {
  return (
    <>
      <div className="flex flex-col m-2 gap-2">
        <h1 className="text-2xl">Add friends </h1>
        <p>type their user tags</p>
        <input type="text" placeholder='search' className="w-11/12 h-12 bg-neutral-800 p-2 rounded-md outline-none" />
      </div>
    </>
  );
};
