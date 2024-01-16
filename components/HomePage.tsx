'use client';
import React, { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';
import ChatBox from './ChatBox';
import MessageList from './MessageList';
import UserInformation from './UserInformation';

const HomePage = () => {
  // const [room, setRoom] = useState({});
  const [socket, setSocket] = useState(undefined);
  const [disconnect, setDisconnect] = useState('');
  const [isConnected, setIsConnect] = useState(false);
  const [otherUserId, setOtherUserId] = useState('');

  useEffect(() => {
    const socket = getSocket();

    socket.on('connect', () => {
      setSocket(socket);
    });

    socket.on('room_info', roomInfo => {
      // setRoom(roomInfo);
    });

    socket.on('room_disconnect', message => {
      setDisconnect(message);
      setIsConnect(false);
    });

    socket.on('chat_connected', participants => {
      console.log('chat connected');
      const userId = participants.filter(participant => participant !== socket.id)[0];
      setIsConnect(true);
      setOtherUserId(userId);
    });

    return () => {
      socket.off('connect');
      socket.off('room_info');
      socket.off('chat_connected');
    };
  }, []);

  const handleButtonClick = () => {
    setDisconnect('');
    socket.emit('find_room');
  };

  return (
    <div>
      <UserInformation otherUserId={otherUserId} isConnected={isConnected} />
      <h1 className={`${disconnect !== '' ? '' : 'hidden'}`}>{disconnect}</h1>
      {socket !== undefined && (
        <>
          <MessageList socket={socket} />
          <ChatBox socket={socket} connectToRoom={handleButtonClick} isConnected={isConnected} />
        </>
      )}
    </div>
  );
};

export default HomePage;
