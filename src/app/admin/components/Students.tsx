import React, { useState } from "react";
import searchicon from "../../../../public/searchIconLightPurple.svg";
import ProfileLogo from "../../../../public/profileLogoWHite.svg";
import Chat from "../../../../public/chatLogoWHite.svg";
import Activity from "../../../../public/activityLogoWHite.svg";
import SettingIcon from "../../../../public/SettingIconPurple.svg";
import filledStar from "../../../../public/filled Star.svg";
import unfilledStar from "../../../../public/unfilledStar.svg";
import Image from "next/image";
import { useStudents } from "../hooks/useStudents";
import { useParent } from "../hooks/useParents";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
const options = [
  { value: "students", label: "Student Accounts" },
  { value: "parent", label: "Parent Accounts" },
  { value: "all", label: "All" },
];
const options2 = [
  { value: "nameAsc", label: "Name (A-Z)" },
  { value: "nameDesc", label: "Name (Z-A)" },
  { value: "dateAsc", label: "Date (Oldest First)" },
  { value: "dateDesc", label: "Date (Newest First)" },
 
];


function Students() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [Expand, setExpand] = useState<any>(null);
  const [managePricing, SetmanagePricing] = useState(false);
  
  const { students, isLoading, error } = useStudents();
  const { parent, isLoading2, error2 } = useParent();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [sortConfig, setSortConfig] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig2, setsortConfig2] = useState({
    key: "",
    direction: "ascending",
  });
  const [loadingIcon, setLoadingIcon] = useState<any | undefined>(null);
  const [loading, setloading] = useState<any | undefined>(null);
  const [isOpen2, setisOpen2] = useState(false);
  const toggleDropdown2 = () => {
    setisOpen2(!isOpen2);
  };

  if (isLoading || isLoading2) return <p>Loading...</p>;
  if (error || error2) return <p>Error loading students: {error.message}</p>;




   // handle impersonate to visit the particular studen/parent/teacher profile------------------------------------------------
   const handleNavigate = async (role: string) => {
    setTimeout(() => {
      if (role === "student") {
        router.push("/studentdashboard/studentprofile");
      } else if (role === "parent") {
        router.push("/parent/parentprofile");
      } else if (role === "teacher") {
        router.push("/etutor/profile");
      }
    }, 3000);
  };
  const handleImpersonate = async (
    studentUserId: string,
    StudentEmail: string,
    role: string,
    loadingIcon: any
  ) => {
    setloading(studentUserId);
    setLoadingIcon(loadingIcon);
    await update({
      user: {
        email: StudentEmail,
        role: role,
        id: studentUserId,
        isParent: false,
        isAdmin: true,
      },
    });
  };




 const filteredStudents = students.filter((student: any) =>student.firstName.toLowerCase().includes(searchTerm.toLowerCase())).sort((a: any, b: any) => {
    if (sortConfig2.key === "nameAsc") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortConfig2.key === "nameDesc") {
      return b.firstName.localeCompare(a.firstName);
    } else if (sortConfig2.key === "dateAsc") {
      // @ts-ignore
      return new Date(a.user.createdAt) - new Date(b.user.createdAt);
    } else if (sortConfig2.key === "dateDesc") {
      // @ts-ignore
      return new Date(b.user.createdAt) - new Date(a.user.createdAt);
    }
    return 0; // Default (no sorting applied)
  });

