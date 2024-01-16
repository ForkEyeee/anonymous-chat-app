import { FaPhoneAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Spinner from './ui/spinner';

const UserInformation = ({ otherUserId, isConnected }) => {
  return (
    <div className="p-[24px] border-b-[1px] ">
      <div className="flex justify-between">
        <div className="flex gap-[16px]">
          <div>
            {/* <Image
              alt="avatar"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-cover object-center"
              src="https://uortjlczjmucmpaqqhqm.supabase.co/storage/v1/object/public/firejet-converted-images/images/0a16cb0e41db33331f39452bcb2488e5873e3a3e.webp"
            /> */}
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                {isConnected ? otherUserId.slice(0, 2).toUpperCase() : ''}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-col ">
            <p className="font-metropolis  font-semibold leading-[125%]">
              {isConnected ? otherUserId : 'Searching for chatters'}
            </p>
            <div className="flex gap-[8px] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
              >
                <circle cx="5" cy="5.5" r="5" fill={isConnected ? '#68D391' : '#FF0000'} />
              </svg>
              <p className="text-[12px] font-semibold leading-[125%] opacity-[0.6] ">
                {isConnected ? 'Connected' : 'Disconnected'}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="flex gap-4"> */}
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        <div className="flex pt-[10px] pb-[10px] pl-[16px] pr-[16px] items-center gap-[8px] rounded-[8px] bg-[#615ef01a]">
          <FaPhoneAlt className="phone-icon" />
          <p className="text-[#615EF0] font-Metropolis text-[16px] font-semibold leading-[125%]">
            Call
          </p>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
