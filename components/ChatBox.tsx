'use client';
import { useEffect, useState, useRef } from 'react';
import UserMessage from './UserMessage';

const ChatBox = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    socket.on('receive_message', data => {
      console.log(data);
      setMessageReceived(prevMessages => [...prevMessages, data]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  return (
    <>
      {messageReceived.length > 0 &&
        messageReceived.map((message, index) => (
          <UserMessage key={index} message={message.value} />
        ))}
    </>
  );
};

export default ChatBox;
