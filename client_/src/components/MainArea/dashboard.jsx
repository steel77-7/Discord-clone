import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const currentChat = useSelector((state) => state.currentChat);
  const user = useSelector((state) => state.user);
  const [addFriendPress, setAddFriendPress] = useState("friends");
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    fetchFriends();
  }, []);

  const renderJSX = () => {
    if (addFriendPress) {
      console.log(addFriendPress);
      switch (addFriendPress) {
        case "friends":
          return (
            <div className=" some flex flex-col  gap-2 m-2 overflow-y-auto">
              {friendList.length > 0 ? (
                friendList.map((friend, index) => {

                  return (
                    <div>
                      <FriendComponent member={friend} key={index} />
                    </div>
                  );
                })
              ) : (
                <p>you are a loner</p>
              )}
            </div>
          );
        case "pending":
          return <PendingNav user={user} />;
        case "add":
          return <AddFriendComponent />;
        default:
          return <h1>Nothing to show here</h1>;
      }
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/friends/getFriends",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      const data = await response.json();
      console.log('friends:', data)
      setFriendList(data.friends.friends);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="nav flex flex-col bg-gray-600  w-full  h-full text-white ">
        <div className="flex-1">
          <FriendNav
            setAddFriendPress={setAddFriendPress}
            addFriendPress={addFriendPress}
            user={user}
          />
          <h1 className="ml-3 text-2xl">Friends</h1>

          {renderJSX()}
        </div>
      </div>
    </>
  );
};

const FriendNav = ({ setAddFriendPress }) => {
  return (
    <>
      <div className="flex justify-around iems-center relative w-full h-10  bg-slate-700 text-white">
        <ul className=" w-full flex gap-10 px-4">
          <li>
            <button onClick={() => setAddFriendPress("friends")}>
              Friends
            </button>
          </li>
          <li>
            <button onClick={() => setAddFriendPress("pending")}>
              Pending
            </button>
          </li>
          <li>
            <button
              className="flex  p-0.5  bg-lime-600 rounded-md "
              onClick={() => setAddFriendPress("add")}
            >
              Add Friend
            </button>
          </li>
        </ul>
        <div className="flex">
          <ul className=" w-full flex gap-10 px-4">
            <li>other</li>
            <li>other</li>
          </ul>
        </div>
      </div>
    </>
  );
};

const FriendComponent = ({ member }) => {
  return (
    <>
      <hr className="border-t-2 border-slate-500 my-2" />
      <div className="flex items-center p-4 bg-slate-700 rounded-md gap-4 hover:bg-slate-600 transition-colors duration-300">
        <img
          src=""
          alt="loading"
          className="h-12 w-12 bg-slate-300 rounded-full"
        />
        <div className=" text-white">{member.name}</div>
      </div>
      <hr className="border-t-2 border-slate-500 my-2" />
    </>
  );
};

const AddFriendComponent = () => {
  const [memberList, setMemberList] = useState([]);
  let data;
  useEffect(() => {
    fetchAllMembers();
  }, []);

  const fetchAllMembers = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/chat/allList",
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
        console.log("data on the allist", data.users);
        setMemberList(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendRequest = async (id) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER_API + "/friends/friendRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
          body: JSON.stringify({ recipient: id }),
        }
      );

      if (response.ok) {
        data = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("memberlist length", memberList.length);
  return (
    <>
      <div className="flex flex-col m-2 gap-2">
        <h1 className="text-2xl">Add friends </h1>
        <p>type their user tags</p>
        <input
          type="text"
          placeholder="search"
          className="w-11/12 h-12 bg-neutral-800 p-2 rounded-md outline-none"
        />
        Member List
      </div>
      <div className="m-3  text-slate-400">
        press the members to send them request
      </div>
      <div className="some flex flex-col  gap-2 m-2 overflow-y-auto">
        {memberList.length > 0 ? (
          memberList.map((member, index) => {
            return (
              <button
                onClick={() => {
                  sendRequest(member._id);
                  toast.success("request sent");
                }}
              >
                <FriendComponent member={member} key={index} />
              </button>
            );
          })
        ) : (
          <p>no members to show here</p>
        )}
      </div>
    </>
  );
};

const PendingNav = ({ user }) => {
  const [action, setAction] = useState({});
  let pendingList = user.friendRequests;
  console.log("pending requests", pendingList);
  console.log("user :", user);

  const handleRequest = async (member,status) => {
    const response = await fetch(
      import.meta.env.VITE_SERVER_API + "/friends/handleFriendRequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
        body: JSON.stringify({ member,status }),
      }
    );
    if (response.ok) {
      const data =await response.json()
      console.log('pending res',data)
      toast.success(data.message);
    } else toast.error(data.message);
  };
  return (
    <>
      <div className="some flex flex-col  gap-2 m-2 overflow-y-auto">
        {pendingList && pendingList.length > 0 ? (
          pendingList.map((member) => {
            console.log("member", member);
            return (
              <PendingRequests
                member={member}
                action={action}
                handleRequest={handleRequest}
              />
            );
          })
        ) : (
          <h1>No Pending requests</h1>
        )}
      </div>
    </>
  );
};

const PendingRequests = ({ member, handleRequest }) => {
  let status;
  return (
    <>
      <hr className="border-t-2 border-slate-500 my-2" />
      <div className="flex items-center p-4 bg-slate-700 rounded-md gap-4 hover:bg-sla.te-600 transition-colors duration-300">
        <img
          src=""
          alt="loading"
          className="h-12 w-12 bg-slate-300 rounded-full"
        />
        <div className="flex-1 text-white">{member.name}</div>
        <div className="ml-auto flex gap-3">
          <button
            className="bg-green-500 hover:bg-green-600 text-white p-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => {
              handleRequest(member._id, true);
            }}
          >
            Yes
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white p-2 px-4 rounded-lg transition-colors duration-300"
            onClick={() => {
              handleRequest(member._id, false);
            }}
          >
            No
          </button>
        </div>
      </div>
      <hr className="border-t-2 border-slate-500 my-2" />
    </>
  );
};
