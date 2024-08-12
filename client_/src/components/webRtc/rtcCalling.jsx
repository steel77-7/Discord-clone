/* import React, { useRef, useState,useEffect } from "react";
import { StreamContainer } from "./streamContainer";
import getSocket from "../../misc/getSocket";
import { useSelector } from "react-redux";
export const VidCallLayout = () => {
  
  const user = useSelector((state) => state.user);
  const peerRef = useRef(null);
  const currentChat = useSelector((state) => state.currentChat);
  const [isConnected,setIsConnected] = useState(false)
  const socket = useRef(getSocket());
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    function handleCallrequest(){
      
    }

    async function addIceCandidate(data){
      await peerRef.current.addIceCandidate(new RTCIceCandidate(data))
      console.log('ice candidate added',data)
    }

    function handleAnswer(answer){
      setRemoteDescription(answer);
    }

    socket.current.on("call-request",handleCallrequest);
    socket.current.on("ice-candidate",addIceCandidate);
    //socket.current.on("offer",);
    socket.current.on("answer",handleAnswer);
    socket.current.on("disconnect", onDisconnect);

    // Ensure this listener is only added once
   

    return () => {
      socket.current.off("connect", onConnect);
      socket.current.off("disconnect", onDisconnect);
      socket.current.off("call-request",handleCallrequest);
      socket.current.off("ice-candidate",addIceCandidate);
      //socket.current.off("offer",);
      socket.current.off("answer",handleAnswer);
    };  
  }, [socket.current]);

  function createPeer(){
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const peerConnection = new RTCPeerConnection(configuration);
    let dataChannel = peerConnection.createDataChannel("video-feed");
    peerConnection.onicecandidate = (e) => {
      if (e.candidate !== null) {
        socket.current.emit('ice-candidate', {room:currentChat._id,candidate:e.candidate})
      }
    };
    return { peerConnection, dataChannel };
  }

  const local = async () => {
    const { peerConnection, dataChannel } = createPeer();
    peerRef.current = peerConnection;
    const offer = await peerConnection.createOffer();
    await peerRef.current.setLocalDescription(offer);
    //signalling offer to the other members of the group chat
    socket.current.emit('call-request',{room:currentChat._id,offer:peerRef.current.localDescription})
    //data channel handling
    dataChannel.onopen = () => console.log("Data Channel openned");
    dataChannel.onclose = () => console.log("Data Channel closed");
    dataChannel.onmessage = (e) => {
      // video stream will be handled here
    };
      // data channel handling
  };

  //setting the remote description of the peerconnection
 async function setRemoteDescription(answer){
  peerRef.current.setRemoteDescription(new RTCSessionDescription(answer))
 }


//for handling remote feed
  async function remote(offer){
     const { peerConnection } = createPeer();
    const remoteConnection = peerConnection;
    await remoteConnection.setRemoteDescription(new RTCSessionDescription(offer))
    const answer = await remoteConnection.createAnswer();
    if(answer!==null) socket.current.emit('answer',{room:currentChat._id,answer:answer})
    //data channel handling
    remoteConnection.ondatachannel((e) => {
      const remoteChannel = e.channel;
      remoteChannel.onopen = () => console.log("Data Channel openned");
      remoteChannel.onclose = () => console.log("Data Channel closed");
      remoteChannel.onmessage = (e) => {
        //video stream will be handled here
      };
      //data channel handling
      const stream = getVideoFeed();
      if (stream !== null) {
        dataChannel.send(stream);
      }
    });
  }

  return (
    <>
      
        <div className="flex flex-col  flex-1 bg-slate-900   items-center justify-between">
        <Navbar />
        <div className="flex flex-wrap justify-center">

        <StreamContainer />
          <StreamContainer />
          <StreamContainer />
        </div>
          
        <CallControls />
        </div>
      
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className=" bg-slate-100 w-full">
        <ul className="flex h-10 justify-between">
          <li>Vpice channel name</li>
          <li>focus view</li>
          <li>group view</li>
        </ul>
      </nav>
    </>
  );
};

const CallControls = () => {
  return (
    <>
      <nav className=" bg-slate-100 w-3/4  ">
        <ul className="flex h-10 justify-between">
          <li>video on/off</li>
          <li>audio on/off</li>
          <li> callend</li>
        </ul>
      </nav>
    </>
  );
};
 */