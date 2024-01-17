'use client';
import { useEffect, useState } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

const MessageList = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on('receive_message', message => {
      console.log(`Message received:`, message);
      setMessageReceived(prevMessages => [...prevMessages, message]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  return (
    <>
      <div className="flex flex-col ">
        {messageReceived.length > 0 &&
          messageReceived.map((message, index) => {
            if (message.sender === socket.id) {
              return <SentMessage key={index} message={message.message} />;
            } else {
              return <ReceivedMessage key={index} message={message.message} />;
            }
          })}
      </div>
    </>
  );
};

export default MessageList;
