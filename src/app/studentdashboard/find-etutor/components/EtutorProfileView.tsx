import React, { useEffect, useState } from 'react';
import level1 from '../../../../../public/level-1.svg';
import level2 from '../../../../../public/level-2.svg';
import level3 from '../../../../../public/level-3.svg';
import level4 from '../../../../../public/level-4.svg';
import level5 from '../../../../../public/level-5.svg';
import level6 from '../../../../../public/level-6.svg';
import level7 from '../../../../../public/level-7.svg';
import level8 from '../../../../../public/level-8.svg';
import level9 from '../../../../../public/level-9.svg';
import level10 from '../../../../../public/level-10.svg';
import Image from 'next/image';

interface EtutorProfileViewProps {
  tutor: any;
  bookingRequests: any;
  session: any;
  isTrialSessionLeft: boolean;
  bookingSectionShowHandler: () => void;
}

const EtutorProfileView = ({
  tutor,
  bookingRequests,
  session,
  isTrialSessionLeft,
  bookingSectionShowHandler,
  // sessionData,
  // session,
  // parentdata,
  // setActiveMYEtutor,
  // showchat,
  // messagetutor,
  // setisTrialSession,
  // isTrialSession,
  // showTerminateEngament,
  // setIsmemberOpen,
  // selectedMembership,
  // ismemberOpen,
  // isOpen,
  // setIsDurationOpen,
  // selectedDuration,
  // handleSelect,
  // memberships,
  // handleStartBooking,
  // handleSelectduration,
  // durations,
  // isDurationOpen,
}: EtutorProfileViewProps) => {
  const [sessionExists, setSessionExists] = useState(false);
  const [ismemberOpen, setIsmemberOpen] = useState(false);

  useEffect(() => {
    async function checkSession() {
      if (tutor) {
        const exists = await isTutorSessionExist(bookingRequests, tutor?._id);
        setSessionExists(exists);
      }
    }
    checkSession();
  }, []);

  async function isTutorSessionExist(bookingRequests: any, tutorId: any) {
    return bookingRequests?.some((request: any) => request?.teacher?._id === tutorId);
  }

  if (!tutor) return <h1 className="text-black">nothing available</h1>;

  async function deleteBookings(teacherId: string, studentId: string) {
    if (confirm('are you sure?')) {
      try {
        const res = await fetch('/api/delete-bookings', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teacherId, studentId }),
        });

        if (!res.ok) {
          // Handle HTTP errors (e.g., 400, 500)
          const errorData = await res.json();
          throw new Error(errorData.message || 'Something went wrong');
        }

        const data = await res.json();
        alert('Engament Terminated');

        // Handle success case (maybe update UI or show a success message)
      } catch (error: any) {
        console.error('Error:', error.message);
        // Handle error case (e.g., show error notification to user)
      }
    }
  }

  const qualificationsHandler = () => {
    const levelsAndSubjects: any = [];

    tutor?.experience?.subjectsTutored.forEach((subject: any) => {
      levelsAndSubjects.push({ subject, level: '-' });
    });

    tutor?.experience?.tutoringLevel.forEach((level: any, index: number) => {
      const getSubjectAndLevel = levelsAndSubjects[index];
      if (getSubjectAndLevel) {
        getSubjectAndLevel.level = level;
      } else {
        levelsAndSubjects.push({ subject: '-', level });
      }
    });

    return (
      <tbody>
        {levelsAndSubjects.map((subjectAndLevel: any, index: any) => (
          <tr
            key={index}
            className="border-b border-[#75699C] last:border-b-0 bg-[#8876b8] text-[21px]"
          >
            <td className="py-3 px-4 text-white border-r border-[#75699C] pl-12">
              {subjectAndLevel.subject}
            </td>
            <td className="py-3 px-4 text-white pl-12">{subjectAndLevel.level}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <div className="bg-[#EDE8FA] rounded-3xl p-8 flex flex-col custom-xl:flex-row gap-5">
      {/* Left column */}
      <div className="w-full custom-xl:w-[63%] space-y-4">
        {/* Profile card */}
        <div className="bg-[#A296CC] rounded-3xl pl-6 py-6 pr-3 sm:pr-8 ">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row  w-full sm:w-fit items-center gap-8 pl-6 pt-4">
              <img
                src={tutor?.user?.profilePicture}
                alt="Tutor"
                className="w-20 h-20 sm:min-w-40 sm:min-h-40 rounded-full "
              />
              <div>
                <h2 className="text-xl text-center sm:text-start sm:text-3xl font-semibold capitalize ">
                  {tutor?.contactInformation.firstName} {tutor?.contactInformation.lastName}
                </h2>
                <p className="text-xl text-[#534988] max-w-[22rem] text-center sm:text-start">
                  EXPERIENCE (Formal): 1 to 3 years
                </p>
                <p className="text-xl text-[#534988] text-center sm:text-start">
                  BOOKINGs: {tutor?.totalbooking}
                </p>
              </div>
            </div>

            <div className="w-28 h-28 hidden sm:block ">
              <Image
                loading="lazy"
                src={
                  tutor?.level == '1'
                    ? level1
                    : tutor?.level == '2'
                      ? level2
                      : tutor?.level == '3'
                        ? level3
                        : tutor?.level == '4'
                          ? level4
                          : tutor?.level == '5'
                            ? level5
                            : tutor?.level == '6'
                              ? level6
                              : tutor?.level == '7'
                                ? level7
                                : tutor?.level == '8'
                                  ? level8
                                  : tutor?.level == '9'
                                    ? level9
                                    : tutor?.level == '10'
                                      ? level10
                                      : level1
                }
                alt=""
                className="w-full h-full"
              />
            </div>
          </div>

          <div className=" mt-8">
            <div>
              <p className="text-lg text-white">About me</p>
              <p className="text-[#473171] text-lg">{tutor?.aboutyou || 'Not Available'}</p>
            </div>
          </div>

          <div className="flex justify-between flex-col sm:flex-row  mt-8 pr-4">
            <div className="">
              <div className="mb-8">
                <h3 className="text-lg text-white">Availability:</h3>
                <p className="text-[#473171] text-lg">
                  {Object.entries(tutor?.experience?.generalAvailability).map(([day, times]) => (
                    <div key={day} className="flex">
                      <h3>{day} :</h3>{' '}
                      <p>
                        {
                          // @ts-ignore
                          times.join(', ')
                        }
                      </p>
                    </div>
                  ))}
                </p>
              </div>
              <div>
                <h3 className="text-lg text-white">Subjects:</h3>
                <p className="text-[#473171] text-lg">
                  {tutor?.experience.subjectsTutored.join(', ')}
                </p>
              </div>
            </div>

            <div className=" ">
              <div className="mb-8">
                <h3 className="text-lg text-white">Study</h3>
                <p className="text-[#473171] text-lg">{tutor?.education.degree}</p>
              </div>
              <div>
                <h3 className="text-lg text-white">Teaching Experience</h3>
                <p className="text-[#473171] text-lg">
                  {tutor?.experience?.tutoringExperience || 'Not Available'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications card */}
        <div className="flex   items-center gap-3">
          <div
            onClick={() => {
              // setActiveMYEtutor('My eTutor');
              // messagetutor(tutor);
              // showchat(true);
            }}
            className="bg-[#EDE8FA] rounded-2xl py-10 flex justify-center sm:justify-start   "
          >
            <button className="bg-[#8653FF] px-16 py-2  sm:px-20 sm:py-4 rounded-full text-2xl">
              Message eTutor
            </button>
          </div>
          {/* {showTerminateEngament && sessionExists && (
            <>
              <button
                onClick={() => {
                  deleteBookings(tutor._id, session?.user?.id);
                }}
                className="bg-[#FC7777] px-16 py-2  sm:px-20 sm:py-4 rounded-full text-2xl truncate"
              >
                Terminate Engament
              </button>
            </>
          )} */}
        </div>

        {/* Reviews card */}
        <div className="bg-[#A296CC] rounded-3xl p-7">
          <div className="">
            <h1 className="text-xl sm:text-3xl font-medium mb-4 pl-3">Qualifications</h1>

            <div>
              <div className="w-full  mx-auto bg-purple-600 rounded-t-3xl rounded-b-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[#534988] text-white ">
                      <th className="py-3  text-sm sm:text-xl font-medium pl-12 ">
                        SUBJECT/TUTORING
                      </th>
                      <th className="py-3 px-4 text-sm sm:text-xl font-medium">LEVEL</th>
                    </tr>
                  </thead>
                  {qualificationsHandler()}
                </table>
              </div>
            </div>
          </div>

          <div className="bg-[#A296CC] rounded-3xl ">
            <div>
              <h1 className="text-xl sm:text-3xl font-medium mb-8 pl-3 mt-8">Reviews</h1>
              <div className="bg-[#8876B8] rounded-3xl px-7 py-7">
                <div className="py-1 px-10 bg-[#534988] rounded-xl flex justify-end text-xs sm:text-lg">
                  8 Reviews in total
                </div>
                <div>
                  <div className="flex  items-center gap-4 py-6 border-b border-[#ffffff2c]">
                    <img
                      src="/assets/heroimg.png"
                      alt=""
                      className="w-8 sm:w-20 rounded-full border-2"
                    />
                    <div>
                      <h1 className="text-xl sm:text-3xl font-medium">Kishwar A.</h1>
                      <p className="text-xs sm:text-md">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur,
                        aperiam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div
        onMouseLeave={() => {
          // setIsmemberOpen(false);
          // setIsDurationOpen(false);
        }}
        className=" w-full custom-xl:w-[37%] space-y-4"
      >
        {/* Booking card */}
        <div className="bg-[#A296CC] rounded-3xl p-10 ">
          <h2 className="text-xl sm:text-4xl font-bold mb-4 text-white">
            {isTrialSessionLeft ? 'Current membership' : 'Current Packages'}
          </h2>
          <div className="bg-[#685AAD] rounded-2xl px-5 py-4 mb-4">
            <h3 className="text-2xl font-bold text-white">Pay As You Go</h3>
            <p className="text-sm text-white/90">No commitment. Pay only when you book.</p>
          </div>
          <p className="text-sm sm:text-base mb-6 text-white">
            {isTrialSessionLeft ? (
              <>
                Enjoy a free trial session to see if this etutor is the right fit.
                <br />
                <br />
                If you like the experience, you'll find them saved in your{' '}
                <span className="font-bold">My eTutor</span> section to book more.
              </>
            ) : (
              <>Tailor your learning. Select the exact session duration you need and pay only as you book</>
            )}
          </p>
          {/* drop downs */}

          {/* membership drop down */}
          <div className="bg-[#685AAD] py-3 sm:py-6 px-2 sm:px-4 rounded-xl font-sans relative mb-4">
            {/* <button
              onClick={() => {
                // setisTrialSession(false);
                // setIsmemberOpen((prevState: any) => !prevState);
                // setIsDurationOpen(false);
              }}
              className={`w-full bg-purple-600 text-[#B3ACD6] py-3 px-4 rounded-lg flex justify-between items-center ${
                ismemberOpen && 'text-white'
              }`}
            >
              <span className="text-xl font-bold text-nowrap">
                {selectedMembership ? (
                  <span className="text-white">
                    {
                      // @ts-ignore
                      selectedMembership?.name
                    }
                  </span>
                ) : (
                  'Select membership'
                )}
              </span>
              {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button> */}

            {/* {ismemberOpen && (
              <div className="absolute z-50 left-0 w-full bg-[#685AAD] rounded-lg shadow-lg mt-7">
                {memberships.map((membership: any) => (
                  <div
                    key={membership.name}
                    // @ts-ignore
                    onClick={() => handleSelect(membership)}
                    className="p-4 hover:bg-purple-700 cursor-pointer border-b border-purple-500 last:border-b-0 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white">{membership.name}</h3>
                      <p className="text-purple-200">
                        <span className="text-2xl font-bold">${membership.price}</span> /{' '}
                        <span className="font-semibold">
                          {membership.sessions} sessions /{' '}
                          <span className="text-[#00dae5]">month</span>{' '}
                        </span>
                      </p>
                    </div>
                    {
                      // @ts-ignore
                      selectedMembership?.name === membership.name && (
                        <Check size={24} className="text-white" />
                      )
                    }
                  </div>
                ))}
              </div>
            )} */}
          </div>

          {/* duration drop down */}

          {/* <div className="bg-[#685AAD] py-3 sm:py-6 px-2 sm:px-4 rounded-xl font-sans relative mb-4">
            <button
              onClick={() => {
                setisTrialSession(false);
                setIsDurationOpen((prevState: any) => !prevState);
                setIsmemberOpen(false);
              }}
              className="w-full bg-purple-600 text-[#B3ACD6] py-3 px-4 rounded-lg flex justify-between items-center"
            >
              <span
                className={`text-xl font-bold ${
                  isDurationOpen && 'text-white transition-all duration-300 text-nowrap'
                }`}
              >
                {selectedDuration ? (
                  <span className="text-white">
                    {
                      // @ts-ignore
                      selectedDuration.name
                    }
                  </span>
                ) : (
                  'Select package  duration'
                )}
              </span>
              {isDurationOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>

            {isDurationOpen && (
              <div className="absolute left-0 w-full bg-[#685AAD] rounded-lg shadow-lg mt-8  transition-transform duration-500">
                {durations.map((duration: any) => (
                  <div
                    key={duration.name}
                    onClick={() => {
                      handleSelectduration(duration);
                      setisTrialSession(false);
                    }}
                    className="p-9 hover:bg-purple-700 cursor-pointer border-b border-purple-500 last:border-b-0 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-2xl  text-white">{duration.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div> */}

          <div className="bg-[#B9AFDB] p-6 rounded-3xl">
            <button
              onClick={() => {
                bookingSectionShowHandler();
              }}
              className="w-full bg-[#8653FF] text-white py-2 sm:py-4 text-xl rounded-full mb-4 font-semibold"
            >
              {isTrialSessionLeft ? 'Book A Trial' : 'Book Session'}
            </button>

            <button
              onClick={() => {
                // message etutor handler
              }}
              className="w-full bg-[#564589] text-white py-2 sm:py-4 text-xl rounded-full font-semibold"
            >
              Message eTutor
            </button>
          </div>
        </div>

        {/* 24/7 Support card */}
        <div
          onClick={() => {
            //setActiveMYEtutor('Contact Support');
          }}
          className="bg-[#A296CC] rounded-2xl p-6 hover:cursor-pointer"
        >
          <h3 className="font-semibold mb-2 text-lg text-white">24/7 SUPPORT</h3>
          <p className="text-sm text-[#473171]">Need help?</p>
          <p className="text-sm text-[#473171]">Contact us</p>
        </div>
      </div>
    </div>
  );
};

export default EtutorProfileView;
