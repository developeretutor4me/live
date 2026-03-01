import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import chaticon from '../../../../public/chaticonwhite.svg';
import foldericon from '../../../../public/folder icon white.svg';
import profilewhite from '../../../../public/profile icon white.svg';
import noschedual from '../../../../public/noschedualsessions.svg';
import { BookingRequest } from './Data';

interface IUpComingGroupTabprops {
  requests: BookingRequest[];
  expandedRequestId: string;
  setexpandedRequestId: (id: string) => void;
}

function UpComingGroupTab({
  requests,
  expandedRequestId,
  setexpandedRequestId,
}: IUpComingGroupTabprops) {
  const router = useRouter();

  return (
    <div className="px-2  py-2 custom-xl:px-7 custom-xl:py-5 w-full space-y-6">
      {/* Header Row */}
      <div className="hidden custom-xl:grid custom-xl:grid-cols-4 mb-5 text-sm custom-lg:text-xl custom-xl:pl-9  w-[68%] text-white">
        <div className="px-4  ">Subject and level</div>
        <div className="px-4  ">eTutor</div>
        <div className="px-4  ">Duration</div>
        <div className="px-4  ">Date and Time</div>
      </div>

      {/* Session Card */}
      {requests.length !== 0 ? (
        <>
          {requests.map((request: any) => {
            const isExpanded = expandedRequestId === request._id;
            return (
              <div
                key={request._id}
                className={`w-full transition-all duration-300 ease-in-out bg-[#564589] rounded-lg custom-xl:pl-9 h-auto ${
                  isExpanded ? 'py-4' : 'py-2'
                } overflow-hidden cursor-pointer`}
                onMouseEnter={() => setexpandedRequestId(request._id)}
                onMouseLeave={() => setexpandedRequestId('')}
              >
                <div className="flex flex-col  custom-xl:flex-row custom-xl:items-start h-full">
                  {/* Content Section */}
                  <div className="flex-1 p-4 flex flex-col custom-xl:flex-row items-start custom-xl:items-center">
                    <div className="grid grid-cols-2 custom-xl:grid-cols-4 gap-4 w-full">
                      {/* Subject */}
                      {/* <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2">
                        <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                          Subject and level
                        </span>
                        <span className="text-white text-base custom-xl:text-xl  font-medium">
                          {request.subjects || ''}
                        </span>
                        <div
                          className={`text-white ${
                            isExpanded
                              ? 'opacity-100 block transition-all duration-300 ease-in-out'
                              : 'opacity-0 hidden transition-all duration-300 ease-in-out'
                          }`}
                        >
                          PAYg session
                        </div>
                      </div> */}
                      <div className="flex flex-col custom-xl:block transition-all duration-300 ease-in-out custom-xl:pt-2 min-w-0">
                        <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                          Subject and level
                        </span>
                        <span className="text-white text-base custom-xl:text-xl  font-medium whitespace-normal break-words break-all">
                          {request.subjects.join(' / ') + ' / ' + request.level}
                        </span>
                      </div>

                      {/* Tutor */}
                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">eTutor</span>
                        <span className="text-white text-base custom-xl:text-xl ">
                          {
                            // @ts-ignore
                            request.teacher?.contactInformation?.firstName || 'Your Teacher'
                          }
                        </span>
                        <div
                          className={` ${
                            isExpanded
                              ? 'opacity-100 block transition-all duration-300 ease-in-out'
                              : 'opacity-0 hidden transition-all duration-300 ease-in-out '
                          }`}
                        >
                          <div className="flex  gap-6 items-center  mt-2">
                            <span>
                              <Image
                                loading="lazy"
                                // onClick={() => {}}
                                src={chaticon}
                                alt=""
                                className="w-5 h-5"
                              />
                            </span>
                            <span>
                              <Image
                                loading="lazy"
                                // onClick={() => {}}
                                src={foldericon}
                                alt=""
                                className="w-5 h-5"
                              />
                            </span>
                            <span
                              onClick={() => {
                                if (request.teacher?._id) {
                                  router.push(`/parent/find-etutor/${request.teacher._id}`);
                                }
                              }}
                            >
                              <Image loading="lazy" src={profilewhite} alt="" className="w-5 h-5" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                        <span className="text-white/60 text-sm custom-xl:hidden mb-1">
                          Duration
                        </span>
                        <span className="text-white text-base custom-xl:text-xl">
                          {request.duration || ''}
                        </span>
                      </div>

                      {/* Date/Time */}
                      <div className="flex flex-col custom-xl:block custom-xl:pt-2">
                        <span className="text-white/60 text-sm custom-xl:hidden mb-1 text-white">
                          Date and Time
                        </span>
                        <span className="text-white text-base custom-xl:text-xl">
                          {`${new Date(request.date)
                            .toLocaleDateString('en-GB')
                            .replace(/\//g, '/')
                            .slice(0, 10)}`}
                        </span>
                        <div
                          className={`text-xl text-white ${
                            isExpanded
                              ? 'opacity-100 block transition-all duration-300 ease-in-out'
                              : 'opacity-0 hidden transition-all duration-300 ease-in-out'
                          }`}
                        >
                          {`${new Date(request.date).toLocaleDateString('en-GB', {
                            weekday: 'short',
                          })}`}{' '}
                          {request.time || ''}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons Section */}
                  <div
                    className={`flex flex-col custom-xl:flex-row gap-2  custom-xl:gap-4  h-full ${
                      isExpanded ? 'py-6 px-4' : 'p-4'
                    } transition-all duration-300 ease-in-out  custom-xl:pl-0 `}
                  >
                    <button
                      onClick={() => router.push(`/parent/sessions/${request._id}`)}
                      className="w-full  custom-xl:h-full custom-xl:w-auto bg-[#473171] text-white px-8 py-2 rounded-md text-sm custom-xl:text-xl hover:bg-[#3d2961] transition-colors"
                    >
                      Edit Session
                    </button>
                    <a href={request.joinLink} target="_blank">
                      <button className="w-full custom-xl:h-full  custom-xl:w-auto bg-[#8653FF] text-white px-8 py-2 rounded-md text-sm custom-xl:text-xl hover:bg-[#7340ff] transition-colors">
                        Meeting Link
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <Image loading="lazy" src={noschedual} alt="" className="mx-auto " />
      )}
    </div>
  );
}

export default UpComingGroupTab;
