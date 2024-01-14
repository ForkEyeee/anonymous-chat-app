'use client';
import React, { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';

import ChatBox from './ChatBox';
import MessageList from './MessageList';
import UserInformation from './UserInformation';

const HomePage = () => {
  const [room, setRoom] = useState({});
  const [socketId, setSocketId] = useState('');
  const [socket, setSocket] = useState(null);
  const [disconnect, setDisconnect] = useState('');

  useEffect(() => {
    const socketInstance = getSocket();
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log(socketInstance.id);
      setSocketId(socketInstance.id);
    });

    socketInstance.on('room_info', roomInfo => {
      setRoom(roomInfo);
    });

    socketInstance.on('room_disconnect', message => {
      console.log(message);
      setDisconnect(message);
    });

    return () => {
      socketInstance.off('connect');
      socketInstance.off('room_info');
    };
  }, []);

  const handleButtonClick = () => {
    setDisconnect('');
    socket.emit('find_room');
  };

  return (
    <div>
      <UserInformation />
      <div>Room: {room.roomID}</div>
      <h1>Current User: {socketId}</h1>
      <h1>Online: {room.size}</h1>
      <h1 className={`${disconnect !== '' ? '' : 'hidden'}`}>{disconnect}</h1>
      <button onClick={handleButtonClick}>Connect to Room</button>
      {socket && <MessageList socket={socket} />}
      {socket && <ChatBox socket={socket} />}
    </div>
  );
};

export default HomePage;
