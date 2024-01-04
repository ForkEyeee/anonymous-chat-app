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

const HomePage = () => {
  const socket = io('http://localhost:3001/');
  const { setTheme } = useTheme();
  useEffect(() => {
    socket.on('hello', arg => {
      console.log(arg); // world
    });

    socket.emit('test', 'sup');
  });
  return (
    <div>
      <UserContent />
      <MessageBox />
    </div>
  );
};

export default HomePage;
