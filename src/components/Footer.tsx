import React from "react";
import logo from "../../public/assets/signup/signuplogo.svg";
import Link from "next/link";
import Image from "next/image";
import tiktok from "../../public/tiktokIcon.svg";
import instagram from "../../public/instagramicon.svg";
import X from "../../public/Xicon.svg";
import Youtube from "../../public/youtubeIcon.svg";
import fb from "../../public/Fbicon.svg";
const Footer = () => {
  return (
    <div className="px-[75px] custom-lg:max-h-[501px] bg-cardbg py-[74px] mb:p-5 lg:px-10">
      <div className="flex  custom-lg:gap-4 items-start mb:flex-col gap-0">
        <div className="flex flex-col justify-between gap-12 mb:py-4 xl:gap-5 mb:gap-4 custom-lg:max-w-[15rem] 2xl:max-w-[25.3rem] w-full">
          <div className="flex flex-col gap-y-9 text-xl text-[#473171] lg:gap-5 xl:text-lg xl:gap-7 lg:text-base mb:text-sm mb:gap-4">
            <Link href="">
              {" "}
              <Image
                loading="lazy"
                alt=""
                src={logo}
                className="custom-2xl:w-[176px]"
              />
            </Link>
            <div className="flex flex-col gap-1 items-start">
              <Link
                className="text-[21px] leading-normal text-darkBlue xl:text-lg lg:text-lg mb:text-sm"
                href="mailto:contact@etutor4me.com"
              >
                contact@etutor4me.com
              </Link>
              <Link
                className="text-[21px] leading-normal text-darkBlue xl:text-lg lg:text-lg mb:text-sm"
                href="https://wa.me/number..."
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact us on:&nbsp;<span className="text-[#2c811d]">Whatsapp</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between max-w-[1263.5px] sm:flex-row flex-col gap-5 mb:pb-7">

        <div className="flex flex-col gap-14 text-xs text-[#251F3A] mb:gap-3 mb:pt-4 xl:gap-5 lg:gap-4">
          <h2 className="text-[28px] text-[#534988] font-bold mb:text-base xl:text-xl xl:row-gap-5 lg:text-xl">
            Additional Resources
          </h2>
          <div className="flex flex-col gap-7 text-[21px] leading-normal text-[#473171] lg:gap-5 xl:text-lg xl:gap-7 lg:text-base mb:text-sm mb:gap-4">
            <Link className="" href="">
              Question Bank
            </Link>
            <Link className="" href="">
              Terms and Conditions
            </Link>
            <Link className="" href="">
              Privacy Policy
            </Link>
            <Link className="" href="">
              Cookie Policy
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-14 text-xs text-[#251F3A] mb:gap-3 mb:pt-4 xl:gap-5 lg:gap-4">
          <h2 className="text-[28px] text-[#534988] font-bold mb:text-base xl:text-xl xl:row-gap-5 lg:text-xl">
            Our Services
          </h2>
          <div className="flex flex-col gap-7 text-[21px] leading-normal text-[#473171] lg:gap-5 xl:text-lg xl:gap-7 lg:text-base mb:text-sm mb:gap-4">
            <Link className="" href="">
              Online Tutoring
            </Link>
            <Link className="" href="">
              For Employees
            </Link>
            <Link className="" href="">
              GCSE Exam
            </Link>
            <Link className="" href="">
              MarkMyGCSE
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-14 text-xs text-[#251F3A] mb:gap-3 mb:pt-4 xl:gap-5 lg:gap-4">
          <h2 className="text-[28px] text-[#534988] font-bold mb:text-base xl:text-xl xl:row-gap-5 lg:text-xl">
            Private Tutoring
          </h2>
          <div className="flex flex-col gap-7 text-[21px] leading-normal text-[#473171] lg:gap-5 xl:text-lg xl:gap-7 lg:text-base mb:text-sm mb:gap-4">
            <Link className="" href="">
              Math Tutors
            </Link>
            <Link className="" href="">
              English Tutors
            </Link>
            <Link className="" href="">
              Physics Tutor
            </Link>
            <Link className="" href="">
              GCSE Tutors
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-14 text-xs text-[#251F3A] mb:gap-3 mb:pt-4 xl:gap-5 lg:gap-4">
          <h2 className="text-[28px] text-[#534988] font-bold mb:text-base xl:text-xl xl:row-gap-5 lg:text-xl">
            More Information
          </h2>
          <div className="flex flex-col gap-7 text-[21px] leading-normal text-[#473171] lg:gap-5 xl:text-lg xl:gap-7 lg:text-base mb:text-sm mb:gap-4">
            <Link className="" href="">
              Frequently Asked Questions
            </Link>
            <Link className="" href="">
              About etutor4me
            </Link>
            <Link className="" href="">
              Join Us
            </Link>
            <Link className="" href="">
              Blog
            </Link>
          </div>
        </div>
        </div>
      </div>

      <div className="  mt-2.5 text-xl text-[#473171] lg:gap-5 xl:text-lg xl:gap-7 lg:text-base mb:text-sm">
        <div className="flex gap-x-[23px] relative">
          <Image src={tiktok} alt="" className="w-[24.7px] transition-all duration-500 ease-in-out hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(71,49,113,1)]  hover:cursor-pointer "/>
          <Image src={instagram} alt="" className="w-[28.07px] transition-all duration-500 ease-in-out hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(71,49,113,1)]   hover:cursor-pointer" />
          <Image src={X} alt="" className="w-[28.07px] transition-all duration-500 ease-in-out hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(71,49,113,1)]   hover:cursor-pointer" />
          <Image src={Youtube} alt="" className="w-[36.1px] transition-all duration-500 ease-in-out hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(71,49,113,1)]   hover:cursor-pointer" />
          <Image src={fb} alt="" className="w-[16.84px] transition-all duration-500 ease-in-out hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(71,49,113,1)]   hover:cursor-pointer" />
        </div>
        <p className="mt-7 text-[21px] leading-normal">Copyright 2024 / etutor4me</p>
      </div>
    </div>
  );
};

export default Footer;
