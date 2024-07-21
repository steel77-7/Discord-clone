import React, { useEffect, useState } from "react";
import { MessageComponent } from "./messagecomponent";
import { useSelector } from "react-redux";
import getSocket from "../../../misc/getSocket";
import { toast } from "sonner";
export const ChatArea = () => {
  const currentChat = useSelector((state) => state.currentChat);
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = getSocket();
  const [ isConnected, setIsConnected ] = useState(socket.connected);

  //establishing socket connection 
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    function onReceiveMessage (message){
      console.log("message recieved", message);
      console.log(user);
      setMessages((prev) => [...prev, message]);
    }
    socket.on("connect", () => {
      onConnect();
    });
    socket.on("disconnect", onDisconnect);

    // Ensure this listener is only added once
    socket.on("recieve-message", onReceiveMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("recieve-message", onReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    fetchMessages();
    console.log("messages: ", messages);
    socket.emit("join-room", currentChat._id);
  }, [currentChat]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/message/fetchMessage",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
            Chat: `${JSON.stringify(currentChat)}`,
          },
        }
      );

      //console.log("Messages fetched");
      const data = await response.json();
     

      setMessages(data.messages||[]);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePress = (e) => {
    if (e.key === "Enter" && e.target.value !== " " && e.target.value !== "")
      handleSendMessage();
  };
  const handleSendMessage = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/message/saveMessage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
          body: JSON.stringify({
            message: newMessage,
            chat: currentChat,
            sender: user._id,
          }),
        }
      );
      if(response.ok){
      const data = await response.json();
      console.log('saved message',data)
      /* socket.emit("send-message", {
        message: newMessage,
        chat: currentChat,
        sender: user,
        createdAt: Date.now,
      }); */
      socket.emit("send-message", data.latestMessage);
      
      setMessages((prev) => [...prev, data.latestMessage]);
      setNewMessage("");
    }
    } catch (error) {
      console.error(error);
      toast.error('message not sent')
    }
  };

  return (
    <>
      <div className="flex flex-col bg-gray-600  w-full  h-full ">
        <div className="flex-1">
          {currentChat._id && (
            <MessageNav currentChat={currentChat} user={user} />
         
          )}
        </div>
        <div className="flex gap-4 flex-col overflow-y-auto">
          {messages &&
            messages.map((message, index) => {
              //console.log('message : ',message)
              return <MessageComponent message={message} key={index} setMessages={setMessages} />;
            })}
        </div>
        {currentChat._id && (
          <div className="flex">
            <input
              value={newMessage}
              type="text"
              placeholder="Message..."
              className="flex bg-gray-900 text-slate-400 p-4 m-4 flex-1 rounded-md  outline-none"
              onKeyDownCapture={handlePress}
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>
        )}
      </div>
    </>
  );
};



const MessageNav = ({ currentChat, user }) => {

  return (
    <>
      <div className="flex justify-around items-center relative w-full h-10 chataeranav bg-slate-700 text-white">
        <ul className=" w-full flex gap-10 px-4">
          <li>
            {currentChat._id !== null &&
              (currentChat.name ||
                currentChat.members.map((member) => {
                  if (member._id !== user._id) {
                    return member.name;
                  }
                }))}
          </li>
          {/* <li>friends</li>
          <li>friends</li>
          <li>friends</li> */}
        </ul>
        <div className="flex">
          <ul className=" w-full flex gap-10 px-4">
            <li>create group</li>
            <li>video call</li>
            <li>audio call</li>
          </ul>
        </div>
      </div>
    </>
  );
};



