'use client';
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

import UserContent from './UserContent';
import MessageBox from './MessageBox';
import ChatBox from './ChatBox';
import { v4 as uuidv4 } from 'uuid';

socket.on('connect', () => {
  console.log(socket.id);
});

const HomePage = () => {
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    socket.emit('find_room');
    socket.on('room_info', roomInfo => {
      // setRoom(roomInfo);
    });
    setIsLoading(false);
    return () => {
      socket.off('room_info');
    };
  }, []);

  if (isLoading) return <p>finding room....</p>;

  return (
    <div>
      <UserContent />
      <ChatBox socket={socket} />
      <div>Room: {room.roomId}</div>
      <h1>Current User: {room.userId}</h1>
      <h1>Online: {room.size}</h1>
      <MessageBox socket={socket} room={room} />
    </div>
  );
};

export default HomePage;
