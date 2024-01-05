'use client';
import { useEffect, useState, useRef } from 'react';
import UserMessage from './UserMessage';
import { io } from 'socket.io-client';

const ChatBox = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState('');

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageReceived(data.value);
    });
  }, [socket]);

  return <UserMessage message={messageReceived} />;
};

export default ChatBox;
