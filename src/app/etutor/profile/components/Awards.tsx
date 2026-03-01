import React from "react";
import level1 from "../../../../../public/level1.svg";
import level2 from "../../../../../public/level2.svg";
import level3 from "../../../../../public/level31.svg";
import level4 from "../../../../../public/level4.svg";
import Image from "next/image";

function Awards() {
  return (
    <div className="mt-16  pt-3 ">
      <div className="bg-[#EDE8FA] rounded-3xl py-7 custom-xl:py-14 px-6 custom-xl:px-12">
        <h1 className="text-xl sm:text-2xl custom-xl:text-4xl text-[#685AAD] font-bold pl-10 ">
          Awards
        </h1>

        <div className="bg-[#B4A5D7] mt-6 custom-xl:mt-12 py-3 sm:py-6 custom-xl:py-12 px-3 sm:px-12 custom-xl:px-24 rounded-3xl space-y-8">
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-start custom-xl:items-center gap-2 sm:gap-4 flex-col custom-xl:flex-row custom-xl:gap-[109px] ">
              <Image
                loading="lazy"
                src={level1}
                alt=""
                className="w-6 sm:w-12 sm:h-12 custom-xl:w-[112px] custom-xl:h-[112px] "
              />
              <h3 className="text-sm sm:text-lg custom-xl:text-3xl font-bold text-white">
                eTutor certificate for 50 sessions
              </h3>
            </div>
            <span className="text-xs sm:text-base custom-xl:text-xl font-bold text-white sm:pr-4 custom-xl:pr-14">
              0/50
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-start custom-xl:items-center gap-2 sm:gap-4 flex-col custom-xl:flex-row custom-xl:gap-[109px] ">
              <Image
                loading="lazy"
                src={level2}
                alt=""
                className="w-6 sm:w-12 sm:h-12 custom-xl:w-[112px] custom-xl:h-[112px]"
              />
              <h3 className="text-sm sm:text-lg custom-xl:text-3xl font-bold text-white">
                eTutor certificate for 100 sessions
              </h3>
            </div>
            <span className="text-xs sm:text-base custom-xl:text-xl font-bold text-white sm:pr-4 custom-xl:pr-14">
              0/50
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-start custom-xl:items-center gap-2 sm:gap-4 flex-col custom-xl:flex-row custom-xl:gap-[109px] ">
              <Image
                loading="lazy"
                src={level3}
                alt=""
                className="w-6 sm:w-12 sm:h-12 custom-xl:w-[112px] custom-xl:h-[112px]"
              />
              <h3 className="text-sm sm:text-lg custom-xl:text-3xl font-bold text-white">
                eTutor certificate for 200 sessions
              </h3>
            </div>
            <span className="text-xs sm:text-base custom-xl:text-xl font-bold text-white sm:pr-4 custom-xl:pr-14">
              0/50
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-start custom-xl:items-center gap-2 sm:gap-4 flex-col custom-xl:flex-row custom-xl:gap-[109px] ">
              <Image
                loading="lazy"
                src={level4}
                alt=""
                className="w-6 sm:w-12 sm:h-12 custom-xl:w-[112px] custom-xl:h-[112px]"
              />
              <h3 className="text-sm sm:text-lg custom-xl:text-3xl font-bold text-white">
                eTutor certificate for 500 sessions
              </h3>
            </div>
            <span className="text-xs sm:text-base custom-xl:text-xl font-bold text-white sm:pr-4 custom-xl:pr-14">
              0/50
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
