import { io, Socket } from 'socket.io-client';
require('dotenv').config();

let socket: Socket<any, any> | null = null;

export const getSocket = () => {
  if (!socket) {
    const url = 'https://anonymous-chat-app-ga0r.onrender.com';
    console.log(`Initializing socket connection to: ${url}`);
    socket = io(url);
  }
  return socket;
};