const handleSort = (key:any) => {
  setsortConfig2({
    key,
    direction: key.includes("Asc") ? "ascending" : "descending",
  });
};

  const filteredParents = parent.filter((parent: any) =>parent.firstName.toLowerCase().includes(searchTerm.toLowerCase())).sort((a: any, b: any) => {
    if (sortConfig2.key === "nameAsc") {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortConfig2.key === "nameDesc") {
      return b.firstName.localeCompare(a.firstName);
    } else if (sortConfig2.key === "dateAsc") {
      // @ts-ignore
      return new Date(a.user.createdAt) - new Date(b.user.createdAt);
    } else if (sortConfig2.key === "dateDesc") {
      // @ts-ignore
      return new Date(b.user.createdAt) - new Date(a.user.createdAt);
    }
    return 0; // Default (no sorting applied)
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };










  return (
    <div>
      <div className="flex flex-col   gap-2 custom-lg:gap-2  w-fit    pl-10  absolute  top-16 sm:top-8">
        {/* ---------search bar top------- */}
        <div className="relative w-fit  h-fit truncate ">
          <input
            type="text"
            placeholder="Search by name,or ID"
            className=" bg-[#ede8fa] text-[#9185c4] truncate placeholder-[#9185c4] text-xl px-5  custom-lg:px-10  py-2 custom-lg:py-4 rounded-md border border-transparent w-full  custom-xl:w-[29.4rem] focus:outline-none focus:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Image  loading="lazy" 
            src={searchicon}
            className="absolute right-2 sm:right-4 custom-xl:right-8 top-1/2 transform -translate-y-1/2 text-[#9185c4]  w-4 sm:w-5 h-4 sm:h-5 "
            alt="x"
          />
        </div>

        <div className="relative   h-fit   w-full custom-xl:w-fit ">
          <div
            className={`bg-[#ede8fa] text-[#9185c4]  sm:text-sm pl-5 custom-lg:pl-10 pr-4 custom-lg:pr-8 py-2 custom-lg:py-4 text-xl transition-all duration-500 rounded-md cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[29.4rem] ${
              isOpen ? "border  border-[#a394d6]" : "border border-transparent"
            } `}
            onClick={toggleDropdown}
          >
            <span className="text-xl pl-3 lowercase">
              {selectedOption || "sort by"}
            </span>
            {isOpen ? (
              <ChevronUp className="text-[#9185c4]" />
            ) : (
              <ChevronDown className="text-[#9185c4]" />
            )}
          </div>

          {isOpen && (
            <div
              onMouseLeave={() => {
                setIsOpen(false);
              }}
              className="py-3 max-w-[97%] mx-auto w-full transition-all duration-500  absolute top-full left-0   bg-[#ede8fa] border  border-[#9185c4] px-9 text-[#9185c4] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-md shadow-lg z-10  h-fit"
            >
              <ul
                id="style-2"
                className=" overflow-y-auto max-h-[13rem] scrollstyle   "
              >
                {options.map((option) => (
                  <li
                    onClick={() => {
                      setSelectedOption(option.label);
                      setSortConfig(option.value);
                      setIsOpen(false);
                    }}
                    key={option.value}
                    className={` first:pb-3 first:pt-0 py-3 last:py-0 last:pt-3 cursor-pointer last:border-b-0 border-b border-[#9185c4]  text-[#9185c4] text-lg max-w-[14.9rem]   ${
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









      <div className=" mt-28 py-3 sm:py-6 custom-xl:py-12 px-3 custom-xl:px-7 bg-[#ede8fa] h-full rounded-md sm:rounded-xl  custom-lg:rounded-3xl">
        <div className="flex justify-between items-start flex-wrap">
          <div className="flex gap-8 items-start ">
            <h1 className="text-xl sm:text-3xl custom-lg:text-[50px] text-[#8276bc] font-medium leading-normal pl-5">
              {sortConfig == "all"
                ? "All accounts"
                : sortConfig == "parent"
                ? "Parent accounts"
                : sortConfig == "students"
                ? "Students accounts"
                : "All accounts"}
            </h1>
            <div className="border-2 custom-xl:border-8 border-[#b4a5d7] text-[#8376bc] rounded-md md:rounded-xl custom-xl:rounded-xl text-sm sm:text-base md:text-lg custom-lg:text-xl font-bold px-4 py-0">
              {sortConfig == "all"
                ? students.length + parent.length
                : sortConfig == "parent"
                ? parent.length
                : sortConfig == "students"
                ? students.length
                : students.length + parent.length}
            </div>

           
          </div>
            {/* sortmethods -----------------------*/}
          <div className="mr-5">
            <div className="relative   h-fit   w-full custom-xl:w-fit ">
                <div
                  className={`bg-[#b4a5d7] text-white  sm:text-sm pl-5 custom-lg:pl-10 pr-4 custom-lg:pr-8 py-2 custom-lg:py-4 text-xl transition-all duration-500 rounded-md cursor-pointer select-none   flex items-center justify-between  w-[15rem] custom-lg:w-[24.4rem] ${
                    isOpen2
                      ? "border  border-[#a394d6]"
                      : "border border-transparent"
                  } `}
                  onClick={toggleDropdown2}
                >
                  <span className="text-xl pl-3 lowercase">
                    {options2.find((option) => option.value === sortConfig2.key)
                      ?.label || "sort by"}
                  </span>
                  {isOpen2 ? (
                    <ChevronUp className="text-white" />
                  ) : (
                    <ChevronDown className="text-white" />
                  )}
                </div>

                {isOpen2 && (
                  <div
                    onMouseLeave={() => {
                      setisOpen2(false);
                    }}
                    className="py-5 max-w-[97%] mx-auto w-full transition-all duration-500  absolute top-full left-0   bg-[#b4a5d7] border  border-[#a394d6] px-5 text-white text-xs sm:text-sm mt-2.5  ml-1.5 rounded-md shadow-lg z-10  h-fit"
                  >
                    <ul
                      id="style-2"
                      className=" overflow-y-auto max-h-[13rem] scrollstyle   "
                    >
                      {options2.map((option) => (
                        <li
                          key={option.value}
                           onClick={() => handleSort(option.value)}
                          className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#e3dff0]  text-white text-lg max-w-[14.9rem]   ${
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

        <div className="  mt-3 custom-xl:mt-14 text-[#8376bc]  justify-between hidden custom-xl:flex">
          <div className="flex text-xl items-start ">
            <span className="  w-[23.6rem] text-center border-r border-[#8376bc] leading-none   ">
              Name
            </span>
            <span className="w-[8.6rem] text-center leading-none">ID</span>
          </div>
          <div className="flex text-xl items-start ">
            <span className="w-[10rem] text-center  border-r border-[#8376bc]  leading-none   ">
              Profile
            </span>
            <span className="w-[8.2rem] text-center border-r border-[#8376bc] leading-none">
              Chat
            </span>
            <span className="w-[9.2rem] text-center leading-none">
              Activity
            </span>
            <span className="w-[5rem] text-center leading-none"></span>
          </div>
        </div>

        <div className="  mt-3 custom-xl:mt-11 custom-lg:pr-3.5">
          <div
            id="style-3"
            className=" max-h-[25rem] custom-lg:max-h-[39rem] flex flex-col gap-2 sm:gap-3 custom-xl:gap-5 overflow-y-auto pr-2 custom-xl:pr-6"
          >
            {(sortConfig === "all" || sortConfig === "students") &&
              filteredStudents.map(
                (student: any, index: React.Key | null | undefined) => (
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      Expand === student?.user?._id
                        ? "min-h-[7rem] sm:min-h-[8rem] bg-[#b4a5d7] rounded-md sm:rounded-xl  custom-lg:rounded-2xl "
                        : "min-h-[60px] sm:min-h-[92px]"
                    }`}
                    key={index}
                  >
                    <div className="item min-h-[60px] sm:min-h-[92px] bg-[#b4a5d7] rounded-md sm:rounded-xl  custom-lg:rounded-2xl flex items-center px-4 custom-lg:px-7  justify-between">
                      <div className="flex items-center gap-4 custom-lg:gap-0">
                        <div className="img  rounded-full h-[40px] md:h-[68px] w-[40px] md:w-[68px] flex items-center justify-center overflow-hidden">
                          <img src={student?.user?.profilePicture} alt="" />
                        </div>
                        <span
                          onClick={() => {
                            SetmanagePricing(true);
                          }}
                          className="name hover:cursor-pointer  text-white text-sm  sm:text-xl font-medium custom-lg:w-[17.7rem] custom-lg:border-r text-start custom-lg:pl-14 leading-none  truncate"
                        >
                          {student?.firstName}
                        </span>
                        <span className="name  text-white text-xl font-medium w-[12.5rem]  text-center leading-none truncate hidden custom-xl:block">
                          {student?.user?._id.substring(0, 6)}
                        </span>
                      </div>

                      <div className="hidden custom-lg:flex items-center   ">
                        <div className="w-[10rem] flex items-center justify-center ">
                        {loadingIcon === "profile" &&
                              loading === student?.user?._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      student?.user?._id,
                                      student?.user?.email,
                                      student?.user?.role,
                                      "profile"
                                    );
                                    handleNavigate(student?.user?.role);
                                  }}
                                  src={ProfileLogo}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                        </div>
                        <div className="w-[8.2rem] flex items-center justify-center border-x">
                        {loadingIcon === "chat" &&
                              loading === student?.user?._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      student?.user?._id,
                                      student?.user?.email,
                                      student?.user?.role,
                                      "chat"
                                    );
                                    router.push("/studentdashboard");
                                    localStorage.setItem(
                                      "ContactSupport",
                                      "Contact Support"
                                    );
                                    localStorage.setItem("history", "history");
                                  }}
                                  src={Chat}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                        </div>
                        <div className="w-[9.2rem] flex items-center justify-center ">
                        {loadingIcon === "activity" &&
                              loading === student?.user?._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                          <Image 
                          
                          onClick={() => {
                            handleImpersonate(
                              student?.user?._id,
                              student?.user?.email,
                              student?.user?.role,
                              "activity"
                            );
                            router.push("/studentdashboard");
                            localStorage.setItem("activeSidebarItem", "Activity");
                          }}

                          loading="lazy"  src={Activity} alt="" />
                            )}
                        </div>
                        <span className="w-[0.4rem] text-center leading-none"></span>
                      </div>

                      <div
                        onClick={() => {
                          setExpand((prev: any) =>
                            prev === student?.user?._id ? null : student?.user?._id
                          );
                        }}
                        className="text-white block custom-lg:hidden"
                      >
                        {Expand === student?.user?._id ? "Collapse" : "Expand"}
                      </div>
                    </div>

                    <div
                      className={`transition-opacity duration-500 px-12 custom-lg:hidden items-center  w-full justify-between ${
                        Expand != student?.user?._id ? "hidden" : "flex"
                      }`}
                    >
                      <div className="">
                      {loadingIcon === "profile" &&
                              loading === student?.user?._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      student?.user?._id,
                                      student?.user?.email,
                                      student?.user?.role,
                                      "profile"
                                    );
                                    handleNavigate(student?.user?.role);
                                  }}
                                  src={ProfileLogo}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                      </div>
                      <div className="">
                      {loadingIcon === "chat" &&
                              loading === student?.user?._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      student?.user?._id,
                                      student?.user?.email,
                                      student?.user?.role,
                                      "chat"
                                    );
                                    router.push("/studentdashboard");
                                    localStorage.setItem(
                                      "ContactSupport",
                                      "Contact Support"
                                    );
                                    localStorage.setItem("history", "history");
                                  }}
                                  src={Chat}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                      </div>
                      <div className=" ">
                        <Image  loading="lazy"  src={Activity} alt="" />
                      </div>
                    </div>
                  </div>
                )
              )}
            {(sortConfig === "all" || sortConfig === "parent") &&
              filteredParents.map(
                (parent: any, index: React.Key | null | undefined) => (
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      Expand === parent?.user?._id
                        ? "min-h-[7rem] sm:min-h-[8rem] bg-[#b4a5d7] rounded-md sm:rounded-xl  custom-lg:rounded-2xl "
                        : "min-h-[60px] sm:min-h-[92px]"
                    }`}
                    key={index}
                  >
                    <div className="item min-h-[60px] sm:min-h-[92px] bg-[#b4a5d7] rounded-md sm:rounded-xl  custom-lg:rounded-2xl flex items-center px-4 custom-lg:px-7  justify-between">
                      <div className="flex items-center gap-4 custom-lg:gap-0">
                        <div className="img  rounded-full h-[40px] md:h-[68px] w-[40px] md:w-[68px] flex items-center justify-center overflow-hidden">
                          <img src={parent?.user?.profilePicture} alt="" />
                        </div>
                        <span
                          onClick={() => {
                            SetmanagePricing(true);
                          }}
                          className="name hover:cursor-pointer  text-white text-sm  sm:text-xl font-medium custom-lg:w-[17.7rem] custom-lg:border-r text-start custom-lg:pl-14 leading-none  truncate"
                        >
                          {parent?.firstName}
                        </span>
                        <span className="name  text-white text-xl font-medium w-[12.5rem]  text-center leading-none truncate hidden custom-xl:block">
                          {parent?.user?._id.substring(0, 6)}
                        </span>
                      </div>

                      <div className="hidden custom-lg:flex items-center   ">
                        <div className="w-[10rem] flex items-center justify-center ">
                        {loadingIcon === "profile" &&
                              loading === parent?.user?._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      parent?.user?._id,
                                      parent?.user?.email,
                                      parent?.user?.role,
                                      "profile"
                                    );
                                    handleNavigate(parent?.user?.role);
                                  }}
                                  src={ProfileLogo}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                        </div>
                        <div className="w-[8.2rem] flex items-center justify-center border-x">
                        {loadingIcon === "chat" &&
                              loading === parent.user._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      parent.user._id,
                                      parent.user.email,
                                      parent.user.role,
                                      "chat"
                                    );
                                    router.push("/parent");
                                    localStorage.setItem(
                                      "ContactSupport",
                                      "Contact Support"
                                    );
                                    localStorage.setItem("history", "history");
                                  }}
                                  src={Chat}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                        </div>
                        <div className="w-[9.2rem] flex items-center justify-center ">
                        {loadingIcon === "activity" &&
                              loading === parent.user._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                          <Image 
                           onClick={() => {
                            handleImpersonate(
                              parent.user._id,
                              parent.user.email,
                              parent.user.role,
                              "activity"
                            );
                            router.push("/parent");
                            localStorage.setItem("activeSidebarItem", "Activity");
                          }}
                          loading="lazy"  src={Activity} alt="" />
                        )}
                        </div>
                        <span className="w-[0.4rem] text-center leading-none"></span>
                      </div>

                      <div
                        onClick={() => {
                          setExpand((prev: any) =>
                            prev === parent?.user?._id ? null : parent?.user?._id
                          );
                        }}
                        className="text-white block custom-lg:hidden"
                      >
                        {Expand === parent?.user?._id ? "Collapse" : "Expand"}
                      </div>
                    </div>

                    <div
                      className={`transition-opacity duration-500 px-12 custom-lg:hidden items-center  w-full justify-between ${
                        Expand != parent?.user?._id ? "hidden" : "flex"
                      }`}
                    >
                      <div className="">
                      {loadingIcon === "profile" &&
                              loading === parent?.user?._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      parent?.user?._id,
                                      parent?.user?.email,
                                      parent?.user?.role,
                                      "profile"
                                    );
                                    handleNavigate(parent?.user?.role);
                                  }}
                                  src={ProfileLogo}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                      </div>
                      <div className="">
                      {loadingIcon === "chat" &&
                              loading === parent.user._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                                <Image  loading="lazy" 
                                  onClick={() => {
                                    handleImpersonate(
                                      parent.user._id,
                                      parent.user.email,
                                      parent.user.role,
                                      "chat"
                                    );
                                    router.push("/parent");
                                    localStorage.setItem(
                                      "ContactSupport",
                                      "Contact Support"
                                    );
                                    localStorage.setItem("history", "history");
                                  }}
                                  src={Chat}
                                  alt=""
                                  className="hover:cursor-pointer"
                                />
                              )}
                      </div>
                      <div className=" ">
                      {loadingIcon === "activity" &&
                              loading === parent.user._id ? (
                                <span className="text-white">Loading...</span>
                              ) : (
                        <Image 
                         onClick={() => {
                          handleImpersonate(
                            parent.user._id,
                            parent.user.email,
                            parent.user.role,
                            "activity"
                          );
                          router.push("/parent");
                          localStorage.setItem("activeSidebarItem", "Activity");
                        }}
                        loading="lazy"  src={Activity} alt="" />
                      )}
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
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

              background-color: #7f72ba;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}

export default Students;
