import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Check, X } from 'lucide-react';
// import Image from 'next/image';
interface BookingStepOneProps {
  bookingStep: number;
  setBookingStep: any;
  selectedTutor: any;
  selectedSubjects: any;
  setSelectedSubjects: any;
  selectedLevel: any;
  setSelectedLevel: any;
}

const BookingStepOne = ({
  bookingStep,
  setBookingStep,
  selectedTutor,
  selectedSubjects,
  setSelectedSubjects,
  selectedLevel,
  setSelectedLevel,
}: BookingStepOneProps) => {
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState<boolean>(false);
  const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);
  const [subjectOptions, setSubjectOptions] = useState<any>([]);
  const [levelOptions, setLevelOptions] = useState<any>([]);
  const [validationErrors, setValidationErrors] = useState<{
    subjects?: string;
    level?: string;
  }>({});

  useEffect(() => {
    setSubjectOptions(selectedTutor?.experience?.subjectsTutored || []);
    setLevelOptions(selectedTutor?.experience.tutoringLevel || []);
  }, [selectedTutor]);

  const handleSubjectClick = (subject: any) => {
    setSelectedSubjects([...selectedSubjects, subject]);
    // Clear subjects validation error when subject is selected
    if (validationErrors.subjects) {
      setValidationErrors(prev => ({ ...prev, subjects: undefined }));
    }
  };

  const removeSubject = (subject: any) => {
    setSelectedSubjects(selectedSubjects.filter((s: any) => s !== subject));
  };

  const toggleLevelDropdown = () => {
    setIsLevelOpen(!isLevelOpen);
  };

  const handleLevelClick = (level: any) => {
    setSelectedLevel(level);
    // Clear level validation error when level is selected
    if (validationErrors.level) {
      setValidationErrors(prev => ({ ...prev, level: undefined }));
    }
  };

  const validateForm = () => {
    const errors: { subjects?: string; level?: string } = {};

    if (!selectedSubjects || selectedSubjects.length === 0) {
      errors.subjects = 'Please select at least one subject';
    }

    if (!selectedLevel || selectedLevel === '') {
      errors.level = 'Please select a level';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      setBookingStep(bookingStep + 1);
    }
  };

  return (
    <div className="flex relative items-start">
      <div
        className={`space-y-4 mt-8 bg-[#EDE8FA] px-6 py-8 rounded-3xl   ${
          bookingStep === 2 ? 'max-w-[49rem] w-full  mx-auto' : 'max-w-[62.5rem] w-full mx-auto '
        }  min-h-screen `}
      >
        <div className="w-full bg-[#e9deff] rounded-full h-[4px] mb-24">
          <div
            className="bg-[#6949ff] h-[4px] rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${bookingStep * 33.33}%` }}
          ></div>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <div className="photo mb-4 mt-4">
              <img
                src={selectedTutor?.user?.profilePicture}
                alt=""
                className="rounded-full h-44 w-44 overflow-hidden"
                width={176}
                height={176}
              />
            </div>
            <div className="info mb-14 ">
              <h1 className="text-3xl text-[#685AAD] font-bold text-center">
                Booking Request -{' '}
                {
                  // @ts-ignore
                  selectedTutor?.contactInformation.firstName
                }{' '}
                <br />
                {
                  // @ts-ignore
                  selectedTutor?.contactInformation.lastName
                }
              </h1>
              <p className="text-sm font-bold text-[#473171]  text-center">
                eTutors might change their fees, we recommend booking in bulk <br />
                to reserve their current fees.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[36rem] mx-auto">
            <div className="relative  select-none">
              <div
                className="w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center"
                onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
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
                        onClick={() => handleSubjectClick(subject)}
                      >
                        <div className="py-3 flex  gap-4  w-full px-4 max-w-[20rem]">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={selectedSubjects.includes(
                                // @ts-ignore
                                subject
                              )}
                              onChange={() => {}}
                              className="absolute opacity-0 cursor-pointer"
                            />
                            <div
                              className={`h-7 w-7  border-2 border-[#6C5BAA] hover:bg-[#a394d6] hover:border-[#a394d6] rounded-md flex items-center justify-center
                    ${
                      // @ts-ignore
                      selectedSubjects.includes(subject) ? 'bg-[#6c5baa]' : ''
                    }`}
                            >
                              {
                                // @ts-ignore
                                selectedSubjects.includes(subject) && (
                                  <Check className="text-white" />
                                )
                              }
                            </div>
                          </div>
                          <span className="ml-2 text-2xl text-[#6C5BAA] ">{subject}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {validationErrors.subjects && (
              <p className="text-red-500 text-sm mt-2 text-center">{validationErrors.subjects}</p>
            )}
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

          <div className="w-full max-w-[36rem] mx-auto mt-4">
            <div className="relative w-full select-none">
              <div
                className={`w-full bg-[#DBCAFF] text-[#a394d6]  text-sm custom-lg:text-xl custom-xl:text-2xl pr-7 sm:pr-14 pl-10 sm:pl-20 py-2 sm:py-4 rounded-full cursor-pointer flex justify-between items-center`}
                onClick={toggleLevelDropdown}
              >
                <span>{selectedLevel || 'select level'}</span>

                {isLevelOpen ? (
                  <ChevronUp size={30} className="text-[#a394d6]" />
                ) : (
                  <ChevronDown size={30} className="text-[#a394d6]" />
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
                        key={level}
                        className=" py-2 text-2xl text-[#6C5BAA] max-w-[20rem] "
                        onClick={() => handleLevelClick(level)}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {validationErrors.level && (
              <p className="text-red-500 text-sm mt-2 text-center">{validationErrors.level}</p>
            )}
          </div>

          <div className="mt-32 mb-14 max-w-[22rem] w-full mx-auto flex items-center justify-center ">
            <button
              onClick={handleNextClick}
              className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepOne;
