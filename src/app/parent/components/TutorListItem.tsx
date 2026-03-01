import Image from 'next/image';
import React from 'react'
import purplechaticon from "../../../../public/purplechaticon.svg";
import foldericonpurple from "../../../../public/foldericonpurple.svg";
import profileicon from "../../../../public/profile icon purple.svg";

export const TutorListItem = ({
    tutor,
    isActive,
    onClick,
    onChatClick,
    onFolderClick,
    onProfileClick,

}: any) => (
    <div
        className={` hidden sm:flex flex-row justify-between items-center py-2 sm:py-3 custom-2xl:py-6  pl-2 sm:pl-3 custom-2xl:pl-5 pr-4 custom-2xl:pr-9 cursor-pointer   rounded-lg md:rounded-xl  bg-[#A296CC]  `}
    >
        <div className="flex items-center" onClick={onClick}>
            <div className="rounded-full mr-4 w-4 sm:w-7 h-4 sm:h-7  custom-2xl:h-[60px] custom-2xl:w-[60px] overflow-hidden">

                <img
                    src={tutor.user.profilePicture}
                    alt={tutor.contactInformation.firstName}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex-grow">
                <p
                    className={`font-semibold text-base custom-2xl:text-2xl hidden md:block  truncate  ${isActive ? "text-white" : "text-white"
                        }`}
                >
                    {tutor.contactInformation.firstName}
                </p>
            </div>
        </div>

        {/* icons */}
        <div className="flex  justify-between items-end   custom-2xl:mt-0 w-full max-w-[2.9rem] sm:max-w-[4rem] custom-2xl:max-w-[6.8rem]  ">
            <button onClick={onChatClick} className=" rounded-full ">
                <Image loading="lazy"
                    src={purplechaticon}
                    alt=""
                    className=" w-3 sm:w-4  h-3 sm:h-4 custom-2xl:w-7 custom-2xl:h-7"
                />
            </button>
            <button onClick={onFolderClick} className="  rounded-full">
                <Image loading="lazy"
                    src={foldericonpurple}
                    alt=""
                    className=" w-3 sm:w-4  h-3 sm:h-4 custom-2xl:w-7 custom-2xl:h-7"
                />
            </button>
            <button onClick={onProfileClick} className=" rounded-full">
                <Image loading="lazy"
                    src={profileicon}
                    alt=""
                    className=" w-3 sm:w-4  h-3 sm:h-4 custom-2xl:w-7 custom-2xl:h-7"
                />
            </button>
        </div>
    </div>
);
