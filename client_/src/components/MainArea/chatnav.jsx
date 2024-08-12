import React, { useState } from "react";
import { DmChatNav } from "../impementationstructures/dmChatNavStructure";
import { useSelector, useDispatch } from "react-redux";
import { ServerChatNavStructure } from "../impementationstructures/serverChatNavStructure";
import { Input } from "postcss";
import { toast } from "sonner";
import { setUser } from "../../redux/reducer/userReducer";
export const ChatNav = () => {
  const user = useSelector((state) => state.user);
  const server = useSelector((state) => state.serverInfo);
  const [showSettings, setShowSettings] = useState(false);
  return (
    <>
      <div className="flex flex-col">
        {server._id !== null ? <ServerChatNavStructure /> : <DmChatNav />}
        <UserComponent user={user} />
        {!showSettings && (
          <UserSettings setShowSettings={setShowSettings} user={user} />
        )}
      </div>
    </>
  );
};

const UserComponent = ({ user }) => {
  return (
    <>
      <div className="flex w-w-chatList absolute bottom-0 flex-grow flex-1 bg-gray-800 h-24 items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <img src="" alt="" className="flex h-10 w-10 bg-white rounded-full" />
          {user.name}
        </div>
        <div className="flex">
          <ul className="flex gap-3 mx-2">
            <li>mute</li>
            <li>defean </li>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    </>
  );
};

const UserSettings = ({ setShowSettings, user }) => {
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState(user.name);
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    
    setFile(e.target.files[0]);
  };
  console.log("user", user);

  const handleUpdate = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    }
    formData.append("name", name);
    console.log("form data", formData);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API}/user/update`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
          body: formData,
        }
      );

      if (res.ok) {
        toast.success("Profile updated successfully");
        const data = await res.json();
        console.log(data.user);
        dispatch(setUser(data.user));
        console.log("Profile updated successfully!");
      } else {
        toast.error("Profile didnt update");
        console.error("Failed to update profile:", res.statusText);
      }
    } catch (error) {
      toast.error("some error occured");
      console.error("Error updating profile:", error);
    }

    setFile(null);
    setEdit(false);
  };

  return (
    <>
      <div
        className="fixed w-screen h-screen flex justify-center items-center  bg-slate-900 bg-opacity-85 text-white text-xl"
        onClick={() => setShowSettings(false)}
      >
        <div className="flex bg-slate-600 min-w-96 w-1/3  h-72 rounded-md">
          <div className="absolute min-w-96 w-1/3  h-24 bg-slate-800 "></div>
          <div className="flex z-10 my-10 ml-5 flex-col gap-1">
            {!edit ? (
              <img
                src={user?.img}
                alt="loading "
                className="flex h-24 w-24 bg-white rounded-full border-8 border-slate-800"
              />
            ) : (
              <>
                <img
                  src={user?.img}
                  alt="loading "
                  className="flex h-24 w-24 bg-white rounded-full hover:scale-105 duration-200 border-8 border-lime-600"
                />
                <label className="text-sm hover:text-lime-400" htmlFor="image">
                  click to change img
                </label>{" "}
                <input
                  type="file"
                  className="scale-0"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                />
              </>
            )}
            <div className="flex flex-col justify-evenly">
              Display name:
              {!edit ? (
                <p>
                  <br /> {user.name || "user"}
                </p>
              ) : (
                <input
                  className=" bg-slate-700 p-1 outline-none rounded-md w-fit"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              )}
            </div>
            {!edit ? (
              <button
                className="bg-lime-600 p-2 rounded-md relative left-0 w-fit"
                onClick={() =>
                  setEdit((prev) => {
                    return !prev;
                  })
                }
              >
                edit profile
              </button>
            ) : (
              <button
                className="bg-lime-600 p-2 rounded-md relative left-0 w-fit"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
