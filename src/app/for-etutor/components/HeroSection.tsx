'use client';
import React from 'react';
import Image from 'next/image';
import img from '../../../../public/assets/homepage/studenthero2.png';
import Button from '@/components/Button';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[calc(100vh-100px)] px-4 flex items-center mb:flex-col mb:gap-6 mb:py-6 mb:px-0 mb:justify-center animate-fade-in">
      <div className="mb:w-full mb:text-center w-1/2 animate-slide-in-left">
        <h2 className="text-[30px] md:text-[30px] lg:text-[40px] xl:text-[50px] 2xl:text-[60.5px] leading-[1.18] pt-0 font-extrabold animate-text-reveal">
          <span className="text-darkBlue">Become an </span>
          <span className="text-customOrange">eTutor </span>
          <span className="text-darkBlue">and join our </span>
          <span className="text-customBlue">Global Team </span>
        </h2>
        <p className="text-darkBlue font-medium text-[29px] w-10/12 mt-[40px] leading-[34px] lg:text-lg lg:mt-8 lg:leading-normal xl:text-2xl mb:text-sm mb:w-full mb:leading-normal animate-fade-in-delay">
          Transform learning, Level Up & Earn from anywhere
        </p>

        <div className="pt-[50px] lg:pt-12 mb:pt-10">
          <Link href="/SignupAs">
            <span
              onClick={() => {
                localStorage.setItem('activeSidebarItem', 'My Sessions');
                localStorage.setItem('activeTab', 'trial');
              }}
            >
              <Button
                className="text-[34.07] custom-2xl:px-[75px] custom-2xl:py-6 px-10 py-2 sm:py-3 custom-lg:py-4 lg:text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-customBlue/30 hover:-translate-y-1"
                btnName="BECOME AN eTUTOR"
              />
            </span>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center animate-slide-in-right">
        <Image
          loading="lazy"
          alt="eTutor Hero Image"
          src={img}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-none 2xl:max-w-full 3xl:max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default HeroSection;
