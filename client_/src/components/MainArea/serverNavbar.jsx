
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setServerInfo,resetServerInfo } from "../../redux/reducer/serverReducer";
import ServerCreationForm from "../Server_components/serverCreationForm";
import { setCurrentChat,resetCurrrentChat } from "../../redux/reducer/currentChatReducer";
import { Link } from "react-router-dom";
export const ServerNavbar = ({
  setServerCreationPress,
  serverCreationPress,
}) => {
  const [serverList, setServerList] = useState([]);

  const serverInfo = useSelector((state) => state.serverInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchServerList();
  }, []);

  const fetchServerList = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/guild/serverList",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        //console.log("server list", data);
        setServerList(data.servers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleHomePress =()=>{
      dispatch(resetServerInfo());
      dispatch(resetCurrrentChat());
  }

  return (
    <>
      <div className="flex flex-col items-center bg-slate-800 h-full w-w-serverNav">
        <Link to={'@me'}>
        <button className="flex justify-center items-center text-white h-14 w-14 m-2 rounded-full bg-slate-400" onClick={handleHomePress}>
          home
        </button>
        </Link>
        {serverList.length > 0 &&
          serverList.map((server, index) => (
            
             ( <ServerNavbarIcons
                server={server}
                key={index}
                dispatch={dispatch}
              />)
           
          ))}

        <button
          className="flex justify-center items-center text-white h-14 w-14 m-2 rounded-full bg-slate-400"
          onClick={() => setServerCreationPress(!serverCreationPress)}
        >
          +
        </button>
        {serverCreationPress && (
          <ServerCreationForm setServerCreationPress={setServerCreationPress} />
        )}
      </div>
    </>
  );
};

const ServerNavbarIcons = ({ server, dispatch }) => {
 
  const handleClick = async()=>{
    //console.log("server in the payload:", server);
    await dispatch(setServerInfo(server));
  }
  return (
    <Link to={`${server._id}`}>
    <div className="relative flex group">
      <button
        className="flex bg-white h-14 w-14 rounded-full transition-all hover:rounded-xl ease-in-out m-4"
        onClick={handleClick}
      >
        {server.name}
      </button>
      <div className="absolute left-20 p-2 origin-left z-10 transition-all duration-150 scale-0 group-hover:scale-100 bg-slate-950 rounded-md text-white">
        {server.name}
      </div>
    </div>
    </Link>
  );
};
