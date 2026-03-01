



    import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import searchicon from "../../../../public/whiteSearchIcon.svg";

import badge from "../../../../public/level-10.svg";
import QualificationFile from "../../../../public/qualificationFile.svg";
import LinkOpener from "../../../../public/LinkOPener.svg";
import infoIcon from "../../../../public/infoIconAdmin.svg";
import { usePauseTutoring } from "../hooks/usePauseTutoring";
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
function PauseRequest() {

  
  const {PauseTutoring , isLoading, error } = usePauseTutoring();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [hover1, sethover1] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [ispopupopen, setispopupopen] = useState(false);
  const [activetab, setActivetab] = useState("");
  const [iconHover, seticonHover] = useState(false)
  
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (isLoading )
    return <p>Loading...</p>;
  if (error )
    return <p>Error loading students: {error.message}</p>;









  const updatePauseRequestStatus = async (id: string, status: "approved" | "declined", adminComments?: string) => {
    const payload = {
      id,
      status,
      adminComments,
    };
  
    try {
      const response = await fetch("/api/pause-tutoring/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
       
      } else {
        console.error("Failed to update status:", data);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  


  return (
    <div className="mt-10 bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-fit  px-3 custom-xl:px-10  py-3 custom-xl:py-10  relative">
      <div className="flex justify-between  custom-xl:items-center flex-wrap  gap-y-4 ">
        <div className="flex gap-4 items-center">
            <div className="flex items-end gap-5">

          <h1 className="text-xl sm:text-3xl custom-lg:text-[45px] text-[#685aad] font-medium leading-normal">
          Pa.Requests
          </h1>
        
          <div className="min-w-fit relative">
          <Image  loading="lazy" 
            onMouseEnter={() => {
                seticonHover(true);
            }}
            onMouseLeave={() => {
                seticonHover(false);
            }}
            src={infoIcon}
            alt=""
            className="w-4  hover:cursor-pointer"
          />
          <div
            className={`absolute w-fit -top-14 right-2 bg-[#7669b5] px-3.5 py-1.5 text-xl  rounded-xl text-white transition-all duration-700 transform  origin-bottom-right  ${
              iconHover ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            Pause&nbsp;Requests
          </div>
        </div>
            </div>
          <div className="border-2 custom-xl:border-8 border-[#b4a5d7] text-[#8376bc] rounded-md md:rounded-xl custom-xl:rounded-2xl text-base sm:text-lg md:text-2xl custom-lg:text-4xl font-bold px-5 py-0.5">
            {PauseTutoring?.filter((pause:any)=>pause.status === "pending").length}
          </div>
        </div>

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

      <section className="  mt-3 custom-xl:mt-12  leading-none  overflow-hidden">
        <div className="hidden custom-xl:block">
          <ul className=" flex  gap-4  w-full  font-medium text-[#685aad] text-2xl ">
            <li className="w-full max-w-[8.5%]  "></li>
            <li className="w-full max-w-[7%]">eTutor</li>
            <li className="w-full max-w-[7%]"></li>
            <li className="w-full max-w-[20%]">Time with Us</li>
            <li className="w-full max-w-[13.5rem]">PDF file</li>
          </ul>
        </div>

        <div
          id="style-3"
          className="items flex flex-col gap-2 sm:gap-3 custom-xl:gap-5 custom-xl:mt-7 overflow-y-scroll h-[40rem] custom-2xl:h-[45rem] pr-2 custom-xl:pr-10    "
        >
          {PauseTutoring.filter((pause:any)=>pause.status === "pending").map((pause:any,index:any) => (
            <div
              key={index}
              className={`bg-[#a296cc]  w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl transition-all transform duration-500  ${
                hover === index
                  ? "h-fit   hover:cursor-pointer"
                  : "h-[60px] sm:h-[107px] overflow-hidden"
              } `}
            >
              <div className="h-[60px] sm:h-[107px] w-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl px-4 custom-lg:pl-9 custom-lg:pr-6 custom-lg:px-0  flex justify-between items-center gap-4 custom-2xl:gap-10">
                <div className="flex items-center justify-between custom-xl:justify-between  gap-2 sm:gap-5 w-full">
                  <div className="flex gap-4">
                    <div className="">
                      <div className="border rounded-full h-[40px] md:h-[68px] w-[40px] md:w-[68px] overflow-hidden">
                        <img src={pause?.user?.profilePicture} alt="" className="" />
                      </div>
                    </div>

                    <div className="sm:max-w-[63%]  truncate">
                      <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-medium capitalize">
                        {pause?.teacher?.contactInformation?.firstName}
                      </h1>
                      <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                        #{pause.user._id.substring(0,6)}
                      </span>
                    </div>
                  </div>

                  <div className="w-[32%] truncate  hidden custom-2xl:flex flex-col  items-start  ">
                    <h1 className="text-white  text-3xl font-[450]">Member Since</h1>
                    <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                      {new Date(pause?.user?.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>

                  <div className=" gap-4 items-center  hidden custom-2xl:flex">
                    <div className="flex gap-3 justify-between items-center bg-[#ede8fa] py-4 px-5 rounded-xl">
                      <Image  loading="lazy" 
                        src={QualificationFile}
                        alt=""
                        className="w-[38px]"
                      />
                      <span className="text-[#685aad] text-xl truncate font-medium max-w-[4.9rem]">
                        File Nameaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </span>
                      <Image  loading="lazy"  src={LinkOpener} alt="" className="w-[23px]" />
                    </div>
                  </div>
                </div>

                <div className="   gap-2 hidden custom-lg:flex ">
                  <button 
                     onClick={(e)=>{
                      updatePauseRequestStatus(pause._id,"declined","")
                    }}
                  className="bg-[#fc7777] text-sm sm:text-base md:text-lg custom-lg:text-2xl text-white px-4 sm:px-8 custom-lg:px-12 py-1 sm:py-2 custom-lg:py-4 rounded-md custom-lg:rounded-xl">
                    Decline
                  </button>
                  <button
                  
                  onClick={(e)=>{
                    updatePauseRequestStatus(pause._id,"approved","")
                  }}
                  className="bg-[#8653ff] text-sm sm:text-base md:text-lg custom-lg:text-2xl text-white px-4 sm:px-8 custom-lg:px-11 py-1 sm:py-2 custom-lg:py-4 rounded-md custom-lg:rounded-xl">
                    Approve
                  </button>
                </div>

                <div className="block custom-2xl:hidden text-white text-sm sm:text-base md:text-xl custom-lg:text-2xl">
                  <button
                    onClick={() => {
                      setHover((prevHover) =>
                        prevHover === index ? null : index
                      );
                    }}
                  >
                    {hover === index ? "Collapse" : "Expand"}
                  </button>
                </div>
              </div>

              <div className="w-[73%] mt-2.5 mx-auto   border-t border-white "></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-4 md:grid-cols-3  w-[85%] mx-auto my-3 custom-2xl:hidden">
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                  Time with Us: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    $2064
                  </h1>
                </div>
                <div className="my-1">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                    PDF file: <br />
                  </span>
                  <div className=" gap-4 items-center  w-fit mt-1">
                    <div className="flex gap-3 justify-between items-center bg-[#ede8fa] py-2 px-2 rounded-sm">
                      <Image  loading="lazy"  src={QualificationFile} alt="" className="w-7" />
                      <span className="text-[#685aad] text-sm truncate font-medium max-w-[5rem]">
                        File Nameaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </span>
                      <Image  loading="lazy"  src={LinkOpener} alt="" className="w-4" />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="   gap-2 flex">
                    <button className="bg-[#fc7777] text-sm sm:text-base md:text-lg custom-lg:text-2xl text-white px-4 sm:px-8 custom-lg:px-12 py-1 sm:py-2 custom-lg:py-4 rounded-md custom-lg:rounded-xl">
                      Decline
                    </button>
                    <button className="bg-[#8653ff] text-sm sm:text-base md:text-lg custom-lg:text-2xl text-white px-4 sm:px-8 custom-lg:px-11 py-1 sm:py-2 custom-lg:py-4 rounded-md custom-lg:rounded-xl">
                      Approve
                    </button>
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
    </div>
  );
}

export default PauseRequest;
