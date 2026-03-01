'use client';
import { useToast } from '@/hooks/use-toast';
import { eachDayOfInterval, endOfMonth, isSameDay, startOfMonth, startOfWeek } from 'date-fns';
import { ChevronLeft, Menu } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';
import etokiicon from '../../../public/etokiIcon.svg';
import etokipopup from '../../../public/etokipopup.svg';
import EPlusIcon from '../../../public/Plus circle.svg';
import redeemIcon from '../../../public/redeem.svg';
import Activity from './components/Activity';
import Calender from './components/Calender';
import ContactSupport from './components/ContactSupport';
import { BookingRequest, sidebarItems } from './components/Data';
import Dropdown from './components/Dropdown';
import FindEtutor from './components/FindEtutor';
import MyEtutor from './components/MyEtutor';
import MyMembership from './components/MyMembership';
import ReferYourFriends from './components/ReferYourFriends';
import Session from './components/Session';
import Setting from './components/Settings';
import Sidebar from './components/Sidebar';
import UsefulLinks from './components/UsefulLinks';
import DashboardGrid from './DashboardGrid';
import styles from './DashboardGrid.module.css';

const SessionsDashboard = () => {
  const { toast } = useToast();
  const { data: session, status, update } = useSession();
  const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [previousSidebarItem, setPreviousSidebarItem] = useState('');
  const [firstName, setFirstName] = useState('Loading...');
  const [parentData, setParentData] = useState<any>(null);
  const Router = useRouter();
  const [etokies, setEtokies] = useState(0);
  const [setsessionleft, setSetsessionleft] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null); // Reference to your component
  const [FetchedUserData, setFetchedUserData] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [sessionData, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error2, setError] = useState<string | null>(null);
  const [comingvalue, Setsetcomingvalue] = useState('');
  const [tutor, setTutor] = useState(null);
  const [tutortomessage, settutortomessage] = useState(null);
  const [chat, setchat] = useState(false);
  const [recievedmessages, setRecievedmessages] = useState([]);
  const [redeem, setredeem] = useState(false);
  const [view, setView] = useState('month'); // 'month' or 'week'
  const [popup, setpopup] = useState(null);
  const [Trial, setTrial] = useState(false);
  const router = useRouter();
  const [profilePicture, setprofilePicture] = useState<any>(null);
  const [radeemLoading, setRadeemLoading] = useState(false);
  const [terminateeng, setterminateeng] = useState<any>(null);
  const [isOpenNoti, setisOpenNoti] = useState(false);

  // Filter sessions based on states
  const filteredSessions = useMemo(() => {
    return sessionData;
  }, [sessionData, session]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Add previous month days to start from Sunday
    const firstDay = startOfWeek(start);
    const preDays = eachDayOfInterval({ start: firstDay, end: start });

    return [...preDays.slice(0, -1), ...days];
  }, [currentDate, view]);

  const getSessionForDate = (date: any) => {
    return filteredSessions
      .filter(session => !session.meetingCompleted)
      .find(session => isSameDay(new Date(session.date), date));
  };

  useEffect(() => {
    const fetchFirstName = async () => {
      try {
        const response = await fetch('/api/first-name');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch first name');
        }

        setFirstName(data.firstName);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstName();
  }, [session]);
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await fetch('/api/profile-picture');
        if (!response.ok) throw new Error('Failed to fetch profile picture');

        const data = await response.json();
        setprofilePicture(data.profilePicture);
      } catch (err) {
        setError('Could not load profile picture');
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePicture();
  }, [session]);

  const userID = session?.user.id;
  // fetching the senders----------recieved messages-----------
  const fetcher = async (url: any) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch senders');
    }
    return response.json();
  };

  // Modified to use a different name for SWR data
  const {
    data: senderMessages,
    error,
    isLoading,
  } = useSWR(`/api/recipient/messages?recipientId=${userID}`, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 0, // Set to a value in milliseconds if you want auto-refresh
    onSuccess: data => {},
    onError: error => {
      console.error('Error fetching senders:', error);
    },
  });

  // redeem code////
  const handleRedeem = async () => {
    if (etokies >= 50) {
      setRadeemLoading(true);

      try {
        const response = await fetch('/api/redeem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ etokies }),
        });

        if (!response.ok) {
          // If the response status is not OK (e.g., 4xx or 5xx), throw an error
          throw new Error(`Failed to redeem: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle successful response
        if (data.success) {
          let updatedSessions = setsessionleft + 1;
          let updatedEtokies = etokies - 50;

          await setSetsessionleft(updatedSessions); // Update sessions left
          await setEtokies(updatedEtokies);
          toast({
            title: 'Redeem Successful',
            description: `You have successfully redeemed 50 eTokens.`,
            variant: 'default',
          });
        } else {
          toast({
            title: 'Redeem Failed',
            description: 'Something went wrong. Please try again.',
            variant: 'default',
          });
        }
      } catch (error) {
        // Handle errors
        console.error('Error during redeem process:', error);
        toast({
          title: 'Error',
          description: 'An error occurred while redeeming. Please try again later.',
          variant: 'default',
        });
      } finally {
        setRadeemLoading(false); // Ensure loading state is reset
      }
    } else {
      toast({
        title: 'Insufficient eTokens',
        description: 'You need at least 50 eTokens to redeem.',
        variant: 'default',
      });
    }
  };

  // Update state when SWR data changes
  useEffect(() => {
    if (senderMessages) {
      setRecievedmessages(senderMessages);
    }
  }, [senderMessages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the component (targetRef), close the dropdown/modal/etc.
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const storedItem = localStorage.getItem('activeSidebarItem');
    if (storedItem) {
      setActiveSidebarItem(storedItem);
      localStorage.removeItem('activeSidebarItem'); // Clean up if only needed for navigation
    }
  }, []);

  // fetching parent data
  async function fetchParentData(userId: string) {
    const response = await fetch('/api/parentapis/fetch-parent-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      console.error('Failed to fetch parent data');
    }

    if (session?.user.role === 'student') {
      const data = await response.json();
      setParentData(data.parentData);
      return data.parentData;
    }
  }

  // fetching user data...........
  async function fetchUserdata(userId: any) {
    try {
      const response = await fetch('/api/Fetch-all-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      // Handle the response based on the status
      const data = await response.json(); // Read the response body once

      if (!response.ok) {
        // Throw an error if the response is not OK
        console.error(data.error || 'An error occurred while fetching the user.');
      }
      setFetchedUserData(data.user); // Set the fetched user data
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  useEffect(() => {
    const fetchRequests = async () => {
      if (!session) return;

      try {
        const response = await fetch('/api/fetch-send-requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setRequests(data.bookingRequests);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [session]);

  useEffect(() => {
    try {
      fetchUserdata(session?.user.id || '');

      // @ts-ignore

      if (!parentData || parentData == null) {
        fetchParentData(session?.user.id || '');
      }

      setSetsessionleft(parentData?.user.sessionsPerMonth);

      setEtokies(parentData?.user.etokis);

      setFirstName(parentData?.firstName);
    } catch (error) {
      console.error(error);
    }
  }, [parentData?.firstName, parentData?.user.etokis, parentData?.user.sessionsPerMonth, session]);

  const handleImpersonate = async () => {
    await update({
      user: {
        email: 'admin@gmail.com',
        role: 'admin',
        id: 'admin',
        isAdmin: true,
        isParent: false,
      },
    });
    localStorage.removeItem('ContactSupport');
    localStorage.removeItem('history');
    setTimeout(() => {
      router.push('/admin');
    }, 3000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const renderContent = () => {
    switch (activeSidebarItem) {
      // ---------------------------DashBoard--------------------------------------------------------------
      case 'Dashboard':
        return (
          <DashboardGrid
            isOpenNoti={isOpenNoti}
            etokies={etokies}
            setActiveSidebarItem={setActiveSidebarItem}
            handleRedeem={handleRedeem}
            setredeem={setredeem}
            radeemLoading={radeemLoading}
            redeem={redeem}
            setsessionleft={setsessionleft}
            currentDate={currentDate}
            view={view}
            calendarDays={calendarDays}
            getSessionForDate={getSessionForDate}
            setpopup={setpopup}
            popup={popup}
            sessionData={sessionData}
            Setsetcomingvalue={Setsetcomingvalue}
            recievedmessages={recievedmessages}
            setchat={setchat}
            settutortomessage={settutortomessage}
          />
        );

      // ---------------------------My session--------------------------------------------------------------
      case 'My Sessions':
        return (
          // <Session
          //   setActiveFindEtutor={setActiveSidebarItem}
          //   setActiveMYEtutor={setActiveSidebarItem}
          //   setcompleted={comingvalue}
          //   setTutor={setTutor}
          //   showchat={setchat}
          //   tutortomessage={settutortomessage}
          //   trialsession={setTrial}
          //   studentdata={parentData}
          // />
          <div></div>
        );

      case 'Calendar':
        return (
          <>
            <Calender
              setActiveFindEtutor={setActiveSidebarItem}
              setActiveMYEtutor={setActiveSidebarItem}
              setTutor={setTutor}
              showchat={setchat}
              tutortomessage={settutortomessage}
            />
          </>
        );
      case 'My eTutor':
        return (
          <MyEtutor
            tutorimp={tutortomessage}
            showchatvalue={chat}
            setActiveFindEtutor={setActiveSidebarItem}
            setTutor={setTutor}
            showTerminateEngament={setterminateeng}
          />
        );
      case 'Find eTutor':
        return (
          <div>
            <FindEtutor
              setActiveMYEtutor={setActiveSidebarItem}
              sessiontutor={tutor}
              messagetutor={settutortomessage}
              showchat={setchat}
              trialrequest={Trial}
              parentdata={parentData}
              sessionData={sessionData}
              showTerminateEngament={terminateeng}
            />
          </div>
        );
      case 'My Membership':
        return <MyMembership studentdata={parentData} />;
      case 'Contact Support':
        // @ts-ignore
        return (
          <ContactSupport
            profilePicture={profilePicture || FetchedUserData?.profilePicture}
            name={firstName}
          />
        );
      case 'Refer your Friends':
        return <ReferYourFriends />;
      case 'Activity':
        return (
          session?.user?.isAdmin && (
            <Activity parent={parentData} etokiesprop={undefined} sessionData={sessionData} />
          )
        );
      case 'Settings':
        return <Setting Uploadedprofilepicture={setprofilePicture} />;
      case 'Useful links':
        return <UsefulLinks />;
      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };

  if (session?.user?.role === 'student') {
    return (
      <div className="flex min-h-screen bg-white text-white relative z-0 max-w-[1920px] mx-auto ">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          session={session}
          sidebarItems={sidebarItems}
          setPreviousSidebarItem={setPreviousSidebarItem}
          setActiveSidebarItem={setActiveSidebarItem}
          setTutor={setTutor}
          Setsetcomingvalue={Setsetcomingvalue}
          activeSidebarItem={activeSidebarItem}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main content */}
        <main className="flex-1 px-4 sm:px-9 py-4   bg-transparent scrollbar-none max-h-screen overflow-auto">
          <header className="flex justify-between items-start sm:mb-8">
            <div className="flex items-start sm:w-full flex-col md:flex-row sm:max-w-[300px] custom-xl:max-w-[500px] custom-2xl:max-w-[700px]">
              <button onClick={toggleSidebar} className={` ${styles.menu} mr-4 text-darkBlue`}>
                <Menu size={24} />
              </button>

              {activeSidebarItem === 'Dashboard' ? (
                <>
                  <div className=" mt-12 md:mt-0 custom-xl:w-[80%] md:max-w-[40rem]   max-w-[400px] w-full  flex  items-start flex-col custom-2xl:flex-row gap-2 sm:gap-6   absolute sm:static  ">
                    <div className="  flex flex-col space-y-3 py-4 px-3 sm:px-6  bg-purple-100  rounded-2xl w-[100%] sm:w-[24rem] bg-[#EDE8FA]">
                      <div className=" flex justify-between items-center bg-purple-300 rounded-full px-4 pl-6 py-[10px] bg-[#A296CC]">
                        <div className="text-3xl font-bold text-white">{etokies}</div>
                        <div className=" flex items-center justify-center">
                          <Image loading="lazy" src={etokiicon} alt="" className="w-9 h-9" />
                        </div>
                      </div>

                      <div className="flex  space-x-6 mt-4 hover:cursor-pointer px-2 pt-2">
                        <button
                          onClick={() => {
                            setActiveSidebarItem('Refer your Friends');
                          }}
                          className="flex-1 bg-[#685AAD] text-white py-[2px] px-4  rounded-md text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
                        >
                          <Image
                            loading="lazy"
                            src={EPlusIcon}
                            alt=""
                            className="w-6 h-6 hover:cursor-pointer"
                          />{' '}
                          etokis
                        </button>
                        <button
                          onClick={handleRedeem}
                          onMouseEnter={() => {
                            setredeem(true);
                          }}
                          onMouseLeave={() => {
                            setredeem(false);
                          }}
                          className="flex-1 bg-[#8653FF] text-white py-[2px] px-4 rounded-md flex items-center justify-center gap-1 hover:cursor-pointer relative"
                        >
                          {radeemLoading ? 'wait...' : 'Redeem'}
                          <Image loading="lazy" src={redeemIcon} alt="" className="w-6 h-6" />
                          {redeem && (
                            <div className="hover absolute w-[200px] sm:w-[280px] custom-lg:w-[340px] h-[88px] sm:h-[124px] custom-lg:h-[150px] top-8 custom-xl:top-0 left-20 custom-xl:left-40 ">
                              <Image src={etokipopup} alt="" className="object-contain" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#EDE8FA] rounded-lg font-bold px-8 py-3 text-center text-base text-[#685AAD] ">
                      SESSIONS&nbsp;LEFT:&nbsp;{setsessionleft}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => {
                    if (previousSidebarItem) {
                      setActiveSidebarItem(previousSidebarItem); // Navigate back to previous item
                    }
                  }}
                  className=" cursor-pointer  items-center relative top-4 hidden sm:flex"
                >
                  <ChevronLeft className="mr-2 cursor-pointer text-[#685AAD]" size={24} />

                  <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-xl custom-2xl:text-2xl hidden sm:block">
                    Back
                  </h1>
                </div>
              )}

              {activeSidebarItem === 'My Sessions' && (
                <h1 className="text-[#685AAD]  text-sm sm:text-md custom-lg:text-5xl  font-extrabold ml-0 sm:ml-6 absolute top-16 hidden md:block left-16 sm:relative sm:top-3 sm:left-8">
                  My&nbsp;Sessions
                </h1>
              )}
            </div>

            <Dropdown
              targetRef={targetRef}
              toggleProfile={toggleProfile}
              firstName={firstName}
              isProfileOpen={isProfileOpen}
              session={session}
              handleImpersonate={handleImpersonate}
              setActiveSidebarItem={setActiveSidebarItem}
              setIsProfileOpen={setIsProfileOpen}
              profilepicture={profilePicture}
              FetchedUserData={FetchedUserData}
            />
          </header>
          {renderContent()}
        </main>
      </div>
    );
  } else if (session?.user?.role === 'parent') {
    router.push('/parent');
  } else if (session?.user?.role === 'teacher') {
    router.push('/etutor');
  }
};

export default SessionsDashboard;
