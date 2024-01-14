// @ts-nocheck
import { io } from 'socket.io-client';
require('dotenv').config();

const url = process.env.SOCKET_SERVER;
console.log(url);
console.log(`initialize socket`);
export const socket = io('http://localhost:3001');
