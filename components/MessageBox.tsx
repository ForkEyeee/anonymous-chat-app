import { FaPaperclip } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { IoIosSend } from 'react-icons/io';
import { useEffect, useState } from 'react';

const MessageBox = ({ socket, room }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('send_message', value);
    socket.off('send_message');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-[24px] items-center gap-[24px] self-stretch fixed bottom-0 w-[100%]">
        <FaPaperclip className="attachments-icon" />
        <div className="flex justify-end items-center relative w-[100%]">
          <button type="submit" className="absolute mr-2 w-10 send-icon">
            <IoIosSend />
          </button>
          <Input
            className="border border-gray-400 rounded-lg p-4 w-full"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
        </div>
      </div>
    </form>
  );
};

export default MessageBox;
