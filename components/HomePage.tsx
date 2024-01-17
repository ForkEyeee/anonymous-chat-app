'use client';
import React, { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';
import ChatBox from './ChatBox';
import MessageList from './MessageList';
import UserInformation from './UserInformation';
import { Socket } from 'socket.io-client';

const HomePage = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [isConnected, setIsConnect] = useState(false);
  const [otherUserId, setOtherUserId] = useState('');

  useEffect(() => {
    const socket: Socket | null = getSocket();

    if (socket === undefined || socket === null) return;

    socket.on('connect', () => {
      setSocket(socket);
    });

    socket.emit('find_room');

    socket.on('chat_connected', participants => {
      const userId = participants.filter(participant => participant !== socket.id)[0];
      setIsConnect(true);
      setOtherUserId(userId);
    });

    socket.on('room_disconnect', () => {
      setIsConnect(false);
    });

    return () => {
      socket.off('connect');
      socket.off('room_info');
      socket.off('chat_connected');
    };
  }, []);

  return (
    <div>
      <UserInformation otherUserId={otherUserId} isConnected={isConnected} />
      <MessageList socket={socket} />
      <ChatBox socket={socket} isConnected={isConnected} />
    </div>
  );
};

export default HomePage;
