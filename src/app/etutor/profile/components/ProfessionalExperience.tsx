import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import React from "react";
import {
  subjectLevelOptions,
  experienceoptions,
  ProfessionalExperienceProps,
} from "./Data";

export default function ProfessionalExperience({
  isEditing,
  currentJob,
  setCurrentJob,
  tutoringExperience,
  setTutoringExperience,
  moreAboutProfessionalExperience,
  setMoreAboutProfessionalExperience,
  selectedSubjectsLEVEL,
  setSelectedSubjectsLEVEL,
  selectedExperience,
  setSelectedExperience,
  toggleSubjectLEVELDropdown,
  toggleExperienceWithSpecialNeeds,
  removeExperience,
  handleExperienceClick,
  setIsCountryOpen,
  isExperienceOpen,
  handleSubjectLEVELClick,
  isSubjectLEVELDropdownOpen,
  setIsSubjectLEVELDropdownOpen,
  removeSubjectLEVEL,
  activeTab,
}: ProfessionalExperienceProps) {
  return (
    activeTab === "PROFESSIONALEXPERIENCE" && (
      <div className=" mt-8 sm:px-4">
        <h1 className="text-4xl font-bold text-[#685AAD]">
          Professional experience
        </h1>
        <div className="mt-11  ">
          <div className="flex flex-wrap justify-between gap-8">
            <div className="sm:max-w-[29rem] w-full">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                Current job <span className="text-[#FC7777]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 sm:mt-4 px-4 py-2.5 block placeholder:opacity-50 placeholder:text-white w-full rounded-lg text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                value={currentJob}
                placeholder="enter your current job"
                onChange={(e) => {
                  setCurrentJob(e.target.value);
                }}
                disabled={!isEditing}
              />
            </div>
            <div className="sm:max-w-[29rem] w-full">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD]">
                Tutoring experience years{" "}
                <span className="text-[#FC7777]">*</span>
              </label>
              <input
                type="text"
                className="mt-2 sm:mt-4 px-4 py-2.5 block w-full rounded-lg placeholder:opacity-50 placeholder:text-white text-white bg-[#B4A5D7] text-lg sm:text-xl md:text-xl"
                placeholder="enter tutoring experience years"
                value={tutoringExperience}
                onChange={(e) => {
                  setTutoringExperience(e.target.value);
                }}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <div className="w-full mt-9">
              <textarea
                className="mt-2 sm:mt-4 px-5 py-4 block w-full rounded-3xl scrollbar-none text-white bg-[#B4A5D7] placeholder:opacity-50 text-lg sm:text-xl md:text-xl placeholder:text-white"
                value={moreAboutProfessionalExperience}
                rows={5}
                onChange={(e) => {
                  setMoreAboutProfessionalExperience(e.target.value);
                }}
                disabled={!isEditing}
                placeholder="Tell us more about your professional experience."
              />
            </div>
          </div>

          <div className="flex justify-between flex-wrap gap-4">
            <div className="w-full sm:max-w-[29.7rem] mt-32 pt-1">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                Subject levels you want to teach
              </label>

              <div className="relative  select-none mt-3 ">
                <div
                  className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2 rounded-lg cursor-pointer flex justify-between items-center"
                  onClick={toggleSubjectLEVELDropdown}
                >
                  <span className="my-1">
                    {selectedSubjectsLEVEL.length > 0
                      ? `${selectedSubjectsLEVEL.length} selected`
                      : "select subject(s)"}
                  </span>
                  {isSubjectLEVELDropdownOpen ? (
                    <ChevronUp size={22} className="text-white " />
                  ) : (
                    <ChevronDown size={22} className="text-white " />
                  )}
                </div>

                {isSubjectLEVELDropdownOpen && (
                  <div
                    onMouseLeave={() => {
                      setIsSubjectLEVELDropdownOpen(false);
                    }}
                    className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                  >
                    <div
                      id="style-2"
                      className="max-h-[16.4rem] overflow-y-scroll  "
                    >
                      {subjectLevelOptions.map((subjectlevel) => (
                        <div
                          key={subjectlevel.value}
                          className=" py-2 cursor-pointer flex items-center"
                          onClick={() =>
                            handleSubjectLEVELClick(subjectlevel.value)
                          }
                        >
                          <div className=" border-b border-white py-2 flex  gap-4  w-full px-4 sm:max-w-[15rem] truncate">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedSubjectsLEVEL.includes(
                                  subjectlevel.value
                                )}
                                onChange={() => {}}
                                className="absolute opacity-0 cursor-pointer"
                              />
                              <div
                                className={`h-5 w-5 rounded-sm border border-white hover:bg-[#a394d6] hover:border-[#a394d6] flex items-center justify-center ${
                                  selectedSubjectsLEVEL.includes(
                                    subjectlevel.value
                                  )
                                    ? "bg-[#6c5baa] border-none p-0.5"
                                    : ""
                                }`}
                              >
                                {selectedSubjectsLEVEL.includes(
                                  subjectlevel.value
                                ) && <Check className="text-white" />}
                              </div>
                            </div>
                            <span className="ml-2 text-xl text-white ">
                              {subjectlevel.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedSubjectsLEVEL.length > 0 && (
                <div className="flex flex-wrap items-start justify-start  gap-2 mt-5      mx-auto min-h-[5rem]">
                  {selectedSubjectsLEVEL.map((subjectlevel) => (
                    <span
                      key={subjectlevel}
                      className="bg-[#B4A5D7] text-white px-4 gap-2 flex items-center  text-xl  w-fit py-2 rounded-lg justify-between"
                    >
                      {subjectlevel}
                      <X
                        hanging={20}
                        width={20}
                        className="  cursor-pointer"
                        onClick={() => removeSubjectLEVEL(subjectlevel)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Experience with special needs */}
            <div className="w-full sm:max-w-[29.7rem] mt-32 pt-1">
              <label className="block text-lg sm:text-xl font-semibold text-[#685AAD] ">
                Experience with special needs students (Optional)
              </label>

              <div className="relative  select-none mt-3 ">
                <div
                  className="w-full bg-[#B4A5D7] text-white font-normal  text-sm custom-lg:text-xl pr-8 pl-5 py-2 rounded-lg cursor-pointer flex justify-between items-center"
                  onClick={toggleExperienceWithSpecialNeeds}
                >
                  <span className="my-1">
                    {selectedExperience.length > 0
                      ? `${selectedExperience.length} selected`
                      : "select"}
                  </span>
                  {isExperienceOpen ? (
                    <ChevronUp size={22} className="text-white " />
                  ) : (
                    <ChevronDown size={22} className="text-white " />
                  )}
                </div>

                {isExperienceOpen && (
                  <div
                    onMouseLeave={() => {
                      setIsCountryOpen(false);
                    }}
                    className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#B4A5D7] text-white rounded-lg overflow-hidden z-10 w-[97%] mx-auto py-3  "
                  >
                    <div
                      id="style-2"
                      className="max-h-[16.4rem] overflow-y-scroll  "
                    >
                      {experienceoptions.map((experience) => (
                        <div
                          key={experience.value}
                          className=" py-2 cursor-pointer flex items-center"
                          onClick={() =>
                            handleExperienceClick(experience.value)
                          }
                        >
                          <div className=" border-b border-white  py-2 flex  gap-4  w-full px-4 sm:max-w-[15rem] truncate">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedExperience.includes(
                                  experience.value
                                )}
                                onChange={() => {}}
                                className="absolute opacity-0 cursor-pointer"
                              />
                              <div
                                className={`h-5 w-5 rounded-sm border border-white hover:bg-[#a394d6] hover:border-[#a394d6] flex items-center justify-center ${
                                  selectedExperience.includes(experience.value)
                                    ? "bg-[#6c5baa] border-none p-0.5"
                                    : ""
                                }`}
                              >
                                {selectedExperience.includes(
                                  experience.value
                                ) && <Check className="text-white" />}
                              </div>
                            </div>
                            <span className="ml-2 text-xl text-white ">
                              {experience.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedExperience.length > 0 && (
                <div className="flex flex-wrap items-start justify-start  gap-2 mt-5      mx-auto min-h-[5rem]">
                  {selectedExperience.map((experience: string) => (
                    <span
                      key={experience}
                      className="bg-[#B4A5D7] text-white px-4 gap-2 flex items-center  text-xl  w-fit py-2 rounded-lg justify-between"
                    >
                      {experience}
                      <X
                        hanging={20}
                        width={20}
                        className="  cursor-pointer"
                        onClick={() => removeExperience(experience)}
                      />
                    </span>
                  ))}
                </div>
              )}
            </div>
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
}
