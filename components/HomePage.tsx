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

const socket = io('http://localhost:3001/');

socket.on('connect', () => {
  console.log(socket.id);
});

const HomePage = () => {
  useEffect(() => {
    socket.emit('join_room', 'room1');
  }, []);

  return (
    <div>
      <UserContent />
      <ChatBox socket={socket} />
      <MessageBox socket={socket} />
    </div>
  );
};

export default HomePage;
