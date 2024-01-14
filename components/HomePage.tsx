// @ts-nocheck
'use client';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

import ChatBox from './ChatBox';
import MessageList from './MessageList';
import UserInformation from './UserInformation';

const HomePage = () => {
  const [room, setRoom] = useState({});
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    const handleConnect = () => {
      console.log(socket.id);
      setSocketId(socket.id);
    };

    socket.on('connect', handleConnect);

    socket.emit('find_room');
    socket.on('room_info', roomInfo => {
      setRoom(roomInfo);
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('find_room');
      socket.off('room_info');
    };
  }, []);

  console.log(room);

  return (
    <div>
      <UserInformation />
      <div>Room: {room.roomID}</div>
      <h1>Current User: {socketId}</h1>
      <h1>Online: {room.size}</h1>
      <MessageList socket={socket} />
      <ChatBox socket={socket} />
    </div>
  );
};

export default HomePage;
