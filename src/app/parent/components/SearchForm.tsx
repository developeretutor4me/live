import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import searchicon from '../../../../public/search icon.svg';

function SearchForm({
  isOpen,
  toggleDropdown,
  selectedOption,
  handleOptionClick,
  options,
  setIsOpen,
  searchParams,
  handleInputChange,
  isSubjectDropdownOpen,
  toggleSubjectDropdown,
  subjectOptions,
  selectedSubjects,
  handleSubjectClick,
  removeSubject,
  isLevelOpen,
  toggleLevelDropdown,
  levelOptions,
  selectedLevel,
  handleLevelClick,
  isGenderOpen,
  toggleGenderDropdown,
  genderOptions,
  selectedGender,
  handleGenderClick,
  isLoading3,
  loading,
  handleSearched,
  setIsSubjectDropdownOpen,
  setIsLevelOpen,
}: any) {
  return (
    <div className="space-y-4  bg-[#EDE8FA] px-[21px] py-6 rounded-3xl custom-xl:rounded-[40px] max-w-[1001px] mx-auto mt-3   min-h-screen   ">
      <div className="flex justify-between items-center flex-col custom-xl:flex-row space-x-2 pt-[26px]">
        <h1 className=" text-3xl custom-xl:text-[46.15px] custom-xl:leading-none font-bold text-[#685AAD] pl-10">
          Find eTutor
        </h1>

        {/* -----------sort by dropdown------- */}

        <div className="flex flex-wrap justify-end   gap-7 custom-xl:pr-8 w-fit flex-col custom-xl:flex-row mt-1">
          <div className="relative order-2 custom-xl:order-1  h-fit   w-full custom-xl:w-fit">
            <div
              className={`bg-[#DBCAFF] text-[#8c7bc4] text-xs sm:text-sm pl-10 pr-8 py-2 transition-all duration-500 rounded-full cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[16.5rem] ${
                isOpen ? 'border  border-[#a394d6]' : 'border border-transparent'
              } `}
              onClick={toggleDropdown}
            >
              <span>
                {options.find((option: any) => option.value === selectedOption)?.label || 'sort by'}
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
                className="py-3 max-w-[15.7rem] w-full transition-all duration-500  absolute top-full left-0 m-auto  bg-[#DBCAFF] border  border-[#a394d6] px-5 text-[#8f81c7] text-xs sm:text-sm mt-2.5  ml-1.5 rounded-xl shadow-lg z-10  h-fit"
              >
                <ul id="style-2" className=" overflow-y-auto max-h-[13rem] scrollstyle   ">
                  {options.map((option: any) => (
                    <li
                      key={option.value}
                      className={` first:pb-3 first:pt-0 py-3 cursor-pointer last:border-b-0 border-b border-[#8f81c7]  text-[#6C5BAA] text-lg max-w-[10.9rem]   ${
                        selectedOption === option.value ? '' : ''
                      }`}
                      onClick={() => handleOptionClick(option.value)}
                    >
                      <span className="pl-1 ">{option.label}</span>
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
              className=" bg-[#DBCAFF] text-[#a394d6] placeholder-[#a394d6] px-10  py-2 rounded-full border border-transparent w-full  custom-xl:w-[19.4rem] focus:outline-none focus:ring-0"
              value={searchParams.searchTerm}
              // @ts-ignore
              onChange={(e: any) => {
                e.preventDefault();
                handleInputChange('searchTerm', e.target.value);
              }}
            />
            <Image
              loading="lazy"
              src={searchicon}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#6949ff] w-4 h-4 "
              alt={''}
            />
          </div>
        </div>
      </div>

      <div className="  pt-[116px] ">
        <div className="w-full max-w-[36rem] mx-auto">
          <div className="relative  select-none">
            <div
              className="w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center"
              onClick={toggleSubjectDropdown}
            >
              <span>
                {selectedSubjects.length > 0
                  ? `${selectedSubjects.length} selected`
                  : 'select subject(s)'}
              </span>
              {isSubjectDropdownOpen ? (
                <ChevronUp size={30} className="text-[#a394d6] " />
              ) : (
                <ChevronDown size={30} className="text-[#a394d6] " />
              )}
            </div>

            {isSubjectDropdownOpen && (
              <div
                onMouseLeave={() => {
                  setIsSubjectDropdownOpen(false);
                }}
                className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-7  "
              >
                <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll  ">
                  {subjectOptions.map((subject: any) => (
                    <div
                      key={subject.value}
                      className=" py-2 cursor-pointer flex items-center"
                      onClick={() => handleSubjectClick(subject.value)}
                    >
                      <div className=" border-b-2 border-[#a394d682] py-3 flex  gap-4  w-full px-4 max-w-[20rem]">
                        <div className="relative">
                          <input
                            type="checkbox"
                            // @ts-ignore
                            checked={selectedSubjects.includes(subject.value)}
                            onChange={() => {}}
                            className="absolute opacity-0 cursor-pointer"
                          />
                          <div
                            className={`h-7 w-7  border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-md flex items-center justify-center 
                        ${
                          // @ts-ignore
                          selectedSubjects.includes(subject.value) ? 'bg-[#6c5baa]' : ''
                        }`}
                          >
                            {
                              // @ts-ignore
                              selectedSubjects.includes(subject.value) && (
                                <Check className="text-white" />
                              )
                            }
                          </div>
                        </div>
                        <span className="ml-2 text-2xl text-[#6C5BAA] ">{subject.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {selectedSubjects.length > 0 && (
            <div className="flex flex-wrap items-start justify-start gap-2 mt-6  max-w-[26rem] mx-auto min-h-[3.4rem]">
              {selectedSubjects.map((subject: any) => (
                <span
                  key={subject}
                  className="bg-[#6C5BAA] text-white px-4 py-1.5 rounded-full flex items-center   justify-between"
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

        {/* level */}

        <div className="w-full max-w-[36rem] mx-auto mt-5">
          <div className="relative w-full select-none">
            <div
              className={`w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center`}
              onClick={toggleLevelDropdown}
            >
              <span>{selectedLevel || 'select level'}</span>

              {isLevelOpen ? (
                <ChevronUp size={30} className="text-[#a394d6] " />
              ) : (
                <ChevronDown size={30} className="text-[#a394d6] " />
              )}
            </div>
            {isLevelOpen && (
              <div
                onMouseLeave={() => {
                  setIsLevelOpen(false);
                }}
                className="absolute top-full left-0 right-0 px-8 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[92%] mx-auto py-7  "
              >
                <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll  ">
                  {levelOptions.map((level: any) => (
                    <div
                      key={level.value}
                      className=" py-2 text-2xl text-[#6C5BAA] border-b-2 border-[#a394d682]  max-w-[20rem] "
                      onClick={() => handleLevelClick(level.value)}
                    >
                      {level.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/*---------Select gender---  */}

        <div className="w-full max-w-[36rem] mx-auto mt-4">
          <div className="relative  select-none">
            <div
              className={`w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center`}
              onClick={toggleGenderDropdown}
            >
              <span>{selectedGender || 'select gender'}</span>

              {isGenderOpen ? (
                <ChevronUp size={30} className="text-[#a394d6]" />
              ) : (
                <ChevronDown size={30} className="text-[#a394d6]" />
              )}
            </div>
            {isGenderOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#DBCAFF] rounded-3xl overflow-hidden z-10 w-[90%] mx-auto py-5">
                {genderOptions.map((gender: any) => (
                  <div
                    key={gender.value}
                    className="py-2 text-2xl text-[#6C5BAA] border-b-2 border-[#a394d682] w-[80%] mx-auto"
                    onClick={() => handleGenderClick(gender.value)}
                  >
                    {gender.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ------range------ */}
        <div className="w-full max-w-[22rem] mx-auto mt-4">
          <div className="relative  select-none flex items-center flex-col justify-center">
            <span className="text-5xl text-[#685AAD] font-bold mt-5">
              {searchParams.tutorLevel}
            </span>
            <input
              type="range"
              min="1"
              max="10"
              // value={searchParams.tutorLevel}
              // onChange={(e) =>
              //   // handleInputChange("tutorLevel", parseInt(e.target.value))
              // }
              className="w-full scroll-smooth select-none mt-5  border-none accent-[#00DAE5]"
            />
            <p className="text-lg mt-2 mb-5 text-[#b9aed6]">Slide to adjust eTutor&apos;s level</p>
          </div>
        </div>

        <div className="mt-5 max-w-[22rem] w-full mx-auto flex items-center justify-center">
          <button
            onClick={async (e: any) => {
              if (isLoading3) {
              } else {
                handleSearched();
              }
            }}
            className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
          >
            {loading ? 'wait...' : 'Search'}
          </button>
        </div>
        <div className="max-w-[40rem] w-full bg-[#e2d6fd] rounded-3xl  mt-10 px-12 py-4 mx-auto">
          <h1 className="text-[#685AAD] text-sm sm:text-xl font-bold">
            Want <span className="text-[#8653FF]"> discounts? </span>{' '}
          </h1>
          <p className="text-[#685AAD] text-md mt-3">
            Discounts apply when you book 6, 11, 26, or more sessions in bulk. <br />
            You will only be charged after you complete your sessions with the eTutors.
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

          background-color: #8f81c7;
        }
      `}</style>
    </div>
  );
}

export default SearchForm;
