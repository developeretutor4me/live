'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Sidebar from './NewSidebar';
import Dropdown from './Dropdown';
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
  const targetRef = useRef<HTMLDivElement>(null);

  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: Home1, route: '/parent' },
    { name: 'My Sessions', icon: session1, route: '/parent/sessions' },
    { name: 'Calendar', icon: calender, route: '/parent/calendar' },
    { name: 'My eTutor', icon: eicon, route: '/parent/my-etutor' },
    { name: 'Find eTutor', icon: find, route: '/parent/find-etutor' },
    { name: 'My Membership', icon: membership, route: '/parent/membership' },
    { name: 'Contact Support', icon: contact, route: '/parent/support' },
    { name: 'Refer your Friends', icon: refer, route: '/parent/refer' },
    { name: 'Activity', icon: activityBlue, route: '/parent/activity' },
    { name: 'Settings', icon: setting, route: '/parent/settings' },
    { name: 'Useful links', icon: link, route: '/parent/useful-links' },
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

            {(fetchedUserData?.TrialSessionLeft > 0 ||
              fetchedUserData?.sessionsPerMonth > 0) && (
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 ml-2 sm:ml-4 mt-2 sm:mt-3">
                {fetchedUserData?.TrialSessionLeft > 0 ? (
                  <div className="bg-[#EDE8FA] rounded-lg font-bold px-4 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm text-[#685AAD] whitespace-nowrap">
                    TRIAL&nbsp;SESSIONS&nbsp;LEFT:&nbsp;{fetchedUserData.TrialSessionLeft}
                  </div>
                ) : (
                  <div className="bg-[#EDE8FA] rounded-lg font-bold px-4 sm:px-6 py-2 sm:py-3 text-center text-xs sm:text-sm text-[#685AAD] whitespace-nowrap">
                    SESSIONS&nbsp;LEFT:&nbsp;{fetchedUserData?.sessionsPerMonth || 0}
                  </div>
                )}
              </div>
            )}

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
