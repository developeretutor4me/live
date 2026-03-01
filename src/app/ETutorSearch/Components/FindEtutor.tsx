'use client';
import Button from '@/components/Button';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const FindEtutor = () => {
  const router = useRouter();
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = 'eTutor';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const handleBookFreeSession = () => {
    localStorage.setItem('activeSidebarItem', 'My Sessions');
    localStorage.setItem('activeTab', 'trial');
    router.push('/SignupAs');
  };

  return (
    <div className=" flex flex-col justify-center items-center  gap-9  mb:gap-6 h-[80vh] lg:h-[70vh] mb:h-[60vh]">
      <h2 className="text-darkBlue text-[93px] leading-normal font-extrabold mb:text-3xl xl:text-[4rem] lg:text-[3.5rem] custom-2xl:mt-10">
        Find Your{` `}
        <span className="text-customOrange">
          {displayText}
          {isTyping && <span className="animate-pulse">|</span>}
        </span>
      </h2>
      <p className=" max-w-[950px] text-[46.03px] font-medium leading-tight text-[#473171]  mb:text-base xl:text-[2rem] lg:text-[1.5rem] text-center">
        Find the best private tutors online, book a free trial and arrange a meeting with one of our
        vetted tutors.
      </p>

      <div className="mt-[115px] mb:mt-8">
        <Button
          btnName="BOOK A FREE SESSION"
          className="py-[25px] px-20 mb:py-4 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-customOrange/25 active:scale-95 hover:animate-pulse cursor-pointer"
          onClick={handleBookFreeSession}
        />
      </div>
    </div>
  );
};

export default FindEtutor;
