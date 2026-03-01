import React from 'react';
import Image from 'next/image';
import award from '../../../../public/assets/icons/award4.svg';
import award9 from '../../../../public/assets/icons/award9.svg';
import award7 from '../../../../public/assets/icons/award7.svg';
import tut1 from '../../../../public/assets/homepage/tut1.png';
import tut2 from '../../../../public/assets/homepage/tut2.png';
import tut3 from '../../../../public/assets/homepage/tut3.png';
import tut4 from '../../../../public/assets/homepage/tut4.png';
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

interface TutorDetailsprops {
  filteredTutors: any;
}
const TutorDetails = ({ filteredTutors }: TutorDetailsprops) => {
  return (
    <>
      {filteredTutors
        ?.filter((teacher: any) => teacher?.isApproved === true && teacher?.user?.verified === true)
        .sort((a: any, b: any) => b.totalBooking - a.totalBooking || b.level - a.level)
        .slice(0, 4)
        .map((teacher: any) => (
          <div
            key={teacher._id}
            className="group flex w-100 gap-12 border-b last:border-b-0 justify-between border-[#9C8BBD] mx-12 lg:mx-6 py-16 mb:py-8 mb:flex-col mb:mx-0 mb:gap-4 tb:flex-col tb:w-full transform transition-all duration-500 ease-out hover:scale-[1.02] hover:border-none hover:shadow-2xl hover:shadow-purple-200/50 hover:bg-gradient-to-r hover:from-white hover:to-purple-50/30 hover:border-purple-300 hover:rounded-2xl hover:mx-4 hover:px-4 cursor-pointer"
          >
            <div className="flex w-[35%] gap-8 justify-between items-center mb:justify-between mb:gap-4 mb:w-full tb:w-[60%] tb:m-auto">
              <div className="w-56 h-56 overflow-hidden rounded-2xl mb:w-1/3 mb:h-auto xl:w-40 xl:h-40 lg:w-36 lg:h-36 group-hover:scale-110 transition-transform duration-500 ease-out group-hover:shadow-xl group-hover:shadow-purple-300/40">
                <img
                  src={teacher?.user?.profilePicture}
                  className="object-cover aspect-square group-hover:brightness-110 transition-all duration-500 ease-out"
                  alt="tutor"
                />
              </div>
              <div className="flex text-[44px] flex-col gap-3 xl:text-4xl lg:text-2xl mb:gap-1 mb:text-3xl">
                <h3 className="text-[#473171] font-semibold mb:text-xl group-hover:text-purple-600 transition-colors duration-300 ease-out group-hover:translate-x-2 transform">
                  {teacher?.contactInformation?.firstName}
                </h3>
                <p className="text-customBlue mb:text-sm group-hover:text-purple-500 transition-colors duration-300 ease-out group-hover:translate-x-2 transform delay-100">
                  {teacher?.totalbooking}+Booking
                </p>
                {/* <p className=" text-[#473171] font-extrabold mb:text-sm">
                ${tutor.sessionPrice}
                <span className="text-[#A297B7] font-light text-[35px] mb:text-[16px]">
                  /session
                </span>
              </p> */}
              </div>
            </div>
            <div className="flex items-center w-[55%] justify-between gap-24 mb:gap-4 mb:w-full mb:flex-col mb:justify-start mb:items-start tb:flex-row tb:w-[60%] tb:m-auto">
              <div className="w-[70%] mb:w-full text-[#473171] lg:w-[85%] group-hover:translate-x-1 transition-transform duration-400 ease-out">
                <h2 className="text-[33px] font-semibold xl:text-2xl lg:text-lg mb:text-xl group-hover:text-purple-600 transition-colors duration-300 ease-out">
                  About me
                </h2>
                <p className="text-[23px] leading-7 mt-3 mb:text-xs xl:text-lg lg:mt-1 xl:leading-5 lg:leading-4 xl:text-[18px] lg:text-sm tb:text-xs group-hover:text-gray-600 transition-colors duration-300 ease-out delay-75">
                  {teacher?.aboutyou}
                </p>
              </div>
              <div className="mb:w-1/2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out group-hover:drop-shadow-2xl">
                <Image
                  loading="lazy"
                  className="w-32 h-32 group-hover:animate-pulse"
                  alt="award"
                  src={
                    teacher?.level == '1'
                      ? level1
                      : teacher?.level == '2'
                        ? level2
                        : teacher?.level == '3'
                          ? level3
                          : teacher?.level == '4'
                            ? level4
                            : teacher?.level == '5'
                              ? level5
                              : teacher?.level == '6'
                                ? level6
                                : teacher?.level == '7'
                                  ? level7
                                  : teacher?.level == '8'
                                    ? level8
                                    : teacher?.level == '9'
                                      ? level9
                                      : teacher?.level == '10'
                                        ? level10
                                        : level1
                  }
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default TutorDetails;
