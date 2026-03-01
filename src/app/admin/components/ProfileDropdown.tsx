import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import bell from "../../../../public/bellicon.svg";
import translate from "../.././../../public/translateicon.svg";
import dark from "../../../../public/darkicon.svg";
import { signOut } from "next-auth/react";
import e from '../../../../public/eicon.svg'




function ProfileDropdown() {
  const targetRef = useRef<HTMLDivElement>(null); // Reference to your component

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className={`flex justify-between items-center `}>
      <div
        ref={targetRef}
        className="flex items-center   space-x-4 relative  select-none "
      >
        {/* <Bell size={24} className="cursor-pointer text-darkBlue" /> */}
        <div className="flex gap-4 custom-2xl:gap-9 mr-10  max-w-[9rem] w-full">
          <Image
            loading="lazy"
            src={dark}
            alt=""
            className="w-5 h-5 custom-2xl:w-[28px] custom-2xl:h-[28px]"
          />
          <Image
            loading="lazy"
            src={translate}
            alt=""
            className="w-5 h-5 custom-2xl:w-[28px] custom-2xl:h-[28px]"
          />
          <Image
            loading="lazy"
            src={bell}
            alt=""
            className="w-5 h-5 custom-2xl:w-[28px] custom-2xl:h-[28px]"
          />
        </div>

        <div
          onClick={toggleProfile}
          className={`flex bg-[#EDE8FA] hover:cursor-pointer  px-4 py-2 justify-between w-[9rem] custom-2xl:w-[12.5rem]   h-10 custom-2xl:h-[53px] items-center rounded-xl ${
            isProfileOpen ? "border border-[#685aad7a]" : "border-0"
          }`}
        >
          <div className="flex gap-3 items-center">
            <div className="w-6 custom-2xl:w-[35px] h-6 custom-2xl:h-[35px]    rounded-full overflow-hidden flex items-center justify-center">
              <Image src={e} alt="" className="  object-cover " />
            </div>
            {/* <div className="flex items-center  w-full  gap-2 custom-2xl:gap-4">
    
                  </div> */}
            <span className="text-sm custom-2xl:text-base font-bold text-[#685AAD]">
              Admin
            </span>
          </div>

          {isProfileOpen ? (
            <ChevronUp size={18} className="cursor-pointer  text-[#685AAD] " />
          ) : (
            <ChevronDown
              size={18}
              className="cursor-pointer  text-[#685AAD] "
            />
          )}
        </div>

        {isProfileOpen && (
          <div className=" right-0 mt-2 hover:cursor-pointer  bg-[#EDE8FA] font-bold rounded-md shadow-lg py-1 z-10 top-full w-[9rem] custom-2xl:w-[12.5rem] px-4 border border-[#685aad7a]">
           

            <a
              onClick={() => signOut({ callbackUrl: "/" })}
              className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD] "
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default ProfileDropdown;
