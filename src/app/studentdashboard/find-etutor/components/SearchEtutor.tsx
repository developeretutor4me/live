import { Check, ChevronDown, ChevronUp, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import searchicon from '../../../../../public/search icon.svg';
import { options } from '../../components/Data';

const subjectOptions = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Algebra', label: 'Algebra' },
  { value: 'Geometry', label: 'Geometry' },
  { value: 'Calculus', label: 'Calculus' },
  { value: 'Trigonometry', label: 'Trigonometry' },
  { value: 'Statistics', label: 'Statistics' },
  { value: 'Science', label: 'Science' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Environmental Science', label: 'Environmental Science' },
  { value: 'Earth Science', label: 'Earth Science' },
  { value: 'English Language Arts', label: 'English Language Arts' },
  { value: 'Grammar', label: 'Grammar' },
  { value: 'Literature', label: 'Literature' },
  { value: 'Writing', label: 'Writing' },
  { value: 'Reading Comprehension', label: 'Reading Comprehension' },
  { value: 'Social Studies', label: 'Social Studies' },
  {
    value: 'History (World, U.S., Ancient)',
    label: 'History (World, U.S., Ancient)',
  },
  { value: 'Geography', label: 'Geography' },
  { value: 'Economics', label: 'Economics' },
  { value: 'Political Science', label: 'Political Science' },
  { value: 'Foreign Languages', label: 'Foreign Languages' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Chinese (Mandarin)', label: 'Chinese (Mandarin)' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Russian', label: 'Russian' },
  {
    value: 'Specialized & Advanced Subjects',
    label: 'Specialized & Advanced Subjects',
  },
  { value: 'Advanced Mathematics', label: 'Advanced Mathematics' },
  { value: 'Differential Equations', label: 'Differential Equations' },
  { value: 'Linear Algebra', label: 'Linear Algebra' },
  { value: 'Discrete Math', label: 'Discrete Math' },
  {
    value: 'Computer Science & Technology',
    label: 'Computer Science & Technology',
  },
  {
    value: 'Programming (Python, Java, C++)',
    label: 'Programming (Python, Java, C++)',
  },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'AI and Machine Learning', label: 'AI and Machine Learning' },
  { value: 'Business & Economics', label: 'Business & Economics' },
  { value: 'Accounting', label: 'Accounting' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Entrepreneurship', label: 'Entrepreneurship' },
  {
    value: 'Microeconomics/Macroeconomics',
    label: 'Microeconomics/Macroeconomics',
  },
];

const levelOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: '1', label: 'Level 1' },
  { value: '2', label: 'Level 2' },
  { value: '3', label: 'Level 3' },
  { value: '4', label: 'Level 4' },
  { value: '5', label: 'Level 5' },
  { value: '6', label: 'Level 6' },
  { value: '7', label: 'Level 7' },
  { value: '8', label: 'Level 8' },
  { value: '9', label: 'Level 9' },
  { value: '10', label: 'Level 10' },
  { value: 'advanced', label: 'Advanced' },
];

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

