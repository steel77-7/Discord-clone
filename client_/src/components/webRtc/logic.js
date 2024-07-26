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
      audio: true,
    };
    /* const constraints = {
            'video': true,
            'audio': true
        } */
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector("video#localVideo");
    videoElement.srcObject = stream;
  } catch (error) {
    console.error("Error opening video camera.", error);
  }
}

const connect = async () => {
  const peerConnection = new RTCPeerConnection();
  const remoteStream = new MediaStream();
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

};
