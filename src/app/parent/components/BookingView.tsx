import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import calendaricon from '../../../../public/calendaricongray.svg';

function BookingView({
  bookingStep,
  toggleSubjectDropdown,
  selectedSubjects,
  isSubjectDropdownOpen,
  setIsSubjectDropdownOpen,
  subjectOptions,
  handleSubjectClick,
  isTrialSession,
  toggleLevelDropdown,
  isLevelOpen,
  levelOptions,
  selectedLevel,
  handleLevelClick,
  handleNextBookingStep,
  tutor,
  setisTrialSession,
  isOpen,
  setIsOpen,
  selectedDate,
  handleDateChange,
  currentDate,
  months,
  handlePrevMonth,
  handleNextMonth,
  generateDays,
  selectedTime,
  handleTimeSelect,
  studentnote,
  handleConfirmBooking,
  removeSubject,
  setIsLevelOpen,
  setStudentnote,
  bookingInfo,
}: any) {
  const progressPercentage = bookingStep * 33.33;

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
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {bookingStep === 1 && (
          <div>
            <div className="flex flex-col items-center">
              <div className="photo mb-4 mt-4">
                <img
                  src={tutor?.user.profilePicture}
                  alt=""
                  className="rounded-full h-44 w-44 overflow-hidden"
                />
              </div>
              <div className="info mb-14 ">
                <h1 className="text-3xl text-[#685AAD] font-bold text-center">
                  Booking Request -{' '}
                  {
                    // @ts-ignore
                    tutor?.contactInformation.firstName
                  }{' '}
                  <br />
                  {
                    // @ts-ignore
                    tutor?.contactInformation.lastName
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
                                checked={selectedSubjects.includes(
                                  // @ts-ignore
                                  subject.value
                                )}
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

            <div className="mt-32 mb-14 max-w-[22rem] w-full mx-auto flex items-center justify-center ">
              <button
                onClick={handleNextBookingStep}
                className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="h-screen flex justify-center  ">
            <div className="  flex items-center flex-col w-full">
              <h1 className="text-4xl text-[#685AAD] mb-12">
                Choose a <span className="font-bold">date and time</span>
              </h1>

              {/* select a date */}
              <div className="w-full max-w-[482px] mx-auto relative ">
                <div className="w-full max-w-[482px] mx-auto relative">
                  {/* Input field */}
                  <div
                    className="w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-xl:text-2xl pl-10 pr-8 py-2 sm:py-3 rounded-full cursor-pointer flex justify-between items-center"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="text-purple-400">
                      {selectedDate
                        ? // @ts-ignore
                          selectedDate.toLocaleDateString()
                        : 'Select a date'}
                    </span>
                    <Image loading="lazy" src={calendaricon} alt="" className="w-6 h-6" />
                  </div>

                  {/* Calendar dropdown */}
                  {isOpen && (
                    <div className="bg-[#e2d5fd] text-[#a394d6] z-50 rounded-3xl p-4 shadow-lg absolute top-[72px] w-full  px-4 sm:px-10 py-4 sm:py-9">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-11  ">
                        <button onClick={handlePrevMonth} className="text-purple-600">
                          <ChevronLeft className="w-8 h-8 font-bold" />
                        </button>
                        <h2 className="text-[#685AAD] font-medium text-sm sm:text-xl custom-xl:text-3xl">
                          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <button onClick={handleNextMonth} className="text-purple-600">
                          <ChevronRight className="w-8 h-8 font-bold " />
                        </button>
                      </div>

                      {/* Days of week */}
                      <div className="grid grid-cols-7 gap-1 mb-2 ">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                          <div
                            key={index}
                            className="text-center text-[#76639b] text-sm sm:text-lg custom-xl:text-2xl font-medium"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {generateDays().map((day: any, index: any) => (
                          <button
                            key={index}
                            onClick={() => {
                              if (day.isCurrentMonth) {
                                handleDateChange(
                                  new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth(),
                                    day.day
                                  )
                                );
                              }
                            }}
                            className={`
                  p-2 text-center rounded-full text-sm sm:text-lg custom-xl:text-2xl font-medium
                  ${day.isCurrentMonth ? 'text-[#685aad] ' : 'text-[#d3c6ef]'}
                  ${
                    // @ts-ignore
                    selectedDate &&
                    selectedDate.getDate() === day.day &&
                    selectedDate.getMonth() === currentDate.getMonth() &&
                    selectedDate.getFullYear() === currentDate.getFullYear()
                      ? ''
                      : ''
                  }
                `}
                          >
                            {day.day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* seleect time */}
              <div className="w-full max-w-[482px] mx-auto mt-6 relative  ">
                <div className="w-full  relative">
                  {/* Input field */}
                  <div
                    className="relative  w-full bg-[#DBCAFF] text-[#a394d6] text-sm custom-lg:text-xl custom-xl:text-2xl pl-10 pr-3 py-2 sm:py-2 sm:pr-3 sm:pl-6 rounded-full cursor-pointer flex justify-between items-center"
                    // onClick={() => setIsOpentime(!isOpentime)}
                  >
                    <span className="text-[#a394d6]">Start time</span>

                    <div className=" h-full w-fit sm:w-full  sm:max-w-[219px] bg-[#685AAD] rounded-full text-xs sm:text-base custom-xl:text-xl flex items-center justify-start px-4 text-white p-1.5 truncate">
                      {/* {selectedTime} */}
                      <input
                        value={selectedTime}
                        onChange={(e: any) => {
                          e.preventDefault();
                          handleTimeSelect(e.target.value);
                        }}
                        id="time"
                        type="time"
                        className="w-full text-white bg-transparent "
                      />
                    </div>
                  </div>

                  {/* Time options dropdown */}
                </div>
              </div>

              <div className="mt-7 max-w-[437px] w-full">
                <input
                  autoFocus
                  className="w-full  h-24 p-4 rounded-lg bg-[#DBCAFF] outline-none focus:outline-none  text-[#B6A9E0] transition-colors duration-200 placeholder-[#B6A9E0] focus:ring-0 text-wrap"
                  placeholder="Write your instructions here..."
                  value={studentnote}
                  onChange={e => {
                    e.preventDefault();

                    setStudentnote(e.target.value);
                  }}
                />
              </div>

              <div className="mt-16 max-w-[22rem] w-full mx-auto flex items-center justify-center ">
                <button
                  onClick={handleNextBookingStep}
                  className=" w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {bookingStep === 3 && (
          <div className=" h-screen  gap-14 flex flex-col items-center justify-center">
            <h3 className="text-3xl text-[#685AAD] font-bold">Confirm your Booking</h3>
            <div className="w-full rounded-3xl max-w-[50rem] p-8 text-[#9184D2] bg-[#DBCAFF] border-red-500">
              <div>
                <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                  <p>tutor</p>
                  <p className="text-[#685AAD]">
                    {tutor?.contactInformation?.firstName} {tutor?.contactInformation?.lastName}
                  </p>
                </div>

                <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                  <p>Subject: </p>
                  <p className="text-[#685AAD]">{bookingInfo.subject}</p>
                </div>
                <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                  <p>Level: </p>
                  <p className="text-[#685AAD]">{bookingInfo.level}</p>
                </div>
                <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                  <p>Date: </p>
                  <p className="text-[#685AAD]">{bookingInfo.date}</p>
                </div>
                <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                  <p>Time: </p>
                  <p className="text-[#685AAD]">{bookingInfo.time}</p>
                </div>
              </div>
              {!isTrialSession && (
                <>
                  {/* <div className="border-b-2 border-[#9184D2]">
                      <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                        <p>Total Cost</p>
                        <p className="text-[#685AAD]">value</p>
                      </div>
                      <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                        <p>Discount</p>
                        <p className="text-[#685AAD]">value</p>
                      </div>
                    </div>
                    <div className="">
                      <div className="flex justify-between text-xl capitalize px-2 py-3 font-medium text-[#9184D2]">
                        <p>Total Cost</p>
                        <p className="text-[#685AAD]">value</p>
                      </div>
                    </div> */}
                </>
              )}
            </div>

            <div className="max-w-[22rem] w-full mx-auto flex items-center justify-center ">
              <button
                onClick={() => {
                  setisTrialSession(false);
                  handleConfirmBooking(tutor?._id);
                }}
                className="w-full   bg-[#8653FF] text-white px-2 py-2 sm:py-4 font-bold text-xl rounded-full hover:bg-[#5a3dd8] transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        )}

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
    </div>
  );
}

export default BookingView;
