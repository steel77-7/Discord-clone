import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../../redux/reducer/currentChatReducer";
import { setServerInfo } from "../../redux/reducer/serverReducer";
import { ChannelCreationForm } from "../Server_components/channelCreationForm";
const url = import.meta.env.VITE_SERVER_API;

export const ServerChatNavStructure = () => {
  const user = useSelector((state) => state.user);
  const serverInfo = useSelector((state) => state.serverInfo);
  const serverDispatch = useDispatch();
  const [addDmPress, setAddDmPress] = useState(false);
  const [dmList, setDmList] = useState([]);

  useEffect(() => {
    const fetchDmList = async () => {
      try {
        const response = await fetch(url + "/guild/chatList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            'ServerId' : `${serverInfo._id}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('server chats',data)
          //setDmList(prevdata => [...prevdata,data.chat]);
          setDmList(data.chats);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDmList();
  }, []);

  return (
    <div className="flex h-full flex-col w-w-chatList bg-slate-700 left-20 text-slate-300">
      <div className="flex relative  py-2 items-center flex-col border-b border-solid border-slate-900 ">
        {serverInfo.name&&serverInfo.name}
      </div>
    
      <ServerChats
        user={user}
        setAddDmPress={setAddDmPress}
        addDmPress={addDmPress}
        dmList={dmList}
      />
      {addDmPress && (
        <AddDmComponent
          setAddDmPress={setAddDmPress}
          addDmPress={addDmPress}
          user={user}
        />
      )}
    </div>
  );
};



const ServerChats = ({ user, setAddDmPress, addDmPress, dmList }) => {
  const currentChat = useSelector((state) => state.currentChat);
  const dispatch = useDispatch();
  const [channelCreationPress,setChannelCreationPress] = useState(false)
  return (
    <div className="flex flex-col text-slate-300">
      
    <div className="flex m-2 justify-between">
      <p>add channel</p>
      <button className="mr-2 scale-150" onClick={()=>setChannelCreationPress(!channelCreationPress)}>+</button>
    </div>
    {channelCreationPress&&<ChannelCreationForm/>}
      <div className="flex flex-col gap-3 h-dmHeight overflow-y-auto overflow dm-scroll">
        {dmList.length > 0 ? (
          dmList.map((contact, index) => {
            return (
              <button onClick={() => dispatch(setCurrentChat(contact))}>
                <SingleDirectMessageComponent
                  key={index}
                  contact={contact}
                  user={user}
                />
              </button>
            );
          })
        ) : (
          <p>No direct messages found.</p>
        )}
      </div>
    </div>
  );
};

const SingleDirectMessageComponent = ({ user, contact }) => {
  if (!contact) return null;
  return (
    <div className="flex  serverchat gap-4 p-2 hover:bg-zinc-800 duration:300 m-1 rounded-md  active:bg-gray-200">
      <h1 className="scale-150">#</h1>
      
      {contact.name || contact[0]?.name}
    </div>
  );
};

const AddDmComponent = ({ setAddDmPress, addDmPress, user }) => {
  const [allList, setAllList] = useState([]);
  const [name, setName] = useState("");
  const [dmId, setDmId] = useState([]);

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

  const handleCreateDm = async () => {
    const response = await fetch(url + "/chat/createChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
      },
      body: JSON.stringify({ username: name, members: dmId }),
    });
    setAddDmPress(!addDmPress);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

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
            if (contact._id !== user._id)
              if (contact.name.toUpperCase().indexOf(name.toUpperCase()) > -1)
                return (
                  <button
                    onClick={() => {
                      setName(contact.name);
                      setDmId((prevDmId) => [...prevDmId, contact._id]);
                    }}
                  >
                    <SingleDirectMessageComponent
                      key={index}
                      contact={contact}
                    />
                  </button>
                );
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
