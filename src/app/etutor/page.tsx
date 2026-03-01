'use client';

// React + Next.js Core
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Authentication
import { signOut, useSession } from 'next-auth/react';

// Date Utilities

// Icons - Lucide
import { ChevronDown, ChevronLeft, ChevronUp, Menu } from 'lucide-react';
import styles from './DashboardGrid.module.css';

// Custom Hooks
import { useEtokies } from '../admin/hooks/useEtokies';
import { useTeacherData } from '../admin/hooks/useTeacherData';
import { useEtokisProgress } from '@/app/admin/hooks/useEtokisProgress';

// Types
import { BookingRequest, SIDEBAR_ITEMS } from './profile/components/Data';

// UI Components
import Activity from './components/Activity';
import Calender from './components/Calender';
import ContactSupport from './components/ContactSupport';
import Earnings from './components/Earnings';
import FindEtutor from './components/FindEtutor';
import MyEtutor from './components/MyEtutor';
import ReferYourFriends from './components/ReferYourFriends';
import Session from './components/Session';
import Setting from './components/Settings';
import UsefulLinks from './components/UsefulLinks';

// Assets - Logos
import adminlogo from '../../../public/etutuorAdminLogo.svg';
import logo from '../../../public/etutorlogo.svg';
import bell from '../../../public/bellicon.svg';
import dark from '../../../public/darkicon.svg';
import etokiicon from '../../../public/etokiIcon.svg';
import EPlusIcon from '../../../public/Plus circle.svg';
import earningsinactive from '../../../public/earnings inactive.svg';
import translate from '../../../public/translateicon.svg';

// Assets - Levels
import level1 from '../../../public/level-1.svg';
import level2 from '../../../public/level-2.svg';
import level3 from '../../../public/level-3.svg';
import level4 from '../../../public/level-4.svg';
import level5 from '../../../public/level-5.svg';
import level6 from '../../../public/level-6.svg';
import level7 from '../../../public/level-7.svg';
import level8 from '../../../public/level-8.svg';
import level9 from '../../../public/level-9.svg';
import level10 from '../../../public/level-10.svg';

import { useIncomingRequests } from '../admin/hooks/useIncomingRequests';
import DashboardGrid from './DashboardGrid';
import useSWR from 'swr';

interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  details: {
    user: { _id: string };
    contactInformation: { firstName: string };
  };
  lastMessage?: {
    content: string;
    senderId: string;
    timestamp: string;
  };
}
export default function Home() {
  const { etokies, isLoadingetokies, erroretokies } = useEtokies();
  const [activeSidebarItem, setActiveSidebarItem] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [previousSidebarItem, setPreviousSidebarItem] = useState('');
  const router = useRouter();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const targetRef = useRef<HTMLDivElement>(null);
  const [eTokis, setETokis] = useState(0);
  const [earnedThisMonthEtokis, setEarnedThisMonthEtokis] = useState(0);
  const [firstname, setFirstname] = useState('');
  const [profilepicture, setProfilepicture] = useState('');
  const [tutorlevelleft, setTutorLevelLeft] = useState(0);
  const [completeprofilestatus, setCompleteProfileStatus] = useState(0);
  const [level, setLevel] = useState(0);
  const { teacher } = useTeacherData();
  const progressPercent = useEtokisProgress(Number(teacher?.user?.etokis));
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { sessionData, reqloading, reqerr } = useIncomingRequests(session);

  const [recievedmessages, setRecievedmessages] = useState<Message[]>([]);

  const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  const {
    data: senderMessages,
    error,
    isLoading,
  } = useSWR(
    session?.user?.id ? `/api/recipient/messages?recipientId=${session.user.id}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      onError: error => {
        console.error('Error fetching senders:', error);
      },
    }
  );

  useEffect(() => {
    const enrichMessagesWithLastMessage = async () => {
      if (!senderMessages || !Array.isArray(senderMessages)) return;

      const enriched = await Promise.all(
        senderMessages.map(async (msg: any) => {
          const recipientId = msg?.details?.user?._id;

          if (!recipientId) return msg;

          try {
            const res = await fetch(
              `/api/message/conversation?userId=${session?.user?.id}&recipientId=${recipientId}&limit=1`
            );
            const data = await res.json();

            return {
              ...msg,
              lastMessage: data?.messages?.[0] || null,
            };
          } catch (err) {
            console.error(`Failed to fetch last message for ${recipientId}`, err);
            return { ...msg, lastMessage: null };
          }
        })
      );

      setRecievedmessages(enriched);
    };

    enrichMessagesWithLastMessage();
  }, [senderMessages]);

  useEffect(() => {
    setETokis(teacher?.user?.etokis ?? 0);

    setLevel(progressPercent.currentLevel);
    // @ts-ignore
    setEarnedThisMonthEtokis(teacher?.EarnedThisMonth ?? 0);

    setFirstname(teacher?.contactInformation?.firstName ?? '');
    setProfilepicture(teacher?.user?.profilePicture ?? '');
    setTutorLevelLeft(80);
    setCompleteProfileStatus(90);
  }, [session, teacher, progressPercent.currentLevel]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const sidebarItems = SIDEBAR_ITEMS.map(item => ({
    ...item,
    icon: activeSidebarItem === item.name ? item.activeIcon : item.inactiveIcon,
  }));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1849px)');

    // Set initial value based on the media query match
    setIsLargeScreen(mediaQuery.matches);

    // Define a listener for changes
    const handleMediaChange = (e: any) => setIsLargeScreen(e.matches);

    // Add the event listener
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

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

  const renderContent = () => {
    switch (activeSidebarItem) {
      // ---------------------------DashBoard--------------------------------------------------------------
      case 'Dashboard':
        return (
          <DashboardGrid
            recievedmessages={recievedmessages}
            sessionData={sessionData}
            setActiveSidebarItem={setActiveSidebarItem}
            isLargeScreen={isLargeScreen}
            eTokis={eTokis}
            level={level}
            progressPercent={progressPercent}
          />
        );

      // ---------------------------My session--------------------------------------------------------------
      case 'Session overview':
        return (
          <Session
            setActiveFindEtutor={setActiveSidebarItem}
            setActiveMYEtutor={setActiveSidebarItem}
            setTutor={undefined}
            showchat={undefined}
            tutortomessage={undefined}
          />
        );

      case 'My Students':
        return <MyEtutor tutor={undefined} showchatvalue={false} />;

      case 'Calendar':
        return (
          <>
            <Calender
              setActiveFindEtutor={function (item: string): void {
                throw new Error('Function not implemented.');
              }}
              setActiveMYEtutor={function (item: string): void {
                throw new Error('Function not implemented.');
              }}
              setTutor={undefined}
              showchat={undefined}
              tutortomessage={undefined}
              data={sessionData}
            />
          </>
        );
      case 'Find eTutor':
        return (
          <div>
            <FindEtutor />
          </div>
        );
      case 'Earnings':
        return <Earnings teacher={teacher} />;
      case 'Support':
        return <ContactSupport />;
      case 'Refer your Friends':
        return <ReferYourFriends />;
      case 'Activity':
        return (
          session?.user?.isAdmin && (
            <Activity teacher={teacher} etokiesprop={undefined} sessionData={sessionData} />
          )
        );
      case 'Settings':
        return <Setting teacher={teacher} profilePicture={setProfilepicture} />;
      case 'Useful links':
        return <UsefulLinks />;
      default:
        return <div>Select a tab from the sidebar</div>;
    }
  };

  if (session?.user?.role === 'teacher') {
    return (
      <main className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={` ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${styles.sidebar}   inset-y-0 left-0 z-[11111111111] max-w-[18rem] custom-xl:max-w-[20rem] custom-2xl:max-w-[25rem] w-full  h-screen overflow-y-auto scrollbar-none rounded-tr-3xl rounded-br-3xl bg-[#E6E4F2] text-white flex flex-col transition-transform duration-300 ease-in-out pl-5 pr-9 pt-8 custom-2xl:pt-11 pb-4`}
        >
          <div className="flex items-center mb-[23.5%] pb-2 pl-7">
            {session.user.isAdmin === true ? (
              <Image
                loading="lazy"
                src={adminlogo}
                alt=""
                className="w-[204px] custom-2xl:w-[17rem]"
              />
            ) : (
              <Image loading="lazy" src={logo} alt="" className="w-[204px] custom-2xl:w-[17rem]" />
            )}
          </div>
          <nav className="flex-grow flex flex-col">
            <ul className="space-y-2 flex-grow">
              {sidebarItems
                .filter(item => !['Settings', 'Useful links'].includes(item.name))
                .filter(item => (session.user.isAdmin ? item : !['Activity'].includes(item.name)))
                .map(item => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setPreviousSidebarItem(activeSidebarItem);
                        setActiveSidebarItem(item.name);
                        if (window.innerWidth < 1895) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={`flex    hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-9 py-3 sm:py-[18px] rounded-[22px]  transition-all  ${
                        activeSidebarItem === item.name
                          ? 'bg-white  transition-all'
                          : 'hover:bg-darkpurple hover:bg-transparent transition-all'
                      }`}
                    >
                      <Image
                        loading="lazy"
                        src={item.icon}
                        className="w-[18px] custom-2xl:w-6 h-[18px] custom-2xl:h-6 mr-5 custom-2xl:mr-7"
                        alt=""
                      />
                      <p
                        className={`text-[#cac7d8] text-base custom-2xl:text-xl font-medium ${
                          activeSidebarItem === item.name ? 'text-customBlue' : 'text-darkpurple'
                        }`}
                      >
                        {item.name}
                      </p>
                    </button>
                  </li>
                ))}
            </ul>
            <ul className="space-y-2 mt-6 ">
              {sidebarItems
                .filter(item => ['Settings', 'Useful links'].includes(item.name))
                .map(item => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        setActiveSidebarItem(item.name);
                        if (window.innerWidth < 1895) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={`flex   hover:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.3)] hover:transition-all duration-1000  items-center w-full px-6 custom-2xl:px-9 py-3 sm:py-[18px] rounded-[22px]  transition-all  ${
                        activeSidebarItem === item.name
                          ? 'bg-white text-customBlue'
                          : 'hover:bg-darkpurple hover:bg-transparent'
                      }`}
                    >
                      <Image
                        loading="lazy"
                        src={item.icon}
                        className="w-[18px] custom-2xl:w-6 h-[18px] custom-2xl:h-6 mr-5 custom-2xl:mr-7"
                        alt=""
                      />
                      <p
                        className={`text-[#cac7d8] text-base custom-2xl:text-xl  font-medium ${
                          activeSidebarItem === item.name ? 'text-customBlue' : 'text-darkpurple'
                        }`}
                      >
                        {item.name}
                      </p>
                    </button>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>

        <div className="flex min-h-screen bg-white relative z-0 max-w-[1920px] w-full mx-auto overflow-y-auto ">
          {/* Main content */}
          <main className="flex-1 px-2 custom-lg:px-7 py-4 overflow-auto  bg-transparent overflow-x-hidden ">
            <header
              className={`flex justify-between items-start px-4 sm:px-0  ${
                activeSidebarItem === 'Session overview' ? 'mb-2' : 'mb-8'
              }`}
            >
              <div className="flex items-start">
                <button onClick={toggleSidebar} className={` mr-4 text-darkBlue ${styles.menu}`}>
                  <Menu size={24} />
                </button>

                {activeSidebarItem === 'Dashboard' ? (
                  <div className={`overflow-hidden  ${styles.topbox}`}>
                    <div
                      className={`${styles.mainbox} custom-2xl:w-full max-w-[66rem] mb-4  mt-12 sm:mt-0 hidden   ${
                        isLargeScreen ? 'flex-row gap-11' : ' gap-4'
                      } custom-lg:flex  items-start      `}
                    >
                      {/* 1 */}
                      <div
                        className={`${styles.firstcard} flex flex-col space-y-2 pb-3 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-lg:w-[18rem] bg-[#EDE8FA]`}
                      >
                        <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 pr-6 py-[10px] bg-[#ffffff84]">
                          <div className="text-3xl font-bold text-[#685AAD] truncate">{eTokis}</div>
                          <div className=" flex items-center justify-center">
                            <Image loading="lazy" src={etokiicon} alt="" className="w-9 h-9" />
                          </div>
                        </div>

                        <div className=" mx-auto">
                          <button
                            onClick={() => {
                              setActiveSidebarItem('Refer your Friends');
                            }}
                            className="flex-1 bg-[#685AAD] text-white py-[3px] px-10  rounded-lg text-xs flex items-center justify-center gap-1 hover:cursor-pointer"
                          >
                            <Image
                              loading="lazy"
                              src={EPlusIcon}
                              alt=""
                              className="w-5 h-5 hover:cursor-pointer"
                            />{' '}
                            etokis
                          </button>
                        </div>
                      </div>
                      {/* 2 */}
                      <div
                        className={`${styles.secondcard} flex flex-col space-y-2 pb-2 pt-4 px-4  bg-purple-100  rounded-3xl w-[100%] custom-lg:w-[18rem] bg-[#EDE8FA]`}
                      >
                        <div className=" flex justify-between items-center bg-purple-300 rounded-2xl px-4 pl-6 py-[10px] bg-[#ffffff84]">
                          <div className="text-3xl font-bold text-[#685AAD] truncate max-w-[12rem]">
                            {/* {earnedThisMonthEtokis} */}
                            {erroretokies
                              ? '0'
                              : isLoadingetokies
                                ? 'loading...'
                                : etokies
                                    ?.filter(
                                      (etokie: any) =>
                                        new Date(etokie.createdAt).getMonth() ===
                                          new Date().getMonth() &&
                                        new Date(etokie.createdAt).getFullYear() ===
                                          new Date().getFullYear()
                                    )
                                    .reduce((sum: any, etokie: any) => sum + etokie.amount, 0)}
                          </div>
                          <div className=" flex items-center justify-center">
                            <Image
                              loading="lazy"
                              src={earningsinactive}
                              alt=""
                              className="w-6 h-6"
                            />
                          </div>
                        </div>

                        <div className=" mx-auto">
                          <p className="text-[#685AAD] text-lg font-medium">Earned This month</p>
                        </div>
                      </div>
                      {/* 3 */}
                      <div
                        className={`${styles.thirdcard} flex  gap-5 items-center pb-1 pt-3 px-6  bg-purple-100  rounded-3xl w-full ${
                          isLargeScreen ? 'max-w-[23rem]' : 'max-w-[18rem]'
                        } bg-[#EDE8FA]`}
                      >
                        <div className="level h-[103px]">
                          <Image
                            loading="lazy"
                            src={
                              level == 1
                                ? level1
                                : level == 2
                                  ? level2
                                  : level == 3
                                    ? level3
                                    : level == 4
                                      ? level4
                                      : level == 5
                                        ? level5
                                        : level == 6
                                          ? level6
                                          : level == 7
                                            ? level7
                                            : level == 8
                                              ? level8
                                              : level == 9
                                                ? level9
                                                : level == 10
                                                  ? level10
                                                  : level1
                            }
                            alt=""
                            className=" h-full "
                          />
                        </div>
                        <div className="content flex flex-col w-full">
                          <p className="text-[#685AAD]  text-lg font-bold"> eTokis</p>
                          <p className="text-[#685AAD]  text-lg font-medium ">
                            {level == 10 ? (
                              <span>All Level Completed!</span>
                            ) : (
                              <span>Left for level {level + 1}</span>
                            )}
                          </p>
                          <div className="w-full bg-white h-2 rounded-full mt-2">
                            <div
                              className={`w-[${Number(
                                progressPercent.progressPercentage
                              )}%] h-full bg-[#9252FF] rounded-full`}
                              style={{
                                width: `${Number(progressPercent.progressPercentage) || 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      if (previousSidebarItem) {
                        setActiveSidebarItem(previousSidebarItem); // Navigate back to previous item
                      }
                    }}
                    className="flex cursor-pointer  items-center"
                  >
                    <ChevronLeft className="mr-2 cursor-pointer text-[#685AAD]" size={24} />

                    <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-xl hidden sm:block">
                      Back
                    </h1>
                  </div>
                )}
                {activeSidebarItem === 'My Sessions' && (
                  <h1 className="text-[#685AAD]  text-sm sm:text-md custom-lg:text-5xl  font-extrabold ml-0 sm:ml-6 absolute top-16 left-16 sm:static">
                    My&nbsp;Sessions
                  </h1>
                )}
              </div>

              <div
                ref={targetRef}
                className="flex items-center space-x-4 relative -right-4 select-none   sm:pr-4 custom-lg:pr-0"
              >
                {/* <Bell size={24} className="cursor-pointer text-darkBlue" /> */}
                <div className="flex gap-4 custom-2xl:gap-6 mr-2">
                  <Image
                    loading="lazy"
                    src={dark}
                    alt=""
                    className="w-5 h-5 custom-2xl:w-6 custom-2xl:h-6"
                  />
                  <Image
                    loading="lazy"
                    src={translate}
                    alt=""
                    className="w-5 h-5 custom-2xl:w-6 custom-2xl:h-6"
                  />
                  <Image
                    loading="lazy"
                    src={bell}
                    alt=""
                    className="w-5 h-5 custom-2xl:w-6 custom-2xl:h-6"
                  />
                </div>

                {/* -------profile complete------- */}
                {/* {activeSidebarItem === "Dashboard" && (
                <div className=" absolute mb-28 custom-xl:mb-8 hidden sm:block right-4   top-[3.7rem] max-w-[20.5rem]  custom-xl:max-w-[21.5rem]  ">
                  <div className="flex  items-center  ">
                    <div>
                      <h1 className="font-bold text-xl custom-xl:text-3xl   text-[#685AAD] pr-2 custom-xl:pr-14">
                        Complete&nbsp;your&nbsp;report
                      </h1>
                    </div>
                    <Image  loading="lazy"  src={rightarrow} alt="" className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-[#685AAD] pb-3">
                      Monthly Student Progress Report
                    </span>
                    <div className="w-full bg-[#DBD8EF] h-2 rounded-full">
                      <div
                        className={`w-[${completeprofilestatus}%] h-full bg-[#00DAE5] rounded-full`}
                      ></div>
                    </div>
                  </div>
                </div>
              )} */}

                <div
                  onClick={toggleProfile}
                  className={`flex bg-[#EDE8FA] hover:cursor-pointer  px-2 py-1 justify-between w-[9rem] custom-2xl:w-[12.5rem]   h-10 custom-2xl:h-11 items-center rounded-md ${
                    isProfileOpen ? 'border border-[#685aad7a]' : 'border-0'
                  }`}
                >
                  <div className=" flex gap-2 items-center justify-center">
                    <div className="w-6 custom-2xl:min-w-7 h-6 custom-2xl:min-h-7  rounded-full overflow-hidden flex items-center">
                      <img
                        src={
                          profilepicture ||
                          // @ts-ignore
                          teacher?.user?.profilePicture
                        }
                        alt=""
                        className="object-cover object-center"
                      />
                    </div>

                    <span className="text-sm custom-2xl:text-base font-bold text-[#685AAD]">
                      {firstname}
                    </span>
                  </div>

                  {isProfileOpen ? (
                    <ChevronUp size={18} className="cursor-pointer  text-[#685AAD] " />
                  ) : (
                    <ChevronDown size={18} className="cursor-pointer  text-[#685AAD] " />
                  )}
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 hover:cursor-pointer  bg-[#EDE8FA] font-bold rounded-md shadow-lg py-1 z-10 top-full w-[9rem] custom-2xl:w-[12.5rem] px-4 border border-[#685aad7a]">
                    <Link
                      href="/etutor/profile"
                      className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD]  border-b border-[#685aad7a] "
                    >
                      Profile
                    </Link>
                    {session?.user?.isAdmin === true && (
                      <span
                        onClick={() => {
                          handleImpersonate();
                        }}
                        className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD]  border-b border-[#685aad7a] "
                      >
                        Back to Admin
                      </span>
                    )}
                    <a
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="block px-2 py-2 custom-2xl:py-3 text-sm text-[#685AAD] "
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </header>
            {renderContent()}
          </main>
        </div>
      </main>
    );
  } else if (session?.user?.role === 'parent') {
    router.push('/parent');
  } else if (session?.user?.role === 'student') {
    router.push('/studentdashboard');
  }
}
