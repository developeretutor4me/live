import { ChevronDown, ChevronUp, XCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import addicon from "../../../../../public/addQualificationIcon.svg";
import addicon2 from "../../../../../public/addicon2.svg";
import downloadicon from "../../../../../public/downloadIconDownARrow.svg";
import bluefoldericon from "../../../../../public/blueFolderIconFilled.svg";
import {
  countryoptions,
  PurposeOfAttachment,
  AcademicBackgroundprops,
} from "./Data";

const AcademicBackground: React.FC<AcademicBackgroundprops> = ({
  activeTab,
  isEditing,
  errorMessage,
  selectedAcademicCountry,
  isAcademicCountryopen,
  graduationSchool,
  highestDegree,
  isSubmitting,
  internationalExperience,
  isPopupOpen,
  languages,
  selectedSubjectToVerifys,
  files,
  showNewInput,
  isSubjectToVerifyDropdownOpen,
  selectedPurposeOfAttechments,
  isPurposeOfAttechmentDropdownOpen,
  newLanguage,
  subjectOptions,
  setInternationalExperience,
  setHighestDegree,
  handlePurposeOfAttechmentClick,
  handleSubjectToVerifyClick,
  setGraduationSchool,
  handleAcademicCountryClick,
  toggleAcedmicCountrydown,
  setNewLanguage,
  handleSubmitLanguage,
  handleDeleteLanguage,
  handleAddLanguage,
  handleSubmit,
  handleFileChange,
  removeFile,
  setIsPurposeOfAttechmentDropdownOpen,
  togglePurposeOfAttechmentDropdown,
  setIsPopupOpen,
  setIsSubjectToVerifyDropdownOpen,
  toggleSubjectToVerifyDropdown,
}) => {
  return (
    activeTab === "ACADEMICBACKGROUND" && (
      <div className=" mt-8 ">
        <h1 className="text-4xl font-bold text-[#685AAD]">
          Academic background
        </h1>

        <div className="mt-14 flex flex-wrap justify-between gap-8 sm:max-w-[61rem]  ">
          <div className="sm:max-w-[29rem] w-full flex flex-col gap-10">
            <div className="w-full">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                Graduation school <span className="text-[#FC7777]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                value={graduationSchool}
                onChange={(e) => {
                  setGraduationSchool(e.target.value);
                }}
                disabled={!isEditing}
              />
            </div>
            <div className="">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                Highest degree <span className="text-[#FC7777]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                value={highestDegree}
                onChange={(e) => {
                  setHighestDegree(e.target.value);
                }}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="sm:max-w-[28rem] custom-2xl:sm:max-w-[22rem] w-full  flex flex-col gap-10 ">
            <div className="w-full">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                Country <span className="text-[#FC7777]">*</span>
              </label>
              <div className="relative  select-none mt-4">
                <div
                  className={`w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2.5 rounded-lg cursor-pointer flex justify-between items-center`}
                  onClick={toggleAcedmicCountrydown}
                >
                  <span>{selectedAcademicCountry || "select Country"}</span>

                  {isAcademicCountryopen ? (
                    <ChevronUp size={22} className="text-white" />
                  ) : (
                    <ChevronDown size={22} className="text-white" />
                  )}
                </div>
                {isAcademicCountryopen && (
                  <div className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  ">
                    <div
                      id="style-2"
                      className="max-h-[16.4rem] overflow-y-scroll  "
                    >
                      {countryoptions.map((country) => (
                        <div
                          key={country.value}
                          className="py-1 cursor-pointer flex items-center w-[70%]"
                          onClick={() =>
                            handleAcademicCountryClick(country.value)
                          }
                        >
                          <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                            <span className="ml-2 text-xl text-white ">
                              {country.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              onClick={() => {
                setIsPopupOpen(true);
              }}
            >
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                Qualifications
              </label>
              <div className="flex items-center hover:cursor-pointer h-fit gap-4 mt-5">
                <Image loading="lazy" src={addicon} alt="" className="" />
                <span className="font-medium text-[#B4A5D7] text-lg ">
                  Add Qualification
                </span>
              </div>
            </div>

            {isPopupOpen && (
              <div className="fixed inset-0 bg-[#F8F5FF] flex justify-center items-start py-[75px] z-50 min-h-screen overflow-auto ">
                <div className="bg-[#EDE8FA] w-full sm:max-w-[1605px] min-h-[932px] h-fit rounded-3xl px-6 sm:px-12 custom-xl:px-[116px] py-6 sm:py-12 custom-xl:py-[88px] space-y-6 relative">
                  <h1 className="text-[#6B5BA9] text-4xl font-bold mb-8">
                    Upload Your Qualification and Verification Documents
                  </h1>

                  <p className="text-[#6B5BA9] text-2xl leading-tight ">
                    Providing your qualification and verification documents is
                    crucial for expanding your tutoring capabilities. By
                    uploading these files, you <br /> enable us to validate your
                    expertise and allow you to tutor in more than two subjects.
                    Additionally, completing this process can help <br /> you
                    level up your account instantly. Please note that the
                    leveling up will be applied after our team reviews your
                    account and documents. <br /> This verification is a step
                    towards unlocking greater opportunities and recognition
                    within our platform.
                  </p>

                  <div className="grid grid-cols-1 custom-xl:grid-cols-2 gap-0 pt-3 sm:max-w-[79rem]">
                    {/* SubjectToVerify select */}
                    <div className="w-full sm:max-w-[29.7rem] sm:mt-11">
                      <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] pb-1">
                        Select the subject you wish to provide verification for
                      </label>
                      <div className="relative  select-none mt-1 sm:mt-5 ">
                        <div
                          className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-3.5 rounded-lg cursor-pointer flex justify-between items-center"
                          onClick={toggleSubjectToVerifyDropdown}
                        >
                          <span className="my-1">
                            {selectedSubjectToVerifys.length > 0
                              ? `${selectedSubjectToVerifys}`
                              : "select Subject"}
                          </span>
                          {isSubjectToVerifyDropdownOpen ? (
                            <ChevronUp size={22} className="text-white " />
                          ) : (
                            <ChevronDown size={22} className="text-white " />
                          )}
                        </div>

                        {isSubjectToVerifyDropdownOpen && (
                          <div
                            onMouseLeave={() => {
                              setIsSubjectToVerifyDropdownOpen(false);
                            }}
                            className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                          >
                            <div
                              id="style-2"
                              className="max-h-[16.4rem] overflow-y-scroll  "
                            >
                              {subjectOptions.map((SubjectToVerify) => (
                                <div
                                  key={SubjectToVerify.value}
                                  className=" py-2 cursor-pointer flex items-center"
                                  onClick={() =>
                                    handleSubjectToVerifyClick(
                                      SubjectToVerify.value
                                    )
                                  }
                                >
                                  <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                                    <span className="ml-2 text-xl text-white ">
                                      {SubjectToVerify.label}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* purpose of attechment */}
                    <div className="w-full sm:max-w-[29.7rem] mt-3 sm:mt-11">
                      <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] pb-1">
                        Select the Purpose of Your Attachment
                      </label>
                      <div className="relative  select-none mt-1 sm:mt-5 ">
                        <div
                          className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-3.5 rounded-lg cursor-pointer flex justify-between items-center"
                          onClick={togglePurposeOfAttechmentDropdown}
                        >
                          <span className="my-1">
                            {selectedPurposeOfAttechments.length > 0
                              ? `${selectedPurposeOfAttechments}`
                              : "select"}
                          </span>
                          {isPurposeOfAttechmentDropdownOpen ? (
                            <ChevronUp size={22} className="text-white " />
                          ) : (
                            <ChevronDown size={22} className="text-white " />
                          )}
                        </div>

                        {isPurposeOfAttechmentDropdownOpen && (
                          <div
                            onMouseLeave={() => {
                              setIsPurposeOfAttechmentDropdownOpen(false);
                            }}
                            className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                          >
                            <div
                              id="style-2"
                              className="max-h-[16.4rem] overflow-y-scroll  "
                            >
                              {PurposeOfAttachment.map(
                                (PurposeOfAttechment) => (
                                  <div
                                    key={PurposeOfAttechment.value}
                                    className=" py-2 cursor-pointer flex items-center"
                                    onClick={() =>
                                      handlePurposeOfAttechmentClick(
                                        PurposeOfAttechment.value
                                      )
                                    }
                                  >
                                    <div className=" border-b border-white  py-2 flex  gap-4  w-full px-4 sm:max-w-[22rem] truncate">
                                      <span className="ml-2 text-xl text-white ">
                                        {PurposeOfAttechment.label}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 sm:pt-16">
                    <label className="block text-lg sm:text-lg font-semibold text-[#685AAD] mt-0.5 mb-6">
                      Please name your file as
                      [LastName_FirstName_Subject_DocumentType]
                    </label>
                    <div className="border bg-[#B4A5D7] w-full sm:max-w-[29.7rem] rounded-lg flex items-start  p-3.5 gap-4 flex-col">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="relative group bg-white text-black w-full sm:max-w-[29.7rem] rounded-lg flex items-center justify-between px-10 py-3.5 mt-2"
                        >
                          <span
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 hidden group-hover:block hover:cursor-pointer"
                          >
                            <XCircle fill="white" className="text-red-500 " />
                          </span>
                          <span className=" font-medium flex gap-4 items-center">
                            <Image loading="lazy" src={bluefoldericon} alt="" />{" "}
                            {file.name}
                          </span>

                          <Image loading="lazy" src={downloadicon} alt="" />
                        </div>
                      ))}

                      <div className="flex items-center gap-4 px-4">
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer flex items-center gap-4"
                        >
                          <Image
                            loading="lazy"
                            src={addicon2}
                            alt=""
                            className="w-12"
                          />
                          <span className="text-white font-medium">
                            Attach Your File Here
                          </span>
                        </label>
                        <input
                          id="file-upload"
                          type="file"
                          accept="
                            application/pdf,
                            application/msword,
                            application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                            text/plain,
                            image/jpeg,
                            image/png,
                            image/gif
                          "
                          multiple
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 mt-4">{errorMessage}</p>
                  )}

                  <div className=" custom-2xl:absolute bottom-8 custom-xl:bottom-10 right-9 space-x-2 sm:space-x-6  space-y-2 ">
                    <button
                      onClick={() => {
                        setIsPopupOpen(false);
                      }}
                      className=" bg-[#FF7B7B] text-white px-10 sm:px-24 py-2.5 text-xs sm:text-xl rounded-md hover:bg-[#FF6B6B] transition-colors"
                    >
                      Cancel
                    </button>
                    {files.length > 0 && (
                      <button
                        onClick={(e) => {
                          handleSubmit(e);
                        }}
                        className=" bg-[#9052FC] text-white  px-10 sm:px-24 py-2.5 text-xs sm:text-xl  rounded-md hover:bg-[#FF6B6B] transition-colors"
                      >
                        {isSubmitting
                          ? "Uploading..."
                          : "Submit Document for Verification"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="w-full mt-20">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              International experience (optional)
            </label>
            <textarea
              className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-xl  text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl placeholder:text-white"
              disabled={!isEditing}
              placeholder="Tell us something about who you are and what do you like: it will help us find the right matching for you."
              value={internationalExperience}
              onChange={(e) => {
                setInternationalExperience(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="sm:max-w-[29rem] w-full mt-16">
          <div className="w-full space-y-4">
            <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
              Languages you can tutor in{" "}
              <span className="text-[#FC7777]">*</span>
            </label>

            <div className="space-y-2">
              {/* Existing languages */}
              {languages.map((language, index) => (
                <div key={index} className="relative">
                  <input
                    type="text"
                    value={language}
                    className="px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl"
                    disabled={!isEditing}
                  />
                  {isEditing && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -right-10 cursor-pointer"
                      onClick={() => {
                        if (languages.length > 1) {
                          handleDeleteLanguage(index);
                        }
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="#B4A5D7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {/* New language input */}
              {showNewInput && (
                <div className="relative">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="enter language name"
                    className="px-4 py-2.5 block w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl placeholder:text-white"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (newLanguage != "") {
                          handleSubmitLanguage();
                        }
                      }
                    }}
                    autoFocus
                  />
                  {/* Cross button outside input box */}
                  {isEditing && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -right-10 cursor-pointer"
                      onClick={handleSubmitLanguage}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="#B4A5D7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
            {isEditing && (
              <div className="mt-6">
                <Image
                  loading="lazy"
                  onClick={() => {
                    handleSubmitLanguage();
                    handleAddLanguage();
                  }}
                  src={addicon}
                  alt=""
                  className="mt-6 w-14 h-14 cursor-pointer"
                />
              </div>
            )}
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

export default AcademicBackground;
