import { FaPaperclip } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { IoIosSend } from 'react-icons/io';

const MessageBox = () => {
  return (
    <div className="flex p-[24px] items-center gap-[24px] self-stretch ">
      <FaPaperclip class="attachments-icon" />
      <div className="w-2/3 flex justify-end items-center relative w-[100%]">
        {' '}
        <IoIosSend className="absolute mr-2 w-10 send-icon" />
        <Input className="border border-gray-400 rounded-lg p-4 w-full" />
      </div>
    </div>
  );
};

export default MessageBox;
