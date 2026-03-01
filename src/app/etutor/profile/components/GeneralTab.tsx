import { Check, ChevronDown, ChevronUp, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import tooltip from "../../../../../public/alertnotification.svg";
import alertsubject from "../../../../../public/alert_subject.svg";
import infoicon from "../../../../../public/infoicon.svg";
import videouploadPopup from "../../../../../public/videoupload_popup.svg";
import infoiconfill from "../../../../../public/infoiconfill.svg";
import { GenderOption, SubjectOption, GeneralTabProps } from "./Data";

const GeneralTab: React.FC<GeneralTabProps> = ({
  uploadedImage,
  profilePicture,
  image,
  handleUpload,
  pictureuploadloading,
  handleImageChange,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  teacher,
  isEditing,
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  selectedGender,
  isGenderOpen,
  toggleGenderDropdown,
  genderOptions,
  handleGenderClick,
  selectedSubjects,
  isSubjectDropdownOpen,
  setIsSubjectDropdownOpen,
  toggleSubjectDropdown,
  subjectOptions,
  handleSubjectClick,
  removeSubject,
  isSubjectUnapproved,
  setYourEducation,
  yourEducation,
  setAboutYou,
  aboutYou,
  setVideoIntroduction,
  videoIntroduction,
  activeTab,
}) => {
  const [subjethover, setsubjethover] = useState("");
  const [onvideoiconhover, setonvideoiconhover] = useState(false);

  return (
    activeTab === "GENERAL" && (
      <div className=" overflow-x-hidden ">
        {/* first name and image dive */}
        <div className=" mt-1.5 flex custom-xl:items-center flex-col custom-xl:flex-row  gap-4 custom-xl:gap-11 ">
          <div className="img h-[9rem] w-[9rem]  rounded-full flex items-center justify-center overflow-hidden">
            <img src={uploadedImage || profilePicture} alt="" className="" />
          </div>
          <div className="name flex flex-col items-start  ">
            <h1 className="uppercase text-3xl font-bold text-[#685AAD]">
              {firstName}
            </h1>
            <span className="text-xl  mb-5 text-[#685AAD]">
              eTutor since:
              {new Date(teacher?.user?.createdAt).toLocaleDateString() || ""}
            </span>
            {image ? (
              <button
                className="w-full sm:w-auto py-1 px-9 mt-6 text-base custom-2xl:text-base rounded-sm bg-[#8358F7] hover:bg-[#4a3683] capitalize hover:bg-opacity-90 transition-colors"
                onClick={() => {
                  handleUpload();
                }}
              >
                {pictureuploadloading ? "wait..." : "upload"}
              </button>
            ) : (
              <button className="px-7 text-white rounded-md py-0.5 bg-[#FC7777] relative">
                Edit image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </button>
            )}
          </div>
        </div>

        {/* name last name div */}
        <div className="flex mt-12 pt-0.5 w-full  justify-between flex-wrap gap-4">
          <div className="sm:max-w-[17rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              First name <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              disabled={!isEditing}
            />
          </div>
          <div className="sm:max-w-[17rem] w-full">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Last name <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              disabled={!isEditing}
            />
          </div>
          <div className="sm:max-w-[17rem] w-full opacity-0 select-none">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Last name <span className="text-[#FC7777]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
            />
          </div>
        </div>

        {/* birthday div */}

        <div className="mt-16 pt-1   ">
          <h1 className=" text-2xl font-bold text-[#685AAD]">
            When is your birthday?
          </h1>
          <div className="mt-6 flex justify-between   flex-wrap ">
            <div className="sm:max-w-[17rem] w-full">
              <label className="text-lg sm:text-xl font-semibold text-[#685AAD]">
                Day <span className="text-[#FC7777]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                value={day}
                onChange={(e) => {
                  const value = e.target.value;

                  // Check if value is numeric and max two digits
                  if (/^\d{0,2}$/.test(value)) {
                    // Convert to number and check if it's 31 or less
                    if (Number(value) <= 31) {
                      setDay(value);
                    }
                  }
                }}
                disabled={!isEditing}
              />
            </div>
            <div className="sm:max-w-[17rem] w-full">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                Month <span className="text-[#FC7777]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                value={month}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d{0,2}$/.test(value)) {
                    if (Number(value) <= 12) {
                      setMonth(value);
                    }
                  }
                }}
                disabled={!isEditing}
              />
            </div>
            <div className="sm:max-w-[17rem] w-full">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                Year <span className="text-[#FC7777]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                value={year}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d{0,4}$/.test(value)) {
                    setYear(value);
                  }
                }}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex mt-11  justify-between items-start sm:max-w-[57.5rem] w-full gap-4 flex-wrap">
            {/* gender select */}

            <div className="w-full sm:max-w-[25.8rem] mt-4">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                Gender <span className="text-[#FC7777]">*</span>
              </label>
              <div className="relative  select-none mt-2">
                <div
                  className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2 rounded-lg cursor-pointer flex justify-between items-center`}
                  onClick={toggleGenderDropdown}
                >
                  <span>{selectedGender || "select gender"}</span>

                  {isGenderOpen ? (
                    <ChevronUp size={22} className="text-white" />
                  ) : (
                    <ChevronDown size={22} className="text-white" />
                  )}
                </div>
                {isGenderOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-2">
                    {genderOptions.map((gender) => (
                      <div
                        key={gender.value}
                        className="py-2 text-lg  border-b px-3 hover:cursor-pointer last:border-b-0  w-[80%] mx-auto"
                        onClick={() => handleGenderClick(gender.value)}
                      >
                        {gender.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`w-full sm:max-w-[25.8rem] mt-4 ${
                selectedSubjects.length > 0 ? "mb-0" : "mb-10"
              } `}
            >
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                Subjects you teach <span className="text-[#FC7777]">*</span>
              </label>

              <div className="relative  select-none mt-2 ">
                <div
                  className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-1 rounded-lg cursor-pointer flex justify-between items-center"
                  onClick={toggleSubjectDropdown}
                >
                  <span className="my-1">
                    {selectedSubjects.length > 0
                      ? `${selectedSubjects.length} selected`
                      : "select subject(s)"}
                  </span>
                  {isSubjectDropdownOpen ? (
                    <ChevronUp size={22} className="text-white " />
                  ) : (
                    <ChevronDown size={22} className="text-white " />
                  )}
                </div>

                {isSubjectDropdownOpen && (
                  <div
                    onMouseLeave={() => {
                      setIsSubjectDropdownOpen(false);
                    }}
                    className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  z-50 "
                  >
                    <div
                      id="style-2"
                      className="max-h-[16.4rem] overflow-y-scroll  "
                    >
                      {subjectOptions.map((subject) => (
                        <div
                          key={subject.value}
                          className=" py-2 cursor-pointer flex items-center"
                          onClick={() => handleSubjectClick(subject.value)}
                        >
                          <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[15rem] truncate">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedSubjects.includes(
                                  //@ts-ignore
                                  subject.value
                                )}
                                onChange={() => {}}
                                className="absolute opacity-0 cursor-pointer"
                              />
                              <div
                                className={`h-5 w-5 rounded-sm border border-white hover:bg-[#a394d6] hover:border-[#a394d6] flex items-center justify-center ${
                                  //@ts-ignore
                                  selectedSubjects.includes(subject.value)
                                    ? "bg-[#6c5baa] border-none p-0.5"
                                    : ""
                                }`}
                              >
                                {selectedSubjects.includes(subject.value) && (
                                  <Check className="text-white" />
                                )}
                              </div>
                            </div>
                            <span className="ml-2 text-xl text-white ">
                              {subject.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedSubjects.length > 0 && (
                <div className="flex flex-wrap items-start justify-start px-4 gap-2 mt-5 sm:max-w-[26rem] mx-auto min-h-[5rem] relative z-10">
                  {selectedSubjects.map((subject) => (
                    <div
                      onMouseLeave={() => setsubjethover("")}
                      key={subject}
                      className="relative group "
                    >
                      <span
                        className={`${
                          isSubjectUnapproved(subject)
                            ? "bg-[#B4A5D7] text-white border-2 border-[#fc7777]"
                            : "bg-[#B4A5D7] text-white"
                        } px-4 gap-2 flex items-center text-xl w-fit py-2 rounded-[6px] justify-between  text-[20px] !max-h-[41px] relative`}
                      >
                        {subject}

                        {isSubjectUnapproved(subject) && (
                          <span
                            className={`opacity-0 ${
                              subjethover === subject ? "opacity-100" : ""
                            } transition-all duration-300 rounded-md text-orange-400 absolute -top-2 -left-1 bg-[#fc7777] h-6 w-6 flex items-center justify-center`}
                          >
                            <Trash2
                              onClick={() => removeSubject(subject)}
                              className=" w-[70%] text-white hover:cursor-pointer"
                            />
                          </span>
                        )}
                        {isSubjectUnapproved(subject) ? (
                          <span className="text-[#fc7777] relative group">
                            {/* <AlertTriangle size={20} /> */}
                            <Image
                              onMouseEnter={() => setsubjethover(subject)}
                              src={alertsubject}
                              alt=""
                            />

                            <Image
                              src={tooltip}
                              alt=""
                              className={`transition-all duration-300 origin-top-left  min-w-[354px] absolute -top-2 left-[14px]  ${
                                subjethover === subject
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-0"
                              }  z-[3333333]`}
                            />
                          </span>
                        ) : (
                          <X
                            hanging={20}
                            width={20}
                            className="cursor-pointer "
                            onClick={() => removeSubject(subject)}
                          />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="sm:max-w-[28.6rem] w-full mt-3">
            <label className=" text-lg sm:text-xl font-semibold text-[#685AAD] flex  items-center gap-2">
              Video introduction
              <span className="h-[16px] w-[16px] relative group">
                <Image
                  onMouseEnter={() => setonvideoiconhover(true)}
                  onMouseLeave={() => setonvideoiconhover(false)}
                  src={infoicon}
                  alt=""
                />
                <Image
                  src={videouploadPopup}
                  alt=""
                  className={` hidden sm:block min-w-[267px] custom-xl:min-w-[467px] absolute top-1 left-4 origin-top-left transition-all duration-300 ${
                    onvideoiconhover
                      ? "opacity-100 scale-100 "
                      : "opacity-0 scale-0 "
                  } `}
                />
              </span>
            </label>
            <input
              type="text"
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
              disabled={!isEditing}
              placeholder="Paste here the link to your video introduction."
              value={videoIntroduction}
              onChange={(e) => {
                setVideoIntroduction(e.target.value);
              }}
            />
          </div>
          <div className="w-full mt-16">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              About you (at least 250 characters)
              <span className="text-[#FC7777]">*</span>
            </label>
            <textarea
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-3xl scrollbar-none  text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
              disabled={!isEditing}
              rows={5}
              placeholder="Tell us something about who you are and what do you like: it will help us find the right matching for you."
              value={aboutYou}
              onChange={(e) => {
                setAboutYou(e.target.value);
              }}
            />
          </div>

          <div className="w-full bg-[#B4A5D7] py-2.5 rounded-lg mt-9 px-6 text-xl sm:max-w-[43rem] text-white flex items-center gap-5 ">
            <Image
              loading="lazy"
              src={infoiconfill}
              alt=""
              className="w-5 h-5"
            />
            <p>
              This section will be visible to parents on the student’s Dashboard
            </p>
          </div>
          <div className="w-full mt-16">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Your Education (at least 250 characters)
              <span className="text-[#FC7777]">*</span>
            </label>
            <textarea
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-3xl  text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
              disabled={!isEditing}
              rows={5}
              placeholder="Tell us something about who you are and what do you like: it will help us find the right matching for you."
              value={yourEducation}
              onChange={(e) => {
                setYourEducation(e.target.value);
              }}
            />
          </div>

          <div className="w-full bg-[#B4A5D7] py-2.5 rounded-lg mt-9 px-6 text-xl sm:max-w-[43rem] text-white flex items-center gap-5 ">
            <Image
              loading="lazy"
              src={infoiconfill}
              alt=""
              className="w-5 h-5"
            />
            <p>
              This section will be visible to parents on the student’s Dashboard
            </p>
          </div>
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

            background-color: white;
          }
        `}</style>
      </div>
    )
  );
};

export default GeneralTab;
