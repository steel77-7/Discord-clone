export async function playVideoFromCamera() {
  try {
    const constraints = {
      video: {
        width: {
          min: 640,
          max: 1024,
        },
        height: {
          min: 480,
          max: 768,
        },
      },
      audio: false,
    };
   
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector("video#localVideo");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error opening video camera.", error);
  }
}

function createpeer() {
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const peerConnection = new RTCPeerConnection(configuration);
  let dataChannel = peerConnection.createDataChannel("video-feed");
  peerConnection.onicecandidate = (e) => {
    if (e.candidate !== null) {
      sendCandidateToRemotePeer(e.candidate);
    }
  };
  return { peerConnection, dataChannel };
}

export const local = async () => {
  const { peerConnection, dataChannel } = createpeer();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  //data channel handling
  dataChannel.onopen = () => console.log("Data Channel openned");
  dataChannel.onclose = () => console.log("Data Channel closed");
  dataChannel.onmessage = (e) => {
    //video stream will be handled here
  };
  //data channel handling
};

export async function remote() {
  const { peerConnection, dataChannel } = createpeer();
  const remoteConnection = peerConnection;
  //data channel handling
  remoteConnection.ondatachannel((e) => {
    dataChannel = e.channel;
    dataChannel.onopen = () => console.log("Data Channel openned");
    dataChannel.onclose = () => console.log("Data Channel closed");
    dataChannel.onmessage = (e) => {
      //video stream will be handled here
    };
    //data channel handling
    const stream = getVideoFeed();
    if (stream !== null) {
      dataChannel.send(stream);
    }
  });
}


//get video feed
async function getVideoFeed() {
  const constraints = {
    video: {
      width: {
        min: 640,
        max: 1024,
      },
      height: {
        min: 480,
        max: 768,
      },
    },
    audio: false,
  };

  //gathering media stream
  let stream = null;
  stream = await navigator.mediaDevices.getUserMedia(constraints);
  return stream;
}
