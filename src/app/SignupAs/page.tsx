'use client';
import Layout from '@/components/auth/Layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Sign_Up_Icon from '../../../public/sign-up-line.png';
import Image from 'next/image';

const Page = () => {
  const searchParams = useSearchParams();
  const refId = searchParams.get('ref');

  useEffect(() => {
    if (refId) {
      localStorage.setItem('referIdPerson', refId);
    }
  }, [refId]);

  return (
    <Layout showFooter={false}>
      <div className="relative max-w-2xl w-full px-4 sm:px-6 md:px-8 mt-[-100px]">
        {/* Parent Button */}
        <Link href="/ParentSignup">
          <button
            className="group relative w-full rounded-full py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 font-bold text-[#FFFFFF]
                    transition-all duration-300 ease-in-out transform
                    hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50
                    active:scale-95 overflow-hidden
                    text-[22px] lg:text-[26px] xl:text-[29.01px] 2xl:text-[32.75px] 3xl:text-[29.01px] mb-4 md:mb-6 bg-[#9b6ffe]"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-lg">
              I&apos;m a Parent
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-0
                          group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
              className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100
                          transition-transform duration-500 origin-left"
            ></div>
          </button>
        </Link>

        {/* Student Button */}
        <Link href="/StudentSignup">
          <button
            className="group relative w-full rounded-full py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 font-bold text-[#FFFFFF]
                    transition-all duration-300 ease-in-out transform
                    hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50
                    active:scale-95 overflow-hidden
                    text-[22px] lg:text-[26px] xl:text-[29.01px] 2xl:text-[32.75px] 3xl:text-[29.01px] mb-4 md:mb-6 bg-[#9b6ffe]"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-lg">
              I&apos;m a Student
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500 opacity-0
                          group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
              className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100
                          transition-transform duration-500 origin-left"
            ></div>
          </button>
        </Link>

        {/* Separator Line */}
        <div className="flex items-center justify-center pb-5 my-0">
          <Image loading="lazy" src={Sign_Up_Icon} alt="sign-up-icon" />
        </div>

        {/* eTutor Button */}
        <Link href="/ETutorSignup">
          <button
            className="group relative w-full rounded-full py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 font-medium text-[#FFFFFF]
                    transition-all duration-300 ease-in-out transform
                    hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50
                    active:scale-95 overflow-hidden
                    text-[22px] lg:text-[26px] xl:text-[29.01px] 2xl:text-[32.75px] 3xl:text-[29.01px] bg-[#f8a596]"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-lg">
              I&apos;m an eTutor
            </span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-400 opacity-0
                          group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div
              className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100
                          transition-transform duration-500 origin-left"
            ></div>
          </button>
        </Link>
      </div>
      <div className="text-center absolute bottom-[100px] left-0 right-0">
        <p className="text-[#473171] text-[14px] md:text-[16px]">
          eTutor4me Inc. © Copyright 2025. All Rights Reserved.
        </p>
      </div>
    </Layout>
  );
};

export default Page;
