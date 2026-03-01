'use client';
import Button from '@/components/Button';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Info } from 'lucide-react';
import styles from './Packages.module.css';

interface Packageprops {
  fontsize: string;
  textcolor: string;
  position: string;
  text1: string;
  text2: string;
  width: string;
  padding: string;
}

const Package = ({ fontsize, textcolor, position, text1, text2, width, padding }: Packageprops) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isStandardVisible, setIsStandardVisible] = useState(false);
  const [isPremiumVisible, setIsPremiumVisible] = useState(false);
  const [isPayAsYouGoVisible, setIsPayAsYouGoVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const standardRef = useRef<HTMLDivElement>(null);
  const premiumRef = useRef<HTMLDivElement>(null);
  const payAsYouGoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger the card animations
            setTimeout(() => setIsStandardVisible(true), 200);
            setTimeout(() => setIsPremiumVisible(true), 400);
            setTimeout(() => setIsPayAsYouGoVisible(true), 600);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const standardObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsStandardVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const premiumObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsPremiumVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const payAsYouGoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsPayAsYouGoVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    if (standardRef.current) standardObserver.observe(standardRef.current);
    if (premiumRef.current) premiumObserver.observe(premiumRef.current);
    if (payAsYouGoRef.current) payAsYouGoObserver.observe(payAsYouGoRef.current);

    return () => {
      observer.disconnect();
      standardObserver.disconnect();
      premiumObserver.disconnect();
      payAsYouGoObserver.disconnect();
    };
  }, []);

  return (
    <div className={`${width}`} ref={containerRef}>
      <h2
        className={`${textcolor} ${fontsize} ${position} transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p>{text1}</p>
        <p className="">{text2} </p>
      </h2>

      <div
        className={`${padding} ${styles.mainbox} custom-lg:py-16 mt-2 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Standard Card */}
        <div
          ref={standardRef}
          className={`top-5 relative w-full max-w-[462px] max-h-[600.97px] h-full flex flex-col mb:max-w-full transition-all duration-1000 ease-out transform ${
            isStandardVisible
              ? 'opacity-100 translate-y-0 scale-100 rotate-0'
              : 'opacity-0 translate-y-20 scale-95 rotate-2'
          }`}
        >
          <div className="absolute inset-0 transform -translate-x-4 translate-y-5 bg-[#CFCCDD] rounded-3xl custom-2xl:rounded-[30px] mb:-translate-x-2 mb:translate-y-2 transition-all duration-1000 ease-out"></div>
          <div
            className={`${styles.standard} transition-all duration-1000 ease-out hover:shadow-2xl hover:shadow-purple-200`}
          >
            <h2 className="bg-[#646493] 2xl:text-5xl text-center xl:text-4xl text-white font-bold py-[28px] mb:text-base lg:text-3xl transition-all duration-500 ease-out">
              Standard
            </h2>

            <div className="mx-auto py-8">
              <div className="flex items-center gap-4 mx-auto h-fit justify-center">
                <h1 className="transition-all duration-700 ease-out hover:scale-110">$140</h1>
                <span className={`${styles.startat} transition-all duration-500 ease-out`}>
                  <span className="text-[#ab87ff]">Starting at</span>
                  <span className="text-[#8653ff] font-medium">per month</span>
                </span>
              </div>

              <div className="text-center flex-grow flex flex-col justify-between leading-none mt-2 pb-6">
                <p
                  className={`${styles.sessionsmonth} text-customBlue font-medium transition-all duration-500 ease-out`}
                >
                  4 Sessions a month
                </p>

                <div className="mt-8 flex flex-col items-start gap-4 leading-none max-w-[385px] w-full mx-auto">
                  <p
                    className={`${styles.items} text-[#584A91] leading-none transition-all duration-500 ease-out hover:text-[#8653ff]`}
                  >
                    <span className="font-bold">Session duration:&nbsp;</span> 60 minutes
                  </p>
                  <p
                    className={`text-[#584A91] leading-none flex ${styles.items} transition-all duration-500 ease-out hover:text-[#8653ff]`}
                  >
                    <span className="font-bold">Membership duration:&nbsp;</span>{' '}
                    <span className="flex gap-2">
                      <span>&nbsp;Flexible</span>
                      <span className="relative group inline-block">
                        <Info className="text-[#8653ff] font-bold w-4 transition-all duration-300 ease-out group-hover:scale-110 info-icon" />
                        <span className="absolute -translate-x-[78%] sm:-translate-x-[87%] custom-xl:-translate-x-[78%] custom-2xl:-translate-x-[86%] origin-bottom-right bottom-[18px] mb-2 w-[200px] sm:w-[250px] custom-xl:w-[326px] text-start !bg-[#9c78f9] text-white text-sm sm:text-base custom-xl:text-lg !leading-tight font-medium px-3 sm:px-[19px] py-3 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.6)] scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out pointer-events-none">
                          Choose between a month-to-month plan, a 4-month option, or a 9-month
                          commitment. Longer durations mean more savings while enjoying full
                          flexibility!
                        </span>
                      </span>
                    </span>
                  </p>
                  <p
                    className={`text-[#584A91] ${styles.items} transition-all duration-500 ease-out hover:text-[#8653ff]`}
                  >
                    <span className="font-bold">Average cost per session:&nbsp;</span> $40.78
                  </p>
                </div>

                <div className="mt-11 pt-1">
                  <span
                    onClick={(e: any) => {
                      e.preventDefault();
                      localStorage.setItem('activeSidebarItem', 'My Sessions');
                      localStorage.setItem('activeTab', 'trial');
                      router.push('/SignupAs');
                    }}
                  >
                    <button className="text-[34px] font-extrabold text-white border-none focus:outline-none rounded-full mb:px-8 mb:py-4 mb:text-base text-sm 2xl:text-[25px] uppercase xl:text-lg py-[25px] px-12 transition-all duration-500 hover:scale-x-[1.04] hover:scale-y-105 hover:bg-[#8653ff] bg-[#ab87ff] lg:py-4 lg:px-5 lg:text-xl hover:shadow-lg hover:shadow-purple-300 transform hover:-translate-y-1">
                      BOOK A FREE Session
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Card */}
        <div
          ref={premiumRef}
          className={`relative w-full max-w-[494px] max-h-[641.68px] h-full flex flex-col mb:max-w-full transition-all duration-1000 ease-out transform ${
            isPremiumVisible
              ? 'opacity-100 translate-y-0 scale-100 rotate-0'
              : 'opacity-0 translate-y-20 scale-95 -rotate-2'
          }`}
        >
          <div className="absolute inset-0 transform translate-y-7 bg-[#cfccde] rounded-[30px] mb:translate-y-2 transition-all duration-1000 ease-out"></div>
          <div
            className={`${styles.premium} relative bg-white rounded-[30px] overflow-hidden border-[#5553c4] border-4 flex flex-col min-h-full transition-all duration-1000 ease-out hover:shadow-2xl hover:shadow-purple-200 hover:border-[#8653ff]`}
          >
            <h2 className="bg-[#5553c4] 2xl:text-5xl text-center xl:text-4xl text-white font-bold py-[29px] mb:text-base lg:text-3xl transition-all duration-500 ease-out">
              Premium
            </h2>

            <div className="mx-auto py-8">
              <div className="flex items-center justify-center gap-4 mx-auto h-fit">
                <h1 className="transition-all duration-700 ease-out hover:scale-110">$272</h1>
                <span className={`${styles.startat} transition-all duration-500 ease-out`}>
                  <span className="text-[#ab87ff]">Starting at</span>
                  <span className="text-[#8653ff] font-medium">per month</span>
                </span>
              </div>

              <div className="text-center flex-grow flex flex-col justify-between leading-none mt-2 pb-6">
                <p
                  className={`${styles.sessionsmonth} text-customBlue font-medium transition-all duration-500 ease-out`}
                >
                  8 Sessions a month
                </p>

                <div className="mt-9 flex flex-col items-start gap-4 leading-none max-w-[376px] w-full mx-auto">
                  <p
                    className={`${styles.items} text-[#584A91] leading-none transition-all duration-500 ease-out hover:text-[#8653ff]`}
                  >
                    <span className="font-bold">Session duration:</span> 60 minutes
                  </p>
                  <p
                    className={`text-[#584A91] leading-none flex ${styles.items} transition-all duration-500 ease-out hover:text-[#8653ff]`}
                  >
                    <span className="font-bold">Membership duration:</span>{' '}
                    <span className="flex gap-2">
                      <span>&nbsp;Flexible</span>
                      <span className="relative group inline-block">
                        <Info className="text-[#8653ff] font-bold w-4 transition-all duration-300 ease-out group-hover:scale-110 info-icon" />
                        <span className="absolute -translate-x-[78%] sm:-translate-x-[87%] custom-xl:-translate-x-[78%] custom-2xl:-translate-x-[86%] origin-bottom-right bottom-[18px] mb-2 w-[200px] sm:w-[250px] custom-xl:w-[326px] text-start !bg-[#9c78f9] text-white text-sm sm:text-base custom-xl:text-lg !leading-tight font-medium px-3 sm:px-[19px] py-3 rounded-xl shadow-[0px_0px_10px_rgba(0,0,0,0.6)] scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out pointer-events-none">
                          Choose between a month-to-month plan, a 4-month option, or a 9-month
                          commitment. Longer durations mean more savings while enjoying full
                          flexibility!
                        </span>
                      </span>
                    </span>
                  </p>
                  <p
                    className={`text-[#584A91] ${styles.items} transition-all duration-500 ease-out hover:text-[#8653ff]`}
                  >
                    <span className="font-bold">Average cost per session:</span> $39.78
                  </p>
                </div>

                <div className="mt-12 pt-1">
                  <span
                    className="hidden 2xl:block"
                    onClick={(e: any) => {
                      e.preventDefault();
                      localStorage.setItem('activeSidebarItem', 'My Sessions');
                      localStorage.setItem('activeTab', 'trial');
                      router.push('/SignupAs');
                    }}
                  >
                    <Button
                      className="text-sm 2xl:text-[27.13px] uppercase xl:text-lg text-black w-[356px] !py-7 !bg-[#ab87ff] lg:p-3 lg:text-xl transition-all duration-500 hover:scale-x-[1.04] hover:scale-y-105 hover:!bg-[#8653ff] hover:shadow-lg hover:shadow-purple-300 transform hover:-translate-y-1"
                      btnName="BOOK A FREE Session"
                    />
                  </span>
                  <span
                    className="block 2xl:hidden"
                    onClick={(e: any) => {
                      e.preventDefault();
                      localStorage.setItem('activeSidebarItem', 'My Sessions');
                      localStorage.setItem('activeTab', 'trial');
                      router.push('/SignupAs');
                    }}
                  >
                    <button className="text-[34px] border font-extrabold text-white border-none focus:outline-none rounded-full mb:px-8 mb:py-4 mb:text-base text-sm 2xl:text-[25px] uppercase xl:text-lg py-6 px-10 hover:scale-x-[1.04] hover:scale-y-105 hover:bg-[#8653ff] transition-all duration-300 bg-[#ab87ff] lg:py-4 lg:px-5 lg:text-xl hover:shadow-lg hover:shadow-purple-300 transform hover:-translate-y-1">
                      BOOK A FREE Session
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pay as you go Card */}
        <div
          ref={payAsYouGoRef}
          className={`top-5 relative w-full max-w-[462px] max-h-[600.97px] h-full flex flex-col mb:max-w-full transition-all duration-1000 ease-out transform ${
            isPayAsYouGoVisible
              ? 'opacity-100 translate-y-0 scale-100 rotate-0'
              : 'opacity-0 translate-y-20 scale-95 rotate-2'
          }`}
        >
          <div className="absolute inset-0 transform translate-x-4 translate-y-5 bg-[#CFCCDD] rounded-3xl custom-2xl:rounded-[30px] mb:translate-y-2 mb:translate-x-2 transition-all duration-1000 ease-out"></div>
          <div
            className={`${styles.payasyougo} relative bg-white rounded-[30px] overflow-hidden border-[#646493] border-2 flex flex-col min-h-full transition-all duration-1000 ease-out hover:shadow-2xl hover:shadow-purple-200 hover:border-[#8653ff]`}
          >
            <h2 className="bg-[#646493] capitalize 2xl:text-5xl text-center xl:text-4xl text-white font-bold py-[28px] mb:text-base lg:text-3xl transition-all duration-500 ease-out">
              Pay as you go
            </h2>
            <div className="mx-auto py-8 px-3">
              <h1 className="mt-6 text-customBlue text-center flex items-center justify-center gap-2 font-bold transition-all duration-700 ease-out hover:scale-110">
                Free Package
              </h1>

              <div className="mx-auto">
                <p
                  className={`${styles.desc} text-darkBlue max-w-[22rem] mx-auto leading-tight 2xl:leading-8 2xl:py-5 xl:mt-6 mt-5 text-center font-medium lg:mt-2 transition-all duration-500 ease-out hover:text-[#8653ff]`}
                >
                  Book an eTutor at any time, paying only the fees listed for each session. No
                  upfront costs or subscription fees
                </p>
                <p
                  className={`${styles.desc2} text-[#887CC4] max-w-[16rem] mx-auto text-center lg:mt-2 mt-0 2xl:!leading-tight transition-all duration-500 ease-out hover:text-[#8653ff]`}
                >
                  Ideal for upcoming exams and quick revisions.
                </p>
                <p className="text-[#584A91] max-w-[18rem] mx-auto text-base 2xl:text-[22px] 2xl:leading-tight lg:text-xs my-9 text-center font-medium mb:text-xs lg:my-6 transition-all duration-500 ease-out">
                  <Link
                    href="mailto:contact@etutor4me.com"
                    className="text-customBlue underline font-normal transition-all duration-300 ease-out hover:text-[#8653ff] hover:scale-105"
                  >
                    Contact us
                  </Link>{' '}
                  for a personalized one with a discount
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
