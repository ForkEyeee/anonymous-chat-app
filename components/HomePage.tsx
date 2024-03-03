'use client';
import React, { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';
import ChatBox from './ChatBox';
import MessageList from './MessageList';
import UserInformation from './UserInformation';
import { Socket } from 'socket.io-client';
import { ConnectionContext } from './ConnectionContext';

const HomePage = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
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
      setIsConnected(true);
      setOtherUserId(userId);
    });

    socket.on('room_disconnect', () => {
      console.log('disconnected')
      setIsConnected(false);
    });

    const roomSearchInterval = setInterval(() => {
      if (!isConnected) {
        socket.emit('find_room');
      }
    }, 3000);

    return () => {
      socket.off('connect');
      socket.off('chat_connected');
      socket.off('room_disconnect');
      clearInterval(roomSearchInterval);
    };
  }, [isConnected]);

  return (
    <div>
      <ConnectionContext.Provider value={isConnected}>
        <UserInformation otherUserId={otherUserId}/>
        <MessageList socket={socket}/>
        <ChatBox socket={socket}/>
      </ConnectionContext.Provider>
    </div>
  );
};

export default HomePage;
