'use client';
import { useEffect, useState, useRef } from 'react';
import ReceivedMessage from './ReceivedMessage';
import SentMessage from './SentMessage';

const MessageList = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState([]);
  const [messenger, setMessenger] = useState(null);
  useEffect(() => {
    socket.on('receive_message', message => {
      console.log(`Message received:`, message);
      setMessageReceived(prevMessages => [...prevMessages, message]);
    });

    return () => socket.off('receive_message');
  }, [socket]);

  console.log(messageReceived);
  // everytime the person who is talkign changes, add profile to first message
  return (
    <>
      <div className="flex flex-col ">
        {messageReceived.length > 0 &&
          messageReceived.map((message, index) => {
            if (message.sender === socket.id) {
              const firstMessage = messageReceived.find(
                message => message.sender === socket.id && message.showProfile
              );
              if (firstMessage === undefined) {
                message.showProfile = true;
              }

              console.log(firstMessage);

              return (
                <SentMessage
                  key={index}
                  message={message.message}
                  showProfile={message.showProfile}
                />
              );
            } else {
              const firstMessage = messageReceived.find(message => message.showProfile);
              if (firstMessage === undefined) {
                message.showProfile = true;
              }
              return (
                <ReceivedMessage
                  key={index}
                  message={message.message}
                  showProfile={message.showProfile}
                />
              );
            }
          })}
      </div>
    </>
  );
};

export default MessageList;
