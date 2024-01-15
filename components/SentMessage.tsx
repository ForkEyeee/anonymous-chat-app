import Image from 'next/image';
import { Message } from '@/lib/definitions';

const SentMessage = ({ message }: Message) => {
  console.log('creating gray  message');
  return (
    <div className="flex gap-[16px] self-start">
      {/* <Image
        alt="avatar"
        width={40}
        height={40}
        className={`h-10 w-10 rounded-xl object-cover object-center `}
        src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/0a16cb0e41db33331f39452bcb2488e5873e3a3e.webp"
      /> */}
      <div
        className="inline-flex pt-[8px] pb-[8px] pl-[16px] pr-[16px] 
					items-start gap-[10px] w-fit mt-[10px] ml-[50px] sent-message"
      >
        <p className="sent-message-text">{message}</p>
      </div>
    </div>
  );
};

export default SentMessage;
