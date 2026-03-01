import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import loading from "../../../../public/loading icon.svg";
import { useSession } from "next-auth/react";
import chaticon from "../../../../public/chaticonwhite.svg";
import foldericon from "../../../../public/folder icon white.svg";
import profilewhite from "../../../../public/profile icon white.svg";
import pending from "../../../../public/pending.svg";
import unconfirmed from "../../../../public/unconfirmed.svg";
import confirmed from "../../../../public/confirmed.svg";
import canceled from "../../../../public/canceled.svg";
import { ChevronLeft, View } from "lucide-react";
import { ChevronRight } from "lucide-react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameDay,
  endOfWeek,
  eachWeekOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

interface Student {
  name: string;
  email: string;
  contactInformation: {
    country: string;
    phone: string;
    address: string;
  };
}

interface Teacher {
  name: string;
  email: string;
  contactInformation: {
    country: string;
    phone: string;
    address: string;
  };
}

interface BookingRequest {
  meetingCompleted: any;
  joinLink: string | undefined;
  startLink: string | undefined;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}
interface calanderprops {
  setActiveFindEtutor: (item: string) => void;
  setActiveMYEtutor: (item: string) => void;
  setcompleted?: string;
  setTutor: any;
  showchat: any;
  tutortomessage: any;
  data: any;
}

