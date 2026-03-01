



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
import badge from "../../../../public/level-10.svg";

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
function EachTutorEarnings() {
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
    <div className="bg-[#ede8fa] rounded-md sm:rounded-xl  custom-lg:rounded-3xl h-fit  px-3 custom-xl:px-10  py-3 custom-xl:py-6  relative mt-10">
      <div className="flex justify-between  custom-xl:items-center flex-wrap  gap-y-4 ">
        <h1 className="text-xl sm:text-3xl custom-lg:text-[45px] text-[#685aad] font-medium leading-normal">
        eTutors earnings 
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

      

      <section className="  mt-3 custom-xl:mt-12  leading-none  overflow-hidden">
        <div className="hidden custom-xl:block">
          <ul className=" flex  gap-4  w-full  font-medium text-[#685aad] text-2xl ">
            <li className="w-full max-w-[8.5%]  "></li>
            <li className="w-full max-w-[14.7rem]">eTutor</li>
            <li className="w-full max-w-[7%]"></li>
            <li className="w-full max-w-[11.3rem]">Level</li>
            <li className="w-full max-w-[13.5rem]">Grade</li>
            <li className="w-full min-w-fit">Earnings</li>
          </ul>
        </div>

        <div
          id="style-3"
          className="items flex flex-col gap-2 sm:gap-3 custom-xl:gap-5 custom-xl:mt-7 overflow-y-scroll h-[40rem] custom-2xl:h-[45rem] pr-2 custom-xl:pr-10    "
        >
          {a.map((index) => (
            <div
             
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
                    <Image  loading="lazy"  src={badge} alt="" className="" />
                  </div>
                </div>

                <div className="w-[16.2rem]  truncate">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-">
                    Same Jhonson
                  </h1>
                  <span className="text-white text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl leading-none">
                    #8004939
                  </span>
                </div>

                <div className="w-[16rem]  hidden custom-xl:flex gap-4 items-center">
                    <Image  loading="lazy"  src={badge} alt="" className="w-16" />
                  <h1 className="text-white  text-3xl font-[450]">Tuesday</h1>
                
                </div>

             

                <div className=" gap-4 items-center w-[13.3rem] hidden custom-lg:flex">
                
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-medium">
                    $2064
                  </h1>
                </div>

                <div className="w-[7rem]  hidden md:block">
                  <h1 className="text-white  text-sm sm:text-base md:text-xl custom-lg:text-2xl custom-xl:text-3xl font-medium">
                    $2064
                  </h1>
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

              
             

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-4 md:grid-cols-3  w-[85%] mx-auto my-3 custom-xl:hidden">
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                  Level: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    $2064
                  </h1>
                </div>
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                  Grade: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    02/01/2022
                  </h1>
                </div>
                <div className="">
                  <span className="font-medium text-[#685aad] text-xs sm:text-sm custom-xl:text-base ">
                  Earnings: <br />
                  </span>
                  <h1 className="text-white  text-xs sm:text-sm custom-lg:text-lg custom-xl:text-xl font-medium">
                    A1234
                  </h1>
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

export default EachTutorEarnings;

