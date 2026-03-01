import Headings from '@/components/Headings';
import React from 'react';
import Image from 'next/image';
import img1 from '../../../../public/assets/homepage/qualifiedtutors.png';
import img2 from '../../../../public/pyamenticon.svg';
import img3 from '../../../../public/cardicon.svg';
import img4 from '../../../../public/shieldicon.svg';

const OnlineTutoring = () => {
  return (
    <div className="w-full  py-60 mb:py-12 mb:w-11/12 mb:m-auto lg:py-24">
      <div className="text-center">
        <h1 className="mb:text-2xl text-center text-[78px] leading-none font-extrabold text-darkBlue lg:text-5xl  xl:text-6xl">
          Secure Online Tutoring
        </h1>
        <p className="text-2xl 2xl:text-[46px] leading-normal mt-6 text-[#534988] mb:text-base">
          We provide a protected learning environment to foster student success.
        </p>
      </div>

      <div className="relative w-[90%]  m-auto mt-14 mb:w-full ">
        <div className="relative bg-white rounded-2xl border-darkBlue border-2 px-8 py-4 mb:p-0 drop-shadow-[22px_30px_0px_rgb(207,204,222)] max-w-[1698.3px] w-full mx-auto">
          <div className="flex justify-around items-start gap-10 px-4 pt-[34px] pb-2.5 mb:flex-col mb:items-center ">
            <div className="w-[25%]   flex flex-col gap-5 justify-center items-center mb:w-[70%]">
              <div className="h-[117.78px] flex items-center justify-center ">
                <Image loading="lazy" className="" alt="" src={img1} />
              </div>
              <h2 className="text-darkBlue lg:text-sm 2xl:text-[32px] leading-tight  mt-0.5 font-semibold text-center text-lg  mb:text-base">
                Thoroughly screened and qualified eTutors
              </h2>
            </div>
            <div className="w-[25%] flex   flex-col gap-5 justify-center items-center mb:flex-col  mb:w-[70%]">
              <div className="h-[117.78px] flex items-center justify-center ">
                <Image loading="lazy" className="" alt="" src={img2} />
              </div>
              <h2 className="text-darkBlue  lg:text-sm 2xl:text-[32px] leading-normal mt-0.5 text-center text-lg font-semibold mb:text-base">
                Reliable payment methods
              </h2>
            </div>
            <div className="w-[25%] flex   flex-col gap-5 justify-center items-center mb:flex-col  mb:w-[70%]">
              <div className="h-[117.78px] flex items-center justify-center ">
                <Image loading="lazy" className="" alt="" src={img3} />
              </div>
              <h2 className="text-darkBlue  lg:text-sm 2xl:text-[32px] leading-normal text-center mt-0.5 text-lg font-semibold mb:text-base">
                No hidden Fees
              </h2>
            </div>
            <div className="w-[25%] flex  flex-col gap-5 justify-center items-center mb:flex-col  mb:w-[70%]">
              <div className="h-[117.78px] flex items-center justify-center ">
                <Image loading="lazy" className="" alt="" src={img4} />
              </div>
              <h2 className="text-darkBlue  lg:text-sm  2xl:text-[32px] leading-normal mt-0.5 text-center text-lg font-semibold mb:text-base">
                Robust online Learning Platform
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineTutoring;
