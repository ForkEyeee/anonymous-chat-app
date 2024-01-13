'use client';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

import ChatBox from './ChatBox';
import MessageList from './MessageList';
import UserInformation from './UserInformation';

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
      <UserInformation />
      <div>Room: {room.roomID}</div>
      <h1>Current User: {socket.id}</h1>
      <h1>Online: {room.size}</h1>
      <MessageList socket={socket} />
      <ChatBox socket={socket} />
    </div>
  );
};

export default HomePage;
