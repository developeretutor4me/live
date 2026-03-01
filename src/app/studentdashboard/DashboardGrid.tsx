"use client";
import React from "react";
import Image from "next/image";
import etokiicon from "../../../public/etokiIcon.svg";
import EPlusIcon from "../../../public/Plus circle.svg";
import redeemIcon from "../../../public/redeem.svg";
import etokipopup from '../../../public/etokipopup.svg'
import lightcalender from "../../../public/lightcalendar.svg";
import sessionicongray from "../../../public/compltedsessionsicon gray.svg";
import chat2 from "../../../public/chat.svg";
import bellgray from "../../../public/bellicongrat.svg";
import chaticon from "../../../public/chaticon.svg";
import refergray from "../../../public/grayrefer.svg";
import { format, isSameMonth } from "date-fns";
import styles from "./DashboardGrid.module.css";


interface DashboardGridProps {
  isOpenNoti: boolean;
  etokies: any;
  setActiveSidebarItem: any;
  handleRedeem: any;
  setredeem: any;
  radeemLoading: any;
  redeem: any;
  setsessionleft: any;
  currentDate: any;
  view: any;
  calendarDays: any;
  getSessionForDate: any;
  setpopup: any;
  popup: any;
  sessionData: any;
  Setsetcomingvalue: any;
  recievedmessages: any;
  setchat: any;
  settutortomessage: any;
}
function DashboardGrid({
  isOpenNoti,
  etokies,
  setActiveSidebarItem,
  handleRedeem,
  setredeem,
  radeemLoading,
  redeem,
  setsessionleft,
  currentDate,
  view,
  calendarDays,
  getSessionForDate,
  setpopup,
  popup,
  sessionData,
  Setsetcomingvalue,
  recievedmessages,
  setchat,
  settutortomessage,
}: DashboardGridProps) {
  return (
    <>
      <div
        className={`absolute z-50 top-20 custom-2xl:top-28 mr-1 sm:mr-0 sm:right-[29px] duration-1000 transition-all ease-in-out ${isOpenNoti ? "translate-x-0" : "translate-x-[120%]"
          } `}
      >
        {/* <NotificationPage /> */}
      </div>
      {/* <Dashboard /> */}

      {/* top left box TOKIs */}
   

      <div className="mb-52 sm:mb-0  custom-2xl:mb-10 2xl:mb-[135px] text-transparent">
        a
      </div>

      <div className={styles.gridContainer}>
        {/* ------------calendar----------- */}
        <div
          className={`${styles.calendar} overflow-y-auto scrollbar-none  py-5 px-2 bg-[#EDE8FA] text-[#685AAD] rounded-2xl `}
        >
          <div className=" h-full">
            <div className="flex  justify-between items-center px-6">
              <h1 className="font-bold text-xl custom-2xl:text-[33.22px] leading-[2.25rem] ">
                {currentDate.toLocaleString("default", {
                  month: "short",
                })}{" "}
                {currentDate.getFullYear()}
              </h1>
              <Image
                loading="lazy"
                onClick={() => {
                  setActiveSidebarItem("Calendar");
                }}
                src={lightcalender}
                alt=""
                className="w-[26px] h-[26px] "
              />
            </div>

            <div className="calendar  bg-[#EDE8FA] w-full rounded-xl custom-2xl:rounded-3xl  py-4 custom-2xl:py-7 ">
              <div className="grid grid-cols-7 gap-1 sm:gap-3 custom-2xl:gap-5  text-center place-content-center px-3">
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

                {calendarDays.map((day:any, index:any) => {
                  const session2 = getSessionForDate(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  return (
                    <div
                      onMouseEnter={() => {
                        // @ts-ignore
                        setpopup(day);
                      }}
                      onMouseLeave={() => {
                        setpopup(null);
                      }}
                      key={index}
                      className={`flex items-center justify-center rounded-full  relative    custom-xl:rounded-full  text-center  mx-auto  ${session2 && session2.status === "accepted"
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
                                <div className="text-xl">
                                  {session2.subjects}
                                </div>
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
        </div>

        {/* -------------schedule------- */}
        <div
          className={` ${styles.schedule} bg-[#EDE8FA] text-[#685AAD] rounded-2xl px-[25px] py-5    scrollbar-none`}
        >
          <div className="flex  justify-between items-center px-0 pr-1">
            <h1 className="font-bold text-[23px] leading-[1.75rem]">
              THIS WEEK’S SCHEDULE
            </h1>
            <Image
              loading="lazy"
              src={lightcalender}
              alt=""
              className="w-[26px] h-[26px]"
            />
          </div>

          <div className="flex flex-col gap-[18px] mt-[21px] overflow-y-auto h-[90%] scrollbar-none">
            {sessionData
              .filter(
                (request:any) =>
                  request.status === "accepted" &&
                  request.meetingCompleted === false
              )
              .slice(0, 10)
              .map((request:any) => {
                return (
                  <div
                    key={request._id}
                    className="bg-[#A296CC] rounded-xl pl-8 pr-8 py-[11px] flex justify-between items-center  border "
                  >
                    <div className="pl-2">
                      <h1 className="font-semibold text-white text-[23px] leading-[1.75rem]">
                        {request.subjects}
                      </h1>
                      <p className=" text-white text-[21px] leading-[1.75rem] capitalize">
                        {" "}
                        {request.teacher?.contactInformation.firstName ||
                          "techer name"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button className="text-white bg-[#685AAD] rounded-md px-[7px] py-1 text-[17px] leading-[1.5rem]">
                        Edit Session
                      </button>
                      <a href={request.joinLink} target="_blank">
                        <button className="text-white bg-[#8653FF] rounded-md px-[7px] py-1 text-[17px] leading-[1.5rem]">
                          Meeting Link
                        </button>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* ---------completed session------------ */}

        <div className={`${styles.sessionchatbox}`}>
          <div
            className={`${styles.completedsessions} bg-[#EDE8FA] text-[#685AAD] rounded-2xl px-7 py-5  `}
          >
            <div className="flex  justify-between items-center mb-[1px]">
              <h1 className="font-bold text-[23px] leading-[1.75rem] uppercase">
                completed sessions
              </h1>
              <Image
                loading="lazy"
                src={sessionicongray}
                alt=""
                className="w-[25px] h-[25px]"
              />
            </div>

            {sessionData
              .filter(
                (request:any) =>
                  request.status === "accepted" &&
                  request.meetingCompleted === true
              )
              .map((request:any) => {
                return (
                  <div
                    key={request._id}
                    className="flex justify-between items-center border-b-2 border-[#8b55ff39] py-[19.5px] "
                  >
                    <div className="flex flex-col ">
                      <h3 className="text-[#8653FF] text-[18px] leading-[1.25rem] capitalize">
                        {request.teacher?.contactInformation.firstName || ""}
                      </h3>
                      <div className="flex justify-between gap-4 custom-2xl:gap-10 ">
                        <span className="text-[17px] leading-[1.25rem]">
                          Date
                        </span>
                        <span className="text-[17px] leading-[1.25rem]">
                          {new Date(request.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          setActiveSidebarItem("My Sessions");
                          Setsetcomingvalue("completed");
                        }}
                        className="bg-[#8653FF] text-white px-6 py-[7px] rounded-md text-[18px] leading-[1.25rem] -mr-0.5"
                      >
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ------chat--------- */}
          <div
            className={` ${styles.chatbox} bg-[#EDE8FA] text-[#685AAD] rounded-2xl px-7 py-5   text-xl`}
          >
            <div className="flex  justify-between items-center ">
              <h1 className="font-bold text-xl">CHAT</h1>
              <Image
                loading="lazy"
                src={chat2}
                alt=""
                className="w-[21px] h-[21px]"
              />
            </div>

            {recievedmessages.map((message: any, index:any) => (
              <div
                key={index}
                className="border-b-2 border-[#8b55ff39] py-[19px] hover:cursor-pointer"
              >
                <div
                  onClick={() => {
                    setActiveSidebarItem("My eTutor");
                    setchat(true);
                    settutortomessage(message.details);
                  }}
                >
                  <h1 className="text-[19.89px] leading-[1.75rem] text-[#685AAD] mb-1">
                    {" "}
                    {message?.details.contactInformation.firstName}
                  </h1>
                  <p className="text-[14.89px] leading-[1rem] text-[#685AADB2] uppercase">
                    Group session on Friday at 3PM—don’t miss it!
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --------24hr support----------- */}
        <div
          className={`${styles.support} bg-[#EDE8FA] text-[#685AAD] rounded-2xl px-6 py-[27px]   text-xl flex flex-col justify-between  hover:cursor-pointer `}
          onClick={() => {
            setActiveSidebarItem("Contact Support");
          }}
        >
          <div className="flex  justify-between items-center pr-2">
            <h1 className="font-bold text-[23px] leading-[1.75rem] uppercase">
              24H SUPPORT
            </h1>
            <Image
              loading="lazy"
              src={chaticon}
              alt=""
              className="w-[25px] h-[25px]"
            />
          </div>

          <div className=" ">
            <div className="flex flex-col">
              <span className="text-[#685AAD] text-[16.4px] leading-[1.5rem]">
                Need help?
              </span>
              <span className="text-[#685AAD] text-[16.4px] leading-[1.5rem]">
                Contact us.
              </span>
            </div>
          </div>
        </div>
        {/* -----Notifications----------- */}

        <div
          className={`${styles.notifications}   bg-[#EDE8FA] text-[#685AAD] rounded-2xl px-5 py-7  text-xl  `}
        >
          <div className="flex  justify-between items-center pr-2.5">
            <h1 className="font-bold text-[23px] leading-[1.75rem] uppercase">
              NOTIFICATIONS
            </h1>
            <Image
              loading="lazy"
              src={bellgray}
              alt=""
              className="w-[20.5px] h-[20.5px]"
            />
          </div>

          <div className=" mt-[18px] ">
            <div className="border-b-2 border-[#8b55ff39] py-2.5">
              <h1 className="text-[19.89px] leading-[1.5rem]  text-[#685AAD] uppercase mb-2">
                Support Response:
              </h1>
              <p className="text-[14.89px] font-medium uppercase leading-[1.25rem] text-[#685AADB2]">
                Our support team has responded to your inquiry. Click here to
                view the response.
              </p>
            </div>
          </div>
        </div>

        {/* ---------refer friends--------- */}
        <div
          className={`${styles.referfriends}  overflow-y-auto scrollbar-none bg-[#EDE8FA] text-[#685AAD] flex flex-col gap-2 justify-between rounded-2xl px-6 py-5  text-xl  hover:cursor-pointer`}
          onClick={() => {
            setActiveSidebarItem("Refer your Friends");
          }}
        >
          <div className="flex  justify-between items-center gap-3 pr-2 ">
            <h1 className="font-bold text-[23px] leading-[1.75rem] uppercase">
              Prefer your friends
            </h1>
            <Image
              loading="lazy"
              src={refergray}
              alt=""
              className="w-[22.296581268310547px] h-[22.296581268310547px]"
            />
          </div>

          <div>
            <p className="text-base text-[#8653FF] font-bold">
              Refer your friends, get eTokis to spend on courses and more
            </p>
            <p className="text-sm text-[#685AAD] font-medium tracking-[-0.015em]">
              Get 10 eTokis for each student and 5 eTokis for each tutor you
              successfully refer.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardGrid;

/*


*/

//  <div
//         className={`absolute z-50 top-20 custom-2xl:top-28 mr-1 sm:mr-0 sm:right-[29px] duration-1000 transition-all ease-in-out ${
//           isOpenNoti ? "translate-x-0" : "translate-x-[120%]"
//         } `}
//       >
//         <NotificationPage />
//       </div>
//       {/* <Dashboard /> */}

//       {/* top left box TOKIs */}
//       <div className=" custom-xl:w-[80%] sm:max-w-[40rem]   flex  items-start flex-col custom-2xl:flex-row gap-6 absolute top-14 custom-lg:top-0 mt-4  ">
//         <div className=" flex flex-col space-y-3 py-4 px-6  bg-purple-100  rounded-2xl w-[100%] sm:w-[24rem] bg-[#EDE8FA]">
//           <div className=" flex justify-between items-center bg-purple-300 rounded-full px-4 pl-6 py-[10px] bg-[#A296CC]">
//             <div className="text-3xl font-bold text-white">{etokies}</div>
//             <div className=" flex items-center justify-center">
//               <Image
//                 loading="lazy"
//                 src={etokiicon}
//                 alt=""
//                 className="w-9 h-9"
//               />
//             </div>
//           </div>

//           <div className="flex  space-x-6 mt-4 hover:cursor-pointer px-2 pt-2">
//             <button
//               onClick={() => {
//                 setActiveSidebarItem("Refer your Friends");
//               }}
//               className="flex-1 bg-[#685AAD] text-white py-[2px] px-4  rounded-md text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
//             >
//               <Image
//                 loading="lazy"
//                 src={EPlusIcon}
//                 alt=""
//                 className="w-6 h-6 hover:cursor-pointer"
//               />{" "}
//               etokis
//             </button>
//             <button
//               onClick={handleRedeem}
//               onMouseEnter={() => {
//                 setredeem(true);
//               }}
//               onMouseLeave={() => {
//                 setredeem(false);
//               }}
//               className="flex-1 bg-[#8653FF] text-white py-[2px] px-4 rounded-md flex items-center justify-center gap-1 hover:cursor-pointer relative"
//             >
//               {radeemLoading ? "wait..." : "Redeem"}
//               <Image
//                 loading="lazy"
//                 src={redeemIcon}
//                 alt=""
//                 className="w-6 h-6"
//               />
//               {redeem && (
//                 <div className="hover absolute w-[340px] h-[150px] top-0 left-40 rounded-lg p-4 text-start bg-[#8450ff] text-xl overflow-auto scrollbar-none">
//                   Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                   Odit, unde? Quos reprehenderit non est, quis aliquid
//                   necessitatibus illum porro ex ipsa. Voluptatibus, nostrum
//                   ratione rerum numquam dolore, non tempore iste consequatur vel
//                   vitae ab recusandae qui necessitatibus ea officiis amet.
//                 </div>
//               )}
//             </button>
//           </div>
//         </div>
//         <div className="bg-[#EDE8FA] rounded-lg font-bold px-8 py-3 text-center text-base text-[#685AAD] ">
//           SESSIONS&nbsp;LEFT: {setsessionleft}
//         </div>
//       </div>

//       <div className="block mb-60  sm:mb-64 custom-lg:mb-[135px] text-transparent">
//         a
//       </div>
