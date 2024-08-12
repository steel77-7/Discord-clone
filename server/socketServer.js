const { Server } = require("socket.io");

const socketConnection = (httpServer) => {
  console.log("Socket server initialized");
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST","PATCH"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Joined room: ${room}`);
      console.log(`Roooms: `,socket.rooms);
    });

    socket.on("send-message", (message) => {
      console.log("Received direct message:", message);
      console.log("rooms:", socket.rooms);
      //socket.to(message.chat._id).emit("recieve-message", message);
      socket.to(message.chat).emit("recieve-message", message);
    });
    //signalling webrtc
    socket.on("call-request", (room) => {
      console.log("Joining the call room");
      socket.join(room);
    });

    //signaling ice candidates
    socket.on("ice-candidate", (data) => {
      console.log("ice-candidate", data);
      socket.to(data.room).emit("ice-candidate", data.candidate);
    });

    //signalling sdp and the members
    socket.on("offer", (data) => {
      console.log("user details and the offer", data);
      socket.to(data.room).emit("offer", data);
    });

    //signaling answer to all the members in the chat
    socket.on("answer", (data) => {
      console.log("user details and the answer", data);
      socket.to(data.room).emit("asnwer", data);
    });
    //signalling rtc

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });

    socket.on("connect_error", (err) => {
      console.log(`Connection error: ${err.message}`);
    });
  });
};

module.exports = socketConnection;
