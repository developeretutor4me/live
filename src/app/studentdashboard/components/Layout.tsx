'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Sidebar from './NewSidebar';
import Dropdown from './Dropdown';
import { useToast } from '@/hooks/use-toast';

// Import icons
import Home1 from '../../../../public/homeicon.svg';
import session1 from '../../../../public/sessionicon.svg';
import calender from '../../../../public/calander.svg';
import eicon from '../../../../public/eicon.svg';
import find from '../../../../public/findEtutor.svg';
import membership from '../../../../public/membership.svg';
import contact from '../../../../public/contactandsupporticon.svg';
import refer from '../../../../public/refericon.svg';
import setting from '../../../../public/settingicon.svg';
import link from '../../../../public/linkicons.svg';
import activityBlue from '../../../../public/activityBlue.svg';
import styles from '../DashboardGrid.module.css';
import Image from 'next/image';
import EPlusIcon from '../../../../public/Plus circle.svg';
import etokiicon from '../../../../public/etokiIcon.svg';
import redeemIcon from '../../../../public/redeem.svg';
import etokipopup from '../../../../public/etokipopup.svg';

// Type definitions
interface ContactInformation {
  firstName?: string;
  country: string;
  phone: string;
  address: string;
}

interface StudentProfile {
  firstName: string;
}

interface Student {
  profile: StudentProfile;
  email: string;
  contactInformation: ContactInformation;
}

interface Teacher {
  name: string;
  email: string;
  contactInformation: ContactInformation;
}

interface BookingRequest {
  meetingCompleted: boolean;
  joinLink?: string;
  _id: string;
  student: Student;
  teacher: Teacher;
  subjects: string[];
  level: string;
  date: string;
  time: string;
  status: string;
}

interface ParentData {
  firstName?: string;
  user?: {
    etokis?: number;
    sessionsPerMonth?: number;
  };
}

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

interface SidebarItem {
  name: string;
  icon: any;
}

export interface NotificationsInterface {
  notifications: any[];
  count: number;
  unreadCount: number;
}

const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [ref, handler]);
};

interface LayoutProps {
  children: React.ReactNode;
  handleBackNavigationHandler: () => void;
  parentData: ParentData;
  fetchedUserData: any;
  bookingRequests: BookingRequest[];
  firstName: string;
  profilePicture: string;
  notifications: NotificationsInterface;
  notificationError: any;
  onNotificationClickHandler: (notification: any) => void;
}

