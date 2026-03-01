"use client";

import React, { useMemo, useState } from "react";
import styles from "./DashboardGrid.module.css";
import Image from "next/image";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { BookingRequest } from "./profile/components/Data";
import lightcalender from "../../../public/lightcalendar.svg";
import sessionicongray from "../../../public/compltedsessionsicon gray.svg";
import refergray from "../../../public/grayrefer.svg";
import chaticon from "../../../public/chaticon.svg";
import chat from "../../../public/chat.svg";

import adminlogo from "../../../public/etutuorAdminLogo.svg";
import logo from "../../../public/etutorlogo.svg";
import bell from "../../../public/bellicon.svg";
import dark from "../../../public/darkicon.svg";
import etokiicon from "../../../public/etokiIcon.svg";
import EPlusIcon from "../../../public/Plus circle.svg";
import earningsinactive from "../../../public/earnings inactive.svg";
import translate from "../../../public/translateicon.svg";
import { useEtokies } from "../admin/hooks/useEtokies";

import level1 from "../../../public/level-1.svg";
import level2 from "../../../public/level-2.svg";
import level3 from "../../../public/level-3.svg";
import level4 from "../../../public/level-4.svg";
import level5 from "../../../public/level-5.svg";
import level6 from "../../../public/level-6.svg";
import level7 from "../../../public/level-7.svg";
import level8 from "../../../public/level-8.svg";
import level9 from "../../../public/level-9.svg";
import level10 from "../../../public/level-10.svg";

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  details: {
    user: { _id: string };
    contactInformation: { firstName: string };
  };
  lastMessage?: {
    content: string;
    senderId: string;
    timestamp: string;
  };
}
interface DashboardGridprops {
  sessionData: BookingRequest[];
  setActiveSidebarItem: (value: string) => void;
  isLargeScreen: boolean;
  eTokis: number;
  level: number;
  progressPercent: any;
  recievedmessages: Message[]
}
const DashboardGrid = ({
  sessionData,
  setActiveSidebarItem,
  isLargeScreen,
  eTokis,
  level,
  progressPercent,
  recievedmessages,
}: DashboardGridprops) => {
  const { etokies, isLoadingetokies, erroretokies } = useEtokies();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'month' or 'week'
  const [popup, setPopup] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const weeks = eachWeekOfInterval(
    { start: monthStart, end: monthEnd },
    { weekStartsOn: 1 } // Monday as week start
  );
  // Filter sessions based on states
  const filteredSessions = useMemo(() => {
    return sessionData;
  }, [sessionData]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Add previous month days to start from Sunday
    const firstDay = startOfWeek(start);
    const preDays = eachDayOfInterval({ start: firstDay, end: start });

    return [...preDays.slice(0, -1), ...days];
  }, [currentDate]);
  const getSessionForDate = (date: Date): BookingRequest | undefined => {
    return filteredSessions
      .filter((session: BookingRequest) => !session.meetingCompleted)
      .find((session) => isSameDay(new Date(session.date), date));
  };
  return (
    <>
      <div
        className={`custom-2xl:w-full max-w-[66rem] mb-4  mt-12 sm:mt-0 flex flex-col gap-4   custom-lg:flex-row custom-lg:gap-11   items-start  ${styles.dashboardTopbox}      `}
      >
        {/* 1 */}
        <div
          className={` ${styles.firstcard} flex flex-col space-y-2 pb-3 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-2xl:w-[18rem] bg-[#EDE8FA]`}
        >
          <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 pr-6 py-[10px] bg-[#ffffff84]">
            <div className="text-3xl font-bold text-[#685AAD] truncate">
              {eTokis}
            </div>
            <div className=" flex items-center justify-center">
              <Image
                loading="lazy"
                src={etokiicon}
                alt=""
                className="w-9 h-9"
              />
            </div>
          </div>

          <div className=" mx-auto">
            <button
              onClick={() => {
                setActiveSidebarItem("Refer your Friends");
              }}
              className="flex-1 bg-[#685AAD] text-white py-[3px] px-10  rounded-lg text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
            >
              <Image
                loading="lazy"
                src={EPlusIcon}
                alt=""
                className="w-5 h-5 hover:cursor-pointer"
              />{" "}
              etokis
            </button>
          </div>
        </div>
        {/* 2 */}
        <div
          className={` ${styles.secondcard} flex flex-col space-y-2 pb-2 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-2xl:w-[18rem] bg-[#EDE8FA]`}
        >
          <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 py-[10px] bg-[#ffffff84]">
            <div className="text-3xl font-bold text-[#685AAD] truncate max-w-[12rem]">
              {/* {earnedThisMonthEtokis} */}
              {erroretokies
                ? "0"
                : isLoadingetokies
                  ? "loading..."
                  : etokies
                    ?.filter(
                      (etokie: any) =>
                        new Date(etokie.createdAt).getMonth() ===
                        new Date().getMonth() &&
                        new Date(etokie.createdAt).getFullYear() ===
                        new Date().getFullYear()
                    )
                    .reduce((sum: any, etokie: any) => sum + etokie.amount, 0)}
            </div>
            <div className=" flex items-center justify-center">
              <Image
                loading="lazy"
                src={earningsinactive}
                alt=""
                className="w-6 h-6"
              />
            </div>
          </div>

          <div className=" mx-auto">
            <p className="text-[#685AAD] text-lg font-medium">
              Earned This month
            </p>
          </div>
        </div>
        {/* 3 */}
        <div
          className={`${styles.thirdcard} flex  gap-5 items-center pb-1 pt-3 px-6  bg-purple-100  rounded-3xl w-full ${isLargeScreen ? "max-w-[23rem]" : "w-full "
            } bg-[#EDE8FA]`}
        >
          <div className="level h-[103px]">
            <Image
              loading="lazy"
              src={
                level == 1
                  ? level1
                  : level == 2
                    ? level2
                    : level == 3
                      ? level3
                      : level == 4
                        ? level4
                        : level == 5
                          ? level5
                          : level == 6
                            ? level6
                            : level == 7
                              ? level7
                              : level == 8
                                ? level8
                                : level == 9
                                  ? level9
                                  : level == 10
                                    ? level10
                                    : level1
              }
              alt=""
              className=" h-full "
            />
          </div>
          <div className="content flex flex-col w-full">
            <p className="text-[#685AAD]  text-lg font-bold"> eTokis</p>
            <p className="text-[#685AAD]  text-lg font-medium ">
              {level == 10 ? (
                <span>All Level Completed!</span>
              ) : (
                <span>Left for level {level + 1}</span>
              )}
            </p>
            <div className="w-full bg-white h-2 rounded-full mt-2">
              <div
                className={`w-[${Number(
                  progressPercent.progressPercentage
                )}%] h-full bg-[#9252FF] rounded-full`}
                style={{
                  width: `${Number(progressPercent.progressPercentage) || 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>


      <div className={styles.gridContainer}>
        <div className={`${styles.todaysSchedule} px-[26px] py-4 rounded-2xl`}>
          <div className="flex  justify-between items-center px-1">
            <h1 className="font-bold text-[25px] text-[#685AAD]">
              TODAY’S SCHEDULE
            </h1>
            <Image
              loading="lazy"
              src={lightcalender}
              alt=""
              className="w-[26.5px] h-[26.5px]"
            />
          </div>

          <div className="flex flex-col gap-6 mt-[29px] overflow-y-auto overflow-hidden scrollbar-none h-[92%]">
            {sessionData.length > 0 &&
              sessionData.filter(
                (request) =>
                  request.status === "accepted" &&
                  request.meetingCompleted === false
              ).length !== 0 ? (
              <>
                {sessionData
                  .filter(
                    (request) =>
                      request.status === "accepted" &&
                      request.meetingCompleted === false
                  )
                  .map((request) => {
                    return (
                      <div
                        key={request._id}
                        className="bg-[#A296CC] rounded-xl px-8 py-[15px] flex justify-between items-center max-h-[88.5px] "
                      >
                        <div className="pl-2.5">
                          <h1 className="font-bold text-white text-[23px] leading-[1.75rem]">
                            {request.subjects || ""}
                          </h1>
                          <p className=" text-white text-[21px] leading-[1.75rem]">
                            {request?.studentdetails?.firstName ||
                              "Your Student"}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <button className="text-white bg-[#685AAD] rounded-md px-[7px] py-0.5 text-[17px]">
                            Edit Session
                          </button>
                          <a href={request?.startLink || "#"} target="_blank">
                            <button className="text-white bg-[#8653FF] rounded-md px-[7px] py-0.5 text-[17px]">
                              Meeting Link
                            </button>
                          </a>
                        </div>
                      </div>
                    );
                  })}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={`${styles.calendar} px-[26px] py-4 rounded-2xl overflow-y-auto scrollbar-none`}
        >
          <div className="flex  justify-between items-center px-1">
            <h1 className="font-bold   text-[33.22px] text-[#685AAD] ">
              {currentDate.toLocaleString("default", {
                month: "short",
              })}{" "}
              {currentDate.getFullYear()}
            </h1>
            <Image
              loading="lazy"
              src={lightcalender}
              alt=""
              className="w-[26.5px] h-[26.5px]"
            />
          </div>

          <div className="calendar bg-[#EDE8FA] w-full rounded-xl custom-2xl:rounded-3xl  py-4 custom-2xl:py-4  ">
            <div className="grid grid-cols-7 gap-1 sm:gap-3 custom-2xl:gap-x-5 custom-2xl:gap-y-2  text-center place-content-center ">
              {/* Week day headers */}
              {view === "month" &&
                ["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <span
                    key={day}
                    className="text-center text-[#6F697D]  flex items-center justify-center     text-sm sm:text-xl custom-2xl:text-2xl   "
                  >
                    {day}
                  </span>
                ))}

              {/* Calendar days */}

              {calendarDays.map((day, index) => {
                const session2 = getSessionForDate(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                return (
                  <div
                    onMouseEnter={() => {
                      setPopup(day);
                    }}
                    onMouseLeave={() => {
                      setPopup(null);
                    }}
                    key={index}
                    className={`flex items-center justify-center rounded-full  relative   custom-xl:rounded-full  text-center  mx-auto mt-3  ${session2 && session2.status === "accepted"
                      ? "bg-[#8558f9] text-white"
                      : session2?.status === "pending"
                        ? "bg-[#4ddfea] text-white"
                        : session2?.status === "rejected"
                          ? "bg-[#ff9580] text-white"
                          : "bg-transparent"
                      }  ${isCurrentMonth ? "text-[#685BAB]" : "text-[#6F697D]"
                      }  `}
                  >
                    <span
                      className={`text-sm sm:text-xl custom-2xl:text-2xl flex items-center justify-center  text-center  h-8 sm:h-[52px] w-8 sm:w-[52px]  `}
                    >
                      {format(day, "d")}
                    </span>

                    {session2 && (
                      <>
                        {popup === day && (
                          <div
                            className={`${session2.status === "accepted"
                              ? "bg-[#8558f9]"
                              : session2.status === "pending"
                                ? "bg-[#4ddfea]"
                                : "bg-[#ff9580]"
                              } text-white p-4  min-h-28 w-36  py-2 flex  items-start absolute  top-14  custom-2xl:top-14   left-1/2 transform -translate-x-1/2  z-50 rounded-3xl transition-all duration-300 `}
                          >
                            <div className="space-y-1 w-full">
                              <div className="text-2xl font-semibold border-b border-white">
                                Session
                              </div>
                              <div className="text-xl">{session2.subjects}</div>
                              <div className="text-lg">{session2.time}</div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={`${styles.completedSessions} px-[24px] py-6 rounded-2xl`}
        >
          <div className="flex  justify-between items-center">
            <h1 className="font-bold text-[25px] leading-[1.75rem] uppercase text-[#685AAD]">
              completed sessions
            </h1>
            <Image
              loading="lazy"
              src={sessionicongray}
              alt=""
              className="w-[25.5px] h-[25.5px]"
            />
          </div>

          <div className="mt-6 h-[90%] overflow-y-auto scrollbar-none ">
            {sessionData.length > 0 &&
              sessionData.filter(
                (request) =>
                  request.status === "accepted" &&
                  request.meetingCompleted === true
              ).length !== 0 ? (
              <>
                {sessionData
                  .filter(
                    (request) =>
                      request.status === "accepted" &&
                      request.meetingCompleted === true
                  )
                  .map((request) => {
                    return (
                      <div
                        key={request._id}
                        className="flex justify-between items-start border-b-2 border-[#8b55ff39] py-[18px]  px-1"
                      >
                        <div className="flex flex-col  ">
                          <h3 className="text-[#8653FF] text-lg leading-tight">
                            {request?.studentdetails?.firstName}
                          </h3>
                          <div className="flex justify-between gap-x-10 text-[#685aad] text-[17px] leading-tight   ">
                            <span className="">Date</span>
                            <span className="">
                              <span className="">
                                {new Date(request.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              setActiveSidebarItem("Session overview");
                            }}
                            className="bg-[#8653FF] text-white px-[24px] py-[3px] rounded-md text-lg mt-[1px] "
                          >
                            View
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={`${styles.referFriends} px-[25px] py-4 rounded-2xl flex flex-col justify-between overflow-y-auto scrollbar-none`}
        >
          <div className="flex  justify-between items-center ">
            <h1 className="font-bold text-[25px] text-[#685AAD] uppercase">
              Prefer your friends
            </h1>
            <Image
              loading="lazy"
              src={refergray}
              alt=""
              className="w-[22.2px] h-[22.2px]"
            />
          </div>

          <div>
            <p className="text-base text-[#8653FF] font-bold">
              Refer your friends, get eTokis to spend{" "}
            </p>
            <p className="text-sm text-[#685AAD] font-normal">
              Get 10 eTokis for each student and 5 eTokis for each tutor you
              successfully refer.
            </p>
          </div>
        </div>

        <div className={`${styles.support} px-[26px] py-4 rounded-2xl flex flex-col justify-between`}
        >
          <div className="flex  justify-between items-center px-1">
            <h1 className="font-bold text-[25px] text-[#685AAD]">
              24H SUPPORT
            </h1>
            <Image
              loading="lazy"
              src={chaticon}
              alt=""
              className="w-[25.4px] h-[25.4px]"
            />
          </div>

          <div className=" px-2">
            <div className="flex flex-col">
              <span className="text-[#685AAD] text-base">Need help?</span>
              <span className="text-[#685AAD] text-base">Contact us.</span>
            </div>
          </div>
        </div>

        <div className={`${styles.trialSession} px-[26px] py-4 rounded-2xl flex flex-col justify-between`}
        >
          <div className="flex  flex-col">
            <h1 className="uppercase font-bold text-[25px] text-[#685AAD]">
              Trial Session
            </h1>
            <p className="text-base font-medium text-[#A096C8]">
              You have a new trial session request
            </p>
            {/* <Image  loading="lazy"  src={bellgray} alt="" className="w-4 h-4" /> */}
          </div>
          <div className="w-full flex justify-between">
            <p className="name font-medium text-[#646493] text-xl">Name</p>
            <div className="btns flex gap-3">
              <button className="bg-[#7565A4] px-5 py-1 rounded-full text-white text-lg">
                Deny
              </button>
              <button className="bg-[#8358F7] px-5 py-1 rounded-full text-white text-lg">
                Accept
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.chatBox} px-[26px] py-4 rounded-2xl flex flex-col justify-between`}
        >
          <div className="flex  justify-between items-center px-1">
            <h1 className="font-bold text-[25px] text-[#685AAD]">CHAT</h1>
            <Image
              loading="lazy"
              src={chat}
              alt=""
              className="w-[18px] h-[18px]"
            />
          </div>

          <div className="overflow-y-auto  h-[92%] scrollbar-none">
            {recievedmessages.map((message: any, index: any) => (
              <div key={index} className="border-b-2 border-[#8b55ff39] py-2 ">
                <h1 className="text-[19.89px] text-[#685AAD]">{message?.details?.firstName}</h1>
                <p className="text-[14.89px] text-[#685AAD80]">
                  {message?.lastMessage?.content?.length > 30
                    ? message.lastMessage.content.slice(0, 34) + "..."
                    : message?.lastMessage?.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardGrid;

// <div
//       className={`custom-2xl:w-full max-w-[66rem] ${
//         isLargeScreen ? "flex-row gap-11" : "flex-col gap-4"
//       } flex  items-start    absolute top-14 custom-lg:top-0 mt-4  `}
//     >
//       {/* 1 */}
//       <div
//         className={` flex flex-col space-y-2 pb-3 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-2xl:w-[18rem] bg-[#EDE8FA]`}
//       >
//         <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 pr-6 py-[10px] bg-[#ffffff84]">
//           <div className="text-3xl font-bold text-[#685AAD] truncate">
//             {eTokis}
//           </div>
//           <div className=" flex items-center justify-center">
//             <Image
//               loading="lazy"
//               src={etokiicon}
//               alt=""
//               className="w-9 h-9"
//             />
//           </div>
//         </div>

//         <div className=" mx-auto">
//           <button
//             onClick={() => {
//               setActiveSidebarItem("Refer your Friends");
//             }}
//             className="flex-1 bg-[#685AAD] text-white py-[3px] px-10  rounded-lg text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
//           >
//             <Image
//               loading="lazy"
//               src={EPlusIcon}
//               alt=""
//               className="w-5 h-5 hover:cursor-pointer"
//             />{" "}
//             etokis
//           </button>
//         </div>
//       </div>
//       {/* 2 */}
//       <div
//         className={` flex flex-col space-y-2 pb-2 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-2xl:w-[18rem] bg-[#EDE8FA]`}
//       >
//         <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 py-[10px] bg-[#ffffff84]">
//           <div className="text-3xl font-bold text-[#685AAD] truncate max-w-[12rem]">
//             {/* {earnedThisMonthEtokis} */}
//             {erroretokies
//               ? "0"
//               : isLoadingetokies
//               ? "loading..."
//               : etokies
//                   ?.filter(
//                     (etokie: any) =>
//                       new Date(etokie.createdAt).getMonth() ===
//                         new Date().getMonth() &&
//                       new Date(etokie.createdAt).getFullYear() ===
//                         new Date().getFullYear()
//                   )
//                   .reduce((sum: any, etokie: any) => sum + etokie.amount, 0)}
//           </div>
//           <div className=" flex items-center justify-center">
//             <Image
//               loading="lazy"
//               src={earningsinactive}
//               alt=""
//               className="w-6 h-6"
//             />
//           </div>
//         </div>

//         <div className=" mx-auto">
//           <p className="text-[#685AAD] text-lg font-medium">
//             Earned This month
//           </p>
//         </div>
//       </div>
//       {/* 3 */}
//       <div
//         className={`flex  gap-5 items-center pb-1 pt-3 px-6  bg-purple-100  rounded-3xl w-full ${
//           isLargeScreen ? "max-w-[23rem]" : "max-w-[18rem]"
//         } bg-[#EDE8FA]`}
//       >
//         <div className="level h-[103px]">
//           <Image
//             loading="lazy"
//             src={
//               level == 1
//                 ? level1
//                 : level == 2
//                 ? level2
//                 : level == 3
//                 ? level3
//                 : level == 4
//                 ? level4
//                 : level == 5
//                 ? level5
//                 : level == 6
//                 ? level6
//                 : level == 7
//                 ? level7
//                 : level == 8
//                 ? level8
//                 : level == 9
//                 ? level9
//                 : level == 10
//                 ? level10
//                 : level1
//             }
//             alt=""
//             className=" h-full "
//           />
//         </div>
//         <div className="content flex flex-col w-full">
//           <p className="text-[#685AAD]  text-lg font-bold"> eTokis</p>
//           <p className="text-[#685AAD]  text-lg font-medium ">
//             {level == 10 ? (
//               <span>All Level Completed!</span>
//             ) : (
//               <span>Left for level {level + 1}</span>
//             )}
//           </p>
//           <div className="w-full bg-white h-2 rounded-full mt-2">
//             <div
//               className={`w-[${Number(
//                 progressPercent.progressPercentage
//               )}%] h-full bg-[#9252FF] rounded-full`}
//               style={{
//                 width: `${Number(progressPercent.progressPercentage) || 0}%`,
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div
//       className={`block   ${
//         isLargeScreen ? "mb-16" : "mb-[390px] custom-lg:mb-[300px]"
//       } `}
//     >
//       &nbsp;
//     </div>
