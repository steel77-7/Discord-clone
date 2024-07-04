import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const url = import.meta.env.VITE_SERVER_API;

export const DmChatNav = () => {
  const user = useSelector((state) => state.user);
  const [addDmPress, setAddDmPress] = useState(false);
  return (
    <>
      <div className="flex h-full flex-col  w-w-chatList bg-slate-700 left-20">
        <div className="flex w-96 h-fit items-center flex-col border-b  border-solid border-slate-900">
          <input
            type="text"
            className="h-7 w-72 m-2 p-1 relative -left-10 bg-slate-800 rounded-md text-white placeholder-slate-200 "
            placeholder="Find a conversation"
          />
        </div>
        <ChatNavRoutes />
        <DirectMessages
          user={user}
          setAddDmPress={setAddDmPress}
          addDmPress={addDmPress}
        />
        {addDmPress && (
          <AddDmComponent
            setAddDmPress={setAddDmPress}
            addDmPress={addDmPress}
          />
        )}
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

const DirectMessages = ({ user, setAddDmPress, addDmPress }) => {
  const [dm, setDm] = useState([]);

  useEffect(() => {
    const fetchDmList = async () => {
      try {
        const response = await fetch(url + "/chat/dmList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('authtoken')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDm(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDmList();
  }, []);

  return (
    <>
      <div className="flex flex-col text-slate-300">
        <div className="flex justify-between flex-1 p-3">
          Direct Messages
          <button
            className="h-3 w-3 rounded-full  flex "
            onClick={()=>setAddDmPress(!addDmPress)}
          >
            +
          </button>
        </div>

        <div className="flex flex-col  gap-3 h-dmHeight overflow-y-auto  overflow dm-scroll">
          {dm.length>0&&dm.map((contact, index) => (
            <SingleDirectMessageComponent key={index} contact={contact} />
          ))}
        </div>
      </div>
    </>
  );
};

const SingleDirectMessageComponent = ({ contact }) => {
  return (
    <>
      <div className="flex flex-1 justify-around p-4 hover:bg-slate-400 m-1 rounded-md">
        <img
          src=""
          alt="loading"
          className="flex h-11 w-11 rounded-full bg-slate-50"
        />
        {contact.name}
      </div>
    </>
  );
};

const AddDmComponent = ({ setAddDmPress, addDmPress }) => {
  const handleClick = () => {
    setAddDmPress(!addDmPress);
  };
  return (
    <>
      <div className="flex bg-slate-700 h-40  w-48 fixed top-1/2 left-1/2">
        <input type="text" className="flex " />
        <button className="flex h-10 w-8" onClick={handleClick}>
          
          create
        </button>
      </div>
    </>
  );
};
