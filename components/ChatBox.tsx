import { FaPaperclip } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { IoIosSend } from 'react-icons/io';
import { useEffect, useState } from 'react';

const ChatBox = ({ socket, isConnected }) => {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      sender: socket.id,
      message: value,
    };
    socket.emit('send_message', data);
    setValue('');
  };

  useEffect(() => {
    setValue('');
  }, [isConnected]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-[24px] items-center gap-[24px] self-stretch fixed bottom-0 w-[100%]">
        <div className="flex justify-end items-center relative w-[100%]">
          {isConnected && (
            <button type="submit" className="absolute mr-2 w-10 send-icon" id="message-send-btn">
              <IoIosSend />
            </button>
          )}

          <Input
            className="border border-gray-400 rounded-lg p-4 w-full"
            onChange={e => setValue(e.target.value)}
            value={value}
            id="chat-input"
          />
        </div>
      </div>
    </form>
  );
};

export default ChatBox;
