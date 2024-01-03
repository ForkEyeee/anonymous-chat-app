'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const HomePage = () => {
  const socket = io('http://localhost:3001/');
  console.log(socket);
  useEffect(() => {
    socket.on('hello', arg => {
      console.log(arg); // world
    });

    socket.emit('test', 'sup');
  });
  return <div>Check console</div>;
};

export default HomePage;
