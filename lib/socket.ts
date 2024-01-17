import { io, Socket } from 'socket.io-client';
require('dotenv').config();

let socket: Socket<any, any> | null = null;

export const getSocket = () => {
  if (!socket) {
    const url = 'http://localhost:3001';
    console.log(`Initializing socket connection to: ${url}`);
    socket = io(url);
  }
  return socket;
};
