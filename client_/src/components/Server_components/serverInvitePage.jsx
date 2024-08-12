import React, { useEffect, useState } from "react";
import useAuth from "../../customHooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userSlice } from "../../redux/reducer/userReducer";
import { useSelector } from "react-redux";
export default function ServerInvitePage() {
  const [server, setServer] = useState(null);
  useAuth();
  const location = useLocation();
  const path = location.pathname;
  const invitePart = path.split("/invite/")[1];

  //useEffect(async ()=>{await checkServer()},[])
  async function checkServer() {
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_API + "/guild/fetchServer/" + invitePart,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        }
      );
      const data = await res.json();
      console.log("data", data);
      setServer(data.server);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    checkServer();
  }, []);
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="text-white p-3 text-3xl bg-blue-700">
        <b> Discord Clone</b>
      </div>
      <div className="flex fixed bg-blue-700 w-full h-full justify-center items-center">
        {server ? <AcceptInv server={server} user={user} invitePart={invitePart} /> : <InvalidInv />}
      </div>
    </>
  );
}

const AcceptInv = ({ server, user,invitePart }) => {
  console.log(import.meta.env.VITE_SERVER_API +
    "/guild/acceptRequest/" +
    invitePart);
  const navigate = useNavigate();
  const handleAccept = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER_API +
        "/guild/acceptRequest/" +
        invitePart,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      }
    );
    if (res.ok) {
      navigate(`app/${server._id}`);
    }
  };
  return (
    <>
      <div className="flex bg-zinc-700 min-w-2/3 w-2/3 h-1/3 max-w-lg items-center p-5 flex-col gap-5 text-slate-400">
        <img
          src={server.img}
          alt="loading"
          className="h-28 w-28 bg-slate-100 rounded-3xl"
        />
        <p>You have been Inviteed to </p>
        <b className=" text-xl text-white "> {server?.name}</b>
        <p>members:{server?.members.length}</p>
        <button
          className="bg-blue-500 w-full p-3 text-white rounded-md"
          onClick={handleAccept}
        >
          accept invite
        </button>
      </div>
    </>
  );
};

const InvalidInv = () => {
  return (
    <>
      <div className="flex bg-zinc-700 min-w-2/3 w-2/3 h-1/3 max-w-lg items-center p-5 flex-col gap-5 text-slate-400">
        <img
          src="https://cdn.discordapp.com/icons/790606228656619561/3d40ecd2cbd666a7e0398f47c7dfd7c5.jpg?size=256.png"
          alt="loading"
          className="h-28 w-28 bg-slate-100 rounded-3xl"
        />
        <b className="text-xl text-white">OOPS!!</b>
        <p>Invaid Invite link</p>
        <Link to={"/app/@me/dashboard"} className="w-full">
          <button className="bg-blue-500 w-full p-3 text-white rounded-md">
            {" "}
            Go back
          </button>
        </Link>
      </div>
    </>
  );
};
