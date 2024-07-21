import React, { useState } from "react";
import { toast } from "sonner";
export const MessageComponent = ({ message, setMessages }) => {
  const [newMessage, setNewMessage] = useState(message.message);
  const [editPress, setEditPress] = useState(false);
  //deletion
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API}/message/deleteMessage/${
          message._id
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete message");
      }

      const result = await res.json();
      console.log(result);
      

      //THIS IS BEHAVING UNEXPECTEDLYYYYYYYYYYYY
      //FIX THIS LATEERERRRRRRRRRRRRRRRRRRRRRRRRRR
      setMessages((prev) => {
        const newMess = prev.filter(
          (previous) => previous._id !== result.result._id
        );
        console.log("new mess", newMess);
        return newMess;
      });
      // Handle successful deletion (e.g., update state to remove the message)
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handlePress = (e) => {
    if (e.key === "Enter" && e.target.value !== " " && e.target.value !== "") {
      handleEdit();
      console.log("pressed enter");
    }
  };

  const handleEdit = async () => {
    try {
      console.log("entered the edit");
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API}/message/editMessage/${message._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
          body: JSON.stringify({ message: newMessage }), // Replace with actual new content
        }
      );

      if (!res.ok) {
        throw new Error("Failed to edit message");
      }

      const result = await res.json();
      console.log(result);
      setEditPress(false);
      setNewMessage(result.result.message);

      // Handle successful edit (e.g., update state to show the updated message)
    } catch (error) {
      toast.error("message not updated");
      console.error("Error editing message:", error);
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
                <b>{message.sender.name || message.sender}</b>
                <span className="text-xs text-gray-400">
                  {message.createdAt}
                </span>
              </div>
              <div className="relative">
                <div className="absolute right-0 hidden group-hover:block">
                  <MessageMenu
                    handleDelete={handleDelete}
                    setEditPress={setEditPress}
                    editPress={editPress}
                  />
                </div>
              </div>
            </div>
            {editPress ? (
              <input
                value={newMessage}
                type="text"
                placeholder="Message..."
                className="flex bg-gray-900 text-slate-400 p-2 m-4  my-5 flex-1 rounded-md  outline-none"
                onKeyDownCapture={handlePress}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            ) : (
              <p className="mt-1">{newMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const MessageMenu = ({ setEditPress, handleDelete, editPress }) => {
  return (
    <div className="flex bg-gray-900 items-center p-2 rounded-md">
      <ul className="flex gap-4">
        <button>
          <li>Reply</li>
        </button>
        <button onClick={() => setEditPress(!editPress)}>
          <li>Edit</li>
        </button>
        <button onClick={handleDelete}>
          <li>Delete</li>
        </button>
      </ul>
    </div>
  );
};
