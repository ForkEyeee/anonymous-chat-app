'use client';
import { useEffect, useState } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';
import { Message } from '@/lib/definitions';

const MessageList = ({ socket, isConnected}) => {
  const [messageReceived, setMessageReceived] = useState<Message[]>([]);

  useEffect(() => {
    if (socket === undefined) return;
    socket.on('receive_message', (message: Message) => {
      setMessageReceived(prevMessages => [...prevMessages, message]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  useEffect(() => {
    setMessageReceived([])
  },[isConnected])

  return (
    <>
      <div className="flex flex-col m-[20px]" id="message-list">
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
