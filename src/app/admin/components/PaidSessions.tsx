import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import searchicon from "../../../../public/whiteSearchIcon.svg";
import downloadReport from "../../../../public/downloadIconWhite.svg";
import dots from "../../../../public/3DOTS.svg";
import CommentIcon from "../../../../public/commentIcon.svg";
import commentIconInactive from "../../../../public/commentIconInactive.svg";
import BOokMark from "../../../../public/bookMarkIcon.svg";
import bookmarkActive from "../../../../public/bookmarkIconAtive.svg";
import infoicon from "../../../../public/infoicon.svg";
import reportIcon from "../../../../public/newReportIcon.svg";
import reportIconActive from "../../../../public/reportIconActive.svg";
import crossIcon from "../../../../public/crossicon.svg";
import keyIcon from "../../../../public/keyIcon.svg";
import { useBookings } from "../hooks/useBookings";
const options = [
  { value: "nameAsc", label: "Student Name (A-Z)" },
  { value: "nameDesc", label: "Student Name (Z-A)" },
  { value: "dateAsc", label: "Date (Oldest First)" },
  { value: "dateDesc", label: "Date (Newest First)" },
  { value: "status", label: "Status" },
  { value: "level", label: "Level of Study" },
  { value: "grade", label: "Grade" },
];

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
function PaidSessions() {
  const { booking, isLoadingbooking, errorbooking } = useBookings();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [hover1, sethover1] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [ispopupopen, setispopupopen] = useState(false);
  const [activetab, setActivetab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  if(isLoadingbooking){
    return <p>loading...</p>
  }else if(errorbooking){
    return <p>{errorbooking.message}</p>
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const filteredBookings = booking.filter((booking:any) => {
    const studentName = booking.student?.firstName?.toLowerCase() || "";
    const teacherName =
      booking.teacher?.contactInformation?.firstName?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      studentName.includes(search) || teacherName.includes(search)
    );
  });

  // Sort bookings based on sortConfig
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sorting if key is not set

    if (sortConfig.key.includes("name")) {
      const studentA = a.student?.firstName?.toLowerCase() || "";
      const studentB = b.student?.firstName?.toLowerCase() || "";
      return sortConfig.direction === "ascending"
        ? studentA.localeCompare(studentB)
        : studentB.localeCompare(studentA);
    }

    if (sortConfig.key.includes("date")) {
      const dateA:any = new Date(a.createdAt || "");
      const dateB:any = new Date(b.createdAt || "");
      return sortConfig.direction === "ascending"
        ? dateA - dateB
        : dateB - dateA;
    }

    return 0;
  });

  // Handle sort selection
  const handleSortChange = (key:any) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };
  return (
    <div className="mt-10 bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-fit  px-3 custom-xl:px-10  py-3 custom-xl:py-10  relative">
      <div className="flex justify-between  custom-xl:items-center flex-wrap  gap-y-4 ">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl sm:text-3xl custom-lg:text-[45px] text-[#685aad] font-medium leading-normal">
          Sessions
          </h1>
          <div className="border-2 custom-xl:border-8 border-[#b4a5d7] text-[#8376bc] rounded-md md:rounded-xl custom-xl:rounded-2xl text-base sm:text-lg md:text-2xl custom-lg:text-4xl font-bold px-5 py-0.5">
          {booking.filter((booking:any) => booking?.IsTrialSession === false).length}
          </div>
        </div>

        <div className="flex  justify-end   gap-2 custom-lg:gap-7  w-fit   flex-col custom-lg:flex-row  ">
          {/* ---------search bar top------- */}
          <div className="relative w-fit  h-fit truncate ">
            <input
              type="text"
              placeholder="Search by name,or ID"
              className=" bg-[#a296cc] text-[#d1cbe6] truncate placeholder-[#d1cbe6] text-xl px-5  custom-lg:px-10  py-2 custom-lg:py-4 rounded-md border border-transparent w-full  custom-xl:w-[24.4rem] focus:outline-none focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Image  loading="lazy" 
              src={searchicon}
              className="absolute right-2 sm:right-4 custom-xl:right-8 top-1/2 transform -translate-y-1/2 text-[#d1cbe6]  w-4 sm:w-5 h-4 sm:h-5 "
              alt="x"
            />
          </div>

          <div className="relative   h-fit   w-full custom-xl:w-fit ">
            <div
              className={`bg-[#a296cc] text-[#d1cbe6]  sm:text-sm pl-5 custom-lg:pl-10 pr-4 custom-lg:pr-8 py-2 custom-lg:py-4 text-xl transition-all duration-500 rounded-md cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[24.4rem] ${
                isOpen
                  ? "border  border-[#a394d6]"
                  : "border border-transparent"
              } `}
              onClick={toggleDropdown}
            >
              <span className="text-xl pl-3 lowercase">
              {options.find((option) => option.value === sortConfig.key)?.label ||
              "Sort by"}
              </span>
              {isOpen ? (
                <ChevronUp className="text-[#d1cbe6]" />
              ) : (
                <ChevronDown className="text-[#d1cbe6]" />
              )}
            </div>

            {isOpen && (
              <div
                onMouseLeave={() => {
                  setIsOpen(false);
                }}
                className="py-5 max-w-[97%] mx-auto w-full transition-all duration-500  absolute top-full left-0   bg-[#a296cc] border  border-[#a394d6] px-5 text-[#d1cbe6] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-md shadow-lg z-10  h-fit"
              >
                <ul
                  id="style-2"
                  className=" overflow-y-auto max-h-[13rem] scrollstyle   "
                >
                  {options.map((option) => (
                    <li
                    onClick={() => handleSortChange(option.value)}
                      key={option.value}
                      className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#e3dff0]  text-[#e3dff0] text-lg max-w-[14.9rem]   ${
                        selectedOption === option.value ? "" : ""
                      }`}
                    >
                      <span className="pl-1 ">{option.label}</span>
                    </li>
                    // <div className="border-b border-[#8f81c7] w-full"></div>
                  ))}
                </ul>
                <div></div>
                <style jsx>{`
                  #style-2::-webkit-scrollbar-track {
                    border-radius: 10px;
                    background-color: #c9bbef;
                  }

                  #style-2::-webkit-scrollbar {
                    width: 5px;
                    background-color: transparent;
                  }

                  #style-2::-webkit-scrollbar-thumb {
                    border-radius: 10px;

                    background-color: #8f81c7;
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="  mt-3 custom-xl:mt-8  leading-none  overflow-hidden">
        <div className="hidden custom-xl:block">
          <ul className=" flex  gap-4  w-full  font-medium text-[#685aad] text-2xl ">
            <li className="w-full max-w-[3.2%]  "></li>
            <li className="w-full max-w-[13.6rem]">Students</li>
            <li className="w-full max-w-[13.2rem]">eTutor</li>
            <li className="w-full max-w-[13.3rem] hidden custom-2xl:block">
              Subject
            </li>
            <li className="w-full max-w-[13.4rem] ">Session date</li>
            <li className="w-full min-w-fit">Status</li>
          </ul>
        </div>

        <div
          id="style-3"
          className="items flex flex-col gap-2 sm:gap-3 custom-xl:gap-5 custom-xl:mt-6 overflow-y-scroll h-[40rem] custom-2xl:h-[45rem] pr-2 custom-xl:pr-10    "
        >
          {sortedBookings.filter((booking:any) => booking.IsTrialSession === false).map((booking: any,index:any) => (
            <div
            key={booking._id}
              className={`bg-[#a296cc]  w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl transition-all transform duration-500  ${
                hover === booking._id
                  ? "h-fit  hover:cursor-pointer"
                  : "h-[60px] sm:h-[107px] overflow-hidden"
              } `}
            >
              <div className="h-[60px] sm:h-[107px] w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl flex items-center justify-between custom-xl:justify-normal  gap-2 sm:gap-5 px-4 custom-lg:px-14 ">
                <div className="w-[14.4rem]  truncate">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-">
                  {booking.student.firstName}
                  </h1>
                  <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                  #{booking?.student?.user.substring(0, 6)}
                  </span>
                </div>

                <div className="w-[14.4rem]  truncate hidden sm:block">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-">
                  {booking?.teacher?.contactInformation?.firstName}
                  </h1>
                  <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                  #{booking?.teacher?.user.substring(0, 6)}
                  </span>
                </div>

                <div className="w-[14.4rem]  truncate hidden custom-2xl:block">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-">
                  {booking?.subjects.join(",")}
                  </h1>
                  <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                  {booking?.level}
                  </span>
                </div>

                <div className="w-[14.4rem]  truncate hidden custom-xl:block">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-">
                  {new Date(booking?.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </h1>
                  <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                  {new Date(booking?.date).toLocaleDateString('en-GB') }
                  </span>
                </div>

                <div className=" gap-4 items-center w-[14rem] hidden custom-lg:flex">
                <div className={`${booking.status === "pending" ? "bg-[#00dae5]":(booking.status === "accepted"&& booking.meetingCompleted === true)?"bg-[#7a6cb7]":booking.status === "rejected"?"bg-[#fc7777]":(booking.status === "accepted")?"bg-[#8653ff]":""} h-[25px] w-[25px] rounded-sm`}>
                    &nbsp;
                  </div>
                  <h1 className="text-white  text-3xl font-medium">

                  {booking.status === "pending" ? "Unconfirmed":
                    (booking.status === "accepted"&& booking.meetingCompleted === true)? "Completed":
                    booking.status === "rejected" ? "Canceled":
                    (booking.status === "accepted")?"Confirmed":"Unconfirmed"
                    }
                    

                  </h1>
                </div>

                <div className="block custom-xl:hidden text-white">
                  <button
                    onClick={() => {
                      setHover((prevHover) =>
                        prevHover ===  booking._id ? null :  booking._id
                      );
                    }}
                  >
                    {hover ===  booking._id ? "Collapse" : "Expand"}
                  </button>
                </div>
              </div>

              <div className="w-[73%] mt-2.5 mx-auto   border-t border-white "></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-4 md:grid-cols-3  w-[85%] mx-auto my-3 custom-xl:hidden">
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Students: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                  {booking.student.firstName}
                  </h1>
                </div>
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    eTutor: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                  {booking?.teacher?.contactInformation?.firstName}
                  </h1>
                </div>
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Subject: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                  {booking?.subjects.join(",")}
                  </h1>
                </div>
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Session date: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                  {new Date(booking?.date).toLocaleDateString('en-US', { weekday: 'long' })} <br />{new Date(booking?.date).toLocaleDateString('en-GB') }
                  </h1>
                </div>

                <div>
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Status: <br />
                  </span>
                  <div className="flex items-center gap-2  ">
                  <div className= {`${booking.status === "pending" ? "bg-[#00dae5]":(booking.status === "accepted"&& booking.meetingCompleted === true)?"bg-[#7a6cb7]":booking.status === "rejected"?"bg-[#fc7777]":(booking.status === "accepted")?"bg-[#8653ff]":""}   h-3 custom-xl:h-4 w-3 custom-xl:w-4 rounded custom-xl:rounded-sm`}>
                      &nbsp;
                    </div>
                    <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    {booking.status === "pending" ? "Unconfirmed":
                    (booking.status === "accepted"&& booking.meetingCompleted === true)? "Completed":
                    booking.status === "rejected" ? "Canceled":
                    (booking.status === "accepted")?"Confirmed":"Unconfirmed"
                    }
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <style jsx>{`
            #style-3::-webkit-scrollbar-track {
              border-radius: 10px;
              background-color: #d2cceb;
            }

            #style-3::-webkit-scrollbar {
              width: 8px;

              background-color: transparent;
            }

            #style-3::-webkit-scrollbar-thumb {
              border-radius: 10px;

              background-color: #685aad;
            }
          `}</style>
        </div>
      </section>

      {ispopupopen && activetab === "" && (
        <div className="popup  h-[29.5rem] rounded-3xl  py-8 px-10 w-[40.25rem] bg-[#ede8fa] z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-[#fb8384] text-[40px] leading-none font-bold">
            Select an Action
          </h1>
          <p className="text-[#7669b5] text-lg mt-5 leading-tight">
            Choose the action you want to take for this transaction. You will
            need to <br /> enter your admin passkay to proceed
          </p>

          <div className=" mt-8 flex flex-col gap-5">
            <div
              onClick={() => {
                setActivetab("comment");
              }}
              className="border-2 border-[#c5bee3] group capitalize flex justify-between items-center rounded-xl py-[22px] pl-12 pr-9 hover:shadow-[0_0_8px_rgba(0,0,0,0.2)] hover:cursor-pointer"
            >
              <h1 className="text-xl text-[#8376bc] group-hover:font-medium group-hover:text-[#685AAD] ">
                Add a comment
              </h1>
              <Image  loading="lazy" 
                src={CommentIcon}
                alt=""
                className="w-7 h-7   hidden group-hover:block"
              />
              <Image  loading="lazy" 
                src={commentIconInactive}
                alt=""
                className="w-7 h-7 block group-hover:hidden"
              />
            </div>
            <div className="border-2 border-[#c5bee3] group capitalize flex justify-between items-center rounded-xl py-[22px] pl-12 pr-9 hover:shadow-[0_0_8px_rgba(0,0,0,0.2)] hover:cursor-pointer">
              <h1 className="text-xl text-[#8376bc] group-hover:font-medium group-hover:text-[#685AAD] ">
                Flag This Transaction
              </h1>
              <Image  loading="lazy" 
                src={bookmarkActive}
                alt=""
                className="w-7 h-7   hidden group-hover:block"
              />
              <Image  loading="lazy" 
                src={BOokMark}
                alt=""
                className="w-7 h-7 block group-hover:hidden"
              />
            </div>
            <div className="border-2 border-[#c5bee3] group capitalize flex justify-between items-center rounded-xl py-[22px] pl-12 pr-9 hover:shadow-[0_0_8px_rgba(0,0,0,0.2)] hover:cursor-pointer">
              <h1 className="text-xl text-[#8376bc] group-hover:font-medium group-hover:text-[#685AAD] ">
                Report This Transaction
              </h1>
              <Image  loading="lazy" 
                src={reportIconActive}
                alt=""
                className="w-7 h-7   hidden group-hover:block"
              />
              <Image  loading="lazy" 
                src={reportIcon}
                alt=""
                className="w-7 h-7 block group-hover:hidden"
              />
            </div>
          </div>
        </div>
      )}
      {ispopupopen && activetab === "comment" && (
        <div className="popup w-[46.75rem] min-h-[28.4rem] rounded-3xl  py-8 px-10  bg-[#ede8fa] z-50 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex justify-between w-full">
            <h1 className="text-[#fb8384] text-[40px] leading-none font-bold">
              Leave a Comment
            </h1>
            <Image  loading="lazy" 
              onClick={() => {
                setispopupopen(false);
                setActivetab("");
              }}
              src={crossIcon}
              alt=""
              className="w-8 h-8 hover:cursor-pointer"
            />
          </div>
          <p className="text-[#7669b5] text-lg mt-5 leading-tight">
            Provide internal notes or feedback about this transaction. These
            comments <br /> will be recorded and visible to other admins for
            future reference.
          </p>

          <textarea
            className="mt-6 w-full outline-none focus:ring-0  rounded-xl border-2 border-[#d7d1ed] text-[#afa7d5] placeholder:text-[#afa7d5] p-5 font-medium text-xl bg-[#f6f4fd]"
            placeholder="Add a Comment"
            name=""
            id=""
            rows={4}
          ></textarea>

          <div className=" mt-5 flex justify-between">
            <div className="input  h-[63px]  rounded-lg border-2 border-[#d7d1ed] overflow-hidden relative max-w-[23.1rem] w-full">
              <input
                type="text"
                className="h-full w-full px-6 outline-none focus:ring-0   text-xl text-[#afa7d5] "
                placeholder="enter Pass Key"
              />
              <Image  loading="lazy" 
                src={keyIcon}
                alt=""
                className="absolute right-6 top-1/2 transform  -translate-y-1/2"
              />
            </div>

            <button
              onClick={() => {
                setispopupopen(false);
                setActivetab("");
              }}
              className="px-12 py-4 rounded-md  bg-[#8653FF] max-w-[17rem] text-white text-xl  w-full"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaidSessions;
