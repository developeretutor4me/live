'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import styles from './session.module.css';
import UpComingIndividualTab from './UpComingIndividualTab';
import { BookingRequest } from './Data';
import CompletedIndividualTab from './CompletedIndividualTab';
import UpComingGroupTab from './UpComingGroupTab';
import CompletedGroupTab from './CompletedGroupTab';
import RequestTrialTab from './RequestTrialTab';
import ApplicationTrialTab from './ApplicationTrialTab';

interface ISessionDashboardrops {
  parentdata: any;
}

const SessionDashboard = ({ parentdata }: ISessionDashboardrops) => {
  const { toast } = useToast();
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState('individual');
  const [activeSubTab, setActiveSubTab] = useState('upcoming');
  const [requests, setRequests] = useState<{
    isTrialSessionUpcoming: any;
    isTrialSessionCompleted: any;
    isGroupBookingUpcoming: any;
    isGroupBookingCompleted: any;
  }>({
    isTrialSessionUpcoming: [],
    isTrialSessionCompleted: [],
    isGroupBookingUpcoming: [],
    isGroupBookingCompleted: [],
  });
  const [teachers, setTeachers] = useState([]);

  const [error, setError] = useState<string | null>(null);
  const [requestsfromteacher, setrequestsfromteacher] = useState([]);
  const [expandedRequestId, setexpandedRequestId] = useState('');
  const [waiting, setWaiting] = useState<any>({ id: null, action: null });

  useEffect(() => {
    fetchRequests();
    fetchSendRequests();
  }, [session, activeSubTab]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `/api/Fetch-sendingrequests-fromteacher?userId=${session?.user.id}`
      );
      const data = await response.json();

      if (response.ok) {
        setrequestsfromteacher(data.requests);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('/api/fetchteachers');

      if (response.status === 200) {
        setTeachers(response.data);
      }
    } catch (error) {
      setError('Error fetching teachers data');
    }
  };

  const fetchSendRequests = async () => {
    try {
      const response = await fetch('/api/booking/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();

        const isTrialSessionUpcoming = data.bookingRequests.filter(
          (item: any) => item.IsTrialSession === true && item.meetingCompleted === false
        );
        const isTrialSessionCompleted = data.bookingRequests.filter(
          (item: any) => item.IsTrialSession === true && item.meetingCompleted === true
        );
        const isGroupBookingUpcoming = data.bookingRequests.filter(
          (item: any) => item.isGroupBooking === true && item.meetingCompleted === false
        );
        const isGroupBookingCompleted = data.bookingRequests.filter(
          (item: any) => item.isGroupBooking === true && item.meetingCompleted === true
        );

        setRequests({
          isTrialSessionUpcoming: isTrialSessionUpcoming,
          isTrialSessionCompleted: isTrialSessionCompleted,
          isGroupBookingUpcoming: isGroupBookingUpcoming,
          isGroupBookingCompleted: isGroupBookingCompleted,
        });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateRequestStatus = async (id: any, status: any) => {
    try {
      const response = await axios.patch(`/api/Teacher-Request`, {
        id,
        status,
      });

      setrequestsfromteacher(prevRequests =>
        prevRequests.filter((request: any) => request._id !== id)
      );
    } catch (err) {
      console.error(err);

      toast({
        title: 'Failed to update the request status.',
        description: '',
        variant: 'destructive',
      });
    } finally {
      setWaiting({ id: null, action: null });
    }
  };

  const getTabColors = (tabName: string) => {
    if (activeTab === 'individual') {
      if (tabName === 'group') return '#9B85C8';
      if (tabName === 'trial') return '#6B5692';
    } else if (activeTab === 'group') {
      if (tabName === 'individual') return '#6B5692';
      if (tabName === 'trial') return '#9B85C8';
    } else if (activeTab === 'trial') {
      if (tabName === 'group') return '#9B85C8';
      if (tabName === 'individual') return '#6B5692';
    }
    return '#EDE8FA'; // Active tab color
  };
  return (
    <>
      <div className={`${styles.maindiv} `}>
        {/* Individual Tab */}
        <div
          onClick={() => setActiveTab('individual')}
          className={`${styles.individualtab} individualtab `}
          style={{ backgroundColor: getTabColors('individual') }}
        >
          {/* Top arc (was before) */}
          <button
            className={`
                  ${activeTab === 'individual' ? 'text-[#685AAD]' : 'text-white'}`}
            style={{ backgroundColor: getTabColors('individual') }}
          >
            <span className="">INDIVIDUAL SESSION</span>
          </button>
          {/* Bubble bump (was after) */}
          <div className={`${styles.bubble} bubble ${getTabColors('individual')}`} />
        </div>

        {/* Group Tab */}
        <div className={`${styles.grouptab} grouptab`}>
          <div
            onClick={() => setActiveTab('group')}
            className={`${styles.subgrouptab}`}
            style={{ backgroundColor: getTabColors('group') }}
          >
            <button
              className={`
                  ${activeTab === 'group' ? 'text-[#685AAD]' : 'text-white'}`}
              style={{ backgroundColor: getTabColors('group') }}
            >
              <span className="">GROUP SESSION</span>
            </button>
            <div className="bubble" />
          </div>
        </div>

        {/* Trial Tab */}
        <div className={`${styles.trialtab} trialtab`}>
          <div
            onClick={() => setActiveTab('trial')}
            className={`${styles.subtrialtab}`}
            style={{ backgroundColor: getTabColors('trial') }}
          >
            <button
              className={` 
                  ${activeTab === 'trial' ? 'text-[#685AAD]' : 'text-white'} `}
              style={{ backgroundColor: getTabColors('trial') }}
            >
              <span className="">TRIAL SESSION</span>
            </button>
            <div className={`bubble`} />
          </div>
        </div>

        {/* Active content display */}
        <div className={`${styles.contentdiv}`}>
          <div className="relative  h-full ">
            <div
              className={`${activeTab === 'trial' ? 'hidden' : 'hidden custom-2xl:flex'}   text-[#685AAD] absolute right-[4.5%] -top-[17%] font-bold text-xs px-2 transition-all  w-full max-w-[291px] h-full max-h-[68px] py-7   md:text-sm custom-xl:text-2xl   rounded-md sm:rounded-xl mb-1 uppercase  bg-[#EDE8FA]   items-center justify-center `}
            >
              Sessions&nbsp;left: {parentdata?.user.sessionsPerMonth || 0}
            </div>

            <div className="mt-[40px] sm:mt-[57px] ml-3 ">
              {activeTab === 'trial' ? (
                <div className="bg-[#473171] ml-2 sm:ml-10  py-3 px-3 text-sm rounded-xl w-fit flex ">
                  <button
                    onClick={() => setActiveSubTab('upcoming')}
                    className={`flex-1 py-3 sm:py-6 px-7 sm:px-[51px]  text-center rounded-xl transition-all duration-300 ${
                      activeSubTab === 'upcoming'
                        ? 'bg-[#8653FF] text-white transition-all'
                        : 'text-[#d8b4fe] transition-all'
                    }`}
                  >
                    Requests
                  </button>
                  <button
                    onClick={() => setActiveSubTab('completed')}
                    className={`flex-1 py-3 sm:py-6 px-[20px] sm:px-[46px] text-center rounded-xl transition-all duration-300 ${
                      activeSubTab === 'completed' ? 'bg-[#8653FF] text-white' : 'text-[#d8b4fe]'
                    }`}
                  >
                    Application
                  </button>
                </div>
              ) : (
                <div className="bg-[#473171] ml-2 sm:ml-10 py-3 px-3 text-sm rounded-xl w-fit flex  ">
                  <button
                    onClick={() => setActiveSubTab('upcoming')}
                    className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${
                      activeSubTab === 'upcoming' ? 'bg-[#8653FF] text-white' : 'text-[#d8b4fe]'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveSubTab('completed')}
                    className={`flex-1 py-3 sm:py-6 px-6 sm:px-12 text-center rounded-xl transition-all duration-300 ${
                      activeSubTab === 'completed' ? 'bg-[#8653FF] text-white' : 'text-[#d8b4fe]'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#a296cc] p-2 custom-xl:p-4 rounded-3xl mt-9  min-h-full overflow-auto  ">
              {/* --------------individual session-----------------   */}
              {activeTab === 'individual' && (
                <>
                  {activeSubTab === 'upcoming' && (
                    <UpComingIndividualTab
                      requests={requests.isTrialSessionUpcoming}
                      expandedRequestId={expandedRequestId}
                      setexpandedRequestId={setexpandedRequestId}
                    />
                  )}

                  {activeSubTab === 'completed' && (
                    <CompletedIndividualTab
                      requests={requests.isTrialSessionCompleted}
                      expandedRequestId={expandedRequestId}
                      setexpandedRequestId={setexpandedRequestId}
                    />
                  )}
                </>
              )}

              {/* -----------------group session------------- */}
              {activeTab === 'group' && (
                <>
                  <div>
                    {activeSubTab === 'upcoming' && (
                      <UpComingGroupTab
                        requests={requests.isGroupBookingUpcoming}
                        expandedRequestId={expandedRequestId}
                        setexpandedRequestId={setexpandedRequestId}
                      />
                    )}
                  </div>
                  <div>
                    {activeSubTab === 'completed' && (
                      <CompletedGroupTab
                        requests={requests.isGroupBookingCompleted}
                        expandedRequestId={expandedRequestId}
                        setexpandedRequestId={setexpandedRequestId}
                      />
                    )}
                  </div>
                </>
              )}

              {/* ------------------trial session----------------- */}
              {activeTab === 'trial' && (
                <>
                  <div>
                    {activeSubTab === 'upcoming' && (
                      <RequestTrialTab
                        requestsfromteacher={requestsfromteacher}
                        setWaiting={setWaiting}
                        updateRequestStatus={updateRequestStatus}
                        waiting={waiting}
                      />
                    )}
                  </div>
                  <div>
                    {activeSubTab === 'completed' && <ApplicationTrialTab teachers={teachers} />}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .individualtab .bubble {
            position: absolute;
            top: -3.8%;
            left: 289.04px;
            width: 88px;
            height: 88px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 33px,
              ${getTabColors('individual')} 33px
            );
          }

          .grouptab .bubble {
            position: absolute;
            top: -3.8%;
            left: 340px;
            width: 88px;
            height: 88px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 33px,
              ${getTabColors('group')} 33px
            );
          }

          .trialtab .bubble {
            position: absolute;
            top: -3.8%;
            left: 345px;
            width: 88px;
            height: 88px;
            background-image: radial-gradient(
              circle at 100% 0%,
              rgba(207, 27, 27, 0) 33px,
              ${getTabColors('trial')} 33px
            );
          }

          @media (max-width: 1178px) {
            .trialtab .bubble {
              top: -3.8%;
              left: 244.71px; /* 345 * 0.7093 */
              width: 62.42px;
              height: 62.42px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 23.41px,
                ${getTabColors('trial')} 23.41px
              );
            }
            .grouptab .bubble {
              top: -3.8%;
              left: 241.16px; /* 340 * 0.7093 */
              width: 62.42px;
              height: 62.42px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 23.41px,
                ${getTabColors('group')} 23.41px
              );
            }
            .individualtab .bubble {
              top: -2.69%; /* -3.8 * 0.7093 */
              left: 205.01px; /* 289.04 * 0.7093 */
              width: 62.42px; /* 88 * 0.7093 */
              height: 62.42px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 23.41px,
                /* 33 * 0.7093 */ ${getTabColors('individual')} 23.41px
              );
            }
          }

          @media (max-width: 814px) {
            .individualtab .bubble {
              top: -1.65%; /* -2.69 * 0.61475 */
              left: 126px; /* 205.01 * 0.61475 */
              width: 38.35px; /* 62.42 * 0.61475 */
              height: 38.35px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 14.39px,
                /* 23.41 * scale */ ${getTabColors('individual')} 14.39px
              );
            }
            .grouptab .bubble {
              top: -3.7%;
              left: 148.27px; /* 241.16 * scale */
              width: 38.35px;
              height: 38.35px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 14.39px,
                ${getTabColors('group')} 14.39px
              );
            }

            .trialtab .bubble {
              top: -3.7%;
              left: 150.49px; /* 244.71 * scale */
              width: 38.35px;
              height: 38.35px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 14.39px,
                ${getTabColors('trial')} 14.39px
              );
            }
          }

          @media (max-width: 530px) {
            .individualtab .bubble {
              top: -1.32%; /* -1.65 * 0.8 */
              left: 100.8px; /* 126 * 0.8 */
              width: 30.68px; /* 38.35 * 0.8 */
              height: 30.68px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 11.51px,
                /* 14.39 * 0.8 */ ${getTabColors('individual')} 11.51px
              );
            }

            .grouptab .bubble {
              top: -3.8%; /* -3.7 * 0.8 */
              left: 118.61px; /* 148.27 * 0.8 */
              width: 30.68px;
              height: 30.68px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 11.51px,
                ${getTabColors('group')} 11.51px
              );
            }

            .trialtab .bubble {
              top: -3.8%%;
              left: 120.39px; /* 150.49 * 0.8 */
              width: 30.68px;
              height: 30.68px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 11.51px,
                ${getTabColors('trial')} 11.51px
              );
            }
          }

          @media (max-width: 422px) {
            .individualtab .bubble {
              top: -0.99%; /* -1.32 * 0.75 */
              left: 75.6px; /* 100.8 * 0.75 */
              width: 23.01px; /* 30.68 * 0.75 */
              height: 23.01px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 8.63px,
                /* 11.51 * 0.75 */ ${getTabColors('individual')} 8.63px
              );
            }
            .grouptab .bubble {
              top: -3.5%; /* -3.8 * 0.75 */
              left: 88.96px; /* 118.61 * 0.75 */
              width: 23.01px;
              height: 23.01px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 8.63px,
                ${getTabColors('group')} 8.63px
              );
            }

            .trialtab .bubble {
              top: -3.5%;
              left: 90.29px; /* 120.39 * 0.75 */
              width: 23.01px;
              height: 23.01px;
              background-image: radial-gradient(
                circle at 100% 0%,
                rgba(207, 27, 27, 0) 8.63px,
                ${getTabColors('trial')} 8.63px
              );
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default SessionDashboard;