interface SidebarItem {
  name: string;
  icon: any;
  route: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  handleBackNavigationHandler,
  parentData,
  fetchedUserData,
  bookingRequests,
  firstName,
  profilePicture,
  notifications,
  notificationError,
  onNotificationClickHandler,
}) => {
  const pathname = usePathname();
  const { toast } = useToast();
  const targetRef = useRef<HTMLDivElement>(null);

  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [etokies, setEtokies] = useState(0);
  const [radeemLoading, setRadeemLoading] = useState(false);
  const [setsessionleft, setSetsessionleft] = useState(0);
  const [redeem, setredeem] = useState(false);

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: Home1, route: '/studentdashboard' },
    { name: 'My Sessions', icon: session1, route: '/studentdashboard/sessions' },
    { name: 'Calendar', icon: calender, route: '/studentdashboard/calendar' },
    { name: 'My eTutor', icon: eicon, route: '/studentdashboard/my-etutor' },
    { name: 'Find eTutor', icon: find, route: '/studentdashboard/find-etutor' },
    { name: 'My Membership', icon: membership, route: '/studentdashboard/membership' },
    { name: 'Contact Support', icon: contact, route: '/studentdashboard/support' },
    { name: 'Refer your Friends', icon: refer, route: '/studentdashboard/refer' },
    { name: 'Activity', icon: activityBlue, route: '/studentdashboard/activity' },
    { name: 'Settings', icon: setting, route: '/studentdashboard/settings' },
    { name: 'Useful links', icon: link, route: '/studentdashboard/useful-links' },
  ];

  useEffect(() => {
    const currentItem = sidebarItems.find(item => item.route === pathname);
    if (currentItem) {
      setActiveSidebarItem(currentItem.name);
    }
  }, [pathname]);

  useClickOutside(targetRef, () => setIsProfileOpen(false));

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // useEffect(() => {
  //   try {
  //     fetchUserdata(session?.user.id || '');

  //     // @ts-ignore

  //     if (!parentData || parentData == null) {
  //       fetchParentData(session?.user.id || '');
  //     }

  //     setSetsessionleft(parentData?.user.sessionsPerMonth);

  //     setEtokies(parentData?.user.etokis);

  //     setFirstName(parentData?.firstName);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [parentData?.firstName, parentData?.user.etokis, parentData?.user.sessionsPerMonth, session]);

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
          throw new Error(`Failed to redeem: ${response.statusText}`);
        }

        const data = await response.json();

        // Handle successful response
        if (data.success) {
          let updatedSessions = setsessionleft + 1;
          let updatedEtokies = etokies - 50;

          await setSetsessionleft(updatedSessions);
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

  return (
    <div
      className={`flex min-h-screen bg-white text-white relative z-0 max-w-[1920px] mx-auto ${styles.mainpage} `}
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        sidebarItems={sidebarItems}
        activeSidebarItem={activeSidebarItem}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main content */}
      <main className="flex-1 px-5 custom-lg:px-9 py-4 overflow-auto bg-transparent scrollbar-none max-h-screen overflow-y-auto overflow-x-hidden ">
        <header className="flex justify-between items-start mb-8 h-fit">
          <div className="flex items-start sm:w-full flex-col md:flex-row sm:max-w-[300px] custom-xl:max-w-[500px] custom-2xl:max-w-[700px]">
            <button
              onClick={toggleSidebar}
              className={`${styles.menu} mr-4 text-darkBlue relative top-3`}
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>

            {/* <div
              className={`${styles.etokiebox} mt-12 md:mt-0 custom-xl:w-[80%] md:max-w-[40rem]   max-w-[400px] w-full  flex  items-start flex-col custom-2xl:flex-row gap-2 sm:gap-6   absolute sm:static  `}
            >
              <div className=" flex flex-col space-y-3 py-4 px-3 sm:px-6  bg-purple-100  rounded-2xl w-[100%] sm:w-[24rem] bg-[#EDE8FA]">
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
            </div> */}

            {activeSidebarItem !== 'Dashboard' && (
              <div
                onClick={handleBackNavigationHandler}
                className="flex cursor-pointer items-center relative top-3 -left-1.5"
              >
                <ChevronLeft className="hidden sm:block custom-lg:mr-2 w-[20px] custom-lg:w-[30px] h-[20px] custom-lg:h-[30px] cursor-pointer text-[#685AAD]" />
                <h1 className="text-[#685AAD] text-xs sm:text-sm custom-lg:text-xl custom-2xl:text-[26px] custom-2xl:leading-[2rem] hidden sm:block">
                  Back
                </h1>
              </div>
            )}

            {activeSidebarItem === 'My Sessions' && (
              <h1 className="text-[#685AAD] text-3xl custom-lg:text-[40px] custom-xl:text-[54px] custom-lg:leading-none font-extrabold ml-0 hidden sm:block top-16 relative sm:top-0 left-3 custom-xl:left-5">
                My&nbsp;Sessions
              </h1>
            )}
          </div>

          <Dropdown
            targetRef={targetRef}
            toggleProfile={toggleProfile}
            firstName={firstName}
            isProfileOpen={isProfileOpen}
            setActiveSidebarItem={setActiveSidebarItem}
            setIsProfileOpen={setIsProfileOpen}
            profilepicture={profilePicture}
            FetchedUserData={fetchedUserData}
            notifications={notifications}
            notificationError={notificationError}
            onNotificationClickHandler={onNotificationClickHandler}
          />
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;
