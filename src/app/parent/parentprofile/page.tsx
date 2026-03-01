"use client";
import React, { useEffect, useRef, useState } from "react";
import useSWR from 'swr';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  X,
} from "lucide-react";
import Image from "next/image";
import edit from "../../../../public/editpencilicon.svg";
import parentprofilelogo from "../../../../public/parentprofilelogo.svg";
import Adminparentprofilelogo from "../../../../public/parentAdminProfileLogo.svg";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Dropdown from "../components/Dropdown";
import { subjectOptions } from "../components/Data";

const PersonalInfoForm = () => {
  const router = useRouter();
  const [editable, seteditable] = useState(false);
  const { data: session, update } = useSession();
  const [activeSidebarItem, setActiveSidebarItem] = useState("Dashboard");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const [firstNames, setFirstName] = useState("Loading...");
  const [Lastname, setLastname] = useState("Loading...");
  const [Age, setAge] = useState("Loading...");
  const [grade, setGrade] = useState("Loading...");
  const [studentid, Setstudentid] = useState("Loading...");
  const [Institution, setInstitution] = useState("Loading...");
  const [additionalinfo, setAdditionalinfo] = useState("Loading...");
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [parentData, setParentData] = useState<any>(null);
  const [userId, setUserId] = useState("");

  const fetcher = async (url: string, userId: string) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      console.error("Failed to fetch parent data");
      throw new Error("Failed to fetch parent data");
    }

    const data = await response.json();
    return data.parentData;
  };

  // Use SWR hook
  const { data: parentDataSWR } = useSWR(
    session?.user.id ? ["/api/parentapis/fetch-parent-data", session.user.id] : null,
    ([url, userId]) => fetcher(url, userId),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: (data) => {
        setParentData(data);
      }
    }
  );

  // Update all the states when parentDataSWR changes
  useEffect(() => {
    try {
      setUserId(session?.user.id);

      if (parentDataSWR) {
        setFirstName(parentDataSWR?.childInformation?.firstName);
        setLastname(parentDataSWR?.childInformation?.lastName);
        setAge(parentDataSWR?.childInformation?.age);
        setGrade(parentDataSWR?.grade);
        Setstudentid(parentDataSWR?._id?.substring(0, 6));
        setInstitution(parentDataSWR?.childInformation?.institution);
        setSelectedSubjects(parentDataSWR?.subjectChildNeeds || []);
        setAdditionalinfo(parentDataSWR?.additionalInformation);
      }
    } catch (error) {
      console.error(error);
    }
  }, [session, parentDataSWR]);

  const handleSave = async (e: any) => {
    e.preventDefault();
    seteditable(false);

    const updatedParentData = {
      grade: grade,
      subjectChildNeeds: selectedSubjects,
      additionalInformation: additionalinfo,
      childInformation: {
        firstName: firstNames,
        lastName: Lastname,
        age: Age,
        institution: Institution,

      }
    };

    try {
      const response = await fetch(
        "/api/parentapis/update-parent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, updatedParentData }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

    } catch (error: any) {
      console.error(error.message);
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const toggleEdit = () => {
    seteditable((prevEditable) => !prevEditable);
  };
  const toggleSubjectDropdown = () =>
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);

  const handleSubjectClick = (subject: string) => {
    // @ts-ignore
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
    } else {
      // @ts-ignore
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };


  const handleImpersonate = async () => {

    await update({
      user: {
        email: 'admin@gmail.com',
        role: 'admin',
        id: 'admin',
        isAdmin: true,
        isParent: false
      }
    })
    setTimeout(() => {
      router.push("/admin")
    }, 3000);

  };




  const removeSubject = (subject: never) => {
    setSelectedSubjects(selectedSubjects.filter((item) => item !== subject));
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center  ">
      <header className="flex justify-between items-center sm:items-start mb-7  w-full  pr-3  sm:pr-8 pt-3 custom-xl:pt-5">
        <div className="px-4 sm:px-11 custom-lg:py-6 flex  items-center">

          {session?.user?.isAdmin === true ? (

            <Image loading="lazy" src={Adminparentprofilelogo} alt="" className="w-[150px] sm:w-[200px] custom-lg:w-[270px]" />
          ) : (

            <Image loading="lazy" src={parentprofilelogo} alt="" className="w-[150px] sm:w-[200px] custom-lg:w-[270px]" />
          )}

          <div className="hidden sm:block">
            <Link href="/parent">
              <div className="flex cursor-pointer  items-center ml-4 custom-lg:ml-16">
                <ChevronLeft
                  className="mr-2 cursor-pointer text-[#685AAD]"
                  size={32}
                />

                <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-[26px] hidden sm:block">
                  Back
                </h1>
              </div>
            </Link>
          </div>
        </div>
        <Dropdown
          targetRef={targetRef}
          toggleProfile={toggleProfile}
          firstName={parentData?.firstName}
          profilepicture={parentData?.user.profilePicture}
          isProfileOpen={isProfileOpen}
          session={session}
          handleImpersonate={handleImpersonate}
          setActiveSidebarItem={setActiveSidebarItem}
          setIsProfileOpen={setIsProfileOpen}
          FetchedUserData={parentData}
        />

      </header>

      <div className="w-full max-w-[96rem] bg-[#EDE8FA] rounded-3xl custom-lg:rounded-[50px] px-4 sm:px-10 py-8 custom-lg:px-24 custom-lg:py-[58px] space-y-6 mb-16">
        <div className="flex justify-between items-start mb-[54px]">
          <h1 className="text-[#534988] text-xl custom-lg:text-[50px] custom-lg:leading-none font-bold">
            Personal Information
          </h1>
          <button
            onClick={toggleEdit}
            className="text-[#7c4dff] hover:text-[#6a3dee] flex items-center gap-2"
          >
            <Image loading="lazy" src={edit} alt="" className="w-[40px] sm:w-[61.53px]" />
          </button>
        </div>

        <div className="grid grid-cols-1 custom-lg:grid-cols-3 gap-x-14 gap-y-4  sm:gap-y-10">
          <div className="w-full">
            <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
              First Name
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-5 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-[22px] block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-[30.86px] md:leading-[2rem]"
              readOnly={!editable}
              value={firstNames}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
              Last Name
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-5 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-[22px] block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-[30.86px] md:leading-[2rem]"
              readOnly={!editable}
              value={Lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
              Age
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-5 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-[22px] block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-[30.86px] md:leading-[2rem]"
              readOnly={!editable}
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
              Grade Level
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-5 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-[22px] block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-[30.86px] md:leading-[2rem]"
              readOnly
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
              Student ID
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-5 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-[22px] block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-[30.86px] md:leading-[2rem]"
              readOnly
              value={studentid}
              onChange={(e) => Setstudentid(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
              Institution
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-5 pl-4 sm:pl-8 md:pl-12 pr-4 py-2 sm:py-3 custom-xl:py-[22px] block w-full rounded-full text-[#685AAD] bg-[#DBCAFF] text-lg sm:text-xl md:text-[30.86px] md:leading-[2rem]"
              readOnly={!editable}
              value={Institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
          </div>

          {editable ? (
            <div className="w-full max-w-[36rem] mx-auto">
              <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                Subject Needed
              </label>
              <div className="relative  select-none mt-2 sm:mt-4 ">
                <div
                  className="w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2  sm:py-4 rounded-full cursor-pointer flex justify-between items-center"
                  onClick={toggleSubjectDropdown}
                >
                  <span className="my-1">
                    {selectedSubjects.length > 0
                      ? `${selectedSubjects.length} selected`
                      : "select subject(s)"}
                  </span>
                  {isSubjectDropdownOpen ? (
                    <ChevronUp size={30} className="text-[#a394d6] " />
                  ) : (
                    <ChevronDown size={30} className="text-[#a394d6] " />
                  )}
                </div>

                {isSubjectDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl  z-10 w-[90%] mx-auto py-7   max-h-[16rem] overflow-auto scrollbar-none">
                    {subjectOptions.map((subject) => (
                      <div
                        key={subject.value}
                        className="px-8 py-2 cursor-pointer flex items-center"
                        onClick={() => handleSubjectClick(subject.value)}
                      >
                        <div className="border-b-2 border-[#a394d682] py-3 flex w-[70%] gap-4">
                          <div className="relative">
                            <input
                              type="checkbox"
                              // @ts-ignore
                              checked={selectedSubjects.includes(subject.value)}
                              onChange={() => { }}
                              className="absolute opacity-0 cursor-pointer"
                            />
                            <div
                              className={`h-7 w-7  border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-md flex items-center justify-center 
                     ${
                                // @ts-ignore
                                selectedSubjects.includes(subject.value)
                                  ? "bg-[#6c5baa]"
                                  : ""
                                }`}
                            >
                              {selectedSubjects.includes(
                                // @ts-ignore
                                subject.value
                              ) && <Check className="text-white" />}
                            </div>
                          </div>
                          <span className="ml-2 text-2xl text-[#6C5BAA] ">
                            {subject.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {selectedSubjects.length > 0 && (
                <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem] mx-auto min-h-[5rem]">
                  {selectedSubjects.map((subject) => (
                    <span
                      key={subject}
                      className="bg-[#6C5BAA] text-white px-10  flex items-center  text-base custom-lg:text-2xl w-auto py-2 rounded-full justify-between"
                    >
                      {subject}
                      <X
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={() => removeSubject(subject)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
                Subject Needed
              </label>
              <div className="flex gap-4 flex-wrap">
                {selectedSubjects.map((subject) => (
                  <span
                    key={subject}
                    className="bg-[#6C5BAA] text-white px-10 w-full flex items-center justify-center text-base custom-lg:text-2xl max-w-[187px] py-2 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 custom-lg:col-span-2">
            <label className="block text-lg sm:text-[30.86px] sm:leading-[2rem] font-medium text-[#9085C4] pl-4 sm:pl-8 md:pl-12">
              Additional Information
            </label>

            <div className="bg-[#ece6ff] rounded-2xl p-4 ">
              <textarea
                readOnly={!editable}
                value={additionalinfo}
                onChange={(e) => setAdditionalinfo(e.target.value)}
                className="w-full bg-[#DBCAFF] outline-none text-[#685AAD] min-h-[200px] text-xl font-medium   rounded-3xl px-7 py-4 resize-none"
              />
            </div>
          </div>
        </div>

        {editable && (
          <div className="float-right">
            <button
              onClick={() => seteditable(false)}
              className="text-[#8653FF] font-medium  rounded-full bg-transparent  px-8 sm:px-16 py-2 sm:py-4 text-xl custom-xl:text-3xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-white rounded-full  font-medium  bg-[#8653FF] px-8 sm:px-16 py-2 sm:py-4 text-xl custom-xl:text-3xl "
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
