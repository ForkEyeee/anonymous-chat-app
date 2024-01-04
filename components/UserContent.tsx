import { FaPhoneAlt } from 'react-icons/fa';
import Image from 'next/image';

const UserContent = () => {
  return (
    <div className="p-[24px] border-b-[1px] ">
      <div className="flex justify-between">
        <div className="flex gap-[16px]">
          <div>
            <Image
              alt="avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-cover object-center"
              src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/0a16cb0e41db33331f39452bcb2488e5873e3a3e.webp"
            />
          </div>
          <div className="flex-col ">
            <p className="font-metropolis  font-semibold leading-[125%]">Florencio Dorrance</p>
            <div className="flex gap-[8px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
              >
                <circle cx="5" cy="5.5" r="5" fill="#68D391" />
              </svg>
              <p className="text-[12px] font-semibold leading-[125%] opacity-[0.6] ">Online</p>
            </div>
          </div>
        </div>
        <div className="flex pt-[10px] pb-[10px] pl-[16px] pr-[16px] items-center gap-[8px] rounded-[8px] bg-[#615ef01a]">
          <FaPhoneAlt class="phone-icon" />
          <p className="text-[#615EF0] font-Metropolis text-[16px] font-semibold leading-[125%]">
            Call
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserContent;
