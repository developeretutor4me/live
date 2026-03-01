// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { signOut } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react'
// import bell from "../../../../public/bellicon.svg";
// import translate from "../../../../public/translateicon.svg";
// import dark from "../../../../public/darkicon.svg";

// interface DropdownProps {
//     targetRef: React.RefObject<HTMLDivElement>;
//     toggleProfile: () => void;
//     firstName: string;
//     profilepicture: string;
//     isProfileOpen: boolean;
//     session: any; // Replace `any` with a proper type like `Session | null` if using NextAuth
//     handleImpersonate: () => void;
//     setActiveSidebarItem: (item: string) => void;
//     setIsProfileOpen: (open: boolean) => void;
//     FetchedUserData: any;
// }

// function Dropdown({ targetRef, toggleProfile, firstName, isProfileOpen, session, handleImpersonate, setActiveSidebarItem, setIsProfileOpen, profilepicture, FetchedUserData }: DropdownProps) {
//     return (
//         <div
//             ref={targetRef}
//             className="flex items-center space-x-4 relative -right-0 custom-lg:-right-[22px]  select-none pr-4 sm:pr-0"
//         >
//             {/* <Bell size={24} className="cursor-pointer text-darkBlue" /> */}
//             <div className="flex gap-3 custom-xl:gap-6 custom-2xl:gap-[37px] mr-0 custom-xl:mr-5">
//                 <Image
//                     loading="lazy"
//                     src={dark}
//                     alt=""
//                     className="w-5 h-5 custom-lg:w-[27px] custom-lg:h-[27px]"
//                 />
//                 <Image
//                     loading="lazy"
//                     src={translate}
//                     alt=""
//                     className="w-5 h-5 custom-lg:w-[27px] custom-lg:h-[27px]"
//                 />
//                 <Image
//                     loading="lazy"
//                     src={bell}
//                     alt=""
//                     className="w-5 h-5 custom-lg:w-[27px] custom-lg:h-[27px]"
//                 />
//             </div>

//             {/* -------profile complete------- */}
//             {/* {activeSidebarItem === "Dashboard" && (
//                 <div className=" absolute mb-28 custom-xl:mb-8 hidden sm:block right-4 top-48 custom-lg:top-[8.9rem] custom-xl:top-[6.5rem] max-w-[20.5rem]  custom-xl:max-w-[26.5rem]  ">
//                   <div className="flex  justify-between items-center">
//                     <div>
//                       <h1 className="font-bold text-xl custom-xl:text-3xl   text-[#685AAD] pr-2 custom-xl:pr-24">
//                         Complete&nbsp;your&nbsp;profile
//                       </h1>
//                     </div>
//                     <Image  loading="lazy"  src={rightarrow} alt="" className="w-3 h-3" />
//                   </div>
//                   <div className="flex flex-col">
//                     <span className="text-lg font-medium text-[#685AAD] pb-2">
//                       Profile Status
//                     </span>
//                     <div className="w-full bg-[#DBD8EF] h-2 rounded-full">
//                       <div
//                         className={`w-[${progress}%] h-full bg-[#00DAE5] rounded-full`}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               )} */}

//             <div
//                 onClick={toggleProfile}
//                 className={`flex bg-[#EDE8FA] hover:cursor-pointer  pl-2.5 pr-4  py-1 justify-between w-[9rem] custom-lg:w-[202px]   h-10 custom-lg:h-[48.9px] items-center rounded-[10px] ${isProfileOpen ? "border border-[#685aad7a]" : "border-0"
//                     }`}
//             >
//                 <div className='flex gap-2 custom-lg:gap-5 items-center'>

//                     <div className="w-6 custom-lg:w-[39.6px] h-6 custom-lg:h-[39.6px]  rounded-full overflow-hidden flex items-center justify-center">
//                         <img
//                             // @ts-ignore
//                             src={profilepicture || FetchedUserData?.profilePicture}
//                             alt=""
//                             className="w-full h-full object-cover"
//                         />
//                     </div>

//                     <span className="text-[16px] font-bold text-[#685AAD]  w-[60px]  custom-lg:w-[90px] truncate">
//                         {firstName}
//                     </span>
//                 </div>

