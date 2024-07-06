// socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SERVER_URL; // Replace with your socket server URL
let socket;

const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};

export default getSocket;
