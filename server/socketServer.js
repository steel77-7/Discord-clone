
const { Server } = require('socket.io');

const socketConnection = (httpServer) => {
  console.log('Socket server initialized');
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  

  io.on('connection', (socket) => {
    console.log('Socket connected', socket.id);

    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Joined room: ${room}`);
    });

    socket.on('send-message', (message) => {
      console.log('Received direct message:', message);
      socket.to(message.chat._id).emit('recieve-message' ,(message));
    });

    socket.on('disconnect', (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });

    socket.on('connect_error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });
  });
};

module.exports = socketConnection;

