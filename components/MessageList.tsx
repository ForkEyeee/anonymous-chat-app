// @ts-nocheck
'use client';
import { useEffect, useState, useRef } from 'react';
import UserMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

const MessageList = ({ socket }) => {
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
      <div className="flex flex-col ">
        {messageReceived.length > 0 &&
          messageReceived.map((message, index) =>
            message.sender === socket.id ? (
              <SentMessage key={index} message={message.message} />
            ) : (
              <UserMessage key={index} message={message.message} />
            )
          )}
      </div>
    </>
  );
};

export default MessageList;
