import { io } from 'socket.io-client';

const url = 'http://localhost:3001';
console.log(`initialize socket`);
export const socket = io(url);