//                 {isProfileOpen ? (
//                     <ChevronUp
//                         size={18}
//                         className="cursor-pointer  text-[#685AAD] "
//                     />
//                 ) : (
//                     <ChevronDown
//                         size={18}
//                         className="cursor-pointer  text-[#685AAD] "
//                     />
//                 )}
//             </div>
//             {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 hover:cursor-pointer  bg-[#EDE8FA] font-bold rounded-[10px] shadow-lg py-1 z-[1111111111111111111] top-full w-[9rem] custom-lg:w-[12.5rem] px-5 border border-[#685aad7a]">
//                     <Link
//                         href="/studentdashboard/studentprofile"
//                         className="block px-2 py-2 custom-2xl:py-[15px] text-sm custom-lg:text-[16px] text-[#685AAD]  border-b border-[#685aad7a] "
//                     >
//                         Profile
//                     </Link>
//                     {session?.user?.isAdmin === true && (
//                         <span
//                             onClick={() => {
//                                 handleImpersonate();
//                             }}
//                             className="block px-2 py-2 custom-2xl:py-[15px] text-sm custom-lg:text-[16px] text-[#685AAD]  border-b border-[#685aad7a] "
//                         >
//                             Back to Admin
//                         </span>
//                     )}
//                     <a
//                         onClick={() => {
//                             setActiveSidebarItem("Settings");
//                             setIsProfileOpen(false);
//                         }}
//                         className="block px-2  py-2 custom-2xl:py-[15px] text-sm custom-lg:text-[16px] text-[#685AAD]  border-b border-[#685aad7a] hover:cursor-pointer"
//                     >
//                         Settings
//                     </a>
//                     <a
//                         onClick={() => signOut({ callbackUrl: "/" })}
//                         className="block px-2 py-2 custom-2xl:py-[15px] text-sm custom-lg:text-[16px] text-[#685AAD] "
//                     >
//                         Logout
//                     </a>
//                 </div>
//             )}
//         </div>
//     )
// }

// export default Dropdown

import { ChevronDown, ChevronUp } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import bell from '../../../../public/bellicon.svg';
import translate from '../../../../public/translateicon.svg';
import dark from '../../../../public/darkicon.svg';
import { useRouter } from 'next/navigation';

interface Notification {
  _id: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  senderId?: string;
  senderName?: string;
}

interface NotificationsInterface {
  notifications: Notification[];
  count: number;
  unreadCount: number;
}

interface DropdownProps {
  targetRef: React.RefObject<HTMLDivElement>;
  toggleProfile: () => void;
  firstName: string;
  profilepicture: string;
  isProfileOpen: boolean;
  setActiveSidebarItem: (item: string) => void;
  setIsProfileOpen: (open: boolean) => void;
  FetchedUserData: any;
  notifications: NotificationsInterface;
  notificationError?: string | null;
  onNotificationClickHandler: (notification: Notification) => void;
}

