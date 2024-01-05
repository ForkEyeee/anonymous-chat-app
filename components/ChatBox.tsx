'use client';
import { useEffect, useState } from 'react';
import UserMessage from './UserMessage';
import { io } from 'socket.io-client';

const ChatBox = () => {
  const [messageReceived, setMessageReceived] = useState('');
  const socket = io('http://localhost:3001/');

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageReceived(data.value);
    });
  }, [socket]);

  return <UserMessage message={messageReceived} />;
};

export default ChatBox;
