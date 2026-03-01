import React from 'react';
import Button from './Button';
import Image from 'next/image';
import heroimg from '../../public/assets/heroimg2.png';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-100px)] px-4 flex items-center mb:flex-col mb:gap-6 mb:py-6 mb:px-0 mb:justify-center animate-fade-in">
      <div className="mb:w-full mb:text-center w-1/2 animate-slide-in-left">
        <h2 className="text-[30px] md:text-[30px] lg:text-[40px] xl:text-[50px] 2xl:text-[60.5px] leading-[1.18] pt-0 font-extrabold animate-text-reveal">
          <span className="text-darkBlue">
            Unlock Better Grades With <br />
          </span>
          <span className="text-customBlue">Engaging</span>
          <span className="text-darkBlue">, </span>
          <span className="text-customPink">Efficient </span>
          <span className="text-darkBlue">& </span>
          <span className="text-customOrange">Encouraging</span>
          <span className="text-darkBlue"> Learning!</span>
        </h2>
        <p className="text-darkBlue font-medium text-[29px] w-10/12 mt-[40px] leading-[34px] lg:text-lg lg:mt-8 lg:leading-normal xl:text-2xl mb:text-sm mb:w-full mb:leading-normal animate-fade-in-delay">
          Our eTutors are chosen for their exceptional knowledge and their ability to relate to
          fellow students.
        </p>
        <p className="text-darkBlue font-medium text-[29px] w-10/12 leading-[34px] lg:text-lg lg:leading-normal xl:text-2xl mb:text-sm mb:w-full mb:leading-normal animate-fade-in-delay">
          Experience the difference with us and achieve your academic goals!
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
                btnName="BOOK A FREE SESSION"
              />
            </span>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center animate-slide-in-right">
        <Image
          loading="lazy"
          alt="eTutor Hero Image"
          src={heroimg}
          className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-none 2xl:max-w-full 3xl:max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
