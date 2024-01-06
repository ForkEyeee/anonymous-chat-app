'use client';
import { useEffect } from 'react';
import { socket } from '@/lib/socket';

import UserContent from './UserContent';
import MessageBox from './MessageBox';
import ChatBox from './ChatBox';
import { v4 as uuidv4 } from 'uuid';

socket.on('connect', () => {
  console.log(socket.id);
});
let roomToJoin;

const HomePage = () => {
  useEffect(() => {
    socket.emit('find_rooms');
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