function Dropdown({
  targetRef,
  toggleProfile,
  firstName,
  isProfileOpen,
  setActiveSidebarItem,
  setIsProfileOpen,
  profilepicture,
  FetchedUserData,
  notifications,
  notificationError,
  onNotificationClickHandler,
}: DropdownProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const formatNotificationTime = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleNotificationClick = (notification: Notification) => {
    onNotificationClickHandler(notification);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // Handle click outside to close notification dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNotificationOpen]);
  return (
    <div
      ref={targetRef}
      className="flex items-center space-x-4  relative -right-0 custom-lg:-right-[22px]  select-none"
    >
      {/* <Bell size={24} className="cursor-pointer text-darkBlue" /> */}
      <div className="flex gap-3 custom-xl:gap-6 custom-2xl:gap-[37px] mr-0 custom-xl:mr-5">
        <Image
          loading="lazy"
          src={dark}
          alt=""
          className="w-5 h-5 custom-lg:w-[27px] custom-lg:h-[27px]"
        />
        <Image
          loading="lazy"
          src={translate}
          alt=""
          className="w-5 h-5 custom-lg:w-[27px] custom-lg:h-[27px]"
        />
        <div className="relative cursor-pointer" onClick={toggleNotifications}>
          <Image
            loading="lazy"
            src={bell}
            alt=""
            className="w-5 h-5 custom-lg:w-[27px] custom-lg:h-[27px] hover:scale-110 transition-transform duration-200"
          />
          {notifications && notifications.unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold animate-pulse">
              {notifications.unreadCount > 9 ? '9+' : notifications.unreadCount}
            </div>
          )}
        </div>
      </div>

      <div
        onClick={toggleProfile}
        className={`flex bg-[#EDE8FA] hover:cursor-pointer  pl-2.5 pr-4  py-1 justify-between w-[9rem] custom-lg:w-[202px]   h-10 custom-lg:h-[48.9px] items-center rounded-[10px] ${
          isProfileOpen ? 'border border-[#685aad7a]' : 'border-0'
        }`}
      >
        <div className="flex gap-2 custom-lg:gap-5 items-center">
          <div className="w-6 custom-lg:w-[39.6px] h-6 custom-lg:h-[39.6px]  rounded-full overflow-hidden flex items-center justify-center">
            <Image
              src={profilepicture || FetchedUserData?.profilePicture || '/default-avatar.png'}
              alt="Profile picture"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>

          <span className="text-[16px] font-bold text-[#685AAD]  w-[60px]  custom-lg:w-[90px] truncate">
            {firstName}
          </span>
        </div>

        {isProfileOpen ? (
          <ChevronUp size={18} className="cursor-pointer  text-[#685AAD] " />
        ) : (
          <ChevronDown size={18} className="cursor-pointer  text-[#685AAD] " />
        )}
      </div>
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 hover:cursor-pointer  bg-[#EDE8FA] font-bold rounded-[10px] shadow-lg py-1 z-[1111111111111111] top-full w-[9rem] custom-lg:w-[12.5rem] px-5 border border-[#685aad7a]">
          <Link
            href="/studentdashboard/studentprofile"
            className="block px-2 py-2 custom-2xl:py-[15px] text-sm custom-lg:text-[16px] text-[#685AAD]  border-b border-[#685aad7a] "
          >
            Profile
          </Link>
          <a
            onClick={() => {
              router.push('/studentdashboard/settings');
            }}
            className="block px-2  py-2 custom-2xl:py-[15px] text-sm custom-lg:text-[16px] text-[#685AAD]  border-b border-[#685aad7a] hover:cursor-pointer"
          >
            Settings
          </a>
          <a
            onClick={() => signOut({ callbackUrl: '/' })}
            className="block px-2 py-2 custom-2xl:py-[15px] text-sm custom-lg:text-[16px] text-[#685AAD] "
          >
            Logout
          </a>
        </div>
      )}

      {/* Notifications Dropdown */}
      {isNotificationOpen && (
        <div
          ref={notificationRef}
          className="absolute right-0 mt-2 bg-[#EDE8FA] rounded-[10px] shadow-xl py-2 z-[1111111111111111] top-full w-[20rem] custom-lg:w-[24rem] border border-[#685aad7a] max-h-96 overflow-hidden"
        >
          <div className="px-4 py-2 border-b border-[#685aad7a]">
            <div className="flex items-center justify-between">
              <h3 className="text-[#685AAD] font-bold text-sm custom-lg:text-base">
                Notifications
              </h3>
              {notifications.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.unreadCount} new
                </span>
              )}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#685aad40] scrollbar-thumb-rounded-3xl">
            {notificationError ? (
              <div className="px-4 py-6 text-center">
                <p className="text-red-500 text-sm">{notificationError}</p>
              </div>
            ) : notifications.notifications.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-[#685AAD] text-sm opacity-70">No notifications yet</p>
              </div>
            ) : (
              notifications.notifications.map((notification, index) => (
                <div
                  key={notification._id || index}
                  onClick={() => handleNotificationClick(notification)}
                  className={`px-4 py-3 border-b border-[#685aad20] cursor-pointer transition-all duration-200 hover:bg-[#685aad10] ${
                    !notification.isRead ? 'bg-[#685aad05] border-l-4 border-l-[#8C55FF]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[#685AAD] text-sm font-medium leading-relaxed">
                        {notification.message}
                      </p>
                      {notification.senderName && (
                        <p className="text-[#685AAD] text-xs opacity-70 mt-1">
                          from {notification.senderName}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[#685AAD] text-xs opacity-60">
                        {formatNotificationTime(notification.createdAt)}
                      </span>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-[#8C55FF] rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