function SearchForm({ getEtutorsListHandler, isFetchingEtutor }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<string>('');
  const [sortedBy, setSortedBy] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<any>('');
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsSubjectDropdownOpen(false);
    setIsGenderOpen(false);
    setIsLevelOpen(false);
    setIsGenderOpen(false);
  };

  const handleOptionClick = (value: string) => {
    setSortedBy(value);
    setIsOpen(false);
  };

  const toggleSubjectDropdown = () => {
    setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
    setIsOpen(false);
    setIsGenderOpen(false);
    setIsLevelOpen(false);
  };

  const toggleLevelDropdown = () => {
    setIsLevelOpen(!isLevelOpen);
    setIsGenderOpen(false);
    setIsOpen(false);
    setIsGenderOpen(false);
  };

  const handleLevelClick = (level: string) => {
    setSelectedLevel(level);
    setIsLevelOpen(false);

    if (level === 'beginner') {
      setSliderValue(0);
    } else if (level === 'advanced') {
      setSliderValue(10);
    } else {
      setSliderValue(parseInt(level));
    }
  };

  const resetLevel = () => {
    setSelectedLevel('');
    setSliderValue(0);
  };

  const toggleGenderDropdown = () => {
    setIsGenderOpen(!isGenderOpen);
    setIsSubjectDropdownOpen(false);
    setIsOpen(false);
    setIsLevelOpen(false);
  };

  const handleGenderClick = (value: string) => {
    setSelectedGender(value);
    setIsGenderOpen(false);
  };

  const removeSubject = (subject: any) => {
    setSelectedSubjects(selectedSubjects.filter((item: any) => item !== subject));
  };

  const handleSubjectClick = (subject: any) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((item: any) => item !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }

    // setSearchParams((prev: any) => ({
    //   ...prev,
    //   subjects: selectedSubjects.includes(subject)
    //     ? selectedSubjects.filter((item: any) => item !== subject)
    //     : [...selectedSubjects, subject],
    // }));
  };

  return (
    <div className="space-y-4  bg-[#EDE8FA] px-[21px] py-6 rounded-3xl custom-xl:rounded-[40px] max-w-[1001px] mx-auto mt-3   min-h-screen   ">
      <div className="flex justify-between items-center flex-col custom-xl:flex-row space-x-2 pt-[26px]">
        <h1 className=" text-3xl custom-xl:text-[46.15px] custom-xl:leading-none font-bold text-[#685AAD] pl-10">
          Find eTutor
        </h1>

        <div className="flex flex-wrap justify-end  gap-7 custom-xl:pr-8 w-fit flex-col custom-xl:flex-row mt-1">
          <div className="relative order-2 custom-xl:order-1  h-fit   w-full custom-xl:w-fit">
            <div
              className={`bg-[#DBCAFF] text-[#8c7bc4] text-xs sm:text-sm pl-10 pr-8 py-2 transition-all duration-500 rounded-full cursor-pointer select-none   flex items-center justify-between w-full custom-xl:w-[16.5rem] ${
                isOpen ? 'border  border-[#a394d6]' : 'border border-transparent'
              } `}
              onClick={toggleDropdown}
            >
              <span>
                {options.find((option: any) => option.value === sortedBy)?.label || 'sort by'}
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
                        sortedBy === option.value ? '' : ''
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
              value={searchParams}
              onChange={(e: any) => {
                e.preventDefault();
                setSearchParams(e.target.value);
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

      <div className="pt-[116px]">
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
                <div id="style-2" className="max-h-[16.4rem] overflow-y-scroll">
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
              <span>
                {selectedLevel
                  ? levelOptions.find(option => option.value === selectedLevel)?.label ||
                    selectedLevel
                  : 'select level'}
              </span>

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
              {selectedLevel === ''
                ? 'Select Level'
                : sliderValue === 0
                  ? 'Beginner'
                  : sliderValue === 10
                    ? 'Advanced'
                    : `Level ${sliderValue}`}
            </span>
            <input
              type="range"
              min="0"
              max="10"
              value={sliderValue}
              onChange={e => {
                const value = parseInt(e.target.value);
                setSliderValue(value);
                if (value === 0) {
                  setSelectedLevel('beginner');
                } else if (value === 10) {
                  setSelectedLevel('advanced');
                } else {
                  setSelectedLevel(value.toString());
                }
              }}
              className="w-full scroll-smooth select-none mt-5  border-none accent-[#00DAE5]"
            />
            <p className="text-lg mt-2 mb-5 text-[#b9aed6]">Slide to adjust eTutor&apos;s level</p>
          </div>
        </div>

        <div className="mt-5 max-w-[22rem] w-full mx-auto flex items-center justify-center">
          <button
            onClick={async (e: any) => {
              if (isFetchingEtutor) {
              } else {
                getEtutorsListHandler({
                  sortedBy,
                  searchTerm: searchParams,
                  subjects: selectedSubjects,
                  level: selectedLevel,
                  gender: selectedGender,
                });
              }
            }}
            className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isFetchingEtutor}
          >
            {isFetchingEtutor ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Searching...</span>
              </div>
            ) : (
              'Search'
            )}
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
