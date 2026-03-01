"use client";
import React, { useEffect, useState } from "react";
import etokibundle from "../../../../public/etokis bundle icon.svg";
import FolderCoinicon from "../../../../public/FolderCoinIcons.svg";
import Downloadicon from "../../../../public/DownloadICON.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEtokies } from "@/app/admin/hooks/useEtokies";


interface earningprops {
  teacher: any

}
const TutoringDashboard = ({ teacher }: earningprops) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Online tutoring");
  const [currentmonthperc, setCurrentmonthperc] = useState(0)
  const [Totalregularsession, setTotalregularsession] = useState(0)
  const { etokies, isLoadingetokies, erroretokies } = useEtokies();

  useEffect(() => {
    // Calculate the percentage of regular sessions relative to group sessions
    if (teacher?.TotalGroupSession > 0) {
      // const percentage = (teacher.TotalRegularSession / teacher.TotalGroupSession) * 100;
      setTotalregularsession(Math.min((teacher?.TotalRegularSession / (teacher?.TotalRegularSession + teacher?.TotalGroupSession)) * 100, 90));
    }
  }, [activeTab]);
  useEffect(() => {



    // setTotalregularsession(((teacher.TotalRegularSession/teacher.TotalGroupSession)*100).toString())
    setCurrentmonthperc(Math.min((teacher?.currentMonthRegularSession / (teacher?.currentMonthRegularSession + teacher?.currentMonthGroupSession)) * 100, 90));
  }, [activeTab])



  const tabs = [
    "Online tutoring",
    "eTokis overview",
    "Previous sessions",
    "Earnings PDFs",
    "Additional information",
  ];

  return (
    <div
      className={`w-full  mx-auto   ${(activeTab === "Online tutoring" || activeTab === "Earnings PDFs") &&
        "mt-24"
        } ${(activeTab === "eTokis overview" ||
          activeTab === "Previous sessions" ||
          activeTab === "Additional information") &&
        "-mt-1"
        } `}
    >
      {/* Tax Information Alert */}

      {activeTab === "Online tutoring" && (
        <div className="bg-[#B4A5D7] rounded-[33px] px-11 pb-[34px] pt-[30px] mb-11">
          <h2 className="text-white text-[30px] leading-[2.25rem] font-semibold mb-4">
            Your tax information is missing. Fill it in to guarantee regular
            payouts.
          </h2>
          <p className="text-white text-[22px] leading-[1.6rem] font-normal mb-3">
            As a legal requirement, we need to collect your tax information. If
            we don&apos;t receive it, we will suspend your payouts and account
            until you provide it. <br />
            Fill the tax information section of your Profile as soon as possible
            to keep your payouts regular.
          </p>
          <a href="#" className=" text-[22px] leading-[1.6rem] font-bold text-[#685AAD] ">
            <span
              onClick={() => {
                localStorage.setItem('active', "Tax Information")
                router.push('/etutor/profile')
              }}
              className="underline text-[#9052FC]"> Click here</span> to
            Fill in tax information now
          </a>
        </div>
      )}
      {activeTab === "Earnings PDFs" && (
        <div className="bg-[#B4A5D7] rounded-[33px] px-11 py-[30px] mb-10">
          <h2 className="text-white text-[30px] leading-[2.25rem] font-bold mb-4">
            Your tax information is missing. Fill it in to guarantee regular
            payouts.
          </h2>
          <p className="text-white text-[22px] leading-[1.75rem] font-normal mb-2">
            As a legal requirement, we need to collect your tax information. If
            we don&apos;t receive it, we will suspend your payouts and account until
            you provide it. <br />
            Fill the tax information section of your Profile as soon as possible
            to keep your payouts regular.
          </p>
          <a href="#" className=" text-[22px] leading-[1.75rem] font-bold text-[#685AAD]">
            <span className="underline text-[#9052FC]"> Click here</span> to
            Fill in tax information now
          </a>
        </div>
      )}

      {/* Main Dashboard */}
      <div
        className={`bg-[#EDE8FA] rounded-[35px]  ${activeTab === "Previous sessions" || activeTab === "Earnings PDFs"
          ? "px-6 custom-xl:px-[57px]"
          : "px-6 custom-xl:px-20"
          }  py-7`}
      >
        {/* Custom Tabs */}
        <div
          className={`flex   justify-between   text-xl  scrollbar-none overflow-x-scroll w-full gap-12 ${(activeTab === "Previous sessions" ||
            activeTab === "Earnings PDFs") &&
            "px-7 "
            } `}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-0.5 text-nowrap ${activeTab === tab
                ? "text-[#685AAD] border-b  border-[#9052FC] font-bold "
                : "text-[#685AAD] font-light"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Online Tutoring Content */}
        {activeTab === "Online tutoring" && (
          <div className="flex justify-between flex-wrap gap-8 md:gap-14 mt-8 md:mt-16 pb-6 md:pb-9 px-4 md:px-0">
            <div className="flex flex-col w-full sm:w-[22.5rem] py-2 text-[#685AAD]">
              {/* top headings */}
              <div className="text-lg md:text-xl font-bold flex justify-between w-full">
                <span>Current month</span>
                <span>{erroretokies ? "0" : (isLoadingetokies ? "loading..." : (etokies?.filter((etokie: any) => new Date(etokie.createdAt).getMonth() === new Date().getMonth() && new Date(etokie.createdAt).getFullYear() === new Date().getFullYear()).reduce((sum: any, etokie: any) => sum + etokie.amount, 0))) || 0} eTokis</span>
              </div>
              {/* bottom normal heading */}
              <div className="text-base md:text-lg flex justify-between w-full mt-6 md:mt-8">
                <span>Last month</span>
                <span>{
                  erroretokies ? "0" : (isLoadingetokies ? "loading..." : (etokies?.filter((etokie: any) => {
                    const createdAt = new Date(etokie.createdAt);
                    const lastMonth = new Date();
                    lastMonth.setMonth(lastMonth.getMonth() - 1); // Set the month to the previous month
                    return createdAt.getMonth() === lastMonth.getMonth() && createdAt.getFullYear() === lastMonth.getFullYear();
                  }).reduce((sum: any, etokie: any) => sum + etokie.amount, 0)))
                    || 0} eTokis</span>
              </div>
              {/* progress bar */}
              <div className="bg-[#9052FC] w-full h-10 md:h-12 rounded-lg mt-3">
                <div style={{ width: `${currentmonthperc}%` }} className={`h-full  bg-[#FF7777] rounded-lg`}></div>
              </div>

              <div className="mt-4 flex justify-between flex-wrap sm:flex-nowrap gap-2">
                <div className="flex gap-2 md:gap-4 items-center">
                  <div className="h-6 w-6 md:h-7 md:w-7 bg-[#FF7777] rounded-md"></div>
                  <div className="text-base md:text-lg">Regular Sessions</div>
                </div>
                <div className="flex gap-2 md:gap-4 items-center">
                  <div className="h-6 w-6 md:h-7 md:w-7 bg-[#9052FC] rounded-md"></div>
                  <div className="text-base md:text-lg">Group Sessions</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full sm:w-[22.5rem] py-2 text-[#685AAD]">
              {/* top headings */}
              <div className="text-lg md:text-xl font-bold flex justify-between w-full">
                <span>Total</span>
                <span>{teacher?.user.etokis || 0} eTokis</span>
              </div>
              {/* bottom normal heading */}
              <div className="text-base md:text-lg flex justify-between w-full mt-6 md:mt-8">
                <span> &nbsp;</span>
                <span> &nbsp;</span>
              </div>
              {/* progress bar */}
              <div className="bg-[#9052FC] w-full h-10 md:h-12 rounded-lg mt-3">
                <div style={{ width: `${Totalregularsession}%` }} className="h-full  bg-[#FF7777] rounded-lg"></div>
              </div>

              <div className="mt-4 flex justify-between flex-wrap sm:flex-nowrap gap-2">
                <div className="flex gap-2 md:gap-4 items-center">
                  <div className="h-6 w-6 md:h-7 md:w-7 bg-[#FF7777] rounded-md"></div>
                  <div className="text-base md:text-lg">Regular Sessions</div>
                </div>
                <div className="flex gap-2 md:gap-4 items-center">
                  <div className="h-6 w-6 md:h-7 md:w-7 bg-[#9052FC] rounded-md"></div>
                  <div className="text-base md:text-lg">Group Sessions</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full sm:w-[22.5rem] p-4 md:p-6 bg-[#B4A5D7] text-white text-sm md:text-base rounded-xl">
              <div className="flex flex-col justify-between w-full gap-3 md:gap-4">
                <h1 className="text-[#685AAD] font-bold text-lg md:text-2xl">
                  Tutoring overview
                </h1>
                <div className="flex justify-between w-full">
                  <span>Regular sessions rate</span>
                  <span>20%</span>
                </div>
                <div className="flex justify-between w-full">
                  <span>Regular sessions rate</span>
                  <span>20%</span>
                </div>
                <div className="flex justify-between w-full">
                  <span>Regular sessions rate</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "eTokis overview" && (
          <div className="mt-12 md:mt-20">
            <div className="py-2 text-[#685AAD] px-4 md:px-0">
              <h1 className="text-2xl md:text-[45px] md:leading-[2.25rem] font-bold mb-7">
                Welcome to our eTokis prgrammes
              </h1>
              <p className="text-lg md:text-[22px] md:leading-[1.75rem]">
                Our eTokis programs are a way to say thank you for being a part
                of our eTutor community and for your constant commitment to
                helping us unlock
                <span className="hidden md:inline">
                  {" "}
                  <br />
                </span>
                the full potential of every child. through these programs you
                have the opportunity to access lump sum eTokis and session rate
                increases.
              </p>
            </div>

            <div className="w-full mt-8 md:mt-14 px-4 md:px-10 py-6 md:pt-[25px] md:pb-[30px] bg-[#B4A5D7] rounded-xl flex justify-between items-center flex-wrap gap-4">
              <Image loading="lazy"
                src={etokibundle}
                alt=""
                className="w-12 h-12 md:w-[65.48px] md:h-[65.48px]"
              />

              <div className="text-white w-full md:w-[87.7%] flex flex-col md:flex-row md:items-end md:justify-between gap-3 ">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-3">
                    Loyalty eTokis
                  </h1>
                  <p className="text-lg md:text-[22px] md:leading-[1.75rem]">
                    Complete a minimum of 150 sessions in six months to increase
                    your lesson rate.
                  </p>
                </div>
                <button className="text-xl md:text-2xl px-5 md:px-7 py-0 rounded-md bg-[#FF7777] w-fit">
                  Learn&nbsp;more
                </button>
              </div>
            </div>

            <div className="w-full mt-4 md:mt-8 mb-8 md:mb-16 px-4 md:px-10 py-6 md:py-[30px] bg-[#B4A5D7] rounded-xl flex justify-between items-center flex-wrap gap-4">
              <Image loading="lazy"
                src={etokibundle}
                alt=""
                className="w-12 h-12 md:w-[65.48px] md:h-[65.48px]"
              />

              <div className="text-white w-full md:w-[87.7%] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-3">
                    Referral bonus
                  </h1>
                  <p className="text-lg md:text-[22px] md:leading-[1.75rem]">
                    Share your referral link and receive a bonus for every new
                    tutor or student who joins
                    <span className="hidden md:inline">
                      {" "}
                      <br />
                    </span>
                    eTutor4me and teaches their first regular lesson.
                  </p>
                </div>
                <button className="text-xl md:text-2xl px-5 md:px-7 py-0 rounded-md bg-[#FF7777] w-fit">
                  Learn&nbsp;more
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Previous sessions" && (
          <div className="h-full">
            <div className="mt-[67px]  px-[24px]">
              <h1 className="text-[45px] leading-[2.5rem] font-bold mb-6 text-[#685AAD] ">
                Last sessions
              </h1>
              <p className="text-[22px] leading-[1.75rem] text-[#685AAD]">
                Here is the list of all your earnings from previous sessions.
              </p>
            </div>
            <div className=" mt-[60px] py-7 mb-7 px-3 md:px-9 rounded-3xl bg-[#B4A5D7] h-[618px]">
              <div className="text-sm sm:text-[22px] sm:leading-[1.75rem] px-3 md:px-6 w-full flex justify-between text-white">
                <span>Date & time</span>
                <span>Subjects</span>
                <span className="hidden custom-xl:block">Student username</span>
                <span>Earnings</span>
                <span>Status</span>
              </div>

              <div className="mt-2 sm:mt-11  h-full max-h-[500px]  flex flex-col gap-4 overflow-y-auto scrollbar-none">
                <div className="bg-[#7565A4] px-3 sm:px-6 flex  justify-between py-2 sm:py-4 text-white text-sm sm:text-2xl rounded-lg sm:rounded-xl">
                  <span>Date & time</span>
                  <span>Subjects</span>
                  <span className="hidden custom-xl:block">Student username</span>
                  <span>Earnings</span>
                  <span>Status</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Earnings PDFs" && (
          <div className="mt-9 text-white h-full min-h-[530px]  ">
            <div className="py-4 px-4 sm:px-10 bg-[#B4A5D7] rounded-xl flex justify-between items-center ">
              <div className="flex gap-2 sm:gap-6 custom-xl:gap-12 items-center">
                <Image loading="lazy" src={FolderCoinicon} alt="" className="w-8 sm:w-12 " />

                <span className=" text-sm sm:text-xl font-medium truncate">
                  02/05/2024 - 02/06/2024 Earnings.pdf
                </span>
              </div>
              <div>
                <Image loading="lazy" src={Downloadicon} alt="" className="w-7" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "Additional information" && (
          <div>
            <div className="mt-[68px] text-[#685AAD]">
              <h1 className="text-[45px] leading-[2.25rem] mb-8 font-bold">Regular session rates</h1>
              <p className="text-[22px] leading-[1.75rem] ">
                Here are the rates for each subject you’re qualified to tutor
                in. to view your exact payments for <br />
                completed sessions, check{"->"}previous sessions.
              </p>
            </div>

            <div className="bg-[#B4A5D7] mt-[75px] rounded-3xl px-8 py-6 max-w-full mb-16">
              <div className="flex justify-between pl-14 pr-24 text-[22px] leading-[1.75rem]  text-white">
                <span>Subject</span>
                <span>Tariff</span>
              </div>



              <div className="mt-5 flex flex-col gap-3 min-h-[407px]  overflow-y-auto scrollbar-none">
                <div className="flex justify-between pl-14 pr-24 text-[24px] leading-[1.75rem]  text-white bg-[#7565A4] py-4 rounded-xl">
                  <span>Subject</span>
                  <span>Tariff</span>
                </div>
                <div className="flex justify-between pl-14 pr-24 text-[24px] leading-[1.75rem]  text-white bg-[#7565A4] py-4 rounded-xl">
                  <span>Subject</span>
                  <span>Tariff</span>
                </div>
              </div>



            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutoringDashboard;
