/* import React from "react";

export const MessageComponent = ({message}) => {
 // console.log("message is : " , message)
  return (
    <>
      {message&&<div className="flex gap-4  p-3 text-gray-300 hover:bg-slate-700 group">
        <div className="flex gap-4">
          <img src="" alt="" className="flex h-12 w-12 bg-white rounded-full" />
          <div className="flex flex-col">
            <div className="flex gap-4">
            <b>{message.sender.name}</b>
            <p>{message.createdAt}</p>
            </div>
            <p>{message.message}</p>
          </div>
        </div>
        <div className="group-hover:scale-100  scale-0">

        <MessageMenu/>
        </div>
      </div>}
    </>
  );
};

const MessageMenu = () => {
  return(
    <>
        <div className="flex bg-gray-900 items-center p-2">
            <ul className="flex gap-4">
            <li>option </li>
            <li>tionn</li>
            <li>asdgafg</li>
            </ul>

        </div>
    </>
  )
};
 */


import React, { useState } from "react";

export const MessageComponent = ({ message }) => {
const[newMessage, setNewMessage] = useState(message.message)
const [editPress,setEditPress] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API}/message/deleteMessage/${message._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to delete message');
      }

      const result = await res.json();
      console.log(result);
      // Handle successful deletion (e.g., update state to remove the message)
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleEdit = async () => {
    setEditPress(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API}/message/editMessage/${message._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
          body: JSON.stringify({ message: 'New message content' }) // Replace with actual new content
        }
      );

      if (!res.ok) {
        throw new Error('Failed to edit message');
      }

      const result = await res.json();
      console.log(result);
      setEditPress(false)
      // Handle successful edit (e.g., update state to show the updated message)
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  return (
    <>
      {message && (
        <div className="flex gap-4 p-3 text-gray-300 hover:bg-slate-700 group">
          <img src="" alt="" className="h-12 w-12 bg-white rounded-full" />
          <div className="flex flex-col flex-1">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <b>{message.sender.name}</b>
                <span className="text-xs text-gray-400">{message.createdAt}</span>
              </div>
              <div className="relative">
                <div className="absolute right-0 hidden group-hover:block">
                  <MessageMenu handleDelete={handleDelete} handleEdit={handleEdit} />
                </div>
              </div>
            </div>
            <p className="mt-1">{message.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

const MessageMenu = ({ handleEdit, handleDelete }) => {
  return (
    <div className="flex bg-gray-900 items-center p-2 rounded-md">
      <ul className="flex gap-4">
        <button><li>Reply</li></button>
        <button onClick={handleEdit}><li>Edit</li></button>
        <button onClick={handleDelete}><li>Delete</li></button>
      </ul>
    </div>
  );
};
