import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServerInfo } from "../../redux/reducer/serverReducer";
import ServerCreationForm from "../Server_components/serverCreationForm";

export const ServerNavbar = ({
  setServerCreationPress,
  serverCreationPress,
}) => {
  const [serverList, setServerList] = useState([]);

  const serverInfo = useSelector((state) => state.serverList);
  const serverDispatch = useDispatch();

  useEffect(()=>{
    fetchServerList();
  },[])
  const fetchServerList = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/guild/serverList",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('serevr list', data);
        setServerList(data.servers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col  items-center bg-slate-800 h-full  w-w-serverNav ">
        {serverList.length > 0 &&
          serverList.map((server, index) => {
            
            return <button onClick={()=>serverDispatch(setServerInfo(server))}><ServerNavbarIcons server={server} key={index} serverDispatch={serverDispatch} /></button>
          })}

        <button
          className="flex justify-center items-center text-white h-14 w-14 m-2 rounded-full bg-slate-400"
          onClick={()=>setServerCreationPress(!serverCreationPress)}
        >
          +
        </button>
        {serverCreationPress&&<ServerCreationForm setServerCreationPress={setServerCreationPress}/>}
      </div>
    </>
  );
};

const ServerNavbarIcons = ({ server,serverDispatch }) => {
 
  return (
    <>        
      <div className="relative flex group">
        <button className="flex bg-white h-14 w-14 rounded-full transition-all hover:rounded-xl  ease-in-out m-4" onClick={()=>serverDispatch(setServerInfo(server))}>
          {server.name}
        </button>
        <div className="absolute left-20 p-2 origin-left z-10 transition-all duration-200 scale-0 group-hover:scale-100 bg-slate-950 rounded-md text-white">
          {server.name}
        </div>
      </div>
    </>
  );
};
