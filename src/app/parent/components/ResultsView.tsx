import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import searchicon from "../../../../public/search icon.svg";
import level1 from "../../../../public/level-1.svg";
import level2 from "../../../../public/level-2.svg";
import level3 from "../../../../public/level-3.svg";
import level4 from "../../../../public/level-4.svg";
import level5 from "../../../../public/level-5.svg";
import level6 from "../../../../public/level-6.svg";
import level7 from "../../../../public/level-7.svg";
import level8 from "../../../../public/level-8.svg";
import level9 from "../../../../public/level-9.svg";
import level10 from "../../../../public/level-10.svg";
function ResultsView({
    toggleDropdown,
    isOpen,
    options,
    selectedOption,
    handleOptionClick,
    searchTeachers,
    teacher,
    searchParams,
    handleInputChange,
    filteredTutors,
    handleBackToSearch,
    handleViewProfile,
    setIsOpen
}: any) {
    return (
        <div className="bg-[#EDE8FA] w-full h-full rounded-3xl px-8 py-6">
            <div className="flex  mt-8 justify-between ">
                <h1 className="text-5xl font-bold text-[#685AAD] px-1 mb-3">
                    Find your eTutor
                </h1>
                <div className="hidden custom-xl:flex flex-wrap justify-end   gap-8 w-fit flex-col custom-xl:flex-row ">
                    <div className="relative order-2 custom-xl:order-1  h-fit   w-full custom-xl:w-fit">
                        <div
                            className={`bg-[#DBCAFF] text-[#8c7bc4] text-xs sm:text-sm pl-14 pr-12 py-3.5 transition-all duration-500 rounded-full cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[21.5rem] ${isOpen
                                ? "border  border-[#a394d6]"
                                : "border border-transparent"
                                } `}
                            onClick={toggleDropdown}
                        >
                            <span>
                                {options.find((option: any) => option.value === selectedOption)
                                    ?.label || "sort by"}
                            </span>
                            {isOpen ? (
                                <ChevronUp className="text-[#a394d6]" />
                            ) : (
                                <ChevronDown className="text-[#a394d6]" />
                            )}
                        </div>

                        {isOpen && (
                            <div
                                onMouseLeave={() => {
                                    setIsOpen(false);
                                }}
                                className="py-3 max-w-[90%] w-full transition-all duration-500  absolute top-full left-0 m-auto  bg-[#DBCAFF] border  border-[#a394d6] px-5 text-[#8f81c7] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-xl shadow-lg z-10  h-fit"
                            >
                                <ul
                                    id="style-2"
                                    className=" overflow-y-auto max-h-[13rem] scrollstyle   "
                                >
                                    {options.map((option: any) => (
                                        <li
                                            key={option.value}
                                            className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#8f81c7]  text-[#6C5BAA] text-sm max-w-[10.9rem]   ${selectedOption === option.value ? "" : ""
                                                }`}
                                            onClick={() => {
                                                handleOptionClick(option.value);

                                                searchTeachers(teacher, searchParams);
                                            }}
                                            onMouseLeave={() => {
                                                searchTeachers(teacher, searchParams);
                                            }}
                                            onMouseDown={() => {
                                                searchTeachers(teacher, searchParams);
                                            }}
                                        >
                                            <span className="pl-1">{option.label}</span>
                                        </li>
                                        // <div className="border-b border-[#8f81c7] w-full"></div>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* ---------search bar top------- */}
                    <div className="relative w-fit  h-fit order-1 custom-xl:order-2">
                        <input
                            type="text"
                            placeholder="Search by eTutor's"
                            className=" bg-[#DBCAFF] text-[#a394d6] placeholder-[#a394d6] px-10  py-3.5 rounded-full border border-transparent w-full  custom-xl:w-[24.8rem] focus:outline-none focus:ring-0"
                            value={searchParams.searchTerm}
                            // @ts-ignore
                            onChange={(e: any) => {
                                e.preventDefault();
                                handleInputChange("searchTerm", e.target.value);
                            }}
                        />
                        <Image
                            loading="lazy"
                            src={searchicon}
                            className="absolute right-9 top-1/2 transform -translate-y-1/2 text-[#6949ff] w-4 h-4 "
                            alt={""}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={handleBackToSearch}
                className="mb-4 flex items-center text-[#6949ff] hover:underline"
            >
                <ArrowLeft className="mr-2" /> Back to Search
            </button>

            <div className="flex flex-col gap-4 custom-lg:gap-9">
                {filteredTutors?.length > 0 &&
                    filteredTutors?.map((teacher: any) => (
                        <div
                            // @ts-ignore
                            key={teacher?._id}
                            className="flex flex-col custom-xl:flex-row  justify-between bg-[#A296CC] rounded-3xl px-8 py-6 gap-6"
                        >
                            <div className="  h-fit  w-full custom-xl:max-w-[20rem] ">
                                <div className="flex flex-col sm:flex-row justify-start items-center gap-6">
                                    <img
                                        // @ts-ignore
                                        src={teacher?.user?.profilePicture || ""}
                                        alt=""
                                        // width={24}
                                        // height={24}
                                        className="w-24 h-24 rounded-full sm:mb-4 "
                                    />

                                    <div>
                                        <h2 className="text-lg sm:text-3xl font-semibold  sm:text-start text-center capitalize">
                                            {
                                                // @ts-ignore
                                                teacher?.contactInformation?.firstName
                                            }{" "}
                                            {
                                                // @ts-ignore
                                                teacher?.contactInformation?.lastName
                                            }
                                        </h2>
                                        <p className="text-md sm:text-2xl  text-[#534988] sm:text-start text-center">
                                            Bio
                                        </p>
                                        <p className="text-md sm:text-2xl font-bold  text-[#534988] sm:text-start text-center">
                                            $20.00 Per Session
                                        </p>
                                    </div>
                                </div>

                                <div className=" flex flex-col items-center sm:items-start">
                                    <div className="mt-2 flex flex-col items-center sm:items-start">
                                        <h3 className="text-lg text-white">Availability:</h3>
                                        <p className="text-lg text-[#473171] text-center sm:text-start flex">
                                            {Object.keys(teacher?.experience?.generalAvailability || {})
                                                .slice(0, 3)
                                                .map((day, index, array) => (
                                                    <div key={day} className="flex flex-row">
                                                        <h3 className="flex">
                                                            {day}
                                                            {index < array.length - 1 && ','}
                                                        </h3>
                                                    </div>
                                                ))}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-col items-center sm:items-start">
                                        <h3 className="text-lg text-white">Subjects:</h3>
                                        <p className="text-lg text-[#473171] text-center sm:text-start">
                                            {
                                                // @ts-ignore
                                                // teacher?.education?.major
                                                teacher?.experience?.subjectsTutored
                                                    .map((subject: any) => subject)
                                                    .join(",")
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="  custom-xl:max-w-[36rem] w-full ">
                                <h3 className="text-lg ">About me</h3>
                                <p className="text-lg text-[#473171]">
                                    {
                                        // @ts-ignore
                                        teacher?.aboutyou || ""
                                    }
                                </p>

                                <h3 className="text-lg  mt-6">Study</h3>
                                <p className="text-lg text-[#473171]">
                                    {
                                        // @ts-ignore
                                        teacher?.education?.degree
                                    }
                                </p>

                                <h3 className="text-lg  mt-6">Teaching Experience</h3>
                                <p className="text-lg text-[#473171]">
                                    {
                                        // @ts-ignore
                                        teacher?.experience?.tutoringExperience || "Not Available"
                                    }
                                </p>
                            </div>

                            <div className="flex custom-xl:flex-col items-center justify-between  flex-row w-full custom-xl:w-32 ">
                                <div className="w-16 h-16  sm:min-w-32 sm:min-h-32">
                                    <Image
                                        loading="lazy"
                                        src={
                                            teacher?.level == "1"
                                                ? level1
                                                : teacher?.level == "2"
                                                    ? level2
                                                    : teacher?.level == "3"
                                                        ? level3
                                                        : teacher?.level == "4"
                                                            ? level4
                                                            : teacher?.level == "5"
                                                                ? level5
                                                                : teacher?.level == "6"
                                                                    ? level6
                                                                    : teacher?.level == "7"
                                                                        ? level7
                                                                        : teacher?.level == "8"
                                                                            ? level8
                                                                            : teacher?.level == "9"
                                                                                ? level9
                                                                                : teacher?.level == "10"
                                                                                    ? level10
                                                                                    : level1
                                        }
                                        alt=""
                                        className="w-full h-full "
                                    />
                                </div>

                                <button
                                    onClick={() => handleViewProfile(teacher)} // Pass the entire tutor object
                                    className="bg-[#8558F9] text-white py-2 px-6 rounded-full custom-xl:w-full hover:bg-purple-700 transition-colors"
                                >
                                    More info
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

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
    );
}

export default ResultsView;
