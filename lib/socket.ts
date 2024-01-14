import { io } from 'socket.io-client';
require('dotenv').config();

let socket = null;

export const getSocket = () => {
  if (!socket) {
    const url = 'http://localhost:3001';
    console.log(`Initializing socket connection to: ${url}`);
    socket = io(url);
  }
  return socket;
};
