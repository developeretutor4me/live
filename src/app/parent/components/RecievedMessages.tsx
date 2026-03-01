import Image from 'next/image';
import React from 'react';
import level1 from '../../../../public/level-1.svg';
import level2 from '../../../../public/level-2.svg';
import level3 from '../../../../public/level-3.svg';
import level4 from '../../../../public/level-4.svg';
import level5 from '../../../../public/level-5.svg';
import level6 from '../../../../public/level-6.svg';
import level7 from '../../../../public/level-7.svg';
import level8 from '../../../../public/level-8.svg';
import level9 from '../../../../public/level-9.svg';
import level10 from '../../../../public/level-10.svg';
import messageicon from '../../../../public/messageicon.svg';
import folder from '../../../../public/foldericon.svg';
import profile from '../../../../public/profileicon.svg';

function RecievedMessages({ message, showProfileHandler, showChatHandler }: any) {
  return (
    <div className="flex  justify-between items-center  custom-xl:items-center  py-4 custom-xl:py-9 rounded-xl md:rounded-3xl  bg-[#A296CC] pl-6 sm:px-11 pr-6  custom-xl:flex-row custom-xl:gap-0 gap-4">
      <div className="flex  justify-between items-center  custom-xl:items-start custom-xl:w-full custom-xl:max-w-[78.3%]     custom-xl:flex-row custom-xl:gap-4 gap-4">
        {/* name and tier box */}

        <div className="flex  justify-start  w-fit custom-xl:w-fit  custom-xl:flex-row gap-2 custom-xl:gap-6 h-fit items-center  ">
          <div className="w-8 sm:h-16 custom-xl:h-[132px] h-8 sm:w-16 custom-xl:w-[132px] rounded-full bg-white relative ">
            <div className="overflow-hidden  rounded-full h-full w-full flex items-center justify-center">
              <img
                src={message?.details?.user?.profilePicture || ''}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="tier w-5 sm:w-8 custom-xl:w-14 h-5 sm:h-8 custom-xl:h-14 absolute -bottom-1 -left-2">
              <Image
                loading="lazy"
                src={
                  message?.details?.level == '1'
                    ? level1
                    : message?.details?.level == '2'
                      ? level2
                      : message?.details?.level == '3'
                        ? level3
                        : message?.details?.level == '4'
                          ? level4
                          : message?.details?.level == '5'
                            ? level5
                            : message?.details?.level == '6'
                              ? level6
                              : message?.details?.level == '7'
                                ? level7
                                : message?.details?.level == '8'
                                  ? level8
                                  : message?.details?.level == '9'
                                    ? level9
                                    : message?.details?.level == '10'
                                      ? level10
                                      : level1
                }
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>

          <div className=" h-full flex flex-col items-center justify-center gap-6 max-w-48 truncate">
            <h1 className="font-bold text-sm sm:text-lg custom-xl:text-[29.52px] custom-xl:leading-[2rem] font-roboto w-full text-center custom-xl:text-start ">
              {message?.details?.contactInformation?.firstName}
            </h1>

            <div className="w-full  text-center hidden custom-xl:block custom-xl:text-start">
              <p className="text-[18.7px] leading-[1.75rem]">Availability:</p>
              <span className="text-[#473171] text-[18.7px] leading-[1.75rem] truncate ">
                {/* {message?.details?.experience?.availableHours} */}
                {Object.keys(message?.details?.experience?.generalAvailability || {})
                  .slice(0, 3)
                  .map((day, index, array) => (
                    <div key={day} className="flex flex-row">
                      <h3 className="flex">
                        {day}
                        {index < array.length - 1 && ','}
                      </h3>
                    </div>
                  ))}
              </span>
            </div>
          </div>
        </div>
        {/* subject and info box */}
        <div className="custom-xl:max-w-52  w-full  h-fit  custom-xl:flex flex-col items-center custom-xl:items-start hidden ">
          <span className="text-[18.7px] leading-[1.5rem] font-medium">Subjects:</span>
          <p className="  text-[#473171] text-[18.7px] leading-[1.5rem] text-center custom-xl:text-start">
            {message?.details?.experience?.subjectsTutored.join(',')}
          </p>
        </div>

        {/* study and experience box */}
        <div className=" flex-col gap-2  custom-xl:max-w-60 w-full custom-xl:items-start   hidden custom-xl:flex">
          <div className="flex flex-col items-center custom-xl:items-start">
            <span className="text-[18.7px] leading-[1.5rem] font-medium text-white">Study</span>
            <p className="text-[18.7px] leading-[1.5rem] text-[#473171] ">
              {message?.details?.education.degree}
            </p>
          </div>

          <div className="flex flex-col items-center custom-xl:items-start">
            <span className="text-[18.7px] leading-[1.5rem] font-medium text-white ">
              Teaching Experience
            </span>
            <p className="text-[18.7px] leading-[1.5rem] text-[#473171]">
              {message?.details?.experience?.tutoringExperience || 'Not Available'}
            </p>
          </div>
        </div>
      </div>

      {/* accept deny box */}

      <div className="flex flex-col items-end custom-xl:items-start  w-full custom-xl:w-fit custom-xl:py-2">
        <div className=" h-full flex flex-col gap-6 w-fit custom-lg:w-fit">
          <div className=" flex  h-fit w-full justify-between items-center custom-xl:items-start  gap-4 custom-xl:gap-14">
            <Image
              loading="lazy"
              src={messageicon}
              alt=""
              className="w-3 sm:w-6 custom-xl:w-8 hover:cursor-pointer"
              onClick={() => {
                showChatHandler(message);
              }}
            />
            <Image
              loading="lazy"
              src={folder}
              alt=""
              className="w-3 sm:w-6 custom-xl:w-8 hover:cursor-pointer"
              onClick={() => {}}
            />
            <Image
              loading="lazy"
              onClick={() => {
                showProfileHandler(message);
              }}
              src={profile}
              alt=""
              className="w-3 sm:w-6 custom-xl:w-6 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecievedMessages;
