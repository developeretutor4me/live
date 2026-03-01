import React from "react";
import Headings from "@/components/Headings";
import Image from "next/image";
import icon1 from "../../../../public/assets/icons/icon1.svg";
import icon2 from "../../../../public/assets/icons/icon2.svg";
import icon3 from "../../../../public/assets/icons/icon3.svg";
import icon4 from "../../../../public/assets/icons/icon4.svg";
const WhyEtutorWithus = () => {
  return (
    <div className="px-[72px] py-16 mb:px-0 mb:py-6 pt-[17.4rem] lg:px-0 lg:pt-12 xl:pt-16">
      <Headings className="" heading="Why become an eTutor with us?" />
      <div className="py-[70px] mb:py-4 ">
        <div className="flex  justify-between w-full py-16 mb:flex-col mb:py-4 mb:w-full ">
          <div className="flex w-screen justify-between mb:flex-col mb:py-4 mb:w-full">
            <div className="flex  items-start gap-16  w-[40%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full">
              <div className="w-[109.48px] h-[109.48px]  bg-cardbg rounded-2xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20">
                <Image
                  loading="lazy"
                  alt=""
                  className="absolute left-[25px] bottom-[-8px] mb:left-[15px]  mb:h-full "
                  src={icon1}
                />
              </div>
              <div className="text-darkBlue  mb:w-2/3">
                <h2 className="  text-[58px] leading-none font-extrabold mb:text-lg xl:text-4xl lg:text-3xl">
                  Work from Anywhere
                </h2>
                <p className="max-w-[28rem]  leading-tight lg:max-w-[20rem] mt-3 text-[27px] bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2">
                  Enjoy the freedom to tutor from anywhere in the world, whether
                  you&apos;re at home, <br className="hidden 2xl:block"/> in a café, or traveling, and connect with
                  students online for valuable sessions.
                </p>
              </div>
            </div>

            <div className="flex  items-start gap-16  w-[40%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full">
              <div className="w-[109.48px] h-[109.48px]  bg-cardbg rounded-2xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20">
                <Image
                  loading="lazy"
                  alt=""
                  className="absolute left-[25px] bottom-[-8px] mb:left-[15px]  mb:h-full "
                  src={icon2}
                />
              </div>
              <div className="text-darkBlue  mb:w-2/3">
                <h2 className="  text-[58px] leading-none font-extrabold mb:text-lg xl:text-4xl lg:text-3xl">
                  Flexible Scheduling
                </h2>
                <p className="max-w-[28.2rem] lg:max-w-[20rem] leading-tight mt-3 text-[27px] bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2">
                  As an eTutor, you control your schedule, fitting sessions
                  around your commitments with our flexible platform.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  justify-between w-full py-16 mb:flex-col mb:py-4 mb:pt-0 mb:w-full ">
          <div className="flex w-screen justify-between mb:flex-col mb:py-4 mb:pt-0 mb:w-full">
            <div className="flex  items-start gap-16  w-[45%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full">
              <div className="w-[109.48px] h-[109.48px]  bg-cardbg rounded-2xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20">
                <Image
                  loading="lazy"
                  alt=""
                  className="absolute left-[25px] bottom-[-8px] mb:left-[15px]  mb:h-full "
                  src={icon3}
                />
              </div>
              <div className="text-darkBlue  mb:w-2/3">
                <h2 className="  text-[58px] leading-none font-extrabold mb:text-lg xl:text-4xl lg:text-3xl">
                  Constant Pay Increases
                </h2>
                <p className="max-w-[34rem]  lg:max-w-[20rem] leading-tight mt-3 text-[27px] bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2">
                  Your dedication and hard work lead to constant pay increases,
                  as leveling up and student success directly boost your
                  earnings.
                </p>
              </div>
            </div>

            <div className="flex  items-start gap-16  w-[40%]  xl:w-[45%] lg:w-[45%] lg:gap-10 mb:gap-8 mb:w-full mb:m-auto mb:py-4 tb:w-full">
              <div className="w-[109.48px] h-[109.48px]  bg-cardbg rounded-2xl relative lg:w-24 lg:h-24 mb:w-20 mb:h-20">
                <Image
                  loading="lazy"
                  alt=""
                  className="absolute left-[25px] bottom-[-8px] mb:left-[15px]  mb:h-full "
                  src={icon4}
                />
              </div>
              <div className="text-darkBlue  mb:w-2/3">
                <h2 className="  text-[58px] leading-none font-extrabold mb:text-lg xl:text-4xl lg:text-3xl">
                  Gamified Tutoring
                </h2>
                <p className="max-w-[28rem] lg:max-w-[20rem] leading-tight mt-3 text-[27px] bold-medium mb:text-[12px] mb:max-w-none lg:text-[20px] xl:text-2xl mb:mt-2">
                  Our unique system lets you level up <br className="hidden 2xl:block" /> like in a game, with your
                  progress based on tutoring effectiveness, activity, and
                  community involvement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyEtutorWithus;
