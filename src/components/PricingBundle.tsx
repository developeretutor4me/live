'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
const BundlePricing = () => {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col custom-lg:mb-6  mx-auto px-4 py-[75px]">
      {/* Header Text */}
      <h1 className="text-center text-[#584A91] text-2xl md:text-[42.79px] leading-normal lg:text-4xl font-medium max-w-[1550px] mx-auto mb:text-xl mb:px-4 px-2 md:px-8">
        Preparing for an upcoming exam? Our flexible bundles, led by expert tutors, are perfect for
        test prep like{' '}
        <span className="text-[#9568ff] font-bold">SAT, ACT, GMAT, GRE, IB, GCSE, </span>
        <span className="text-[#9568ff] font-bold">and more!</span>
      </h1>

      {/* Bundles Container */}
      <div className="flex justify-center items-start gap-14 mt-[75px] mb:flex-col flex-wrap lg:gap-6">
        {/* 5 Sessions Bundle */}
        <div className="relative w-full custom-lg:max-w-[510px] max-w-full group">
          <div className="absolute inset-0 bg-[#cfccde] rounded-[30px] transform -translate-x-5 translate-y-6  mb:-translate-x-2 mb:translate-y-2"></div>
          <div className="relative bg-white rounded-[30px] border-[3px] border-[#5553c4] px-12 py-6 flex flex-col ">
            <h2 className="text-[#8653FF] text-5xl 2xl:text-[74.58px] font-bold leading-tight mb:text-4xl transition-all mt-2 group-hover:scale-105 origin-bottom-left duration-500  transform  group-hover:-translate-y-0.5">
              5&nbsp;Sessions
            </h2>

            <div className="text-[#8653FF] text-4xl 2xl:text-[46px] leading-tight font-medium mb-0 group-hover:mb-2.5 mb:text-3xl transition-all  group-hover:scale-[1.44] origin-top-left duration-500  ">
              $270.00
            </div>

            <div className=" mt-0 group-hover:mt-5   transition-all   h-0 group-hover:h-[48px]   origin-top  duration-500 text-[#aa87ff] text-xl  mb-4  ">
              <div className=" transition-all transform -translate-y-2 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 origin-top duration-500">
                <span className="font-medium text-[27px] leading-[2rem]">AVG </span>
                <span className="font-medium text-[37.51px] leading-[2.5rem]">$54.00</span>
                <span className="font-medium text-[27px] leading-[2rem]">/session</span>
              </div>
            </div>
            <p className="text-[#685aad] text-[30.16px] leading-tight font-medium  mb-11  mt-2 flex-grow mb:text-lg transition-all ">
              Perfect for short-term needs and focused learning.
            </p>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                localStorage.setItem('activeSidebarItem', 'My Membership');
                router.push('/SignupAs');
              }}
              className=" bg-[#aa87ff] text-white py-2 sm:py-3.5 px-10 sm:px-[84px] group-hover:scale-110 rounded-full text-xl 2xl:text-4xl font-bold group-hover:bg-[#7B40FF] transition-all duration-500 w-fit mx-auto mb-5"
            >
              Get&nbsp;Bundle
            </button>
          </div>
        </div>

        <div className="relative w-full custom-lg:max-w-[510px] max-w-full group ">
          <div className="absolute inset-0 bg-[#cfccde] rounded-[30px] transform  translate-y-6   mb:translate-y-2"></div>
          <div className="relative bg-white rounded-[30px] border-[3px] border-[#5553c4] px-12 py-6 flex flex-col ">
            <h2 className="text-[#8653FF] text-5xl 2xl:text-[74.58px] font-bold leading-tight mb:text-4xl transition-all mt-2 group-hover:scale-105 origin-bottom-left duration-500  transform  group-hover:-translate-y-0.5">
              10&nbsp;Sessions
            </h2>
            <div className="text-[#8653FF] text-4xl 2xl:text-[46px] leading-tight font-medium mb-0 group-hover:mb-2.5 mb:text-3xl transition-all  group-hover:scale-[1.44] origin-top-left duration-500  ">
              $530.00
            </div>
            <div className=" mt-0 group-hover:mt-5   transition-all   h-0 group-hover:h-[48px]   origin-top  duration-500 text-[#aa87ff] text-xl  mb-4  ">
              <div className=" transition-all transform -translate-y-2 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 origin-top duration-500">
                <span className="font-medium text-[27px] leading-[2rem]">AVG </span>
                <span className="font-medium text-[37.51px] leading-[2.5rem]">$53.00</span>
                <span className="font-medium text-[27px] leading-[2rem]">/session</span>
              </div>
            </div>
            <p className="text-[#685aad] text-[30.16px] leading-tight font-medium  mb-11  mt-2 flex-grow mb:text-lg transition-all  ">
              Ideal for consistent support and steady progress.
            </p>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                localStorage.setItem('activeSidebarItem', 'My Membership');

                router.push('/SignupAs');
              }}
              className=" bg-[#aa87ff] text-white py-2 sm:py-3.5 px-10 sm:px-[84px] rounded-full text-xl 2xl:text-4xl font-bold group-hover:scale-110 group-hover:bg-[#7B40FF] transition-all duration-500 w-fit mx-auto mb-5"
            >
              Get&nbsp;Bundle
            </button>
          </div>
        </div>

        <div className="relative w-full custom-lg:max-w-[510px] max-w-full group ">
          <div className="absolute inset-0 bg-[#cfccde] rounded-[30px] transform translate-x-5 translate-y-6  mb:translate-x-2 mb:translate-y-2"></div>
          <div className="relative bg-white rounded-[30px] border-[3px] border-[#5553c4] px-12 py-6 flex flex-col ">
            <h2 className="text-[#8653FF] text-5xl 2xl:text-[74.58px] font-bold leading-tight mb:text-4xl transition-all mt-2 group-hover:scale-105 origin-bottom-left duration-500  transform  group-hover:-translate-y-0.5">
              20&nbsp;Sessions
            </h2>
            <div className="text-[#8653FF] text-4xl 2xl:text-[46px] leading-tight font-medium mb-0 group-hover:mb-2.5 mb:text-3xl transition-all  group-hover:scale-[1.44] origin-top-left duration-500  ">
              $1010.00
            </div>
            <div className=" mt-0 group-hover:mt-5   transition-all   h-0 group-hover:h-[48px]   origin-top  duration-500 text-[#aa87ff] text-xl  mb-4  ">
              <div className=" transition-all transform -translate-y-2 group-hover:translate-y-0  opacity-0 group-hover:opacity-100 origin-top duration-500">
                <span className="font-medium text-[27px] leading-[2rem]">AVG </span>
                <span className="font-medium text-[37.51px] leading-[2.5rem]">$50.00</span>
                <span className="font-medium text-[27px] leading-[2rem]">/session</span>
              </div>
            </div>
            <p className="text-[#685aad] text-[30.16px] leading-tight font-medium  mb-11  mt-2 flex-grow mb:text-lg transition-all ">
              Great for long-term learning and exam preparation.{' '}
            </p>
            <button
              onClick={(e: any) => {
                e.preventDefault();
                localStorage.setItem('activeSidebarItem', 'My Membership');

                router.push('/SignupAs');
              }}
              className=" bg-[#aa87ff] text-white py-2 sm:py-3.5 px-10 sm:px-[84px] rounded-full text-xl 2xl:text-4xl font-bold group-hover:scale-110 group-hover:bg-[#7B40FF] transition-all duration-500 w-fit mx-auto mb-5"
            >
              Get&nbsp;Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundlePricing;
