'use client';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

import UserContent from './UserContent';
import MessageBox from './MessageBox';
import ChatBox from './ChatBox';

socket.on('connect', () => {
  console.log(socket.id);
});

const HomePage = () => {
  const [room, setRoom] = useState({});

  useEffect(() => {
    socket.emit('find_room');
    socket.on('room_info', roomInfo => {
      setRoom(roomInfo);
    });
  }, []);

  console.log(room);

  return (
    <div>
      <UserContent />
      <ChatBox socket={socket} />
      <div>Room: {room.roomID}</div>
      <h1>Current User: {socket.id}</h1>
      <h1>Online: {room.size}</h1>
      <MessageBox socket={socket} />
    </div>
  );
};

export default HomePage;
