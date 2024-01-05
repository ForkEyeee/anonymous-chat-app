'use client';
import { useEffect, useState, useRef } from 'react';
import UserMessage from './UserMessage';

const ChatBox = ({ socket }) => {
  const [messageReceived, setMessageReceived] = useState([]);

  useEffect(() => {
    socket.on('receive_message', data => {
      console.log(socket.id);
      setMessageReceived([...messageReceived, data.value]);

      if (socket.id !== data.id) {
      }
    });
  }, [socket, messageReceived]);

  return (
    <>
      {messageReceived.length > 0 &&
        messageReceived.map((message, index) => <UserMessage key={index} message={message} />)}
    </>
  );
};

export default ChatBox;