const SessionCalendarComponent = ({
  data,
  setTutor,
  setActiveFindEtutor,
  setActiveMYEtutor,
  showchat,
  tutortomessage,
}: calanderprops) => {
  const [activeTab, setActiveTab] = useState("sessions");
  const [activeSessionTab, setActiveSessionTab] = useState("unconfirmed");

  const [activeSubTab, setActiveSubTab] = useState("upcoming");
  const { data: session } = useSession();
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRequestId, setexpandedRequestId] = useState(null);
  const [confirmedState, setConfirmedState] = useState(false);
  const [unconfirmedState, setUnconfirmedState] = useState(false);
  const [canceledState, setCanceledState] = useState(false);

  // fetching incoming requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const response = await fetch(
          "/api/get-incoming-requests-from-student",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data.bookingRequests);
     
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session, activeSubTab]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month"); // 'month' or 'week'
  const [popup, setpopup] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const weeks = eachWeekOfInterval(
    { start: monthStart, end: monthEnd },
    { weekStartsOn: 1 } // Monday as week start
  );
  // Filter sessions based on states
  const filteredSessions = useMemo(() => {
    if (!confirmedState && !unconfirmedState && !canceledState) {
      return requests;
    }
    return requests.filter((session) => {
      if (confirmedState && session.status === "accepted" && (!session.meetingCompleted)) return true;
      if (unconfirmedState && session.status === "pending") return true;
      if (canceledState && session.status === "rejected") return true;
      return false;
    });
  }, [requests, confirmedState, unconfirmedState, canceledState]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    if (view === "month") {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const days = eachDayOfInterval({ start, end });

      // Add previous month days to start from Sunday
      const firstDay = startOfWeek(start);
      const preDays = eachDayOfInterval({ start: firstDay, end: start });

      return [...preDays.slice(0, -1), ...days];
    } else {
      const start = startOfWeek(currentDate);
      return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    }
  }, [currentDate, view]);

  // Navigation handlers
  const handlePrevious = () => {
    if (view === "month") {
      setCurrentDate((prev) => subMonths(prev, 1));
    } else {
      setCurrentDate((prev) => subMonths(prev, 1));
    }
  };

  const handleNext = () => {
    if (view === "month") {
      setCurrentDate((prev) => addMonths(prev, 1));
    } else {
      setCurrentDate((prev) => addMonths(prev, 1));
    }
  };

  const getSessionForDate = (date:any) => {
    return filteredSessions.filter((session) => !session.meetingCompleted).find((session) =>
      isSameDay(new Date(session.date), date)
    );
  };

  // -------------------------------------------------------------------------------

  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/fetch-send-requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data.bookingRequests);
      } catch (err: any) {
    
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session]);

  const renderContent = () => {
    if (activeTab === "sessions") {
      return (
        <div className="bg-[#EDE8FA] min-h-screen w-full rounded-3xl pb-6  ">
          <div className="flex w-full rounded-t-3xl mb-6 transition-all justify-between ">
            <div className=" w-full flex">
              <button
                className={`w-full font-bold text-xs sm:text-sm custom-xl:text-2xl px-4 uppercase py-2 custom-xl:py-4 rounded-tl-3xl transition-all ${
                  activeSessionTab === "unconfirmed"
                    ? "bg-[#EDE8FA] text-[#685AAD] transition-all"
                    : activeSessionTab === "confirmed"
                    ? "bg-[#B4A5D7] text-white transition-all "
                    : "bg-[#6B5692] text-white transition-all "
                }`}
                onClick={() => setActiveSessionTab("unconfirmed")}
              >
                Unconfirmed
              </button>
              <button
                className={`w-full font-bold text-xs sm:text-sm custom-xl:text-2xl px-4 uppercase py-2 custom-xl:py-4 transition-all ${
                  activeSessionTab === "confirmed"
                    ? "bg-[#EDE8FA] text-[#685AAD] transition-all"
                    : activeSessionTab === "unconfirmed"
                    ? "bg-[#B4A5D7] text-white transition-all"
                    : "bg-[#B4A5D7] text-white transition-all"
                }`}
                onClick={() => setActiveSessionTab("confirmed")}
              >
                Confirmed
              </button>
              <button
                className={`w-full font-bold text-xs sm:text-sm custom-xl:text-2xl px-4 uppercase py-2 custom-xl:py-4  transition-all rounded-tr-3xl custom-xl:rounded-none ${
                  activeSessionTab === "canceled"
                    ? "bg-[#EDE8FA] text-[#685AAD] transition-all"
                    : "bg-[#6B5692] text-white transition-all"
                }`}
                onClick={() => setActiveSessionTab("canceled")}
              >
                Canceled
              </button>
            </div>

            <div className=" w-[40%] bg-white rounded-bl-lg hidden custom-xl:block"></div>
          </div>

          <div className="w-full  px-4">
            <div className="w-full min-h-screen bg-[#B4A5D7] rounded-3xl px-5 py-8">
              {activeSessionTab === "unconfirmed" && (
                <>
                  <div className="">
                    <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
                      <div className="px-4  ">Subject and level</div>
                      <div className="px-4  ">eTutor</div>
                      <div className="px-4  ">Duration</div>
                      <div className="px-4  ">Date and Time</div>
                    </div>

                    {requests.filter((request) => request.status === "pending")
                      .length !== 0 ? (
                      <div className="flex flex-col gap-2 custom-xl:gap-3">
                        {requests
                          .filter((request) => request.status === "pending")
                          .map((request) => {
                            const isExpanded =
                              expandedRequestId === request._id;
                            return (
                              <div
                                key={request._id}
                                className={`w-full  bg-[#7565A4] rounded-lg custom-xl:pl-9   ${
                                  isExpanded
                                    ? "h-auto custom-xl:h-fit transition-all duration-1000 ease-out"
                                    : "h-auto custom-xl:h-20 transition-all duration-300 ease-out"
                                } overflow-hidden cursor-pointer`}
                                onMouseEnter={() =>
                                  //@ts-ignore
                                  setexpandedRequestId(request._id)
                                }
                                onMouseLeave={() => setexpandedRequestId(null)}
                              >
                                <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                                  {/* Content Section */}
                                  <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                                    <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                      {/* Subject */}
                                      <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                          Subject and level
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl  font-medium">
                                          {request.subjects || ""}
                                        </span>
                                        <div
                                          className={`text-white ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          PAYg session
                                        </div>

                                        <div
                                          className={`text-white mt-4 ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          <span className="text-3xl font-medium">
                                            Student&apos;s Note:
                                          </span>
                                          <p className="">
                                            {
                                            //@ts-ignore
                                            request.StudentNote ||
                                              "Not Available"}{" "}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Tutor */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          eTutor
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl ">
                                          {
                                          //@ts-ignore
                                          request?.studentdetails?.firstName ||
                                            "Your Student"}
                                        </span>
                                        <div
                                          className={` ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                          }`}
                                        >
                                          <div className="flex  gap-6 items-center  mt-2">
                                            <span>
                                              <Image  loading="lazy" 
                                                onClick={() => {
                                                  setActiveFindEtutor(
                                                    "My eTutor"
                                                  );
                                                  tutortomessage(
                                                    request.teacher
                                                  );
                                                  showchat(true);
                                                }}
                                                src={chaticon}
                                                alt="chaticon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                            <span>
                                              <Image  loading="lazy" 
                                                onClick={() => {
                                                  setActiveFindEtutor(
                                                    "My eTutor"
                                                  );
                                                  tutortomessage(
                                                    request.teacher
                                                  );
                                                  showchat(true);
                                                }}
                                                src={foldericon}
                                                alt="foldericon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                            <span
                                              onClick={() => {
                                                setActiveFindEtutor(
                                                  "Find eTutor"
                                                );

                                                setTutor(request.teacher);
                                              }}
                                            >
                                              <Image  loading="lazy" 
                                                src={profilewhite}
                                                alt="profileicon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Duration */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          Duration
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                          {
                                          //@ts-ignore
                                          request?.duration || ""}
                                        </span>
                                      </div>

                                      {/* Date/Time */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          Date and Time
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                          {`${new Date(request.date)
                                            .toLocaleDateString("en-GB")
                                            .replace(/\//g, "/")
                                            .slice(0, 10)}`}
                                        </span>
                                        <div
                                          className={`text-base sm:text-xl text-white ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          {`${new Date(
                                            request.date
                                          ).toLocaleDateString("en-GB", {
                                            weekday: "short",
                                          })}`}{" "}
                                          {request.time || ""}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Buttons Section */}
                                  <div
                                    className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full ${
                                      isExpanded ? "py-6 px-4" : "p-4"
                                    } transition-all duration-300 ease-in-out  custom-xl:pl-0 `}
                                  >
                                    <button
                                      onClick={() =>
                                        setActiveFindEtutor("Find eTutor")
                                      }
                                      className="w-full  custom-xl:h-full custom-xl:w-auto bg-[#655693] text-white px-8 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl hover:bg-[#5c4c8b] transition-colors"
                                    >
                                      Edit Session
                                    </button>

                                    <button className="w-full custom-xl:h-full flex items-center justify-center gap-3  custom-xl:w-auto bg-transparent text-white px-8 py-2 rounded-md text-sm custom-xl:text-xl transition-all">
                                      <Image  loading="lazy" 
                                        src={pending}
                                        alt=""
                                        className="transition-transform duration-300 custom-xl:group-hover:rotate-90 custom-xl:group-hover:scale-125"
                                      />
                                      Pending
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <>
                      <Image  loading="lazy"  src={unconfirmed} alt="" className="mx-auto " />
                     
                      </>
                    )}
                  </div>
                </>
              )}
              {activeSessionTab === "confirmed" && (
                <>
                  <div className="">
                    <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
                      <div className="px-4  ">Subject and level</div>
                      <div className="px-4  ">eTutor</div>
                      <div className="px-4  ">Duration</div>
                      <div className="px-4  ">Date and Time</div>
                    </div>

                    {requests.filter((request) => request.status === "accepted")
                      .length !== 0 ? (
                      <div className="flex flex-col gap-2 custom-xl:gap-3">
                        {requests
                          .filter((request) => (request.status === "accepted" && !request.meetingCompleted))
                          .map((request:any) => {
                            const isExpanded =
                              expandedRequestId === request._id;
                            return (
                              <div
                                key={request._id}
                                className={`w-full  bg-[#7565A4] rounded-lg custom-xl:pl-9   ${
                                  isExpanded
                                    ? "h-auto custom-xl:h-fit transition-all duration-1000 ease-out"
                                    : "h-auto custom-xl:h-20 transition-all duration-300 ease-out"
                                } overflow-hidden cursor-pointer`}
                                onMouseEnter={() =>
                                  //@ts-ignore
                                  setexpandedRequestId(request._id)
                                }
                                onMouseLeave={() => setexpandedRequestId(null)}
                              >
                                <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                                  {/* Content Section */}
                                  <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                                    <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                      {/* Subject */}
                                      <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                          Subject and level
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl  font-medium">
                                          {request.subjects || ""}
                                        </span>
                                        <div
                                          className={`text-white ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          PAYg session
                                        </div>

                                        <div
                                          className={`text-white mt-4 ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          <span className="text-3xl font-medium">
                                            Student&apos;s Note:
                                          </span>
                                          <p className="">
                                            {request.StudentNote ||
                                              "Not Available"}{" "}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Tutor */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          eTutor
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl ">
                                          {request?.studentdetails?.firstName ||
                                            "Your Student"}
                                        </span>
                                        <div
                                          className={` ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                          }`}
                                        >
                                          <div className="flex  gap-6 items-center  mt-2">
                                            <span>
                                              <Image  loading="lazy" 
                                                onClick={() => {
                                                  setActiveFindEtutor(
                                                    "My eTutor"
                                                  );
                                                  tutortomessage(
                                                    request.teacher
                                                  );
                                                  showchat(true);
                                                }}
                                                src={chaticon}
                                                alt="chaticon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                            <span>
                                              <Image  loading="lazy" 
                                                onClick={() => {
                                                  setActiveFindEtutor(
                                                    "My eTutor"
                                                  );
                                                  tutortomessage(
                                                    request.teacher
                                                  );
                                                  showchat(true);
                                                }}
                                                src={foldericon}
                                                alt="foldericon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                            <span
                                              onClick={() => {
                                                setActiveFindEtutor(
                                                  "Find eTutor"
                                                );

                                                setTutor(request.teacher);
                                              }}
                                            >
                                              <Image  loading="lazy" 
                                                src={profilewhite}
                                                alt="profileicon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Duration */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          Duration
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                          {request.duration || ""}
                                        </span>
                                      </div>

                                      {/* Date/Time */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          Date and Time
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                          {`${new Date(request.date)
                                            .toLocaleDateString("en-GB")
                                            .replace(/\//g, "/")
                                            .slice(0, 10)}`}
                                        </span>
                                        <div
                                          className={`text-base sm:text-xl text-white ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          {`${new Date(
                                            request.date
                                          ).toLocaleDateString("en-GB", {
                                            weekday: "short",
                                          })}`}{" "}
                                          {request.time || ""}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Buttons Section */}
                                  <div
                                    className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full  ${
                                      isExpanded
                                        ? "py-6 px-4 h-auto custom-xl:h-28"
                                        : "p-4"
                                    } custom-xl:pl-0 `}
                                  >
                                    <button
                                      onClick={() =>
                                        setActiveFindEtutor("Find eTutor")
                                      }
                                      className="w-full  custom-xl:h-full custom-xl:w-auto bg-[#655693] text-white px-8 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl hover:bg-[#5c4c8b] transition-colors"
                                    >
                                      Edit Session
                                    </button>
                                    <a href={request.startLink} target="_blank">
                                      <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#FC7777] text-white px-8 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl hover:bg-[#f16d6d] transition-colors">
                                        Meeting Link
                                      </button>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <Image  loading="lazy"  src={confirmed} alt="" className="mx-auto " />
                    )}
                  </div>
                </>
              )}
              {activeSessionTab === "canceled" && (
                <>
                  <div className="">
                    <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
                      <div className="px-4  ">Subject and level</div>
                      <div className="px-4  ">eTutor</div>
                      <div className="px-4  ">Duration</div>
                      <div className="px-4  ">Date and Time</div>
                    </div>

                    {requests.filter((request) => request.status === "rejected")
                      .length !== 0 ? (
                      <div className="flex flex-col gap-2 custom-xl:gap-3">
                        {requests
                          .filter((request) => request.status === "rejected")
                          .map((request:any) => {
                            const isExpanded =
                              expandedRequestId === request._id;
                            return (
                               <div
                                key={request._id}
                                className={`w-full  bg-[#7565A4] rounded-lg custom-xl:pl-9   ${
                                  isExpanded
                                    ? "h-auto custom-xl:h-fit transition-all duration-1000 ease-out"
                                    : "h-auto custom-xl:h-20 transition-all duration-300 ease-out"
                                } overflow-hidden cursor-pointer`}
                                onMouseEnter={() =>
                                  setexpandedRequestId(request._id)
                                }
                                onMouseLeave={() => setexpandedRequestId(null)}
                              >
                                <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                                  {/* Content Section */}
                                  <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                                    <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                                      {/* Subject */}
                                      <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                                          Subject and level
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl  font-medium">
                                          {request.subjects || ""}
                                        </span>
                                        <div
                                          className={`text-white ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          PAYg session
                                        </div>

                                        <div
                                          className={`text-white mt-4 ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          <span className="text-3xl font-medium">
                                            Student&apos;s Note:
                                          </span>
                                          <p className="">
                                            {request?.StudentNote ||
                                              "Not Available"}{" "}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Tutor */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          eTutor
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl ">
                                          {request?.studentdetails?.firstName ||
                                            "Your Student"}
                                        </span>
                                        <div
                                          className={` ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out "
                                          }`}
                                        >
                                          <div className="flex  gap-6 items-center  mt-2">
                                            <span>
                                              <Image  loading="lazy" 
                                                onClick={() => {
                                                  setActiveFindEtutor(
                                                    "My eTutor"
                                                  );
                                                  tutortomessage(
                                                    request.teacher
                                                  );
                                                  showchat(true);
                                                }}
                                                src={chaticon}
                                                alt="chaticon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                            <span>
                                              <Image  loading="lazy" 
                                                onClick={() => {
                                                  setActiveFindEtutor(
                                                    "My eTutor"
                                                  );
                                                  tutortomessage(
                                                    request.teacher
                                                  );
                                                  showchat(true);
                                                }}
                                                src={foldericon}
                                                alt="foldericon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                            <span
                                              onClick={() => {
                                                setActiveFindEtutor(
                                                  "Find eTutor"
                                                );

                                                setTutor(request.teacher);
                                              }}
                                            >
                                              <Image  loading="lazy" 
                                                src={profilewhite}
                                                alt="profileicon"
                                                className="w-5 h-5"
                                              />
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Duration */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          Duration
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                          {request.duration || ""}
                                        </span>
                                      </div>

                                      {/* Date/Time */}
                                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                                          Date and Time
                                        </span>
                                        <span className="text-white text-base custom-2xl text-base:sm:text-xl">
                                          {`${new Date(request.date)
                                            .toLocaleDateString("en-GB")
                                            .replace(/\//g, "/")
                                            .slice(0, 10)}`}
                                        </span>
                                        <div
                                          className={`text-base sm:text-xl text-white ${
                                            isExpanded
                                              ? "opacity-100 block transition-all duration-300 ease-in-out"
                                              : "opacity-0 hidden transition-all duration-300 ease-in-out"
                                          }`}
                                        >
                                          {`${new Date(
                                            request.date
                                          ).toLocaleDateString("en-GB", {
                                            weekday: "short",
                                          })}`}{" "}
                                          {request.time || ""}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Buttons Section */}
                                  <div
                                    className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full  ${
                                      isExpanded
                                        ? "py-6 px-4 h-auto custom-xl:h-28"
                                        : "p-4"
                                    } custom-xl:pl-0 `}
                                  >
                                    <button
                                      onClick={() =>
                                        setActiveFindEtutor("Find eTutor")
                                      }
                                      className="w-full  custom-xl:h-full custom-xl:w-auto bg-[#655693] text-white px-8 py-2 rounded-md text-sm custom-2xl text-base:sm:text-xl hover:bg-[#5c4c8b] transition-colors"
                                    >
                                      Edit Session
                                    </button>
                                   
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      <Image  loading="lazy"  src={canceled} alt="" className="mx-auto " />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full  flex flex-col custom-xl:flex-row gap-9 text-white">
          <div className="flex  flex-wrap custom-xl:flex-col gap-4 mt-6 ">
            <div className="flex  flex-col gap-4">
              <div className="monthswitch bg-[#B4A5D7] w-[12rem] text-white select-none custom-xl:w-[18.7rem] box-border uppercase  py-3.5 px-8 rounded-full  h-fit flex text-base custom-xl:text-2xl items-center  justify-between font-medium">
                {/* to switch previous month */}
                <span
                  onClick={handlePrevious}
                  className="hover:cursor-pointer "
                >
                  <ChevronLeft className="w-4 custom-xl:w-7" />
                </span>
                <span>{format(currentDate, "MMM - yyyy")}</span>
                {/* to switch next month */}
                <span onClick={handleNext} className="hover:cursor-pointer">
                  <ChevronRight className="w-4 custom-xl:w-7" />
                </span>
              </div>

              <div className="monthswitch bg-[#B4A5D7] w-[12rem] text-white select-none custom-xl:w-[18.7rem] box-border uppercase py-3.5 px-8 rounded-full  h-fit flex text-base custom-xl:text-2xl items-center  justify-between font-medium">
                {/* to switch the month view */}
                <ChevronLeft
                  onClick={() => setView("month")}
                  className={`hover:cursor-pointer  w-4 custom-xl:w-7 ${
                    view === "month" && "text-[#ffffff3d]"
                  }`}
                />
                <span>{view}</span>
                {/* to switch the week view */}
                <ChevronRight
                  onClick={() => setView("week")}
                  className={`hover:cursor-pointer w-4 custom-xl:w-7 ${
                    view === "week" && "text-[#ffffff3f]"
                  }`}
                />
              </div>
            </div>

            <div className="mt-2 custom-xl:mt-9 pl-2.5 flex flex-col gap-2 custom-xl:gap-3">
              {/* Confirmed Box */}
              <div
                className="flex items-center gap-3 group hover:cursor-pointer"
                onClick={() => setConfirmedState(!confirmedState)}
              >
                <div
                  className={`h-6 w-6 p-3 rounded-md transition-all duration-100 ${
                    confirmedState
                      ? "bg-[#8558f9]"
                      : "bg-[#f1edfc] group-hover:bg-[#ab8bfb57]"
                  }`}
                >
                  &nbsp;
                </div>
                <div
                  className={`h-7 w-[14.6rem] py-[21px] px-8 text-base custom-xl:text-2xl font-medium rounded-2xl flex items-center ${
                    confirmedState
                      ? "bg-[#8558f9]"
                      : "bg-[#aa8bfb] group-hover:bg-[#aa8bfb]"
                  }`}
                >
                  Confirmed
                </div>
              </div>

              {/* Unconfirmed Box */}
              <div
                className="flex items-center gap-3 group hover:cursor-pointer"
                onClick={() => setUnconfirmedState(!unconfirmedState)}
              >
                <div
                  className={`h-6 w-6 p-3 rounded-md ${
                    unconfirmedState
                      ? "bg-[#4ddfea]"
                      : "bg-[#f1edfc] group-hover:bg-[#83eaf15e]"
                  }`}
                >
                  &nbsp;
                </div>
                <div
                  className={`h-7 w-[14.6rem] py-[21px] px-8 text-base custom-xl:text-2xl font-medium rounded-2xl flex items-center ${
                    unconfirmedState
                      ? "bg-[#4ddfea]"
                      : "bg-[#83e9f1] group-hover:bg-[#4DDFEA]"
                  }`}
                >
                  Unconfirmed
                </div>
              </div>

              {/* Canceled Box */}
              <div
                className="flex items-center gap-3 group hover:cursor-pointer"
                onClick={() => setCanceledState(!canceledState)}
              >
                <div
                  className={`h-6 w-6 p-3 rounded-md ${
                    canceledState
                      ? "bg-[#ff9580]"
                      : "bg-[#f1edfc] group-hover:bg-[#ffb6a75e]"
                  }`}
                >
                  &nbsp;
                </div>
                <div
                  className={`h-7 w-[14.6rem] py-[21px] px-8 text-base custom-xl:text-2xl font-medium rounded-2xl flex items-center ${
                    canceledState
                      ? "bg-[#ff9580]"
                      : "bg-[#ffb5a7] group-hover:bg-[#FF9580]"
                  }`}
                >
                  Canceled
                </div>
              </div>
            </div>
          </div>

          {view === "month" && (
            <div className="calendar bg-[#EDE8FA] w-full rounded-xl custom-xl:rounded-3xl px-4 custom-xl:px-7 py-4 custom-xl:py-7 ">
              <div className="grid grid-cols-7 gap-1 sm:gap-3 custom-xl:gap-5 ">
                {/* Week day headers */}
                {view === "month" &&
                  ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                    (day) => (
                      <span
                        key={day}
                        className="text-center text-[#A296CC]  flex flex-row-reverse pr-2 custom-xl:pr-6 text-xs custom-lg:text-sm custom-xl:text-xl font-medium custom-xl:font-semibold  "
                      >
                        {day}
                      </span>
                    )
                  )}

                {/* Calendar days */}
                {calendarDays.map((day, index) => {
                  const session = getSessionForDate(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  return (
                    <div
                      key={index}
                      className="aspect-square p-1 custom-xl:p-2 relative  bg-white flex flex-row-reverse rounded-md custom-xl:rounded-xl  "
                    >
                      <span
                        className={`font-semibold text-xs custom-lg:text-sm custom-xl:text-xl px-1 custom-xl:px-2   ${
                          isCurrentMonth ? "text-[#A296CC]" : "text-[#ECE8FC]"
                        }`}
                      >
                        {format(day, "d")}
                      </span>

                      {session && (
                        <>
                          <div
                            onMouseEnter={() => {
                              //@ts-ignore
                              setpopup(day);
                            }}
                            onMouseLeave={() => {
                              setpopup(null);
                            }}
                            onClick={() => {
                              if (session.status === "accepted") {
                                setActiveTab("sessions");
                                setActiveSessionTab("confirmed");
                              } else if (session.status === "pending") {
                                setActiveTab("sessions");
                                setActiveSessionTab("unconfirmed");
                              } else if (session.status === "rejected") {
                                setActiveTab("sessions");
                                setActiveSessionTab("canceled");
                              }
                            }}
                            className={`absolute bottom-2 left-2 right-2    custom-xl:p-1.5 rounded-sm sm:rounded-full text-xs custom-xl:text-sm flex items-center justify-center hover:cursor-pointer ${
                              session.status === "accepted"
                                ? "bg-[#8558f9]"
                                : session.status === "pending"
                                ? "bg-[#4ddfea]"
                                : "bg-[#ff9580]"
                            }`}
                          >
                            <div className=" text-xs text-white ">
                              <span className="hidden sm:inline-block">
                                Session
                              </span>{" "}
                              {requests.indexOf(session) + 1}
                            </div>
                          </div>

                          {popup === day && (
                            <div
                              className={`${
                                session.status === "accepted"
                                  ? "bg-[#8558f9]"
                                  : session.status === "pending"
                                  ? "bg-[#4ddfea]"
                                  : "bg-[#ff9580]"
                              } text-white p-4  h-28 w-36  py-2 flex  items-start absolute  top-11 sm:top-20 custom-xl:top-28 custom-xl:top-[133px]   left-1/2 transform -translate-x-1/2  z-50 rounded-3xl transition-all duration-300 `}
                            >
                              <div className="space-y-1 w-full">
                                <div className="text-2xl font-semibold border-b border-white">
                                  Session
                                </div>
                                <div className="text-xl">
                                  {session.subjects}
                                </div>
                                <div className="text-lg">{session.time}</div>
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
          )}

          {view === "week" && (
            <div className="w-full max-w-6xl mx-auto  h-[834px] overflow-y-auto scrollbar-none ">
              <div className="space-y-5">
                {weeks.map((week, weekIndex) => {
                  const days = eachDayOfInterval({
                    start: week,
                    end: new Date(week.getTime() + 6 * 24 * 60 * 60 * 1000),
                  });

                  return (
                    <div
                      key={weekIndex}
                      className=" rounded-xl custom-xl:rounded-3xl px-4 custom-xl:px-7  pt-4 custom-xl:pt-7 pb-5 custom-xl:pb-8  bg-[#EDE8FA] "
                    >
                      <div className="grid grid-cols-7 gap-4 text-[#A296CC] text-xl font-medium">
                        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-[#A296CC]  flex flex-row-reverse pr-2 custom-xl:pr-6 text-xs custom-lg:text-sm custom-xl:text-xl font-medium custom-xl:font-semibold   "
                            >
                              {day}
                            </div>
                          )
                        )}

                        {days.map((day, dayIndex) => {
                          const dayString = format(day, "d");
                          const isCurrentMonth = isSameMonth(day, currentDate);
                          const session = getSessionForDate(day);
                          return (
                            <div
                              onClick={() => {
                                if (session) {
                                  if (session.status === "accepted") {
                                    setActiveTab("sessions");
                                    setActiveSessionTab("confirmed");
                                  } else if (session.status === "pending") {
                                    setActiveTab("sessions");
                                    setActiveSessionTab("unconfirmed");
                                  } else if (session.status === "rejected") {
                                    setActiveTab("sessions");
                                    setActiveSessionTab("canceled");
                                  }
                                }
                              }}
                              key={dayIndex}
                              className={`
                                sm:min-h-[8rem]   custom-lg:h-[10rem] custom-xl:min-h-[25rem] p-1  sm:p-2   rounded-lg custom-xl:rounded-2xl  flex  flex-col sm:pr-3 
                                ${
                                  session
                                    ? session.status === "accepted"
                                      ? "bg-[#8558f9] text-white hover:cursor-pointer"
                                      : session.status === "pending"
                                      ? "bg-[#4ddfea] hover:cursor-pointer text-white"
                                      : session.status === "rejected"
                                      ? "bg-[#ff9580] hover:cursor-pointer text-white"
                                      : ""
                                    : "bg-white text-[#A296CC] "
                                }
                                ${!isCurrentMonth ? "text-[#ECE8FC]" : ""}
                                ${isToday(day) ? "" : ""}
                              `}
                            >
                              <div className="font-semibold text-xs custom-lg:text-sm custom-xl:text-xl px-1 custom-xl:px-2 flex flex-row-reverse ">
                                {dayString}
                              </div>

                              {session && (
                                <div
                                  className={`${
                                    session.status === "accepted"
                                      ? "bg-[#8558f9]"
                                      : session.status === "pending"
                                      ? "bg-[#4ddfea]"
                                      : "bg-[#ff9580]"
                                  } text-white p-1 custom-xl:p-2  h-fit w-full  py-2 custom-xl::flex  items-start   rounded-xl custom-xl:rounded-3xl transition-all duration-300 hidden truncate `}
                                >
                                  <div className="space-y-1 w-full">
                                    <div className="text-xs custom-xl:text-sm custom-xl:text-xl font-semibold border-b border-white">
                                      Session
                                    </div>
                                    <div className="text-xs custom-xl:text-sm custom-xl:text-base  ">
                                      {session.subjects}
                                    </div>
                                    <div className="text-xs custom-xl:text-sm custom-xl:text-base">
                                      {session.time}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div className="w-full min-h-screen  relative ">
      <div className="flex space-x-4 mb-4  w-fit bg-[#B4A5D7] p-3 custom-xl:p-4 rounded-full absolute -top-3 custom-xl:-top-16 custom-xl:-top-20 custom-xl:left-[150px] transition-all ">
        <button
          className={`px-8 py-1 custom-xl:px-[86px] custom-xl:py-[15px] transition-all rounded-full text-base custom-xl:text-xl font-bold uppercase bg-[#EDE8FA] text-[#6B5692] ${
            activeTab === "sessions"
              ? "bg-color2 text-white transition-all"
              : "bg-[#EDE8FA] text-[#6c5794] transition-all"
          }`}
          onClick={() => setActiveTab("sessions")}
        >
          Sessions
        </button>
        <button
          className={`px-8 py-1 custom-xl:px-[81px] custom-xl:py-[15px] rounded-full transition-all text-base custom-xl:text-xl font-bold uppercase bg-[#EDE8FA] text-[#6B5692] ${
            activeTab === "calendar"
              ? "bg-color2 text-white transition-all"
              : "bg-[#EDE8FA] text-[#6B5692] transition-all"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
      </div>
      <div className="h-[5.9rem] "></div>
      {renderContent()}
    </div>
  );
};

export default SessionCalendarComponent;
