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
    const interval = setInterval(() => {
      socket.emit('find_room');
    }, 1000);

    socket.on('room_info', roomInfo => {
      setRoom(roomInfo);
      if (roomInfo.size >= 2) setIsLoading(false);
    });

    socket.on('disconnect', info => {
      setIsLoading(true);
    });

    return () => {
      clearInterval(interval);
      socket.off('room_info');
      socket.off('disconnect');
    };
  }, []);

  if (isLoading)
    return (
      <div>
        <p>finding room....</p> <h1>You: {socket.id}</h1>
      </div>
    );

  return (
    <>
      {room && (
        <div>
          <UserContent />
          <ChatBox socket={socket} />
          <div>Room: {room.roomID}</div>
          <h1>OtherPartiicpant: {room.userID}</h1>
          <h1>Online: {room.size}</h1>
          <MessageBox socket={socket} room={room} />
        </div>
      )}
    </>
  );
};

export default HomePage;
