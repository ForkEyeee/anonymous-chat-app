'use client';
import { useEffect, useState, useRef } from 'react';
import UserMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

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
        messageReceived.map((message, index) =>
          message.sender === socket.id ? (
            <SentMessage key={index} message={message.message} />
          ) : (
            <UserMessage key={index} message={message.message} />
          )
        )}
    </>
  );
};

export default ChatBox;
