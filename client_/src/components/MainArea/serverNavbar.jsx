import React, { useState } from "react";
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

  const fetchServerList = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/guild/serverList",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            Chat: `${JSON.stringify(currentChat)}`,
          },
        }
      );

      if (response.ok) {
        const data = response.json();
        console.log(data)
        setServerList((prev) => [...prev, data.servers]);
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
      <div className="flex flex-col  items-center bg-slate-800 h-full  w-w-serverNav ">
        {serverList.length > 0 &&
          serverList.map((server, index) => (
            <ServerNavbarIcons server={server} key={index} />
          ))}

        <button
          className="flex justify-center items-center text-white h-14 w-14 m-2 rounded-full bg-slate-400"
          onClick={setServerCreationPress(!serverCreationPress)}
        >
          +
        </button>
      <ServerCreationForm/>
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
