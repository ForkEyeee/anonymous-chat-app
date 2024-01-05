'use client';
import { useEffect, useState, useRef } from 'react';
import UserMessage from './UserMessage';
import { io } from 'socket.io-client';

const ChatBox = () => {
  const [messageReceived, setMessageReceived] = useState('');
  const socket = useRef(io('http://localhost:3001/'));
  console.log(socket.current.on);

  useEffect(() => {
    socket.current.on('receive_message', data => {
      setMessageReceived(data.value);
    });
  });

  return <UserMessage message={messageReceived} />;
};

export default ChatBox;
