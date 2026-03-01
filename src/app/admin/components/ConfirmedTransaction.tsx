"use client"
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
function PendingTransection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [hover1, sethover1] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [ispopupopen, setispopupopen] = useState(false);
  const [activetab, setActivetab] = useState("")
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="">
      <div className="flex justify-between  custom-xl:items-center flex-wrap  gap-y-4 ">
        <h1 className="text-xl sm:text-3xl custom-lg:text-[45px] text-[#685aad] font-medium leading-normal">
          Confirmed Transactions
        </h1>

        <div className="flex  justify-end   gap-2 custom-lg:gap-7  w-fit   flex-col custom-lg:flex-row  ">
          {/* ---------search bar top------- */}
          <div className="relative w-fit  h-fit truncate ">
            <input
              type="text"
              placeholder="Search by name,or ID"
              className=" bg-[#a296cc] text-[#d1cbe6] truncate placeholder-[#d1cbe6] text-xl px-5  custom-lg:px-10  py-2 custom-lg:py-4 rounded-md border border-transparent w-full  custom-xl:w-[24.4rem] focus:outline-none focus:ring-0"
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
                {options.find((option) => option.value === sortConfig.key)
                  ?.label || "sort by"}
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

      <div className="mt-3 custom-xl:mt-6 flex justify-between !items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[67px]   leading-none text-[#9a8fca] font-medium">
          $45289.54
        </h1>
        <div className="border-2 custom-xl:border-8 border-[#b4a5d7] text-[#8376bc] rounded-md md:rounded-xl custom-xl:rounded-2xl text-base sm:text-lg md:text-2xl custom-lg:text-4xl font-bold px-5 py-0.5">
          120
        </div>
      </div>

      <section className="  mt-3 custom-xl:mt-8  leading-none  overflow-hidden">
        <div className="hidden custom-xl:block">
          <ul className=" flex  gap-4  w-full  font-medium text-[#685aad] text-2xl ">
            <li className="w-full max-w-[8.5%]  "></li>
            <li className="w-full max-w-[14.7rem]">User</li>
            <li className="w-full max-w-[11.3rem]">Date</li>
            <li className="w-full max-w-[13.5rem]">Transaction ID</li>
            <li className="w-full max-w-[14.4rem]">Transaction Type</li>
            <li className="w-full min-w-fit">Amount</li>
          </ul>
        </div>

        <div
          id="style-3"
          className="items flex flex-col gap-2 sm:gap-3 custom-xl:gap-5 custom-xl:mt-6 overflow-y-scroll h-[40rem] custom-2xl:h-[45rem] pr-2 custom-xl:pr-10    "
        >
          {a.map((index) => (
            <div
              onMouseEnter={() => {
                if (window.innerWidth > 1280) {
                  setHover(index);
                }
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 1280) {
                  setHover(null);
                }
              }}
              key={index}
              className={`bg-[#a296cc]  w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl transition-all transform duration-500  ${
                hover === index
                  ? "h-fit custom-xl:h-fit  hover:cursor-pointer"
                  : "min-h-[60px] sm:min-h-[107px] overflow-hidden"
              } `}
            >
              <div className="h-[60px] sm:h-[107px] w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl flex items-center justify-between custom-xl:justify-normal  gap-2 sm:gap-5 px-4 custom-lg:px-9 ">
                <div className="">
                  <div className="border rounded-full h-[40px] md:h-[68px] w-[40px] md:w-[68px] overflow-hidden">
                    <img src="/badge.svg" alt="" />
                  </div>
                </div>

                <div className="w-[14.4rem]  truncate">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-">
                    Same Jhonson
                  </h1>
                  <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                    #8004939
                  </span>
                </div>

                <div className="w-[11rem]  hidden custom-xl:block">
                  <h1 className="text-white  text-3xl font-[450]">Tuesday</h1>
                  <span className="text-white text-xl leading-none">
                    16/09/2024
                  </span>
                </div>

                <div className="w-[13.4rem] hidden custom-xl:block">
                  <h1 className="text-white  text-3xl font-medium">A25458</h1>
                </div>

                <div className=" gap-4 items-center w-[14rem] hidden custom-lg:flex">
                  <div className="bg-[#fc7777] h-[25px] w-[25px] rounded-sm">
                    &nbsp;
                  </div>
                  <h1 className="text-white  text-3xl font-medium">Payout</h1>
                </div>

                <div className="w-[7rem]  hidden md:block">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-medium">
                    $2064
                  </h1>
                </div>

                <div
                  className={`w-fit relative   ${
                    hover === index ? "custom-xl:block " : "hidden"
                  }`}
                >
                  <span className="flex flex-col gap-2">
                    <Image  loading="lazy" 
                      onMouseEnter={() => {
                        sethover1(index);
                      }}
                      onMouseLeave={() => {
                        sethover1(null);
                      }}
                      src={downloadReport}
                      alt=""
                      className="w-7  hover:cursor-pointer"
                    />
                    <Image  loading="lazy" 
                      onClick={() => {
                        setispopupopen(true);
                      }}
                      src={dots}
                      alt=""
                      className="w-7  hover:cursor-pointer"
                    />
                  </span>
                  <div
                    className={`absolute w-fit text-nowrap -top-12  z-50 right-1 bg-[#7669b5] px-3.5 py-1.5 text-xl  rounded-xl text-white transition-all duration-700 transform  origin-bottom-right  ${
                      hover1 === index
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }`}
                  >
                    Download Report
                  </div>
                </div>

                <div className="block custom-xl:hidden text-white">
                  <button
                    onClick={() => {
                      setHover((prevHover) =>
                        prevHover === index ? null : index
                      );
                    }}
                  >
                    {hover ? "Collapse" : "Expand"}
                  </button>
                </div>
              </div>

              <div className="w-[73%] mt-2.5 mx-auto   border-t border-white "></div>

              <div className="h-1 md:h-2  bg-[#C3BAF3] mt-4 sm:mt-10 w-[85%] mx-auto relative rounded-full">
                <div className="h-full bg-[#8458F8] w-1/2">&nbsp; </div>
                <div className="w-full absolute top-1/2  -translate-y-1/2  flex justify-between">
                  <div className="h-4 md:h-7 w-4 md:w-7 bg-[#8458F8] p-1 rounded-full flex items-center justify-center">
                    <div className=" rounded-full bg-white h-2 md:h-4 w-2 md:w-4"></div>
                  </div>
                  <div className="h-4 md:h-7 w-4 md:w-7 bg-[#8458F8] p-1 rounded-full flex items-center justify-center">
                    <div className=" rounded-full bg-white h-2 md:h-4 w-2 md:w-4"></div>
                  </div>

                  

                  <div className="h-4 md:h-7 w-4 md:w-7 bg-[#C3BAF3] p-1 rounded-full flex items-center justify-center">
                    <div className=" rounded-full bg-transparent h-2 md:h-4 w-2 md:w-4"></div>
                  </div>
                </div>
              </div>
              <div className="   mt-3 w-[85%] mx-auto relative rounded-full flex justify-between">
                <span className="text-[#C3BAF3] font-normal text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                  Pending <br />{" "}
                  <span className="font-normal text-xs sm:text-sm custom-xl:text-base">
                    {" "}
                    16/02/2023
                  </span>
                </span>
                <span className="text-white font-medium text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                  Confirmed <br />
                  <span className="font-normal text-xs sm:text-sm custom-xl:text-base">
                    {" "}
                    16/02/2023
                  </span>
                </span>
                <span className="text-[#C3BAF3] font-normal text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                  Loading
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-4 md:grid-cols-3  w-[85%] mx-auto my-3 custom-xl:hidden">
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Amount: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    $2064
                  </h1>
                </div>
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Date: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    02/01/2022
                  </h1>
                </div>
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Transaction ID: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    A1234
                  </h1>
                </div>

                <div>
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    Transaction Type: <br />
                  </span>
                  <div className="flex items-center gap-2  ">
                    <div className="bg-[#fc7777] h-3 custom-xl:h-4 w-3 custom-xl:w-4 rounded custom-xl:rounded-sm">
                      &nbsp;
                    </div>
                    <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                      Payout
                    </h1>
                  </div>
                </div>
              </div>

              <div className="  flex justify-between flex-col custom-xl:flex-row text-white w-[85%] custom-xl:w-[95%] mx-auto ">
                <div className="py-6 custom-xl:py-0 custom-xl:pl-16 custom-xl:pt-7 order-2 custom-xl:order-1">
                  <h1 className="text-sm sm:text-base custom-lg:text-lg custom-xl:text-xl font-medium">
                    Confirmation Information:
                  </h1>
                  <ul className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl space-y-1 list-disc ml-5  custom-lg:ml-8">
                    <li>Confirmation ID:xxxxxxxxxx</li>
                    <li>Confirmed By:xxxxx</li>
                    <li>Transaction Reference:xxxx</li>
                  </ul>
                </div>
                <div className="border-2 custom-xl:border-2 md:border-4 border-[#c3baf3] w-full order-1 custom-xl:order-2 rounded-md md:rounded-xl custom-xl:rounded-3xl  custom-xl:max-w-[29.5rem] px-3 custom-lg:px-6 py-3 custom-lg:py-6  flex flex-col gap-2">
                  <span>
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                      Bank Name:
                    </span>{" "}
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                      xxxxxxxxx
                    </span>
                  </span>

                  <span>
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                      Transaction ID:
                    </span>{" "}
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                      xxxxxxxxx
                    </span>
                  </span>
                  <span>
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                      Currency and Amount:
                    </span>{" "}
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                      xxxxxxxxx
                    </span>
                  </span>
                  <span>
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                      Initiator Information:
                    </span>{" "}
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                      xxxxxxxxx
                    </span>
                  </span>
                  <span>
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                      Account Number:
                    </span>{" "}
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl">
                      xxxxxxxxx
                    </span>
                  </span>
                </div>
              </div>


              <div className=" mb-6 flex justify-between flex-col custom-xl:flex-row text-white w-[80%] custom-xl:w-[85%] mx-auto " >
                  <span className="border-2 custom-xl:border-2 md:border-4 border-[#c3baf3] w-full order-1 custom-xl:order-2 rounded-md md:rounded-xl custom-xl:rounded-3xl  custom-xl:max-w-[29.5rem] px-3 custom-lg:px-6 py-3 custom-lg:py-6  flex flex-col gap-2">
                    <span className="text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                      comment
                    </span>
                    <span className="text-xs sm:text-sm custom-lg:text-lg">

                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, odit!
                    </span>
                  </span>

              
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
              onClick={()=>{
                setActivetab("comment")
              }}
            className="border-2 border-[#c5bee3] group capitalize flex justify-between items-center rounded-xl py-[22px] pl-12 pr-9 hover:shadow-[0_0_8px_rgba(0,0,0,0.2)] hover:cursor-pointer">
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
          onClick={()=>{
            setispopupopen(false)
            setActivetab("")
          }}
          src={crossIcon} alt=""  className="w-8 h-8 hover:cursor-pointer"/>
          </div>
          <p className="text-[#7669b5] text-lg mt-5 leading-tight">
          Provide internal notes or feedback about this transaction. These comments <br /> will be recorded and visible to other admins for future reference.
          </p>

          <textarea className="mt-6 w-full outline-none focus:ring-0  rounded-xl border-2 border-[#d7d1ed] text-[#afa7d5] placeholder:text-[#afa7d5] p-5 font-medium text-xl bg-[#f6f4fd]" placeholder="Add a Comment" name="" id=""  rows={4}></textarea>
          
          <div className=" mt-5 flex justify-between">

            <div className="input  h-[63px]  rounded-lg border-2 border-[#d7d1ed] overflow-hidden relative max-w-[23.1rem] w-full">
              <input type="text" className="h-full w-full px-6 outline-none focus:ring-0   text-xl text-[#afa7d5] "  placeholder="enter Pass Key"/>
              <Image  loading="lazy"  src={keyIcon} alt="" className="absolute right-6 top-1/2 transform  -translate-y-1/2" />
            </div>


            <button
             onClick={()=>{
              setispopupopen(false)
              setActivetab("")
            }}
            className="px-12 py-4 rounded-md  bg-[#8653FF] max-w-[17rem] text-white text-xl  w-full">
            Add Comment
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default PendingTransection;
