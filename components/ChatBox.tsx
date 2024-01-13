'use client';
import { useEffect, useState, useRef } from 'react';
import UserMessage from './UserMessage';

const ChatBox = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    socket.on('receive_message', message => {
      console.log(`Message received:`, message);
      setMessageReceived(prevMessages => [...prevMessages, message]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  console.log(messageReceived);

  return (
    <>
      {messageReceived.length > 0 &&
        messageReceived.map((message, index) => <UserMessage key={index} message={message} />)}
    </>
  );
};

export default ChatBox;
