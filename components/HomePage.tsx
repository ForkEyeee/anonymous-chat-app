'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import UserContent from './UserContent';
import MessageBox from './MessageBox';
import ChatBox from './ChatBox';
import { getRandomValues } from 'crypto';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const socket = io('http://localhost:3001/');
  const [number, setNumber] = useState(uuidv4());
  const [messages, setMessages] = useState([]);
  const roomNumber = uuidv4();

  useEffect(() => {
    console.log(socket);
    socket.emit('join', 'l2RzT7jKqFcbKbRnAAHb');
    // socket.on('chat-messages', data => {
    //   setChatMessages(data.messages);
    // });
    // socket.on('new-chat-message', message => {
    //   setChatMessages(messages => [...messages, message]); // updater function
    // });
  }, [socket, number]);

  useEffect(() => {
    socket.on('receive message', data => {
      console.log(data);
      alert(data);
    });
  }, [socket]);

  // useEffect(() => {
  //   socket.on('chat message', msg => {
  //     console.log('herere');
  //     setMessages(msg);
  //   });
  // });

  return (
    <div>
      <UserContent />
      <ChatBox />
      <MessageBox roomNum={number} />
      {messages}
    </div>
  );
};

export default HomePage;
