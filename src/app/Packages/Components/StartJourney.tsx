import React from "react";

const StartJourney = () => {
  return (
    <div className="bg-cardbg flex flex-col justify-center items-center py-[125px] my-[7.4rem] mb-3 mb:text-center">
      <h2 className="text-5xl 2xl:text-[80px] font-extrabold text-blue mb:text-2xl mb:px-3 xl:text-3xl lg:text-3xl">
        Getting started is simple with eTutor4Me
      </h2>

      <div className="flex w-[93.5%] justify-around items-stretch space-x-4 py-20 pt-[116px] mb:flex-col mb:gap-10 mb:py-8 mb:justify-center mb:items-center tb:flex-wrap">


        <div className="relative  mb:w-4/5  w-[25.8%] lg:w-[30%]">
          <div className="absolute inset-0 bg-[#BBB4D5] rounded-lg transform translate-x-8 translate-y-8  z-0 mb:-translate-x-3 mb:translate-y-3"></div>
          <div className="relative bg-white h-full rounded-lg border-darkBlue border px-9 py-6  flex flex-col justify-between z-10">
            <div className="flex flex-col items-start justify-start flex-grow mb:text-start">
              <h2 className="text-3xl font-extrabold leading-tight text-darkpurple 2xl:text-[53px] 2xl:leading-tight mb:text-xl">
                Take 1 to 2 Free Trial Sessions
              </h2>
              <p className="text-xl  2xl:text-[32px] text-[#473171] leading-tight mt-3 mb:text-sm mb:leading-normal mb-11">
                Begin your journey with a free trial session from one of our
                eTutors. Experience firsthand how eTutor4Me works, with no
                obligation.
              </p>
            </div>
          </div>
        </div>

        <div className="relative  mb:w-4/5  w-[26.1%] lg:w-[30%] mb:!ml-0">
          <div className="absolute inset-0 bg-[#BBB4D5] rounded-lg transform translate-x-8 translate-y-8  z-0 mb:-translate-x-3 mb:translate-y-3"></div>
          <div className="relative bg-white h-full rounded-lg border-darkBlue border px-9 py-6  flex flex-col justify-between z-10">
            <div className="flex flex-col items-start justify-start flex-grow mb:text-start">
              <h2 className="text-3xl font-extrabold leading-tight text-darkpurple 2xl:text-[53px] 2xl:leading-tight mb:text-xl">
                Unsure of your Package?
              </h2>
              <p className="text-xl  2xl:text-[32px] text-[#473171] leading-tight mt-3 mb:text-sm mb:leading-normal">
                Set up a meeting with on of our advisors to discuss your
                learning goals to ensure we find the perfect eTutor match and
                package for you
              </p>
            </div>
          </div>
        </div>

        <div className="relative mb:w-4/5  w-[26.1%] lg:w-[30%] mb:!ml-0">
          <div className="absolute inset-0 bg-[#BBB4D5] rounded-lg transform translate-x-8 translate-y-8  z-0 mb:-translate-x-3 mb:translate-y-3"></div>
          <div className="relative bg-white h-full rounded-lg border-darkBlue border px-9 py-6  flex flex-col justify-between z-10">
            <div className="flex flex-col items-start justify-start flex-grow mb:text-start">
              <h2 className="text-3xl font-extrabold leading-tight text-darkpurple 2xl:text-[53px] 2xl:leading-tight mb:text-xl">
                Start your <br /> journey
              </h2>
              <p className="text-xl 2xl:text-[32px] text-[#473171] leading-tight mt-3 mb:text-sm mb:leading-normal">
                Book your personalized session package abd begin achieving your
                academic goals with eTutor4Me
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default StartJourney;
