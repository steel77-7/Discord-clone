
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const url = import.meta.env.VITE_SERVER_API;

export const DmChatNav = () => {
  const user = useSelector((state) => state.user);
  const [addDmPress, setAddDmPress] = useState(false);
  const [dmList, setDmList] = useState([]);

  useEffect(() => {
    const fetchDmList = async () => {
      try {
        const response = await fetch(url + "/chat/dmList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setDmList(prevdata => [...prevdata,data]);
          
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDmList();
  }, []);

  return (
    <div className="flex h-full flex-col w-w-chatList bg-slate-700 left-20">
      <div className="flex w-96 h-fit items-center flex-col border-b border-solid border-slate-900">
        <input
          type="text"
          className="h-7 w-72 m-2 p-1 relative -left-10 bg-slate-800 rounded-md text-white placeholder-slate-200"
          placeholder="Find a conversation"
        />
      </div>
      <ChatNavRoutes />
      <DirectMessages
        user={user}
        setAddDmPress={setAddDmPress}
        addDmPress={addDmPress}
        dmList={dmList}
      />
      {addDmPress && (
        <AddDmComponent
          setAddDmPress={setAddDmPress}
          addDmPress={addDmPress}
          user= {user}
        />
      )}
    </div>
  );
};

const ChatNavRoutes = () => {
  return (
    <div className="flex cahtnavroutes text-slate-300">
      <ul className="flex flex-col m-3 text-xl flex-grow">
        <li className="hover:bg-slate-400 p-2 rounded-md">Friends</li>
        <li className="hover:bg-slate-400 p-2 rounded-md">Nitro</li>
        <li className="hover:bg-slate-400 p-2 rounded-md">Shop</li>
      </ul>
    </div>
  );
};

const DirectMessages = ({ user, setAddDmPress, addDmPress, dmList }) => {
  return (
    <div className="flex flex-col text-slate-300">
      <div className="flex justify-between flex-1 p-3">
        Direct Messages
        <button
          className="h-3 w-3 rounded-full flex"
          onClick={() => setAddDmPress(!addDmPress)}
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-3 h-dmHeight overflow-y-auto overflow dm-scroll">
        {dmList.length > 0 ? (
          dmList.map((contact, index) => (
            <SingleDirectMessageComponent key={index} contact={contact} />
          ))
        ) : (
          <p>No direct messages found.</p>
        )}
      </div>
    </div>
  );
};

const SingleDirectMessageComponent = ({ contact }) => {
  return (
    <div className="flex flex-1 justify-around p-2 hover:bg-slate-400 m-1 rounded-md">
      <img
        src=""
        alt="loading"
        className="flex h-11 w-11 rounded-full bg-slate-50"
      />
      {contact.name}
    </div>
  );
};

const AddDmComponent = ({ setAddDmPress, addDmPress,user }) => {
  const [allList, setAllList] = useState([]);
  const [name,setName] = useState('');
  const [dmId,setDmId] = useState([]);
  useEffect(() => {
    const fetchAllMembers = async () => {
      try {
        const response = await fetch(url + "/chat/allList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAllList(data);
                }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMembers();
  }, []);
  

  const handleCreateDm = async() => {
    const response = await fetch(url + "/chat/createDm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },
      body:JSON.stringify({username:name,members:dmId})
    });
    setAddDmPress(!addDmPress);

  };

  const handleChange = (e)=>{
     setName(e.target.value) ;

  }

  return (
    <div className="flex flex-col gap-10 p-3 rounded-md bg-gray-800 h-96 absolute w-96 justify-between top-1/4 left-1/3 text-white">
      <h1 className="text-2xl">
        <b>ADD CONTACTS</b>
      </h1>
      <input
      value={name}
        type="text"
        placeholder="Find new conversations here"
        className="flex p-3 bg-slate-600 rounded-md text-gray-300 placeholder:text-slate-300 outline-none"
        onChange={handleChange}
      />
      <div className="flex flex-col gap-2  overflow-y-auto overflow dm-scroll">
        {allList.users ? (
          allList.users.map((contact, index) => {
            if(contact._id!==user._id)
              if(contact.name.toUpperCase().indexOf(name.toUpperCase())>-1)
            return (<button onClick={()=>{setName(contact.name); setDmId(prevDmId => [...prevDmId, contact._id]);}}><SingleDirectMessageComponent key={index} contact={contact} /></button>) 
})
        ) : (
          <h1>Nothing to show here</h1>
        )}
      </div>
      <button
        className="flex justify-center p-2 rounded-md bg-cyan-700"
        onClick={handleCreateDm}
      >
        Create
      </button>
    </div>
  );
};
